package fdit.alteration.core.basestation.engine;

import fdit.alteration.core.basestation.message.BaseStationMessageFull;
import fdit.alteration.core.engine.SuperAction;
import fdit.alteration.core.incident.Action;
import fdit.alteration.core.logging.ActionLogger;
import org.junit.Test;

import java.io.File;

import static com.google.common.collect.Iterables.get;
import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.io.Files.write;
import static fdit.alteration.core.basestation.BstHelper.*;
import static fdit.alteration.core.basestation.engine.GhostAircraftHelper.*;
import static fdit.alteration.core.engine.EngineParametersHelper.engineParameters;
import static fdit.alteration.core.engine.EngineParametersHelper.label;
import static fdit.alteration.core.engine.SuperActionHelper.superAction;
import static fdit.alteration.core.incident.IncidentHelper.*;
import static java.io.File.createTempFile;
import static java.nio.charset.StandardCharsets.UTF_8;
import static org.junit.Assert.assertEquals;
import static org.powermock.reflect.Whitebox.invokeMethod;
import static fdit.testTools.PredicateAssert.assertThat;

public class BaseStationSaturationEngineTest {

    @Test
    public void applyAction_saturation_15_ghost_aircraft() throws Exception {
        final long startDate = 1555695000000L;
        final File recordingFile = createTempFile("initial", ".bst");
        write("MSG,0,0,0,4B1613,0,2019/04/19,17:30:00.000,2019/04/19,17:30:00.000,BAW256,20350,442.2,358.8,49.6684,8.4823,0,4022,0,0,0,0\n" +
                        "MSG,0,0,0,4B1613,0,2019/04/19,17:30:01.000,2019/04/19,17:30:00.000,BAW256,20350,442.2,358.8,49.6684,8.4823,0,4022,0,0,0,0\n" +
                        "MSG,0,0,0,4B1613,0,2019/04/19,17:30:02.000,2019/04/19,17:30:00.000,BAW256,20350,442.2,358.8,49.6684,8.4823,0,4022,0,0,0,0\n" +
                        "MSG,0,0,0,4B1613,0,2019/04/19,17:30:03.000,2019/04/19,17:30:00.000,BAW256,20350,442.2,358.8,49.6684,8.4823,0,4022,0,0,0,0\n" +
                        "MSG,0,0,0,4B1613,0,2019/04/19,17:30:04.000,2019/04/19,17:30:00.000,BAW256,20350,442.2,358.8,49.6684,8.4823,0,4022,0,0,0,0\n",
                recordingFile,
                UTF_8);
        final BaseStationSaturationEngine engine = new BaseStationSaturationEngine(
                recording(recordingFile, startDate),
                superAction(alteration(
                        timeWindow(0, 10000),
                        parameters(bstTarget("4B1613"),
                                saturationParameter("RANDOM", 15)))),
                new ActionLogger(),
                engineParameters(label(false)));
        final BaseStationMessageFull message = bstMessageFull(
                "4B1613",
                startDate + 3000,
                callsign("BAW256"),
                altitude(20350),
                groundSpeed(442.25),
                track(358.8),
                latitude(49.6684),
                longitude(8.4823),
                verticalRate(0),
                squawk(4022),
                alert(false),
                emergency(false),
                spi(false),
                onGround(false));
        invokeMethod(engine, "buildNewTrajectories");
        final String result = invokeMethod(engine, "applyAction", message);
        assertEquals(16, result.split("\n").length);
    }

    @Test
    public void messagesToLines() throws Exception {
        final long startDate = 1555694985000L;
        final String result = invokeMethod(
                BaseStationSaturationEngine.class,
                "messagesToLines",
                newArrayList(
                        bstMessageFull(
                                "4B1611",
                                startDate + 15000,
                                callsign("BAW251"),
                                altitude(20150),
                                groundSpeed(142.2),
                                track(158.1),
                                latitude(49.664),
                                longitude(8.4823),
                                verticalRate(0),
                                squawk(4021),
                                alert(false),
                                emergency(false),
                                spi(false),
                                onGround(false)),
                        bstMessageFull(
                                "4B1612",
                                startDate + 15000,
                                callsign("BAW252"),
                                altitude(20250),
                                groundSpeed(242.2),
                                track(258.4),
                                latitude(49.684),
                                longitude(8.4823),
                                verticalRate(0),
                                squawk(4022),
                                alert(true),
                                emergency(true),
                                spi(true),
                                onGround(true)),
                        bstMessageFull(
                                "4B1613",
                                startDate + 15000,
                                callsign("BAW253"),
                                altitude(20350),
                                groundSpeed(342.2),
                                track(358.8),
                                latitude(49.784),
                                longitude(8.4823),
                                verticalRate(0),
                                squawk(4023),
                                alert(true),
                                emergency(false),
                                spi(true),
                                onGround(false))));
        assertEquals("MSG,0,0,0,4B1611,0,2019/04/19,17:30:00.000,2019/04/19,17:30:00.000,BAW251,20150,142.2,158.1,49.664,8.4823,0,4021,0,0,0,0\n" +
                        "MSG,0,0,0,4B1612,0,2019/04/19,17:30:00.000,2019/04/19,17:30:00.000,BAW252,20250,242.2,258.4,49.684,8.4823,0,4022,1,1,1,1\n" +
                        "MSG,0,0,0,4B1613,0,2019/04/19,17:30:00.000,2019/04/19,17:30:00.000,BAW253,20350,342.2,358.8,49.784,8.4823,0,4023,1,0,1,0",
                result);
    }

    @Test
    public void createFakeAircrafts() throws Exception {
        final long startDate = 1555694985000L;
        final SuperAction saturationSuper = superAction(saturation(timeWindow(0, 100000), parameters(
                bstTarget("ALL"),
                saturationParameter("39AC47", 5))));
        final Action saturation = get(saturationSuper.getActions(), 0);
        final BaseStationSaturationEngine engine = new BaseStationSaturationEngine(
                recording(new File(""), startDate),
                saturationSuper, new ActionLogger(),
                engineParameters(label(false)));
        invokeMethod(engine, "createGhostAircrafts",
                bstMessageFull("39AC47", startDate),
                saturation);
        assertEquals(1, engine.getGhostAircrafts(saturation).size());
        assertEquals(5, engine.getGhostAircrafts(saturation).get("39AC47").size());
        assertThat(engine.getGhostAircrafts(saturation).get("39AC47").get(0),
                aGhostAircraft(
                        withIcaoDerivedFrom("39AC47"),
                        withValidAngle(),
                        withValidDistanceCoeff(),
                        withFirstAppearance(startDate)));
        assertThat(engine.getGhostAircrafts(saturation).get("39AC47").get(1),
                aGhostAircraft(
                        withIcaoDerivedFrom("39AC47"),
                        withValidAngle(),
                        withValidDistanceCoeff(),
                        withFirstAppearance(startDate)));
        assertThat(engine.getGhostAircrafts(saturation).get("39AC47").get(2),
                aGhostAircraft(
                        withIcaoDerivedFrom("39AC47"),
                        withValidAngle(),
                        withValidDistanceCoeff(),
                        withFirstAppearance(startDate)));
        assertThat(engine.getGhostAircrafts(saturation).get("39AC47").get(3),
                aGhostAircraft(
                        withIcaoDerivedFrom("39AC47"),
                        withValidAngle(),
                        withValidDistanceCoeff(),
                        withFirstAppearance(startDate)));
        assertThat(engine.getGhostAircrafts(saturation).get("39AC47").get(4),
                aGhostAircraft(
                        withIcaoDerivedFrom("39AC47"),
                        withValidAngle(),
                        withValidDistanceCoeff(),
                        withFirstAppearance(startDate)));
    }
}