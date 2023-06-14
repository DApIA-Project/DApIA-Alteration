package fdit.alteration.core.basestation.engine;

import fdit.alteration.core.basestation.message.BaseStationMessage;
import fdit.alteration.core.basestation.message.BaseStationMessageFull;
import fdit.alteration.core.basestation.message.parameter.AltitudeParameter;
import fdit.alteration.core.basestation.message.parameter.LatitudeParameter;
import fdit.alteration.core.basestation.message.parameter.LongitudeParameter;
import fdit.alteration.core.basestation.message.parameter.TrackParameter;
import fdit.alteration.core.engine.AircraftTrajectory;
import fdit.alteration.core.engine.EngineParameters;
import fdit.alteration.core.engine.Message;
import fdit.alteration.core.engine.SuperAction;
import fdit.alteration.core.incident.Action;
import fdit.alteration.core.incident.Parameter;
import fdit.alteration.core.incident.Recording;
import fdit.alteration.core.incident.UnknownScopeException;
import fdit.alteration.core.logging.ActionLogger;
import gov.nasa.worldwind.geom.LatLon;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.collect.Maps.newHashMap;
import static fdit.alteration.core.engine.AlterationUtils.*;
import static fdit.alteration.core.incident.Parameter.*;
import static gov.nasa.worldwind.geom.LatLon.fromDegrees;
import static java.util.Optional.empty;
import static java.util.Optional.ofNullable;

public class BaseStationRotationEngine extends BaseStationActionEngine {

    private final HashMap<Action, Double> angles = newHashMap();
    private final HashMap<String, HashMap<Action, LatLon>> startPosMap = newHashMap();

    private final Map<Action, Map<String, AircraftTrajectory>> fakeTrajectories = newHashMap();

    BaseStationRotationEngine(final Recording recording,
                              final SuperAction superAction,
                              final ActionLogger logger,
                              final EngineParameters parameters) {
        super(recording, superAction, logger, parameters);
        for (final Action action : superAction.getActions()) {
            for (final Parameter parameter : action.getParameters().getParameterList()) {
                if (parameter.getAngle() > 0.0) {
                    angles.put(action, parameter.getAngle());
                }
            }
            angles.putIfAbsent(action, 0.0);
        }
    }

    @Override
    public void preProcessing() throws IOException, UnknownScopeException {
        buildFakeTrajectories();
    }

    @Override
    protected String applyAction(final Message message) throws UnknownScopeException {
        final BaseStationMessage bstMessage = (BaseStationMessage) message;
        for (final Action action : superAction.getConcernedActions(bstMessage, recording.getFirstDate())) {
            processAlteration(bstMessage, action);
            updateLogger(message);
        }
        message.setMask(message.getMask());
        if (parameters.isLabeled()) {
            return message.toStringWithMask();
        }
        return message.toString();
    }

    private void processAlteration(final BaseStationMessage message, final Action action) {
        final AircraftTrajectory fakeTrajectory = fakeTrajectories.get(action).get(message.getIcao());
        final long timestamp = message.getTimestampGenerated();
        final Collection<String> characteristics = newArrayList();

        if (message instanceof LatitudeParameter && ((LatitudeParameter) message).getLatitude().isPresent()) {
            fakeTrajectory.getLatitude(timestamp).ifPresent(newLatitude -> {
                ((LatitudeParameter) message).setLatitude(newLatitude);
                characteristics.add(CHARAC_LATITUDE);
            });
        }

        if (message instanceof LongitudeParameter && ((LongitudeParameter) message).getLongitude().isPresent()) {
            fakeTrajectory.getLongitude(timestamp).ifPresent(newLongitude -> {
                ((LongitudeParameter) message).setLongitude(newLongitude);
                characteristics.add(CHARAC_LONGITUDE);
            });
        }

        if (parameters.isTrack() && message instanceof TrackParameter && ((TrackParameter) message).getTrack().isPresent()) {
            fakeTrajectory.getTrack(timestamp).ifPresent(newTrack -> {
                ((TrackParameter) message).setTrack(newTrack);
                characteristics.add(CHARAC_TRACK);
            });
        }

        int mask = message.getMask() != null ? message.getMask() : 0;
        final int newMask = computeCharacteristicMask(characteristics) | mask;
        message.setMask(newMask);
    }

    private void buildFakeTrajectories() throws IOException, UnknownScopeException {
        try (final FileReader fileReader = new FileReader(recording.getFile());
             final BufferedReader bufferedReader = new BufferedReader(fileReader)) {
            String currentMessage = bufferedReader.readLine();
            while (currentMessage != null) {
                final Optional<? extends Message> message = parseMessage(currentMessage);
                if (message.isPresent() && message.get() instanceof BaseStationMessage) {
                    updateFakeTrajectory((BaseStationMessage) message.get());
                }
                currentMessage = bufferedReader.readLine();
            }
        }
        fakeTrajectories.values().forEach(aircraftTrajectories ->
                aircraftTrajectories.values().forEach(AircraftTrajectory::interpolate));
    }

    private void updateFakeTrajectory(final BaseStationMessage message) throws UnknownScopeException {
        for (final Action action : superAction.getActions()) {
            if (isMessageTargeted(message, action.getParameters().getTarget().getContent())) {
                fakeTrajectories.putIfAbsent(action, newHashMap());
                fakeTrajectories.get(action).putIfAbsent(message.getIcao(), new AircraftTrajectory());
                final AircraftTrajectory fakeTrajectory = fakeTrajectories.get(action).get(message.getIcao());
                if (!isMessageInScope(message, action.getScope(), recording.getFirstDate())) {
                    addMessageToTrajectory(message, fakeTrajectory);
                } else {
                    addRotationToTrajectory(action, fakeTrajectory, message);
                }
            }
        }
    }

    private void addRotationToTrajectory(final Action action,
                                         final AircraftTrajectory fakeTrajectory,
                                         final BaseStationMessage message) {
        if (message instanceof LatitudeParameter && message instanceof LongitudeParameter &&
                ((LatitudeParameter) message).getLatitude().isPresent() && ((LongitudeParameter) message).getLongitude().isPresent()) {
            final LatLon currentPos = fromDegrees(
                    ((LatitudeParameter) message).getLatitude().get(),
                    ((LongitudeParameter) message).getLongitude().get());
            startPosMap.putIfAbsent(message.getIcao(), newHashMap());
            startPosMap.get(message.getIcao()).putIfAbsent(action, currentPos);
            getStartPos(message.getIcao(), action).ifPresent(startPos -> {
                final LatLon newPos = rotateCoordinates(startPos, currentPos, angles.get(action));
                fakeTrajectory.addLatitude(newPos.getLatitude().getDegrees(), message.getTimestampGenerated());
                fakeTrajectory.addLongitude(newPos.getLongitude().getDegrees(), message.getTimestampGenerated());
            });
        }
    }

    public Map<String, AircraftTrajectory> getFakeTrajectories(final Action action) {
        return fakeTrajectories.get(action);
    }


    public Optional<LatLon> getStartPos(final String icao, final Action action) {
        if (startPosMap.containsKey(icao) && startPosMap.get(icao).containsKey(action)) {
            return ofNullable(startPosMap.get(icao).get(action));
        }
        return empty();
    }
}