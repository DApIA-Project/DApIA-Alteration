package fdit.alteration.core.basestation.engine;

import fdit.alteration.core.basestation.message.BaseStationMessage;
import fdit.alteration.core.basestation.message.parameter.LatitudeParameter;
import fdit.alteration.core.basestation.message.parameter.LongitudeParameter;
import fdit.alteration.core.engine.EngineParameters;
import fdit.alteration.core.engine.Message;
import fdit.alteration.core.engine.SuperAction;
import fdit.alteration.core.incident.Action;
import fdit.alteration.core.incident.Parameter;
import fdit.alteration.core.incident.Recording;
import fdit.alteration.core.incident.UnknownScopeException;
import fdit.alteration.core.logging.ActionLogger;
import gov.nasa.worldwind.geom.LatLon;

import java.util.Collection;
import java.util.HashMap;
import java.util.Optional;

import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.collect.Maps.newHashMap;
import static fdit.alteration.core.engine.AlterationUtils.*;
import static fdit.alteration.core.incident.Parameter.CHARAC_LATITUDE;
import static fdit.alteration.core.incident.Parameter.CHARAC_LONGITUDE;
import static gov.nasa.worldwind.geom.LatLon.fromDegrees;
import static java.util.Optional.empty;
import static java.util.Optional.ofNullable;

public class BaseStationRotationEngine extends BaseStationActionEngine {

    private final HashMap<Action, Double> angles = newHashMap();
    private final HashMap<String, HashMap<Action, LatLon>> startPosMap = newHashMap();

    BaseStationRotationEngine(final Recording recording,
                              final SuperAction superAction,
                              final ActionLogger logger,
                              final EngineParameters parameters) {
        super(recording, superAction, logger, parameters);
        for (final Action action : superAction.getActions()) {
            for (final Parameter parameter : action.getParameters().getParameterList()) {
                if (parameter.getAngle() > 0.0) {
                    angles.put(action, parameter.getAngle());
                }
            }
            angles.putIfAbsent(action, 0.0);
        }
    }

    @Override
    protected String applyAction(final Message message) throws UnknownScopeException {
        final BaseStationMessage bstMessage = (BaseStationMessage) message;
        for (final Action action : superAction.getConcernedActions(bstMessage, recording.getFirstDate())) {
            processAlteration(bstMessage, action);
            updateLogger(message);
        }
        final StringBuilder newMessage = new StringBuilder(message.toString());
        if (parameters.isLabeled()) {
            addMaskToMessage(newMessage, message);
        }
        return newMessage.toString();
    }

    private void processAlteration(final BaseStationMessage message, final Action action) {
        final Collection<String> characteristics = newArrayList();
        if (message instanceof LatitudeParameter && message instanceof LongitudeParameter &&
                ((LatitudeParameter) message).getLatitude().isPresent() && ((LongitudeParameter) message).getLongitude().isPresent()) {
            final LatLon currentPos = fromDegrees(
                    ((LatitudeParameter) message).getLatitude().get(),
                    ((LongitudeParameter) message).getLongitude().get());
            startPosMap.putIfAbsent(message.getIcao(), newHashMap());
            startPosMap.get(message.getIcao()).putIfAbsent(action, currentPos);
            getStartPos(message.getIcao(), action).ifPresent(startPos -> {
                final LatLon newPos = rotateCoordinates(startPos, currentPos, angles.get(action));
                ((LatitudeParameter) message).setLatitude(newPos.getLatitude().getDegrees());
                ((LongitudeParameter) message).setLongitude(newPos.getLongitude().getDegrees());
                characteristics.add(CHARAC_LATITUDE);
                characteristics.add(CHARAC_LONGITUDE);
            });
        }

        int mask = message.getMask() != null ? message.getMask() : 0;
        final int newMask = computeCharacteristicMask(characteristics) | mask;
        message.setMask(newMask);
    }

    public Optional<LatLon> getStartPos(final String icao, final Action action) {
        if (startPosMap.containsKey(icao) && startPosMap.get(icao).containsKey(action)) {
            return ofNullable(startPosMap.get(icao).get(action));
        }
        return empty();
    }
}