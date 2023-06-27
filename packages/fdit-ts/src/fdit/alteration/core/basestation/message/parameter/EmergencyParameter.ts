export interface EmergencyParameter {
  isEmergency(): boolean | null
  setEmergency(emergency: boolean): void
}
