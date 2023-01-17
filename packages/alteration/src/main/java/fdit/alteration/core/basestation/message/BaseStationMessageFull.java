package fdit.alteration.core.basestation.message;

import fdit.alteration.core.basestation.message.parameter.*;
import fdit.alteration.core.engine.Message;

import javax.annotation.Nullable;
import java.util.Optional;

import static java.util.Optional.ofNullable;

public class BaseStationMessageFull extends BaseStationMessage implements
        AlertParameter,
        AltitudeParameter,
        CallsignParameter,
        EmergencyParameter,
        GroundSpeedParameter,
        LatitudeParameter,
        LongitudeParameter,
        OnGroundParameter,
        SpiParameter,
        SquawkParameter,
        TrackParameter,
        VerticalRateParameter {

    @Nullable
    private Boolean alert;
    @Nullable
    private Integer verticalRate;
    @Nullable
    private Double track;
    @Nullable
    private Integer squawk;
    @Nullable
    private Boolean spi;
    @Nullable
    private Boolean onGround;
    @Nullable
    private Double longitude;
    @Nullable
    private Double latitude;
    @Nullable
    private Double groundSpeed;
    @Nullable
    private Boolean emergency;
    @Nullable
    private String callsign;
    @Nullable
    private Integer altitude;

    public BaseStationMessageFull(final int transmissionType,
                                  final int sessionID,
                                  final int aircraftID,
                                  final String icao,
                                  final int flightID,
                                  final long timestampGenerated,
                                  final long timestampLogged,
                                  @Nullable final String callsign,
                                  @Nullable final Integer altitude,
                                  @Nullable final Double groundSpeed,
                                  @Nullable final Double track,
                                  @Nullable final Double latitude,
                                  @Nullable final Double longitude,
                                  @Nullable final Integer verticalRate,
                                  @Nullable final Integer squawk,
                                  @Nullable final Boolean alert,
                                  @Nullable final Boolean emergency,
                                  @Nullable final Boolean spi,
                                  @Nullable final Boolean onGround) {
        super(transmissionType, sessionID, aircraftID, icao, flightID, timestampGenerated, timestampLogged, 0);
        this.alert = alert;
        this.verticalRate = verticalRate;
        this.track = track;
        this.squawk = squawk;
        this.spi = spi;
        this.onGround = onGround;
        this.longitude = longitude;
        this.latitude = latitude;
        this.groundSpeed = groundSpeed;
        this.emergency = emergency;
        this.callsign = callsign;
        this.altitude = altitude;
    }

    public BaseStationMessageFull(final int transmissionType,
                                  final int sessionID,
                                  final int aircraftID,
                                  final String icao,
                                  final int flightID,
                                  final long timestampGenerated,
                                  final long timestampLogged,
                                  @Nullable final String callsign,
                                  @Nullable final Integer altitude,
                                  @Nullable final Double groundSpeed,
                                  @Nullable final Double track,
                                  @Nullable final Double latitude,
                                  @Nullable final Double longitude,
                                  @Nullable final Integer verticalRate,
                                  @Nullable final Integer squawk,
                                  @Nullable final Boolean alert,
                                  @Nullable final Boolean emergency,
                                  @Nullable final Boolean spi,
                                  @Nullable final Boolean onGround,
                                  final int mask) {
        super(transmissionType, sessionID, aircraftID, icao, flightID, timestampGenerated, timestampLogged, mask);
        this.alert = alert;
        this.verticalRate = verticalRate;
        this.track = track;
        this.squawk = squawk;
        this.spi = spi;
        this.onGround = onGround;
        this.longitude = longitude;
        this.latitude = latitude;
        this.groundSpeed = groundSpeed;
        this.emergency = emergency;
        this.callsign = callsign;
        this.altitude = altitude;
    }

    @Override
    public Optional<Boolean> isAlert() {
        return ofNullable(alert);
    }

    @Override
    public void setAlert(final boolean alert) {
        this.alert = alert;
    }

    @Override
    public Optional<Integer> getAltitude() {
        return ofNullable(altitude);
    }

    @Override
    public void setAltitude(final int altitude) {
        this.altitude = altitude;
    }

    @Override
    public Optional<String> getCallsign() {
        return ofNullable(callsign);
    }

    @Override
    public void setCallsign(@Nullable final String callsign) {
        this.callsign = callsign;
    }

    @Override
    public Optional<Boolean> isEmergency() {
        return ofNullable(emergency);
    }

    @Override
    public void setEmergency(final boolean emergency) {
        this.emergency = emergency;
    }

    @Override
    public Optional<Double> getGroundSpeed() {
        return ofNullable(groundSpeed);
    }

    @Override
    public void setGroundSpeed(final double groundSpeed) {
        this.groundSpeed = groundSpeed;
    }

    @Override
    public Optional<Double> getLatitude() {
        return ofNullable(latitude);
    }

    @Override
    public void setLatitude(final double latitude) {
        this.latitude = latitude;
    }

    @Override
    public Optional<Double> getLongitude() {
        return ofNullable(longitude);
    }

    @Override
    public void setLongitude(final double longitude) {
        this.longitude = longitude;
    }

    @Override
    public Optional<Boolean> isOnGround() {
        return ofNullable(onGround);
    }

    @Override
    public void setOnGround(final boolean onGround) {
        this.onGround = onGround;
    }

    @Override
    public Optional<Boolean> isSpi() {
        return ofNullable(spi);
    }

    @Override
    public void setSpi(final boolean spi) {
        this.spi = spi;
    }

    @Override
    public Optional<Integer> getSquawk() {
        return ofNullable(squawk);
    }

    @Override
    public void setSquawk(final int squawk) {
        this.squawk = squawk;
    }

    @Override
    public Optional<Double> getTrack() {
        return ofNullable(track);
    }

    @Override
    public void setTrack(final double track) {
        this.track = track;
    }

    @Override
    public Optional<Integer> getVerticalRate() {
        return ofNullable(verticalRate);
    }

    @Override
    public void setVerticalRate(final int verticalRate) {
        this.verticalRate = verticalRate;
    }

    @Override
    public String toString() {
        return super.toString() +
                (callsign != null ? callsign : "") + ',' +
                integerToString(altitude) + ',' +
                doubleToString(groundSpeed, DECIMAL_FORMAT_1) + ',' +
                doubleToString(track, DECIMAL_FORMAT_1) + ',' +
                doubleToString(latitude, DECIMAL_FORMAT_5) + ',' +
                doubleToString(longitude, DECIMAL_FORMAT_5) + ',' +
                integerToString(verticalRate) + ',' +
                integerToString(squawk) + ',' +
                booleanToString(alert) + ',' +
                booleanToString(emergency) + ',' +
                booleanToString(spi) + ',' +
                booleanToString(onGround);
    }

    @Override
    public Message copy() {
        return new BaseStationMessageFull(
                getTransmissionType(),
                getSessionID(),
                getAircraftID(),
                getIcao(),
                getFlightID(),
                getTimestampGenerated(),
                getTimestampLogged(),
                callsign,
                altitude,
                groundSpeed,
                track,
                latitude,
                longitude,
                verticalRate,
                squawk,
                alert,
                emergency,
                spi,
                onGround,
                getMask());
    }
}