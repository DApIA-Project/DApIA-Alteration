export function generateIcaoRandomOffset(Icao: string, range: number): string {
  let offset = Math.floor(Math.random() * range * 2) - range
  let IcaoInt = parseInt(Icao, 16)
  let newIcaoInt = IcaoInt + offset
  let newIcao = newIcaoInt.toString(16).toUpperCase()
  return newIcao
}
