
import { alteration, AlterationMode, parse, always } from "../../../src"

describe("Property alteration engine", () => {
	it("should work", () => {
		let action = alteration({
			scope: always,
			property: "altitude",
			value: "1000",
			mode: AlterationMode.OFFSET,
		});

		let msg = parse("MSG,0,3,10610299,A1E67B,10610299,2019/04/19,17:30:00.140,2019/04/19,17:30:00.140,,16625.0,,,50.4073,8.2464,,,0,0,0,0");
		console.log(action.processing(msg));
	})
});
