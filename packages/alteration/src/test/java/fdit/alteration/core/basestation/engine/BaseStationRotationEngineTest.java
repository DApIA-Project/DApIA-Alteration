package fdit.alteration.core.basestation.engine;

import fdit.alteration.core.basestation.BstHelper;
import fdit.alteration.core.basestation.message.BaseStationMessageFull;
import fdit.alteration.core.engine.AircraftTrajectory;
import fdit.alteration.core.incident.Action;
import fdit.alteration.core.logging.ActionLogger;
import org.junit.Test;
import org.powermock.reflect.Whitebox;

import java.io.File;
import java.util.Optional;

import static com.google.common.io.Files.write;
import static fdit.alteration.core.basestation.BstHelper.*;
import static fdit.alteration.core.basestation.BstHelper.track;
import static fdit.alteration.core.engine.EngineParametersHelper.engineParameters;
import static fdit.alteration.core.engine.EngineParametersHelper.label;
import static fdit.alteration.core.engine.EngineParametersHelper.track;
import static fdit.alteration.core.engine.SuperActionHelper.superAction;
import static fdit.alteration.core.incident.IncidentHelper.*;
import static gov.nasa.worldwind.geom.LatLon.fromDegrees;
import static java.io.File.createTempFile;
import static java.nio.charset.StandardCharsets.UTF_8;
import static java.util.Optional.*;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.spy;
import static org.powermock.api.mockito.PowerMockito.when;
import static org.powermock.reflect.Whitebox.invokeMethod;

public class BaseStationRotationEngineTest {

    @Test
    public void applyAction_Rotation() throws Exception {
        final File recordingFile = createTempFile("initial1", ".sbs");
        write("MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,125,6.7082,296.565051177078,43.289794921875,5.40233523346657,1152.0,,1,0,1,1\n" +
                        "MSG,3,1,1,39c902,1,2023/01/01,12:21:12.000,2023/01/01,12:21:12.000,SAMU13,150,8.544,290.5560452195834,43.28981043928761,5.402265276227679,1088.0,,1,0,1,1\n" +
                        "MSG,3,1,1,39c902,1,2023/01/01,12:21:14.000,2023/01/01,12:21:14.000,SAMU13,162.5,8.9443,296.565051177078,43.28988647460938,5.40214361146439,960.0,,1,0,1,1\n" +
                        "MSG,3,1,1,39c902,1,2023/01/01,12:21:15.000,2023/01/01,12:21:15.000,SAMU13,150,10.0,306.869897645844,43.28990354376324,5.402134486607142,448.0,,1,0,1,1\n" +
                        "MSG,3,1,1,39c902,1,2023/01/01,12:21:16.000,2023/01/01,12:21:16.000,SAMU13,162.5,9.434,302.0053832080835,43.28988647460938,5.402079737463663,320.0,,1,0,1,1\n" +
                        "MSG,3,1,1,39c902,1,2023/01/01,12:21:18.000,2023/01/01,12:21:18.000,SAMU13,175,12.0416,311.6335393365702,43.28997802734375,5.401951989462209,192.0,,1,0,1,1",
                recordingFile,
                UTF_8);
        final Action rotationAction = rotation(
                timeWindow(0, 10000),
                parameters(bstTarget("39c902"), rotationParameter(80.0)));
        final BaseStationRotationEngine engine = new BaseStationRotationEngine(
                recording(recordingFile, 1672575671000L),
                superAction(rotationAction),
                new ActionLogger(),
                engineParameters(label(false)));
        Whitebox.invokeMethod(engine, "buildFakeTrajectories");
        assertEquals(1, engine.getFakeTrajectories(rotationAction).size());
        assertTrue(engine.getFakeTrajectories(rotationAction).containsKey("39c902"));

        //Les valeurs ci-dessous ne correspondent pas aux valeurs du message
        final BaseStationMessageFull message = bstMessageFull(
                "39c902",
                1672575671000L + 1000,
                callsign(""),
                altitude(36025),
                BstHelper.groundSpeed(442.2),
                BstHelper.track(290.6),
                latitude(47.33821),
                longitude(4.16492),
                verticalRate(0),
                squawk(4022),
                alert(false),
                emergency(false),
                spi(false),
                onGround(false));
        final String result = invokeMethod(engine, "applyAction", message);
        assertEquals(290.6, Double.parseDouble(result.split(",")[13]), 0.1);
    }

    @Test
    public void applyAction_Rotation_WithTrack() throws Exception {
        final File recordingFile = createTempFile("initial1", ".sbs");
        write("MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,125,6.7082,296.565051177078,43.289794921875,5.40233523346657,1152.0,,1,0,1,1\n" +
                        "MSG,3,1,1,39c902,1,2023/01/01,12:21:12.000,2023/01/01,12:21:12.000,SAMU13,150,8.544,290.5560452195834,43.28981043928761,5.402265276227679,1088.0,,1,0,1,1\n" +
                        "MSG,3,1,1,39c902,1,2023/01/01,12:21:14.000,2023/01/01,12:21:14.000,SAMU13,162.5,8.9443,296.565051177078,43.28988647460938,5.40214361146439,960.0,,1,0,1,1\n" +
                        "MSG,3,1,1,39c902,1,2023/01/01,12:21:15.000,2023/01/01,12:21:15.000,SAMU13,150,10.0,306.869897645844,43.28990354376324,5.402134486607142,448.0,,1,0,1,1\n" +
                        "MSG,3,1,1,39c902,1,2023/01/01,12:21:16.000,2023/01/01,12:21:16.000,SAMU13,162.5,9.434,302.0053832080835,43.28988647460938,5.402079737463663,320.0,,1,0,1,1\n" +
                        "MSG,3,1,1,39c902,1,2023/01/01,12:21:18.000,2023/01/01,12:21:18.000,SAMU13,175,12.0416,311.6335393365702,43.28997802734375,5.401951989462209,192.0,,1,0,1,1",
                recordingFile,
                UTF_8);
        final Action rotationAction = rotation(
                timeWindow(0, 10000),
                parameters(bstTarget("39c902"), rotationParameter(80.0)));
        final BaseStationRotationEngine engine = new BaseStationRotationEngine(
                recording(recordingFile, 1672575671000L),
                superAction(rotationAction),
                new ActionLogger(),
                engineParameters(label(false),track(true)));
        Whitebox.invokeMethod(engine, "buildFakeTrajectories");
        assertEquals(1, engine.getFakeTrajectories(rotationAction).size());
        assertTrue(engine.getFakeTrajectories(rotationAction).containsKey("39c902"));

        //Les valeurs ci-dessous ne correspondent pas aux valeurs du message
        final BaseStationMessageFull message = bstMessageFull(
                "39c902",
                1672575671000L + 1000,
                callsign(""),
                altitude(36025),
                BstHelper.groundSpeed(442.2),
                BstHelper.track(290.6),
                latitude(47.33821),
                longitude(4.16492),
                verticalRate(0),
                squawk(4022),
                alert(false),
                emergency(false),
                spi(false),
                onGround(false));
        final String result = invokeMethod(engine, "applyAction", message);
        assertEquals(17.2, Double.parseDouble(result.split(",")[13]), 0.1);
    }


    @Test
    public void buildFakeTrajectories() throws Exception {
        final File recordingFile = createTempFile("initial", ".sbs");
        write("MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,125,6.7082,296.565051177078,43.289794921875,5.40233523346657,1152.0,,1,0,1,1\n" +
                        "MSG,3,1,1,39c902,1,2023/01/01,12:21:12.000,2023/01/01,12:21:12.000,SAMU13,150,8.544,290.5560452195834,43.28981043928761,5.402265276227679,1088.0,,1,0,1,1\n" +
                        "MSG,3,1,1,39c902,1,2023/01/01,12:21:14.000,2023/01/01,12:21:14.000,SAMU13,162.5,8.9443,296.565051177078,43.28988647460938,5.40214361146439,960.0,,1,0,1,1\n" +
                        "MSG,3,1,1,39c902,1,2023/01/01,12:21:15.000,2023/01/01,12:21:15.000,SAMU13,150,10.0,306.869897645844,43.28990354376324,5.402134486607142,448.0,,1,0,1,1\n" +
                        "MSG,3,1,1,39c902,1,2023/01/01,12:21:16.000,2023/01/01,12:21:16.000,SAMU13,162.5,9.434,302.0053832080835,43.28988647460938,5.402079737463663,320.0,,1,0,1,1\n" +
                        "MSG,3,1,1,39c902,1,2023/01/01,12:21:18.000,2023/01/01,12:21:18.000,SAMU13,175,12.0416,311.6335393365702,43.28997802734375,5.401951989462209,192.0,,1,0,1,1",
                recordingFile,
                UTF_8);
        final Action rotationAction = rotation(
                timeWindow(0, 10000),
                parameters(bstTarget("39c902"), rotationParameter(80.0)));
        final BaseStationRotationEngine engine = new BaseStationRotationEngine(
                recording(recordingFile, 1672575671000L),
                superAction(rotationAction),
                new ActionLogger(),
                engineParameters(label(false),track(true)));
        Whitebox.invokeMethod(engine, "buildFakeTrajectories");
        assertEquals(1, engine.getFakeTrajectories(rotationAction).size());
        assertTrue(engine.getFakeTrajectories(rotationAction).containsKey("39c902"));

        final AircraftTrajectory trajectory = engine.getFakeTrajectories(rotationAction).get("39c902");
        assertEquals(17.2, trajectory.getTrack(1672575672000L).get(), 0.1);
        assertEquals(38.6, trajectory.getTrack(1672575674000L).get(), 0.1);
        assertEquals(43.28985, trajectory.getLatitude(1672575672000L).get(), 0.00001);
        assertEquals(5.40234, trajectory.getLongitude(1672575672000L).get(), 0.00001);

    }
}