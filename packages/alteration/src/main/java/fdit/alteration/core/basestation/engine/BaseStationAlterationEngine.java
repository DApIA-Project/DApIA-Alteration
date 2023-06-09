package fdit.alteration.core.basestation.engine;

import fdit.alteration.core.basestation.message.BaseStationMessage;
import fdit.alteration.core.basestation.message.parameter.*;
import fdit.alteration.core.engine.EngineParameters;
import fdit.alteration.core.engine.Message;
import fdit.alteration.core.engine.Step;
import fdit.alteration.core.engine.SuperAction;
import fdit.alteration.core.incident.*;
import fdit.alteration.core.logging.ActionLogger;

import java.util.Collection;
import java.util.HashMap;
import java.util.Optional;

import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.collect.Maps.newHashMap;
import static fdit.alteration.core.engine.AlterationUtils.*;
import static fdit.alteration.core.incident.Parameter.*;
import static java.lang.Math.round;
import static java.util.Optional.of;

public class BaseStationAlterationEngine extends BaseStationActionEngine {

    private final HashMap<String, HashMap<Action, Step>> steps = newHashMap();

    BaseStationAlterationEngine(final Recording recording,
                                final SuperAction superAction,
                                final ActionLogger logger,
                                final EngineParameters parameters) {
        super(recording, superAction, logger, parameters);
    }

    static void alterIcao(final Message message, String value) {
        if (value.compareToIgnoreCase("random") == 0) {
            value = getIcaoRandomOffset(message.getIcao(), 1000);
        }
        message.setIcao(value);
    }

    static boolean alterCallsign(final CallsignParameter message, final String value) {
        if (message.getCallsign().isPresent()) {
            message.setCallsign(value);
            return true;
        }
        return false;
    }

    static boolean alterAltitude(final AltitudeParameter message,
                                 final double value,
                                 final String mode,
                                 final Step step) {
        final Optional<Integer> altitude = message.getAltitude();
        if (altitude.isPresent()) {
            final double newValue = computeNewValue(altitude.get(), value, mode, step.getAndIncrement(CHARAC_ALTITUDE));
            message.setAltitude((int) (25 * round(newValue / 25)));
            return true;
        }
        return false;
    }

    static boolean alterGroundSpeed(final GroundSpeedParameter message,
                                    final double value,
                                    final String mode,
                                    final Step step) {
        final Optional<Double> groundSpeed = message.getGroundSpeed();
        if (groundSpeed.isPresent()) {
            message.setGroundSpeed(computeNewValue(groundSpeed.get(), value, mode, step.getAndIncrement(CHARAC_GROUNDSPEED)));
            return true;
        }
        return false;
    }

    static boolean alterTrack(final TrackParameter message,
                              final double value,
                              final String mode,
                              final Step step) {
        final Optional<Double> track = message.getTrack();
        if (track.isPresent()) {
            message.setTrack(computeNewValue(track.get(), value, mode, step.getAndIncrement(CHARAC_TRACK)));
            return true;
        }
        return false;
    }

    static boolean alterLatitude(final LatitudeParameter message,
                                 final double value,
                                 final String mode,
                                 final Step step) {
        final Optional<Double> latitude = message.getLatitude();
        if (latitude.isPresent()) {
            message.setLatitude(computeNewValue(latitude.get(), value, mode, step.getAndIncrement(CHARAC_LATITUDE)));
            return true;
        }
        return false;
    }

    static boolean alterLongitude(final LongitudeParameter message,
                                  final double value,
                                  final String mode,
                                  final Step step) {
        final Optional<Double> longitude = message.getLongitude();
        if (longitude.isPresent()) {
            message.setLongitude(computeNewValue(longitude.get(), value, mode, step.getAndIncrement(CHARAC_LONGITUDE)));
            return true;
        }
        return false;
    }

    static boolean alterVerticalRate(final VerticalRateParameter message,
                                     final int value,
                                     final String mode,
                                     final Step step) {
        final Optional<Integer> verticalRate = message.getVerticalRate();
        if (verticalRate.isPresent()) {
            message.setVerticalRate((int) computeNewValue(verticalRate.get(), value, mode, step.getAndIncrement(CHARAC_VERTICALRATE)));
            return true;
        }
        return false;
    }

    static boolean alterSquawk(final SquawkParameter message, final int value) {
        final Optional<Integer> squawk = message.getSquawk();
        if (squawk.isPresent()) {
            message.setSquawk(value);
            return true;
        }
        return false;
    }

    static boolean alterAlert(final AlertParameter message, final boolean value) {
        final Optional<Boolean> alert = message.isAlert();
        if (alert.isPresent()) {
            message.setAlert(value);
            return true;
        }
        return false;
    }

    static boolean alterEmergency(final EmergencyParameter message, final boolean value) {
        final Optional<Boolean> emergency = message.isEmergency();
        if (emergency.isPresent()) {
            message.setEmergency(value);
            return true;
        }
        return false;
    }

    static boolean alterSpi(final SpiParameter message, final boolean value) {
        final Optional<Boolean> spi = message.isSpi();
        if (spi.isPresent()) {
            message.setSpi(value);
            return true;
        }
        return false;
    }

    static boolean alterOnGround(final OnGroundParameter message, final boolean value) {
        final Optional<Boolean> onGround = message.isOnGround();
        if (onGround.isPresent()) {
            message.setOnGround(value);
            return true;
        }
        return false;
    }

    @Override
    protected String applyAction(final Message message) throws UnknownScopeException {
        final BaseStationMessage baseStationMessage = (BaseStationMessage) message;
        int mask = message.getMask() != null ? message.getMask() : 0;
        for (final Action action : superAction.getConcernedActions(baseStationMessage, recording.getFirstDate())) {
            steps.putIfAbsent(message.getIcao(), newHashMap());
            steps.get(message.getIcao()).putIfAbsent(action, new Step());
            mask = processAlteration(
                    baseStationMessage,
                    action.getParameters(),
                    steps.get(message.getIcao()).get(action),
                    message.getMask());
        }
        message.setMask(mask);
        if (parameters.isLabeled()) {
            return message.toStringWithMask();
        }
        return message.toString();
    }

    private int processAlteration(final BaseStationMessage message,
                                  final Parameters parameters,
                                  final Step step,
                                  final int mask) {
        final Collection<String> characteristics = newArrayList();
        for (final Parameter parameter : parameters.getParameterList()) {
            final BaseStationAlterationMessageVisitor visitor = new BaseStationAlterationMessageVisitor(parameter, step);
            visitor.accept(message);
            if (visitor.isMessageAltered()) {
                characteristics.add(parameter.getCharacteristic());
            }
        }
        final int newMask = computeCharacteristicMask(characteristics) | mask;
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