import { rotation, timeWindow, parse, earth_azimuth } from "../../../src"
import { expect } from "chai"


describe("Rotation engine", () => {
	it("should rotate", () => {
		let start_date = 1672575671000;
		let src = parse("MSG,3,1,1,39c902,1,2023/01/01,12:21:11.000,2023/01/01,12:21:11.000,SAMU13,125,6.7082,296.565051177078,43.289794921875,5.40233523346657,1152.0,,1,0,1,1\n" +
										"MSG,3,1,1,39c902,1,2023/01/01,12:21:12.000,2023/01/01,12:21:12.000,SAMU13,150,8.544,290.5560452195834,43.28981043928761,5.402265276227679,1088.0,,1,0,1,1\n" +
										"MSG,3,1,1,39c902,1,2023/01/01,12:21:14.000,2023/01/01,12:21:14.000,SAMU13,162.5,8.9443,296.565051177078,43.28988647460938,5.40214361146439,960.0,,1,0,1,1\n" +
										"MSG,3,1,1,39c902,1,2023/01/01,12:21:15.000,2023/01/01,12:21:15.000,SAMU13,150,10.0,306.869897645844,43.28990354376324,5.402134486607142,448.0,,1,0,1,1\n" +
										"MSG,3,1,1,39c902,1,2023/01/01,12:21:16.000,2023/01/01,12:21:16.000,SAMU13,162.5,9.434,302.0053832080835,43.28988647460938,5.402079737463663,320.0,,1,0,1,1\n" +
										"MSG,3,1,1,39c902,1,2023/01/01,12:21:18.000,2023/01/01,12:21:18.000,SAMU13,175,12.0416,311.6335393365702,43.28997802734375,5.401951989462209,192.0,,1,0,1,1");

		let actual = rotation({
			scope: timeWindow(start_date, start_date + 10000),
			angle: 80.0,
		}).processing(src);

		expect(actual[1].track!).to.be.closeTo(290.6, 0.1);
		console.log(actual);
	});


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
												 'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,12:22:16.424,2018/11/25,12:22:16.424,,,517.6,336.3,,,0,,,,,\n' +
												 'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:16.842,2018/11/25,12:22:16.842,,30000,,,48.22113,3.55895,,,0,0,0,0\n' +
												 'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:18.758,2018/11/25,12:22:18.758,,30000,,,48.223,3.56511,,,0,0,0,0\n' +
												 'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.221,2018/11/25,12:22:19.221,,29975,,,48.22346,3.56676,,,0,0,0,0\n' +
												 'MSG,1,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.501,2018/11/25,12:22:19.501,AZA676,,,,,,,,,,,\n' +
												 'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.695,2018/11/25,12:22:19.695,,29975,,,48.22346,3.56676,,,0,0,0,0\n' +
												 'MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,12:22:19.843,2018/11/25,12:22:19.843,,,517.6,336.3,,,0,,,,,\n' +
												 'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:20.171,2018/11/25,12:22:20.171,,30000,,,48.2244,3.57006,,,0,0,0,0\n' +
												 'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:20.179,2018/11/25,12:22:20.179,,30000,,,48.2238,3.56811,,,0,0,0,0\n' +
												 'MSG,3,3,5022202,4CA1FA,5022202,2018/11/25,12:22:20.800,2018/11/25,12:22:20.800,,30000,,,48.22493,3.57201,,,0,0,0,0');
 
		let actual = rotation({
			scope: timeWindow(start_date, start_date + 5000),
			angle: 90,
		}).processing(src);

		expect(actual).to.be.deep.equals(expected)

	});
});
