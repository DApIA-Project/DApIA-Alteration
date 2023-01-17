package fdit.alteration.core.engine;

import fdit.alteration.core.basestation.engine.BaseStationActionEngine;
import fdit.alteration.core.beast.engine.BeastActionEngine;
import fdit.alteration.core.incident.Action;
import fdit.alteration.core.incident.Recording;
import fdit.alteration.core.incident.UnknownCharacteristicException;
import fdit.alteration.core.incident.UnknownScopeException;
import fdit.alteration.core.logging.ActionLogger;

import java.io.*;
import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.io.Files.getFileExtension;
import static java.io.File.createTempFile;
import static java.util.Optional.empty;
import static java.util.Optional.of;

public class EngineManager {

    private static final String BEAST_EXTENSION = "json";
    private static final String SBS_EXTENSION = "sbs";
    private static final String BST_EXTENSION = "bst";

    protected final Recording recording;
    protected String extension;
    protected final Collection<Action> actions;
    protected final ActionLogger logger;
    protected final EngineParameters parameters;
    protected final Collection<ActionEngine> engines = newArrayList();

    public EngineManager(final Recording recording,
                         final Collection<Action> actions,
                         final ActionLogger logger) {
        this.recording = recording;
        this.actions = actions;
        this.logger = logger;
        this.parameters = new EngineParameters();
    }

    public EngineManager(final Recording recording,
                         final Collection<Action> actions,
                         final ActionLogger logger,
                         final EngineParameters parameters) {
        this.recording = recording;
        this.actions = actions;
        this.logger = logger;
        this.parameters = parameters;
    }

    public File run() throws Exception {
        extension = getFileExtension(recording.getFile().getName()).toLowerCase().trim();
        if (extension.compareTo(BEAST_EXTENSION) == 0) {
            engines.addAll(BeastActionEngine.createEngines(recording, actions, logger, parameters));
        } else if (extension.compareTo(BST_EXTENSION) == 0 ||
                extension.compareTo(SBS_EXTENSION) == 0) {
            engines.addAll(BaseStationActionEngine.createEngines(recording, actions, logger, parameters));
        } else {
            throw new UnrecognizedRecordingException(recording.getFile().getName());
        }
        return runEngines();
    }

    protected File runEngines() throws IOException, UnknownScopeException, UnknownCharacteristicException {
        final File recordingFile = recording.getFile();
        final File outputFile = createTempFile(UUID.randomUUID().toString(), extension);
        try (final FileReader fileReader = new FileReader(recordingFile);
             final BufferedReader bufferedReader = new BufferedReader(fileReader);
             final FileWriter fileWriter = new FileWriter(outputFile);
             final BufferedWriter bufferedWriter = new BufferedWriter(fileWriter)) {
            String currentMessage = bufferedReader.readLine();
            while (currentMessage != null) {
                final Optional<String> alteredMessage = handleMessage(currentMessage);
                if (alteredMessage.isPresent()) {
                    bufferedWriter.write(alteredMessage.get() + "\n");
                }
                currentMessage = bufferedReader.readLine();
            }
            for (final ActionEngine engine : engines) {
                bufferedWriter.write(engine.postProcessing() + "\n");
            }
        }
        return outputFile;
    }

    private Optional<String> handleMessage(String message) throws
            UnknownScopeException,
            UnknownCharacteristicException {
        for (final ActionEngine engine : engines) {
            final Optional<? extends Message> processedMessage = engine.parseMessage(message);
            if (processedMessage.isPresent()) {
                message = engine.applyAction(processedMessage.get());
            }
        }
        if (!message.isEmpty()) {
            return of(message);
        }
        return empty();
    }
}