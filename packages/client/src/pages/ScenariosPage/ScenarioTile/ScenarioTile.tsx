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
  DIV_INFO_SCENARIO = 'DivInfoScenario',
  DIV_OPTIONS_SCENARIO = 'DivOptionsScenario',
  DIV_EDITION_SCENARIO = 'DivEditionScenario',
}

type ScenarioTileProps = {
  index: number
  scenario: Scenario
  onDeleteScenario: (id: number) => void
}

const ScenarioTile: React.FunctionComponent<ScenarioTileProps> = ({
  index,
  scenario,
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
        <div
          className={'infoScenario'}
          data-testid={ScenarioTileTestIds.DIV_INFO_SCENARIO}
        >
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
        <div
          className={'optionsScenario'}
          data-testid={ScenarioTileTestIds.DIV_OPTIONS_SCENARIO}
        >
          <h2>Options</h2>
          <div className={'switchButton'}>
            <ScenarioOptions
              optionsAlteration={scenario.options}
              onChange={() => {}}
              haveDescription={false}
            />
          </div>
        </div>
        <div
          className={'editScenario'}
          data-testid={ScenarioTileTestIds.DIV_EDITION_SCENARIO}
        >
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
