package fdit.alteration.core.beast.message;

import fdit.alteration.core.beast.data.LongAcasData;

public class LongAcasMessage extends BeastMessage {

    private LongAcasData data;

    public LongAcasMessage(final String hexMessage,
                           final String icao,
                           final int source_id,
                           final String timestamp,
                                       final String timestampMilli,
                                       final String timestampNano,
                           final LongAcasData data) {
        super(hexMessage, icao, source_id, timestamp, timestampMilli, timestampNano);
        this.data = data;
    }

    @Override
    public LongAcasData getData() {
        return data;
    }

    @Override
    public BeastMessage copy() {
        return new LongAcasMessage(
                hexMessage,
                icao,
                source_id,
                getTimestamp(),
                getTimestampMilli(),
                getTimestampNano(),
                getData().copy());
    }
}