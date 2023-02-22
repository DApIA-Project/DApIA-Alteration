package fdit.alteration.core.basestation.engine;

import fdit.alteration.core.logging.ActionLogger;
import org.junit.Test;

import java.io.File;

import static com.google.common.io.Files.write;
import static fdit.alteration.core.engine.EngineParametersHelper.engineParameters;
import static fdit.alteration.core.engine.EngineParametersHelper.label;
import static fdit.alteration.core.engine.SuperActionHelper.superAction;
import static fdit.alteration.core.incident.IncidentHelper.*;
import static fdit.alteration.core.incident.Parameter.CHARAC_CALLSIGN;
import static fdit.alteration.core.incident.Parameter.CHARAC_ICAO;
import static java.io.File.createTempFile;
import static java.nio.charset.StandardCharsets.UTF_8;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.when;

public class BaseStationCreationEngineTest {

    @Test
    public void preProcessing() throws Exception {
        final long startDate = 1519833870987L;
        final File initialRecording = createTempFile("recording", ".bst");
        write("MSG,0,30,1105,300065,3839,2018/02/28,16:04:30.987,2018/02/28,16:04:31.888,,,414.1,333,,,64,,,,,\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:31.987,2018/02/28,16:04:32.888,,36025,,,47.33528,4.16787,,,0,0,0,0\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:32.391,2018/02/28,16:04:33.888,,36025,,,47.33606,4.16732,,,0,0,0,0\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:32.590,2018/02/28,16:04:34.888,,,415,333.1,,,0,,,,,\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:33.801,2018/02/28,16:04:35.888,,36025,,,47.33678,4.16678,,,0,0,0,0\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:33.998,2018/02/28,16:04:36.894,,,415,333.1,,,0,,,,,\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:34.404,2018/02/28,16:04:37.894,,36025,,,47.33752,4.16622,,,0,0,0,0\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:34.607,2018/02/28,16:04:38.894,,,415,333.1,,,0,,,,,\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:35.608,2018/02/28,16:04:39.894,,36025,,,47.33821,4.16567,,,0,0,0,0\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:36.017,2018/02/28,16:04:40.889,,,415,333.1,,,0,,,,,\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:36.217,2018/02/28,16:04:41.889,,36025,,,47.33926,4.16492,,,0,0,0,0",
                initialRecording,
                UTF_8);
        final BaseStationCreationEngine engine = spy(new BaseStationCreationEngine(
                recording(initialRecording, startDate),
                superAction(creation(timeWindow(startDate + 10000, startDate + 60000), parameters(
                        trajectory(
                                wayPoint(0, 48.60718, 2.05332, 18400),
                                wayPoint(3121, 48.6021, 2.05585, 18475),
                                wayPoint(7177, 48.59642, 2.05867, 18600),
                                wayPoint(12247, 48.58783, 2.06297, 18775),
                                wayPoint(17316, 48.57945, 2.06709, 18975),
                                wayPoint(22111, 48.56963, 2.07201, 19200),
                                wayPoint(28986, 48.55908, 2.07775, 19450)),
                        parameter(CHARAC_ICAO, "39AC47"),
                        parameter(CHARAC_CALLSIGN, "SAMU25")))),
                new ActionLogger(),
                engineParameters(label(false))));
        when(engine.getTimeOffset()).thenReturn(500);
        engine.preProcessing();
        assertEquals(100, engine.getMessages().size());
    }
}