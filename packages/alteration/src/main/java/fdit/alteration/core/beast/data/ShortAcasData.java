package fdit.alteration.core.beast.data;

public class ShortAcasData extends BeastData {

    private boolean airborne;
    private boolean cross_link_capability;
    private int sensitivity_level;
    private int reply_information;
    private int altitude_code;

    public ShortAcasData(final int downlink_format,
                         final int first_field,
                         final String icao24,
                         final String payload,
                         final String parity,
                         final boolean noCRC,
                         final String type,
                         final boolean airborne,
                         final boolean cross_link_capability,
                         final int sensitivity_level,
                         final int reply_information,
                         final int altitude_code) {
        super(downlink_format, first_field, icao24, payload, parity, noCRC, type);
        this.airborne = airborne;
        this.cross_link_capability = cross_link_capability;
        this.sensitivity_level = sensitivity_level;
        this.reply_information = reply_information;
        this.altitude_code = altitude_code;
    }

    public boolean isAirborne() {
        return airborne;
    }

    public boolean isCross_link_capability() {
        return cross_link_capability;
    }

    public int getSensitivity_level() {
        return sensitivity_level;
    }

    public int getReply_information() {
        return reply_information;
    }

    public int getAltitude_code() {
        return altitude_code;
    }

    public ShortAcasData copy() {
        return new ShortAcasData(
                getDownlink_format(),
                getFirst_field(),
                getIcao24(),
                getPayload(),
                getParity(),
                isNoCRC(),
                getType(),
                airborne,
                cross_link_capability,
                sensitivity_level,
                reply_information,
                altitude_code);
    }
}