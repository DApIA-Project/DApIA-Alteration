package fdit.alteration.core.beast.message;

import fdit.alteration.core.beast.data.AltitudeReplyData;

public class AltitudeReplyMessage extends BeastMessage {

    private final AltitudeReplyData data;

    public AltitudeReplyMessage(final String hexMessage,
                                final String icao,
                                final int source_id,
                                final String timestamp,
                                final String timestampMilli,
                                final String timestampNano,
                                final AltitudeReplyData data) {
        super(hexMessage, icao, source_id, timestamp, timestampMilli, timestampNano);
        this.data = data;
    }

    @Override
    public AltitudeReplyData getData() {
        return data;
    }

    @Override
    public BeastMessage copy() {
        return new AltitudeReplyMessage(
                hexMessage,
                icao,
                source_id,
                getTimestamp(),
                getTimestampMilli(),
                getTimestampNano(),
                getData().copy());
    }
}