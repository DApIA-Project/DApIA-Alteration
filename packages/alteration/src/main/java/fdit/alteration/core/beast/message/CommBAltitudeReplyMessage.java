package fdit.alteration.core.beast.message;

import fdit.alteration.core.beast.data.CommBAltitudeReplyData;

public class CommBAltitudeReplyMessage extends BeastMessage {

    private final CommBAltitudeReplyData data;

    public CommBAltitudeReplyMessage(final String hexMessage,
                                     final String icao,
                                     final int source_id,
                                     final String timestamp,
                                       final String timestampMilli,
                                       final String timestampNano,
                                     final CommBAltitudeReplyData data) {
        super(hexMessage, icao, source_id, timestamp, timestampMilli, timestampNano);
        this.data = data;
    }

    @Override
    public CommBAltitudeReplyData getData() {
        return data;
    }

    @Override
    public BeastMessage copy() {
        return new CommBAltitudeReplyMessage(
                hexMessage,
                icao,
                source_id,
                getTimestamp(),
                getTimestampMilli(),
                getTimestampNano(),
                getData().copy());
    }
}