package fdit.alteration.core.beast.message;

import fdit.alteration.core.beast.data.ShortAcasData;

public class ShortAcasMessage extends BeastMessage {

    private final ShortAcasData data;

    public ShortAcasMessage(final String hexMessage,
                            final String icao,
                            final int source_id,
                            final String timestamp,
                                       final String timestampMilli,
                                       final String timestampNano,
                            final ShortAcasData data) {
        super(hexMessage, icao, source_id, timestamp, timestampMilli, timestampNano);
        this.data = data;
    }

    @Override
    public ShortAcasData getData() {
        return data;
    }

    @Override
    public BeastMessage copy() {
        return new ShortAcasMessage(
                hexMessage,
                icao,
                source_id,
                getTimestamp(),
                getTimestampMilli(),
                getTimestampNano(),
                getData().copy());
    }
}