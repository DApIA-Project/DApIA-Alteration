import React from 'react'
import Button from '../../../../components/ui/Button/Button'
import './ScenarioList.css'
import { Scenario } from '@smartesting/shared/dist/models/Scenario'
export enum ScenarioListTestIds {
  BUTTON = 'ScenarioList.button',
}

type ScenarioListProps = {
  scenarios: ReadonlyArray<Scenario>
  onClick: (text: string) => void
}

const ScenarioList: React.FunctionComponent<ScenarioListProps> = ({
  scenarios,
  onClick,
}) => {
  return (
    <div className={'divListScenario'}>
      {scenarios &&
        [...scenarios]
          .sort((scenarioA, scenarioB) =>
            scenarioA.name.localeCompare(scenarioB.name)
          )
          .map((scenario, index) => (
            <Button
              key={index}
              text={scenario.name}
              onClick={() => onClick(scenario.text)}
              data-testid={ScenarioListTestIds.BUTTON}
            />
          ))}
    </div>
  )
}

export default ScenarioList
