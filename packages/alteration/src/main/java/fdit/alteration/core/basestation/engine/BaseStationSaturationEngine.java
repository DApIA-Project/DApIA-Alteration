package fdit.alteration.core.basestation.engine;

import fdit.alteration.core.basestation.message.BaseStationMessage;
import fdit.alteration.core.basestation.message.parameter.*;
import fdit.alteration.core.engine.*;
import fdit.alteration.core.incident.Action;
import fdit.alteration.core.incident.Parameter;
import fdit.alteration.core.incident.Recording;
import fdit.alteration.core.incident.UnknownScopeException;
import fdit.alteration.core.logging.ActionLogger;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;

import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.collect.Maps.newHashMap;
import static fdit.alteration.core.engine.AlterationUtils.*;
import static java.lang.Math.*;
import static java.util.Collections.shuffle;

public class BaseStationSaturationEngine extends BaseStationActionEngine {

    private static final double DISTANCE = 0.2;
    private final Map<Action, HashMap<String, AircraftTrajectory>> trajectories = newHashMap();
    private final HashMap<Action, Integer> aircraftNumbers = newHashMap();
    private final HashMap<Action, HashMap<String, List<GhostAircraft>>> ghostAircrafts = newHashMap();

    BaseStationSaturationEngine(final Recording recording,
                                final SuperAction superAction,
                                final ActionLogger logger,
                                final EngineParameters parameters) {
        super(recording, superAction, logger, parameters);
        for (final Action action : superAction.getActions()) {
            for (final Parameter parameter : action.getParameters().getParameterList()) {
                if (parameter.getNumber() > 0) {
                    aircraftNumbers.put(action, parameter.getNumber());
                }
            }
            aircraftNumbers.putIfAbsent(action, 0);
        }
    }

    private static String messagesToLines(final Collection<Message> messages) {
        final StringBuilder builder = new StringBuilder();
        for (final Message message : messages) {
            builder.append(message.toString()).append('\n');
        }
        builder.deleteCharAt(builder.lastIndexOf("\n"));
        return builder.toString();
    }

    private void createGhostAircrafts(final BaseStationMessage initialMessage, final Action action) {
        ghostAircrafts.putIfAbsent(action, newHashMap());
        HashMap<String, List<GhostAircraft>> aircraftMap = ghostAircrafts.get(action);
        if (!aircraftMap.containsKey(initialMessage.getIcao())) {
            final List<GhostAircraft> ghostAircraftList = newArrayList();
            for (int i = 0; i < aircraftNumbers.get(action); i++) {
                ghostAircraftList.add(new GhostAircraft(
                        getIcaoRandomOffset(initialMessage.getIcao(), 1000),
                        generateRandomAngle(),
                        generateRandomDistanceCoeff(),
                        initialMessage.getTimestampGenerated()));
            }
            aircraftMap.put(initialMessage.getIcao(), ghostAircraftList);
        }
    }

    @Override
    public void preProcessing() throws IOException, UnknownScopeException {
        buildNewTrajectories();
    }

    private void buildNewTrajectories() throws IOException, UnknownScopeException {
        try (final FileReader fileReader = new FileReader(recording.getFile());
             final BufferedReader bufferedReader = new BufferedReader(fileReader)) {
            String currentMessage = bufferedReader.readLine();
            while (currentMessage != null) {
                final Optional<? extends Message> message = parseMessage(currentMessage);
                if (message.isPresent() && message.get() instanceof BaseStationMessage) {
                    for (final Action action : superAction.getConcernedActions((BaseStationMessage) message.get(), recording.getFirstDate())) {
                        createGhostAircrafts((BaseStationMessage) message.get(), action);
                        updateTrajectory((BaseStationMessage) message.get(), action);
                    }
                }
                currentMessage = bufferedReader.readLine();
            }
        }
        trajectories.values().forEach(aircraftTrajectories ->
                aircraftTrajectories.values().forEach(AircraftTrajectory::interpolate));
    }

    private void updateTrajectory(final BaseStationMessage message, final Action action) {
        for (final GhostAircraft ghostAircraft : ghostAircrafts.get(action).get(message.getIcao())) {
            trajectories.putIfAbsent(action, newHashMap());
            trajectories.get(action).putIfAbsent(ghostAircraft.getIcao(), new AircraftTrajectory());
            final long relativeDate = message.getTimestampGenerated() - recording.getFirstDate();
            final long duration = action.getScope().getUpperBound() - action.getScope().getLowerBound();
            final AircraftTrajectory trajectory = trajectories.get(action).get(ghostAircraft.getIcao());
            double progress = min((relativeDate - action.getScope().getLowerBound()) / (duration * 1.0), 1.0);
            final double stepDistance = progress * ghostAircraft.getDistanceCoeff() * DISTANCE;
            if (message instanceof LatitudeParameter) {
                ((LatitudeParameter) message).getLatitude().ifPresent(latitude -> {
                    ghostAircraft.setLatitude(latitude + stepDistance * cos(toRadians(ghostAircraft.getAngle())));
                    trajectory.addLatitude(ghostAircraft.getLatitude(), message.getTimestampGenerated());
                });
            }
            if (message instanceof LongitudeParameter) {
                ((LongitudeParameter) message).getLongitude().ifPresent(longitude -> {
                    ghostAircraft.setLongitude(longitude + stepDistance * sin(toRadians(ghostAircraft.getAngle())));
                    trajectory.addLongitude(ghostAircraft.getLongitude(), message.getTimestampGenerated());
                });
            }
            if (message instanceof AltitudeParameter) {
                ((AltitudeParameter) message).getAltitude().ifPresent(altitude ->
                        trajectory.addAltitude(altitude, message.getTimestampGenerated()));
            }
        }
    }

    @Override
    protected String applyAction(final Message message) throws UnknownScopeException {
        final BaseStationMessage initialMessage = (BaseStationMessage) message;
        final String icao = message.getIcao();
        final List<Message> messages = newArrayList(message);
        for (final Action action : superAction.getConcernedActions(initialMessage, recording.getFirstDate())) {
            for (final GhostAircraft ghostAircraft : ghostAircrafts.get(action).get(icao)) {
                final Message fakeMessage = createMessageFromAircraft(action, initialMessage, ghostAircraft);
                messages.add(fakeMessage);
                updateLogger(fakeMessage);
            }
        }
        shuffle(messages);
        return messagesToLines(messages);
    }

    private Message createMessageFromAircraft(final Action action,
                                              final BaseStationMessage initialMessage,
                                              final GhostAircraft ghostAircraft) {
        final BaseStationMessage fakeMessage = (BaseStationMessage) initialMessage.copy();
        fakeMessage.setIcao(ghostAircraft.getIcao());
        fakeMessage.setAircraftID(ghostAircraft.getAircraftId());

        final AircraftTrajectory trajectory = trajectories.get(action).get(fakeMessage.getIcao());
        final long timestamp = fakeMessage.getTimestampGenerated();
        if (fakeMessage instanceof LatitudeParameter) {
            trajectory.getLatitudeWithNoise(timestamp).ifPresent(((LatitudeParameter) fakeMessage)::setLatitude);
        }
        if (fakeMessage instanceof LongitudeParameter) {
            trajectory.getLongitudeWithNoise(timestamp).ifPresent(((LongitudeParameter) fakeMessage)::setLongitude);
        }
        if (fakeMessage instanceof AltitudeParameter) {
            trajectory.getAltitude(timestamp).ifPresent(aDouble ->
                    ((AltitudeParameter) fakeMessage).setAltitude(round(aDouble)));
        }
        if (fakeMessage instanceof TrackParameter) {
            trajectory.getTrack(timestamp).ifPresent(((TrackParameter) fakeMessage)::setTrack);
        }
        if (fakeMessage instanceof GroundSpeedParameter) {
            trajectory.getGroundSpeed(timestamp).ifPresent(((GroundSpeedParameter) fakeMessage)::setGroundSpeed);
        }
        if (fakeMessage instanceof VerticalRateParameter) {
            trajectory.getVerticalRate(timestamp).ifPresent(((VerticalRateParameter) fakeMessage)::setVerticalRate);
        }
        return fakeMessage;
    }

    public Map<String, List<GhostAircraft>> getGhostAircrafts(final Action action) {
        return ghostAircrafts.get(action);
    }

    @Override
    protected void updateLogger(final Message message) {
        super.updateLogger(message);
        logger.incrementCreatedMessage();
    }
}