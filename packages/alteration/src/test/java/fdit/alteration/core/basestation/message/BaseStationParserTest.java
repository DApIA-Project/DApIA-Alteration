package fdit.alteration.core.basestation.message;

import fdit.alteration.core.engine.Message;
import org.junit.Test;

import java.text.ParseException;
import java.util.Optional;

import static fdit.alteration.core.basestation.BaseStationParser.createBstMessage;
import static fdit.alteration.core.basestation.BaseStationParser.strDateToTimestamp;
import static fdit.alteration.core.basestation.BstHelper.*;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static fdit.testTools.PredicateAssert.assertThat;

public class BaseStationParserTest {

    @Test
    public void createBstMessage_ignoreMalformedMessage() {
        final Optional<Message> message = createBstMessage("MSG,0,3,10610299_MISSING_ICAO_10610299,2019/04/19,17:30:00.140,2019/04/19,17:30:00.140,,16625.0,,,50.4073,8.2464,,,0,0,0,0");
        assertFalse(message.isPresent());
    }


    @Test
    public void createBstMessage_MsgFull() throws ParseException {
        final Optional<Message> message = createBstMessage("MSG,0,3,10610299,A1E67B,10610299,2019/04/19,17:30:00.140,2019/04/19,17:30:00.140,,16625.0,,,50.4073,8.2464,,,0,0,0,0");
        assertTrue(message.isPresent());
        assertThat(
                message.get(),
                aBstMessageFull(
                        withIcao("A1E67B"),
                        withDate(strDateToTimestamp("2019/04/19,17:30:00.140")),// 2019/04/19,17:30:00.140
                        withAltitude(16625),
                        withLatitude(50.4073),
                        withLongitude(8.2464),
                        withAlert(false),
                        withEmergency(false),
                        withSpi(false),
                        withOnGround(false)));
    }
}