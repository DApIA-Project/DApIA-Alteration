export interface Message {
  getIcao(): string
  getMask(): number | null
  setIcao(icao: string): void
  setMask(mask: number): void
  copy(): Message
  toStringWithMask(): string
}
