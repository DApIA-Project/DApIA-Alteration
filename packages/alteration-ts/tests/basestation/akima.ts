import { createInterpolatorWithFallback } from "commons-math-interpolation";

describe("akima", () => {
	it("should works", () => {
		const xVals = [0, 3, 7, 10];
		const yVals = [1, 5, -3, 0];

		const interpolator = createInterpolatorWithFallback("akima", xVals, yVals);
	});
});
