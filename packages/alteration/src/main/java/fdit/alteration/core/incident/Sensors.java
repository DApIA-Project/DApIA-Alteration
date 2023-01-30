package fdit.alteration.core.incident;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.annotation.JsonRootName;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Collection;

import static com.google.common.collect.Lists.newArrayList;

public class Sensors {


    @JacksonXmlProperty(localName = "sensor")
    @JacksonXmlElementWrapper(useWrapping = false)
    @JsonProperty("sensor")
    private Collection<Sensor> sensorList = newArrayList();

    public Collection<Sensor> getSensorList() {
        return sensorList;
    }

    public void setSensorList(final Collection<Sensor> sensorList) {
        this.sensorList = sensorList;
    }
}