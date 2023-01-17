package fdit.alteration.core.basestation.engine;

import fdit.alteration.core.basestation.message.parameter.*;
import fdit.alteration.core.engine.Message;
import fdit.alteration.core.engine.Step;
import fdit.alteration.core.incident.Parameter;

import static fdit.alteration.core.basestation.engine.BaseStationAlterationEngine.*;
import static fdit.alteration.core.incident.Parameter.*;
import static java.lang.Boolean.parseBoolean;
import static java.lang.Double.parseDouble;
import static java.lang.Integer.parseInt;

public class BaseStationAlterationMessageVisitor implements ParameterVisitor {

    private final Parameter parameter;
    private final Step step;
    private boolean messageAltered = false;

    public BaseStationAlterationMessageVisitor(final Parameter parameter) {
        this.parameter = parameter;
        this.step = new Step();
    }

    public BaseStationAlterationMessageVisitor(final Parameter parameter, final Step step) {
        this.parameter = parameter;
        this.step = step;
    }

    private static boolean isParameterCharacteristic(final Parameter parameter, final String characteristic) {
        return parameter.getCharacteristic().compareTo(characteristic) == 0;
    }

    @Override
    public void visitIcaoParameter(final Message message) {
        if (isParameterCharacteristic(parameter, CHARAC_HEX_IDENT)) {
            alterIcao(message, parameter.getValue());
            messageAltered = true;
        }
    }

    @Override
    public void visitCallsignParameter(final CallsignParameter message) {
        if (isParameterCharacteristic(parameter, CHARAC_CALLSIGN)) {
            messageAltered = alterCallsign(message, parameter.getValue());
        }
    }

    @Override
    public void visitAltitudeParameter(final AltitudeParameter message) {
        if (isParameterCharacteristic(parameter, CHARAC_ALTITUDE)) {
            messageAltered = alterAltitude(message, parseDouble(parameter.getValue()), parameter.getMode(), step);
        }
    }

    @Override
    public void visitGroundSpeedParameter(final GroundSpeedParameter message) {
        if (isParameterCharacteristic(parameter, CHARAC_GROUNDSPEED)) {
            messageAltered = alterGroundSpeed(message, parseDouble(parameter.getValue()), parameter.getMode(), step);
        }
    }

    @Override
    public void visitTrackParameter(final TrackParameter message) {
        if (isParameterCharacteristic(parameter, CHARAC_TRACK)) {
            messageAltered = alterTrack(message, parseDouble(parameter.getValue()), parameter.getMode(), step);
        }
    }

    @Override
    public void visitLatitudeParameter(final LatitudeParameter message) {
        if (isParameterCharacteristic(parameter, CHARAC_LATITUDE)) {
            messageAltered = alterLatitude(message, parseDouble(parameter.getValue()), parameter.getMode(), step);
        }
    }

    @Override
    public void visitLongitudeParameter(final LongitudeParameter message) {
        if (isParameterCharacteristic(parameter, CHARAC_LONGITUDE)) {
            messageAltered = alterLongitude(message, parseDouble(parameter.getValue()), parameter.getMode(), step);
        }
    }

    @Override
    public void visitVerticalRateParameter(final VerticalRateParameter message) {
        if (isParameterCharacteristic(parameter, CHARAC_VERTICALRATE)) {
            messageAltered = alterVerticalRate(message, parseInt(parameter.getValue()), parameter.getMode(), step);
        }
    }

    @Override
    public void visitSquawkParameter(final SquawkParameter message) {
        if (isParameterCharacteristic(parameter, CHARAC_SQUAWK)) {
            messageAltered = alterSquawk(message, parseInt(parameter.getValue()));
        }
    }

    @Override
    public void visitAlertParameter(final AlertParameter message) {
        if (isParameterCharacteristic(parameter, CHARAC_ALERT)) {
            messageAltered = alterAlert(message, parseBoolean(parameter.getValue()));
        }
    }

    @Override
    public void visitEmergencyParameter(final EmergencyParameter message) {
        if (isParameterCharacteristic(parameter, CHARAC_EMERGENCY)) {
            messageAltered = alterEmergency(message, parseBoolean(parameter.getValue()));
        }
    }

    @Override
    public void visitSpiParameter(final SpiParameter message) {
        if (isParameterCharacteristic(parameter, CHARAC_SPI)) {
            messageAltered = alterSpi(message, parseBoolean(parameter.getValue()));
        }
    }

    @Override
    public void visitOnGroundParameter(final OnGroundParameter message) {
        if (isParameterCharacteristic(parameter, CHARAC_ISONGROUND)) {
            messageAltered = alterOnGround(message, parseBoolean(parameter.getValue()));
        }
    }

    public boolean isMessageAltered() {
        return messageAltered;
    }
}