import { AircraftBuilder, clone, Message, Scope, Template } from '../index'
import { Angle, Earth, lat, lon, Position } from '../utils'

export type SaturationConfig = {
  scope: Scope
  aircrafts: number
  angleMax: number
  noise?: boolean
}

export function saturation(config: SaturationConfig) {
  // Create variables for ghosts aircrafts
  let angles: number[] = []
  let icaos: string[] = []
  let builders: AircraftBuilder[] = []

  for (let i = 0; i < config.aircrafts; i++) {
    angles[i] = Math.random() * (2 * config.angleMax) - config.angleMax
    icaos[i] = Math.round(Math.random() * 0xffffff).toString(16)
    builders[i] = new AircraftBuilder()
  }

  return {
    processing(recording: Message[]): Message[] {
      let new_recording = clone(recording)

      let positions = recording.filter((msg) => msg.transmissionType == 3)
      let start = positions.find((msg) => config.scope(msg))
      if (start == undefined) return recording

      for (let msg of positions) {
        if (!config.scope(msg)) continue

        for (let i = 0; i < config.aircrafts; i++) {
          let new_pos = this.compute_rotation(
            start,
            msg,
            Angle.degree(angles[i])
          )
          builders[i].add_point({
            timestampGenerated: msg.timestampGenerated,
            latitude: lat(new_pos).deg,
            longitude: lon(new_pos).deg,
            altitude: msg.altitude!, // altitude is mandatory in MSG,3
          })
        }
      }

      let ghosts = builders.map((builder) => builder.interpolate())

      for (let msg of recording) {
        if (!config.scope(msg)) continue

        if (msg.transmissionType != 3) {
          icaos.forEach((icao) =>
            new_recording.push({ ...msg, hexIdent: icao })
          )
          continue
        }

        for (let i = 0; i < config.aircrafts; i++) {
          let new_point = ghosts[i].get_point(
            msg.timestampGenerated,
            config.noise
          )
          let new_msg = Template.replace(msg, {
            ...new_point,
            hexIdent: icaos[i],
          })

          new_recording.push(new_msg)
        }
      }

      new_recording.sort((a: Message, b: Message) =>
        Math.sign(a.timestampGenerated - b.timestampGenerated)
      )

      return new_recording
    },

    compute_rotation(start: Message, current: Message, angle: Angle): Position {
      let p: Position = [
        Angle.degree(start.latitude!),
        Angle.degree(start.longitude!),
      ]
      let q: Position = [
        Angle.degree(current.latitude!),
        Angle.degree(current.longitude!),
      ]

      let d = Earth.distance_arc(p, q)
      let alpha = Angle.radian(angle.rad + Earth.azimuth(p, q).rad)
      return Earth.end_position(p, alpha, d)
    },
  }
}
