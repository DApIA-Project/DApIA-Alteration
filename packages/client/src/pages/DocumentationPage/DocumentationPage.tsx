import React, { useState } from 'react'
import '../../styles.css'
import './DocumentationPage.css'
import Button from '../../components/ui/Button/Button'
import CodeEditor from '@uiw/react-textarea-code-editor'
import FditscenarioEditor from '../../components/buisness/FditscenarioEditor/FditscenarioEditor'

export enum DocumentationPageTestIds {
  BUTTON_DELETION = 'DocumentationPage.action.setButtonDeletion',
}
const DocumentationPage: React.FunctionComponent = () => {
  const [scenarioExample, setScenarioExample] = useState<string>('')

  const props_grammar = { style: { width: '50%', marginBottom: '5%' } }
  const props = { style: { width: '50%' } }

  function openGrammar() {
    const url = '/assets/grammaireDsl.pdf'
    window.open(url)
  }

  function editContentExample(text: string) {
    setScenarioExample(text)
  }
  return (
    <div className={'documentationPage'}>
      <div className={'examples'}>
        <FditscenarioEditor
          language={'fditscenario'}
          value={scenarioExample}
          options={{
            readOnly: true,
            hideCursorInOverviewRuler: true,
          }}
        />
      </div>
      <div className={'grammar'}>
        <Button {...props_grammar} text={'See grammar'} onClick={openGrammar} />
        <Button
          {...props}
          text={'DELETION'}
          onClick={() =>
            editContentExample(
              'hide all_planes from 56 seconds until 90 seconds with_frequency = 8'
            )
          }
          data-testid={DocumentationPageTestIds.BUTTON_DELETION}
        />
        <Button
          {...props}
          text={'ALTERATION'}
          onClick={() =>
            editContentExample(
              'alter all_planes at 7 seconds with_values ICAO = "39AC47" and CALLSIGN = "SAMU25"'
            )
          }
        />
        <Button
          {...props}
          text={'TRAJECTORY'}
          onClick={() =>
            editContentExample(
              'alter all_planes at 56 seconds for 90 seconds with_waypoints\n' +
                '[(45,78) with_altitude 9000 at 78 seconds,\n' +
                '(12,70) with_altitude 7000 at 99 seconds],\n' +
                '(90,11) with_altitude 5000 at 102 seconds],\n' +
                '(11,89) with_altitude 6000 at 107 seconds],\n' +
                '(15,90) with_altitude 8000 at 110 seconds]'
            )
          }
        />
        <Button
          {...props}
          text={'SPEED ALTERATION'}
          onClick={() =>
            editContentExample(
              'alter_speed all_planes from 56 seconds until 90 seconds with_values \n' +
                'EAST_WEST_VELOCITY = 78 and NORTH_SOUTH_VELOCITY = 45'
            )
          }
        />
        <Button
          {...props}
          text={'SATURATION'}
          onClick={() =>
            editContentExample(
              'saturate all_planes from 56 seconds until 90 seconds with_values \n' +
                'ICAO = 78 and NUMBER = 45'
            )
          }
        />
        <Button
          {...props}
          text={'REPLAY'}
          onClick={() =>
            editContentExample(
              'replay all_planes from 56 seconds until 90 seconds'
            )
          }
        />
        <Button
          {...props}
          text={'DELAY'}
          onClick={() =>
            editContentExample(
              'delay all_planes from 56 seconds until 90 seconds with_delay 55 seconds'
            )
          }
        />
        <Button
          {...props}
          text={'ROTATION'}
          onClick={() =>
            editContentExample(
              'rotate all_planes from 67 seconds until 99 seconds with_angle 90'
            )
          }
        />
        <Button
          {...props}
          text={'CUT'}
          onClick={() =>
            editContentExample(
              'cut all_planes from 13 seconds until 88 seconds'
            )
          }
        />
      </div>
    </div>
  )
}

export default DocumentationPage
