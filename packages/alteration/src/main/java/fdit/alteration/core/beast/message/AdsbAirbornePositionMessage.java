package fdit.alteration.core.beast.message;

import fdit.alteration.core.beast.data.AdsbAirbornePositionData;
import fdit.alteration.core.beast.data.AdsbPosition;

public class AdsbAirbornePositionMessage extends BeastMessage {

    private AdsbPosition position;
    private AdsbAirbornePositionData data;

    public AdsbAirbornePositionMessage(final String hexMessage,
                                       final String icao,
                                       final int source_id,
                                       final String timestamp,
                                       final String timestampMilli,
                                       final String timestampNano,
                                       final AdsbAirbornePositionData data,
                                       final AdsbPosition position) {
        super(hexMessage, icao, source_id, timestamp, timestampMilli, timestampNano);
        this.data = data;
        this.position = position;
    }

    public AdsbPosition getPosition() {
        return position;
    }

    @Override
    public AdsbAirbornePositionData getData() {
        return data;
    }

    @Override
    public BeastMessage copy() {
        return new AdsbAirbornePositionMessage(
                hexMessage,
                icao,
                source_id,
                getTimestamp(),
                getTimestampMilli(),
                getTimestampNano(),
                getData().copy(),
                new AdsbPosition(position.getAltitude(), position.getLatitude(), position.getLongitude()));
    }
}