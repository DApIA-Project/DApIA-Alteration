package fdit.alteration.core.basestation.engine;

import fdit.alteration.core.basestation.message.BaseStationMessage;
import fdit.alteration.core.engine.EngineParameters;
import fdit.alteration.core.engine.Message;
import fdit.alteration.core.engine.SuperAction;
import fdit.alteration.core.incident.Action;
import fdit.alteration.core.incident.Recording;
import fdit.alteration.core.incident.Scope;
import fdit.alteration.core.incident.Target;
import fdit.alteration.core.logging.ActionLogger;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.Optional;
import java.util.PriorityQueue;

import static com.google.common.collect.Queues.newPriorityQueue;
import static fdit.alteration.core.engine.AlterationUtils.alterMessage;
import static java.util.Objects.requireNonNull;

public class BaseStationReplayEngine extends BaseStationActionEngine {


    private final PriorityQueue<BaseStationMessage> messages = newPriorityQueue();

    BaseStationReplayEngine(final Recording recording,
                            final SuperAction superAction,
                            final ActionLogger logger,
                            final EngineParameters parameters) {
        super(recording, superAction, logger, parameters);
    }

    @Override
    public void preProcessing() throws IOException {
        for (final Action actions : superAction.getActions()) {
            final File sourceRecording = new File(actions.getParameters().getRecordPath());
            final Scope scope = actions.getScope();
            final Target target = actions.getParameters().getTarget();
            extractMessages(sourceRecording, target, (scope.getUpperBound() - scope.getLowerBound()));
            adjustTimestamp(scope.getLowerBound());
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
            superAction.getActions().forEach(action -> {
                if (isMessageTargeted(fakeMessage, action.getParameters().getTarget().getContent()))
                    alterMessage(action, fakeMessage);
            });
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

    private void adjustTimestamp(final long scopeTimeOffset) {
        long oldTimestamp = 0;
        if (!messages.isEmpty()) {
            oldTimestamp = messages.peek().getTimestampGenerated();
        }
        for (final BaseStationMessage message : messages) {
            message.setTimestampGenerated(recording.getFirstDate() + message.getTimestampGenerated() - oldTimestamp + scopeTimeOffset);
            message.setTimestampLogged(recording.getFirstDate() + message.getTimestampLogged() - oldTimestamp + scopeTimeOffset);
        }
    }

    private void extractMessages(final File recording, final Target target, final long timeInterval) throws IOException {
        try (final FileReader fileReader = new FileReader(recording);
             final BufferedReader bufferedReader = new BufferedReader(fileReader)) {
            String currentMessage = bufferedReader.readLine();
            long firstTimestamp = -1;
            while (currentMessage != null) {
                final Optional<Message> messageOptional = parseMessage(currentMessage);
                if (messageOptional.isPresent() && messageOptional.get() instanceof BaseStationMessage) {
                    final BaseStationMessage message = (BaseStationMessage) messageOptional.get();
                    if (isMessageTargeted(message, target.getContent())) {
                        if (firstTimestamp == -1) {
                            firstTimestamp = message.getTimestampGenerated();
                            messages.add(message);
                        } else if (message.getTimestampGenerated() - firstTimestamp <= timeInterval) {
                            messages.add(message);
                        }
                    }
                }
                currentMessage = bufferedReader.readLine();
            }
        }
    }

    @Override
    protected void updateLogger(final Message message) {
        super.updateLogger(message);
        logger.incrementCreatedMessage();
    }
}