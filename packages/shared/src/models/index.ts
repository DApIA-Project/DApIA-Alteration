export type Recording = {
  name: string
  content: string
}

export type OptionsAlteration = {
  haveLabel: boolean
  haveRealism: boolean
  haveNoise: boolean
  haveDisableLatitude: boolean
  haveDisableLongitude: boolean
  haveDisableAltitude: boolean
}

export enum OptionsAlterationName {
  haveLabel = 'Labeling',
  haveRealism = 'Realism',
  haveNoise = 'Noise',
  haveDisableLatitude = 'Disable latitude',
  haveDisableLongitude = 'Disable longitude',
  haveDisableAltitude = 'Disable altitude',
}

export enum OptionsAlterationDescription {
  haveLabel = 'Enable Data labeling',
  haveRealism = 'Enable ground speed, track and vertical rate realism',
  haveNoise = 'Enable latitude and longitude noise',
  haveDisableLatitude = 'Disable latitude interpolation',
  haveDisableLongitude = 'Disable longitude interpolation',
  haveDisableAltitude = 'Disable altitude interpolation',
}
