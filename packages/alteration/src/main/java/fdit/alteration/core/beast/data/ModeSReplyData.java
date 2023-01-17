package fdit.alteration.core.beast.data;

public class ModeSReplyData extends BeastData {

    public ModeSReplyData(final int downlink_format,
                          final int first_field,
                          final String icao24,
                          final String payload,
                          final String parity,
                          final boolean noCRC,
                          final String type) {
        super(downlink_format,
                first_field,
                icao24,
                payload,
                parity,
                noCRC,
                type);
    }

    public ModeSReplyData copy() {
        return new ModeSReplyData(
                getDownlink_format(),
                getFirst_field(),
                getIcao24(),
                getPayload(),
                getParity(),
                isNoCRC(),
                getType());
    }
}