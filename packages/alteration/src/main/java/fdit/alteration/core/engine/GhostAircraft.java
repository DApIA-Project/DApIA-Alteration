package fdit.alteration.core.engine;

import static java.lang.Integer.parseInt;

public class GhostAircraft {

    private final String icao;
    private final double angle;
    private final double distanceCoeff;
    private final long firstAppearance;
    private final int aircraftId;
    private double latitude = 0.0;
    private double longitude = 0.0;
    private double previousLatitude = 0.0;
    private double previousLongitude = 0.0;

    public GhostAircraft(final String icao,
                         final double angle,
                         final double distanceCoeff,
                         final long firstAppearance) {
        this.aircraftId = parseInt(icao, 16);
        this.icao = icao;
        this.angle = angle;
        this.distanceCoeff = distanceCoeff;
        this.firstAppearance = firstAppearance;
    }

    public int getAircraftId() {
        return aircraftId;
    }

    public long getFirstAppearance() {
        return firstAppearance;
    }

    public String getIcao() {
        return icao;
    }

    public double getAngle() {
        return angle;
    }

    public double getDistanceCoeff() {
        return distanceCoeff;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        previousLatitude = this.latitude;
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        previousLongitude = this.longitude;
        this.longitude = longitude;
    }

    public double getPreviousLatitude() {
        return previousLatitude;
    }

    public double getPreviousLongitude() {
        return previousLongitude;
    }
}