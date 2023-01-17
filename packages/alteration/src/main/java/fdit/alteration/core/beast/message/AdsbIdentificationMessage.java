package fdit.alteration.core.beast.message;

import fdit.alteration.core.beast.data.AdsbIdentificationData;

public class AdsbIdentificationMessage extends BeastMessage {

    private AdsbIdentificationData data;
    private String callsign;

    public AdsbIdentificationMessage(final String hexMessage,
                                     final String icao,
                                     final int source_id,
                                     final String timestamp,
                                       final String timestampMilli,
                                       final String timestampNano,
                                     final String callsign,
                                     final AdsbIdentificationData data) {
        super(hexMessage, icao, source_id, timestamp, timestampMilli, timestampNano);
        this.data = data;
        this.callsign = callsign;
    }

    public String getCallsign() {
        return callsign;
    }

    public void setCallsign(String callsign) {
        this.callsign = callsign;
    }

    @Override
    public AdsbIdentificationData getData() {
        return data;
    }

    @Override
    public BeastMessage copy() {
        return new AdsbIdentificationMessage(
                hexMessage,
                icao,
                source_id,
                getTimestamp(),
                getTimestampMilli(),
                getTimestampNano(),
                callsign,
                getData().copy());
    }
}