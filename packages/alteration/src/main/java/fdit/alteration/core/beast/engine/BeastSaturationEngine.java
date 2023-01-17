package fdit.alteration.core.beast.engine;

import fdit.alteration.core.basestation.message.parameter.*;
import fdit.alteration.core.beast.message.BeastMessage;
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

public class BeastSaturationEngine extends BeastActionEngine {

    private static final double TRANSLATION_DURATION = 600000;
    private static final double DISTANCE = 0.2;
    private final Map<Action, HashMap<String, AircraftTrajectory>> trajectories = newHashMap();
    private final HashMap<Action, Integer> aircraftNumbers = newHashMap();
    private final HashMap<Action, HashMap<String, List<GhostAircraft>>> ghostAircrafts = newHashMap();

    BeastSaturationEngine(final Recording recording,
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

    private String messagesToLines(final Collection<BeastMessage> messages) {
        final StringBuilder builder = new StringBuilder();
        for (final BeastMessage message : messages) {
            builder.append(serializer.serialize(message)).append('\n');
        }
        builder.deleteCharAt(builder.lastIndexOf("\n"));
        return builder.toString();
    }

    private void createGhostAircrafts(final BeastMessage initialMessage, final Action action) {
        ghostAircrafts.putIfAbsent(action, newHashMap());
        HashMap<String, List<GhostAircraft>> aircraftMap = ghostAircrafts.get(action);
        if (!aircraftMap.containsKey(initialMessage.getIcao())) {
            final List<GhostAircraft> ghostAircraftList = newArrayList();
            for (int i = 0; i < aircraftNumbers.get(action); i++) {
                ghostAircraftList.add(new GhostAircraft(
                        getIcaoRandomOffset(initialMessage.getIcao(), 1000),
                        generateRandomAngle(),
                        generateRandomDistanceCoeff(),
                        initialMessage.getTimestampNanoAsLong()));
            }
            aircraftMap.put(initialMessage.getIcao(), ghostAircraftList);
        }
    }

    @Override
    public void preProcessing() throws Exception {
        buildNewTrajectories();
    }

    private void buildNewTrajectories() throws IOException, UnknownScopeException {
        try (final FileReader fileReader = new FileReader(recording.getFile());
             final BufferedReader bufferedReader = new BufferedReader(fileReader)) {
            String currentMessage = bufferedReader.readLine();
            while (currentMessage != null) {
                final Optional<? extends Message> message = parseMessage(currentMessage);
                if (message.isPresent() && message.get() instanceof BeastMessage) {
                    for (final Action action : superAction.getConcernedActions((BeastMessage) message.get(), recording.getFirstDate())) {
                        createGhostAircrafts((BeastMessage) message.get(), action);
                        updateTrajectory((BeastMessage) message.get(), action);
                    }
                }
                currentMessage = bufferedReader.readLine();
            }
        }
        trajectories.values().forEach(aircraftTrajectories ->
                aircraftTrajectories.values().forEach(AircraftTrajectory::interpolate));
    }

    private void updateTrajectory(final BeastMessage message, final Action action) {
        for (final GhostAircraft ghostAircraft : ghostAircrafts.get(action).get(message.getIcao())) {
            trajectories.putIfAbsent(action, newHashMap());
            trajectories.get(action).put(ghostAircraft.getIcao(), new AircraftTrajectory());
            final AircraftTrajectory trajectory = trajectories.get(action).get(ghostAircraft.getIcao());
            double progress = min((message.getTimestampNanoAsLong() - ghostAircraft.getFirstAppearance()) / TRANSLATION_DURATION, 1);
            final double stepDistance = progress * ghostAircraft.getDistanceCoeff() * DISTANCE;
            if (message instanceof LatitudeParameter) {
                ((LatitudeParameter) message).getLatitude().ifPresent(latitude -> {
                    ghostAircraft.setLatitude(latitude + stepDistance * cos(toRadians(ghostAircraft.getAngle())));
                    trajectory.addLatitude(ghostAircraft.getLatitude(), message.getTimestampNanoAsLong());
                });
            }
            if (message instanceof LongitudeParameter) {
                ((LongitudeParameter) message).getLongitude().ifPresent(longitude -> {
                    ghostAircraft.setLongitude(longitude + stepDistance * sin(toRadians(ghostAircraft.getAngle())));
                    trajectory.addLongitude(ghostAircraft.getLongitude(), message.getTimestampNanoAsLong());
                });
            }
            if (message instanceof AltitudeParameter) {
                ((AltitudeParameter) message).getAltitude().ifPresent(altitude ->
                        trajectory.addAltitude(altitude, message.getTimestampNanoAsLong()));
            }
        }
    }

    @Override
    protected String applyAction(final Message message) throws UnknownScopeException {
        final BeastMessage initialMessage = (BeastMessage) message;
        final String icao = message.getIcao();
        final List<BeastMessage> messages = newArrayList(initialMessage);
        for (final Action action : superAction.getConcernedActions(initialMessage, recording.getFirstDate())) {
            for (final GhostAircraft ghostAircraft : ghostAircrafts.get(action).get(icao)) {
                final BeastMessage fakeMessage = createMessageFromAircraft(action, initialMessage, ghostAircraft);
                messages.add(fakeMessage);
                updateLogger(fakeMessage);
            }
        }
        shuffle(messages);
        return messagesToLines(messages);
    }

    private BeastMessage createMessageFromAircraft(final Action action,
                                                   final BeastMessage initialMessage,
                                                   final GhostAircraft ghostAircraft) {
        final BeastMessage fakeMessage = (BeastMessage) initialMessage.copy();
        fakeMessage.setIcao(ghostAircraft.getIcao());

        final AircraftTrajectory trajectory = trajectories.get(action).get(fakeMessage.getIcao());
        final long timestamp = fakeMessage.getTimestampNanoAsLong();
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