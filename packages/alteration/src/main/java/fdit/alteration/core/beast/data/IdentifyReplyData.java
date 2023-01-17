package fdit.alteration.core.beast.data;

public class IdentifyReplyData extends BeastData {

    private int flight_status;
    private int downlink_request;
    private int utility_msg;
    private int identity;

    public IdentifyReplyData(final int downlink_format,
                             final int first_field,
                             final String icao24,
                             final String payload,
                             final String parity,
                             final boolean noCRC,
                             final String type,
                             final int flight_status,
                             final int downlink_request,
                             final int utility_msg,
                             final int identity) {
        super(downlink_format, first_field, icao24, payload, parity, noCRC, type);
        this.flight_status = flight_status;
        this.downlink_request = downlink_request;
        this.utility_msg = utility_msg;
        this.identity = identity;
    }

    public int getFlight_status() {
        return flight_status;
    }

    public int getDownlink_request() {
        return downlink_request;
    }

    public int getUtility_msg() {
        return utility_msg;
    }

    public int getIdentity() {
        return identity;
    }

    public IdentifyReplyData copy() {
        return new IdentifyReplyData(
                getDownlink_format(),
                getFirst_field(),
                getIcao24(),
                getPayload(),
                getParity(),
                isNoCRC(),
                getType(),
                flight_status,
                downlink_request,
                utility_msg,
                identity);
    }
}