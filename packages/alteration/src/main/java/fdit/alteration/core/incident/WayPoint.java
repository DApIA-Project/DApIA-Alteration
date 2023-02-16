package fdit.alteration.core.incident;
import com.fasterxml.jackson.annotation.JsonProperty;
public class WayPoint {

    @JsonProperty("vertex")
    private Vertex vertex;

    @JsonProperty("altitude")
    private Altitude altitude;

    @JsonProperty("time")
    private long time;

    public Vertex getVertex() {
        return vertex;
    }

    public void setVertex(final Vertex vertex) {
        this.vertex = vertex;
    }

    public Altitude getAltitude() {
        return altitude;
    }

    public Integer getAltitudeValue() {
        return altitude.getContent();
    }

    public Boolean isAltitudeOffset() {
        return altitude.getOffset();
    }

    public Boolean isTimedAltitude() {
        return altitude.getTime();
    }

    public Boolean isTimedPosition() {
        return vertex.getTime() != null;
    }

    public void setAltitude(final Altitude altitude) {
        this.altitude = altitude;
    }

    public long getTime() {
        return time;
    }

    public void setTime(final long time) {
        this.time = time;
    }
}