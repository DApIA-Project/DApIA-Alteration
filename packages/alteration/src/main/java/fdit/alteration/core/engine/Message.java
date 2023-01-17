package fdit.alteration.core.engine;

public interface Message {

    String getIcao();

    Integer getMask();

    void setIcao(final String icao);

    void setMask(final int mask);

    Message copy();
}