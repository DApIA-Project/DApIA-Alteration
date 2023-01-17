package fdit.alteration.core.beast.data;

public class AdsbPosition {

    private double altitude;
    private double latitude;
    private double longitude;

    public AdsbPosition(final double altitude,
                        final double latitude,
                        final double longitude) {
        this.altitude = altitude;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public double getAltitude() {
        return altitude;
    }

    public void setAltitude(double altitude) {
        this.altitude = altitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }
}