package fdit.alteration.core.beast.data;

public class AllCallReplyData extends BeastData {

    private int capabilities;
    private String interrogator;

    public AllCallReplyData(final int downlink_format,
                            final int first_field,
                            final String icao24,
                            final String payload,
                            final String parity,
                            final boolean noCRC,
                            final String type,
                            final int capabilities,
                            final String interrogator) {
        super(downlink_format, first_field, icao24, payload, parity, noCRC, type);
        this.capabilities = capabilities;
        this.interrogator = interrogator;
    }

    public int getCapabilities() {
        return capabilities;
    }

    public String getInterrogator() {
        return interrogator;
    }

    public AllCallReplyData copy() {
        return new AllCallReplyData(
                getDownlink_format(),
                getFirst_field(),
                getIcao24(),
                getPayload(),
                getParity(),
                isNoCRC(),
                getType(),
                getCapabilities(),
                interrogator);
    }
}