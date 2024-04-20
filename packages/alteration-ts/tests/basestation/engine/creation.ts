import { creation, Template } from "../../../src"
import { assert, expect } from "chai"


describe("Aircraft Creation engine", () => {
	it("should create new messages", () => {
		let start_date = 1519833870987;
		let actual = creation({
			start: start_date + 10000,
			end: start_date + 60000,
			waypoints : [
				{timestampGenerated: start_date, latitude: 48.60718, longitude: 2.05332, altitude: 18400 },
				{timestampGenerated: start_date + 3121, latitude: 48.6021, longitude: 2.05585, altitude: 18475 },
				{timestampGenerated: start_date + 7177, latitude: 48.59642, longitude: 2.05867, altitude: 18600 },
				{timestampGenerated: start_date + 12247, latitude: 48.58783, longitude: 2.06297, altitude: 18775 },
				{timestampGenerated: start_date + 17316, latitude: 48.57945, longitude: 2.06709, altitude: 18975 },
				{timestampGenerated: start_date + 22111, latitude: 48.56963, longitude: 2.07201, altitude: 19200 },
				{timestampGenerated: start_date + 28986, latitude: 48.55908, longitude: 2.07775, altitude: 19450 },
			],
			template: {
				...Template.random(),
				hexIdent: "39AC47",
				callsign: "SAMU25",
			},

			timeOffset: () => 500,
		}).processing([]);

		expect(actual.length).to.be.equals(100); // (60000 - 10000) / 500 = 100, so there are 101 messages in recording
	});

	it("should create a straight fly", () => {
		let start_date = 0;
		let actual = creation({
			start: start_date,
			end: start_date + 500000,
			timeOffset: () => 1000,
			tempalte: {
				...Template.random(),
				hexIdent: "ACAB25",
				callsign: "SAMU25",
			},
			waypoints: [
				{timestampGenerated: start_date, latitude: 0, longitude: 0, altitude: 1000},
				{timestampGenerated: start_date + 100000,latitude: 1, longitude: 0, altitude: 1000},
				{timestampGenerated: start_date + 200000, latitude: 2, longitude: 0, altitude: 1000},
				{timestampGenerated: start_date + 300000, latitude: 3, longitude: 0, altitude: 1000},
				{timestampGenerated: start_date + 400000, latitude: 4, longitude: 0, altitude: 1000},
				{timestampGenerated: start_date + 500000, latitude: 5, longitude: 0, altitude: 1000},
			],
		}).processing([]);

		expect(actual).to.have.lengthOf(500);

		let mem = actual[0].latitude;
		let increasing = true;
		let i = 0;
		for(i=1; i < actual.length; i++){
			if(actual[i].latitude <= mem) {
				increasing = false;
				break;
			}
		}

		//assert(increasing, "Latitude is not stricly increasing in message at timestamp : " + actual[i].timestampGenerated);
		assert(increasing);
	});
});
