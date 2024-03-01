import { Earth, Angle, lat, lon } from "../../../src"
import { expect } from "chai"

// Data from  : https://github.com/nasa/World-Wind-Java/blob/master/WorldWind/test/gov/nasa/worldwind/geom/LatLonTest.java
describe("Earth End Position", () => {
	const THRESHOLD = 1e-10;

	it("should not move with a trivial distance", () => {
		const start = [Angle.degree(0), Angle.degree(0)];
		const azimuth = Angle.degree(0);

		let distance = Angle.degree(0);
		let p = Earth.end_position(start, azimuth, distance);
		expect(lat(p).deg).to.be.closeTo(lat(start).deg, THRESHOLD);
		expect(lon(p).deg).to.be.closeTo(lon(start).deg, THRESHOLD);

		distance = Angle.degree(360);
	 	p = Earth.end_position(start, azimuth, distance);
		expect(lat(p).deg).to.be.closeTo(lat(start).deg, THRESHOLD);
		expect(lon(p).deg).to.be.closeTo(lon(start).deg, THRESHOLD);
	});


	it("should compute end position", () => {
		let start = [Angle.degree(53.0902505), Angle.degree(112.8935442)];
		let azimuth = Angle.degree(-68.4055227);
		let distance = Angle.degree(10.53630354);
		let end = Earth.end_position(start, azimuth, distance);

		expect(lat(end).deg).to.be.closeTo(55.7426290038835, THRESHOLD);
		expect(lon(end).deg).to.be.closeTo(95.313127193979270, THRESHOLD);
	});


	it("should be antipodal from start point", () => {
		let start = [Angle.degree(-12.0), Angle.degree(87.0)];
		let azimuth = Angle.degree(-90);
		let distance = Angle.degree(180);
		
		let end = Earth.end_position(start, azimuth, distance);
		expect(lat(end).deg).to.be.closeTo(12.0, THRESHOLD);
		expect(lon(end).deg).to.be.closeTo(-93.0, THRESHOLD);

		start = [Angle.degree(53.0902505), Angle.degree(112.8935442)];
		end = Earth.end_position(start, azimuth, distance);
		expect(lat(end).deg).to.be.closeTo(-53.0902505, THRESHOLD);
		expect(lon(end).deg).to.be.closeTo(-67.1064558, THRESHOLD);
	});
});

describe("Earth Arc distance", () => {
	const THRESHOLD = 1e-10;
	it("should compute trivial distances", () => {
		let start = [Angle.degree(0), Angle.degree(0)];
		let end = [Angle.degree(0), Angle.degree(0)];

		let distance = Earth.distance_arc(start, end);
		expect(distance.deg).to.be.closeTo(0, THRESHOLD);

		start = [Angle.degree(0), Angle.degree(-180)];
		end = [Angle.degree(0), Angle.degree(180)];
		
		distance = Earth.distance_arc(start, end);
		expect(distance.deg).to.be.closeTo(0, THRESHOLD);
	});

	it("should compute distance between two points", () => {
		let start = [Angle.degree(90), Angle.degree(45)];
		let end = [Angle.degree(36), Angle.degree(180)];
		
		let d = Earth.distance_arc(start, end);
		expect(d.deg).to.be.closeTo(54, THRESHOLD);
	});
});

describe("Earth azimuth", () => {
	const THRESHOLD = 1e-5;
	it('should compute trivial azimuth', () => {
		let start = [Angle.degree(0), Angle.degree(0)];
		let end = [Angle.degree(90), Angle.degree(0)];

		let az = Earth.azimuth(start, end);
		expect(az.deg).to.be.closeTo(0.0, THRESHOLD);

		end = [Angle.degree(0), Angle.degree(90)];
		az = Earth.azimuth(start, end);
		expect(az.deg).to.be.closeTo(90, THRESHOLD);

		end = [Angle.degree(-90), Angle.degree(0)];
		az = Earth.azimuth(start, end);
		expect(az.deg).to.be.closeTo(180, THRESHOLD);

		end = [Angle.degree(0), Angle.degree(-90)];
		az = Earth.azimuth(start, end);
		expect(az.deg).to.be.closeTo(-90, THRESHOLD);
	});

	it("should compute azimuth", () => {
		let start = [Angle.degree(-12.0), Angle.degree(87.0)];
		let end = [Angle.degree(53.0902505), Angle.degree(-67.1064558)];

		let az = Earth.azimuth(start, end);
		expect(az.deg).to.be.closeTo(-21.38356223882703, THRESHOLD);

	});
});
