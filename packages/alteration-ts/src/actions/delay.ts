import { alteration, AlterationMode, Scope } from '../index'

/**
 * Config for delay engine
 * @param scope, a Scope function
 * @param time, millisecond to add to timestamp (logged and generated)
 */
type Config = {
  scope: Scope
  time: number
}

export function delay(config: Config) {
  return alteration({
    scope: config.scope,
    modifications: [
      {
        property: 'timestampGenerated',
        value: config.time,
        mode: AlterationMode.OFFSET,
      },
      {
        property: 'timestampLogged',
        value: config.time,
        mode: AlterationMode.OFFSET,
      },
    ],
  })
}
