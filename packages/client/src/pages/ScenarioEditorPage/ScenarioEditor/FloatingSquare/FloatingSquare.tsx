import React from 'react'
import './FloatingSquare.css'
import { OptionsAlteration } from '@smartesting/shared/dist/models'
import Button from '../../../../components/ui/Button/Button'
import Client from '../../../../Client'
import { unstable_batchedUpdates } from 'react-dom'
interface FloatingSquareProps {
  scenarios: string[]
  optionsAlteration: OptionsAlteration
  onClose: () => void
}

const FloatingSquare: React.FunctionComponent<FloatingSquareProps> = ({
  scenarios,
  optionsAlteration,
  onClose,
}) => {
  const [scenarioName, setScenarioName] = React.useState('')

  const handleScenarioNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setScenarioName(event.target.value)
  }
  function onSaveScenario() {
    Client.createScenario(scenarioName, scenarios[0], optionsAlteration).then(
      (response) => {
        unstable_batchedUpdates(() => {
          console.log(response)
        })
      }
    )

    onClose()
  }

  return (
    <div>
      <div className='overlay' onClick={onClose}></div>
      <div className={'squareBody'}>
        <h2>Save scenario</h2>
        <div className={'inputName'}>
          <label>Scenario's name :</label>{' '}
          <input name={'name'} onChange={handleScenarioNameChange} />
        </div>
        <div className={'textAreaText'}>
          <label>Scenario's text :</label>{' '}
          <textarea name={'text'} value={scenarios[0]} rows={5} cols={22} />
        </div>
        <div className={'optionsAlteration'}>
          <label>Options :</label> Labeling :{' '}
          {optionsAlteration.haveLabel ? 'Yes' : 'No'}
          <br />
          Realism : {optionsAlteration.haveRealism ? 'Yes' : 'No'}
          <br />
          Noise : {optionsAlteration.haveNoise ? 'Yes' : 'No'}
          <br />
          Disable latitude :{' '}
          {optionsAlteration.haveDisableLatitude ? 'Yes' : 'No'}
          <br />
          Disable longitude :{' '}
          {optionsAlteration.haveDisableLongitude ? 'Yes' : 'No'}
          <br />
          Disable altitude :{' '}
          {optionsAlteration.haveDisableAltitude ? 'Yes' : 'No'}
          <br />
        </div>
        <Button onClick={onSaveScenario} text={'Save'} />
      </div>
    </div>
  )
}

export default FloatingSquare
