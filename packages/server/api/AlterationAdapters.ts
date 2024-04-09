import IAlterationManager from './adapters/IAlterationManager'
import IScenarioManager from './adapters/scenario/IScenarioManager'
import IUserManager from './adapters/user/IUserManager'

export type AlterationAdapters = {
  alterationManager: IAlterationManager
  scenarioManager: IScenarioManager
  userManager: IUserManager
}
