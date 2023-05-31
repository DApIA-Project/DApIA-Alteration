package fdit.alteration.core.incident;

import com.fasterxml.jackson.databind.json.JsonMapper;
import org.junit.Test;

import java.io.File;
import java.io.IOException;

import static com.google.common.io.Files.write;
import static fdit.alteration.core.incident.IncidentHelper.*;
import static fdit.alteration.core.incident.Parameter.MODE_SIMPLE;
import static java.nio.charset.StandardCharsets.UTF_8;
import static fdit.testTools.PredicateAssert.assertThat;

public class IncidentDeserializerJsonTest {

    @Test
    public void deserialize_json_test_1() throws IOException {
        final File incidentFile = File.createTempFile("incidentjson", ".json");
        write("{" +

                        "\"sensors\": {\n" +
                            "\"sensor\":\n" +
                                "[{\n" +
                                    "\"sensorType\": \"SBS\",\n" +
                                    "\"sID\": \"ALL\",\n" +
                                    "\"record\": \"\",\n" +
                                    "\"filter\": \"\",\n" +
                                    "\"action\": [\n" +
                                            "{\n" +
                                                "\"alterationType\": \"ALTERATION\",\n" +
                                                "\"scope\": {\n" +
                                            "\"type\": \"timeWindow\",\n" +
                                                    "\"lowerBound\": \"10\",\n" +
                                                    "\"upperBound\": \"1050\"\n" +
                                                "},\n" +
                                            "\"parameters\": {\n" +
                                                    "\"target\": \n" +
                                                        "{\n" +
                                                            "\"identifier\": \"hexIdent\",\n" +
                                                                "\"value\": \"ALL\"\n" +
                                                        "}\n" +
                                                    ",\n" +
                                                    "\"parameter\": [\n" +
                                                        "{\n" +
                                                            "\"mode\": \"simple\",\n" +
                                                                "\"key\": \"ICAO\",\n" +
                                                                "\"value\": \"39AC47\"\n" +
                                                        "},\n" +
                                                        "{\n" +
                                                            "\"mode\": \"simple\",\n" +
                                                                "\"key\": \"CALLSIGN\",\n" +
                                                                "\"value\": \"SAMU39\"\n" +
                                                        "}\n" +
                                                    "]\n" +
                                                "}\n" +
                                            "}\n" +
                                    "]\n" +
                                "}]\n" +
                            "\n" +
                        "}\n" +

                "}\n", incidentFile, UTF_8);

        final IncidentDeserializer deserializer = new IncidentDeserializer(incidentFile);
        System.out.println(deserializer.deserialize(new JsonMapper()).getSensors().size());
        assertThat(deserializer.deserialize(new JsonMapper()),
                IncidentHelper.anIncident(IncidentHelper.withSensors(
                        aSensor("SBS", "ALL", "", "",
                                withActions(
                                        anAction("ALTERATION",
                                                withScopeTimeWindow(10, 1050),
                                                withParameters(
                                                        onTargetHexIdent("ALL"),
                                                        aParameter(MODE_SIMPLE, "ICAO", "39AC47"),
                                                        aParameter(MODE_SIMPLE, "CALLSIGN", "SAMU39")))
                                        )))));

    }


    @Test
    public void deserialize_json_test_2() throws IOException {
        final File incidentFile = File.createTempFile("incidentjson", ".json");
        write("{" +

                "\"sensors\": {\n" +
                "\"sensor\":\n" +
                "[{\n" +
                "\"sensorType\": \"SBS\",\n" +
                "\"sID\": \"ALL\",\n" +
                "\"record\": \"../../../server/src/zigzag.sbs\",\n" +
                "\"filter\": \"\",\n" +
                "\"action\": [\n" +
                "{\n" +
                "\"alterationType\": \"ALTERATION\",\n" +
                "\"scope\": {\n" +
                "\"type\": \"timeWindow\",\n" +
                "\"lowerBound\": \"7\",\n" +
                "\"upperBound\": \"750\"\n" +
                "},\n" +
                "\"parameters\": {\n" +
                "\"target\": \n" +
                "{\n" +
                "\"identifier\": \"hexIdent\",\n" +
                "\"value\": \"ALL\"\n" +
                "}\n" +
                ",\n" +
                "\"parameter\": [\n" +
                "{\n" +
                "\"mode\": \"simple\",\n" +
                "\"key\": \"ICAO\",\n" +
                "\"value\": \"39AC47\"\n" +
                "},\n" +
                "{\n" +
                "\"mode\": \"simple\",\n" +
                "\"key\": \"CALLSIGN\",\n" +
                "\"value\": \"SAMU25\"\n" +
                "}\n" +
                "]\n" +
                "}\n" +
                "}\n" +
                "]\n" +
                "}]\n" +
                "\n" +
                "}\n" +

                "}\n", incidentFile, UTF_8);

        final IncidentDeserializer deserializer = new IncidentDeserializer(incidentFile);
        System.out.println(deserializer.deserialize(new JsonMapper()).getSensors().size());
        assertThat(deserializer.deserialize(new JsonMapper()),
                anIncident(IncidentHelper.withSensors(
                        aSensor("SBS", "ALL", "../../../server/src/zigzag.sbs", "",
                                withActions(
                                        anAction("ALTERATION",
                                                withScopeTimeWindow(7, 750),
                                                withParameters(
                                                        onTargetHexIdent("ALL"),
                                                        aParameter(MODE_SIMPLE, "ICAO", "39AC47"),
                                                        aParameter(MODE_SIMPLE, "CALLSIGN", "SAMU25")))
                                )))));

    }

    @Test
    public void deserialize_json_test_3() throws IOException {
        final File incidentFile = File.createTempFile("incidentjson", ".json");
        write("{" +

                "\"sensors\": {\n" +
                "\"sensor\":\n" +
                "[{\n" +
                "\"sensorType\": \"SBS\",\n" +
                "\"sID\": \"ALL\",\n" +
                "\"record\": \"../../temp/2022_07_toulouse_SAMUCF.sbs\",\n" +
                "\"filter\": \"\",\n" +
                "\"action\": [\n" +
                "{\n" +
                "\"alterationType\": \"ALTERATION\",\n" +
                "\"scope\": {\n" +
                "\"type\": \"timeWindow\",\n" +
                "\"lowerBound\": \"0\",\n" +
                "\"upperBound\": \"4200\"\n" +
                "},\n" +
                "\"parameters\": {\n" +
                "\"target\": \n" +
                "{\n" +
                "\"identifier\": \"hexIdent\",\n" +
                "\"value\": \"ALL\"\n" +
                "}\n" +
                ",\n" +
                "\"parameter\": [\n" +
                "{\n" +
                "\"mode\": \"simple\",\n" +
                "\"key\": \"CALLSIGN\",\n" +
                "\"value\": \"SAMU39\"\n" +
                "}\n" +
                "]\n" +
                "}\n" +
                "}\n" +
                "]\n" +
                "}]\n" +
                "\n" +
                "}\n" +

                "}\n", incidentFile, UTF_8);

        final IncidentDeserializer deserializer = new IncidentDeserializer(incidentFile);
        System.out.println(deserializer.deserialize(new JsonMapper()).getSensors().size());
        assertThat(deserializer.deserialize(new JsonMapper()),
                anIncident(IncidentHelper.withSensors(
                        aSensor("SBS", "ALL", "../../temp/2022_07_toulouse_SAMUCF.sbs", "",
                                withActions(
                                        anAction("ALTERATION",
                                                withScopeTimeWindow(0, 4200),
                                                withParameters(
                                                        onTargetHexIdent("ALL"),
                                                        aParameter(MODE_SIMPLE, "CALLSIGN", "SAMU39")))
                                )))));

    }
}