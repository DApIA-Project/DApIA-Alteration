package fdit.alteration.core.basestation.engine;

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
import static fdit.alteration.core.basestation.BstHelper.verticalRate;
import static fdit.alteration.core.basestation.BstHelper.*;
import static fdit.alteration.core.engine.EngineParametersHelper.groundSpeed;
import static fdit.alteration.core.engine.EngineParametersHelper.track;
import static fdit.alteration.core.engine.EngineParametersHelper.*;
import static fdit.alteration.core.engine.SuperActionHelper.superAction;
import static fdit.alteration.core.incident.IncidentHelper.*;
import static java.io.File.createTempFile;
import static java.nio.charset.StandardCharsets.UTF_8;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.powermock.reflect.Whitebox.invokeMethod;

public class BaseStationTrajectoryModificationEngineTest {

    @Test
    public void buildNewTrajectories_noModification_noTimeWindow() throws Exception {
        final File recordingFile = createTempFile("initial", ".bst");
        write("MSG,0,30,1105,300065,3839,2018/02/28,16:04:30.987,2018/02/28,16:04:31.888,,,414.1,333.0,,,64,,,,,\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:31.987,2018/02/28,16:04:32.888,,36025,,,47.33528,4.16787,,,0,0,0,0\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:32.391,2018/02/28,16:04:33.888,,36025,,,47.33606,4.16732,,,0,0,0,0\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:32.590,2018/02/28,16:04:34.888,,,415.0,333.1,,,0,,,,,\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:33.801,2018/02/28,16:04:35.888,,36025,,,47.33678,4.16678,,,0,0,0,0\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:33.998,2018/02/28,16:04:36.894,,,415.0,333.1,,,0,,,,,\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:34.404,2018/02/28,16:04:37.894,,36025,,,47.33752,4.16622,,,0,0,0,0\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:34.607,2018/02/28,16:04:38.894,,,415.0,333.1,,,0,,,,,\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:35.608,2018/02/28,16:04:39.894,,36025,,,47.33821,4.16567,,,0,0,0,0\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:36.017,2018/02/28,16:04:40.889,,,415.0,333.1,,,0,,,,,\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:36.217,2018/02/28,16:04:41.889,,36025,,,47.33926,4.16492,,,0,0,0,0",
                recordingFile,
                UTF_8);
        final SuperAction trajectorySuper = superAction(trajectoryModification(timeWindow(0, 0), parameters(bstTarget("300065"), trajectory())));
        final Action trajectoryAction = get(trajectorySuper.getActions(), 0);
        final BaseStationTrajectoryModificationEngine engine = new BaseStationTrajectoryModificationEngine(
                recording(recordingFile, 1519833870987L),
                trajectorySuper,
                new ActionLogger(),
                engineParameters());
        Whitebox.invokeMethod(engine, "buildBaseTrajectories");
        Whitebox.invokeMethod(engine, "buildFakeTrajectories");
        assertEquals(1, engine.getFakeTrajectories(trajectoryAction).size());
        assertTrue(engine.getFakeTrajectories(trajectoryAction).containsKey("300065"));

        final AircraftTrajectory trajectory = engine.getFakeTrajectories(trajectoryAction).get("300065");
        assertEquals(6, trajectory.getAltitudes().size());
        assertEquals(6, trajectory.getLongitudes().size());
        assertEquals(6, trajectory.getLatitudes().size());

        assertEquals(47.33528, trajectory.getLatitudes().get(1519833871987.0), 0.0001);
        assertEquals(47.33606, trajectory.getLatitudes().get(1519833872391.0), 0.0001);
        assertEquals(47.33678, trajectory.getLatitudes().get(1519833873801.0), 0.0001);
        assertEquals(47.33752, trajectory.getLatitudes().get(1519833874404.0), 0.0001);
        assertEquals(47.33821, trajectory.getLatitudes().get(1519833875608.0), 0.0001);
        assertEquals(47.33926, trajectory.getLatitudes().get(1519833876217.0), 0.0001);

        assertEquals(4.16787, trajectory.getLongitudes().get(1519833871987.0), 0.0001);
        assertEquals(4.16732, trajectory.getLongitudes().get(1519833872391.0), 0.0001);
        assertEquals(4.16678, trajectory.getLongitudes().get(1519833873801.0), 0.0001);
        assertEquals(4.16622, trajectory.getLongitudes().get(1519833874404.0), 0.0001);
        assertEquals(4.16567, trajectory.getLongitudes().get(1519833875608.0), 0.0001);
        assertEquals(4.16492, trajectory.getLongitudes().get(1519833876217.0), 0.0001);

        assertEquals(36025, trajectory.getAltitudes().get(1519833871987.0), 0.0001);
        assertEquals(36025, trajectory.getAltitudes().get(1519833872391.0), 0.0001);
        assertEquals(36025, trajectory.getAltitudes().get(1519833873801.0), 0.0001);
        assertEquals(36025, trajectory.getAltitudes().get(1519833874404.0), 0.0001);
        assertEquals(36025, trajectory.getAltitudes().get(1519833875608.0), 0.0001);
        assertEquals(36025, trajectory.getAltitudes().get(1519833876217.0), 0.0001);
    }

    @Test
    public void buildNewTrajectories_noModification_withTimeWindow() throws Exception {
        final File recordingFile = createTempFile("initial", ".bst");
        write("MSG,0,30,1105,300065,3839,2018/02/28,16:04:30.987,2018/02/28,16:04:31.888,,,414.1,333.0,,,64,,,,,\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:31.987,2018/02/28,16:04:32.888,,36025,,,47.33528,4.16787,,,0,0,0,0\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:32.391,2018/02/28,16:04:33.888,,36025,,,47.33606,4.16732,,,0,0,0,0\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:32.590,2018/02/28,16:04:34.888,,,415.0,333.1,,,0,,,,,\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:33.801,2018/02/28,16:04:35.888,,36025,,,47.33678,4.16678,,,0,0,0,0\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:33.998,2018/02/28,16:04:36.894,,,415.0,333.1,,,0,,,,,\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:34.404,2018/02/28,16:04:37.894,,36025,,,47.33752,4.16622,,,0,0,0,0\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:34.607,2018/02/28,16:04:38.894,,,415.0,333.1,,,0,,,,,\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:35.608,2018/02/28,16:04:39.894,,36025,,,47.33821,4.16567,,,0,0,0,0\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:36.017,2018/02/28,16:04:40.889,,,415.0,333.1,,,0,,,,,\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:36.217,2018/02/28,16:04:41.889,,36025,,,47.33926,4.16492,,,0,0,0,0",
                recordingFile,
                UTF_8);
        final SuperAction trajectorySuper = superAction(trajectoryModification(timeWindow(2500, 3000), parameters(bstTarget("300065"), trajectory())));
        final Action trajectoryAction = get(trajectorySuper.getActions(), 0);
        final BaseStationTrajectoryModificationEngine engine = new BaseStationTrajectoryModificationEngine(
                recording(recordingFile, 1519833870987L),
                trajectorySuper,
                new ActionLogger(),
                engineParameters());
        Whitebox.invokeMethod(engine, "buildBaseTrajectories");
        Whitebox.invokeMethod(engine, "buildFakeTrajectories");
        assertEquals(1, engine.getFakeTrajectories(trajectoryAction).size());
        assertTrue(engine.getFakeTrajectories(trajectoryAction).containsKey("300065"));

        final AircraftTrajectory trajectory = engine.getFakeTrajectories(trajectoryAction).get("300065");
        assertEquals(6, trajectory.getAltitudes().size());
        assertEquals(6, trajectory.getLongitudes().size());
        assertEquals(6, trajectory.getLatitudes().size());

        assertEquals(47.33528, trajectory.getLatitudes().get(1519833871987.0), 0.0001);
        assertEquals(47.33606, trajectory.getLatitudes().get(1519833872391.0), 0.0001);
        assertEquals(47.33752, trajectory.getLatitudes().get(1519833874404.0), 0.0001);
        assertEquals(47.33821, trajectory.getLatitudes().get(1519833875608.0), 0.0001);
        assertEquals(47.33926, trajectory.getLatitudes().get(1519833876217.0), 0.0001);

        assertEquals(4.16787, trajectory.getLongitudes().get(1519833871987.0), 0.0001);
        assertEquals(4.16732, trajectory.getLongitudes().get(1519833872391.0), 0.0001);
        assertEquals(4.16622, trajectory.getLongitudes().get(1519833874404.0), 0.0001);
        assertEquals(4.16567, trajectory.getLongitudes().get(1519833875608.0), 0.0001);
        assertEquals(4.16492, trajectory.getLongitudes().get(1519833876217.0), 0.0001);

        assertEquals(36025, trajectory.getAltitudes().get(1519833871987.0), 0.0001);
        assertEquals(36025, trajectory.getAltitudes().get(1519833872391.0), 0.0001);
        assertEquals(36025, trajectory.getAltitudes().get(1519833874404.0), 0.0001);
        assertEquals(36025, trajectory.getAltitudes().get(1519833875608.0), 0.0001);
        assertEquals(36025, trajectory.getAltitudes().get(1519833876217.0), 0.0001);
    }

    @Test
    public void buildNewTrajectories_withModification_withTimeWindow() throws Exception {
        final File recordingFile = createTempFile("initial", ".bst");
        write("MSG,0,30,1105,300065,3839,2018/02/28,16:04:30.987,2018/02/28,16:04:31.888,,,414.1,333.0,,,64,,,,,\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:31.987,2018/02/28,16:04:32.888,,36025,,,47.33528,4.16787,,,0,0,0,0\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:32.391,2018/02/28,16:04:33.888,,36025,,,47.33606,4.16732,,,0,0,0,0\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:32.590,2018/02/28,16:04:34.888,,,415.0,333.1,,,0,,,,,\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:33.801,2018/02/28,16:04:35.888,,36025,,,47.33678,4.16678,,,0,0,0,0\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:33.998,2018/02/28,16:04:36.894,,,415.0,333.1,,,0,,,,,\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:34.404,2018/02/28,16:04:37.894,,36025,,,47.33752,4.16622,,,0,0,0,0\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:34.607,2018/02/28,16:04:38.894,,,415.0,333.1,,,0,,,,,\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:35.608,2018/02/28,16:04:39.894,,36025,,,47.33821,4.16567,,,0,0,0,0\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:36.017,2018/02/28,16:04:40.889,,,415.0,333.1,,,0,,,,,\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:36.217,2018/02/28,16:04:41.889,,36025,,,47.33926,4.16492,,,0,0,0,0",
                recordingFile,
                UTF_8);
        final SuperAction trajectorySuper = superAction(trajectoryModification(
                timeWindow(2500, 5000),
                parameters(
                        bstTarget("300065"),
                        trajectory(
                                wayPoint(3250, 47.33688, 4.16668, 36000),
                                wayPoint(4000, 47.33762, 4.16612, 35975),
                                wayPoint(4600, 47.33831, 4.16557, 36000)))));
        final Action trajectoryAction = get(trajectorySuper.getActions(), 0);
        final BaseStationTrajectoryModificationEngine engine = new BaseStationTrajectoryModificationEngine(
                recording(recordingFile, 1519833870987L),
                trajectorySuper,
                new ActionLogger(),
                engineParameters());
        Whitebox.invokeMethod(engine, "buildBaseTrajectories");
        Whitebox.invokeMethod(engine, "buildFakeTrajectories");
        assertEquals(1, engine.getFakeTrajectories(trajectoryAction).size());
        assertTrue(engine.getFakeTrajectories(trajectoryAction).containsKey("300065"));

        final AircraftTrajectory trajectory = engine.getFakeTrajectories(trajectoryAction).get("300065");
        assertEquals(7, trajectory.getAltitudes().size());
        assertEquals(7, trajectory.getLongitudes().size());
        assertEquals(7, trajectory.getLatitudes().size());
        assertEquals(47.33528, trajectory.getLatitudes().get(1519833871987.0), 0.0001);
        assertEquals(47.33606, trajectory.getLatitudes().get(1519833872391.0), 0.0001);
        assertEquals(47.33688, trajectory.getLatitudes().get(1519833874237.0), 0.0001); // 1519833873801L (first altered message date) + 750
        assertEquals(47.33762, trajectory.getLatitudes().get(1519833874987.0), 0.0001); // 1519833873801L + 1500
        assertEquals(47.33831, trajectory.getLatitudes().get(1519833875587.0), 0.0001); // 1519833873801L + 2100
        assertEquals(47.33926, trajectory.getLatitudes().get(1519833876217.0), 0.0001);

        assertEquals(4.16787, trajectory.getLongitudes().get(1519833871987.0), 0.0001);
        assertEquals(4.16732, trajectory.getLongitudes().get(1519833872391.0), 0.0001);
        assertEquals(4.16668, trajectory.getLongitudes().get(1519833874237.0), 0.0001); // 1519833873801L (first altered message date) + 750
        assertEquals(4.16612, trajectory.getLongitudes().get(1519833874987.0), 0.0001); // 1519833873801L + 1500
        assertEquals(4.16557, trajectory.getLongitudes().get(1519833875587.0), 0.0001); // 1519833873801L + 2100
        assertEquals(4.16492, trajectory.getLongitudes().get(1519833876217.0), 0.0001);

        assertEquals(36025, trajectory.getAltitudes().get(1519833871987.0), 0.0001);
        assertEquals(36025, trajectory.getAltitudes().get(1519833872391.0), 0.0001);
        assertEquals(36000, trajectory.getAltitudes().get(1519833874237.0), 0.0001); // 1519833873801L (first altered message date) + 750
        assertEquals(35975, trajectory.getAltitudes().get(1519833874987.0), 0.0001); // 1519833873801L + 1500
        assertEquals(36000, trajectory.getAltitudes().get(1519833875587.0), 0.0001); // 1519833873801L + 2100
        assertEquals(36025, trajectory.getAltitudes().get(1519833876217.0), 0.0001);
    }

    @Test
    public void applyActionEngineWithLabelsGroundSpeedAnsTrack() throws Exception {
        final File recordingFile = createTempFile("initial", ".bst");
        final long startDate = 1519833871000L;
        write("MSG,0,30,1105,300065,3839,2018/02/28,16:04:31.000,2018/02/28,16:04:31.000,,,414.1,333.0,,,64,,,,,\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:32.000,2018/02/28,16:04:32.000,,36025,,,47.33528,4.16787,,,0,0,0,0\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:33.000,2018/02/28,16:04:33.000,,36025,,,47.33606,4.16732,,,0,0,0,0\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:34.000,2018/02/28,16:04:34.000,,,415.0,333.1,,,0,,,,,\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:35.000,2018/02/28,16:04:35.000,,36025,,,47.33678,4.16678,,,0,0,0,0\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:36.000,2018/02/28,16:04:36.000,,,415.0,333.1,,,0,,,,,\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:37.000,2018/02/28,16:04:37.000,,36025,,,47.33752,4.16622,,,0,0,0,0\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:38.000,2018/02/28,16:04:38.000,,,415.0,333.1,,,0,,,,,\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:39.000,2018/02/28,16:04:39.000,,36025,,,47.33821,4.16567,,,0,0,0,0\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:40.000,2018/02/28,16:04:40.000,,,415.0,333.1,,,0,,,,,\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:41.000,2018/02/28,16:04:41.000,,36025,,,47.33926,4.16492,,,0,0,0,0",
                recordingFile,
                UTF_8);
        final SuperAction trajectorySuper = superAction(trajectoryModification(
                timeWindow(3000, 8500),
                parameters(
                        bstTarget("300065"),
                        trajectory(
                                wayPoint(750, 47.33688, 4.16668, 36000),
                                wayPoint(1000, 47.33762, 4.16612, 35975),
                                wayPoint(2100, 47.33831, 4.16557, 36000)))));
        final BaseStationTrajectoryModificationEngine engine = new BaseStationTrajectoryModificationEngine(
                recording(recordingFile, 1519833870987L),
                trajectorySuper,
                new ActionLogger(),
                engineParameters(label(true), groundSpeed(true), track(true)));
        Whitebox.invokeMethod(engine, "buildBaseTrajectories");
        Whitebox.invokeMethod(engine, "buildFakeTrajectories");
        final BaseStationMessageFull message = bstMessageFull(
                "300065",
                startDate + 4000,
                callsign(""),
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
                onGround(false));
        final String result = invokeMethod(engine, "applyAction", message);
        assertEquals("1", result.split(",")[22]);
        assertEquals("1984", result.split(",")[23]);
    }
}