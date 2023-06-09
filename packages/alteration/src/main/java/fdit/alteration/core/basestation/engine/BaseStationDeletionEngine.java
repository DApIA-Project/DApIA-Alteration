package fdit.alteration.core.basestation.engine;

import fdit.alteration.core.basestation.message.BaseStationMessage;
import fdit.alteration.core.engine.EngineParameters;
import fdit.alteration.core.engine.Message;
import fdit.alteration.core.engine.SuperAction;
import fdit.alteration.core.incident.Action;
import fdit.alteration.core.incident.Parameter;
import fdit.alteration.core.incident.Recording;
import fdit.alteration.core.incident.UnknownScopeException;
import fdit.alteration.core.logging.ActionLogger;

import java.util.HashMap;

import static com.google.common.collect.Maps.newHashMap;
import static fdit.alteration.core.engine.AlterationUtils.addMaskToMessage;

public class BaseStationDeletionEngine extends BaseStationActionEngine {

    private final HashMap<Action, Integer> counters = newHashMap();
    private final HashMap<Action, Integer> frequencies = newHashMap();

    BaseStationDeletionEngine(final Recording recording,
                              final SuperAction superAction,
                              final ActionLogger logger,
                              final EngineParameters parameters) {
        super(recording, superAction, logger, parameters);
        for (final Action action : superAction.getActions()) {
            for (final Parameter parameter : action.getParameters().getParameterList()) {
                if (parameter.getFrequency() > 0) {
                    frequencies.put(action, parameter.getFrequency());
                }
            }
            frequencies.putIfAbsent(action, 0);
            counters.put(action, frequencies.get(action));
        }
    }

    @Override
    protected String applyAction(final Message message) throws UnknownScopeException {
        final BaseStationMessage bstMessage = (BaseStationMessage) message;
        for (final Action action : superAction.getConcernedActions(bstMessage, recording.getFirstDate())) {
            if (!counters.get(action).equals(frequencies.get(action)) || frequencies.get(action) == 0) {
                counters.put(action, counters.get(action) + 1);
                updateLogger(message);
                return "";
            } else {
                counters.put(action, 0);
            }
        }
        message.setMask(message.getMask());
        if (parameters.isLabeled()) {
            return message.toStringWithMask();
        }
        return message.toString();
    }

    @Override
    protected void updateLogger(final Message message) {
        super.updateLogger(message);
        logger.incrementDeletedMessage();
    }
}