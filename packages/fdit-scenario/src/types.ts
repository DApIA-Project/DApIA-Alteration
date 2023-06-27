export type Parameters = {
  sensors: Sensors
}

export type Sensors = {
  sensor?: Sensor[]
}

export type Sensor = {
  sID: string
  record: string
  firstDate: number
  filter: string
  action?: Action[]
  sensorType: 'BEAST' | 'SBS' | 'CSV'
}

export type Action = {
  scope: Scope
  parameters: {
    target: Target
    trajectory?: Trajectory
    recordPath?: string
    parameter?: Parameter[]
  }
  alterationType:
    | 'ALTERATION'
    | 'ALTERATIONTIMESTAMP'
    | 'DELETION'
    | 'ROTATION'
    | 'REPLAY'
    | 'SATURATION'
    | 'TRAJECTORY'
    | 'CREATION'
    | 'CUT'
}

export type Scope = {
  lowerBound?: string
  upperBound?: string
  time?: string
  type: 'trigger' | 'timeWindow'
}
export type Parameter = {
  key?: string
  value?: string
  number?: string
  frequency?: string
  angle?: string
  mode: 'simple' | 'offset' | 'noise' | 'drift'
}

export type Target = {
  identifier: 'hexIdent'
  value: string
}

export type Time = {
  time: string
}

export type Trigger = {
  time: Time
}

export type Vertex = {
  lat: Lat
  lon: Lon
}

export type Lat = {
  value: string
  offset: boolean
}

export type Lon = {
  value: string
  offset: boolean
}

export type Altitude = {
  value: number
  offset: boolean
}

export type Trajectory = {
  waypoint: Waypoint[]
}

export type Waypoint = {
  vertex: Vertex
  altitude: Altitude
  time: number
}
