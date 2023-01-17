package fdit.alteration.core.beast.engine;

import fdit.alteration.core.beast.message.*;
import fdit.alteration.core.beast.message.BeastMessage.BeastMessageVisitor;
import fdit.alteration.core.incident.Parameter;
import fdit.alteration.core.incident.Parameter.CharacteristicSwitch;
import fdit.alteration.core.incident.UnknownCharacteristicException;

import static fdit.alteration.core.engine.AlterationUtils.*;
import static java.lang.Double.parseDouble;

public class BeastAlterationMessageVisitor implements BeastMessageVisitor<Void> {

    private final Parameter parameter;
    private boolean messageAltered = false;

    public BeastAlterationMessageVisitor(final Parameter parameter) {
        this.parameter = parameter;
    }

    @Override
    public Void visitAdsbAirbornPositionMessage(final AdsbAirbornePositionMessage message) {
        try {
            new CharacteristicSwitch<Void>() {

                @Override
                public Void visitIcao() {
                    message.setIcao(parameter.getValue());
                    message.getData().setIcao24(parameter.getValue());
                    messageAltered = true;
                    return null;
                }

                @Override
                public Void visitAltitude() {
                    if (message.getPosition() != null) {
                        final double altitude = message.getPosition().getAltitude();
                        message.getPosition().setAltitude(
                                computeNewValue(altitude, parseDouble(parameter.getValue()), parameter.getMode()));
                        messageAltered = true;
                    }
                    return null;
                }

                @Override
                public Void visitLatitude() {
                    if (message.getPosition() != null) {
                        final double latitude = message.getPosition().getLatitude();
                        message.getPosition().setLatitude(
                                computeNewValue(latitude, parseDouble(parameter.getValue()), parameter.getMode()));
                        messageAltered = true;
                    }
                    return null;
                }

                @Override
                public Void visitLongitude() {
                    if (message.getPosition() != null) {
                        final double longitude = message.getPosition().getLongitude();
                        message.getPosition().setLongitude(
                                computeNewValue(longitude, parseDouble(parameter.getValue()), parameter.getMode()));
                        messageAltered = true;
                    }
                    return null;
                }
            }.doSwitch(parameter.getCharacteristic());
        } catch (UnknownCharacteristicException ignored) {

        }
        return null;
    }

    @Override
    public Void visitAdsbEmergencyMessage(final AdsbEmergencyMessage message) {
        try {
            ((CharacteristicSwitch<Void>) () -> {
                message.setIcao(parameter.getValue());
                message.getData().setIcao24(parameter.getValue());
                messageAltered = true;
                return null;
            }).doSwitch(parameter.getCharacteristic());
        } catch (UnknownCharacteristicException ignored) {

        }
        return null;
    }

    @Override
    public Void visitAdsbIdentificationMessage(final AdsbIdentificationMessage message) {
        try {
            new CharacteristicSwitch<Void>() {
                @Override
                public Void visitIcao() {
                    message.setIcao(parameter.getValue());
                    message.getData().setIcao24(parameter.getValue());
                    messageAltered = true;
                    return null;
                }

                @Override
                public Void visitCallSign() {
                    message.setCallsign(parameter.getValue());
                    message.getData().setIdentity(parameter.getValue());
                    messageAltered = true;
                    return null;
                }
            }.doSwitch(parameter.getCharacteristic());
        } catch (UnknownCharacteristicException ignored) {

        }
        return null;
    }

    @Override
    public Void visitAdsbStatusMessage(final AdsbStatusMessage message) {
        try {
            ((CharacteristicSwitch<Void>) () -> {
                message.setIcao(parameter.getValue());
                message.getData().setIcao24(parameter.getValue());
                messageAltered = true;
                return null;
            }).doSwitch(parameter.getCharacteristic());
        } catch (UnknownCharacteristicException ignored) {

        }
        return null;
    }

    @Override
    public Void visitAdsbVelocityMessage(final AdsbVelocityMessage message) {
        try {
            new CharacteristicSwitch<Void>() {
                @Override
                public Void visitIcao() {
                    message.setIcao(parameter.getValue());
                    message.getData().setIcao24(parameter.getValue());
                    messageAltered = true;
                    return null;
                }

                @Override
                public Void visitTrack() {
                    alterTrack(message, parameter);
                    messageAltered = true;
                    return null;
                }

                @Override
                public Void visitGroundSpeed() {
                    alterGroundSpeed(message, parameter);
                    messageAltered = true;
                    return null;
                }
            }.doSwitch(parameter.getCharacteristic());
        } catch (UnknownCharacteristicException ignored) {

        }
        return null;
    }

    @Override
    public Void visitAllCallReplyMessage(final AllCallReplyMessage message) {
        try {
            ((CharacteristicSwitch<Void>) () -> {
                message.setIcao(parameter.getValue());
                message.getData().setIcao24(parameter.getValue());
                messageAltered = true;
                return null;
            }).doSwitch(parameter.getCharacteristic());
        } catch (UnknownCharacteristicException ignored) {

        }
        return null;
    }

    @Override
    public Void visitAltitudeReplyMessage(final AltitudeReplyMessage message) {
        try {
            ((CharacteristicSwitch<Void>) () -> {
                message.setIcao(parameter.getValue());
                message.getData().setIcao24(parameter.getValue());
                messageAltered = true;
                return null;
            }).doSwitch(parameter.getCharacteristic());
        } catch (UnknownCharacteristicException ignored) {

        }
        return null;
    }

    @Override
    public Void visitCommBAltitudeReplyMessage(final CommBAltitudeReplyMessage message) {
        try {
            ((CharacteristicSwitch<Void>) () -> {
                message.setIcao(parameter.getValue());
                message.getData().setIcao24(parameter.getValue());
                messageAltered = true;
                return null;
            }).doSwitch(parameter.getCharacteristic());
        } catch (UnknownCharacteristicException ignored) {

        }
        return null;
    }

    @Override
    public Void visitCommBIdentifyReplyMessage(final CommBIdentifyReplyMessage message) {
        try {
            ((CharacteristicSwitch<Void>) () -> {
                message.setIcao(parameter.getValue());
                message.getData().setIcao24(parameter.getValue());
                messageAltered = true;
                return null;
            }).doSwitch(parameter.getCharacteristic());
        } catch (UnknownCharacteristicException ignored) {

        }
        return null;
    }

    @Override
    public Void visitExtendedSquitterMessage(final ExtendedSquitterMessage message) {
        try {
            ((CharacteristicSwitch<Void>) () -> {
                message.setIcao(parameter.getValue());
                message.getData().setIcao24(parameter.getValue());
                messageAltered = true;
                return null;
            }).doSwitch(parameter.getCharacteristic());
        } catch (UnknownCharacteristicException ignored) {

        }
        return null;
    }

    @Override
    public Void visitIdentifyReplyMessage(final IdentifyReplyMessage message) {
        try {
            ((CharacteristicSwitch<Void>) () -> {
                message.setIcao(parameter.getValue());
                message.getData().setIcao24(parameter.getValue());
                messageAltered = true;
                return null;
            }).doSwitch(parameter.getCharacteristic());
        } catch (UnknownCharacteristicException ignored) {

        }
        return null;
    }

    @Override
    public Void visitLongAcasMessage(final LongAcasMessage message) {
        try {
            ((CharacteristicSwitch<Void>) () -> {
                message.setIcao(parameter.getValue());
                message.getData().setIcao24(parameter.getValue());
                messageAltered = true;
                return null;
            }).doSwitch(parameter.getCharacteristic());
        } catch (UnknownCharacteristicException ignored) {

        }
        return null;
    }

    @Override
    public Void visitShortAcasMessage(final ShortAcasMessage message) {
        try {
            ((CharacteristicSwitch<Void>) () -> {
                message.setIcao(parameter.getValue());
                message.getData().setIcao24(parameter.getValue());
                messageAltered = true;
                return null;
            }).doSwitch(parameter.getCharacteristic());
        } catch (UnknownCharacteristicException ignored) {

        }
        return null;
    }

    @Override
    public Void visitModeSReplyMessage(final ModeSReplyMessage message) {
        try {
            ((CharacteristicSwitch<Void>) () -> {
                message.setIcao(parameter.getValue());
                message.getData().setIcao24(parameter.getValue());
                messageAltered = true;
                return null;
            }).doSwitch(parameter.getCharacteristic());
        } catch (UnknownCharacteristicException ignored) {

        }
        return null;
    }

    public boolean isMessageAltered() {
        return messageAltered;
    }
}