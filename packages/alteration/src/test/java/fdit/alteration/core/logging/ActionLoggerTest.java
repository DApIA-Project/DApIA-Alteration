package fdit.alteration.core.logging;

import fdit.alteration.core.engine.EngineManager;
import fdit.alteration.core.incident.Recording;
import org.junit.Test;

import java.io.File;

import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.collect.Sets.newHashSet;
import static com.google.common.io.Files.write;
import static fdit.alteration.core.incident.IncidentHelper.*;
import static fdit.alteration.core.incident.Parameter.*;
import static java.nio.charset.StandardCharsets.UTF_8;
import static org.junit.Assert.assertEquals;

public class ActionLoggerTest {

    @Test
    public void baseStation1Action5Aircraft() throws Exception {
        final long startTime = 1555695000052L;
        final File recording = File.createTempFile("recording", ".bst");
        write("MSG,0,3,4216373,405635,4216373,2019/04/19,17:30:00.052,2019/04/19,17:30:00.052,,38000.0,,,51.2078,7.0869,,,0,0,0,0\n" +
                        "MSG,0,3,4196341,4007F5,4196341,2019/04/19,17:30:01.102,2019/04/19,17:30:01.102,,38000.0,,,47.7235,7.6864,,,0,0,0,0\n" +
                        "MSG,0,3,4197737,400D69,4197737,2019/04/19,17:30:02.120,2019/04/19,17:30:02.120,,38000.0,,,49.3943,2.8343,,,0,0,0,0\n" +
                        "MSG,0,3,10610299,A1E67B,10610299,2019/04/19,17:30:03.140,2019/04/19,17:30:03.140,,16625.0,,,50.4073,8.2464,,,0,0,0,0\n" +
                        "MSG,0,3,3146937,3004B9,3146937,2019/04/19,17:30:04.159,2019/04/19,17:30:04.159,,28575.0,,,48.8645,4.2382,,,0,0,0,0\n" +
                        "MSG,0,3,3958500,3C66E4,3958500,2019/04/19,17:30:05.160,2019/04/19,17:30:05.160,,21750.0,,,50.3645,6.473,,,0,0,0,0\n" +
                        "MSG,0,3,5022243,4CA223,5022243,2019/04/19,17:30:06.163,2019/04/19,17:30:06.163,,37000.0,,,49.8471,7.7982,,,0,0,0,0\n" +
                        "MSG,0,3,3146937,3004B9,3146937,2019/04/19,17:30:07.164,2019/04/19,17:30:07.164,,,429.25,105.82,,,0.0,,,,,\n" +
                        "MSG,0,3,4196526,4008AE,4196526,2019/04/19,17:30:08.178,2019/04/19,17:30:08.178,,20350.0,,,49.3423,7.6086,,,0,0,0,0\n" +
                        "MSG,0,3,5046545,4D0111,5046545,2019/04/19,17:30:09.215,2019/04/19,17:30:09.215,,0.0,,59.06,49.6179,6.1884,,,0,0,0,1\n" +
                        "MSG,0,3,3958149,3C6585,3958149,2019/04/19,17:30:10.216,2019/04/19,17:30:10.216,,29900.0,,,48.85,8.6014,,,0,0,0,0\n" +
                        "MSG,0,3,4196526,4008AE,4196526,2019/04/19,17:30:11.225,2019/04/19,17:30:11.225,,,343.59,118.13,,,-7.48,,,,,\n" +
                        "MSG,0,3,4224849,407751,4224849,2019/04/19,17:30:12.225,2019/04/19,17:30:12.225,,35000.0,,,49.4512,7.2606,,,0,0,0,0\n" +
                        "MSG,0,3,4921884,4B1A1C,4921884,2019/04/19,17:30:13.239,2019/04/19,17:30:13.239,,37000.0,,,49.6684,8.4823,,,0,0,0,0",
                recording, UTF_8);
        final ActionLogger logger = new ActionLogger();
        final EngineManager engineManager = new EngineManager(new Recording(recording, startTime),
                newArrayList(alteration(
                        timeWindow(4000, 10000),
                        parameters(bstTarget("ALL"), parameter(CHARAC_ALTITUDE, "15000")))),
                logger);
        engineManager.run();
        assertEquals(1, logger.getActionNumber());
        assertEquals(5, logger.getAlteredMessageNumber());
        assertEquals(5, logger.getModifiedMessageNumber());
        assertEquals(0, logger.getCreatedMessageNumber());
        assertEquals(0, logger.getDeletedMessageNumber());
        assertEquals(newHashSet("3004B9", "3C66E4", "4CA223", "3004B9", "4008AE", "4D0111"), logger.getIcaos());
        assertEquals(5056, logger.getActionDuration());
    }

    @Test
    public void baseStation1Action5Aircraft2Parameters() throws Exception {
        final long startTime = 1555695000052L;
        final File recording = File.createTempFile("recording", ".bst");
        write("MSG,0,3,4216373,405635,4216373,2019/04/19,17:30:00.052,2019/04/19,17:30:00.052,,38000.0,,,51.2078,7.0869,,,0,0,0,0\n" +
                        "MSG,0,3,4196341,4007F5,4196341,2019/04/19,17:30:01.102,2019/04/19,17:30:01.102,,38000.0,,,47.7235,7.6864,,,0,0,0,0\n" +
                        "MSG,0,3,4197737,400D69,4197737,2019/04/19,17:30:02.120,2019/04/19,17:30:02.120,,38000.0,,,49.3943,2.8343,,,0,0,0,0\n" +
                        "MSG,0,3,10610299,A1E67B,10610299,2019/04/19,17:30:03.140,2019/04/19,17:30:03.140,,16625.0,,,50.4073,8.2464,,,0,0,0,0\n" +
                        "MSG,0,3,3146937,3004B9,3146937,2019/04/19,17:30:04.159,2019/04/19,17:30:04.159,,28575.0,,,48.8645,4.2382,,,0,0,0,0\n" +
                        "MSG,0,3,3958500,3C66E4,3958500,2019/04/19,17:30:05.160,2019/04/19,17:30:05.160,,21750.0,,,50.3645,6.473,,,0,0,0,0\n" +
                        "MSG,0,3,5022243,4CA223,5022243,2019/04/19,17:30:06.163,2019/04/19,17:30:06.163,,37000.0,,,49.8471,7.7982,,,0,0,0,0\n" +
                        "MSG,0,3,3146937,3004B9,3146937,2019/04/19,17:30:07.164,2019/04/19,17:30:07.164,,,429.25,105.82,,,0.0,,,,,\n" +
                        "MSG,0,3,4196526,4008AE,4196526,2019/04/19,17:30:08.178,2019/04/19,17:30:08.178,,20350.0,,,49.3423,7.6086,,,0,0,0,0\n" +
                        "MSG,0,3,5046545,4D0111,5046545,2019/04/19,17:30:09.215,2019/04/19,17:30:09.215,,0.0,,59.06,49.6179,6.1884,,,0,0,0,1\n" +
                        "MSG,0,3,3958149,3C6585,3958149,2019/04/19,17:30:10.216,2019/04/19,17:30:10.216,,29900.0,,,48.85,8.6014,,,0,0,0,0\n" +
                        "MSG,0,3,4196526,4008AE,4196526,2019/04/19,17:30:11.225,2019/04/19,17:30:11.225,,,343.59,118.13,,,-7.48,,,,,\n" +
                        "MSG,0,3,4224849,407751,4224849,2019/04/19,17:30:12.225,2019/04/19,17:30:12.225,,35000.0,,,49.4512,7.2606,,,0,0,0,0\n" +
                        "MSG,0,3,4921884,4B1A1C,4921884,2019/04/19,17:30:13.239,2019/04/19,17:30:13.239,,37000.0,,,49.6684,8.4823,,,0,0,0,0",
                recording, UTF_8);
        final ActionLogger logger = new ActionLogger();
        final EngineManager engineManager = new EngineManager(new Recording(recording, startTime),
                newArrayList(alteration(
                        timeWindow(4000, 10000),
                        parameters(bstTarget("ALL"),
                                parameter(CHARAC_ALTITUDE, "15000"),
                                parameter(CHARAC_LATITUDE, "0.3", MODE_OFFSET)))),
                logger);
        engineManager.run();
        assertEquals(1, logger.getActionNumber());
        assertEquals(5, logger.getAlteredMessageNumber());
        assertEquals(5, logger.getModifiedMessageNumber());
        assertEquals(0, logger.getCreatedMessageNumber());
        assertEquals(0, logger.getDeletedMessageNumber());
        assertEquals(newHashSet("3004B9", "3C66E4", "4CA223", "3004B9", "4008AE", "4D0111"), logger.getIcaos());
        assertEquals(5056, logger.getActionDuration());
    }

    @Test
    public void baseStation2Action5Aircraft() throws Exception {
        final long startTime = 1555695000052L;
        final File recording = File.createTempFile("recording", ".bst");
        write("MSG,0,3,4216373,405635,4216373,2019/04/19,17:30:00.052,2019/04/19,17:30:00.052,,38000.0,,,51.2078,7.0869,,,0,0,0,0\n" +
                        "MSG,0,3,4196341,4007F5,4196341,2019/04/19,17:30:01.102,2019/04/19,17:30:01.102,,38000.0,,,47.7235,7.6864,,,0,0,0,0\n" +
                        "MSG,0,3,4197737,400D69,4197737,2019/04/19,17:30:02.120,2019/04/19,17:30:02.120,,38000.0,,,49.3943,2.8343,,,0,0,0,0\n" +
                        "MSG,0,3,10610299,A1E67B,10610299,2019/04/19,17:30:03.140,2019/04/19,17:30:03.140,,16625.0,,,50.4073,8.2464,,,0,0,0,0\n" +
                        "MSG,0,3,3146937,3004B9,3146937,2019/04/19,17:30:04.159,2019/04/19,17:30:04.159,,28575.0,,,48.8645,4.2382,,,0,0,0,0\n" +
                        "MSG,0,3,3958500,3C66E4,3958500,2019/04/19,17:30:05.160,2019/04/19,17:30:05.160,,21750.0,,,50.3645,6.473,,,0,0,0,0\n" +
                        "MSG,0,3,5022243,4CA223,5022243,2019/04/19,17:30:06.163,2019/04/19,17:30:06.163,,37000.0,,,49.8471,7.7982,,,0,0,0,0\n" +
                        "MSG,0,3,3146937,3004B9,3146937,2019/04/19,17:30:07.164,2019/04/19,17:30:07.164,,,429.25,105.82,,,0.0,,,,,\n" +
                        "MSG,0,3,4196526,4008AE,4196526,2019/04/19,17:30:08.178,2019/04/19,17:30:08.178,,20350.0,,,49.3423,7.6086,,,0,0,0,0\n" +
                        "MSG,0,3,5046545,4D0111,5046545,2019/04/19,17:30:09.215,2019/04/19,17:30:09.215,,0.0,,59.06,49.6179,6.1884,,,0,0,0,1\n" +
                        "MSG,0,3,3958149,3C6585,3958149,2019/04/19,17:30:10.216,2019/04/19,17:30:10.216,,29900.0,,,48.85,8.6014,,,0,0,0,0\n" +
                        "MSG,0,3,4196526,4008AE,4196526,2019/04/19,17:30:11.225,2019/04/19,17:30:11.225,,,343.59,118.13,,,-7.48,,,,,\n" +
                        "MSG,0,3,4224849,407751,4224849,2019/04/19,17:30:12.225,2019/04/19,17:30:12.225,,35000.0,,,49.4512,7.2606,,,0,0,0,0\n" +
                        "MSG,0,3,4921884,4B1A1C,4921884,2019/04/19,17:30:13.239,2019/04/19,17:30:13.239,,37000.0,,,49.6684,8.4823,,,0,0,0,0",
                recording, UTF_8);
        final ActionLogger logger = new ActionLogger();
        final EngineManager engineManager = new EngineManager(
                new Recording(recording, startTime),
                newArrayList(
                        alteration(
                                timeWindow(4000, 10000),
                                parameters(bstTarget("ALL"), parameter(CHARAC_ALTITUDE, "15000"))),
                        alteration(
                                timeWindow(6000, 12000),
                                parameters(bstTarget("ALL"), parameter(CHARAC_LATITUDE, "0.2", MODE_OFFSET)))),
                logger);
        engineManager.run();
        assertEquals(2, logger.getActionNumber());
        assertEquals(9, logger.getAlteredMessageNumber());
        assertEquals(9, logger.getModifiedMessageNumber());
        assertEquals(0, logger.getCreatedMessageNumber());
        assertEquals(0, logger.getDeletedMessageNumber());
        assertEquals(newHashSet("3C66E4", "4CA223", "3004B9", "4D0111", "3C6585", "4008AE"), logger.getIcaos());
        assertEquals(6057, logger.getActionDuration());
    }
}