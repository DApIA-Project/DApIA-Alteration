import { Sensor, Sensors } from './Sensor'

export class Incident {
  public sensors: Sensors

  public getSensors(): Sensor[] {
    if (this.sensors != null) {
      return this.sensors.sensorList
    } else {
      return []
    }
  }

  public setSensors(sensors: Sensors): void {
    this.sensors = sensors
  }
}
