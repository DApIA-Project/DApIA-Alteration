package fdit.alteration.core.engine;

import fdit.alteration.core.incident.Recording;
import fdit.alteration.core.incident.UnknownCharacteristicException;
import fdit.alteration.core.incident.UnknownScopeException;
import fdit.alteration.core.logging.ActionLogger;

import java.util.Optional;

import static fdit.alteration.core.incident.Target.TARGET_ALL;
import static java.util.Arrays.asList;

public abstract class ActionEngine {

    private static final String BEAST_EXTENSION = "json";
    private static final String SBS_EXTENSION = "sbs";
    private static final String BST_EXTENSION = "bst";

    protected final Recording recording;
    protected final SuperAction superAction;
    protected final ActionLogger logger;
    protected final EngineParameters parameters;

    protected ActionEngine(final Recording recording,
                           final SuperAction superAction,
                           final ActionLogger logger,
                           final EngineParameters parameters) {
        this.recording = recording;
        this.superAction = superAction;
        this.logger = logger;
        this.parameters = parameters;
    }

    protected static boolean isMessageTargeted(final Message message, final String targetsStr) {
        return targetsStr.compareToIgnoreCase(TARGET_ALL) == 0 ||
                asList(targetsStr.toLowerCase().split(",")).contains(message.getIcao().toLowerCase());
    }

    public void preProcessing() throws Exception {
    }

    public String postProcessing() {
        return "";
    }

    protected abstract String getExtension();

    protected abstract Optional<Message> parseMessage(final String message);

    protected abstract String applyAction(final Message message) throws UnknownScopeException, UnknownCharacteristicException;

    protected abstract void updateLogger(final Message message);
}