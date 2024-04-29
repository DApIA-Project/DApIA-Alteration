import { AircraftBuilder } from "../../src"
import { expect } from "chai"
describe("Aircraft Trajectory Builder", () => {
	it("should create an interpolation that's pass throught waypoint", () => {
		let trajectory = new AircraftBuilder()
							.add_point({timestampGenerated : 1000, latitude: 1.0, longitude: 9.5, altitude: 15000})
							.add_point({timestampGenerated : 2000, latitude: 1.1, longitude: 9.6, altitude: 15025})
							.add_point({timestampGenerated : 3000, latitude: 1.2, longitude: 9.7, altitude: 15050})
							.add_point({timestampGenerated : 4000, latitude: 1.3, longitude: 9.8, altitude: 15075})
							.add_point({timestampGenerated : 5000, latitude: 1.4, longitude: 9.9, altitude: 15100})
							.interpolate();
		expect(trajectory.get_point(1000)).to.include({
			latitude: 1.0,
			longitude: 9.5,
			altitude: 15000,
		});

		expect(trajectory.get_point(2000)).to.include({
			latitude: 1.1, 
			longitude: 9.6,
			altitude: 15025,
		});

		expect(trajectory.get_point(3000)).to.include({
			latitude: 1.2,
			longitude: 9.7, 
			altitude: 15050,
		});

		expect(trajectory.get_point(4000)).to.include({
			latitude: 1.3, 
			longitude: 9.8, 
			altitude: 15075
		});

		expect(trajectory.get_point(5000)).to.include({
			latitude: 1.4, 
			longitude: 9.9, 
			altitude: 15100,
		});
	});


	it("should interpolate altitude rounded to 25", () => {
		let trajectory = new AircraftBuilder()
							.add_point({timestampGenerated : 1000, latitude: 1.0, longitude: 9.5, altitude: 15000})
							.add_point({timestampGenerated : 2000, latitude: 1.1, longitude: 9.6, altitude: 15020})
							.add_point({timestampGenerated : 3000, latitude: 1.2, longitude: 9.7, altitude: 15040})
							.add_point({timestampGenerated : 4000, latitude: 1.3, longitude: 9.8, altitude: 15060})
							.add_point({timestampGenerated : 5000, latitude: 1.4, longitude: 9.9, altitude: 15080})
							.interpolate();

		for(let i=1000; i < 5000; i++) {
			expect(trajectory.get_point(i).altitude % 25).to.be.equals(0);
		}
	});


	it("should return track", () => {
		let trajectory = new AircraftBuilder() 
							.add_point({timestampGenerated : 1000, latitude: 0.0, longitude: 0.0, altitude: 10000})
							.add_point({timestampGenerated : 2000, latitude: 1.0, longitude: 0.0, altitude: 10000})
							.add_point({timestampGenerated : 3000, latitude: 2.0, longitude: 0.0, altitude: 10000})
							.add_point({timestampGenerated : 4000, latitude: 2.0, longitude: 1.0, altitude: 10000})
							.add_point({timestampGenerated : 5000, latitude: 2.0, longitude: 2.0, altitude: 10000})
							.add_point({timestampGenerated : 6000, latitude: 1.0, longitude: 2.0, altitude: 10000})
							.add_point({timestampGenerated : 7000, latitude: 0.0, longitude: 2.0, altitude: 10000})
							.add_point({timestampGenerated : 8000, latitude: 0.0, longitude: 1.0, altitude: 10000})
							.add_point({timestampGenerated : 9000, latitude: 0.0, longitude: 0.0, altitude: 10000})
							.interpolate();
	
		console.log(trajectory.get_point(2000));	
		console.log(trajectory.get_point(2500));	
		console.log(trajectory.get_point(3000));	
		expect(trajectory.get_point(3000)).to.include({latitude: 2.0, longitude: 0.0});
		expect(trajectory.get_track(2500)).to.be.closeTo(0.0, 0.1);
		expect(trajectory.get_track(4500)).to.be.closeTo(90.0, 0.1);
		expect(trajectory.get_track(6500)).to.be.closeTo(180.0, 0.1);
		expect(trajectory.get_track(8500)).to.be.closeTo(270.0, 0.1);
	});


	it("should return verticalRate", () => {
		let trajectory = new AircraftBuilder() 
							.add_point({timestampGenerated: 0, latitude: 0.0, longitude: 0.0, altitude: 10000})
							.add_point({timestampGenerated: 10000, latitude: 1.0, longitude: 0.0, altitude: 11000})
							.add_point({timestampGenerated: 11000, latitude: 1.0, longitude: 0.0, altitude: 10900})
							.add_point({timestampGenerated: 20000, latitude: 2.0, longitude: 0.0, altitude: 10000})
							.add_point({timestampGenerated: 30000, latitude: 2.0, longitude: 1.0, altitude: 10500})
							.add_point({timestampGenerated: 40000, latitude: 2.0, longitude: 2.0, altitude: 10000})
							.interpolate();
/*
		for(let t=5000; t < 35000; t+=2500) {
			console.log("[" + t + " s] Altitude : "+ trajectory.get_altitude(t) + " Vertical rate : " + trajectory.get_verticalRate(t));
		}
*/

		expect(trajectory.get_verticalRate(0)).not.to.be.an("undefined");
		expect(trajectory.get_verticalRate(499)).not.to.be.an("undefined");
		expect(trajectory.get_verticalRate(99501)).not.to.be.an("undefined");

		expect(trajectory.get_verticalRate(5000)).to.be.equals(6016);
		expect(trajectory.get_verticalRate(15000)).to.be.equals(-6016);
		//expect(trajectory.get_verticalRate(25000)).to.be.equals(3000);
		//expect(trajectory.get_verticalRate(35000)).to.be.equals(-3000);
	});
/*
	it("should return ground speed", () => {

	});

 */

	it("not strictly increasing values", () => {
		let trajectory = new AircraftBuilder()
			.add_point({timestampGenerated: 0, latitude: 0, longitude: 0, altitude: 0})
			.add_point({timestampGenerated: 1, latitude: 0, longitude: 0, altitude: 0})
			.add_point({timestampGenerated: 2, latitude: 0, longitude: 0, altitude: 0})
			.add_point({timestampGenerated: 3, latitude: 0, longitude: 0, altitude: 0})
			.add_point({timestampGenerated: 4, latitude: 0, longitude: 0, altitude: 0})
			;

			trajectory.interpolate();

	});

	it("should sort waypoint with time", () => {

		let trajectory = new AircraftBuilder()
		.add_point({timestampGenerated: 3, latitude: 0, longitude: 0, altitude: 0})
		.add_point({timestampGenerated: 1, latitude: 0, longitude: 0, altitude: 0})
		.add_point({timestampGenerated: 0, latitude: 0, longitude: 0, altitude: 0})
		.add_point({timestampGenerated: 2, latitude: 0, longitude: 0, altitude: 0})
		.add_point({timestampGenerated: 4, latitude: 0, longitude: 0, altitude: 0})
		;



		trajectory.interpolate();

	});
});
