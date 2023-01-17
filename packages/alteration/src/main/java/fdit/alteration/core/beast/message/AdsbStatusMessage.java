package fdit.alteration.core.beast.message;

import fdit.alteration.core.beast.data.AdsbStatusData;

public class AdsbStatusMessage extends BeastMessage {

    private AdsbStatusData data;

    public AdsbStatusMessage(final String hexMessage,
                             final String icao,
                             final int source_id,
                             final String timestamp,
                                       final String timestampMilli,
                                       final String timestampNano,
                             final AdsbStatusData data) {
        super(hexMessage, icao, source_id, timestamp, timestampMilli, timestampNano);
        this.data = data;
    }

    @Override
    public AdsbStatusData getData() {
        return data;
    }

    @Override
    public BeastMessage copy() {
        return new AdsbStatusMessage(
                hexMessage,
                icao,
                source_id,
                getTimestamp(),
                getTimestampMilli(),
                getTimestampNano(),
                getData().copy());
    }
}
