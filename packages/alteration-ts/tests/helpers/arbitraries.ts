
import * as fc from "fast-check";
import { Earth, Angle, Point, Position } from "../../src"

let hasNoNaN = (obj) => Object.values(obj).every((v) => !isNaN(v));

export class gen {
	static point(time?: number): fc.Arbitrary<Point> {
		return fc.record({
			latitude: fc.float({min: 40, max: 50}),
			longitude: fc.float({min: -1, max: 8}),
			altitude: fc.constant(7400),
			timestampGenerated: fc.constant(time ?? 0),
		}).filter(hasNoNaN)
	}

	static line(points?: number): fc.Arbitrary<Point[]> {
		return fc.tuple(gen.point(Date.now()), gen.point()).chain(([start, end]) => {

			// Compute timestamp at the end (with average speed of plane)
			// We use the average speed of 863 km/h (airbus A320) => 240 m/s
			let dist = Earth.distance_meters(
				[Angle.degree(start.latitude), Angle.degree(start.longitude)],
				[Angle.degree(end.latitude), Angle.degree(end.longitude)]);

			end.timestampGenerated	=  start.timestampGenerated + ((dist / 240) * 1000);

			// Compute delta for each step of the line
			let delta_phi = end.latitude - start.latitude;
			let delta_lambda = end.longitude - start.longitude;
			let delta_ts = end.timestampGenerated - start.timestampGenerated;


			let line = [];
			line.push(start);
			for(let i=1; i < points - 1; i++) {
				line.push({
					latitude : start.latitude + i * (delta_phi / points),
					longitude: start.longitude + i * (delta_lambda / points),
					altitude: start.altitude,
					timestampGenerated: start.timestampGenerated + i * (delta_ts / points)
				});
			}
			line.push(end);

			return fc.constant(line);
		});
	}

	static rand(min, max) {
		  return Math.random() * (max - min) + min;
	}

	static waypoints(n? :number): fc.Arbitrary<Point[]> {
		return gen.line(n).map((line) => line.map((p: Point) => {
			return {
				latitude: gen.rand(p.latitude - 1, p.latitude + 1),
				longitude: gen.rand(p.longitude - 0.1, p.longitude + 0.1),
				altitude: gen.rand(p.altitude - 100, p.altitude + 100),
				timestampGenerated: p.timestampGenerated,
			};
		}));
	}
}
/*
describe('helpers', () => {
	it("should never produce NaN", () => {
		fc.assert(fc.property(gen.point(), (p) => !isNaN(p.latitude)
																					 && !isNaN(p.longitude)
																					 && !isNaN(p.altitude)
																					 && !isNaN(p.timestampGenerated)));
		fc.assert(fc.property(gen.line(10), (l) => l.every(hasNoNaN)));
		fc.assert(fc.property(gen.waypoints(10), (w) => w.every(hasNoNaN)));
	});

	it("should produces line with a non null time of travel", () => {
		fc.assert(fc.property(gen.line(5), (l) => l[0].timestampGenerated < l[4].timestampGenerated));
		fc.assert(fc.property(gen.waypoints(5), (l) => l[0].timestampGenerated < l[4].timestampGenerated));
	});
});
*/
