package fdit.alteration.core.beast.engine;

import com.google.gson.Gson;
import fdit.alteration.core.beast.BeastDeserializer;
import fdit.alteration.core.beast.BeastSerializer;
import fdit.alteration.core.beast.message.BeastMessage;
import fdit.alteration.core.engine.ActionEngine;
import fdit.alteration.core.engine.EngineParameters;
import fdit.alteration.core.engine.Message;
import fdit.alteration.core.engine.SuperAction;
import fdit.alteration.core.incident.Action;
import fdit.alteration.core.incident.Action.ActionTypeSwitch;
import fdit.alteration.core.incident.Recording;
import fdit.alteration.core.incident.Scope;
import fdit.alteration.core.incident.Scope.ScopeTypeSwitch;
import fdit.alteration.core.incident.UnknownScopeException;
import fdit.alteration.core.logging.ActionLogger;
import org.apache.commons.lang.NotImplementedException;

import java.util.Collection;
import java.util.Optional;

import static com.google.common.collect.Lists.newArrayList;
import static fdit.alteration.core.engine.SuperAction.createSuperActions;

public abstract class BeastActionEngine extends ActionEngine {

    final BeastSerializer serializer;
    private final BeastDeserializer deserializer;
    protected long firstDate = 0;
    protected boolean isFirstDate = false;

    BeastActionEngine(final Recording recording,
                      final SuperAction action,
                      final ActionLogger logger,
                      final EngineParameters parameters) {
        super(recording, action, logger, parameters);
        final Gson gson = new Gson();
        this.deserializer = new BeastDeserializer(gson);
        this.serializer = new BeastSerializer(gson);
    }

    public static Collection<ActionEngine> createEngines(final Recording recording,
                                                         final Collection<Action> actions,
                                                         final ActionLogger logger,
                                                         final EngineParameters parameters) throws Exception {
        final Collection<ActionEngine> engines = newArrayList();
        for (final SuperAction superAction : createSuperActions(actions)) {
            final ActionEngine engine = new ActionTypeSwitch<BeastActionEngine>() {

                @Override
                public BeastActionEngine visitAlteration() {
                    return new BeastAlterationEngine(recording, superAction, logger, parameters);
                }

                @Override
                public BeastActionEngine visitDeletion() {
                    return new BeastDeletionEngine(recording, superAction, logger, parameters);
                }

                @Override
                public BeastActionEngine visitSaturation() {
                    return new BeastSaturationEngine(recording, superAction, logger, parameters);
                }

                @Override
                public BeastActionEngine visitDelay() {
                    return new BeastDelayEngine(recording, superAction, logger, parameters);
                }

                @Override
                public BeastActionEngine visitReplay() {
                    return new BeastReplayEngine(recording, superAction, logger, parameters);
                }

                @Override
                public BeastActionEngine visitTrajectoryModification() {
                    return new BeastTrajectoryModificationEngine(
                            recording,
                            superAction,
                            logger,
                            parameters);
                }

                @Override
                public BeastActionEngine visitCreation() {
                    // TODO: implement
                    throw new NotImplementedException();
                }

                @Override
                public BeastActionEngine visitRotation() {
                    // TODO: implement
                    throw new NotImplementedException();
                }

                @Override
                public BeastActionEngine visitCut() {
                    // TODO: implement
                    throw new NotImplementedException();
                }
            }.doSwitch(superAction.getActionType());
            engine.preProcessing();
            engines.add(engine);
        }
        return engines;
    }

    public static boolean isMessageInScope(final BeastMessage message, final Scope scope, final long firstDate) throws UnknownScopeException {
        final long dateMillis = (message.getTimestampNanoAsLong() / 1000000) - (firstDate / 1000000);
        return new ScopeTypeSwitch<Boolean>() {

            @Override
            public Boolean visitGeoTimeWindow() {
                // TODO: manage polygons
                return scope.getLowerBound() <= dateMillis && dateMillis <= scope.getUpperBound();
            }

            @Override
            public Boolean visitTimeWindow() {
                return scope.getLowerBound() <= dateMillis && dateMillis <= scope.getUpperBound();
            }
        }.doSwitch(scope.getType());
    }

    @Override
    protected Optional<Message> parseMessage(final String message) {
        final Optional<Message> optionalMessage = deserializer.deserialize(message);
        optionalMessage.ifPresent(processedMessage -> {
            if (processedMessage instanceof BeastMessage && !isFirstDate) {
                firstDate = ((BeastMessage) processedMessage).getTimestampNanoAsLong();
                isFirstDate = true;
            }
        });
        return optionalMessage;
    }

    @Override
    protected String getExtension() {
        return ".beast";
    }

    protected void updateLogger(final Message message) {
        logger.addIcao(message.getIcao());
        if (message instanceof BeastMessage) {
            logger.updateDate(((BeastMessage) message).getTimestampNanoAsLong() / 1000000);
        }
    }
}