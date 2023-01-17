package fdit.alteration.core.beast.data;

public class AdsbData extends BeastData {

    protected int capabilities;
    protected String message;
    protected int format_type_code;
    protected int sub_type;

    public AdsbData(final int downlink_format,
                    final int first_field,
                    final String icao24,
                    final String payload,
                    final String parity,
                    final boolean noCRC,
                    final String type,
                    final int capabilities,
                    final String message,
                    final int format_type_code,
                    final int sub_type) {
        super(downlink_format, first_field, icao24, payload, parity, noCRC, type);
        this.capabilities = capabilities;
        this.message = message;
        this.format_type_code = format_type_code;
        this.sub_type = sub_type;
    }

    public int getCapabilities() {
        return capabilities;
    }

    public String getMessage() {
        return message;
    }

    public int getFormat_type_code() {
        return format_type_code;
    }

    public int getSub_type() {
        return sub_type;
    }
}