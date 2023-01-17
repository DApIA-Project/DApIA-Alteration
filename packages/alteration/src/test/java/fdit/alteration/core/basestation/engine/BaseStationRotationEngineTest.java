package fdit.alteration.core.basestation.engine;

import fdit.alteration.core.basestation.message.BaseStationMessageFull;
import fdit.alteration.core.incident.Action;
import fdit.alteration.core.logging.ActionLogger;
import org.junit.Test;

import java.io.File;
import java.util.Optional;

import static fdit.alteration.core.basestation.BstHelper.*;
import static fdit.alteration.core.engine.EngineParametersHelper.engineParameters;
import static fdit.alteration.core.engine.EngineParametersHelper.label;
import static fdit.alteration.core.engine.SuperActionHelper.superAction;
import static fdit.alteration.core.incident.IncidentHelper.*;
import static gov.nasa.worldwind.geom.LatLon.fromDegrees;
import static java.util.Optional.*;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.spy;
import static org.powermock.api.mockito.PowerMockito.when;
import static org.powermock.reflect.Whitebox.invokeMethod;

public class BaseStationRotationEngineTest {

    @Test
    public void applyAction_Rotation() throws Exception {
        final long startDate = 1555694985000L;
        final Action rotationAction = rotation(
                timeWindow(10000, 20000),
                parameters(bstTarget("4B1613"), rotationParameter(90)));
        final BaseStationRotationEngine engine = spy(new BaseStationRotationEngine(
                recording(new File(""), startDate),
                superAction(rotationAction),
                new ActionLogger(),
                engineParameters(label(false))));
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
        when(engine, "getStartPos", "4B1613", rotationAction).thenReturn(of(fromDegrees(49.0, 8.0)));
        final String result = invokeMethod(engine, "applyAction", message);
        assertEquals(
                "MSG,0,0,0,4B1613,0,2019/04/19,17:30:00.000,2019/04/19,17:30:00.000,BAW256,20350,442.2,358.1,48.68338,9.01392,0,4022,0,0,0,0",
                result);
    }
}