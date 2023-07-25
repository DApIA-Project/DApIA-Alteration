import { BaseStationMessage } from './BaseStationMessage'
import * as fs from 'fs'
import { FlightParameter } from './flightParameter'

export class UnknownActionException extends Error {
  constructor(actionType: string) {
    super(`Unknown action type: ${actionType}`)
    this.name = 'UnknownActionException' + actionType
  }
}

export enum ActionType {
  ALTERATION = 'ALTERATION',
  CREATION = 'CREATION',
  DELAY = 'ALTERATIONTIMESTAMP',
  DELETION = 'DELETION',
  SATURATION = 'SATURATION',
  REPLAY = 'REPLAY',
  TRAJECTORY_MODIFICATION = 'TRAJECTORY',
  ROTATION = 'ROTATION',
  CUT = 'CUT',
}

export interface ActionParameters<T> {
  type: ActionType
  data: T
}

export class Action {
  private counters: Map<ActionType, number> = new Map()
  private frequencies: Map<ActionType, number> = new Map()

  constructor() {
    for (const actionType of Object.values(ActionType)) {
      this.counters.set(actionType, this.frequencies.get(actionType) || 0)
    }
  }
  //
  doSwitch(
    type: ActionType,
    message: BaseStationMessage,
    parameters: any
  ): void {
    switch (type) {
      case ActionType.ALTERATION:
        this.applyAlteration(message, parameters)
        break
      case ActionType.CREATION:
        this.applyCreation(message, parameters)
        break
      case ActionType.DELAY:
        this.applyDelay(message, parameters)
        break
      case ActionType.DELETION:
        this.applyDeletion(message, type)
        break
      case ActionType.SATURATION:
        this.applySaturation(message, parameters)
        break
      case ActionType.REPLAY:
        this.applyReplay(message, parameters)
        break
      case ActionType.TRAJECTORY_MODIFICATION:
        this.applyTrajectoryModification(message, parameters)
        break
      case ActionType.ROTATION:
        this.applyRotation(message, parameters)
        break
      case ActionType.CUT:
        this.applyCut(message, parameters)
        break
      default:
        throw new UnknownActionException(type)
    }
  }

  private applyAlteration(
    message: BaseStationMessage,
    parameters: ActionParameters<string>
  ): void {
    if (parameters.data) {
      switch (parameters.data) {
        case 'callsign':
          message.alterCallsign(parameters.data)
          break
        case 'altitude':
          message.alterAltitude(Number(parameters.data))
          break
        case 'groundSpeed':
          message.alterGroundSpeed(Number(parameters.data))
          break
        case 'track':
          message.alterTrack(Number(parameters.data))
          break
        case 'latitude':
          message.alterLatitude(Number(parameters.data))
          break
        case 'longitude':
          message.alterLongitude(Number(parameters.data))
          break
        case 'verticalRate':
          message.alterVerticalRate(Number(parameters.data))
          break
        case 'squawk':
          message.alterSquawk(Number(parameters.data))
          break
        case 'alert':
          message.alterAlert(parameters.data === 'alert')
          break
        case 'emergency':
          message.alterEmergency(parameters.data === 'emergency')
          break
        case 'spi':
          message.alterSpi(parameters.data === 'spi')
          break
        case 'onGround':
          message.alterOnGround(parameters.data === 'onGround')
          break
        default:
          break
      }
    }
  }

  private applyCreation(
    message: BaseStationMessage,
    parameters: ActionParameters<any>
  ): void {
    const newMessage = new BaseStationMessage(
      message.transmissionType,
      message.sessionID,
      message.aircraftID,
      message.icao,
      message.flightID,
      message.timestampGenerated,
      message.timestampLogged,
      message.callSign ?? null,
      message.altitude ?? null,
      message.groundSpeed ?? null,
      message.track ?? null,
      message.latitude ?? null,
      message.longitude ?? null,
      message.verticalRate ?? null,
      message.squawk ?? null,
      message.alert,
      message.emergency,
      message.spi,
      message.onGround,
      message.extraField
    )

    Object.assign(message, newMessage)
  }

  private applyDelay(
    message: BaseStationMessage,
    parameters: ActionParameters<string>
  ): void {
    if (parameters.data) {
      const delay = parseInt(parameters.data)
      message.setTimestampGenerated(message.getTimestampGenerated() + delay)
      message.setTimestampLogged(message.getTimestampLogged() + delay)
    }
  }

  private applyDeletion(message: BaseStationMessage, action: ActionType): void {
    const actionType = action
    const counter = this.counters.get(actionType)
    //console.log(actionType)
    const frequency = this.frequencies.get(actionType) || 0

    if (!counter || frequency === 0) {
      return
    }

    this.counters.set(actionType, counter + 1)

    if (counter === frequency) {
      this.counters.set(actionType, 0)

      message.setTransmissionType(null)
      message.setSessionID(null)
      message.setAircraftID(null)
      message.setIcao(null)
      message.setFlightID(null)
      message.setTimestampGenerated(null)
      message.setTimestampLogged(null)
      message.setCallsign(null)
      message.setAltitude(null)
      message.setGroundSpeed(null)
      message.setTrack(null)
      message.setLatitude(null)
      message.setLongitude(null)
      message.setVerticalRate(null)
      message.setSquawk(null)
      message.setAlert(false)
      message.setEmergency(false)
      message.setSpi(false)
      message.setOnGround(false)
      message.setExtraField(null)
    }
  }

  private applySaturation(
    message: BaseStationMessage,
    parameters: ActionParameters<number>
  ): string {
    const numberOfMessages = parameters.data
    const icao = message.getIcao()
    const generatedMessages: BaseStationMessage[] = []

    for (let i = 0; i < numberOfMessages; i++) {
      const fakeMessage = message.copy()

      generatedMessages.push(fakeMessage)
    }
    return messagesToLines(generatedMessages)
  }

  private applyReplay(
    message: BaseStationMessage,
    parameters: ActionParameters<string>
  ): string {
    const sourceRecordingPath = parameters.data

    const sourceMessages = extractMessagesFromFile(
      sourceRecordingPath,
      message.getTimestampGenerated(),
      message.getTimestampGenerated()
    )

    const messagesToInsert = sourceMessages.map((sourceMessage) => {
      const insertedMessage = message.copy()
      insertedMessage.setAircraftID(sourceMessage.getAircraftID())
      insertedMessage.setAltitude(sourceMessage.getAltitude())
      insertedMessage.setGroundSpeed(sourceMessage.getGroundSpeed())
      insertedMessage.setLatitude(sourceMessage.getLatitude())
      insertedMessage.setLongitude(sourceMessage.getLongitude())
      insertedMessage.setTimestampGenerated(
        sourceMessage.getTimestampGenerated()
      )
      insertedMessage.setTimestampLogged(sourceMessage.getTimestampLogged())

      return insertedMessage
    })

    const allMessages = [...messagesToInsert, message]

    return messagesToLines(allMessages)
  }

  private applyTrajectoryModification(
    message: BaseStationMessage,
    parameters: ActionParameters<string>
  ): void {}

  private applyRotation(
    message: BaseStationMessage,
    parameters: ActionParameters<string>
  ): void {}

  private applyCut(
    message: BaseStationMessage,
    parameters: ActionParameters<string>
  ): void {}
}
function messagesToLines(messages: BaseStationMessage[]): string {
  messages.sort((a, b) => a.getTimestampGenerated() - b.getTimestampGenerated())

  const lines: string[] = []
  for (const message of messages) {
    lines.push(message.toString())
  }
  //

  return lines.join('\n')
}

function extractMessagesFromFile(
  filePath: string,
  start: number,
  end: number
): BaseStationMessage[] {
  const messages: BaseStationMessage[] = []
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const lines = fileContent.split('\n')

  for (const line of lines) {
    const messageParts = line.split(',')
    //
    if (messageParts.length >= 22) {
      const transmissionType = parseInt(messageParts[0])
      const sessionID = parseInt(messageParts[1])
      const aircraftID = parseInt(messageParts[2])
      const icao = messageParts[3]
      const flightID = parseInt(messageParts[4])
      const timestampGenerated = new Date(messageParts[6]).getTime()
      const timestampLogged = new Date(messageParts[8]).getTime()
      const callSign = messageParts[9] || null
      const altitude = parseFloat(messageParts[10]) || null
      const groundSpeed = parseFloat(messageParts[11]) || null
      const track = parseFloat(messageParts[12]) || null
      const latitude = parseFloat(messageParts[13]) || null
      const longitude = parseFloat(messageParts[14]) || null
      const verticalRate = parseFloat(messageParts[15]) || null
      const squawk = parseFloat(messageParts[16]) || null
      const alert = messageParts[17] === '1'
      const emergency = messageParts[18] === '1'
      const spi = messageParts[19] === '1'
      const onGround = messageParts[20] === '1'

      const message = new BaseStationMessage(
        transmissionType,
        sessionID,
        aircraftID,
        icao,
        flightID,
        timestampGenerated,
        timestampLogged,
        callSign,
        altitude,
        groundSpeed,
        track,
        latitude,
        longitude,
        verticalRate,
        squawk,
        alert,
        emergency,
        spi,
        onGround
      )

      if (timestampGenerated >= start && timestampGenerated <= end) {
        messages.push(message)
      }
    }
  }
  return messages
}
