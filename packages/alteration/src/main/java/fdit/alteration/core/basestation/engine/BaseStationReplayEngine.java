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
import java.lang.reflect.Array;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

import static com.google.common.collect.Queues.newPriorityQueue;
import static fdit.alteration.core.engine.AlterationUtils.alterMessage;
import static java.util.Objects.requireNonNull;

public class BaseStationReplayEngine extends BaseStationActionEngine {


    private final PriorityQueue<BaseStationMessage> messages = newPriorityQueue();
    private final Map<String,List<BaseStationMessage>> messagesAlreadyPassed = new HashMap<>();

    BaseStationReplayEngine(final Recording recording,
                            final SuperAction superAction,
                            final ActionLogger logger,
                            final EngineParameters parameters) {
        super(recording, superAction, logger, parameters);
    }

    @Override
    public void preProcessing() throws IOException {
        String recordPath = "";
        for(Action actions : superAction.getActions()){
            recordPath = actions.getParameters().getRecordPath();
        }
        final File sourceRecording = new File(recordPath);
        List<BaseStationMessage> extractedAllMessage = extractAllMessages(sourceRecording);
        for (final Action actions : superAction.getActions()) {
            final Scope scope = actions.getScope();
            final Target target = actions.getParameters().getTarget();
            List<BaseStationMessage> extractedMessagesToAlter = extractMessagesToAlter(extractedAllMessage, target, (scope.getUpperBound() - scope.getLowerBound()));
            if(actions.getParameters().getParameterList().size() != 0 && actions.getParameters().getParameterByName("hexIdent") != null){
                adjustTimestamp(scope.getLowerBound(),actions.getParameters().getParameterByName("hexIdent").getValue(),extractedMessagesToAlter);
            }else{
                adjustTimestamp(scope.getLowerBound(),target.getIdentifier(),extractedMessagesToAlter);
               }

        }
        sortByTimestamp();
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
                if(action.getParameters().getParameterList().size() != 0 && action.getParameters().getParameterByName("hexIdent") != null) {
                    if (isMessageTargeted(fakeMessage, action.getParameters().getTarget().getContent()) && isMessageTargetedIfManyReplay(fakeMessage, messagesAlreadyPassed, action))
                        alterMessage(action, fakeMessage);
                }else{
                    if (isMessageTargeted(fakeMessage, action.getParameters().getTarget().getContent()))
                        alterMessage(action, fakeMessage);
                }
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
            final Message fakeMessage = messages.poll();
            superAction.getActions().forEach(action -> {
                if(action.getParameters().getParameterList().size() != 0 && action.getParameters().getParameterByName("hexIdent") != null) {
                    if (isMessageTargeted(fakeMessage, action.getParameters().getTarget().getContent()) && isMessageTargetedIfManyReplay(fakeMessage, messagesAlreadyPassed, action))
                        alterMessage(action, fakeMessage);
                }else{
                    if (isMessageTargeted(fakeMessage, action.getParameters().getTarget().getContent()))
                        alterMessage(action, fakeMessage);
                }
            });
            builder.append(fakeMessage).append("\n");
        }
        return builder.toString();
    }

    private void sortByTimestamp(){
        PriorityQueue<BaseStationMessage> sortedQueue = new PriorityQueue<>(Comparator.comparingLong(BaseStationMessage::getTimestampGenerated));
        sortedQueue.addAll(messages);
        messages.clear();
        messages.addAll(sortedQueue);
    }

    private void adjustTimestamp(final long scopeTimeOffset,String icaoValue, List<BaseStationMessage> extractedMessages) {
        long oldTimestamp = 0;
        if (!extractedMessages.isEmpty()) {
            oldTimestamp = extractedMessages.get(0).getTimestampGenerated();
        }
        Map<String,List<BaseStationMessage>> messagesPassed = new HashMap<>();
        for (final BaseStationMessage message : extractedMessages) {
            messagesAlreadyPassed.computeIfAbsent(icaoValue, k -> new ArrayList<>());
            boolean messageInOtherIcao = false;
            for(String key : messagesAlreadyPassed.keySet()){
                if(messagesAlreadyPassed.get(key).contains(message)){
                    messageInOtherIcao=true;
                }
            }
            messagesPassed.computeIfAbsent(icaoValue, k -> new ArrayList<>());

            message.setTimestampGenerated(recording.getFirstDate() + message.getTimestampGenerated() - oldTimestamp + scopeTimeOffset);
            message.setTimestampLogged(recording.getFirstDate() + message.getTimestampLogged() - oldTimestamp + scopeTimeOffset);
            messagesPassed.get(icaoValue).add(message);
            messages.add(message);


        }

        messagesAlreadyPassed.putAll(messagesPassed);
    }

    private List<BaseStationMessage> extractMessages(final File recording, final Target target, final long timeInterval) throws IOException {
        List<BaseStationMessage> messagesList = new ArrayList<>();
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
                            messagesList.add(message);
                        } else if (message.getTimestampGenerated() - firstTimestamp <= timeInterval) {
                            messagesList.add(message);
                        }
                    }
                }
                currentMessage = bufferedReader.readLine();
            }
        }
        return messagesList;
    }


    private List<BaseStationMessage> extractMessagesToAlter(final List<BaseStationMessage> recording, final Target target, final long timeInterval) throws IOException {
        List<BaseStationMessage> messagesList = new ArrayList<>();
        long firstTimestamp = -1;
        for (BaseStationMessage messageOfList : recording){

            if (isMessageTargeted(messageOfList, target.getContent())) {
                if (firstTimestamp == -1) {
                    firstTimestamp = messageOfList.getTimestampGenerated();
                    messagesList.add((BaseStationMessage) messageOfList.copy());
                } else if (messageOfList.getTimestampGenerated() - firstTimestamp <= timeInterval) {
                    messagesList.add((BaseStationMessage) messageOfList.copy());
                }
            }
        }
        return messagesList;
    }

    private List<BaseStationMessage> extractAllMessages(final File recording) throws IOException {
        List<BaseStationMessage> messagesList = new ArrayList<>();
        Path filePath = recording.toPath();
        List<String> allLines = Files.readAllLines(filePath, StandardCharsets.UTF_8);

        for (String currentMessage : allLines) {
            final Optional<Message> messageOptional = parseMessage(currentMessage);
            if (messageOptional.isPresent() && messageOptional.get() instanceof BaseStationMessage) {
                final BaseStationMessage message = (BaseStationMessage) messageOptional.get();
                messagesList.add(message);
            }
        }

        return messagesList;


        /*List<BaseStationMessage> messagesList = new ArrayList<>();
        try (final FileReader fileReader = new FileReader(recording);
             final BufferedReader bufferedReader = new BufferedReader(fileReader)) {
            String currentMessage = bufferedReader.readLine();
            while (currentMessage != null) {
                final Optional<Message> messageOptional = parseMessage(currentMessage);
                if (messageOptional.isPresent() && messageOptional.get() instanceof BaseStationMessage) {
                    final BaseStationMessage message = (BaseStationMessage) messageOptional.get();
                    messagesList.add(message);
                }
                currentMessage = bufferedReader.readLine();
            }
        }
        return messagesList;*/
    }

    @Override
    protected void updateLogger(final Message message) {
        super.updateLogger(message);
        logger.incrementCreatedMessage();
    }
}