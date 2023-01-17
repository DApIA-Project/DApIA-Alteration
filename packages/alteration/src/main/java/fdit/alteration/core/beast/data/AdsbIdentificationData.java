package fdit.alteration.core.beast.data;

public class AdsbIdentificationData extends AdsbData {

    private int emitter_category;
    private String identity;

    public AdsbIdentificationData(final int downlink_format,
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
                                  final int emitter_category,
                                  final String identity) {
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
        this.emitter_category = emitter_category;
        this.identity = identity;
    }

    public String getIdentity() {
        return identity;
    }

    public void setIdentity(String identity) {
        this.identity = identity;
    }

    public int getEmitter_category() {
        return emitter_category;
    }

    public AdsbIdentificationData copy() {
        return new AdsbIdentificationData(
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
                emitter_category,
                identity);
    }
}