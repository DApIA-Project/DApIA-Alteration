package fdit.alteration.core.beast.message;

import fdit.alteration.core.beast.data.ExtendedSquitterData;

public class ExtendedSquitterMessage extends BeastMessage {

    private final ExtendedSquitterData data;

    public ExtendedSquitterMessage(final String hexMessage,
                                   final String icao,
                                   final int source_id,
                                   final String timestamp,
                                       final String timestampMilli,
                                       final String timestampNano,
                                   final ExtendedSquitterData data) {
        super(hexMessage, icao, source_id, timestamp, timestampMilli, timestampNano);
        this.data = data;
    }

    @Override
    public ExtendedSquitterData getData() {
        return data;
    }

    @Override
    public BeastMessage copy() {
        return new ExtendedSquitterMessage(
                hexMessage,
                icao,
                source_id,
                getTimestamp(),
                getTimestampMilli(),
                getTimestampNano(),
                getData().copy());
    }
}