import { OptionsAlteration } from './index'

export type Scenario = {
  id: Readonly<number>
  createdAt: Readonly<Date>
  updatedAt: Readonly<Date>
} & ScenarioAttributes

export type ScenarioAttributes = {
  name: Readonly<string>
  text: Readonly<string>
  options: Readonly<OptionsAlteration>
}
