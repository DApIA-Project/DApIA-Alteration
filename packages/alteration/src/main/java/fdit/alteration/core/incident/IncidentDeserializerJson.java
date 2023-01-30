package fdit.alteration.core.incident;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import fdit.alteration.core.utils.StreamUtils;
import java.time.LocalDate;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

public class IncidentDeserializerJson {

    private final File incidentFile;

    public IncidentDeserializerJson(final File incidentFile) {
        this.incidentFile = incidentFile;
    }

    public IncidentJson deserialize() throws IOException {

        final JsonMapper mapper = new JsonMapper();
        final String content = StreamUtils.inputStreamToString(new FileInputStream(incidentFile));
        return mapper.readValue(content, IncidentJson.class);




    }
}
