package fdit.alteration.core.incident;

import com.fasterxml.jackson.databind.ObjectMapper;
import fdit.alteration.core.utils.StreamUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

public class IncidentDeserializer {

    private final File incidentFile;

    public IncidentDeserializer(final File incidentFile) {
        this.incidentFile = incidentFile;
    }

    public Incident deserialize(ObjectMapper mapper) throws IOException {
        final String content = StreamUtils.inputStreamToString(Files.newInputStream(incidentFile.toPath()));
        return mapper.readValue(content, Incident.class);
    }
}