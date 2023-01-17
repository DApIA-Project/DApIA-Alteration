package fdit.alteration.core.incident;

public class Vertex {

    private Lat lat;

    private Lon lon;

    private Long time;

    public Lat getLat() {
        return lat;
    }

    public Double getLatValue() {
        return lat.getContent();
    }

    public Boolean isLatOffset() {
        return lat.getOffset();
    }

    public void setLat(final Lat lat) {
        this.lat = lat;
    }

    public Lon getLon() {
        return lon;
    }

    public void setLon(final Lon lon) {
        this.lon = lon;
    }

    public Double getLonValue() {
        return lon.getContent();
    }

    public Boolean isLonOffset() {
        return lon.getOffset();
    }

    public Long getTime() {
        return time;
    }

    public void setTime(final Long time) {
        this.time = time;
    }
}