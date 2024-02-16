import { earth_distance, earth_azimuth } from "../../src"
import { expect } from "chai";

describe("Earth Geometry", () => {
	it("should calculta distance on the globe", () => {
		let d = earth_distance(50.03, 5.42, 58.38, 3.04);
		expect(d).to.be.closeTo(941137, 1);
	});

	it("should calculate azimuth of two points", () => {
		// Data from https://www.satsig.net/ssazran.htm
		let a = earth_azimuth(0,0,10,10);
		expect(a).to.be.closeTo(44.56, 0.05);

		a = earth_azimuth(47.14072, 6.01325, 47.1409, 6.01492);
		expect(a).to.be.closeTo(80.98, 0.05);

		a = earth_azimuth(1.0, 0, 2.0, 0);
		expect(a).to.be.closeTo(0, 0.05);
	});
});
