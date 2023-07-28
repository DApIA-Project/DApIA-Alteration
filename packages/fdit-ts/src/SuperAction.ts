import { Action } from './Action'
import { BaseStationMessage } from './BaseStationMessage'

export class SuperAction {
  private actionType: string
  private readonly actions: Action[] = []

  constructor(actionType: string) {
    this.actionType = actionType
  }

  getActionType(): string {
    return this.actionType
  }

  setActionType(actionType: string): void {
    this.actionType = actionType
  }

  addAction(action: Action): void {
    this.actions.push(action)
  }

  getConcernedActions(message: BaseStationMessage): Action[] {
    const result: Action[] = []
    for (const action of this.actions) {
      // todo:
    }
    return result
  }

  static createSuperActions(actions: Action[]): SuperAction[] {
    const actionMap: { [key: string]: Action[] } = {}
    for (const action of actions) {
      // todo:
    }
    const result: SuperAction[] = []
    for (const [type, actions] of Object.entries(actionMap)) {
      result.push(SuperAction.mergeActions(type, actions))
    }
    return result
  }

  private static mergeActions(type: string, actions: Action[]): SuperAction {
    const superAction = new SuperAction(type)
    for (const action of actions) {
      superAction.addAction(action)
    }
    return superAction
  }

  getActions(): Action[] {
    return this.actions
  }
}
