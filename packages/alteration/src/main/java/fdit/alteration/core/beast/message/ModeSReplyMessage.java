package fdit.alteration.core.beast.message;

import fdit.alteration.core.beast.data.ModeSReplyData;

public class ModeSReplyMessage extends BeastMessage {

    private final ModeSReplyData data;

    public ModeSReplyMessage(final String hexMessage,
                             final String icao,
                             final int source_id,
                             final String timestamp,
                                       final String timestampMilli,
                                       final String timestampNano,
                             final ModeSReplyData data) {
        super(hexMessage, icao, source_id, timestamp, timestampMilli, timestampNano);
        this.data = data;
    }

    @Override
    public ModeSReplyData getData() {
        return data;
    }

    @Override
    public BeastMessage copy() {
        return new ModeSReplyMessage(
                hexMessage,
                icao,
                source_id,
                getTimestamp(),
                getTimestampMilli(),
                getTimestampNano(),
                getData().copy());
    }
}