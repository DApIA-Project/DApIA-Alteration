package fdit.alteration.core.beast.data;

public class LongAcasData extends BeastData {

    private boolean airborne;
    private int sensitivity_level;
    private int reply_information;
    private int altitude_code;
    private boolean valid_rac;
    private int active_resolution_advisories;
    private int racs_record;
    private boolean ra_terminated;
    private boolean multiple_threat_encounter;

    public LongAcasData(final int downlink_format,
                        final int first_field,
                        final String icao24,
                        final String payload,
                        final String parity,
                        final boolean noCRC,
                        final String type,
                        final boolean airborne,
                        final int sensitivity_level,
                        final int reply_information,
                        final int altitude_code,
                        final boolean valid_rac,
                        final int active_resolution_advisories,
                        final int racs_record,
                        final boolean ra_terminated,
                        final boolean multiple_threat_encounter) {
        super(downlink_format, first_field, icao24, payload, parity, noCRC, type);
        this.airborne = airborne;
        this.sensitivity_level = sensitivity_level;
        this.reply_information = reply_information;
        this.altitude_code = altitude_code;
        this.valid_rac = valid_rac;
        this.active_resolution_advisories = active_resolution_advisories;
        this.racs_record = racs_record;
        this.ra_terminated = ra_terminated;
        this.multiple_threat_encounter = multiple_threat_encounter;
    }

    public boolean isAirborne() {
        return airborne;
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

    public boolean isValid_rac() {
        return valid_rac;
    }

    public int getActive_resolution_advisories() {
        return active_resolution_advisories;
    }

    public int getRacs_record() {
        return racs_record;
    }

    public boolean isRa_terminated() {
        return ra_terminated;
    }

    public boolean isMultiple_threat_encounter() {
        return multiple_threat_encounter;
    }

    public LongAcasData copy() {
        return new LongAcasData(
                getDownlink_format(),
                getFirst_field(),
                getIcao24(),
                getPayload(),
                getParity(),
                isNoCRC(),
                getType(),
                airborne,
                sensitivity_level,
                reply_information,
                altitude_code,
                valid_rac,
                active_resolution_advisories,
                racs_record,
                ra_terminated,
                multiple_threat_encounter);
    }
}