import React from 'react'
import Button from '../../../../components/ui/Button/Button'
import './ScenarioList.css'
import { Scenario } from '@smartesting/shared/dist/models/Scenario'
import IconButton from '../../../../components/ui/Button/IconButton/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
export enum ScenarioListTestIds {
  BUTTON = 'ScenarioList.button',
  REMOVE_BUTTON = 'ScenarioList.removeButton',
}

type ScenarioListProps = {
  scenarios: ReadonlyArray<Scenario>
  onClick: (openingScenario: Scenario) => void
  onRemove: (scenarioToRemove: Scenario) => void
}

const ScenarioList: React.FunctionComponent<ScenarioListProps> = ({
  scenarios,
  onClick,
  onRemove,
}) => {
  return (
    <div className={'divListScenario'}>
      {scenarios &&
        [...scenarios]
          .sort((scenarioA, scenarioB) =>
            scenarioA.name.localeCompare(scenarioB.name)
          )
          .map((scenario, index) => (
            <div key={index} className='oneOfScenario'>
              <Button
                className={'scenarioButton'}
                text={scenario.name}
                onClick={() => onClick(scenario)}
                data-testid={ScenarioListTestIds.BUTTON}
              />
              <IconButton
                className={'scenarioButtonRemove'}
                text='P'
                onClick={() => onRemove(scenario)}
                data-testid={ScenarioListTestIds.REMOVE_BUTTON}
                icon={<DeleteIcon fontSize={'small'} />}
              />
            </div>
          ))}
    </div>
  )
}

export default ScenarioList
