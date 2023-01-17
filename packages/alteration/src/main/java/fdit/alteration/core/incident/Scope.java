package fdit.alteration.core.incident;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

public class Scope {

    public static final String SCOPE_TYPE_TRIGGER = "trigger";
    public static final String SCOPE_TYPE_TIME_WINDOW = "timeWindow";
    public static final String SCOPE_TYPE_GEO_AREA = "geoArea";
    public static final String SCOPE_TYPE_GEO_THRESHOLD = "geoThreshold";
    public static final String SCOPE_TYPE_GEO_TIME = "geoTime";
    public static final String SCOPE_TYPE_GEO_TIME_WINDOW = "geoTimeWindow";

    @JacksonXmlProperty(isAttribute = true)
    private String type;

    private int lowerAlt;

    private int upperAlt;

    private long lowerBound;

    private long upperBound;

    private String threshold;

    private String thresholdType;

    private String boundType;

    private String time;

    private Polygon polygon;


    public String getType() {
        if (type == null) {
            return "";
        }
        return type;
    }

    public void setType(final String type) {
        this.type = type;
    }

    public int getLowerAlt() {
        return lowerAlt;
    }

    public void setLowerAlt(final int lowerAlt) {
        this.lowerAlt = lowerAlt;
    }

    public int getUpperAlt() {
        return upperAlt;
    }

    public void setUpperAlt(final int upperAlt) {
        this.upperAlt = upperAlt;
    }

    public long getLowerBound() {
        return lowerBound;
    }

    public void setLowerBound(final long lowerBound) {
        this.lowerBound = lowerBound;
    }

    public long getUpperBound() {
        return upperBound;
    }

    public void setUpperBound(final long upperBound) {
        this.upperBound = upperBound;
    }

    public String getThreshold() {
        if (threshold == null) {
            return "";
        }
        return threshold;
    }

    public void setThreshold(final String threshold) {
        this.threshold = threshold;
    }

    public String getThresholdType() {
        if (thresholdType == null) {
            return "";
        }
        return thresholdType;
    }

    public void setThresholdType(final String thresholdType) {
        this.thresholdType = thresholdType;
    }

    public String getBoundType() {
        if (boundType == null) {
            return "";
        }
        return boundType;
    }

    public void setBoundType(final String boundType) {
        this.boundType = boundType;
    }

    public String getTime() {
        if (time == null) {
            return "";
        }
        return time;
    }

    public void setTime(final String time) {
        this.time = time;
    }

    public Polygon getPolygon() {
        return polygon;
    }

    public void setPolygon(final Polygon polygon) {
        this.polygon = polygon;
    }

    public interface ScopeTypeSwitch<T> {

        T visitGeoTimeWindow();

        T visitTimeWindow();

        default T visitGeoArea() {
            return null;
        }

        default T visitGeoThreshold() {
            return null;
        }

        default T visitGeoTime() {
            return null;
        }

        default T visitTrigger() {
            return null;
        }

        default T doSwitch(final String type) throws UnknownScopeException {
            if (type.compareTo(SCOPE_TYPE_GEO_AREA) == 0) {
                return visitGeoArea();
            }
            if (type.compareTo(SCOPE_TYPE_GEO_THRESHOLD) == 0) {
                return visitGeoThreshold();
            }
            if (type.compareTo(SCOPE_TYPE_GEO_TIME) == 0) {
                return visitGeoTime();
            }
            if (type.compareTo(SCOPE_TYPE_GEO_TIME_WINDOW) == 0) {
                return visitGeoTimeWindow();
            }
            if (type.compareTo(SCOPE_TYPE_TIME_WINDOW) == 0) {
                return visitTimeWindow();
            }
            if (type.compareTo(SCOPE_TYPE_TRIGGER) == 0) {
                return visitTrigger();
            }
            throw new UnknownScopeException(type);
        }
    }
}