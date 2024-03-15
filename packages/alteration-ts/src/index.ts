export * from "./message"
export * from "./types"
export * from "./actions"
export * from "./scope"
export * from "./engine"
export * from "./aircraftTrajectory"
export * from "./utils"
export * from "./template"

import { Message } from './types'

export function clone(arr: readonly Message[]) {
	return arr.map((x: Message) => {return {...x}});
}


/**
 * Operation with a fixed floating point number precission 
 * Default precision is 2 (3.1234567890001 => 0 3.12)
 */ 
type Op = "-" | "+" | "*" | "/" 
export function op(op: Op, lhs: number, rhs: number, n = 2) {
	let result: number;
	switch(op) {
		case "-": result = lhs - rhs; break;
		case "+": result = lhs + rhs; break;
		case "*": result = lhs * rhs; break;
		case "/": result = lhs / rhs; break;
	}

	return parseFloat(result.toPrecision(n));
}
