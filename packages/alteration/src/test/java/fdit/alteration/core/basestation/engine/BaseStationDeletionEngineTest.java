package fdit.alteration.core.basestation.engine;

import com.google.common.io.Files;
import fdit.alteration.core.basestation.message.BaseStationMessageFull;
import fdit.alteration.core.engine.EngineManager;
import fdit.alteration.core.incident.Recording;
import fdit.alteration.core.logging.ActionLogger;
import org.junit.Test;

import java.io.File;

import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.io.Files.write;
import static fdit.alteration.core.basestation.BstHelper.*;
import static fdit.alteration.core.engine.EngineParametersHelper.engineParameters;
import static fdit.alteration.core.engine.EngineParametersHelper.label;
import static fdit.alteration.core.engine.SuperActionHelper.superAction;
import static fdit.alteration.core.incident.IncidentHelper.*;
import static java.nio.charset.StandardCharsets.UTF_8;
import static org.junit.Assert.assertEquals;
import static org.powermock.reflect.Whitebox.invokeMethod;

public class BaseStationDeletionEngineTest {

    @Test
    public void deletionFrequency0() throws Exception {
        final File recording = File.createTempFile("recording", ".bst");
        write("MSG,0,3,4216373,405635,4216373,2019/04/19,17:30:00.052,2019/04/19,17:30:00.052,,38000,,,51.2078,7.0869,,,0,0,0,0\n" +
                        "MSG,0,3,4196341,4007F5,4196341,2019/04/19,17:30:00.102,2019/04/19,17:30:00.102,,38000,,,47.7235,7.6864,,,0,0,0,0\n" +
                        "MSG,0,3,4197737,400D69,4197737,2019/04/19,17:30:00.120,2019/04/19,17:30:00.120,,38000,,,49.3943,2.8343,,,0,0,0,0\n" +
                        "MSG,0,3,10610299,A1E67B,10610299,2019/04/19,17:30:00.140,2019/04/19,17:30:00.140,,16625,,,50.4073,8.2464,,,0,0,0,0\n" +
                        "MSG,0,3,3146937,3004B9,3146937,2019/04/19,17:30:00.159,2019/04/19,17:30:00.159,,28575,,,48.8645,4.2382,,,0,0,0,0\n" +
                        "MSG,0,3,3958500,3C66E4,3958500,2019/04/19,17:30:00.160,2019/04/19,17:30:00.160,,21750,,,50.3645,6.473,,,0,0,0,0\n" +
                        "MSG,0,3,5022243,4CA223,5022243,2019/04/19,17:30:00.163,2019/04/19,17:30:00.163,,37000,,,49.8471,7.7982,,,0,0,0,0\n" +
                        "MSG,0,3,4457005,44022D,4457005,2019/04/19,17:30:00.164,2019/04/19,17:30:00.164,,,429.25,105.82,,,0.0,,,,,\n" +
                        "MSG,0,3,4196526,4008AE,4196526,2019/04/19,17:30:00.178,2019/04/19,17:30:00.178,,20350,,,49.3423,7.6086,,,0,0,0,0\n" +
                        "MSG,0,3,5046545,4D0111,5046545,2019/04/19,17:30:00.215,2019/04/19,17:30:00.215,,0.0,,59.06,49.6179,6.1884,,,0,0,0,1\n" +
                        "MSG,0,3,3958149,3C6585,3958149,2019/04/19,17:30:00.216,2019/04/19,17:30:00.216,,29900,,,48.85,8.6014,,,0,0,0,0\n" +
                        "MSG,0,3,4196526,4008AE,4196526,2019/04/19,17:30:00.225,2019/04/19,17:30:00.225,,,343.59,118.13,,,-7.48,,,,,\n" +
                        "MSG,0,3,4224849,407751,4224849,2019/04/19,17:30:00.225,2019/04/19,17:30:00.225,,35000,,,49.4512,7.2606,,,0,0,0,0\n" +
                        "MSG,0,3,4921884,4B1A1C,4921884,2019/04/19,17:30:00.239,2019/04/19,17:30:00.239,,37000,,,49.6684,8.4823,,,0,0,0,0",
                recording, UTF_8);
        final EngineManager engineManager = new EngineManager(
                new Recording(recording, 1555695000052L),
                newArrayList(deletion(timeWindow(0, 100000), parameters(bstTarget("ALL"), deletionParameter(0)))),
                new ActionLogger());
        final String resultRecording = Files.toString(engineManager.run(), UTF_8);
        assertEquals("", resultRecording.trim());
    }

    @Test
    public void deletionFrequency3() throws Exception {
        final File recording = File.createTempFile("recording", ".bst");
        write("MSG,0,3,4216373,405635,4216373,2019/04/19,17:30:00.052,2019/04/19,17:30:00.052,,38000,,,51.2078,7.0869,,,0,0,0,0\n" +
                        "MSG,0,3,4196341,4007F5,4196341,2019/04/19,17:30:00.102,2019/04/19,17:30:00.102,,38000,,,47.7235,7.6864,,,0,0,0,0\n" +
                        "MSG,0,3,4197737,400D69,4197737,2019/04/19,17:30:00.120,2019/04/19,17:30:00.120,,38000,,,49.3943,2.8343,,,0,0,0,0\n" +
                        "MSG,0,3,10610299,A1E67B,10610299,2019/04/19,17:30:00.140,2019/04/19,17:30:00.140,,16625,,,50.4073,8.2464,,,0,0,0,0\n" +
                        "MSG,0,3,3146937,3004B9,3146937,2019/04/19,17:30:00.159,2019/04/19,17:30:00.159,,28575,,,48.8645,4.2382,,,0,0,0,0\n" +
                        "MSG,0,3,3958500,3C66E4,3958500,2019/04/19,17:30:00.160,2019/04/19,17:30:00.160,,21750,,,50.3645,6.473,,,0,0,0,0\n" +
                        "MSG,0,3,5022243,4CA223,5022243,2019/04/19,17:30:00.163,2019/04/19,17:30:00.163,,37000,,,49.8471,7.7982,,,0,0,0,0\n" +
                        "MSG,0,3,4457005,44022D,4457005,2019/04/19,17:30:00.164,2019/04/19,17:30:00.164,,,429.25,105.82,,,0.0,,,,,\n" +
                        "MSG,0,3,4196526,4008AE,4196526,2019/04/19,17:30:00.178,2019/04/19,17:30:00.178,,20350,,,49.3423,7.6086,,,0,0,0,0\n" +
                        "MSG,0,3,5046545,4D0111,5046545,2019/04/19,17:30:00.215,2019/04/19,17:30:00.215,,0.0,,59.06,49.6179,6.1884,,,0,0,0,1\n" +
                        "MSG,0,3,3958149,3C6585,3958149,2019/04/19,17:30:00.216,2019/04/19,17:30:00.216,,29900,,,48.85,8.6014,,,0,0,0,0\n" +
                        "MSG,0,3,4196526,4008AE,4196526,2019/04/19,17:30:00.225,2019/04/19,17:30:00.225,,,343.59,118.13,,,-7.48,,,,,\n" +
                        "MSG,0,3,4224849,407751,4224849,2019/04/19,17:30:00.225,2019/04/19,17:30:00.225,,35000,,,49.4512,7.2606,,,0,0,0,0\n" +
                        "MSG,0,3,4921884,4B1A1C,4921884,2019/04/19,17:30:00.239,2019/04/19,17:30:00.239,,37000,,,49.6684,8.4823,,,0,0,0,0",
                recording, UTF_8);
        final EngineManager engineManager = new EngineManager(new Recording(recording, 1555695000052L),
                newArrayList(deletion(timeWindow(0, 100000), parameters(bstTarget("ALL"), deletionParameter(3)))),
                new ActionLogger());
        final String resultRecording = Files.toString(engineManager.run(), UTF_8);
        assertEquals("MSG,0,3,4216373,405635,4216373,2019/04/19,17:30:00.052,2019/04/19,17:30:00.052,,38000,,,51.2078,7.0869,,,0,0,0,0\n" +
                        "MSG,0,3,3146937,3004B9,3146937,2019/04/19,17:30:00.159,2019/04/19,17:30:00.159,,28575,,,48.8645,4.2382,,,0,0,0,0\n" +
                        "MSG,0,3,4196526,4008AE,4196526,2019/04/19,17:30:00.178,2019/04/19,17:30:00.178,,20350,,,49.3423,7.6086,,,0,0,0,0\n" +
                        "MSG,0,3,4224849,407751,4224849,2019/04/19,17:30:00.225,2019/04/19,17:30:00.225,,35000,,,49.4512,7.2606,,,0,0,0,0",
                resultRecording.trim());
    }

    @Test
    public void applyAction_BstMessageFull_deletion() throws Exception {
        final long startDate = 1555694985000L;
        final BaseStationDeletionEngine engine = new BaseStationDeletionEngine(
                recording(new File(""), startDate),
                superAction(deletion(timeWindow(12000, 19000), parameters(bstTarget("ALL"), deletionParameter(0)))),
                new ActionLogger(),
                engineParameters(label(false)));
        final BaseStationMessageFull message = bstMessageFull(
                "4B1613",
                startDate + 15000,
                callsign("BAW256"),
                altitude(20350),
                groundSpeed(442.2),
                track(358.6),
                latitude(49.6684),
                longitude(8.4823),
                verticalRate(0),
                squawk(4022),
                alert(false),
                emergency(false),
                spi(false),
                onGround(false));
        final String result = invokeMethod(engine, "applyAction", message);
        assertEquals("", result);
    }

    @Test
    public void applyAction_BstMessageFull_deletion_targeted() throws Exception {
        final long startDate = 1555694985000L;
        final BaseStationDeletionEngine engine = new BaseStationDeletionEngine(
                recording(new File(""), startDate),
                superAction(deletion(timeWindow(12000, 19000), parameters(bstTarget("4B1613"), deletionParameter(0)))),
                new ActionLogger(),
                engineParameters(label(false)));
        final BaseStationMessageFull message = bstMessageFull(
                "4B1613",
                startDate + 15000,
                callsign("BAW256"),
                altitude(20350),
                groundSpeed(442.2),
                track(358.6),
                latitude(49.6684),
                longitude(8.4823),
                verticalRate(0),
                squawk(4022),
                alert(false),
                emergency(false),
                spi(false),
                onGround(false));
        final String result = invokeMethod(engine, "applyAction", message);
        assertEquals("", result);
    }

    @Test
    public void applyAction_BstMessageFull_deletion_lowerbound() throws Exception {
        final long startDate = 1555694985000L;
        final BaseStationDeletionEngine engine = new BaseStationDeletionEngine(
                recording(new File(""), startDate),
                superAction(deletion(timeWindow(12000, 19000), parameters(bstTarget("ALL"), deletionParameter(0)))),
                new ActionLogger(),
                engineParameters(label(false)));
        final BaseStationMessageFull message = bstMessageFull(
                "4B1613",
                startDate + 12000,
                callsign("BAW256"),
                altitude(20350),
                groundSpeed(442.2),
                track(358.6),
                latitude(49.6684),
                longitude(8.4823),
                verticalRate(0),
                squawk(4022),
                alert(false),
                emergency(false),
                spi(false),
                onGround(false));
        final String result = invokeMethod(engine, "applyAction", message);
        assertEquals("", result);
    }

    @Test
    public void applyAction_BstMessageFull_deletion_upperbound() throws Exception {
        final long startDate = 1555694985000L;
        final BaseStationDeletionEngine engine = new BaseStationDeletionEngine(
                recording(new File(""), startDate),
                superAction(deletion(timeWindow(12000, 19000), parameters(bstTarget("ALL"), deletionParameter(0)))),
                new ActionLogger(),
                engineParameters(label(false)));
        final BaseStationMessageFull message = bstMessageFull(
                "4B1613",
                startDate + 19000,
                callsign("BAW256"),
                altitude(20350),
                groundSpeed(442.2),
                track(358.6),
                latitude(49.6684),
                longitude(8.4823),
                verticalRate(0),
                squawk(4022),
                alert(false),
                emergency(false),
                spi(false),
                onGround(false));
        final String result = invokeMethod(engine, "applyAction", message);
        assertEquals("", result);
    }

    @Test
    public void applyAction_BstMessageFull_deletion_in_lowerbound() throws Exception {
        final long startDate = 1555694985000L;
        final BaseStationDeletionEngine engine = new BaseStationDeletionEngine(
                recording(new File(""), startDate),
                superAction(deletion(timeWindow(12000, 19000), parameters(bstTarget("ALL"), deletionParameter(0)))),
                new ActionLogger(),
                engineParameters(label(false)));
        final BaseStationMessageFull message = bstMessageFull(
                "4B1613",
                startDate + 12001,
                callsign("BAW256"),
                altitude(20350),
                groundSpeed(442.2),
                track(358.6),
                latitude(49.6684),
                longitude(8.4823),
                verticalRate(0),
                squawk(4022),
                alert(false),
                emergency(false),
                spi(false),
                onGround(false));
        final String result = invokeMethod(engine, "applyAction", message);
        assertEquals("", result);
    }

    @Test
    public void applyAction_BstMessageFull_deletion_in_upperbound() throws Exception {
        final long startDate = 1555694985000L;
        final BaseStationDeletionEngine engine = new BaseStationDeletionEngine(
                recording(new File(""), startDate),
                superAction(deletion(timeWindow(12000, 19000), parameters(bstTarget("ALL"), deletionParameter(0)))),
                new ActionLogger(),
                engineParameters(label(false)));
        final BaseStationMessageFull message = bstMessageFull(
                "4B1613",
                startDate + 18999,
                callsign("BAW256"),
                altitude(20350),
                groundSpeed(442.2),
                track(358.6),
                latitude(49.6684),
                longitude(8.4823),
                verticalRate(0),
                squawk(4022),
                alert(false),
                emergency(false),
                spi(false),
                onGround(false));
        final String result = invokeMethod(engine, "applyAction", message);
        assertEquals("", result);
    }

    @Test
    public void applyAction_BstMessageFull_deletion_KO_lower() throws Exception {
        final long startDate = 1555694985000L;
        final BaseStationDeletionEngine engine = new BaseStationDeletionEngine(
                recording(new File(""), startDate),
                superAction(deletion(timeWindow(12000, 19000), parameters(bstTarget("ALL"), deletionParameter(0)))),
                new ActionLogger(),
                engineParameters(label(false)));
        final BaseStationMessageFull message = bstMessageFull(
                "4B1613",
                startDate + 11999,
                callsign("BAW256"),
                altitude(20350),
                groundSpeed(442.2),
                track(358.6),
                latitude(49.6684),
                longitude(8.4823),
                verticalRate(0),
                squawk(4022),
                alert(false),
                emergency(false),
                spi(false),
                onGround(false));
        final String result = invokeMethod(engine, "applyAction", message);
        assertEquals(
                "MSG,0,0,0,4B1613,0,2019/04/19,17:29:56.999,2019/04/19,17:29:56.999,BAW256,20350,442.2,358.6,49.6684,8.4823,0,4022,0,0,0,0",
                result);
    }

    @Test
    public void applyAction_BstMessageFull_deletion_KO_upper() throws Exception {
        final long startDate = 1555694985000L;
        final BaseStationDeletionEngine engine = new BaseStationDeletionEngine(
                recording(new File(""), startDate),
                superAction(deletion(timeWindow(12000, 19000), parameters(bstTarget("ALL"), deletionParameter(0)))),
                new ActionLogger(),
                engineParameters(label(false)));
        final BaseStationMessageFull message = bstMessageFull(
                "4B1613",
                startDate + 19001,
                callsign("BAW256"),
                altitude(20350),
                groundSpeed(442.2),
                track(358.6),
                latitude(49.6684),
                longitude(8.4823),
                verticalRate(0),
                squawk(4022),
                alert(false),
                emergency(false),
                spi(false),
                onGround(false));
        final String result = invokeMethod(engine, "applyAction", message);
        assertEquals(
                "MSG,0,0,0,4B1613,0,2019/04/19,17:30:04.001,2019/04/19,17:30:04.001,BAW256,20350,442.2,358.6,49.6684,8.4823,0,4022,0,0,0,0",
                result);
    }

    @Test
    public void applyAction_BstMessageFull_deletion_KO_wrongTarget() throws Exception {
        final long startDate = 1555694985000L;
        final BaseStationDeletionEngine engine = new BaseStationDeletionEngine(
                recording(new File(""), startDate),
                superAction(deletion(timeWindow(12000, 19000), parameters(bstTarget("4B1612"), deletionParameter(0)))),
                new ActionLogger(),
                engineParameters(label(false)));
        final BaseStationMessageFull message = bstMessageFull(
                "4B1613",
                startDate + 19001,
                callsign("BAW256"),
                altitude(20350),
                groundSpeed(442.2),
                track(358.6),
                latitude(49.6684),
                longitude(8.4823),
                verticalRate(0),
                squawk(4022),
                alert(false),
                emergency(false),
                spi(false),
                onGround(false));
        final String result = invokeMethod(engine, "applyAction", message);
        assertEquals(
                "MSG,0,0,0,4B1613,0,2019/04/19,17:30:04.001,2019/04/19,17:30:04.001,BAW256,20350,442.2,358.6,49.6684,8.4823,0,4022,0,0,0,0",
                result);
    }
}
