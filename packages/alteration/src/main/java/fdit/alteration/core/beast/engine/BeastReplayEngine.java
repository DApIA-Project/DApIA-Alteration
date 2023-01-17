package fdit.alteration.core.beast.engine;

import fdit.alteration.core.beast.message.BeastMessage;
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

public class BeastReplayEngine extends BeastActionEngine {

    private PriorityQueue<BeastMessage> messages = newPriorityQueue();

    BeastReplayEngine(final Recording recording,
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
        final BeastMessage beastMessage = (BeastMessage) message;
        final StringBuilder builder = new StringBuilder();
        while (!messages.isEmpty() &&
                beastMessage.getTimestampNanoAsLong() >
                        requireNonNull(messages.peek()).getTimestampNanoAsLong()) {
            final Message fakeMessage = messages.poll();
            superAction.getActions().forEach(action -> {
                if (isMessageTargeted(fakeMessage, action.getParameters().getTarget().getContent()))
                    alterMessage(action, fakeMessage);
            });
            builder.append(serializer.serialize(messages.poll())).append("\n");
        }
        builder.append(serializer.serialize(beastMessage));
        return builder.toString();
    }

    @Override
    public String postProcessing() {
        final StringBuilder builder = new StringBuilder();
        while (!messages.isEmpty()) {
            builder.append(serializer.serialize(messages.poll())).append("\n");
        }
        return builder.toString();
    }

    private void adjustTimestamp(final long newTimestamp) {
        long oldTimestamp = 0;
        if (!messages.isEmpty()) {
            oldTimestamp = messages.peek().getTimestampNanoAsLong();
        }
        for (final BeastMessage message : messages) {
            message.setTimestampNano(message.getTimestampNanoAsLong() - oldTimestamp + newTimestamp);
        }
    }

    private void extractMessages(final File recording, final Target target, final long timeInterval) throws IOException {
        try (final FileReader fileReader = new FileReader(recording);
             final BufferedReader bufferedReader = new BufferedReader(fileReader)) {
            String currentMessage = bufferedReader.readLine();
            long firstTimestamp = -1;
            while (currentMessage != null) {
                final Optional<Message> messageOptional = parseMessage(currentMessage);
                if (messageOptional.isPresent() && messageOptional.get() instanceof BeastMessage) {
                    final BeastMessage message = (BeastMessage) messageOptional.get();
                    if (isMessageTargeted(message, target.getContent())) {
                        if (firstTimestamp == -1) {
                            firstTimestamp = message.getTimestampNanoAsLong();
                            messages.add(message);
                        } else if (message.getTimestampNanoAsLong() - firstTimestamp <= timeInterval) {
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