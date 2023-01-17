package fdit.alteration.core.engine;

import fdit.alteration.core.incident.Recording;
import fdit.alteration.core.incident.UnknownActionException;
import fdit.alteration.core.logging.ActionLogger;
import org.junit.Test;

import java.io.File;
import java.io.FileNotFoundException;

import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.io.Files.write;
import static fdit.alteration.core.incident.IncidentHelper.*;
import static java.nio.charset.StandardCharsets.UTF_8;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class EngineManagerTest {

    @Test
    public void actionEngine_run_OK() throws Exception {
        final long firstDate = 1606904067000L;
        final File recording = File.createTempFile("recording", ".bst");
        write("MSG,0,3,4216373,405635,4216373,2019/04/19,17:30:00.052,2019/04/19,17:30:00.052,,38000.0,,,51.2078,7.0869,,,0,0,0,0\n" +
                        "MSG,0,3,4196341,4007F5,4196341,2019/04/19,17:30:00.102,2019/04/19,17:30:00.102,,38000.0,,,47.7235,7.6864,,,0,0,0,0\n" +
                        "MSG,0,3,4197737,400D69,4197737,2019/04/19,17:30:00.120,2019/04/19,17:30:00.120,,38000.0,,,49.3943,2.8343,,,0,0,0,0\n" +
                        "MSG,0,3,10610299,A1E67B,10610299,2019/04/19,17:30:00.140,2019/04/19,17:30:00.140,,16625.0,,,50.4073,8.2464,,,0,0,0,0\n" +
                        "MSG,0,3,3146937,3004B9,3146937,2019/04/19,17:30:00.159,2019/04/19,17:30:00.159,,28575.0,,,48.8645,4.2382,,,0,0,0,0\n" +
                        "MSG,0,3,3958500,3C66E4,3958500,2019/04/19,17:30:00.160,2019/04/19,17:30:00.160,,21750.0,,,50.3645,6.473,,,0,0,0,0\n" +
                        "MSG,0,3,5022243,4CA223,5022243,2019/04/19,17:30:00.163,2019/04/19,17:30:00.163,,37000.0,,,49.8471,7.7982,,,0,0,0,0\n" +
                        "MSG,0,3,4457005,44022D,4457005,2019/04/19,17:30:00.164,2019/04/19,17:30:00.164,,,429.25,105.82,,,0.0,,,,,\n" +
                        "MSG,0,3,4196526,4008AE,4196526,2019/04/19,17:30:00.178,2019/04/19,17:30:00.178,,20350.0,,,49.3423,7.6086,,,0,0,0,0\n" +
                        "MSG,0,3,5046545,4D0111,5046545,2019/04/19,17:30:00.215,2019/04/19,17:30:00.215,,0.0,,59.06,49.6179,6.1884,,,0,0,0,1\n" +
                        "MSG,0,3,3958149,3C6585,3958149,2019/04/19,17:30:00.216,2019/04/19,17:30:00.216,,29900.0,,,48.85,8.6014,,,0,0,0,0\n" +
                        "MSG,0,3,4196526,4008AE,4196526,2019/04/19,17:30:00.225,2019/04/19,17:30:00.225,,,343.59,118.13,,,-7.48,,,,,\n" +
                        "MSG,0,3,4224849,407751,4224849,2019/04/19,17:30:00.225,2019/04/19,17:30:00.225,,35000.0,,,49.4512,7.2606,,,0,0,0,0\n" +
                        "MSG,0,3,4921884,4B1A1C,4921884,2019/04/19,17:30:00.239,2019/04/19,17:30:00.239,,37000.0,,,49.6684,8.4823,,,0,0,0,0",
                recording, UTF_8);
        final EngineManager engineManager = new EngineManager(new Recording(recording, firstDate),
                newArrayList(alteration(timeWindow(0, 100), parameters(bstTarget("ALL")))),
                new ActionLogger());
        assertTrue(engineManager.run().exists());
    }

    @Test(expected = UnknownActionException.class)
    public void actionEngine_run_fileOK_actionKO() throws Exception {
        final long firstDate = 1606904067000L;
        final File recording = File.createTempFile("recording", ".bst");
        write("MSG,0,3,4216373,405635,4216373,2019/04/19,17:30:00.052,2019/04/19,17:30:00.052,,38000.0,,,51.2078,7.0869,,,0,0,0,0\n" +
                        "MSG,0,3,4196341,4007F5,4196341,2019/04/19,17:30:00.102,2019/04/19,17:30:00.102,,38000.0,,,47.7235,7.6864,,,0,0,0,0\n" +
                        "MSG,0,3,4197737,400D69,4197737,2019/04/19,17:30:00.120,2019/04/19,17:30:00.120,,38000.0,,,49.3943,2.8343,,,0,0,0,0\n" +
                        "MSG,0,3,10610299,A1E67B,10610299,2019/04/19,17:30:00.140,2019/04/19,17:30:00.140,,16625.0,,,50.4073,8.2464,,,0,0,0,0\n" +
                        "MSG,0,3,3146937,3004B9,3146937,2019/04/19,17:30:00.159,2019/04/19,17:30:00.159,,28575.0,,,48.8645,4.2382,,,0,0,0,0\n" +
                        "MSG,0,3,3958500,3C66E4,3958500,2019/04/19,17:30:00.160,2019/04/19,17:30:00.160,,21750.0,,,50.3645,6.473,,,0,0,0,0\n" +
                        "MSG,0,3,5022243,4CA223,5022243,2019/04/19,17:30:00.163,2019/04/19,17:30:00.163,,37000.0,,,49.8471,7.7982,,,0,0,0,0\n" +
                        "MSG,0,3,4457005,44022D,4457005,2019/04/19,17:30:00.164,2019/04/19,17:30:00.164,,,429.25,105.82,,,0.0,,,,,\n" +
                        "MSG,0,3,4196526,4008AE,4196526,2019/04/19,17:30:00.178,2019/04/19,17:30:00.178,,20350.0,,,49.3423,7.6086,,,0,0,0,0\n" +
                        "MSG,0,3,5046545,4D0111,5046545,2019/04/19,17:30:00.215,2019/04/19,17:30:00.215,,0.0,,59.06,49.6179,6.1884,,,0,0,0,1\n" +
                        "MSG,0,3,3958149,3C6585,3958149,2019/04/19,17:30:00.216,2019/04/19,17:30:00.216,,29900.0,,,48.85,8.6014,,,0,0,0,0\n" +
                        "MSG,0,3,4196526,4008AE,4196526,2019/04/19,17:30:00.225,2019/04/19,17:30:00.225,,,343.59,118.13,,,-7.48,,,,,\n" +
                        "MSG,0,3,4224849,407751,4224849,2019/04/19,17:30:00.225,2019/04/19,17:30:00.225,,35000.0,,,49.4512,7.2606,,,0,0,0,0\n" +
                        "MSG,0,3,4921884,4B1A1C,4921884,2019/04/19,17:30:00.239,2019/04/19,17:30:00.239,,37000.0,,,49.6684,8.4823,,,0,0,0,0",
                recording, UTF_8);
        final EngineManager engineManager = new EngineManager(new Recording(recording, firstDate),
                newArrayList(action("NOT_EXISTING", timeWindow(0, 100), parameters(bstTarget("ALL")))),
                new ActionLogger());
        assertFalse(engineManager.run().exists());
    }

    @Test(expected = UnrecognizedRecordingException.class)
    public void actionEngine_run_file_bad_recording_actionKO() throws Exception {
        final long firstDate = 1606904067000L;
        final File recording = File.createTempFile("recording", ".dring");
        write("MSG,0,3,4216373,405635,4216373,2019/04/19,17:30:00.052,2019/04/19,17:30:00.052,,38000.0,,,51.2078,7.0869,,,0,0,0,0\n" +
                        "MSG,0,3,4196341,4007F5,4196341,2019/04/19,17:30:00.102,2019/04/19,17:30:00.102,,38000.0,,,47.7235,7.6864,,,0,0,0,0\n" +
                        "MSG,0,3,4197737,400D69,4197737,2019/04/19,17:30:00.120,2019/04/19,17:30:00.120,,38000.0,,,49.3943,2.8343,,,0,0,0,0\n" +
                        "MSG,0,3,10610299,A1E67B,10610299,2019/04/19,17:30:00.140,2019/04/19,17:30:00.140,,16625.0,,,50.4073,8.2464,,,0,0,0,0\n" +
                        "MSG,0,3,3146937,3004B9,3146937,2019/04/19,17:30:00.159,2019/04/19,17:30:00.159,,28575.0,,,48.8645,4.2382,,,0,0,0,0\n" +
                        "MSG,0,3,3958500,3C66E4,3958500,2019/04/19,17:30:00.160,2019/04/19,17:30:00.160,,21750.0,,,50.3645,6.473,,,0,0,0,0\n" +
                        "MSG,0,3,5022243,4CA223,5022243,2019/04/19,17:30:00.163,2019/04/19,17:30:00.163,,37000.0,,,49.8471,7.7982,,,0,0,0,0\n" +
                        "MSG,0,3,4457005,44022D,4457005,2019/04/19,17:30:00.164,2019/04/19,17:30:00.164,,,429.25,105.82,,,0.0,,,,,\n" +
                        "MSG,0,3,4196526,4008AE,4196526,2019/04/19,17:30:00.178,2019/04/19,17:30:00.178,,20350.0,,,49.3423,7.6086,,,0,0,0,0\n" +
                        "MSG,0,3,5046545,4D0111,5046545,2019/04/19,17:30:00.215,2019/04/19,17:30:00.215,,0.0,,59.06,49.6179,6.1884,,,0,0,0,1\n" +
                        "MSG,0,3,3958149,3C6585,3958149,2019/04/19,17:30:00.216,2019/04/19,17:30:00.216,,29900.0,,,48.85,8.6014,,,0,0,0,0\n" +
                        "MSG,0,3,4196526,4008AE,4196526,2019/04/19,17:30:00.225,2019/04/19,17:30:00.225,,,343.59,118.13,,,-7.48,,,,,\n" +
                        "MSG,0,3,4224849,407751,4224849,2019/04/19,17:30:00.225,2019/04/19,17:30:00.225,,35000.0,,,49.4512,7.2606,,,0,0,0,0\n" +
                        "MSG,0,3,4921884,4B1A1C,4921884,2019/04/19,17:30:00.239,2019/04/19,17:30:00.239,,37000.0,,,49.6684,8.4823,,,0,0,0,0",
                recording, UTF_8);
        final EngineManager engineManager = new EngineManager(new Recording(recording, firstDate),
                newArrayList(action("NOT_EXISTING", timeWindow(0, 100), parameters(bstTarget("ALL")))),
                new ActionLogger());
        assertFalse(engineManager.run().exists());
    }

    @Test(expected = FileNotFoundException.class)
    public void actionEngine_run_fileKO_actionOK() throws Exception {
        final long firstDate = 1606904067000L;
        final EngineManager engineManager = new EngineManager(new Recording(new File("noRecording.bst"), firstDate),
                newArrayList(alteration(timeWindow(0, 100), parameters(bstTarget("ALL")))),
                new ActionLogger());
        assertFalse(engineManager.run().exists());
    }
}
