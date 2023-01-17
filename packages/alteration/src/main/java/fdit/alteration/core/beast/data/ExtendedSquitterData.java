package fdit.alteration.core.beast.data;

public class ExtendedSquitterData extends AdsbData {

    public ExtendedSquitterData(final int downlink_format,
                                final int first_field,
                                final String icao24,
                                final String payload,
                                final String parity,
                                final boolean noCRC,
                                final String type,
                                final int capabilities,
                                final String message,
                                final int format_type_code,
                                final int sub_type) {
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
    }

    public ExtendedSquitterData copy() {
        return new ExtendedSquitterData(
                getDownlink_format(),
                getFirst_field(),
                getIcao24(),
                getPayload(),
                getParity(),
                isNoCRC(),
                getType(),
                capabilities,
                message,
                format_type_code,
                sub_type);
    }
}