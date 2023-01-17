package fdit.alteration.core.basestation.message.parameter;

import fdit.alteration.core.engine.Message;

public interface ParameterVisitor {

    void visitIcaoParameter(final Message message);

    void visitCallsignParameter(final CallsignParameter message);

    void visitAltitudeParameter(final AltitudeParameter message);

    void visitGroundSpeedParameter(final GroundSpeedParameter message);

    void visitTrackParameter(final TrackParameter message);

    void visitLatitudeParameter(final LatitudeParameter message);

    void visitLongitudeParameter(final LongitudeParameter message);

    void visitVerticalRateParameter(final VerticalRateParameter message);

    void visitSquawkParameter(final SquawkParameter message);

    void visitAlertParameter(final AlertParameter message);

    void visitEmergencyParameter(final EmergencyParameter message);

    void visitSpiParameter(final SpiParameter message);

    void visitOnGroundParameter(final OnGroundParameter message);

    default void accept(final Message message) {

        visitIcaoParameter(message);

        if (message instanceof CallsignParameter) {
            visitCallsignParameter((CallsignParameter) message);
        }
        if (message instanceof AltitudeParameter) {
            visitAltitudeParameter((AltitudeParameter) message);
        }
        if (message instanceof GroundSpeedParameter) {
            visitGroundSpeedParameter((GroundSpeedParameter) message);
        }
        if (message instanceof TrackParameter) {
            visitTrackParameter((TrackParameter) message);
        }
        if (message instanceof LatitudeParameter) {
            visitLatitudeParameter((LatitudeParameter) message);
        }
        if (message instanceof LongitudeParameter) {
            visitLongitudeParameter((LongitudeParameter) message);
        }
        if (message instanceof VerticalRateParameter) {
            visitVerticalRateParameter((VerticalRateParameter) message);
        }
        if (message instanceof SquawkParameter) {
            visitSquawkParameter((SquawkParameter) message);
        }
        if (message instanceof AlertParameter) {
            visitAlertParameter((AlertParameter) message);
        }
        if (message instanceof EmergencyParameter) {
            visitEmergencyParameter((EmergencyParameter) message);
        }
        if (message instanceof SpiParameter) {
            visitSpiParameter((SpiParameter) message);
        }
        if (message instanceof OnGroundParameter) {
            visitOnGroundParameter((OnGroundParameter) message);
        }
    }
}
