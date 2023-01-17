package fdit.alteration.core.beast.message;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public enum BeastMessageType {

    ADSB_AIRBORN_POSITION,
    ADSB_EMERGENCY,
    ADSB_IDENTIFICATION,
    ADSB_STATUS,
    ADSB_VELOCITY,
    ALL_CALL_REPLY,
    ALTITUDE_REPLY,
    COMM_B_ALTITUDE_REPLY,
    COMM_B_IDENTIFY_REPLY,
    EXTENDED_SQUITTER,
    IDENTIFY_REPLY,
    LONG_ACAS,
    SHORT_ACAS,
    MODES_REPLAY;

    public static final String ADSB_AIRBORNE_POSITION_STR = "ADSB_AIRBORNE_POSITION";
    public static final String ADSB_EMERGENCY_STR = "ADSB_EMERGENCY";
    public static final String ADSB_IDENTIFICATION_STR = "ADSB_IDENTIFICATION";
    public static final String ADSB_STATUS_STR = "ADSB_STATUS";
    public static final String ADSB_VELOCITY_STR = "ADSB_VELOCITY";
    public static final String ALL_CALL_REPLY_STR = "ALL_CALL_REPLY";
    public static final String ALTITUDE_REPLY_STR = "ALTITUDE_REPLY";
    public static final String COMM_B_ALTITUDE_REPLY_STR = "COMM_B_ALTITUDE_REPLY";
    public static final String COMM_B_IDENTIFY_REPLY_STR = "COMM_B_IDENTIFY_REPLY";
    public static final String EXTENDED_SQUITTER_STR = "EXTENDED_SQUITTER";
    public static final String IDENTIFY_REPLY_STR = "IDENTIFY_REPLY";
    public static final String LONG_ACAS_STR = "LONG_ACAS";
    public static final String SHORT_ACAS_STR = "SHORT_ACAS";
    public static final String MODES_REPLY_STR = "MODES_REPLY";

    public static BeastMessageType getBeastMessageTypeByString(final String str) {
        if (str.compareToIgnoreCase(ADSB_AIRBORNE_POSITION_STR) == 0) {
            return ADSB_AIRBORN_POSITION;
        }
        if (str.compareToIgnoreCase(ADSB_EMERGENCY_STR) == 0) {
            return ADSB_EMERGENCY;
        }
        if (str.compareToIgnoreCase(ADSB_IDENTIFICATION_STR) == 0) {
            return ADSB_IDENTIFICATION;
        }
        if (str.compareToIgnoreCase(ADSB_STATUS_STR) == 0) {
            return ADSB_STATUS;
        }
        if (str.compareToIgnoreCase(ADSB_VELOCITY_STR) == 0) {
            return ADSB_VELOCITY;
        }
        if (str.compareToIgnoreCase(ALL_CALL_REPLY_STR) == 0) {
            return ALL_CALL_REPLY;
        }
        if (str.compareToIgnoreCase(ALTITUDE_REPLY_STR) == 0) {
            return ALTITUDE_REPLY;
        }
        if (str.compareToIgnoreCase(COMM_B_ALTITUDE_REPLY_STR) == 0) {
            return COMM_B_ALTITUDE_REPLY;
        }
        if (str.compareToIgnoreCase(COMM_B_IDENTIFY_REPLY_STR) == 0) {
            return COMM_B_IDENTIFY_REPLY;
        }
        if (str.compareToIgnoreCase(EXTENDED_SQUITTER_STR) == 0) {
            return EXTENDED_SQUITTER;
        }
        if (str.compareToIgnoreCase(IDENTIFY_REPLY_STR) == 0) {
            return IDENTIFY_REPLY;
        }
        if (str.compareToIgnoreCase(LONG_ACAS_STR) == 0) {
            return LONG_ACAS;
        }
        if (str.compareToIgnoreCase(SHORT_ACAS_STR) == 0) {
            return SHORT_ACAS;
        }
        if (str.compareToIgnoreCase(MODES_REPLY_STR) == 0) {
            return MODES_REPLAY;
        }
        throw new RuntimeException("Unknow beast message type");
    }

    public interface BeastMessageTypeSwitch<T> {

        default T visitAdsbAirbornPosition(final String message) {
            return null;
        }

        default T visitAdsbEmergency(final String message) {
            return null;
        }

        default T visitAdsbIdentification(final String message) {
            return null;
        }

        default T visitAdsbStatus(final String message) {
            return null;
        }

        default T visitAdsbVelocity(final String message) {
            return null;
        }

        default T visitAllCallReply(final String message) {
            return null;
        }

        default T visitAltitudeReply(final String message) {
            return null;
        }

        default T visitCommBAltitudeReply(final String message) {
            return null;
        }

        default T visitCommBIdentifyReply(final String message) {
            return null;
        }

        default T visitExtendedSquitter(final String message) {
            return null;
        }

        default T visitIdentifyReply(final String message) {
            return null;
        }

        default T visitLongAcas(final String message) {
            return null;
        }

        default T visitShortAcas(final String message) {
            return null;
        }

        default T visitModeSReply(final String message) {
            return null;
        }

        default T visitDefault() {
            throw new RuntimeException("Unknown beast message type");
        }

        @SuppressWarnings({"SwitchStatementWithTooManyBranches"})
        default T doSwitch(final String message) {
            final JsonObject jsonObject = new JsonParser().parse(message).getAsJsonObject();
            final String type = jsonObject.get("data").getAsJsonObject().get("type").getAsString();
            switch (getBeastMessageTypeByString(type)) {
                case LONG_ACAS:
                    return visitLongAcas(message);
                case SHORT_ACAS:
                    return visitShortAcas(message);
                case ADSB_STATUS:
                    return visitAdsbStatus(message);
                case ADSB_EMERGENCY:
                    return visitAdsbEmergency(message);
                case ADSB_VELOCITY:
                    return visitAdsbVelocity(message);
                case ALL_CALL_REPLY:
                    return visitAllCallReply(message);
                case ALTITUDE_REPLY:
                    return visitAltitudeReply(message);
                case IDENTIFY_REPLY:
                    return visitIdentifyReply(message);
                case EXTENDED_SQUITTER:
                    return visitExtendedSquitter(message);
                case ADSB_IDENTIFICATION:
                    return visitAdsbIdentification(message);
                case ADSB_AIRBORN_POSITION:
                    return visitAdsbAirbornPosition(message);
                case COMM_B_ALTITUDE_REPLY:
                    return visitCommBAltitudeReply(message);
                case COMM_B_IDENTIFY_REPLY:
                    return visitCommBIdentifyReply(message);
                case MODES_REPLAY:
                    return visitModeSReply(message);
                default:
                    return visitDefault();
            }
        }
    }
}