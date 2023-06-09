package fdit.alteration.core.basestation.message;

import com.google.gson.JsonObject;
import fdit.alteration.core.engine.Message;

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;

import static fdit.alteration.core.basestation.BaseStationParser.timestampToStrDate;
import static java.lang.String.valueOf;
import static java.util.Locale.ENGLISH;
import static java.util.Objects.hash;

public abstract class BaseStationMessage implements Message, Comparable<BaseStationMessage> {

    private static final DecimalFormatSymbols DECIMAL_FORMAT_EN = new DecimalFormatSymbols(ENGLISH);
    public static final DecimalFormat DECIMAL_FORMAT_1 = new DecimalFormat("#.#", DECIMAL_FORMAT_EN);
    public static final DecimalFormat DECIMAL_FORMAT_5 = new DecimalFormat("#.#####", DECIMAL_FORMAT_EN);

    private int mask;
    private int transmissionType;
    private int sessionID;
    private int aircraftID;
    private String icao;
    private int flightID;
    private long timestampGenerated;
    private long timestampLogged;

    protected BaseStationMessage(final int transmissionType,
                                 final int sessionID,
                                 final int aircraftID,
                                 final String icao,
                                 final int flightID,
                                 final long timestampGenerated,
                                 final long timestampLogged,
                                 final int mask) {
        this.transmissionType = transmissionType;
        this.sessionID = sessionID;
        this.aircraftID = aircraftID;
        this.flightID = flightID;
        this.icao = icao;
        this.timestampGenerated = timestampGenerated;
        this.timestampLogged = timestampLogged;
        this.mask = mask;
    }

    static String doubleToString(final Double groundSpeed2, final DecimalFormat decimalFormat1) {
        return groundSpeed2 != null ? decimalFormat1.format(groundSpeed2) : "";
    }

    static String integerToString(final Integer integer) {
        return (integer != null) ? valueOf(integer) : "";
    }

    static String booleanToString(final Boolean aBoolean) {
        if (aBoolean == null) {
            return "";
        }
        if (Boolean.TRUE.equals(aBoolean)) {
            return "1";
        } else {
            return "0";
        }
    }

    static String jsonObjectToString(final JsonObject jsonObject) {
        if (jsonObject == null) {
            return "";
        }
        return "," + jsonObject;
    }

    public int getFlightID() {
        return flightID;
    }

    public void setFlightID(int flightID) {
        this.flightID = flightID;
    }

    public int getSessionID() {
        return sessionID;
    }

    public void setSessionID(final int sessionID) {
        this.sessionID = sessionID;
    }

    public int getTransmissionType() {
        return transmissionType;
    }

    public void setTransmissionType(final int transmissionType) {
        this.transmissionType = transmissionType;
    }

    public int getAircraftID() {
        return aircraftID;
    }

    public void setAircraftID(final int aircraftID) {
        this.aircraftID = aircraftID;
    }

    @Override
    public String getIcao() {
        return icao;
    }

    public void setIcao(final String icao) {
        this.icao = icao;
    }

    public long getTimestampGenerated() {
        return timestampGenerated;
    }

    public void setTimestampGenerated(final long timestampGenerated) {
        this.timestampGenerated = timestampGenerated;
    }

    public long getTimestampLogged() {
        return timestampLogged;
    }

    public void setTimestampLogged(final long timestampLogged) {
        this.timestampLogged = timestampLogged;
    }

    @Override
    public Integer getMask() {
        return mask;
    }

    @Override
    public void setMask(final int mask) {
        this.mask = mask;
    }

    @Override
    public String toString() {
        return "MSG," +
                transmissionType + "," +
                sessionID + "," +
                aircraftID + "," +
                icao + "," +
                flightID + "," +
                timestampToStrDate(timestampGenerated) + "," +
                timestampToStrDate(timestampLogged) + ",";
    }

    @Override
    public int hashCode() {
        return hash(
                transmissionType,
                sessionID,
                aircraftID,
                icao,
                flightID,
                timestampGenerated,
                timestampLogged);
    }

    @Override
    public boolean equals(final Object obj) {
        return obj instanceof BaseStationMessage &&
                transmissionType == ((BaseStationMessage) obj).getTransmissionType() &&
                sessionID == ((BaseStationMessage) obj).getSessionID() &&
                aircraftID == ((BaseStationMessage) obj).getAircraftID() &&
                icao.equals(((BaseStationMessage) obj).getIcao()) &&
                flightID == ((BaseStationMessage) obj).getFlightID() &&
                timestampGenerated == ((BaseStationMessage) obj).getTimestampGenerated() &&
                timestampLogged == ((BaseStationMessage) obj).getTimestampLogged();
    }

    @Override
    public int compareTo(BaseStationMessage message) {
        return (int) (timestampGenerated - message.getTimestampGenerated());
    }

    public interface BstMessageTypeSwitch<T> {

        default T visitBstMessage1() {
            return null;
        }

        default T visitBstMessage2() {
            return visitBstMessageFull();
        }

        default T visitBstMessage3() {
            return visitBstMessageFull();
        }

        default T visitBstMessage4() {
            return visitBstMessageFull();
        }

        default T visitBstMessage5() {
            return visitBstMessageFull();
        }

        default T visitBstMessage6() {
            return visitBstMessageFull();
        }

        default T visitBstMessage7() {
            return visitBstMessageFull();
        }

        default T visitBstMessage8() {
            return visitBstMessageFull();
        }

        default T visitBstMessageFull() {
            return null;
        }

        default T doSwitch(final int type) {
            switch (type) {
                case 1:
                    return visitBstMessage1();
                case 2:
                    return visitBstMessage2();
                case 3:
                    return visitBstMessage3();
                case 4:
                    return visitBstMessage4();
                case 5:
                    return visitBstMessage5();
                case 6:
                    return visitBstMessage6();
                case 7:
                    return visitBstMessage7();
                case 8:
                    return visitBstMessage8();
                default:
                    return visitBstMessageFull();
            }
        }
    }
}