import { Engine, alteration, timeWindow } from '../../src'
import { expect } from "chai"

const start_date = 1606904067000;

describe("Engine Manager", () => {
	it("should run", () => {
		let engine = new Engine({
			actions: [ 
				alteration({
					scope: timeWindow(start_date, start_date + 100),
					modifications: []
				})
			]});

		expect(engine.actions).to.have.lengthOf(1);
	});
});
