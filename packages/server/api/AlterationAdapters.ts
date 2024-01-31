import IAlterationManager from './adapters/IAlterationManager'
import IScenarioManager from './adapters/scenario/IScenarioManager'

export type AlterationAdapters = {
  alterationManager: IAlterationManager
  scenarioManager: IScenarioManager
}
