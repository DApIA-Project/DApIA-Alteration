package fdit.alteration.core.beast.message;

import fdit.alteration.core.beast.data.IdentifyReplyData;

public class IdentifyReplyMessage extends BeastMessage {

    private final IdentifyReplyData data;

    public IdentifyReplyMessage(final String hexMessage,
                                final String icao,
                                final int source_id,
                                final String timestamp,
                                       final String timestampMilli,
                                       final String timestampNano,
                                final IdentifyReplyData data) {
        super(hexMessage, icao, source_id, timestamp, timestampMilli, timestampNano);
        this.data = data;
    }

    @Override
    public IdentifyReplyData getData() {
        return data;
    }

    @Override
    public BeastMessage copy() {
        return new IdentifyReplyMessage(
                hexMessage,
                icao,
                source_id,
                getTimestamp(),
                getTimestampMilli(),
                getTimestampNano(),
                getData().copy());
    }
}