package fdit.alteration.core.beast.engine;

import fdit.alteration.core.basestation.message.parameter.LatitudeParameter;
import fdit.alteration.core.basestation.message.parameter.LongitudeParameter;
import fdit.alteration.core.beast.message.BeastMessage;
import fdit.alteration.core.engine.EngineParameters;
import fdit.alteration.core.engine.Message;
import fdit.alteration.core.engine.SuperAction;
import fdit.alteration.core.incident.Action;
import fdit.alteration.core.incident.Recording;
import fdit.alteration.core.incident.UnknownScopeException;
import fdit.alteration.core.logging.ActionLogger;
import gov.nasa.worldwind.geom.LatLon;
import org.apache.commons.math3.geometry.euclidean.threed.Rotation;
import org.apache.commons.math3.geometry.euclidean.threed.Vector3D;

import java.util.Collection;
import java.util.HashMap;

import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.collect.Maps.newHashMap;
import static fdit.alteration.core.engine.AlterationUtils.*;
import static fdit.alteration.core.incident.Parameter.CHARAC_LATITUDE;
import static fdit.alteration.core.incident.Parameter.CHARAC_LONGITUDE;
import static gov.nasa.worldwind.geom.LatLon.fromDegrees;
import static org.apache.commons.math3.geometry.euclidean.threed.RotationConvention.VECTOR_OPERATOR;

public class BeastRotationEngine extends BeastActionEngine {

    private final Rotation rotation;
    private HashMap<String, HashMap<Action, LatLon>> startPosMap = newHashMap();

    BeastRotationEngine(final Recording recording,
                        final SuperAction superAction,
                        final ActionLogger logger,
                        final EngineParameters parameters) {
        super(recording, superAction, logger, parameters);
        rotation = new Rotation(new Vector3D(1, 0, 0), 90, VECTOR_OPERATOR);
    }

    @Override
    protected String applyAction(final Message message) throws UnknownScopeException {
        final BeastMessage beastMessage = (BeastMessage) message;
        for (final Action action : superAction.getConcernedActions(beastMessage, recording.getFirstDate())) {
            processAlteration(beastMessage, action);
            updateLogger(message);
        }
        final StringBuilder newMessage = new StringBuilder(message.toString());
        if (parameters.isLabeled()) {
            addMaskToMessage(newMessage, message);
        }
        return newMessage.toString();
    }

    private void processAlteration(final BeastMessage message, final Action action) {
        final Collection<String> characteristics = newArrayList();
        if (message instanceof LatitudeParameter && message instanceof LongitudeParameter) {
            final LatLon currentPos = fromDegrees(
                    ((LatitudeParameter) message).getLatitude().get(),
                    ((LongitudeParameter) message).getLongitude().get());
            startPosMap.putIfAbsent(message.getIcao(), newHashMap());
            startPosMap.get(message.getIcao()).putIfAbsent(action, currentPos);
            final LatLon startPos = startPosMap.get(message.getIcao()).get(action);
            final LatLon newPos = rotateCoordinates(startPos, currentPos, 90);
            ((LatitudeParameter) message).setLatitude(newPos.getLatitude().getDegrees());
            ((LongitudeParameter) message).setLongitude(newPos.getLongitude().getDegrees());
            characteristics.add(CHARAC_LATITUDE);
            characteristics.add(CHARAC_LONGITUDE);
        }

        int mask = message.getMask() != null ? message.getMask() : 0;
        final int newMask = computeCharacteristicMask(characteristics) | mask;
        message.setMask(newMask);
    }
}