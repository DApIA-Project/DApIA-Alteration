import React from 'react'
import {
  OptionsAlteration,
  OptionsAlterationDescription,
  OptionsAlterationName,
} from '@smartesting/shared/dist'
import { ScenarioOption } from './ScenarioOption/ScenarioOption'
import './ScenarioOptions.css'

export type ScenarioOptionsProps = {
  optionsAlteration: OptionsAlteration
  onChange: (newValue: OptionsAlteration) => void
}

export const ScenarioOptions: React.FunctionComponent<ScenarioOptionsProps> = ({
  optionsAlteration,
  onChange,
}) => (
  <div className={'scenario-options'}>
    <ScenarioOption
      value={optionsAlteration.haveLabel}
      onChange={(newValue) => {
        onChange({ ...optionsAlteration, haveLabel: newValue })
      }}
      name={OptionsAlterationName.haveLabel}
      description={OptionsAlterationDescription.haveLabel}
    />

    <ScenarioOption
      value={optionsAlteration.haveRealism}
      onChange={(newValue) => {
        onChange({ ...optionsAlteration, haveRealism: newValue })
      }}
      name={OptionsAlterationName.haveRealism}
      description={OptionsAlterationDescription.haveRealism}
    />

    <ScenarioOption
      value={optionsAlteration.haveNoise}
      onChange={(newValue) => {
        onChange({ ...optionsAlteration, haveNoise: newValue })
      }}
      name={OptionsAlterationName.haveNoise}
      description={OptionsAlterationDescription.haveNoise}
    />

    <ScenarioOption
      value={optionsAlteration.haveDisableLatitude}
      onChange={(newValue) => {
        onChange({ ...optionsAlteration, haveDisableLatitude: newValue })
      }}
      name={OptionsAlterationName.haveDisableLatitude}
      description={OptionsAlterationDescription.haveDisableLatitude}
    />

    <ScenarioOption
      value={optionsAlteration.haveDisableLongitude}
      onChange={(newValue) => {
        onChange({ ...optionsAlteration, haveDisableLongitude: newValue })
      }}
      name={OptionsAlterationName.haveDisableLongitude}
      description={OptionsAlterationDescription.haveDisableLongitude}
    />

    <ScenarioOption
      value={optionsAlteration.haveDisableAltitude}
      onChange={(newValue) => {
        onChange({ ...optionsAlteration, haveDisableAltitude: newValue })
      }}
      name={OptionsAlterationName.haveDisableAltitude}
      description={OptionsAlterationDescription.haveDisableAltitude}
    />
  </div>
)
