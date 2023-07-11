package fdit.alteration.core.basestation.engine;

import fdit.alteration.core.basestation.message.BaseStationMessage;
import fdit.alteration.core.basestation.message.BaseStationMessageFull;
import fdit.alteration.core.engine.AircraftTrajectory;
import fdit.alteration.core.engine.EngineParameters;
import fdit.alteration.core.engine.Message;
import fdit.alteration.core.engine.SuperAction;
import fdit.alteration.core.incident.Action;
import fdit.alteration.core.incident.Recording;
import fdit.alteration.core.logging.ActionLogger;

import java.util.PriorityQueue;

import static com.google.common.collect.Queues.newPriorityQueue;
import static fdit.alteration.core.engine.AlterationUtils.*;
import static java.util.Objects.requireNonNull;

public class BaseStationCreationEngine extends BaseStationActionEngine {

    private final PriorityQueue<BaseStationMessage> messages = newPriorityQueue();

    BaseStationCreationEngine(final Recording recording,
                              final SuperAction superAction,
                              final ActionLogger logger,
                              final EngineParameters parameters) {
        super(recording, superAction, logger, parameters);
    }

    private BaseStationMessage createMessageFromTrajectory(final long timestamp,
                                                           final int sessionID,
                                                           final int aircraftID,
                                                           final int flightID,
                                                           final AircraftTrajectory trajectory) {
        return new BaseStationMessageFull(
                3,
                sessionID,
                aircraftID,
                "",
                flightID,
                timestamp,
                timestamp,
                "",
                trajectory.getAltitude(timestamp).orElse(null),
                trajectory.getGroundSpeed(timestamp).orElse(null),
                trajectory.getTrack(timestamp).orElse(null),
                trajectory.getLatitude(timestamp, parameters.isLatitudeNoise()).orElse(null),
                trajectory.getLongitude(timestamp, parameters.isLongitudeNoise()).orElse(null),
                trajectory.getVerticalRate(timestamp).orElse(null),
                null,
                null,
                null,
                null,
                null,
                null);
    }

    @Override
    public void preProcessing() {
        for (final Action action : superAction.getActions()) {
            generateMessages(action, createTrajectory(recording.getFirstDate(), action));
        }
        for (final Message message : messages) {
            updateLogger(message);
        }
    }

    @Override
    protected String applyAction(final Message message) {
        final BaseStationMessage baseStationMessage = (BaseStationMessage) message;
        final StringBuilder builder = new StringBuilder();
        while (!messages.isEmpty() &&
                baseStationMessage.getTimestampGenerated() >
                        requireNonNull(messages.peek()).getTimestampGenerated()) {
            final Message fakeMessage = messages.poll();
            builder.append(fakeMessage).append("\n");
        }
        builder.append(message);
        return builder.toString();
    }

    @Override
    public String postProcessing() {
        final StringBuilder builder = new StringBuilder();
        while (!messages.isEmpty()) {
            builder.append(messages.poll()).append("\n");
        }
        return builder.toString();
    }

    protected int getTimeOffset() {
        return RANDOM.nextInt(200) + 400;
    }

    private void generateMessages(final Action action, final AircraftTrajectory trajectory) {
        long timestamp = action.getScope().getLowerBound();
        final int sessionID = RANDOM.nextInt(1000);
        final int aircraftID = RANDOM.nextInt(1000);
        final int flightID = RANDOM.nextInt(1000);
        while (timestamp < action.getScope().getUpperBound()) {
            final BaseStationMessage newMessage = createMessageFromTrajectory(
                    recording.getFirstDate() + timestamp,
                    sessionID,
                    aircraftID,
                    flightID,
                    trajectory);
            alterMessage(action, newMessage);
            messages.add(newMessage);
            timestamp += getTimeOffset();
        }
    }

    public PriorityQueue<BaseStationMessage> getMessages() {
        return messages;
    }

    @Override
    protected void updateLogger(final Message message) {
        super.updateLogger(message);
        logger.incrementCreatedMessage();
    }
}