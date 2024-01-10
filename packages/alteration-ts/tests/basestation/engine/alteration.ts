
import { alteration, AlterationMode, parse, always, Message } from "../../../src"
import { timeWindow, target, and } from "../../../src/scope";
import { default as chai, expect, assert } from 'chai';
//chai.config.truncateThreshold = 0;  Show full JSON Object on error

describe("Alteration engine", () => {
	it("should replace altitude", () => {
		const start_date = 1555687785200;
		const msg = parse("MSG,0,0,0,4B1613,0,2019/04/19,17:29:45.200,2019/04/19,17:29:45.200,BAW256,203050,442.2,358.1,49.6684,8.4823,0,4022,0,0,0,0")[0];
		const expected = [{ ...msg, altitude: 12000 }];

		const actual = alteration({
			scope: target("4B1613"),
			modifications: [{property: "altitude", value: 12000, mode: AlterationMode.REPLACE}],
		}).processing([msg]);

		expect(actual).to.be.deep.equals(expected);
	});



	it("should replace latitude with time window", () => {
		const start_date = 1555694985200;
		const msg = parse("MSG,0,0,0,4B1613,0,2019/04/19,17:29:45.200,2019/04/19,17:29:45.200,BAW256,20350,442.2,358.1,49.6684,8.4823,0,4022,0,0,0,0")[0];
		const expected = [{ ...msg, latitude: 1.1 }];

		const actual = alteration({
			scope: and(target("4B1613"), timeWindow(0, start_date + 200)),
			property: "latitude",
			value: 1.1,
			mode: AlterationMode.REPLACE,
		}).processing([msg]);

		expect(actual).to.be.deep.equals(expected);
	});



	it("sould replace latitude with time window and extra field", () => {
		const start_date = 1555694985200;
		const msg = parse("MSG,0,0,0,4B1613,0,2019/04/19,17:29:45.200,2019/04/19,17:29:45.200,BAW256,20350,442.2,358.1,123.1,8.4823,0,4022,0,0,0,0,{\"baroaltitude\":\"-45.72\",\"last_position\":\"1672575670.76\",\"lastcontact\":\"1672575670.797\",\"hour\":\"1672574400\"}")[0];

		const expected : Message[] = [{
			...msg,
			latitude: 1.1,
			baroaltitude: "-45.72",
			last_position: "1672575670.76",
			lastcontact : "1672575670.797",
			hour: "1672574400",
		}];
		const actual = alteration({
			scope: and(target("4B1613"), timeWindow(0, start_date + 200)),
			property: "latitude",
			value: 1.1,
			mode: AlterationMode.REPLACE,
		}).processing([msg]);

		expect(actual).to.be.deep.equals(expected);

	});



	it("should replace longitude with upper time limite", () => {
		const start_date = 1555694985200;
		const msg = parse("MSG,0,0,0,4B1613,0,2019/04/19,17:29:45.200,2019/04/19,17:29:45.200,BAW256,20350,442.2,358.1,49.6684,8.4823,0,4022,0,0,0,0")[0];
		const expected = [{ ...msg, longitude: 10.7}];

		const actual = alteration({
			scope: and(target("4B1613"), timeWindow(0, start_date + 200)),
			property: "longitude",
			value: 10.7,
			mode: AlterationMode.REPLACE,
		}).processing([msg]);

		expect(actual).to.be.deep.equals(expected);
	});



	it("should replace icao with lower time limit", () => {
		const start_date = 1555694985000;
		const msg = parse("MSG,0,0,0,4B1613,0,2019/04/19,17:29:55.000,2019/04/19,17:29:55.000,BAW256,20350,442.2,358.1,49.6684,8.4823,0,4022,0,0,0,0")[0];
		const expected = [{ ...msg, hexIdent: "39AC45" }];

		const actual = alteration({
			scope: and(target("4B1613"), timeWindow(msg.timestampGenerated, msg.timestampGenerated + 10000)),
			property: "hexIdent",
			value: "39AC45",
			mode: AlterationMode.REPLACE,
		}).processing([msg]);

		expect(actual).to.be.deep.equals(expected);
	});



	it("shouldn't replace altitude (lower out of scope)", () => { 
		const start_date = 1555694985000;
		const msg = parse("MSG,0,0,0,4B1613,0,2019/04/19,17:29:54.000,2019/04/19,17:29:54.000,BAW256,20350,442.2,358.1,49.6684,8.4823,0,4022,0,0,0,0")[0];
		const expected = [msg];

		const actual = alteration({
			scope: timeWindow(start_date + 10000, start_date + 20000),
			property: "altitude",
			value: 10000,
			mode: AlterationMode.REPLACE,
		}).processing([msg]);

		expect(actual).to.be.deep.equals(expected);
	});



	it("shouldn't replace altitude (upper out of scope)", () => {
		const start_date = 1555694985000;
		const msg = parse("MSG,0,0,0,4B1613,0,2019/04/19,17:30:06.000,2019/04/19,17:30:06.000,BAW256,20350,442.2,358.1,49.6684,8.4823,0,4022,0,0,0,0")[0];
		const expected = [msg];

		const actual = alteration({
			scope: timeWindow(start_date + 10000, start_date + 20000),
			property: "altitude",
			value: 30000,
			mode: AlterationMode.REPLACE,
		}).processing([msg]);

		expect(actual).to.be.deep.equals(expected);
	}); 


	it("should replace latitude and longitude", () => {
		const start_date = 1555694985000;
		const msg = parse("MSG,0,0,0,4B1613,0,2019/04/19,17:30:00.000,2019/04/19,17:30:00.000,BAW256,20350,442.2,358.1,49.6684,8.4823,0,4022,0,0,0,0")[0];
		msg.timestampGenerated = start_date + 15000;

		const expected = [{...msg, latitude: 1.1, longitude: 2.2}];

		const actual = alteration({
			scope: timeWindow(start_date + 10000, start_date + 20000),
			modifications : [
				{ property: "latitude", value: 1.1, mode: AlterationMode.REPLACE },
				{ property: "longitude", value: 2.2, mode: AlterationMode.REPLACE },
			]}).processing([msg]);

		expect(actual).to.be.deep.equals(expected);
	});



	it("should replace with a false alert with upper time limit", () => {
		const start_date = 1555694985000;
		const msg = parse("MSG,0,0,0,4B1613,0,2019/04/19,17:29:45.020,2019/04/19,17:29:45.020,BAW256,20350,442.2,358.1,49.6684,8.4823,0,4022,0,0,0,0")[0];
		msg.timestampGenerated = start_date + 20;

		const expected = [{...msg, squawk: 7700, alert: true, emergency: true}];

		const actual = alteration({
			scope: timeWindow(start_date + 10, start_date + 20),
			modifications: [
				{property: "squawk", value: 7700, mode: AlterationMode.REPLACE},
				{property: "alert", value: true, mode: AlterationMode.REPLACE},
				{property: "emergency", value: true, mode: AlterationMode.REPLACE},
			],
		}).processing([msg]);

		expect(actual).to.be.deep.equals(expected);
	});



	it("shouldn't replace latitude and longitude (lower out of scope)", () => {
		const start_date = 1555694985000;
		const msg = parse("MSG,0,0,0,4B1613,0,2019/04/19,17:29:54.999,2019/04/19,17:29:54.999,BAW256,20350,442.2,358.1,49.6684,8.4823,0,4022,0,0,0,0")[0];
		const expected = [msg];

		const actual = alteration({
			scope: timeWindow(10000,20000),
			modifications: [
				{property: "latitude", value: "1.1", mode: AlterationMode.REPLACE},
				{property: "longitude", value: "1.1", mode: AlterationMode.REPLACE},
			]
		}).processing([msg]);

		expect(actual).to.be.deep.equals(expected);
	});


	it("shouldn't replace latitude and longitude (upper out of scope)", () => {
		const start_date = 1555694985000;
		const msg = parse("MSG,0,0,0,4B1613,0,2019/04/19,17:29:54.999,2019/04/19,17:29:54.999,BAW256,20350,442.2,358.1,49.6684,8.4823,0,4022,0,0,0,0")[0];
		const expected = [msg];

		const actual = alteration({
			scope: timeWindow(10000,20000),
			modifications: [
				{property: "latitude", value: "1.1", mode: AlterationMode.REPLACE},
				{property: "longitude", value: "1.1", mode: AlterationMode.REPLACE},
			]
		}).processing([msg]);

		expect(actual).to.be.deep.equals(expected);
	});


	

	it("should replace callsign with lower time limit", () => {
		const start_date = 1555694985000;
		const msg = parse("MSG,0,0,0,4B1613,0,2019/04/19,17:29:45.030,2019/04/19,17:29:45.030,BAW256,20350,442.2,358.1,49.6684,8.4823,0,4022,0,0,0,0")[0];
		msg.timestampGenerated = start_date + 30;

		const expected = [{...msg, callsign: "SAMU25"}];

		const actual = alteration({
			scope: timeWindow(start_date + 30, start_date + 40),
			property: "callsign", 
			value: "SAMU25",
			mode: AlterationMode.REPLACE
		}).processing([msg]);

		expect(actual).to.be.deep.equals(expected);
	});



	it("should add offset to groundspeed", () => {
		const start_date = 1555694985000;
		const msg = parse("MSG,0,0,0,4B1613,0,2019/04/19,17:29:45.035,2019/04/19,17:29:45.035,BAW256,20350,442.2,358.1,49.6684,8.4823,0,4022,0,0,0,0")[0];
		msg.timestampGenerated = start_date + 35;

		const expected = [{...msg, groundSpeed: 492.6}];

		const actual = alteration({
			scope: timeWindow(start_date + 30, start_date + 40),
			property: "groundSpeed",
			value: 50.4,
			mode: AlterationMode.OFFSET,
		}).processing([msg]);

		expect(actual[0].groundSpeed).to.be.closeTo(expected[0].groundSpeed, 0.0001);
	});



/*
	it("should apply action engine with labels no alteration", () => {
		assert.fail("Pas compris le test");
	})



	it("should apply action engine with labels groundspeed", () => {
		assert.fail("Pas compris le test");
	});



	it("should apply action engine with label groundspeed, with extra fields", () =>{
		assert.fail("Pas compris le test");
	 });



	 it("should apply action engine with extra field", () => {
		assert.fail("Pas sûr que le test soit dans alteration");
	 });
*/

});
