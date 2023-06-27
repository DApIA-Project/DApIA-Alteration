export interface AlertParameter {
  isAlert(): boolean | null
  setAlert(alert: boolean): void
}
