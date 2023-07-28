import { Target } from './Target'
import { Parameter } from './Parameter'
import { Trajectory } from './Trajectory'

export class Parameters {
  private target?: Target
  private parameterList: Parameter[] = []
  private recordPath?: string
  private trajectory?: Trajectory

  public getTrajectory(): Trajectory | undefined {
    return this.trajectory
  }

  public setTrajectory(trajectory: Trajectory): void {
    this.trajectory = trajectory
  }

  public getTarget(): Target | undefined {
    return this.target
  }

  public setTarget(target: Target): void {
    this.target = target
  }

  public getParameterList(): Parameter[] {
    return this.parameterList
  }

  public setParameterList(parameterList: Parameter[]): void {
    this.parameterList = parameterList
  }

  public getRecordPath(): string | undefined {
    return this.recordPath
  }

  public setRecordPath(recordPath: string): void {
    this.recordPath = recordPath
  }
}
