package fdit.alteration.core.incident;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Parameter {

    public static final String CHARAC_ICAO = "icao";
    public static final String CHARAC_HEX_IDENT = "hexIdent";
    public static final String CHARAC_CALLSIGN = "callsign";
    public static final String CHARAC_SQUAWK = "squawk";
    public static final String CHARAC_ALTITUDE = "altitude";
    public static final String CHARAC_GROUNDSPEED = "groundSpeed";
    public static final String CHARAC_TRACK = "track";
    public static final String CHARAC_LATITUDE = "latitude";
    public static final String CHARAC_LONGITUDE = "longitude";
    public static final String CHARAC_VERTICALRATE = "verticalRate";
    public static final String CHARAC_ALERT = "alert";
    public static final String CHARAC_TIMESTAMP = "timestamp";
    public static final String CHARAC_EMERGENCY = "emergency";
    public static final String CHARAC_SPI = "SPI";
    public static final String CHARAC_ISONGROUND = "isOnGround";
    public static final String MODE_DRIFT = "drift";
    public static final String MODE_NOISE = "noise";
    public static final String MODE_OFFSET = "offset";
    public static final String MODE_SIMPLE = "simple";

    @JacksonXmlProperty(isAttribute = true)
    private String mode;

    @JacksonXmlProperty(localName = "key")
    @JsonProperty("key")
    private String characteristic;

    private String value;

    private int number = 0;

    private int frequency = 0;

    private double angle = 0.0;

    public String getMode() {
        return mode;
    }

    public void setMode(final String mode) {
        this.mode = mode;
    }

    public String getCharacteristic() {
        return characteristic;
    }

    public void setCharacteristic(final String characteristic) {
        this.characteristic = characteristic;
    }

    public String getValue() {
        return value;
    }

    public void setValue(final String value) {
        this.value = value;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(final int number) {
        this.number = number;
    }

    public int getFrequency() {
        return frequency;
    }

    public void setFrequency(int frequency) {
        this.frequency = frequency;
    }

    public double getAngle() {
        return angle;
    }

    public void setAngle(double angle) {
        this.angle = angle;
    }

    public interface ModeSwitch<T> {

        T visitNoise();

        T visitDrift();

        T visitOffset();

        T visitSimple();

        default T doSwitch(final String mode) {
            if (mode.compareToIgnoreCase(MODE_DRIFT) == 0) {
                return visitDrift();
            }
            if (mode.compareToIgnoreCase(MODE_NOISE) == 0) {
                return visitNoise();
            }
            if (mode.compareToIgnoreCase(MODE_OFFSET) == 0) {
                return visitOffset();
            }
            return visitSimple();
        }
    }

    public interface CharacteristicSwitch<T> {

        T visitIcao();

        default T visitCallSign() {
            return null;
        }

        default T visitSquawk() {
            return null;
        }

        default T visitAltitude() {
            return null;
        }

        default T visitGroundSpeed() {
            return null;
        }

        default T visitTrack() {
            return null;
        }

        default T visitLatitude() {
            return null;
        }

        default T visitLongitude() {
            return null;
        }

        default T visitVerticalRate() {
            return null;
        }

        default T visitAlert() {
            return null;
        }

        default T visitEmergency() {
            return null;
        }

        default T visitSpi() {
            return null;
        }

        default T visitIsOnGround() {
            return null;
        }

        default T visitDefault() {
            return null;
        }

        default T doSwitch(final String characteristic) throws UnknownCharacteristicException {
            if (characteristic.compareToIgnoreCase(CHARAC_ICAO) == 0 ||
                    characteristic.compareToIgnoreCase(CHARAC_HEX_IDENT) == 0) {
                return visitIcao();
            }
            if (characteristic.compareToIgnoreCase(CHARAC_CALLSIGN) == 0) {
                return visitCallSign();
            }
            if (characteristic.compareToIgnoreCase(CHARAC_SQUAWK) == 0) {
                return visitSquawk();
            }
            if (characteristic.compareToIgnoreCase(CHARAC_ALTITUDE) == 0) {
                return visitAltitude();
            }
            if (characteristic.compareToIgnoreCase(CHARAC_GROUNDSPEED) == 0) {
                return visitGroundSpeed();
            }
            if (characteristic.compareToIgnoreCase(CHARAC_TRACK) == 0) {
                return visitTrack();
            }
            if (characteristic.compareToIgnoreCase(CHARAC_LATITUDE) == 0) {
                return visitLatitude();
            }
            if (characteristic.compareToIgnoreCase(CHARAC_LONGITUDE) == 0) {
                return visitLongitude();
            }
            if (characteristic.compareToIgnoreCase(CHARAC_VERTICALRATE) == 0) {
                return visitVerticalRate();
            }
            if (characteristic.compareToIgnoreCase(CHARAC_ALERT) == 0) {
                return visitAlert();
            }
            if (characteristic.compareToIgnoreCase(CHARAC_EMERGENCY) == 0) {
                return visitEmergency();
            }
            if (characteristic.compareToIgnoreCase(CHARAC_SPI) == 0) {
                return visitSpi();
            }
            if (characteristic.compareToIgnoreCase(CHARAC_ISONGROUND) == 0) {
                return visitIsOnGround();
            }
            throw new UnknownCharacteristicException(characteristic);
        }
    }
}