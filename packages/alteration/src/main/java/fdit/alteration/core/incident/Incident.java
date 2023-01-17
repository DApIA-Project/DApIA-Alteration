package fdit.alteration.core.incident;

import java.util.Collection;

import static com.google.common.collect.Lists.newArrayList;

public class Incident {

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