import React from 'react'
import { ListScenarioResponse } from '@smartesting/shared/dist/responses/listScenario'
import Button from '../../../../components/ui/Button/Button'
import './ScenarioList.css'
export enum ScenarioListTestIds {
  BUTTON = 'ScenarioList.button',
}

type ScenarioListProps = {
  scenarios: ListScenarioResponse
  onClick: (text: string) => void
}

const ScenarioList: React.FunctionComponent<ScenarioListProps> = ({
  scenarios,
  onClick,
}) => {
  return (
    <div className={'divListScenario'}>
      {scenarios &&
        scenarios.scenarios?.map((scenario, index) => (
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
