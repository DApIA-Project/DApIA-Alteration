import { trajectoryModification, parse, always, timeWindow } from "../../../src"
import { expect } from "chai"


describe("Trajectory Modification Engine", () => {
	it("should build a new trajectory", () => {
		let start_date = 1519833870987;
		let src = parse("MSG,0,30,1105,300065,3839,2018/02/28,16:04:30.987,2018/02/28,16:04:31.888,,,414.1,333.0,,,64,,,,,\n" +
										"MSG,0,30,1105,300065,3839,2018/02/28,16:04:31.987,2018/02/28,16:04:32.888,,36025,,,47.33528,4.16787,,,0,0,0,0\n" +
										"MSG,0,30,1105,300065,3839,2018/02/28,16:04:32.391,2018/02/28,16:04:33.888,,36025,,,47.33606,4.16732,,,0,0,0,0\n" +
										"MSG,0,30,1105,300065,3839,2018/02/28,16:04:32.590,2018/02/28,16:04:34.888,,,415.0,333.1,,,0,,,,,\n" +
										"MSG,0,30,1105,300065,3839,2018/02/28,16:04:33.801,2018/02/28,16:04:35.888,,36025,,,47.33678,4.16678,,,0,0,0,0\n" +
										"MSG,0,30,1105,300065,3839,2018/02/28,16:04:33.998,2018/02/28,16:04:36.894,,,415.0,333.1,,,0,,,,,\n" +
										"MSG,0,30,1105,300065,3839,2018/02/28,16:04:34.404,2018/02/28,16:04:37.894,,36025,,,47.33752,4.16622,,,0,0,0,0\n" +
										"MSG,0,30,1105,300065,3839,2018/02/28,16:04:34.607,2018/02/28,16:04:38.894,,,415.0,333.1,,,0,,,,,\n" +
										"MSG,0,30,1105,300065,3839,2018/02/28,16:04:35.608,2018/02/28,16:04:39.894,,36025,,,47.33821,4.16567,,,0,0,0,0\n" +
										"MSG,0,30,1105,300065,3839,2018/02/28,16:04:36.017,2018/02/28,16:04:40.889,,,415.0,333.1,,,0,,,,,\n" +
										"MSG,0,30,1105,300065,3839,2018/02/28,16:04:36.217,2018/02/28,16:04:41.889,,36025,,,47.33926,4.16492,,,0,0,0,0");

		let actual = trajectoryModification({
			target : "300065",
			scope: always, 
			waypoints: [
				{ latitude : 47.33688, longitude : 4.16668, altitude: 36000, timestampGenerated: start_date + 3250 },
				{ latitude : 47.33762, longitude : 4.16612, altitude: 35975, timestampGenerated: start_date + 4000 },
				{ latitude : 47.33831, longitude : 4.16557, altitude: 36000, timestampGenerated: start_date + 4600 },
			]
		}).processing(src);

		expect(actual.find((m) => m.timestampGenerated == 1519833871987)).to.include({
			latitude: 47.33528,
			longitude: 4.16787,
			altitude: 36025,
		});

		expect(actual.find((m) => m.timestampGenerated == 1519833872391)).to.include({
			latitude: 47.33606,
			longitude: 4.16732,
			altitude: 36025,
		});

		expect(actual.find((m) => m.timestampGenerated == 1519833874237)).to.include({
			latitude: 47.33688,
			longitude: 4.16668,
			altitude: 36000,
		});

		expect(actual.find((m) => m.timestampGenerated == 1519833874987)).to.include({
			latitude: 47.33762,
			longitude: 4.16612,
			altitude: 35975,
		});
	});
});
