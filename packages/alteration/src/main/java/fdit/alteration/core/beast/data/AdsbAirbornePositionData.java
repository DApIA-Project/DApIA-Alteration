package fdit.alteration.core.beast.data;

public class AdsbAirbornePositionData extends AdsbData {

    private boolean horizontal_position_available;
    private boolean altitude_available;
    private int surveillance_status;
    private boolean nic_suppl_b;
    private int altitude_encoded;
    private boolean time_flag;
    private boolean cpr_format;
    private int cpr_encoded_lat;
    private int cpr_encoded_lon;
    private boolean nic_suppl_a;

    public AdsbAirbornePositionData(final int downlink_format,
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
                                    final boolean horizontal_position_available,
                                    final boolean altitude_available,
                                    final int surveillance_status,
                                    final boolean nic_suppl_b,
                                    final int altitude_encoded,
                                    final boolean time_flag,
                                    final boolean cpr_format,
                                    final int cpr_encoded_lat,
                                    final int cpr_encoded_lon,
                                    final boolean nic_suppl_a) {
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
        this.horizontal_position_available = horizontal_position_available;
        this.altitude_available = altitude_available;
        this.surveillance_status = surveillance_status;
        this.nic_suppl_b = nic_suppl_b;
        this.altitude_encoded = altitude_encoded;
        this.time_flag = time_flag;
        this.cpr_format = cpr_format;
        this.cpr_encoded_lat = cpr_encoded_lat;
        this.cpr_encoded_lon = cpr_encoded_lon;
        this.nic_suppl_a = nic_suppl_a;
    }

    public boolean isHorizontal_position_available() {
        return horizontal_position_available;
    }

    public void setHorizontal_position_available(boolean horizontal_position_available) {
        this.horizontal_position_available = horizontal_position_available;
    }

    public boolean isAltitude_available() {
        return altitude_available;
    }

    public void setAltitude_available(boolean altitude_available) {
        this.altitude_available = altitude_available;
    }

    public int getSurveillance_status() {
        return surveillance_status;
    }

    public void setSurveillance_status(int surveillance_status) {
        this.surveillance_status = surveillance_status;
    }

    public boolean isNic_suppl_b() {
        return nic_suppl_b;
    }

    public void setNic_suppl_b(boolean nic_suppl_b) {
        this.nic_suppl_b = nic_suppl_b;
    }

    public int getAltitude_encoded() {
        return altitude_encoded;
    }

    public void setAltitude_encoded(int altitude_encoded) {
        this.altitude_encoded = altitude_encoded;
    }

    public boolean isTime_flag() {
        return time_flag;
    }

    public void setTime_flag(boolean time_flag) {
        this.time_flag = time_flag;
    }

    public boolean isCpr_format() {
        return cpr_format;
    }

    public void setCpr_format(boolean cpr_format) {
        this.cpr_format = cpr_format;
    }

    public int getCpr_encoded_lat() {
        return cpr_encoded_lat;
    }

    public void setCpr_encoded_lat(int cpr_encoded_lat) {
        this.cpr_encoded_lat = cpr_encoded_lat;
    }

    public int getCpr_encoded_lon() {
        return cpr_encoded_lon;
    }

    public void setCpr_encoded_lon(int cpr_encoded_lon) {
        this.cpr_encoded_lon = cpr_encoded_lon;
    }

    public boolean isNic_suppl_a() {
        return nic_suppl_a;
    }

    public void setNic_suppl_a(boolean nic_suppl_a) {
        this.nic_suppl_a = nic_suppl_a;
    }

    public AdsbAirbornePositionData copy() {
        return new AdsbAirbornePositionData(
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
                horizontal_position_available,
                altitude_available,
                surveillance_status,
                nic_suppl_b,
                altitude_encoded,
                time_flag,
                cpr_format,
                cpr_encoded_lat,
                cpr_encoded_lon,
                nic_suppl_a);
    }
}