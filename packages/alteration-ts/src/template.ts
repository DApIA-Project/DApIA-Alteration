import { Message } from '.'

export type TemplateMessage =
  | Omit<Message, 'timestampGenerated' | 'timestampLogged'>
  | Partial<Pick<Message, 'timestampGenerated' | 'timestampLogged'>>
export class Template {
  static random(): TemplateMessage {
    return {
      messageType: 'MSG',
      transmissionType: 3,
      sessionID: Math.floor(Math.random() * 1000),
      aircraftID: Math.floor(Math.random() * 1000),
      hexIdent: (
        '000000' + Math.floor(Math.random() * 0xfffff).toString(16)
      ).substr(-6),
      flightID: Math.floor(Math.random() * 1000),
    }
  }

  static replace(template: Message, values: Partial<Message>): Message {
    let new_msg = { ...template }
    for (let k in new_msg) {
      if (new_msg[k] != undefined && values[k] != undefined) {
        if (typeof new_msg[k] == 'number') {
          let p = 0
          if (!Number.isInteger(new_msg[k]))
            p = (new_msg[k] + '').split('.')[1]?.length
          new_msg[k] = +(values[k] as number).toFixed(p)

          continue
        }
        new_msg[k] = values[k]
      }
    }
    return new_msg
  }
}
