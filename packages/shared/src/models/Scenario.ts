import { OptionsAlteration } from './index'

export type Scenario = {
  id: Readonly<string>
  create_at: Readonly<Date>
  update_at: Readonly<Date>
} & ScenarioAttributes

export type ScenarioAttributes = {
  name: Readonly<string>
  text: Readonly<string>
  options: Readonly<OptionsAlteration>
}
