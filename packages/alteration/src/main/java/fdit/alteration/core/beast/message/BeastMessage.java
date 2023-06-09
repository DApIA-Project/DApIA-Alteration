package fdit.alteration.core.beast.message;

import fdit.alteration.core.beast.data.BeastData;
import fdit.alteration.core.engine.Message;
import fdit.alteration.core.incident.UnknownCharacteristicException;

import static java.lang.Long.parseLong;

public abstract class BeastMessage implements Message, Comparable<BeastMessage> {

    protected String hexMessage;
    protected String icao;
    protected int source_id;
    private String timestamp;
    private String timestampMilli;
    private String timestampNano;
    private String altered;
    private Integer mask;

    public BeastMessage(final String hexMessage,
                        final String icao,
                        final int source_id,
                        final String timestamp,
                        final String timestampMilli,
                        final String timestampNano) {
        this.hexMessage = hexMessage;
        this.icao = icao;
        this.source_id = source_id;
        this.timestamp = timestamp;
        this.timestampMilli = timestampMilli;
        this.timestampNano = timestampNano;
    }

    public String getHexMessage() {
        return hexMessage;
    }

    @Override
    public String getIcao() {
        return icao;
    }

    public void setIcao(final String icao) {
        this.icao = icao;
    }

    public int getSource_id() {
        return source_id;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public String getTimestampMilli() {
        return timestampMilli;
    }

    public String getTimestampNano() {
        return timestampNano;
    }

    public long getTimestampNanoAsLong() {
        return parseLong(timestampNano);
    }

    public void setTimestampNano(long timestampNano) {
        this.timestampNano = String.valueOf(timestampNano);
    }

    public String getAltered() {
        return altered;
    }

    public void setAltered(final String altered) {
        this.altered = altered;
    }

    public Integer getMask() {
        return mask;
    }

    public void setMask(final int mask) {
        this.mask = mask;
    }

    public abstract BeastData getData();

    @Override
    public int compareTo(final BeastMessage message) {
        return (int) (getTimestampNanoAsLong() - message.getTimestampNanoAsLong());
    }

    @Override
    public String toStringWithMask() {
        return "";
    }

    public interface BeastMessageVisitor<T> {

        T visitAdsbAirbornPositionMessage(final AdsbAirbornePositionMessage message) throws UnknownCharacteristicException;

        T visitAdsbEmergencyMessage(final AdsbEmergencyMessage message);

        T visitAdsbIdentificationMessage(final AdsbIdentificationMessage message) throws UnknownCharacteristicException;

        T visitAdsbStatusMessage(final AdsbStatusMessage message) throws UnknownCharacteristicException;

        T visitAdsbVelocityMessage(final AdsbVelocityMessage message) throws UnknownCharacteristicException;

        T visitAllCallReplyMessage(final AllCallReplyMessage message);

        T visitAltitudeReplyMessage(final AltitudeReplyMessage message);

        T visitCommBAltitudeReplyMessage(final CommBAltitudeReplyMessage message);

        T visitCommBIdentifyReplyMessage(final CommBIdentifyReplyMessage message);

        T visitExtendedSquitterMessage(final ExtendedSquitterMessage message);

        T visitIdentifyReplyMessage(final IdentifyReplyMessage message);

        T visitLongAcasMessage(final LongAcasMessage message);

        T visitShortAcasMessage(final ShortAcasMessage message);

        T visitModeSReplyMessage(final ModeSReplyMessage message);

        default T accept(final BeastMessage message) throws UnknownCharacteristicException {
            if (message instanceof AdsbAirbornePositionMessage) {
                return visitAdsbAirbornPositionMessage((AdsbAirbornePositionMessage) message);
            }
            if (message instanceof AdsbEmergencyMessage) {
                return visitAdsbEmergencyMessage((AdsbEmergencyMessage) message);
            }
            if (message instanceof AdsbIdentificationMessage) {
                return visitAdsbIdentificationMessage((AdsbIdentificationMessage) message);
            }
            if (message instanceof AdsbStatusMessage) {
                return visitAdsbStatusMessage((AdsbStatusMessage) message);
            }
            if (message instanceof AdsbVelocityMessage) {
                return visitAdsbVelocityMessage((AdsbVelocityMessage) message);
            }
            if (message instanceof AllCallReplyMessage) {
                return visitAllCallReplyMessage((AllCallReplyMessage) message);
            }
            if (message instanceof AltitudeReplyMessage) {
                return visitAltitudeReplyMessage((AltitudeReplyMessage) message);
            }
            if (message instanceof CommBAltitudeReplyMessage) {
                return visitCommBAltitudeReplyMessage((CommBAltitudeReplyMessage) message);
            }
            if (message instanceof CommBIdentifyReplyMessage) {
                return visitCommBIdentifyReplyMessage((CommBIdentifyReplyMessage) message);
            }
            if (message instanceof ExtendedSquitterMessage) {
                return visitExtendedSquitterMessage((ExtendedSquitterMessage) message);
            }
            if (message instanceof IdentifyReplyMessage) {
                return visitIdentifyReplyMessage((IdentifyReplyMessage) message);
            }
            if (message instanceof LongAcasMessage) {
                return visitLongAcasMessage((LongAcasMessage) message);
            }
            if (message instanceof ShortAcasMessage) {
                return visitShortAcasMessage((ShortAcasMessage) message);
            }
            if (message instanceof ModeSReplyMessage) {
                return visitModeSReplyMessage((ModeSReplyMessage) message);
            }
            throw new RuntimeException("Unknown message");
        }
    }
}