import React from 'react'
import {
  OptionsAlteration,
  OptionsAlterationDescription,
  OptionsAlterationName,
} from '@smartesting/shared/dist/models/index'
import { ScenarioOption } from './ScenarioOption/ScenarioOption'
import './ScenarioOptions.css'

export type ScenarioOptionsProps = {
  optionsAlteration: OptionsAlteration
  onChange: (newValue: OptionsAlteration) => void
  haveDescription?: boolean
}

export const ScenarioOptions: React.FunctionComponent<ScenarioOptionsProps> = ({
  optionsAlteration,
  onChange,
  haveDescription,
}) => (
  <>
    <ScenarioOption
      value={optionsAlteration.haveLabel}
      onChange={(newValue) => {
        onChange({ ...optionsAlteration, haveLabel: newValue })
      }}
      name={OptionsAlterationName.haveLabel}
      description={
        haveDescription ? OptionsAlterationDescription.haveLabel : undefined
      }
    />
    <ScenarioOption
      value={optionsAlteration.haveRealism}
      onChange={(newValue) => {
        onChange({ ...optionsAlteration, haveRealism: newValue })
      }}
      name={OptionsAlterationName.haveRealism}
      description={
        haveDescription ? OptionsAlterationDescription.haveRealism : undefined
      }
    />
    <ScenarioOption
      value={optionsAlteration.haveNoise}
      onChange={(newValue) => {
        onChange({ ...optionsAlteration, haveNoise: newValue })
      }}
      name={OptionsAlterationName.haveNoise}
      description={
        haveDescription ? OptionsAlterationDescription.haveNoise : undefined
      }
    />
    <ScenarioOption
      value={optionsAlteration.haveDisableLatitude}
      onChange={(newValue) => {
        onChange({ ...optionsAlteration, haveDisableLatitude: newValue })
      }}
      name={OptionsAlterationName.haveDisableLatitude}
      description={
        haveDescription
          ? OptionsAlterationDescription.haveDisableLatitude
          : undefined
      }
    />
    <ScenarioOption
      value={optionsAlteration.haveDisableLongitude}
      onChange={(newValue) => {
        onChange({ ...optionsAlteration, haveDisableLongitude: newValue })
      }}
      name={OptionsAlterationName.haveDisableLongitude}
      description={
        haveDescription
          ? OptionsAlterationDescription.haveDisableLongitude
          : undefined
      }
    />
    <ScenarioOption
      value={optionsAlteration.haveDisableAltitude}
      onChange={(newValue) => {
        onChange({ ...optionsAlteration, haveDisableAltitude: newValue })
      }}
      name={OptionsAlterationName.haveDisableAltitude}
      description={
        haveDescription
          ? OptionsAlterationDescription.haveDisableAltitude
          : undefined
      }
    />
  </>
)
