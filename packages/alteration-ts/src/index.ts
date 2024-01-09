export * from "./message"
export * from "./types"
export * from "./actions"
export * from "./scope"
export * from "./engine"

import { Message } from './types'

export function clone(arr: readonly Message[]) {
	return arr.map((x: Message) => {return {...x}});
}


