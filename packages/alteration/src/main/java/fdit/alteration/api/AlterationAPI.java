package fdit.alteration.api;

import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import fdit.alteration.core.engine.EngineManager;
import fdit.alteration.core.engine.EngineParameters;
import fdit.alteration.core.incident.IncidentDeserializer;
import fdit.alteration.core.incident.Recording;
import fdit.alteration.core.incident.Sensor;
import fdit.alteration.core.logging.ActionLogger;
import org.apache.commons.cli.CommandLine;

import java.io.File;
import java.io.FileNotFoundException;

import static com.google.common.io.Files.copy;
import static org.apache.commons.io.FilenameUtils.getExtension;
import static org.apache.commons.io.FilenameUtils.separatorsToSystem;

public class AlterationAPI {

    private AlterationAPI() {

    }

    public static void startAlteration(final File destination, final File incidentFile) throws Exception {
        startAlteration(destination, incidentFile, false, new EngineParameters(), "modified", "");
    }

    public static void startAlteration(final File destination,
                                       final File incidentFile,
                                       final boolean labeled) throws Exception {
        startAlteration(destination, incidentFile, false, labeled);
    }

    public static void startAlteration(final File destination,
                                       final File incidentFile,
                                       final boolean logResults,
                                       final boolean labeled) throws Exception {
        startAlteration(destination, incidentFile, logResults, new EngineParameters(labeled), "modified", "");
    }

    public static void startAlteration(final File destination,
                                       final File incidentFile,
                                       final boolean logResults,
                                       final boolean labeled,
                                       final String prefix,
                                       final String suffix) throws Exception {
        startAlteration(destination, incidentFile, logResults, new EngineParameters(labeled), prefix, suffix);
    }


    public static void startAlteration(final File destination,
                                       final File incidentFile,
                                       final boolean logResults,
                                       final CommandLine commandLine,
                                       final String prefix,
                                       final String suffix) throws Exception {
        startAlteration(destination, incidentFile, logResults, new EngineParameters(commandLine), prefix, suffix);
    }

    public static void startAlteration(final File destination,
                                       final File incidentFile,
                                       final boolean logResults,
                                       final EngineParameters parameters,
                                       final String prefix,
                                       final String suffix) throws Exception {
        for (final Sensor sensor : new IncidentDeserializer(incidentFile).deserialize(new XmlMapper()).getSensors()) {
            final File recordingFile = new File(incidentFile.getParent() +
                    separatorsToSystem("/") +
                    sensor.getRecord());
            if (!recordingFile.exists() || !recordingFile.isFile()) {
                throw new FileNotFoundException(recordingFile.getAbsolutePath());
            }
            final Recording recording = new Recording(recordingFile, sensor.getFirstDate());
            final ActionLogger logger = new ActionLogger();
            final EngineManager engineManager = new EngineManager(recording, sensor.getActions(), logger, parameters);
            recording.setFile(engineManager.run());
            copy(recording.getFile(), new File(
                    destination,
                    prefix + "_" +
                            sensor.getsID() + "_" +
                            suffix + "."
                            + getExtension(recordingFile.getName())));
            if (logResults) {
                logger.print(new File(recordingFile.getParent(), "metrics.csv"));
            }
        }
    }
}