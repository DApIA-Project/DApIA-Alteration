import { createInterpolatorWithFallback } from "commons-math-interpolation";

describe("akima", () => {
	it("should works", () => {
		const xVals = [0,1,2,3,4,5,6];
		const yVals = [0,0,0,9,0,0,0];

		const interpolator = createInterpolatorWithFallback("akima", xVals, yVals);
		for(let i=0; i < 6; i+=0.5){
			//console.log(i + " " + interpolator(i));
		}
	});
});
