import { rotation, timeWindow, parse, earth_azimuth } from "../../../src"
import { expect } from "chai"


describe("Rotation engine", () => {
	it("should rotate all recroding", () => {
		let start_date = 1543148536239;
		let src = parse('MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:16.239,2018/11/25,12:22:16.239,,30000.0,,,48.2206,3.557,,,0,0,0,0\n' +
										'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,12:22:16.424,2018/11/25,12:22:16.424,,,517.63,336.31,,,0.0,,,,,\n' +
										'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:16.842,2018/11/25,12:22:16.842,,30000.0,,,48.2219,3.5562,,,0,0,0,0\n' +
										'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:18.758,2018/11/25,12:22:18.758,,30000.0,,,48.226,3.5534,,,0,0,0,0\n' +
										'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.221,2018/11/25,12:22:19.221,,29975.0,,,48.2271,3.5527,,,0,0,0,0\n' +
										'MSG,1,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.501,2018/11/25,12:22:19.501,AZA676,,,,,,,,,,,\n' +
										'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.695,2018/11/25,12:22:19.695,,29975.0,,,48.2271,3.5527,,,0,0,0,0\n' +
										'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.843,2018/11/25,12:22:19.843,,,517.63,336.31,,,0,,,,,\n' +
										'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:20.171,2018/11/25,12:22:20.171,,30000.0,,,48.2293,3.5513,,,0,0,0,0\n' +
										'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:20.179,2018/11/25,12:22:20.179,,30000.0,,,48.228,3.5522,,,0,0,0,0\n' +
										'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:20.800,2018/11/25,12:22:20.800,,30000.0,,,48.2306,3.5505,,,0,0,0,0');

		let expected = parse('MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:16.239,2018/11/25,12:22:16.239,,30000,,,48.2206,3.557,,,0,0,0,0\n' +
												 'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,12:22:16.424,2018/11/25,12:22:16.424,,,517.63,336.31,,,0,,,,,\n' +
												 'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:16.842,2018/11/25,12:22:16.842,,30000,,,48.2211,3.5590,,,0,0,0,0\n' +
												 'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:18.758,2018/11/25,12:22:18.758,,30000,,,48.223,3.5651,,,0,0,0,0\n' +
												 'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.221,2018/11/25,12:22:19.221,,29975,,,48.2235,3.5668,,,0,0,0,0\n' +
												 'MSG,1,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.501,2018/11/25,12:22:19.501,AZA676,,,,,,,,,,,\n' +
												 'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.695,2018/11/25,12:22:19.695,,29975,,,48.2235,3.5668,,,0,0,0,0\n' +
												 'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.843,2018/11/25,12:22:19.843,,,517.63,336.31,,,0,,,,,\n' +
												 'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:20.171,2018/11/25,12:22:20.171,,30000,,,48.2244,3.5701,,,0,0,0,0\n' +
												 'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:20.179,2018/11/25,12:22:20.179,,30000,,,48.224,3.5681,,,0,0,0,0\n' +
												 'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:20.800,2018/11/25,12:22:20.800,,30000,,,48.2249,3.5720,,,0,0,0,0');
 
		let actual = rotation({
			scope: timeWindow(start_date, start_date + 5000),
			angle: 90,
		}).processing(src);

		expect(actual).to.be.deep.equals(expected)

	});
});
