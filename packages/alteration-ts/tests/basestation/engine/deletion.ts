import { and, target, timeWindow, deletion, parse, always, Message } from "../../../src"
import { expect } from "chai";

const start_date = 1555694985000;
const lower_bound = start_date + 12000;
const upper_bound = start_date + 19000;

const source: Message = {
	messageType: "MSG",
	transmissionType: 0,
	sessionID: 0,
	aircraftID: 0,
	hexIdent: "4B1613",
	flightID: 0,
	timestampGenerated: start_date + 15000,
	timestampLogged: start_date + 15000, 
};


describe("Deletion engine", () => {
	it("should remove all message if frequency is 0", () => {
		const recording = parse("MSG,0,3,4216373,405635,4216373,2019/04/19,17:30:00.052,2019/04/19,17:30:00.052,,38000,,,51.2078,7.0869,,,0,0,0,0\n" +
                        "MSG,0,3,4196341,4007F5,4196341,2019/04/19,17:30:00.102,2019/04/19,17:30:00.102,,38000,,,47.7235,7.6864,,,0,0,0,0\n" +
                        "MSG,0,3,4197737,400D69,4197737,2019/04/19,17:30:00.120,2019/04/19,17:30:00.120,,38000,,,49.3943,2.8343,,,0,0,0,0\n" +
                        "MSG,0,3,10610299,A1E67B,10610299,2019/04/19,17:30:00.140,2019/04/19,17:30:00.140,,16625,,,50.4073,8.2464,,,0,0,0,0\n" +
                        "MSG,0,3,3146937,3004B9,3146937,2019/04/19,17:30:00.159,2019/04/19,17:30:00.159,,28575,,,48.8645,4.2382,,,0,0,0,0\n" +
                        "MSG,0,3,3958500,3C66E4,3958500,2019/04/19,17:30:00.160,2019/04/19,17:30:00.160,,21750,,,50.3645,6.473,,,0,0,0,0\n" +
                        "MSG,0,3,5022243,4CA223,5022243,2019/04/19,17:30:00.163,2019/04/19,17:30:00.163,,37000,,,49.8471,7.7982,,,0,0,0,0\n" +
                        "MSG,0,3,4457005,44022D,4457005,2019/04/19,17:30:00.164,2019/04/19,17:30:00.164,,,429.25,105.82,,,0.0,,,,,\n" +
                        "MSG,0,3,4196526,4008AE,4196526,2019/04/19,17:30:00.178,2019/04/19,17:30:00.178,,20350,,,49.3423,7.6086,,,0,0,0,0\n" +
                        "MSG,0,3,5046545,4D0111,5046545,2019/04/19,17:30:00.215,2019/04/19,17:30:00.215,,0.0,,59.06,49.6179,6.1884,,,0,0,0,1\n" +
                        "MSG,0,3,3958149,3C6585,3958149,2019/04/19,17:30:00.216,2019/04/19,17:30:00.216,,29900,,,48.85,8.6014,,,0,0,0,0\n" +
                        "MSG,0,3,4196526,4008AE,4196526,2019/04/19,17:30:00.225,2019/04/19,17:30:00.225,,,343.59,118.13,,,-7.48,,,,,\n" +
                        "MSG,0,3,4224849,407751,4224849,2019/04/19,17:30:00.225,2019/04/19,17:30:00.225,,35000,,,49.4512,7.2606,,,0,0,0,0\n" +
                        "MSG,0,3,4921884,4B1A1C,4921884,2019/04/19,17:30:00.239,2019/04/19,17:30:00.239,,37000,,,49.6684,8.4823,,,0,0,0,0");
		let actual = deletion({
			scope: always,
			frequency: 0,
		}).processing(recording);

		expect(actual).to.have.lengthOf(0);
	});

	it("should remove message with frequency of 3", () => {
		const recording = parse("MSG,0,3,4216373,405635,4216373,2019/04/19,17:30:00.052,2019/04/19,17:30:00.052,,38000,,,51.2078,7.0869,,,0,0,0,0\n" +
                        "MSG,0,3,4196341,4007F5,4196341,2019/04/19,17:30:00.102,2019/04/19,17:30:00.102,,38000,,,47.7235,7.6864,,,0,0,0,0\n" +
                        "MSG,0,3,4197737,400D69,4197737,2019/04/19,17:30:00.120,2019/04/19,17:30:00.120,,38000,,,49.3943,2.8343,,,0,0,0,0\n" +
                        "MSG,0,3,10610299,A1E67B,10610299,2019/04/19,17:30:00.140,2019/04/19,17:30:00.140,,16625,,,50.4073,8.2464,,,0,0,0,0\n" +
                        "MSG,0,3,3146937,3004B9,3146937,2019/04/19,17:30:00.159,2019/04/19,17:30:00.159,,28575,,,48.8645,4.2382,,,0,0,0,0\n" +
                        "MSG,0,3,3958500,3C66E4,3958500,2019/04/19,17:30:00.160,2019/04/19,17:30:00.160,,21750,,,50.3645,6.473,,,0,0,0,0\n" +
                        "MSG,0,3,5022243,4CA223,5022243,2019/04/19,17:30:00.163,2019/04/19,17:30:00.163,,37000,,,49.8471,7.7982,,,0,0,0,0\n" +
                        "MSG,0,3,4457005,44022D,4457005,2019/04/19,17:30:00.164,2019/04/19,17:30:00.164,,,429.25,105.82,,,0.0,,,,,\n" +
                        "MSG,0,3,4196526,4008AE,4196526,2019/04/19,17:30:00.178,2019/04/19,17:30:00.178,,20350,,,49.3423,7.6086,,,0,0,0,0\n" +
                        "MSG,0,3,5046545,4D0111,5046545,2019/04/19,17:30:00.215,2019/04/19,17:30:00.215,,0.0,,59.06,49.6179,6.1884,,,0,0,0,1\n" +
                        "MSG,0,3,3958149,3C6585,3958149,2019/04/19,17:30:00.216,2019/04/19,17:30:00.216,,29900,,,48.85,8.6014,,,0,0,0,0\n" +
                        "MSG,0,3,4196526,4008AE,4196526,2019/04/19,17:30:00.225,2019/04/19,17:30:00.225,,,343.59,118.13,,,-7.48,,,,,\n" +
                        "MSG,0,3,4224849,407751,4224849,2019/04/19,17:30:00.225,2019/04/19,17:30:00.225,,35000,,,49.4512,7.2606,,,0,0,0,0\n" +
                        "MSG,0,3,4921884,4B1A1C,4921884,2019/04/19,17:30:00.239,2019/04/19,17:30:00.239,,37000,,,49.6684,8.4823,,,0,0,0,0");

		let expected = parse("MSG,0,3,4216373,405635,4216373,2019/04/19,17:30:00.052,2019/04/19,17:30:00.052,,38000,,,51.2078,7.0869,,,0,0,0,0\n" +
                        "MSG,0,3,3146937,3004B9,3146937,2019/04/19,17:30:00.159,2019/04/19,17:30:00.159,,28575,,,48.8645,4.2382,,,0,0,0,0\n" +
                        "MSG,0,3,4196526,4008AE,4196526,2019/04/19,17:30:00.178,2019/04/19,17:30:00.178,,20350,,,49.3423,7.6086,,,0,0,0,0\n" +
                        "MSG,0,3,4224849,407751,4224849,2019/04/19,17:30:00.225,2019/04/19,17:30:00.225,,35000,,,49.4512,7.2606,,,0,0,0,0");

		let actual = deletion({
			scope: always, 
			frequency: 3
		}).processing(recording);

		expect(actual).to.be.deep.equals(expected);
	});


	it("should delete a message", () => {
		const msg = {...source};
		const actual = deletion({
			scope: timeWindow(lower_bound, upper_bound),
		}).processing([msg]);

		expect(actual).to.be.empty;
	});


	it("should delete a targeted message", () => {
		const msg = {...source};
		const actual = deletion({
			scope: and(target("4B1613"), timeWindow(lower_bound, upper_bound)),
		}).processing([msg]);

		expect(actual).to.be.empty;
	});


	it("should delete a message on lower time bound", () => {
		const msg = { 
			...source, 
			timestampGenerated: lower_bound,
			timestampLogged: lower_bound,
		};
		const actual = deletion({
			scope: timeWindow(lower_bound, upper_bound),
		}).processing([msg]);

		expect(actual).to.be.empty;
	})


	it("should delete a message on upper time bound", () => {
		const msg = {
			...source,
			timestampGenerated: upper_bound, 
			timestampLogged: upper_bound,
		};
		const actual = deletion({
			scope: timeWindow(lower_bound, upper_bound),
		}).processing([msg]);

		expect(actual).to.be.empty;
	});


	it("should delete a message in lower bound", () => {
		const msg = {
			...source, 
			timestampGenerated: lower_bound + 1,
			timestampLogged: lower_bound + 1,
		};
		const actual = deletion({
			scope: timeWindow(lower_bound, upper_bound),
		}).processing([msg]);

		expect(actual).to.be.empty;
	});


	it("should delete a message in upper bound", () => {
		const msg = {
			...source, 
			timestampGenerated: upper_bound - 1,
			timestampLogged: upper_bound - 1,
		};
		const actual = deletion({
			scope: timeWindow(lower_bound, upper_bound),
		}).processing([msg]);

		expect(actual).to.be.empty;
	});

	it("shouldn't delete message (out of lower bound)", () => {
		const msg = {
			...source,
			timestampGenerated: lower_bound - 1,
			timestampLogged: lower_bound - 1,
		};

		const actual = deletion({
			scope: timeWindow(lower_bound, upper_bound),
		}).processing([msg]);

		expect(actual).to.be.deep.equals([msg]);
	});


	it("shouldn't delete message (out of upper bound)", () => {
		const msg = {
			...source,
			timestampGenerated: upper_bound + 1,
			timestampLogged: upper_bound + 1,
		};
		const actual = deletion({
			scope: timeWindow(lower_bound, upper_bound),
		}).processing([msg]);

		expect(actual).to.be.deep.equals([msg]);
	});

	it("shouldn't delete message (not targeted)", () => {
		const msg = {...source};
		const actual = deletion({
			scope: and(target("DEDE70"), timeWindow(lower_bound, upper_bound)),
		}).processing([msg]);

		expect(actual).to.be.deep.equals([msg]);
	});

});
