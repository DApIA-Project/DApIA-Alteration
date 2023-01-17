package fdit.alteration.core.beast.message;

import fdit.alteration.core.beast.data.AdsbEmergencyData;

public class AdsbEmergencyMessage extends BeastMessage {

    private AdsbEmergencyData data;

    public AdsbEmergencyMessage(final String hexMessage,
                                final String icao,
                                final int source_id,
                                final String timestamp,
                                       final String timestampMilli,
                                       final String timestampNano,
                                final AdsbEmergencyData data) {
        super(hexMessage, icao, source_id, timestamp, timestampMilli, timestampNano);
        this.data = data;
    }

    @Override
    public AdsbEmergencyData getData() {
        return data;
    }

    @Override
    public BeastMessage copy() {
        return new AdsbEmergencyMessage(
                hexMessage,
                icao,
                source_id,
                getTimestamp(),
                getTimestampMilli(),
                getTimestampNano(),
                getData().copy());
    }
}