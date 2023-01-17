package fdit.alteration.core.beast.engine;

import fdit.alteration.core.beast.message.BeastMessage;
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

public class BeastDeletionEngine extends BeastActionEngine {

    private HashMap<Action, Integer> counters = newHashMap();
    private HashMap<Action, Integer> frequencies = newHashMap();

    BeastDeletionEngine(final Recording recording,
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
        final BeastMessage beastMessage = (BeastMessage) message;
        for (final Action action : superAction.getConcernedActions(beastMessage, recording.getFirstDate())) {
            counters.put(action, counters.get(action) + 1);
            if (!counters.get(action).equals(frequencies.get(action)) || frequencies.get(action) == 0) {
                updateLogger(message);
                return "";
            } else {
                counters.put(action, 0);
            }
        }
        return serializer.serialize(beastMessage);
    }

    @Override
    protected void updateLogger(final Message message) {
        super.updateLogger(message);
        logger.incrementDeletedMessage();
    }
}