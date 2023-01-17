package fdit.alteration.core.beast.message;

import fdit.alteration.core.beast.data.CommBIdentifyReplyData;

public class CommBIdentifyReplyMessage extends BeastMessage {

    private final CommBIdentifyReplyData data;

    public CommBIdentifyReplyMessage(final String hexMessage,
                                     final String icao,
                                     final int source_id,
                                     final String timestamp,
                                       final String timestampMilli,
                                       final String timestampNano,
                                     final CommBIdentifyReplyData data) {
        super(hexMessage, icao, source_id, timestamp, timestampMilli, timestampNano);
        this.data = data;
    }

    @Override
    public CommBIdentifyReplyData getData() {
        return data;
    }

    @Override
    public BeastMessage copy() {
        return new CommBIdentifyReplyMessage(
                hexMessage,
                icao,
                source_id,
                getTimestamp(),
                getTimestampMilli(),
                getTimestampNano(),
                getData().copy());
    }
}