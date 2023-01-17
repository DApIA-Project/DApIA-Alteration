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

import static fdit.alteration.core.incident.Parameter.CHARAC_TIMESTAMP;
import static java.lang.Long.parseLong;

public class BaseStationDelayEngine extends BaseStationActionEngine {

    BaseStationDelayEngine(final Recording recording,
                           final SuperAction superAction,
                           final ActionLogger logger,
                           final EngineParameters parameters) {
        super(recording, superAction, logger, parameters);
    }

    @Override
    protected String applyAction(final Message message) throws UnknownScopeException {
        final BaseStationMessage bstMessage = (BaseStationMessage) message;
        for (final Action action : superAction.getConcernedActions(bstMessage, recording.getFirstDate())) {
            for (final Parameter parameter : action.getParameters().getParameterList()) {
                if (parameter.getCharacteristic().compareTo(CHARAC_TIMESTAMP) == 0) {
                    bstMessage.setTimestampGenerated(bstMessage.getTimestampGenerated() + parseLong(parameter.getValue()));
                    bstMessage.setTimestampLogged(bstMessage.getTimestampLogged() + parseLong(parameter.getValue()));
                    updateLogger(message);
                }
            }
        }
        return bstMessage.toString();
    }

    @Override
    protected void updateLogger(final Message message) {
        super.updateLogger(message);
        logger.incrementModifiedMessage();
    }
}