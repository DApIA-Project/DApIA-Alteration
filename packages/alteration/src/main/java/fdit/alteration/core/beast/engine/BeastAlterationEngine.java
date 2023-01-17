package fdit.alteration.core.beast.engine;

import fdit.alteration.core.beast.message.BeastMessage;
import fdit.alteration.core.engine.EngineParameters;
import fdit.alteration.core.engine.Message;
import fdit.alteration.core.engine.SuperAction;
import fdit.alteration.core.incident.*;
import fdit.alteration.core.logging.ActionLogger;

import java.util.Collection;

import static com.google.common.collect.Lists.newArrayList;
import static fdit.alteration.core.engine.AlterationUtils.computeCharacteristicMask;
import static fdit.alteration.core.engine.AlterationUtils.renderBooleanToFlag;

public class BeastAlterationEngine extends BeastActionEngine {

    BeastAlterationEngine(final Recording recording,
                          final SuperAction superAction,
                          final ActionLogger logger,
                          final EngineParameters parameters) {
        super(recording, superAction, logger, parameters);
    }

    @Override
    protected String applyAction(final Message message) throws UnknownScopeException, UnknownCharacteristicException {
        final BeastMessage beastMessage = (BeastMessage) message;
        int mask = message.getMask() != null ? message.getMask() : 0;
        boolean altered = false;
        for (final Action action : superAction.getConcernedActions(beastMessage, recording.getFirstDate())) {
            mask = processAlteration(beastMessage, action.getParameters(), message.getMask());
            altered = true;
        }
        if (parameters.isLabeled()) {
            beastMessage.setAltered(renderBooleanToFlag(altered));
            beastMessage.setMask(mask);
        }
        return serializer.serialize(beastMessage);
    }

    private int processAlteration(final BeastMessage message,
                                  final Parameters parameters,
                                  final Integer mask) throws UnknownCharacteristicException {
        final Collection<String> characteristics = newArrayList();
        for (final Parameter parameter : parameters.getParameterList()) {
            final BeastAlterationMessageVisitor visitor = new BeastAlterationMessageVisitor(parameter);
            visitor.accept(message);
            if (visitor.isMessageAltered()) {
                characteristics.add(parameter.getCharacteristic());
            }
        }
        final int newMask = mask == null ?
                computeCharacteristicMask(characteristics) :
                computeCharacteristicMask(characteristics) | mask;
        if (newMask != 0) {
            updateLogger(message);
        }
        return newMask;
    }

    @Override
    protected void updateLogger(final Message message) {
        super.updateLogger(message);
        logger.incrementModifiedMessage();
    }
}