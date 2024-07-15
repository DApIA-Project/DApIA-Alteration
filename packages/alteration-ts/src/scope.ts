import { Icao, Scope } from './types'

export const always: Scope = (_) => true
export const never: Scope = (_) => false

export function and(...scopes: Scope[]): Scope {
  if (scopes.length == 0) return never
  return (msg) => scopes.reduce((acc, scope) => acc && scope(msg), true)
}

export function not(scope: Scope): Scope {
	return (msg) => !scope(msg);
}

export function target(hexIdent: Icao): Scope {
  return (msg) => msg.hexIdent === hexIdent
}

export function timeWindow(lower_bound: number, upper_bound: number): Scope {
  return (msg) =>
    msg.timestampGenerated <= upper_bound &&
    msg.timestampGenerated >= lower_bound
}
