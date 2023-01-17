package fdit.alteration.core.incident;

import org.junit.Test;

import java.io.File;
import java.io.IOException;

import static com.google.common.io.Files.write;
import static fdit.alteration.core.incident.IncidentHelper.*;
import static fdit.alteration.core.incident.Parameter.MODE_OFFSET;
import static fdit.alteration.core.incident.Parameter.MODE_SIMPLE;
import static java.nio.charset.StandardCharsets.UTF_8;
import static fdit.testTools.PredicateAssert.assertThat;

public class IncidentDeserializerTest {

    @Test
    public void deserialize_test_1() throws IOException {
        final File incidentFile = File.createTempFile("incident", ".xml");
        write("<parameters>\n" +
                "    <sensors>\n" +
                "        <sensor sensorType=\"SBS\">\n" +
                "            <sID>ALL</sID>\n" +
                "            <record>../recordings/.VwHQorPfkuiBCN6l_ywV_g__/sbs_1305686021.json</record>\n" +
                "            <filter />\n" +
                "            <action alterationType=\"ALTERATION\">\n" +
                "                <scope type=\"timeWindow\">\n" +
                "                    <lowerBound>450000</lowerBound>\n" +
                "                    <upperBound>636649</upperBound>\n" +
                "                </scope>\n" +
                "                <parameters>\n" +
                "                    <target identifier=\"hexIdent\">ALL</target>\n" +
                "                    <parameter mode=\"simple\">\n" +
                "                        <key>altitude</key>\n" +
                "                        <value>1200</value>\n" +
                "                    </parameter>\n" +
                "                </parameters>\n" +
                "            </action>\n" +
                "            <action alterationType=\"ALTERATION\">\n" +
                "                <scope type=\"timeWindow\">\n" +
                "                    <lowerBound>450000</lowerBound>\n" +
                "                    <upperBound>636649</upperBound>\n" +
                "                </scope>\n" +
                "                <parameters>\n" +
                "                    <target identifier=\"hexIdent\">ALL</target>\n" +
                "                    <parameter mode=\"simple\">\n" +
                "                        <key>squawk</key>\n" +
                "                        <value>7700</value>\n" +
                "                    </parameter>\n" +
                "                </parameters>\n" +
                "            </action>\n" +
                "        </sensor>\n" +
                "    </sensors>\n" +
                "</parameters>", incidentFile, UTF_8);

        final IncidentDeserializer deserializer = new IncidentDeserializer(incidentFile);
        assertThat(deserializer.deserialize(),
                anIncident(withSensors(
                        aSensor("SBS", "ALL", "../recordings/.VwHQorPfkuiBCN6l_ywV_g__/sbs_1305686021.json", "",
                                withActions(
                                        anAction("ALTERATION",
                                                withScopeTimeWindow(450000, 636649),
                                                withParameters(
                                                        onTargetHexIdent("ALL"),
                                                        aParameter(MODE_SIMPLE, "altitude", "1200"))),
                                        anAction("ALTERATION",
                                                withScopeTimeWindow(450000, 636649),
                                                withParameters(
                                                        onTargetHexIdent("ALL"),
                                                        aParameter(MODE_SIMPLE, "squawk", "7700"))))))));

    }

    @Test
    public void deserialize_test_2() throws IOException {
        final File incidentFile = File.createTempFile("incident", ".xml");
        write("<parameters>\n" +
                "  <sensors>\n" +
                "    <sensor sensorType=\"BEAST\">\n" +
                "      <sID>ALL</sID>\n" +
                "      <record>../recordings/.rxxyTBxKvc53k_Sf3rJ94w__/sbs_758628764.json</record>\n" +
                "      <filter />\n" +
                "      <action alterationType=\"ALTERATION\">\n" +
                "        <scope type=\"timeWindow\">\n" +
                "          <lowerBound>466000</lowerBound>\n" +
                "          <upperBound>486000</upperBound>\n" +
                "        </scope>\n" +
                "        <parameters>\n" +
                "          <target identifier=\"hexIdent\">480C1A</target>\n" +
                "          <parameter mode=\"simple\">\n" +
                "            <key>squawk</key>\n" +
                "            <value>7500</value>\n" +
                "          </parameter>\n" +
                "        </parameters>\n" +
                "      </action>\n" +
                "      <action alterationType=\"ALTERATION\">\n" +
                "        <scope type=\"timeWindow\">\n" +
                "          <lowerBound>560000</lowerBound>\n" +
                "          <upperBound>584000</upperBound>\n" +
                "        </scope>\n" +
                "        <parameters>\n" +
                "          <target identifier=\"hexIdent\">480C1A</target>\n" +
                "          <parameter mode=\"simple\">\n" +
                "            <key>squawk</key>\n" +
                "            <value>7500</value>\n" +
                "          </parameter>\n" +
                "        </parameters>\n" +
                "      </action>\n" +
                "      <action alterationType=\"ALTERATION\">\n" +
                "        <scope type=\"timeWindow\">\n" +
                "          <lowerBound>617000</lowerBound>\n" +
                "          <upperBound>625000</upperBound>\n" +
                "        </scope>\n" +
                "        <parameters>\n" +
                "          <target identifier=\"hexIdent\">480C1A</target>\n" +
                "          <parameter mode=\"simple\">\n" +
                "            <key>squawk</key>\n" +
                "            <value>7500</value>\n" +
                "          </parameter>\n" +
                "        </parameters>\n" +
                "      </action>\n" +
                "      <action alterationType=\"ALTERATION\">\n" +
                "        <scope type=\"timeWindow\">\n" +
                "          <lowerBound>682000</lowerBound>\n" +
                "          <upperBound>736000</upperBound>\n" +
                "        </scope>\n" +
                "        <parameters>\n" +
                "          <target identifier=\"hexIdent\">480C1A</target>\n" +
                "          <parameter mode=\"simple\">\n" +
                "            <key>squawk</key>\n" +
                "            <value>7500</value>\n" +
                "          </parameter>\n" +
                "        </parameters>\n" +
                "      </action>\n" +
                "    </sensor>\n" +
                "  </sensors>\n" +
                "</parameters>", incidentFile, UTF_8);

        final IncidentDeserializer deserializer = new IncidentDeserializer(incidentFile);
        assertThat(deserializer.deserialize(),
                anIncident(withSensors(
                        aSensor("BEAST", "ALL", "../recordings/.rxxyTBxKvc53k_Sf3rJ94w__/sbs_758628764.json", "",
                                withActions(
                                        anAction("ALTERATION",
                                                withScopeTimeWindow(466000, 486000),
                                                withParameters(
                                                        onTargetHexIdent("480C1A"),
                                                        aParameter(MODE_SIMPLE, "squawk", "7500"))),
                                        anAction("ALTERATION",
                                                withScopeTimeWindow(560000, 584000),
                                                withParameters(
                                                        onTargetHexIdent("480C1A"),
                                                        aParameter(MODE_SIMPLE, "squawk", "7500"))),
                                        anAction("ALTERATION",
                                                withScopeTimeWindow(617000, 625000),
                                                withParameters(
                                                        onTargetHexIdent("480C1A"),
                                                        aParameter(MODE_SIMPLE, "squawk", "7500"))),
                                        anAction("ALTERATION",
                                                withScopeTimeWindow(682000, 736000),
                                                withParameters(
                                                        onTargetHexIdent("480C1A"),
                                                        aParameter(MODE_SIMPLE, "squawk", "7500"))))))));

    }

    @Test
    public void deserialize_test_3() throws IOException {
        final File incidentFile = File.createTempFile("incident", ".xml");
        write("<parameters>\n" +
                "  <sensors>\n" +
                "    <sensor sensorType=\"BEAST\">\n" +
                "      <sID>d1728431-5a08-43b9-8f79-3017cd8550fa,d27f2fa5-9c9f-43af-a499-c3c038b191ae,ee4d8ad6-8e13-4028-94e4-4ecde89aa941</sID>\n" +
                "      <record>../recordings/.rxxyTBxKvc53k_Sf3rJ94w__/sbs_758628764.json</record>\n" +
                "      <filter />\n" +
                "      <action alterationType=\"DELETION\">\n" +
                "        <scope type=\"timeWindow\">\n" +
                "          <lowerBound>0</lowerBound>\n" +
                "          <upperBound>3599995</upperBound>\n" +
                "        </scope>\n" +
                "        <parameters>\n" +
                "          <target identifier=\"hexIdent\">4223681,3950945,5022552,5031125,3954417,4197119,4958451,5054722,5022376,4221667,4218127,4219433,4920856,4223684,4738228,5024666,3753204,3748643,5023831,3772896,4220524,3416266,11206562,11300801,3755023,4921601,4196474,4221804,3788448,5024018,5023220,4216371,4456496,3756233,3954411,3761377,4920846,3951265,4921342,5023760,3753205,4196955,3429909,3772899,4197120,4222510,3746540,4456648,12612676,3754485,5023352,3425356,4692557,4219971,4958693,4952169,5022947,4456631,5023324,3756236,3761394,4223216,4960577,3756224,4197587,3772900,4222009,4804813,11300769,5023008,7785843,3407809,5024352,5024074,655495,3754513,3961313,10487100,3769601,3897213,4223424,4222355,5024060,5023208,655430,10668034,5023270,172464,3754515,3778922,4921349,4220091,11048427,4763266,5024989,5023216,3761396,5022961,3954407,4451048,65853,5024705,11190582,131110,11076917,4219025,4921317,3769764,4509121,4935946,4198141,12607761,4509124,3429955,3753189,3746553,5023755,172205,4197590,4687080,3416592,4220756,3769614,5258678,3746537,4456754,5023745,4736066,3935396,4197161,4223652,5023513,3769769,4222152,3753209,7864836,5262926,3756231,4687776,3769761,3753706,3748642,5023092,4565623,4735961,3794031,4838284,4196040,12605498,3939447,7867205,3413518,3417489,5024365,4686860,3783160,4851948,3761588,3425864,3982015,3755015,4456549,4221827,9015310,4737902,3755027,5022955,11136398,3753208,3934804,4456954,3425860,3755017,3416198,4196878,3784303,5022229,5024671,4458142,5024962,4198519,3755026,4735366,4958924,14977962,131332,3769768,5024344,12588889,3794092,65884,4450236,3753705,4735310,3957862,655392,4701602,10572695,3769760,5023005,5022330,3957799,4921475,4221662,4457910,3957225,4196663,3772906,4456576,3981787,4920979,3428882,5022287,4735446,7869135,3755012,4736017,4838249,3957131,5024121,131361,3935402,7868474,11225190,5022245,3755022,3761218,3785761,5266580,131099,4197978,3934722,4571749,4921456,4499527,3753701,131333,4223358,3424791,5023350,4851107,4457132,4196472,3958610,3958274,3761390,4222354,131162,3755020,3957828,3768835,3957896,3756232,4220531,3761399,5054672,5023667,5054864,3425537,5024237,4197024,3428630,3776097,3951086,5024190,3761378,3756229,5312702,12603573,3756237,4936181,4220251,7405657,4837525,5023958,4736345,4921467,4921631,4805078,4224182,3958441,4595555,3746542,5054502,4220525,3424409,5046517,3147473,5023361,4509304,4223353,10565437,4740051,3761225,5023820,655387,3754498,4691036,4220623,4756000,4566071,9003980,4800774,5023891,4735331,4509285,3754480,4737744,5024111,4196404,4509133,5025724,4921468,3954421,3761568,3934704,172427,3751301,5023972,5023263,4221673,4456546,10672439,3993533,3746552,7634985,3755031,3977893,4441847,4224271,5258337,4220725,7867804,172435,3950736,4458556,4837545,3432584,4458658,5046489,10729490,4223682,5023913,4344037,5023360,3753700,3957902,4805265,5024939,5022538,4197085,5022164,3958028,11229595,4509303,4196475,4221184,7405658,11056992,4198621,4456794,3428888,3761221,4197811,5054690,14979734,4457872,5312703,4221539,3788450,4195723,3794130,4456683,3753696,4198387,4196531,3756227,4509293,3769770,4224295,3428419,4921477,4441571,8945956,4509290,3761380,4805254,4509263,4197583,4687157,3761574,4215976,4457946,3783972,4221195,3761585,3788449,4738862,3685634,3753198,10548300,5023756,4624625,5022299,12592071,5023211,3753207,3782080,4197969,5023267,4735326</target>\n" +
                "        </parameters>\n" +
                "      </action>\n" +
                "      <action alterationType=\"ALTERATION\">\n" +
                "        <scope type=\"timeWindow\">\n" +
                "          <lowerBound>560000</lowerBound>\n" +
                "          <upperBound>584000</upperBound>\n" +
                "        </scope>\n" +
                "        <parameters>\n" +
                "          <target identifier=\"hexIdent\">480C1A</target>\n" +
                "          <parameter mode=\"offset\">\n" +
                "            <key>altitude</key>\n" +
                "            <value>-2342</value>\n" +
                "          </parameter>\n" +
                "        </parameters>\n" +
                "      </action>\n" +
                "    </sensor>\n" +
                "  </sensors>\n" +
                "</parameters>", incidentFile, UTF_8);

        final IncidentDeserializer deserializer = new IncidentDeserializer(incidentFile);
        assertThat(deserializer.deserialize(),
                anIncident(withSensors(
                        aSensor("BEAST", "d1728431-5a08-43b9-8f79-3017cd8550fa,d27f2fa5-9c9f-43af-a499-c3c038b191ae,ee4d8ad6-8e13-4028-94e4-4ecde89aa941", "../recordings/.rxxyTBxKvc53k_Sf3rJ94w__/sbs_758628764.json", "",
                                withActions(
                                        anAction("DELETION",
                                                withScopeTimeWindow(0, 3599995),
                                                withParameters(
                                                        onTargetHexIdent("4223681,3950945,5022552,5031125,3954417,4197119,4958451,5054722,5022376,4221667,4218127,4219433,4920856,4223684,4738228,5024666,3753204,3748643,5023831,3772896,4220524,3416266,11206562,11300801,3755023,4921601,4196474,4221804,3788448,5024018,5023220,4216371,4456496,3756233,3954411,3761377,4920846,3951265,4921342,5023760,3753205,4196955,3429909,3772899,4197120,4222510,3746540,4456648,12612676,3754485,5023352,3425356,4692557,4219971,4958693,4952169,5022947,4456631,5023324,3756236,3761394,4223216,4960577,3756224,4197587,3772900,4222009,4804813,11300769,5023008,7785843,3407809,5024352,5024074,655495,3754513,3961313,10487100,3769601,3897213,4223424,4222355,5024060,5023208,655430,10668034,5023270,172464,3754515,3778922,4921349,4220091,11048427,4763266,5024989,5023216,3761396,5022961,3954407,4451048,65853,5024705,11190582,131110,11076917,4219025,4921317,3769764,4509121,4935946,4198141,12607761,4509124,3429955,3753189,3746553,5023755,172205,4197590,4687080,3416592,4220756,3769614,5258678,3746537,4456754,5023745,4736066,3935396,4197161,4223652,5023513,3769769,4222152,3753209,7864836,5262926,3756231,4687776,3769761,3753706,3748642,5023092,4565623,4735961,3794031,4838284,4196040,12605498,3939447,7867205,3413518,3417489,5024365,4686860,3783160,4851948,3761588,3425864,3982015,3755015,4456549,4221827,9015310,4737902,3755027,5022955,11136398,3753208,3934804,4456954,3425860,3755017,3416198,4196878,3784303,5022229,5024671,4458142,5024962,4198519,3755026,4735366,4958924,14977962,131332,3769768,5024344,12588889,3794092,65884,4450236,3753705,4735310,3957862,655392,4701602,10572695,3769760,5023005,5022330,3957799,4921475,4221662,4457910,3957225,4196663,3772906,4456576,3981787,4920979,3428882,5022287,4735446,7869135,3755012,4736017,4838249,3957131,5024121,131361,3935402,7868474,11225190,5022245,3755022,3761218,3785761,5266580,131099,4197978,3934722,4571749,4921456,4499527,3753701,131333,4223358,3424791,5023350,4851107,4457132,4196472,3958610,3958274,3761390,4222354,131162,3755020,3957828,3768835,3957896,3756232,4220531,3761399,5054672,5023667,5054864,3425537,5024237,4197024,3428630,3776097,3951086,5024190,3761378,3756229,5312702,12603573,3756237,4936181,4220251,7405657,4837525,5023958,4736345,4921467,4921631,4805078,4224182,3958441,4595555,3746542,5054502,4220525,3424409,5046517,3147473,5023361,4509304,4223353,10565437,4740051,3761225,5023820,655387,3754498,4691036,4220623,4756000,4566071,9003980,4800774,5023891,4735331,4509285,3754480,4737744,5024111,4196404,4509133,5025724,4921468,3954421,3761568,3934704,172427,3751301,5023972,5023263,4221673,4456546,10672439,3993533,3746552,7634985,3755031,3977893,4441847,4224271,5258337,4220725,7867804,172435,3950736,4458556,4837545,3432584,4458658,5046489,10729490,4223682,5023913,4344037,5023360,3753700,3957902,4805265,5024939,5022538,4197085,5022164,3958028,11229595,4509303,4196475,4221184,7405658,11056992,4198621,4456794,3428888,3761221,4197811,5054690,14979734,4457872,5312703,4221539,3788450,4195723,3794130,4456683,3753696,4198387,4196531,3756227,4509293,3769770,4224295,3428419,4921477,4441571,8945956,4509290,3761380,4805254,4509263,4197583,4687157,3761574,4215976,4457946,3783972,4221195,3761585,3788449,4738862,3685634,3753198,10548300,5023756,4624625,5022299,12592071,5023211,3753207,3782080,4197969,5023267,4735326"))),
                                        anAction("ALTERATION",
                                                withScopeTimeWindow(560000, 584000),
                                                withParameters(
                                                        onTargetHexIdent("480C1A"),
                                                        aParameter(MODE_OFFSET, "altitude", "-2342"))))))));

    }

    @Test
    public void deserialize_test_4() throws IOException {
        final File incidentFile = File.createTempFile("incident", ".xml");
        write("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
                "<parameters>\n" +
                "  <sensors>\n" +
                "    <sensor sensorType=\"SBS\">\n" +
                "      <sID>ALL</sID>\n" +
                "      <record>../recordings/.aPSf6iTuPZXsc1UrjhRkgQ__/sbs_2080211301.json</record>\n" +
                "      <filter />\n" +
                "      <action alterationType=\"ALTERATION\">\n" +
                "        <scope type=\"timeWindow\">\n" +
                "          <lowerBound>0</lowerBound>\n" +
                "          <upperBound>3599995</upperBound>\n" +
                "        </scope>\n" +
                "        <parameters>\n" +
                "          <target identifier=\"hexIdent\">4223681,3950945,5022552</target>\n" +
                "          <parameter mode=\"simple\">\n" +
                "            <key>latitude</key>\n" +
                "            <value>12</value>\n" +
                "          </parameter>\n" +
                "          <parameter mode=\"offset\">\n" +
                "            <key>longitude</key>\n" +
                "            <value>-1</value>\n" +
                "          </parameter>\n" +
                "        </parameters>\n" +
                "      </action>\n" +
                "    </sensor>\n" +
                "    <sensor sensorType=\"SBS\">\n" +
                "      <sID>ALL</sID>\n" +
                "      <record>../recordings/.aPSf6iTuPZXsc1UrjhRkgQ__/sbs_2009861432.json</record>\n" +
                "      <filter />\n" +
                "      <action alterationType=\"SATURATION\">\n" +
                "        <scope type=\"geoTimeWindow\">\n" +
                "          <polygon>\n" +
                "            <id>5dbc948e-1ef4-4044-bebb-b9322f2bd200</id>\n" +
                "            <name>ghost-zone</name>\n" +
                "            <vertices>\n" +
                "              <vertex>\n" +
                "                <lat>49.08</lat>\n" +
                "                <lon>2.39</lon>\n" +
                "              </vertex>\n" +
                "              <vertex>\n" +
                "                <lat>48.95</lat>\n" +
                "                <lon>1.75</lon>\n" +
                "              </vertex>\n" +
                "              <vertex>\n" +
                "                <lat>48.63</lat>\n" +
                "                <lon>1.52</lon>\n" +
                "              </vertex>\n" +
                "              <vertex>\n" +
                "                <lat>48.39</lat>\n" +
                "                <lon>1.5</lon>\n" +
                "              </vertex>\n" +
                "              <vertex>\n" +
                "                <lat>48.13</lat>\n" +
                "                <lon>2.17</lon>\n" +
                "              </vertex>\n" +
                "              <vertex>\n" +
                "                <lat>48.13</lat>\n" +
                "                <lon>2.92</lon>\n" +
                "              </vertex>\n" +
                "              <vertex>\n" +
                "                <lat>48.38</lat>\n" +
                "                <lon>3.89</lon>\n" +
                "              </vertex>\n" +
                "              <vertex>\n" +
                "                <lat>48.85</lat>\n" +
                "                <lon>4.06</lon>\n" +
                "              </vertex>\n" +
                "              <vertex>\n" +
                "                <lat>49.23</lat>\n" +
                "                <lon>3.31</lon>\n" +
                "              </vertex>\n" +
                "              <vertex>\n" +
                "                <lat>49.2</lat>\n" +
                "                <lon>2.54</lon>\n" +
                "              </vertex>\n" +
                "            </vertices>\n" +
                "            <lowerAlt>0</lowerAlt>\n" +
                "            <upperAlt>50000</upperAlt>\n" +
                "          </polygon>\n" +
                "          <lowerBound>10000</lowerBound>\n" +
                "          <upperBound>1094465</upperBound>\n" +
                "        </scope>\n" +
                "        <parameters>\n" +
                "          <target identifier=\"hexIdent\">ALL</target>\n" +
                "          <parameter mode=\"simple\">\n" +
                "            <key>ICAO</key>\n" +
                "            <value>RANDOM</value>\n" +
                "            <number>20</number>\n" +
                "          </parameter>\n" +
                "        </parameters>\n" +
                "      </action>\n" +
                "    </sensor>\n" +
                "    <sensor sensorType=\"SBS\">\n" +
                "      <sID>ALL</sID>\n" +
                "      <record>../recordings/.aPSf6iTuPZXsc1UrjhRkgQ__/sbs_429601252.json</record>\n" +
                "      <filter />\n" +
                "      <action alterationType=\"DELETION\">\n" +
                "        <scope type=\"timeWindow\">\n" +
                "          <lowerBound>0</lowerBound>\n" +
                "          <upperBound>3599995</upperBound>\n" +
                "        </scope>\n" +
                "        <parameters>\n" +
                "          <target identifier=\"hexIdent\">4223681,3950945,4198141,1260776,14509124</target>\n" +
                "        </parameters>\n" +
                "      </action>\n" +
                "      <action alterationType=\"ALTERATION\">\n" +
                "        <scope type=\"timeWindow\">\n" +
                "          <lowerBound>560000</lowerBound>\n" +
                "          <upperBound>584000</upperBound>\n" +
                "        </scope>\n" +
                "        <parameters>\n" +
                "          <target identifier=\"hexIdent\">480C1A</target>\n" +
                "          <parameter mode=\"offset\">\n" +
                "            <key>altitude</key>\n" +
                "            <value>2342</value>\n" +
                "          </parameter>\n" +
                "        </parameters>\n" +
                "      </action>\n" +
                "    </sensor>\n" +
                "  </sensors>\n" +
                "</parameters>\n", incidentFile, UTF_8);

        final IncidentDeserializer deserializer = new IncidentDeserializer(incidentFile);
        assertThat(deserializer.deserialize(),
                anIncident(withSensors(
                        aSensor("SBS", "ALL", "../recordings/.aPSf6iTuPZXsc1UrjhRkgQ__/sbs_2080211301.json", "",
                                withActions(
                                        anAction("ALTERATION",
                                                withScopeTimeWindow(0, 3599995),
                                                withParameters(
                                                        onTargetHexIdent("4223681,3950945,5022552"),
                                                        aParameter(MODE_SIMPLE, "latitude", "12"),
                                                        aParameter(MODE_OFFSET, "longitude", "-1"))))),
                        aSensor("SBS", "ALL", "../recordings/.aPSf6iTuPZXsc1UrjhRkgQ__/sbs_2009861432.json", "",
                                withActions(
                                        anAction("SATURATION",
                                                withScopeGeoTimeWindow(10000, 1094465,
                                                        withPolygon(
                                                                "5dbc948e-1ef4-4044-bebb-b9322f2bd200",
                                                                "ghost-zone",
                                                                0, 50000,
                                                                withVertices(aVertex(49.08, 2.39),
                                                                        aVertex(48.95, 1.75),
                                                                        aVertex(48.63, 1.52),
                                                                        aVertex(48.39, 1.5),
                                                                        aVertex(48.13, 2.17),
                                                                        aVertex(48.13, 2.92),
                                                                        aVertex(48.38, 3.89),
                                                                        aVertex(48.85, 4.06),
                                                                        aVertex(49.23, 3.31),
                                                                        aVertex(49.2, 2.54)))),
                                                withParameters(
                                                        onTargetHexIdent("ALL"),
                                                        aParameter(MODE_SIMPLE, "ICAO", "RANDOM", 20))))),
                        aSensor("SBS", "ALL", "../recordings/.aPSf6iTuPZXsc1UrjhRkgQ__/sbs_429601252.json", "",
                                withActions(
                                        anAction("DELETION",
                                                withScopeTimeWindow(0, 3599995),
                                                withParameters(
                                                        onTargetHexIdent("4223681,3950945,4198141,1260776,14509124"))),
                                        anAction("ALTERATION",
                                                withScopeTimeWindow(560000, 584000),
                                                withParameters(
                                                        onTargetHexIdent("480C1A"),
                                                        aParameter(MODE_OFFSET, "altitude", "2342"))))))));

    }

    @Test
    public void deserialize_trajectory_modification() throws IOException {
        final File incidentFile = File.createTempFile("incident", ".xml");
        write("<parameters>\n" +
                "  <sensors>\n" +
                "    <sensor sensorType=\"PSR\">\n" +
                "      <sID>ALL</sID>\n" +
                "      <record>.dJXRXAw4EmGUCCdLZd_Xrw__/sbs_2.json</record>\n" +
                "      <filter />\n" +
                "    </sensor>\n" +
                "    <sensor sensorType=\"SBS\">\n" +
                "      <sID>ALL</sID>\n" +
                "      <record>.dJXRXAw4EmGUCCdLZd_Xrw__/sbs_1.json</record>\n" +
                "      <filter />\n" +
                "      <action alterationType=\"TRAJECTORY\">\n" +
                "        <scope type=\"timeWindow\">\n" +
                "          <lowerBound>100</lowerBound>\n" +
                "          <upperBound>200</upperBound>\n" +
                "        </scope>\n" +
                "        <parameters>\n" +
                "          <target identifier=\"hexIdent\">2B67</target>\n" +
                "          <trajectory>\n" +
                "            <waypoint>\n" +
                "              <vertex>\n" +
                "                <lat>1.4</lat>\n" +
                "                <lon>-1.9</lon>\n" +
                "              </vertex>\n" +
                "              <altitude>10000</altitude>\n" +
                "              <time>0</time>\n" +
                "            </waypoint>\n" +
                "            <waypoint>\n" +
                "              <vertex>\n" +
                "                <lat>1.5</lat>\n" +
                "                <lon>-2.0</lon>\n" +
                "              </vertex>\n" +
                "              <altitude>10025</altitude>\n" +
                "              <time>1000</time>\n" +
                "            </waypoint>\n" +
                "            <waypoint>\n" +
                "              <vertex>\n" +
                "                <lat>1.6</lat>\n" +
                "                <lon>-2.1</lon>\n" +
                "              </vertex>\n" +
                "              <altitude>10050</altitude>\n" +
                "              <time>2000</time>\n" +
                "            </waypoint>\n" +
                "            <waypoint>\n" +
                "              <vertex>\n" +
                "                <lat>1.7</lat>\n" +
                "                <lon>-2.2</lon>\n" +
                "              </vertex>\n" +
                "              <altitude>10075</altitude>\n" +
                "              <time>3000</time>\n" +
                "            </waypoint>\n" +
                "            <waypoint>\n" +
                "              <vertex>\n" +
                "                <lat>1.8</lat>\n" +
                "                <lon>-2.3</lon>\n" +
                "              </vertex>\n" +
                "              <altitude>10100</altitude>\n" +
                "              <time>4000</time>\n" +
                "            </waypoint>\n" +
                "            <waypoint>\n" +
                "              <vertex>\n" +
                "                <lat>1.9</lat>\n" +
                "                <lon>-2.4</lon>\n" +
                "              </vertex>\n" +
                "              <altitude>10125</altitude>\n" +
                "              <time>5000</time>\n" +
                "            </waypoint>\n" +
                "          </trajectory>\n" +
                "        </parameters>\n" +
                "      </action>\n" +
                "    </sensor>\n" +
                "  </sensors>\n" +
                "</parameters>\n", incidentFile, UTF_8);

        final IncidentDeserializer deserializer = new IncidentDeserializer(incidentFile);
        assertThat(deserializer.deserialize(),
                anIncident(withSensors(
                        aSensor("PSR", "ALL", ".dJXRXAw4EmGUCCdLZd_Xrw__/sbs_2.json", "", withActions()),
                        aSensor("SBS", "ALL", ".dJXRXAw4EmGUCCdLZd_Xrw__/sbs_1.json", "",
                                withActions(
                                        anAction("TRAJECTORY",
                                                withScopeTimeWindow(100, 200),
                                                withTrajectoryParameters(
                                                        onTargetHexIdent("2B67"),
                                                        aTrajectory(
                                                                withWayPoint(1.4, -1.9, 10000, 0),
                                                                withWayPoint(1.5, -2.0, 10025, 1000),
                                                                withWayPoint(1.6, -2.1, 10050, 2000),
                                                                withWayPoint(1.7, -2.2, 10075, 3000),
                                                                withWayPoint(1.8, -2.3, 10100, 4000),
                                                                withWayPoint(1.9, -2.4, 10125, 5000)))))))));
    }
}