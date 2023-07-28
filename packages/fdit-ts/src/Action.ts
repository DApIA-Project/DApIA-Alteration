import { BaseStationMessage } from './BaseStationMessage'
import * as fs from 'fs'
import { FlightParameter } from './flightParameter'
import { ActionLogger } from './ActionLogger'

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
  private actionLogger: ActionLogger
  private messages: BaseStationMessage[] = []

  constructor(actionLogger: ActionLogger) {
    for (const actionType of Object.values(ActionType)) {
      this.counters.set(actionType, this.frequencies.get(actionType) || 0)
    }
    this.actionLogger = actionLogger
  }

  // modifier messages  => messages []
  doSwitch(type: ActionType, filePath: string, parameters: any): void {
    const messages = extractAllMessageFromFile(
      filePath,
      parameters.start,
      parameters.end
    )

    switch (type) {
      case ActionType.ALTERATION:
        this.applyAlteration(messages, parameters)
        this.actionLogger.incrementAlteredMessage()
        break
      case ActionType.CREATION:
        this.applyCreation(messages, parameters)
        this.actionLogger.incrementCreatedMessage()
        break
      case ActionType.DELAY:
        this.applyDelay(messages, parameters)
        this.actionLogger.incrementAlteredMessage()
        break
      case ActionType.DELETION:
        this.applyDeletion(messages, parameters)
        this.actionLogger.incrementDeletedMessage()
        break
      case ActionType.SATURATION:
        this.applySaturation(messages, parameters)
        this.actionLogger.incrementAlteredMessage()
        break
      case ActionType.REPLAY:
        this.applyReplay(messages, parameters)
        this.actionLogger.incrementModifiedMessage()
        break
      case ActionType.TRAJECTORY_MODIFICATION:
        this.applyTrajectoryModification(messages, parameters)
        this.actionLogger.incrementModifiedMessage()
        break
      case ActionType.ROTATION:
        this.applyRotation(messages, parameters)
        this.actionLogger.incrementModifiedMessage()
        break
      case ActionType.CUT:
        this.applyCut(messages, parameters)
        this.actionLogger.incrementDeletedMessage()
        break
      default:
        throw new UnknownActionException(type)
    }
  }

  private applyAlteration(
    messages: BaseStationMessage[],
    parameters: ActionParameters<string>
  ): void {
    if (parameters.data) {
      for (const message of messages) {
        switch (parameters.data) {
          case 'callsign':
            message.alterCallsign(parameters.data)
            break
          case 'altitude':
            message.alterAltitude(Number(parameters.data))
            break
          case 'groundSpeed':
            message.alterGroundSpeed(Number(parameters.data))
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
  }

  private applyCreation(
    messages: BaseStationMessage[],
    parameters: ActionParameters<any>
  ): void {
    const newMessages: BaseStationMessage[] = []
    for (const message of messages) {
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

      newMessages.push(newMessage)
    }

    messages.push(...newMessages)
  }

  private applyDelay(
    messages: BaseStationMessage[],
    parameters: ActionParameters<string>
  ): void {
    if (parameters.data) {
      const delay = parseInt(parameters.data)
      for (const message of messages) {
        message.setTimestampGenerated(message.getTimestampGenerated() + delay)
        message.setTimestampLogged(message.getTimestampLogged() + delay)
      }
    }
  }
  private applyDeletion(
    messages: BaseStationMessage[],
    parameters: ActionParameters<number>
  ): void {
    const frequency = parameters.data

    if (frequency <= 0) {
      // If frequency is 0 or negative, delete all messages
      this.deleteAllMessages(messages)
    } else {
      messages = messages.filter((_, index) => (index + 1) % frequency !== 0)
    }
  }

  private deleteAllMessages(messages: BaseStationMessage[]): void {
    // Remove all messages
    messages.length = 0
  }

  private applySaturation(
    messages: BaseStationMessage[],
    parameters: ActionParameters<number>
  ): string {
    const numberOfMessages = parameters.data
    const icao = messages[0].getIcao()
    const generatedMessages: BaseStationMessage[] = []

    for (let i = 0; i < numberOfMessages; i++) {
      for (const message of messages) {
        const fakeMessage = message.copy()
        generatedMessages.push(fakeMessage)
      }
    }

    return messagesToLines(generatedMessages)
  }
  private applyReplay(
    messages: BaseStationMessage[],
    parameters: ActionParameters<string>
  ): string {
    const sourceRecordingPath = parameters.data
    const sourceMessages = extractAllMessageFromFile(
      sourceRecordingPath,
      messages[0].getTimestampGenerated(),
      messages[messages.length - 1].getTimestampGenerated()
    )

    const messagesToInsert = sourceMessages.map((sourceMessage) => {
      const insertedMessage = sourceMessage.copy()
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

    const allMessages = [...messagesToInsert, ...messages]

    return messagesToLines(allMessages)
  }

  private applyTrajectoryModification(
    message: BaseStationMessage[],
    parameters: ActionParameters<string>
  ): void {}

  private applyRotation(
    message: BaseStationMessage[],
    parameters: ActionParameters<string>
  ): void {}

  private applyCut(
    messages: BaseStationMessage[],
    parameters: ActionParameters<string>
  ): void {
    const targetIcaos = parameters.data.toLowerCase().split(',')
    const filteredMessages = messages.filter(
      (message) => !targetIcaos.includes(message.getIcao().toLowerCase())
    )

    messages.length = 0
    messages.push(...filteredMessages)
  }
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

export function extractAllMessageFromFile(
  filePath: string,
  start?: number,
  end?: number
): BaseStationMessage[] {
  const lines = fs.readFileSync(filePath, 'utf-8').split('\n')
  const messages: BaseStationMessage[] = []

  if (start && end && start > end) {
    ;[start, end] = [end, start]
  }

  for (const line of lines) {
    const values = line.split(',')

    const messageType = values[0]

    if (messageType === 'MSG' && values.length >= 22) {
      const [
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
        onGround,
        extraField,
        ...rest // Rest of the fields, if any
      ] = values

      // The 'extraField' here will capture all remaining fields beyond the 21st field.

      const messageTimestamp = parseInt(timestampGenerated)

      // Check if the message is within the specified time range (start and end parameters)
      if (
        (!start || messageTimestamp >= start) &&
        (!end || messageTimestamp <= end)
      ) {
        const message = new BaseStationMessage(
          parseInt(transmissionType),
          parseInt(sessionID),
          parseInt(aircraftID),
          icao,
          parseInt(flightID),
          messageTimestamp,
          parseInt(timestampLogged),
          callSign !== '' ? callSign : null,
          altitude !== '' ? parseInt(altitude) : null,
          groundSpeed !== '' ? parseInt(groundSpeed) : null,
          track !== '' ? parseInt(track) : null,
          latitude !== '' ? parseFloat(latitude) : null,
          longitude !== '' ? parseFloat(longitude) : null,
          verticalRate !== '' ? parseInt(verticalRate) : null,
          squawk !== '' ? parseInt(squawk) : null,
          alert === '1' ? true : null,
          emergency === '1' ? true : null,
          spi === '1' ? true : null,
          onGround === '1' ? true : null,
          extraField !== '' ? JSON.parse(extraField) : null
        )

        messages.push(message)
      }
    }
  }

  return messages
}

//
function isMessageTargeted(
  message: BaseStationMessage,
  targetsStr: string
): boolean {
  return (
    targetsStr.localeCompare('ALL') === 0 ||
    targetsStr
      .toLowerCase()
      .split(',')
      .includes(message.getIcao().toLowerCase())
  )
}
