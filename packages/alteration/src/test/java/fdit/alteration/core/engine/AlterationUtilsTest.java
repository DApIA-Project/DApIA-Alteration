package fdit.alteration.core.engine;

import org.junit.Test;

import static com.google.common.collect.Lists.newArrayList;
import static fdit.alteration.core.engine.AlterationUtils.computeCharacteristicMask;
import static fdit.alteration.core.engine.AlterationUtils.renderBooleanToFlag;
import static fdit.alteration.core.incident.Parameter.*;
import static org.junit.Assert.assertEquals;

public class AlterationUtilsTest {

    /* ICAO
    CALLSIGN
    SQUAWK
    ALTITUDE
    GROUNDSPEED
    TRACK
    LATITUDE
    LONGITUDE
    VERTICALRATE
    ALERT
    TIMESTAMP
    EMERGENCY
    SPI
    ISONGROUND */

    @Test
    public void renderBooleanToFlagOK() {
        assertEquals("1", renderBooleanToFlag(true));
        assertEquals("0", renderBooleanToFlag(false));
    }

    @Test
    public void computeCharacteristicMaskOK() {
        assertEquals(8192, computeCharacteristicMask(newArrayList(CHARAC_ICAO)));
        assertEquals(8192, computeCharacteristicMask(newArrayList(CHARAC_HEX_IDENT)));
        assertEquals(8192, computeCharacteristicMask(newArrayList(CHARAC_ICAO, CHARAC_HEX_IDENT)));
        assertEquals(4096, computeCharacteristicMask(newArrayList(CHARAC_CALLSIGN)));
        assertEquals(2048, computeCharacteristicMask(newArrayList(CHARAC_SQUAWK)));
        assertEquals(1024, computeCharacteristicMask(newArrayList(CHARAC_ALTITUDE)));
        assertEquals(512, computeCharacteristicMask(newArrayList(CHARAC_GROUNDSPEED)));
        assertEquals(256, computeCharacteristicMask(newArrayList(CHARAC_TRACK)));
        assertEquals(128, computeCharacteristicMask(newArrayList(CHARAC_LATITUDE)));
        assertEquals(64, computeCharacteristicMask(newArrayList(CHARAC_LONGITUDE)));
        assertEquals(32, computeCharacteristicMask(newArrayList(CHARAC_VERTICALRATE)));
        assertEquals(16, computeCharacteristicMask(newArrayList(CHARAC_ALERT)));
        assertEquals(8, computeCharacteristicMask(newArrayList(CHARAC_TIMESTAMP)));
        assertEquals(4, computeCharacteristicMask(newArrayList(CHARAC_EMERGENCY)));
        assertEquals(2, computeCharacteristicMask(newArrayList(CHARAC_SPI)));
        assertEquals(1, computeCharacteristicMask(newArrayList(CHARAC_ISONGROUND)));
        assertEquals(10496, computeCharacteristicMask(newArrayList(CHARAC_ICAO, CHARAC_SQUAWK, CHARAC_TRACK)));
        assertEquals(224, computeCharacteristicMask(newArrayList(CHARAC_VERTICALRATE, CHARAC_LATITUDE, CHARAC_LONGITUDE)));
        assertEquals(192, computeCharacteristicMask(newArrayList(CHARAC_LATITUDE, CHARAC_LONGITUDE)));
        assertEquals(1024, computeCharacteristicMask(newArrayList(CHARAC_ALTITUDE)));
        assertEquals(23, computeCharacteristicMask(newArrayList(CHARAC_ALERT, CHARAC_EMERGENCY, CHARAC_SPI, CHARAC_ISONGROUND)));
    }
}