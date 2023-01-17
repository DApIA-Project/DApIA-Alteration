package fdit.alteration.core.beast.message;

import fdit.alteration.core.beast.data.AllCallReplyData;

public class AllCallReplyMessage extends BeastMessage {

    private final AllCallReplyData data;

    public AllCallReplyMessage(final String hexMessage,
                               final String icao,
                               final int source_id,
                               final String timestamp,
                                       final String timestampMilli,
                                       final String timestampNano,
                               final AllCallReplyData data) {
        super(hexMessage, icao, source_id, timestamp, timestampMilli, timestampNano);
        this.data = data;
    }

    @Override
    public AllCallReplyData getData() {
        return data;
    }

    @Override
    public BeastMessage copy() {
        return new AllCallReplyMessage(
                hexMessage,
                icao,
                source_id,
                getTimestamp(),
                getTimestampMilli(),
                getTimestampNano(),
                getData().copy());
    }
}