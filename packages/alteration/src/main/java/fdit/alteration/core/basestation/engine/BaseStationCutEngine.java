package fdit.alteration.core.basestation.engine;

import fdit.alteration.core.basestation.message.BaseStationMessage;
import fdit.alteration.core.basestation.message.parameter.AltitudeParameter;
import fdit.alteration.core.basestation.message.parameter.LatitudeParameter;
import fdit.alteration.core.basestation.message.parameter.LongitudeParameter;
import fdit.alteration.core.engine.EngineParameters;
import fdit.alteration.core.engine.Message;
import fdit.alteration.core.engine.SuperAction;
import fdit.alteration.core.incident.Action;
import fdit.alteration.core.incident.Recording;
import fdit.alteration.core.incident.UnknownScopeException;
import fdit.alteration.core.logging.ActionLogger;
import gov.nasa.worldwind.geom.LatLon;

import java.util.Map;
import java.util.Optional;

import static com.google.common.collect.Maps.newHashMap;
import static fdit.alteration.core.engine.AlterationUtils.*;
import static java.util.Optional.empty;
import static java.util.Optional.of;

public class BaseStationCutEngine extends BaseStationActionEngine {

    private final Map<Action, Long> timeDeltas = newHashMap();
    private final Map<String, Map<Action, LatLon>> startPositions = newHashMap();
    private final Map<String, Map<Action, LatLon>> endPositions = newHashMap();
    private final Map<String, Map<Action, Integer>> startAltitudes = newHashMap();
    private final Map<String, Map<Action, Integer>> endAltitudes = newHashMap();

    BaseStationCutEngine(final Recording recording,
                         final SuperAction superAction,
                         final ActionLogger logger,
                         final EngineParameters parameters) {
        super(recording, superAction, logger, parameters);
        for (final Action action : superAction.getActions()) {
            final long delta = action.getScope().getUpperBound() - action.getScope().getLowerBound();
            timeDeltas.putIfAbsent(action, delta);
        }
    }

    @Override
    protected String applyAction(final Message message) throws UnknownScopeException {
        boolean toDelete = false;
        final BaseStationMessage bstMessage = (BaseStationMessage) message;
        for (final Action action : superAction.getConcernedActions(bstMessage, recording.getFirstDate())) {
            toDelete = true;
            getPosition(bstMessage).ifPresent(position -> {
                startPositions.putIfAbsent(message.getIcao(), newHashMap());
                startPositions.get(message.getIcao()).putIfAbsent(action, position);
            });
            getAltitude(bstMessage).ifPresent(altitude -> {
                startAltitudes.putIfAbsent(message.getIcao(), newHashMap());
                startAltitudes.get(message.getIcao()).putIfAbsent(action, altitude);
            });
        }
        updateLogger(message);
        for (final Action action : superAction.getConcernedActions(bstMessage)) {
            final long timestamp = ((BaseStationMessage) message).getTimestampGenerated();
            if (timestamp >= recording.getFirstDate() + action.getScope().getUpperBound()) {
                ((BaseStationMessage) message).setTimestampGenerated(timestamp - timeDeltas.get(action));
                applyNewPosition(bstMessage, action);
                applyNewAltitude(bstMessage, action);
            }
        }
        final StringBuilder newMessage = new StringBuilder(toDelete ? "" : message.toString());
        if (!toDelete && parameters.isLabeled()) {
            addMaskToMessage(newMessage, message);
        }
        return newMessage.toString();
    }

    private void applyNewAltitude(final BaseStationMessage message, final Action action) {
        getAltitude(message).ifPresent(altitude -> {
            endAltitudes.putIfAbsent(message.getIcao(), newHashMap());
            endAltitudes.get(message.getIcao()).putIfAbsent(action, altitude);
            final AltitudeParameter altitudeParameter = (AltitudeParameter) message;
            getAltitudeDelta(message.getIcao(), action).ifPresent(delta ->
                    altitudeParameter.setAltitude(altitude - delta));
        });
    }

    private void applyNewPosition(final BaseStationMessage message, final Action action) {
        getPosition(message).ifPresent(position -> {
            endPositions.putIfAbsent(message.getIcao(), newHashMap());
            endPositions.get(message.getIcao()).putIfAbsent(action, position);
            final LatitudeParameter latitudeParameter = (LatitudeParameter) message;
            final LongitudeParameter longitudeParameter = (LongitudeParameter) message;
            getPositionDelta(message.getIcao(), action).ifPresent(delta -> {
                latitudeParameter.setLatitude(position.getLatitude().getDegrees() - delta.getLatitude().getDegrees());
                longitudeParameter.setLongitude(position.getLongitude().getDegrees() - delta.getLongitude().getDegrees());
            });
        });
    }

    @Override
    protected void updateLogger(final Message message) {
        super.updateLogger(message);
        logger.incrementDeletedMessage();
    }

    private Optional<LatLon> getPositionDelta(final String icao, final Action action) {
        if (startPositions.containsKey(icao) && startPositions.get(icao).containsKey(action) &&
                endPositions.containsKey(icao) && endPositions.get(icao).containsKey(action)) {
            return of(computeDelta(startPositions.get(icao).get(action), endPositions.get(icao).get(action)));
        }
        return empty();
    }

    private Optional<Integer> getAltitudeDelta(final String icao, final Action action) {
        if (startAltitudes.containsKey(icao) && startAltitudes.get(icao).containsKey(action) &&
                endAltitudes.containsKey(icao) && endAltitudes.get(icao).containsKey(action)) {
            return of(endAltitudes.get(icao).get(action) - startAltitudes.get(icao).get(action));
        }
        return empty();
    }
}