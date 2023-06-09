package fdit.alteration.core.beast.message;

import fdit.alteration.core.beast.data.AdsbVelocityData;

public class AdsbVelocityMessage extends BeastMessage {

    private final AdsbVelocityData data;

    public AdsbVelocityMessage(final String hexMessage,
                               final String icao,
                               final int source_id,
                               final String timestamp,
                                       final String timestampMilli,
                                       final String timestampNano,
                               final AdsbVelocityData data) {
        super(hexMessage, icao, source_id, timestamp, timestampMilli, timestampNano);
        this.data = data;
    }

    @Override
    public AdsbVelocityData getData() {
        return data;
    }

    @Override
    public BeastMessage copy() {
        return new AdsbVelocityMessage(
                hexMessage,
                icao,
                source_id,
                getTimestamp(),
                getTimestampMilli(),
                getTimestampNano(),
                getData().copy());
    }

    @Override
    public String toString() {
        return null;
    }
}
