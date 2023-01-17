package fdit.alteration.core.engine;

import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.Options;

public class EngineParameters {

    public static final Options OPTIONS = getOptions();
    public static final String LABEL_OPTIONS = "l";
    public static final String GROUNDSPEED_REALISM_OPTIONS = "gs";
    public static final String TRACK_REALISM_OPTIONS = "t";
    public static final String VERTICAL_RATE_REALISM_OPTIONS = "vr";
    public static final String DISABLE_LATITUDE_OPTIONS = "dlat";
    public static final String DISABLE_LONGITUDE_OPTIONS = "dlon";
    public static final String DISABLE_ALTITUDE_OPTIONS = "dalt";
    public static final String LATITUDE_NOISE_OPTIONS = "latn";
    public static final String LONGITUDE_NOISE_OPTIONS = "lonn";

    private boolean labeled = false;
    private boolean groundSpeed = false;
    private boolean track = false;
    private boolean verticalRate = false;
    private boolean disableLatitude = false;
    private boolean disableLongitude = false;
    private boolean disableAltitude = false;
    private boolean latitudeNoise = false;
    private boolean longitudeNoise = false;

    public EngineParameters() {
    }

    public EngineParameters(final boolean labeled) {
        this.labeled = labeled;
    }

    public EngineParameters(final CommandLine commandLine) {
        // General
        labeled = commandLine.hasOption(LABEL_OPTIONS);
        // Trajectory modification
        groundSpeed = commandLine.hasOption(GROUNDSPEED_REALISM_OPTIONS);
        track = commandLine.hasOption(TRACK_REALISM_OPTIONS);
        verticalRate = commandLine.hasOption(VERTICAL_RATE_REALISM_OPTIONS);
        disableLatitude = commandLine.hasOption(DISABLE_LATITUDE_OPTIONS);
        disableLongitude = commandLine.hasOption(DISABLE_LONGITUDE_OPTIONS);
        disableAltitude = commandLine.hasOption(DISABLE_ALTITUDE_OPTIONS);
        latitudeNoise = commandLine.hasOption(LATITUDE_NOISE_OPTIONS);
        longitudeNoise = commandLine.hasOption(LONGITUDE_NOISE_OPTIONS);
    }

    public boolean isLabeled() {
        return labeled;
    }

    public void setLabeled(final boolean labeled) {
        this.labeled = labeled;
    }

    public boolean isGroundSpeed() {
        return groundSpeed;
    }

    public void setGroundSpeed(final boolean groundSpeed) {
        this.groundSpeed = groundSpeed;
    }

    public boolean isTrack() {
        return track;
    }

    public void setTrack(final boolean track) {
        this.track = track;
    }

    public boolean isVerticalRate() {
        return verticalRate;
    }

    public void setVerticalRate(boolean verticalRate) {
        this.verticalRate = verticalRate;
    }

    public boolean isDisableLatitude() {
        return disableLatitude;
    }

    public void setDisableLatitude(boolean disableLatitude) {
        this.disableLatitude = disableLatitude;
    }

    public boolean isDisableLongitude() {
        return disableLongitude;
    }

    public void setDisableLongitude(boolean disableLongitude) {
        this.disableLongitude = disableLongitude;
    }

    public boolean isDisableAltitude() {
        return disableAltitude;
    }

    public void setDisableAltitude(boolean disableAltitude) {
        this.disableAltitude = disableAltitude;
    }

    public boolean isLatitudeNoise() {
        return latitudeNoise;
    }

    public void setLatitudeNoise(boolean latitudeNoise) {
        this.latitudeNoise = latitudeNoise;
    }

    public boolean isLongitudeNoise() {
        return longitudeNoise;
    }

    public void setLongitudeNoise(boolean longitudeNoise) {
        this.longitudeNoise = longitudeNoise;
    }

    private static Options getOptions() {
        final Options options = new Options();
        options.addOption(LABEL_OPTIONS, "label", false, "Enable data labelling.");
        options.addOption(GROUNDSPEED_REALISM_OPTIONS, "ground-speed", false, "Enable ground speed realism.");
        options.addOption(TRACK_REALISM_OPTIONS, "track", false, "Enable track realism.");
        options.addOption(VERTICAL_RATE_REALISM_OPTIONS, "vertical-rate", false, "Enable vertical rate realism.");
        options.addOption(DISABLE_LATITUDE_OPTIONS, "disable-latitude", false, "Disable latitude interpolation.");
        options.addOption(DISABLE_LONGITUDE_OPTIONS, "disable-longitude", false, "Disable longitude interpolation.");
        options.addOption(DISABLE_ALTITUDE_OPTIONS, "disable-altitude", false, "Disable altitude interpolation.");
        options.addOption(LATITUDE_NOISE_OPTIONS, "latitude-noise", false, "Enable latitude noise.");
        options.addOption(LONGITUDE_NOISE_OPTIONS, "longitude-noise", false, "Enable longitude noise.");
        return options;
    }
}