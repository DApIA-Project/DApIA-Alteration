package fdit.alteration.core.incident;

import org.codehaus.jackson.annotate.JsonProperty;

import java.util.Collection;

import static com.google.common.collect.Lists.newArrayList;

public class IncidentJson {

    @JsonProperty("sensors")
    private Sensors sensors;

    public Collection<Sensor> getSensors() {
        if (sensors != null) {
            return sensors.getSensorList();
        } else {
            return newArrayList();
        }
    }

    public void setSensors(final Sensors sensors) {
        this.sensors = sensors;
    }
}