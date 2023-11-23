package fdit.alteration.core.basestation.engine;

import com.google.gson.JsonObject;
import fdit.alteration.core.basestation.BstHelper;
import fdit.alteration.core.basestation.message.BaseStationMessageFull;
import fdit.alteration.core.engine.AircraftTrajectory;
import fdit.alteration.core.engine.SuperAction;
import fdit.alteration.core.incident.Action;
import fdit.alteration.core.logging.ActionLogger;
import org.junit.Test;
import org.powermock.reflect.Whitebox;

import java.io.File;

import static com.google.common.collect.Iterables.get;
import static com.google.common.io.Files.write;
import static fdit.alteration.core.basestation.BstHelper.*;
import static fdit.alteration.core.engine.EngineParametersHelper.engineParameters;
import static fdit.alteration.core.engine.EngineParametersHelper.label;
import static fdit.alteration.core.engine.SuperActionHelper.superAction;
import static fdit.alteration.core.incident.IncidentHelper.*;
import static fdit.alteration.core.incident.Parameter.*;
import static java.io.File.createTempFile;
import static java.nio.charset.StandardCharsets.UTF_8;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.powermock.reflect.Whitebox.invokeMethod;

public class BaseStationAlterationEngineTest {

    @Test
    public void applyAction_BstMessageFull_altitude_noOffset() throws Exception {
        final long startDate = 1555694985000L;
        final BaseStationAlterationEngine engine = new BaseStationAlterationEngine(
                recording(new File(""), startDate),
                superAction(alteration(
                        timeWindow(10000, 20000),
                        parameters(bstTarget("4B1613"),
                                parameter(CHARAC_ALTITUDE, "12000")))),
                new ActionLogger(),
                engineParameters(label(false)));
        final BaseStationMessageFull message = bstMessageFull(
                "4B1613",
                startDate + 15000,
                callsign("BAW256"),
                altitude(20350),
                groundSpeed(442.2),
                track(358.1),
                latitude(49.6684),
                longitude(8.4823),
                verticalRate(0),
                squawk(4022),
                alert(false),
                emergency(false),
                spi(false),
                onGround(false));
        final String result = engine.applyAction(message);
        assertEquals(
                "MSG,0,0,0,4B1613,0,2019/04/19,17:30:00.000,2019/04/19,17:30:00.000,BAW256,12000,442.2,358.1,49.6684,8.4823,0,4022,0,0,0,0",
                result);
    }

    @Test
    public void applyAction_BstMessageFull_latitude_nooffset_upperlimitscope() throws Exception {
        final long startDate = 1555694985000L;
        final BaseStationAlterationEngine engine = new BaseStationAlterationEngine(
                recording(new File(""), startDate),
                superAction(alteration(
                        timeWindow(0, 200),
                        parameters(bstTarget("4B1613"),
                                parameter(CHARAC_LATITUDE, "1.1")))),
                new ActionLogger(),
                engineParameters(label(false)));
        final BaseStationMessageFull message = bstMessageFull(
                "4B1613",
                startDate + 200,
                callsign("BAW256"),
                altitude(20350),
                groundSpeed(442.2),
                track(358.1),
                latitude(49.6684),
                longitude(8.4823),
                verticalRate(0),
                squawk(4022),
                alert(false),
                emergency(false),
                spi(false),
                onGround(false));
        final String result = engine.applyAction(message);
        assertEquals(
                "MSG,0,0,0,4B1613,0,2019/04/19,17:29:45.200,2019/04/19,17:29:45.200,BAW256,20350,442.2,358.1,1.1,8.4823,0,4022,0,0,0,0",
                result);
    }

    @Test
    public void applyAction_BstMessageFull_latitude_nooffset_upperlimitscope_with_extrafield() throws Exception {
        final long startDate = 1555694985000L;
        final BaseStationAlterationEngine engine = new BaseStationAlterationEngine(
                recording(new File(""), startDate),
                superAction(alteration(
                        timeWindow(0, 200),
                        parameters(bstTarget("4B1613"),
                                parameter(CHARAC_LATITUDE, "1.1")))),
                new ActionLogger(),
                engineParameters(label(false)));
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("baroaltitude", "-45.72");
        jsonObject.addProperty("last_position", "1672575670.76");
        jsonObject.addProperty("lastcontact", "1672575670.797");
        jsonObject.addProperty("hour", "1672574400");
        final BaseStationMessageFull message = bstMessageFull(
                "4B1613",
                startDate + 200,
                callsign("BAW256"),
                altitude(20350),
                groundSpeed(442.2),
                track(358.1),
                latitude(49.6684),
                longitude(8.4823),
                verticalRate(0),
                squawk(4022),
                alert(false),
                emergency(false),
                spi(false),
                onGround(false),
                extraField(jsonObject));
        final String result = engine.applyAction(message);
        assertEquals(
                "MSG,0,0,0,4B1613,0,2019/04/19,17:29:45.200,2019/04/19,17:29:45.200,BAW256,20350,442.2,358.1,1.1,8.4823,0,4022,0,0,0,0,{\"baroaltitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}",
                result);
    }

    @Test
    public void applyAction_BstMessageFull_longitude_offset_upperlimitscope() throws Exception {
        final long startDate = 1555694985000L;
        final BaseStationAlterationEngine engine = new BaseStationAlterationEngine(
                recording(new File(""), startDate),
                superAction(alteration(
                        timeWindow(0, 200),
                        parameters(bstTarget("4B1613"),
                                parameter(CHARAC_LONGITUDE, "10.7")))),
                new ActionLogger(),
                engineParameters(label(false)));
        final BaseStationMessageFull message = bstMessageFull(
                "4B1613",
                startDate + 200,
                callsign("BAW256"),
                altitude(20350),
                groundSpeed(442.2),
                track(358.1),
                latitude(49.6684),
                longitude(8.4823),
                verticalRate(0),
                squawk(4022),
                alert(false),
                emergency(false),
                spi(false),
                onGround(false));
        final String result = engine.applyAction(message);
        assertEquals(
                "MSG,0,0,0,4B1613,0,2019/04/19,17:29:45.200,2019/04/19,17:29:45.200,BAW256,20350,442.2,358.1,49.6684,10.7,0,4022,0,0,0,0",
                result);
    }


    @Test
    public void applyAction_BstMessageFull_icao_nooffset_lowerlimitscope() throws Exception {
        final long startDate = 1555694985000L;
        final BaseStationAlterationEngine engine = new BaseStationAlterationEngine(
                recording(new File(""), startDate),
                superAction(alteration(
                        timeWindow(10000, 20000),
                        parameters(bstTarget("4B1613"),
                                parameter(CHARAC_HEX_IDENT, "39AC45")))),
                new ActionLogger(),
                engineParameters(label(false)));
        final BaseStationMessageFull message = bstMessageFull(
                "4B1613",
                startDate + 10000,
                callsign("BAW256"),
                altitude(20350),
                groundSpeed(442.2),
                track(358.1),
                latitude(49.6684),
                longitude(8.4823),
                verticalRate(0),
                squawk(4022),
                alert(false),
                emergency(false),
                spi(false),
                onGround(false));
        final String result = engine.applyAction(message);
        assertEquals(
                "MSG,0,0,0,39AC45,0,2019/04/19,17:29:55.000,2019/04/19,17:29:55.000,BAW256,20350,442.2,358.1,49.6684,8.4823,0,4022,0,0,0,0",
                result);
    }

    @Test
    public void applyAction_BstMessageFull_altitude_nooffset_loweroutofscope() throws Exception {
        final long startDate = 1555694985000L;
        final BaseStationAlterationEngine engine = new BaseStationAlterationEngine(
                recording(new File(""), startDate),
                superAction(alteration(
                        timeWindow(10000, 20000),
                        parameters(bstTarget("4B1613"),
                                parameter(CHARAC_ALTITUDE, "10000")))),
                new ActionLogger(),
                engineParameters(label(false)));
        final BaseStationMessageFull message = bstMessageFull(
                "4B1613",
                startDate + 9000,
                callsign("BAW256"),
                altitude(20350),
                groundSpeed(442.2),
                track(358.1),
                latitude(49.6684),
                longitude(8.4823),
                verticalRate(0),
                squawk(4022),
                alert(false),
                emergency(false),
                spi(false),
                onGround(false));
        final String result = engine.applyAction(message);
        assertEquals(
                "MSG,0,0,0,4B1613,0,2019/04/19,17:29:54.000,2019/04/19,17:29:54.000,BAW256,20350,442.2,358.1,49.6684,8.4823,0,4022,0,0,0,0",
                result);
    }

    @Test
    public void applyAction_BstMessageFull_altitude_nooffset_upperoutofscope() throws Exception {
        final long startDate = 1555694985000L;
        final BaseStationAlterationEngine engine = new BaseStationAlterationEngine(
                recording(new File(""), startDate),
                superAction(alteration(
                        timeWindow(10000, 20000),
                        parameters(bstTarget("4B1613"),
                                parameter(CHARAC_ALTITUDE, "3000")))),
                new ActionLogger(),
                engineParameters(label(false)));
        final BaseStationMessageFull message = bstMessageFull(
                "4B1613",
                startDate + 21000,
                callsign("BAW256"),
                altitude(20350),
                groundSpeed(442.2),
                track(358.1),
                latitude(49.6684),
                longitude(8.4823),
                verticalRate(0),
                squawk(4022),
                alert(false),
                emergency(false),
                spi(false),
                onGround(false));
        final String result = engine.applyAction(message);
        assertEquals(
                "MSG,0,0,0,4B1613,0,2019/04/19,17:30:06.000,2019/04/19,17:30:06.000,BAW256,20350,442.2,358.1,49.6684,8.4823,0,4022,0,0,0,0",
                result);
    }

    @Test
    public void applyAction_BstMessageFull_latlon_nooffset() throws Exception {
        final long startDate = 1555694985000L;
        final BaseStationAlterationEngine engine = new BaseStationAlterationEngine(
                recording(new File(""), startDate),
                superAction(alteration(
                        timeWindow(10000, 20000),
                        parameters(bstTarget("4B1613"),
                                parameter(CHARAC_LATITUDE, "1.1"),
                                parameter(CHARAC_LONGITUDE, "2.2")))),
                new ActionLogger(),
                engineParameters(label(false)));
        final BaseStationMessageFull message = bstMessageFull(
                "4B1613",
                startDate + 15000,
                callsign("BAW256"),
                altitude(20350),
                groundSpeed(442.2),
                track(358.1),
                latitude(49.6684),
                longitude(8.4823),
                verticalRate(0),
                squawk(4022),
                alert(false),
                emergency(false),
                spi(false),
                onGround(false));
        final String result = engine.applyAction(message);
        assertEquals(
                "MSG,0,0,0,4B1613,0,2019/04/19,17:30:00.000,2019/04/19,17:30:00.000,BAW256,20350,442.2,358.1,1.1,2.2,0,4022,0,0,0,0",
                result);
    }

    @Test
    public void applyAction_BstMessageFull_false_alert_upperlimitscope() throws Exception {
        final long startDate = 1555694985000L;
        final BaseStationAlterationEngine engine = new BaseStationAlterationEngine(
                recording(new File(""), startDate),
                superAction(alteration(
                        timeWindow(10, 20),
                        parameters(bstTarget("4B1613"),
                                parameter(CHARAC_SQUAWK, "7700"),
                                parameter(CHARAC_EMERGENCY, "true"),
                                parameter(CHARAC_ALERT, "true")))),
                new ActionLogger(),
                engineParameters(label(false)));
        final BaseStationMessageFull message = bstMessageFull(
                "4B1613",
                startDate + 20,
                callsign("BAW256"),
                altitude(20350),
                groundSpeed(442.2),
                track(358.1),
                latitude(49.6684),
                longitude(8.4823),
                verticalRate(0),
                squawk(4022),
                alert(false),
                emergency(false),
                spi(false),
                onGround(false));
        final String result = engine.applyAction(message);
        assertEquals(
                "MSG,0,0,0,4B1613,0,2019/04/19,17:29:45.020,2019/04/19,17:29:45.020,BAW256,20350,442.2,358.1,49.6684,8.4823,0,7700,1,1,0,0",
                result);
    }

    @Test
    public void applyAction_BstMessageFull_latlon_nooffset_loweroutofscope() throws Exception {
        final long startDate = 1555694985000L;
        final BaseStationAlterationEngine engine = new BaseStationAlterationEngine(
                recording(new File(""), startDate),
                superAction(alteration(
                        timeWindow(10000, 20000),
                        parameters(bstTarget("4B1613"),
                                parameter(CHARAC_LATITUDE, "1.1"),
                                parameter(CHARAC_LONGITUDE, "2.2")))),
                new ActionLogger(),
                engineParameters(label(false)));
        final BaseStationMessageFull message = bstMessageFull(
                "4B1613",
                startDate + 9999,
                callsign("BAW256"),
                altitude(20350),
                groundSpeed(442.2),
                track(358.1),
                latitude(49.6684),
                longitude(8.4823),
                verticalRate(0),
                squawk(4022),
                alert(false),
                emergency(false),
                spi(false),
                onGround(false));
        String result = engine.applyAction(message);
        assertEquals(
                "MSG,0,0,0,4B1613,0,2019/04/19,17:29:54.999,2019/04/19,17:29:54.999,BAW256,20350,442.2,358.1,49.6684,8.4823,0,4022,0,0,0,0",
                result);
    }

    @Test
    public void applyAction_BstMessageFull_latlon_nooffset_upperoutofscope() throws Exception {
        final long startDate = 1555694985000L;
        final BaseStationAlterationEngine engine = new BaseStationAlterationEngine(
                recording(new File(""), startDate),
                superAction(alteration(
                        timeWindow(10000, 20000),
                        parameters(bstTarget("4B1613"),
                                parameter(CHARAC_LATITUDE, "1.1"),
                                parameter(CHARAC_LONGITUDE, "2.2")))),
                new ActionLogger(),
                engineParameters(label(false)));
        final BaseStationMessageFull message = bstMessageFull(
                "4B1613",
                startDate + 20001,
                callsign("BAW256"),
                altitude(20350),
                groundSpeed(442.2),
                track(358.1),
                latitude(49.6684),
                longitude(8.4823),
                verticalRate(0),
                squawk(4022),
                alert(false),
                emergency(false),
                spi(false),
                onGround(false));
        final String result = engine.applyAction(message);
        assertEquals(
                "MSG,0,0,0,4B1613,0,2019/04/19,17:30:05.001,2019/04/19,17:30:05.001,BAW256,20350,442.2,358.1,49.6684,8.4823,0,4022,0,0,0,0",
                result);
    }

    @Test
    public void applyAction_AdsbIdentificationMessage_callsign_lowerlimitscope() throws Exception {
        final long startDate = 1555694985000L;
        final BaseStationAlterationEngine engine = new BaseStationAlterationEngine(
                recording(new File(""), startDate),
                superAction(alteration(
                        timeWindow(30, 40),
                        parameters(bstTarget("4B1613"),
                                parameter(CHARAC_CALLSIGN, "SAMU25")))),
                new ActionLogger(),
                engineParameters(label(false)));
        final BaseStationMessageFull message = bstMessageFull(
                "4B1613",
                startDate + 30,
                callsign("BAW256"),
                altitude(20350),
                groundSpeed(442.2),
                track(358.1),
                latitude(49.6684),
                longitude(8.4823),
                verticalRate(0),
                squawk(4022),
                alert(false),
                emergency(false),
                spi(false),
                onGround(false));
        final String result = engine.applyAction(message);
        assertEquals(
                "MSG,0,0,0,4B1613,0,2019/04/19,17:29:45.030,2019/04/19,17:29:45.030,SAMU25,20350,442.2,358.1,49.6684,8.4823,0,4022,0,0,0,0",
                result);
    }

    @Test
    public void applyAction_BstMessageFull_groundSpeed_offset() throws Exception {
        final long startDate = 1555694985000L;
        final BaseStationAlterationEngine engine = new BaseStationAlterationEngine(
                recording(new File(""), startDate),
                superAction(alteration(
                        timeWindow(30, 40),
                        parameters(bstTarget("4B1613"),
                                parameter(CHARAC_GROUNDSPEED, "50.4", MODE_OFFSET)))),
                new ActionLogger(),
                engineParameters(label(false)));
        final BaseStationMessageFull message = bstMessageFull(
                "4B1613",
                startDate + 35,
                callsign("BAW256"),
                altitude(20350),
                groundSpeed(442.2),
                track(358.1),
                latitude(49.6684),
                longitude(8.4823),
                verticalRate(0),
                squawk(4022),
                alert(false),
                emergency(false),
                spi(false),
                onGround(false));
        final String result = engine.applyAction(message);
        assertEquals(
                "MSG,0,0,0,4B1613,0,2019/04/19,17:29:45.035,2019/04/19,17:29:45.035,BAW256,20350,492.6,358.1,49.6684,8.4823,0,4022,0,0,0,0",
                result);
    }

    @Test
    public void applyActionEngineWithLabelsNoAlteration() throws Exception {
        final long startDate = 1555694985000L;
        final BaseStationAlterationEngine engine = new BaseStationAlterationEngine(
                recording(new File(""), startDate),
                superAction(alteration(
                        timeWindow(30, 40),
                        parameters(bstTarget("4B1613"),
                                parameter(CHARAC_GROUNDSPEED, "50.4", MODE_OFFSET)))),
                new ActionLogger(),
                engineParameters(label(true)));
        final BaseStationMessageFull message = bstMessageFull(
                "4B1613",
                startDate + 41,
                callsign("BAW256"),
                altitude(20350),
                groundSpeed(442.2),
                track(358.1),
                latitude(49.6684),
                longitude(8.4823),
                verticalRate(0),
                squawk(4022),
                alert(false),
                emergency(false),
                spi(false),
                onGround(false));
        final String result = engine.applyAction(message);
        assertEquals(
                "MSG,0,0,0,4B1613,0,2019/04/19,17:29:45.041,2019/04/19,17:29:45.041,BAW256,20350,442.2,358.1,49.6684,8.4823,0,4022,0,0,0,0,0,0",
                result);
    }

    @Test
    public void applyActionEngineWithLabelsGroundSpeed() throws Exception {
        final long startDate = 1555694985000L;
        final BaseStationAlterationEngine engine = new BaseStationAlterationEngine(
                recording(new File(""), startDate),
                superAction(alteration(
                        timeWindow(30, 40),
                        parameters(bstTarget("4B1613"),
                                parameter(CHARAC_GROUNDSPEED, "50.4", MODE_OFFSET)))),
                new ActionLogger(),
                engineParameters(label(true)));
        final BaseStationMessageFull message = bstMessageFull(
                "4B1613",
                startDate + 35,
                callsign("BAW256"),
                altitude(20350),
                groundSpeed(442.2),
                track(358.1),
                latitude(49.6684),
                longitude(8.4823),
                verticalRate(0),
                squawk(4022),
                alert(false),
                emergency(false),
                spi(false),
                onGround(false));
        final String result = engine.applyAction(message);
        assertEquals(
                "MSG,0,0,0,4B1613,0,2019/04/19,17:29:45.035,2019/04/19,17:29:45.035,BAW256,20350,492.6,358.1,49.6684,8.4823,0,4022,0,0,0,0,1,512",
                result);
    }

    @Test
    public void applyActionEngineWithLabelsGroundSpeedWithExtraField() throws Exception {
        final long startDate = 1555694985000L;
        final BaseStationAlterationEngine engine = new BaseStationAlterationEngine(
                recording(new File(""), startDate),
                superAction(alteration(
                        timeWindow(30, 40),
                        parameters(bstTarget("4B1613"),
                                parameter(CHARAC_GROUNDSPEED, "50.4", MODE_OFFSET)))),
                new ActionLogger(),
                engineParameters(label(true)));
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("baroaltitude", "-45.72");
        jsonObject.addProperty("last_position", "1672575670.76");
        jsonObject.addProperty("lastcontact", "1672575670.797");
        jsonObject.addProperty("hour", "1672574400");
        final BaseStationMessageFull message = bstMessageFull(
                "4B1613",
                startDate + 35,
                callsign("BAW256"),
                altitude(20350),
                groundSpeed(442.2),
                track(358.1),
                latitude(49.6684),
                longitude(8.4823),
                verticalRate(0),
                squawk(4022),
                alert(false),
                emergency(false),
                spi(false),
                onGround(false),
                extraField(jsonObject));
        final String result = engine.applyAction(message);
        assertEquals(
                "MSG,0,0,0,4B1613,0,2019/04/19,17:29:45.035,2019/04/19,17:29:45.035,BAW256,20350,492.6,358.1,49.6684,8.4823,0,4022,0,0,0,0,1,512,{\"baroaltitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}",
                result);
    }

    @Test
    public void applyActionEngineWithWithExtraField() throws Exception {
        final File recordingFile = createTempFile("initial", ".sbs");
        write("MSG,0,30,1105,300065,3839,2018/02/28,16:04:30.987,2018/02/28,16:04:31.888,,,414.1,333.0,,,64,,,,,,{\"baroaltitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:31.987,2018/02/28,16:04:32.888,,36025,,,47.33528,4.16787,,,0,0,0,0,{\"baroaltitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:32.391,2018/02/28,16:04:33.888,,36025,,,47.33606,4.16732,,,0,0,0,0,{\"baroaltitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:32.590,2018/02/28,16:04:34.888,,,415.0,333.1,,,0,,,,,,{\"baroaltitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:33.801,2018/02/28,16:04:35.888,,36025,,,47.33678,4.16678,,,0,0,0,0,{\"baroaltitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:33.998,2018/02/28,16:04:36.894,,,415.0,333.1,,,0,,,,,,{\"baroaltitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:34.404,2018/02/28,16:04:37.894,,36025,,,47.33752,4.16622,,,0,0,0,0,{\"baroaltitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:34.607,2018/02/28,16:04:38.894,,,415.0,333.1,,,0,,,,,,{\"baroaltitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:35.608,2018/02/28,16:04:39.894,,36025,,,47.33821,4.16567,,,0,0,0,0,{\"baroaltitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:36.017,2018/02/28,16:04:40.889,,,415.0,333.1,,,0,,,,,,{\"baroaltitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:36.217,2018/02/28,16:04:41.889,,36025,,,47.33926,4.16492,,,0,0,0,0,{\"baroaltitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}",
                recordingFile,
                UTF_8);

        final long startDate = 1519833870987L;
        final BaseStationAlterationEngine engine = new BaseStationAlterationEngine(
                recording(recordingFile, startDate),
                superAction(alteration(
                        timeWindow(0, 40),
                        parameters(bstTarget("4B1613"),
                                parameter(CHARAC_CALLSIGN, "SAMU25", MODE_SIMPLE)))),
                new ActionLogger(),
                engineParameters(label(false)));
        System.out.println(engine);
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("baroaltitude", "-45.72");
        jsonObject.addProperty("last_position", "1672575670.76");
        jsonObject.addProperty("lastcontact", "1672575670.797");
        jsonObject.addProperty("hour", "1672574400");
        final BaseStationMessageFull message = bstMessageFull(
                "300065",
                startDate + 4000,
                callsign("SAMU25"),
                altitude(36025),
                BstHelper.groundSpeed(442.2),
                BstHelper.track(333.1),
                latitude(47.33821),
                longitude(4.16492),
                verticalRate(0),
                squawk(4022),
                alert(false),
                emergency(false),
                spi(false),
                onGround(false),
                extraField(jsonObject));
        final String result = invokeMethod(engine, "applyAction", message);
        assertEquals(
                "MSG,0,0,0,300065,0,2018/02/28,16:04:34.987,2018/02/28,16:04:34.987,SAMU25,36025,442.2,333.1,47.33821,4.16492,0,4022,0,0,0,0,{\"baroaltitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}",
                result);


    }
}