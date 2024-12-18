import { Action, clone, Message, Template } from '../index'
import { AircraftBuilder, Point } from '../aircraftTrajectory'

type Config = {
  start: number
  end: number
  template: Template
  waypoints: Point[]
  noise?: boolean
  timeOffset?: () => number
}

function rand(min: number, max: number) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled) // The maximum is exclusive and the minimum is inclusive
}

/**
 * Create a new aircraft and insert it in the given recording
 * The aircraft have the properties contained in `template` message
 * The trajectory of the aircraft is defined by the waypoins
 *
 * The template message SHOULD define mandatory field (messageType, flightID, ...)
 */
export function creation({
  noise,
  end,
  waypoints,
  timeOffset,
  template,
  start,
}: Config): Action {
  if (!timeOffset) timeOffset = () => rand(400, 600)

  // Create the interpolation function
  let trajectory = new AircraftBuilder().add_all(waypoints).interpolate()

  return {
    processing(recording: Message[]): Message[] {
      let new_recording = clone(recording)

      let time = start
      while (time <= end) {
        let point = trajectory.get_point(time, noise)
        let msg = {
          ...(template as Message),
          ...point,
          messageType: 'MSG',
        }
        new_recording.push(msg)

        time += timeOffset!()
      }

      return new_recording
        .sort((a, b) => a.timestampGenerated - b.timestampGenerated)
        .slice(0, -1)
    },
  }
}
