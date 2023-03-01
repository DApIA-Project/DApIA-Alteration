package fdit.alteration.core.basestation.engine;

import fdit.alteration.core.basestation.message.BaseStationMessage;
import fdit.alteration.core.engine.ActionEngine;
import fdit.alteration.core.engine.EngineParameters;
import fdit.alteration.core.engine.Message;
import fdit.alteration.core.engine.SuperAction;
import fdit.alteration.core.incident.*;
import fdit.alteration.core.incident.Action.ActionTypeSwitch;
import fdit.alteration.core.logging.ActionLogger;

import java.util.Collection;
import java.util.Optional;

import static com.google.common.collect.Lists.newArrayList;
import static fdit.alteration.core.basestation.BaseStationParser.createBstMessage;
import static fdit.alteration.core.engine.SuperAction.createSuperActions;

public abstract class BaseStationActionEngine extends ActionEngine {

    BaseStationActionEngine(final Recording recording,
                            final SuperAction superAction,
                            final ActionLogger logger,
                            final EngineParameters parameters) {
        super(recording, superAction, logger, parameters);
    }

    public static Collection<ActionEngine> createEngines(final Recording recording,
                                                         final Collection<Action> actions,
                                                         final ActionLogger logger,
                                                         final EngineParameters parameters) throws Exception {
        final Collection<ActionEngine> engines = newArrayList();
        logger.addAllActions(actions);
        for (final SuperAction superAction : createSuperActions(actions)) {
            final ActionEngine engine = new ActionTypeSwitch<BaseStationActionEngine>() {

                @Override
                public BaseStationActionEngine visitAlteration() {
                    return new BaseStationAlterationEngine(recording, superAction, logger, parameters);
                }

                @Override
                public BaseStationActionEngine visitDeletion() {
                    return new BaseStationDeletionEngine(recording, superAction, logger, parameters);
                }

                @Override
                public BaseStationActionEngine visitSaturation() {
                    return new BaseStationSaturationEngine(recording, superAction, logger, parameters);
                }

                @Override
                public BaseStationActionEngine visitDelay() {
                    return new BaseStationDelayEngine(recording, superAction, logger, parameters);
                }

                @Override
                public BaseStationActionEngine visitReplay() {
                    return new BaseStationReplayEngine(recording, superAction, logger, parameters);
                }

                @Override
                public BaseStationActionEngine visitTrajectoryModification() {
                    return new BaseStationTrajectoryModificationEngine(
                            recording,
                            superAction,
                            logger,
                            parameters);
                }

                @Override
                public BaseStationActionEngine visitCreation() {
                    return new BaseStationCreationEngine(recording, superAction, logger, parameters);
                }

                @Override
                public BaseStationActionEngine visitRotation() {
                    return new BaseStationRotationEngine(recording, superAction, logger, parameters);
                }

                @Override
                public BaseStationActionEngine visitCut() {
                    return new BaseStationCutEngine(recording, superAction, logger, parameters);
                }
            }.doSwitch(superAction.getActionType());
            engine.preProcessing();
            engines.add(engine);
        }
        return engines;
    }

    public static boolean isMessageInScope(final BaseStationMessage message, final Scope scope, final long firstDate) throws UnknownScopeException {
        return new Scope.ScopeTypeSwitch<Boolean>() {

            final long relativeDate = message.getTimestampGenerated() - firstDate;

            @Override
            public Boolean visitGeoTimeWindow() {
                // TODO: manage polygons
                return scope.getLowerBound() <= relativeDate && relativeDate <= scope.getUpperBound();
            }

            @Override
            public Boolean visitTimeWindow() {
                return scope.getLowerBound() <= relativeDate && relativeDate <= scope.getUpperBound();
            }
        }.doSwitch(scope.getType());
    }

    @Override
    protected Optional<Message> parseMessage(final String message) {
        return createBstMessage(message);
    }

    @Override
    protected String applyAction(Message message) throws UnknownScopeException, UnknownCharacteristicException {
        return null;
    }

    @Override
    protected String getExtension() {
        return ".bst";
    }

    protected void updateLogger(final Message message) {
        logger.addIcao(message.getIcao());
        if (message instanceof BaseStationMessage) {
            logger.updateDate(((BaseStationMessage) message).getTimestampGenerated());
        }
    }
}