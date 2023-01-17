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

import static fdit.alteration.core.incident.Parameter.CHARAC_TIMESTAMP;
import static java.lang.Long.parseLong;

public class BeastDelayEngine extends BeastActionEngine {

    BeastDelayEngine(final Recording recording,
                     final SuperAction superAction,
                     final ActionLogger logger,
                     final EngineParameters parameters) {
        super(recording, superAction, logger, parameters);
    }

    @Override
    protected String applyAction(final Message message) throws UnknownScopeException {
        final BeastMessage beastMessage = (BeastMessage) message;
        for (final Action action : superAction.getConcernedActions(beastMessage, recording.getFirstDate())) {
            for (final Parameter parameter : action.getParameters().getParameterList()) {
                if (parameter.getCharacteristic().compareTo(CHARAC_TIMESTAMP) == 0) {
                    beastMessage.setTimestampNano(beastMessage.getTimestampNanoAsLong() + parseLong(parameter.getValue()));
                    updateLogger(message);
                }
            }
        }
        return serializer.serialize(beastMessage);
    }

    @Override
    protected void updateLogger(final Message message) {
        super.updateLogger(message);
        logger.incrementModifiedMessage();
    }
}