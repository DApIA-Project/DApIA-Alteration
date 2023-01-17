package fdit.alteration.core.beast.data;

// can't be abstract because of gson lib -> or look to use Google Injector
// (make it abstract and parse a Beast JSON file to see what happened)
public class BeastData {

    private int downlink_format;
    private int first_field;
    private String icao24;
    private String payload;
    private String parity;
    private boolean noCRC;
    private String type;

    public BeastData(final int downlink_format,
                     final int first_field,
                     final String icao24,
                     final String payload,
                     final String parity,
                     final boolean noCRC,
                     final String type) {
        this.downlink_format = downlink_format;
        this.first_field = first_field;
        this.icao24 = icao24;
        this.payload = payload;
        this.parity = parity;
        this.noCRC = noCRC;
        this.type = type;
    }

    public int getDownlink_format() {
        return downlink_format;
    }

    public void setDownlink_format(int downlink_format) {
        this.downlink_format = downlink_format;
    }

    public int getFirst_field() {
        return first_field;
    }

    public void setFirst_field(int first_field) {
        this.first_field = first_field;
    }

    public String getIcao24() {
        return icao24;
    }

    public void setIcao24(String icao24) {
        this.icao24 = icao24;
    }

    public String getPayload() {
        return payload;
    }

    public void setPayload(String payload) {
        this.payload = payload;
    }

    public String getParity() {
        return parity;
    }

    public void setParity(String parity) {
        this.parity = parity;
    }

    public boolean isNoCRC() {
        return noCRC;
    }

    public void setNoCRC(boolean noCRC) {
        this.noCRC = noCRC;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}