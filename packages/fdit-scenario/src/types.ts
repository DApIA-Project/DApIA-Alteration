// TODO: remove useless types

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
  sensorType: 'BEAST' | 'SBS' | 'MODES' | 'CAT21' | 'SSR' | 'PSR' | 'SDPS'
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
    | 'ALTERATIONSPEED'
    | 'ALTERATIONTIMESTAMP'
    | 'DELETION'
    | 'ROTATION'
    | 'REPLAY'
    | 'CUSTOM'
    | 'SATURATION'
    | 'REDUCTIONDF'
    | 'TRAJECTORY'
    | 'CREATION'
    | 'CUT'
}

export type Scope = {
  lowerAlt?: string
  upperAlt?: string
  lowerBound?: string
  upperBound?: string
  threshold?: string
  thresholdType?: string
  boundType?: string
  polygon?: Polygon
  time?: string
  type:
    | 'trigger'
    | 'timeWindow'
    | 'geoArea'
    | 'geoThreshold'
    | 'geoTime'
    | 'geoTimeWindow'
}
export type Parameter = {
  key?: string
  value?: string
  number?: string
  frequency?: string
  angle?: string
  mode: 'simple' | 'offset' | 'noise' | 'drift'
}

export type Icao = {
  icao: string
}

export type Callsign = {
  callsign: string
}

export type Squawk = {
  squawk: string
}

export type IcaoRoute = {
  icaoRoute: string
}

export type FlightId = {
  flightId: string
}

export type Aerodep = {
  aerodep: string
}

export type Aerodest = {
  aerodest: string
}

export type AircraftType = {
  aircraftType: string
}

export type EstimatedOffBlockTime = {
  estimatedOffBlockTime: string
}

export type NonIcaoAerodep = {
  nonIcaoAerodep: string
}

export type NonIcaoAerodest = {
  nonIcaoAerodest: string
}

export type RouteLength = {
  routeLength: number
}

export type Wef = {
  wef: string
}

export type Unt = {
  unt: string
}

export type SearchkKey = {
  searchkKey: string
}

export type ActionDB = {
  actionDB: string
}

export type Target = {
  identifier:
    | 'icao'
    | 'hexIdent'
    | 'callsign'
    | 'squawk'
    | 'altitude'
    | 'groundSpeed'
    | 'track'
    | 'latitude'
    | 'longitude'
    | 'verticalRate'
    | 'alert'
    | 'emergency'
    | 'SPI'
    | 'isOnGround'
    | 'flightId'
    | 'aerodep'
    | 'aerodest'
    | 'aircraftType'
    | 'estimatedOffBlockTime'
    | 'nonIcaoAerodep'
    | 'nonIcaoAerodest'
    | 'route'
    | 'routeLength'
    | 'wef'
    | 'unt'
    | 'searchkKey'
    | 'actionDB'
  value: string
}

export type Time = {
  time: string
}

export type Trigger = {
  time: Time
}

export type TimeWindows = {
  lowerBound: string
  upperBound: string
}

export type GeoThreshold = {
  thresholdType: string
  threshold: string
  boundType: string
}

export type GeoArea = {
  polygon: Polygon
}

export type Polygon = {
  id: string
  name: string
  vertices: Vertices
  lowerAlt: string
  upperAlt: string
}

export type Vertices = {
  vertex: Vertex[]
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
