package fdit.alteration.core.beast.data;

public class AdsbStatusData extends AdsbData {

    private int subtype_code;
    private int capability_class_code;
    private int operational_mode_code;
    private int airplane_len_width;
    private int version;
    private boolean nic_suppl;
    private int nac_pos;
    private int geometric_vertical_accuracy;
    private int surveillance_integrity_level;
    private boolean nic_track_heading;
    private boolean hrd;

    public AdsbStatusData(final int downlink_format,
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
                          final int subtype_code,
                          final int capability_class_code,
                          final int operational_mode_code,
                          final int airplane_len_width,
                          final int version,
                          final boolean nic_suppl,
                          final int nac_pos,
                          final int geometric_vertical_accuracy,
                          final int surveillance_integrity_level,
                          final boolean nic_track_heading,
                          final boolean hrd) {
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
        this.subtype_code = subtype_code;
        this.capability_class_code = capability_class_code;
        this.operational_mode_code = operational_mode_code;
        this.airplane_len_width = airplane_len_width;
        this.version = version;
        this.nic_suppl = nic_suppl;
        this.nac_pos = nac_pos;
        this.geometric_vertical_accuracy = geometric_vertical_accuracy;
        this.surveillance_integrity_level = surveillance_integrity_level;
        this.nic_track_heading = nic_track_heading;
        this.hrd = hrd;
    }

    public int getSubtype_code() {
        return subtype_code;
    }

    public int getCapability_class_code() {
        return capability_class_code;
    }

    public int getOperational_mode_code() {
        return operational_mode_code;
    }

    public int getAirplane_len_width() {
        return airplane_len_width;
    }

    public int getVersion() {
        return version;
    }

    public boolean isNic_suppl() {
        return nic_suppl;
    }

    public int getNac_pos() {
        return nac_pos;
    }

    public int getGeometric_vertical_accuracy() {
        return geometric_vertical_accuracy;
    }

    public int getSurveillance_integrity_level() {
        return surveillance_integrity_level;
    }

    public boolean isNic_track_heading() {
        return nic_track_heading;
    }

    public boolean isHrd() {
        return hrd;
    }

    public AdsbStatusData copy() {
        return new AdsbStatusData(
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
                subtype_code,
                capability_class_code,
                operational_mode_code,
                airplane_len_width,
                version,
                nic_suppl,
                nac_pos,
                geometric_vertical_accuracy,
                surveillance_integrity_level,
                nic_track_heading,
                hrd);
    }
}