import * as fs from 'fs'
import { Incident } from './Incident'

export class IncidentDeserializer {
  private incidentFile: string

  constructor(incidentFile: string) {
    this.incidentFile = incidentFile
  }

  public deserialize(): Incident {
    const content = fs.readFileSync(this.incidentFile, 'utf8')
    return JSON.parse(content) as Incident
  }
}
