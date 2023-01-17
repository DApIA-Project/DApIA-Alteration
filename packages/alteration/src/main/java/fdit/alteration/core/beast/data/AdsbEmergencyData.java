package fdit.alteration.core.beast.data;

public class AdsbEmergencyData extends AdsbData {

    private int msgsubtype;
    private int emergency_state;
    private int mode_a_code;

    public AdsbEmergencyData(final int downlink_format,
                             final int first_field,
                             final String icao24,
                             final String payload,
                             final String parity,
                             final boolean noCRC,
                             final String type,
                             final int capabilities,
                             final String message,
                             final int format_type_code,
                             final int sub_type,
                             final int msgsubtype,
                             final int emergency_state,
                             final int mode_a_code) {
        super(downlink_format,
                first_field,
                icao24,
                payload,
                parity,
                noCRC,
                type,
                capabilities,
                message,
                format_type_code,
                sub_type);
        this.msgsubtype = msgsubtype;
        this.emergency_state = emergency_state;
        this.mode_a_code = mode_a_code;
    }

    public int getMsgsubtype() {
        return msgsubtype;
    }

    public int getEmergency_state() {
        return emergency_state;
    }

    public int getMode_a_code() {
        return mode_a_code;
    }

    public AdsbEmergencyData copy() {
        return new AdsbEmergencyData(
                getDownlink_format(),
                getFirst_field(),
                getIcao24(),
                getPayload(),
                getParity(),
                isNoCRC(),
                getType(),
                getCapabilities(),
                getMessage(),
                getFormat_type_code(),
                getSub_type(),
                msgsubtype,
                emergency_state,
                mode_a_code);
    }
}