import {parse, stringify} from '../../src/'
import {expect} from 'chai'

describe("Message parser", () => {
	it("should return null if the hexIdent is not valid", () => {
		let msgs = parse("MSG,0,3,10610299_MISSING_ICAO_10610299,2019/04/19,17:30:00.140,2019/04/19,17:30:00.140,,16625.0,,,50.4073,8.2464,,,0,0,0,0");
		expect(msgs).to.be.empty;
	});

	it("should parse a valid Message", () => {
		let msgs = parse("MSG,0,3,10610299,A1E67B,10610299,2019/04/19,17:30:00.140,2019/04/19,17:30:00.140,,16625.0,,,50.4073,8.2464,,,0,0,0,0");
		expect(msgs[0]).to.include({
			hexIdent: "A1E67B",
			timestampGenerated: 1555695000140,
			altitude: 16625,
			latitude: 50.4073,
			longitude: 8.2464,
			alert: false,
			emergency: false,
			spi: false,
			onGround: false
		});
	})

	it("should stringify a message", () => {
		let src = "MSG,0,3,10610299,A1E67B,10610299,2019/04/19,17:30:00.140,2019/04/19,17:30:00.140,,16625,,,50.40730,8.24640,,,0,0,0,0";
		let msg = parse(src)[0];

		expect(stringify(msg)).to.be.equals(src);
		
		src = "MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:16.239,2018/11/25,12:22:16.239,,30000,,,48.22060,3.55700,,,0,0,0,0";
		msg = parse(src)[0];
		expect(stringify(msg)).to.be.equals(src);
	});

	it("should parse a valid Message lower case hexIdent", () => {
		const msgs = parse("MSG,3,3,5022202,39ac45,5022202,2022/07/01,05:08:57.000000,2022/07/01,05:08:57.000000,SAMUCF,550.0,66.0,303.20657031508955,43.61418643240201,1.3985988071986606,192.0,7015,0,0,0,0");
		expect(msgs[0]).to.include({
			hexIdent: "39ac45",
		});
	})

	it("should parse several message", () => {
		let msgs = parse("MSG,0,30,1105,300065,3839,2018/02/28,16:04:30.987,2018/02/28,16:04:31.888,,,414.1,333,,,64,,,,,\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:31.987,2018/02/28,16:04:32.888,,36025,,,47.33528,4.16787,,,0,0,0,0\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:32.391,2018/02/28,16:04:33.888,,36025,,,47.33606,4.16732,,,0,0,0,0\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:32.590,2018/02/28,16:04:34.888,,,415,333.1,,,0,,,,,\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:33.801,2018/02/28,16:04:35.888,,36025,,,47.33678,4.16678,,,0,0,0,0\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:33.998,2018/02/28,16:04:36.894,,,415,333.1,,,0,,,,,\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:34.404,2018/02/28,16:04:37.894,,36025,,,47.33752,4.16622,,,0,0,0,0\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:34.607,2018/02/28,16:04:38.894,,,415,333.1,,,0,,,,,\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:35.608,2018/02/28,16:04:39.894,,36025,,,47.33821,4.16567,,,0,0,0,0\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:36.017,2018/02/28,16:04:40.889,,,415,333.1,,,0,,,,,\n" +
                        "MSG,0,30,1105,300065,3839,2018/02/28,16:04:36.217,2018/02/28,16:04:41.889,,36025,,,47.33926,4.16492,,,0,0,0,0");
		expect(msgs).to.have.lengthOf(11);
	});

	it("should remove invalid message in a recording", () => {
		let msgs = parse(	"MSG,0,3,10610299,A1E67B,10610299,2019/04/19,17:30:00.140,2019/04/19,17:30:00.140,,16625.0,,,50.4073,8.2464,,,0,0,0,0\n"+
											"MSG,0,3,10610299_MISSING_ICAO_10610299,2019/04/19,17:30:00.140,2019/04/19,17:30:00.140,,16625.0,,,50.4073,8.2464,,,0,0,0,0");
		
		expect(msgs).to.have.lengthOf(1);
	});

	it("should parse extra fields", () => {
		const msg = parse("MSG,0,0,0,4B1613,0,2019/04/19,17:29:45.200,2019/04/19,17:29:45.200,BAW256,20350,442.2,358.1,1.1,8.4823,0,4022,0,0,0,0,{\"baroaltitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}")[0];

		expect(msg).to.include({ 
			baroaltitude: "-45.72",
			last_position: "1672575670.76",
			lastcontact : "1672575670.797",
			hour: "1672574400",
		});
	});

	it("should parse corectly date to timestamp", () => {
		let date = "2019-04-19"
		let time = "17:30:00.140";

		let ts = new Date(date + "T" + time + 'Z' ).getTime();
		expect(ts).equals(1555695000140);
	});
});
