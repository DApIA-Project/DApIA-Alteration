import React from 'react'
import '../../../styles.css'
import './ScenarioTile.css'
import AlterationScenarioEditor from '../../../components/business/AlterationScenarioEditor/AlterationScenarioEditor'
import { formaterDateStringToTextDate } from '../../../utils/formaterDate/formaterDate'
import { Scenario } from '@smartesting/shared/dist/models/Scenario'
import ScenarioManager from './ScenarioManager/ScenarioManager'
import { ScenarioOptions } from '../../../components/business/ScenarioOptions/ScenarioOptions'

export enum ScenarioTileTestIds {
  DIV_SCENARIO = 'DivScenario',
}

type ScenarioTileProps = {
  scenario: Scenario
  index: number
  onDeleteScenario: (id: number) => void
}

const ScenarioTile: React.FunctionComponent<ScenarioTileProps> = ({
  scenario,
  index,
  onDeleteScenario,
}) => {
  function handleDeleteScenario(id: number) {
    onDeleteScenario(id)
  }

  return (
    <>
      <div
        key={index}
        className={'divScenario'}
        data-testid={ScenarioTileTestIds.DIV_SCENARIO}
      >
        <div className={'infoScenario'}>
          <h2>{scenario.name}</h2>
          <AlterationScenarioEditor
            language={'alterationscenario'}
            value={scenario.text}
            options={{
              readOnly: true,
              hideCursorInOverviewRuler: true,
            }}
          />
        </div>
        <div className={'optionsScenario'}>
          <h2>Options</h2>
          <div className={'switchButton'}>
            <ScenarioOptions
              optionsAlteration={scenario.options}
              onChange={() => {}}
              haveDescription={false}
            />
          </div>
        </div>
        <div className={'editScenario'}>
          <h4>
            last modification on{' '}
            {formaterDateStringToTextDate(scenario.updatedAt.toString())}
          </h4>
          <ScenarioManager
            scenario={scenario}
            onDeleteScenario={handleDeleteScenario}
          />
        </div>
      </div>
    </>
  )
}

export default ScenarioTile
