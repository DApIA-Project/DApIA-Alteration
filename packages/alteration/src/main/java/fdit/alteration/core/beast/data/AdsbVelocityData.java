package fdit.alteration.core.beast.data;

public class AdsbVelocityData extends AdsbData {

    private int msg_subtype;
    private boolean intent_change;
    private boolean ifr_capability;
    private int navigation_accuracy_category;
    private boolean direction_west;
    private int east_west_velocity;
    private boolean velocity_info_available;
    private boolean direction_south;
    private int north_south_velocity;
    private boolean vertical_source;
    private boolean vertical_rate_down;
    private int vertical_rate;
    private boolean vertical_rate_info_available;
    private int geo_minus_baro;
    private boolean geo_minus_baro_available;

    public AdsbVelocityData(final int downlink_format,
                            final int first_field,
                            final String icao24,
                            final String payload,
                            final String parity,
                            final boolean noCRC,
                            final String type,
                            final int capabilities,
                            final String message,
                            final int format_type_code,
                            final int sub_type,
                            final int msg_subtype,
                            final boolean intent_change,
                            final boolean ifr_capability,
                            final int navigation_accuracy_category,
                            final boolean direction_west,
                            final int east_west_velocity,
                            final boolean velocity_info_available,
                            final boolean direction_south,
                            final int north_south_velocity,
                            final boolean vertical_source,
                            final boolean vertical_rate_down,
                            final int vertical_rate,
                            final boolean vertical_rate_info_available,
                            final int geo_minus_baro,
                            final boolean geo_minus_baro_available) {
        super(downlink_format,
                first_field,
                icao24,
                payload,
                parity,
                noCRC,
                type,
                capabilities,
                message,
                format_type_code,
                sub_type);
        this.msg_subtype = msg_subtype;
        this.intent_change = intent_change;
        this.ifr_capability = ifr_capability;
        this.navigation_accuracy_category = navigation_accuracy_category;
        this.direction_west = direction_west;
        this.east_west_velocity = east_west_velocity;
        this.velocity_info_available = velocity_info_available;
        this.direction_south = direction_south;
        this.north_south_velocity = north_south_velocity;
        this.vertical_source = vertical_source;
        this.vertical_rate_down = vertical_rate_down;
        this.vertical_rate = vertical_rate;
        this.vertical_rate_info_available = vertical_rate_info_available;
        this.geo_minus_baro = geo_minus_baro;
        this.geo_minus_baro_available = geo_minus_baro_available;
    }

    public int getMsg_subtype() {
        return msg_subtype;
    }

    public boolean isIntent_change() {
        return intent_change;
    }

    public boolean isIfr_capability() {
        return ifr_capability;
    }

    public int getNavigation_accuracy_category() {
        return navigation_accuracy_category;
    }

    public boolean isDirection_west() {
        return direction_west;
    }

    public void setDirection_west(final boolean direction_west) {
        this.direction_west = direction_west;
    }

    public int getEast_west_velocity() {
        return east_west_velocity;
    }

    public void setEast_west_velocity(final int east_west_velocity) {
        this.east_west_velocity = east_west_velocity;
    }

    public boolean isVelocity_info_available() {
        return velocity_info_available;
    }

    public boolean isDirection_south() {
        return direction_south;
    }

    public void setDirection_south(final boolean direction_south) {
        this.direction_south = direction_south;
    }

    public int getNorth_south_velocity() {
        return north_south_velocity;
    }

    public void setNorth_south_velocity(final int north_south_velocity) {
        this.north_south_velocity = north_south_velocity;
    }

    public boolean isVertical_source() {
        return vertical_source;
    }

    public boolean isVertical_rate_down() {
        return vertical_rate_down;
    }

    public int getVertical_rate() {
        return vertical_rate;
    }

    public boolean isVertical_rate_info_available() {
        return vertical_rate_info_available;
    }

    public int getGeo_minus_baro() {
        return geo_minus_baro;
    }

    public boolean isGeo_minus_baro_available() {
        return geo_minus_baro_available;
    }

    public AdsbVelocityData copy() {
        return new AdsbVelocityData(
                getDownlink_format(),
                getFirst_field(),
                getIcao24(),
                getPayload(),
                getParity(),
                isNoCRC(),
                getType(),
                getCapabilities(),
                getMessage(),
                getFormat_type_code(),
                getSub_type(),
                msg_subtype,
                intent_change,
                ifr_capability,
                navigation_accuracy_category,
                direction_west,
                east_west_velocity,
                velocity_info_available,
                direction_south,
                north_south_velocity,
                vertical_source,
                vertical_rate_down,
                vertical_rate,
                vertical_rate_info_available,
                geo_minus_baro,
                geo_minus_baro_available);
    }
}