package fdit.alteration.core.beast.engine;

import fdit.alteration.core.basestation.message.parameter.*;
import fdit.alteration.core.beast.message.AdsbAirbornePositionMessage;
import fdit.alteration.core.beast.message.BeastMessage;
import fdit.alteration.core.engine.AircraftTrajectory;
import fdit.alteration.core.engine.EngineParameters;
import fdit.alteration.core.engine.Message;
import fdit.alteration.core.engine.SuperAction;
import fdit.alteration.core.incident.Action;
import fdit.alteration.core.incident.Recording;
import fdit.alteration.core.incident.UnknownScopeException;
import fdit.alteration.core.incident.WayPoint;
import fdit.alteration.core.logging.ActionLogger;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.Collection;
import java.util.Map;
import java.util.Optional;

import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.collect.Maps.newHashMap;
import static fdit.alteration.core.engine.AlterationUtils.*;
import static fdit.alteration.core.incident.Parameter.*;
import static java.lang.Math.round;

public class BeastTrajectoryModificationEngine extends BeastActionEngine {

    private final Map<Action, Map<String, AircraftTrajectory>> fakeTrajectories = newHashMap();
    private final Map<Action, Map<String, AircraftTrajectory>> baseTrajectories = newHashMap();
    private final Map<Action, Map<String, Long>> firstAlteredMessage = newHashMap();
    private final Map<Action, Collection<WayPoint>> wayPointsMap = newHashMap();

    BeastTrajectoryModificationEngine(final Recording recording,
                                      final SuperAction superAction,
                                      final ActionLogger logger,
                                      final EngineParameters parameters) {
        super(recording, superAction, logger, parameters);
        for (final Action action : superAction.getActions()) {
            wayPointsMap.putIfAbsent(action, newArrayList());
            wayPointsMap.get(action).addAll(action.getParameters().getTrajectory().getWayPoints());
        }
    }

    @Override
    public void preProcessing() throws IOException, UnknownScopeException {
        buildBaseTrajectories();
        buildFakeTrajectories();
    }

    @Override
    protected String applyAction(final Message message) throws UnknownScopeException {
        final BeastMessage bstMessage = (BeastMessage) message;
        for (final Action action : superAction.getConcernedActions(bstMessage, recording.getFirstDate())) {
            processAlteration(bstMessage, action);
            updateLogger(message);
        }
        final StringBuilder newMessage = new StringBuilder(message.toString());
        if (parameters.isLabeled()) {
            addMaskToMessage(newMessage, message);
        }
        return newMessage.toString();
    }

    private void processAlteration(final BeastMessage message, final Action action) {
        final AircraftTrajectory fakeTrajectory = fakeTrajectories.get(action).get(message.getIcao());
        final Collection<String> characteristics = newArrayList();
        final long timestamp = message.getTimestampNanoAsLong();
        if (!parameters.isDisableLatitude() && message instanceof LatitudeParameter) {
            fakeTrajectory.getLatitude(timestamp, parameters.isLatitudeNoise()).ifPresent(latitude -> {
                ((LatitudeParameter) message).setLatitude(latitude);
                characteristics.add(CHARAC_LATITUDE);
            });
        }
        if (!parameters.isDisableLongitude() && message instanceof LongitudeParameter) {
            fakeTrajectory.getLongitude(timestamp, parameters.isLongitudeNoise()).ifPresent(longitude -> {
                ((LongitudeParameter) message).setLongitude(longitude);
                characteristics.add(CHARAC_LONGITUDE);
            });
        }
        if (!parameters.isDisableAltitude() && message instanceof AltitudeParameter) {
            fakeTrajectory.getAltitude(timestamp).ifPresent(altitude -> {
                ((AltitudeParameter) message).setAltitude(round(altitude));
                characteristics.add(CHARAC_ALTITUDE);
            });
        }
        if (parameters.isTrack() && message instanceof TrackParameter) {
            fakeTrajectory.getTrack(timestamp).ifPresent(newTrack -> {
                ((TrackParameter) message).setTrack(newTrack);
                characteristics.add(CHARAC_TRACK);
            });
        }
        if (parameters.isGroundSpeed() && message instanceof GroundSpeedParameter) {
            fakeTrajectory.getGroundSpeed(timestamp).ifPresent(newGroundSpeed -> {
                ((GroundSpeedParameter) message).setGroundSpeed(newGroundSpeed);
                characteristics.add(CHARAC_GROUNDSPEED);
            });
        }
        if (parameters.isVerticalRate() && message instanceof VerticalRateParameter) {
            fakeTrajectory.getVerticalRate(timestamp).ifPresent(newVerticalRate -> {
                ((VerticalRateParameter) message).setVerticalRate(newVerticalRate);
                characteristics.add(CHARAC_VERTICALRATE);
            });
        }
        int mask = message.getMask() != null ? message.getMask() : 0;
        final int newMask = computeCharacteristicMask(characteristics) | mask;
        message.setMask(newMask);
    }

    private void buildBaseTrajectories() throws IOException {
        try (final FileReader fileReader = new FileReader(recording.getFile());
             final BufferedReader bufferedReader = new BufferedReader(fileReader)) {
            String currentMessage = bufferedReader.readLine();
            while (currentMessage != null) {
                final Optional<? extends Message> message = parseMessage(currentMessage);
                if (message.isPresent() && message.get() instanceof BeastMessage) {
                    updateBaseTrajectory((BeastMessage) message.get());
                }
                currentMessage = bufferedReader.readLine();
            }
        }
        baseTrajectories.values().forEach(aircraftTrajectories ->
                aircraftTrajectories.values().forEach(AircraftTrajectory::interpolate));
    }

    private void updateBaseTrajectory(final BeastMessage message) {
        for (final Action action : superAction.getActions()) {
            if (isMessageTargeted(message, action.getParameters().getTarget().getContent())) {
                baseTrajectories.putIfAbsent(action, newHashMap());
                baseTrajectories.get(action).putIfAbsent(message.getIcao(), new AircraftTrajectory());
                final AircraftTrajectory trajectory = baseTrajectories.get(action).get(message.getIcao());
                addMessageToTrajectory(message, trajectory);
            }
        }
    }

    private void buildFakeTrajectories() throws IOException, UnknownScopeException {
        try (final FileReader fileReader = new FileReader(recording.getFile());
             final BufferedReader bufferedReader = new BufferedReader(fileReader)) {
            String currentMessage = bufferedReader.readLine();
            while (currentMessage != null) {
                final Optional<? extends Message> message = parseMessage(currentMessage);
                if (message.isPresent() && message.get() instanceof BeastMessage) {
                    updateFakeTrajectory((BeastMessage) message.get());
                }
                currentMessage = bufferedReader.readLine();
            }
        }
        fakeTrajectories.values().forEach(aircraftTrajectories ->
                aircraftTrajectories.values().forEach(AircraftTrajectory::interpolate));
    }

    private void updateFakeTrajectory(final BeastMessage message) throws UnknownScopeException {
        for (final Action action : superAction.getActions()) {
            if (isMessageTargeted(message, action.getParameters().getTarget().getContent())) {
                fakeTrajectories.putIfAbsent(action, newHashMap());
                fakeTrajectories.get(action).putIfAbsent(message.getIcao(), new AircraftTrajectory());
                final AircraftTrajectory fakeTrajectory = fakeTrajectories.get(action).get(message.getIcao());
                if (!isMessageInScope(message, action.getScope(), firstDate)) {
                    addMessageToTrajectory(message, fakeTrajectory);
                } else {
                    final AircraftTrajectory baseTrajectory = baseTrajectories.get(action).get(message.getIcao());
                    firstAlteredMessage.putIfAbsent(action, newHashMap());
                    if (!firstAlteredMessage.get(action).containsKey(message.getIcao())) {
                        addMessageToTrajectory(message, fakeTrajectory);
                        final long timestamp = message.getTimestampNanoAsLong();
                        firstAlteredMessage.put(action, newHashMap());
                        firstAlteredMessage.get(action).put(message.getIcao(), timestamp);
                        addWaypointsToTrajectory(action, fakeTrajectory, baseTrajectory);
                    }
                }
            }
        }
    }

    private void addWaypointsToTrajectory(final Action action,
                                          final AircraftTrajectory fakeTrajectory,
                                          final AircraftTrajectory baseTrajectory) {
        for (final WayPoint wayPoint : wayPointsMap.get(action)) {
            wayPoint.setTime(wayPoint.getTime() * 1000000);
            addAltitudeToTrajectory(fakeTrajectory, baseTrajectory, wayPoint, recording.getFirstDate());
            addLatitudeToTrajectory(fakeTrajectory, baseTrajectory, wayPoint, recording.getFirstDate());
            addLongitudeToTrajectory(fakeTrajectory, baseTrajectory, wayPoint, recording.getFirstDate());
        }
    }

    private void addMessageToTrajectory(final BeastMessage message,
                                        final AircraftTrajectory trajectory) {
        if (message instanceof AdsbAirbornePositionMessage) {
            trajectory.addLatitude(
                    ((AdsbAirbornePositionMessage) message).getPosition().getLatitude(),
                    message.getTimestampNanoAsLong());
            trajectory.addLongitude(
                    ((AdsbAirbornePositionMessage) message).getPosition().getLongitude(),
                    message.getTimestampNanoAsLong());
            trajectory.addAltitude(
                    ((AdsbAirbornePositionMessage) message).getPosition().getAltitude(),
                    message.getTimestampNanoAsLong());
        }
    }

    public Map<String, AircraftTrajectory> getFakeTrajectories(final Action action) {
        return fakeTrajectories.get(action);
    }

    @Override
    protected void updateLogger(final Message message) {
        super.updateLogger(message);
        logger.incrementAlteredMessage();
    }
}