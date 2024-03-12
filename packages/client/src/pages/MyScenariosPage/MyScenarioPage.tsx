import React, { useEffect, useState } from 'react'
import { useClient } from '../../providers/ClientProvider/ClientProvider'
import './MyScenariosPage.css'
import { Scenario } from '@smartesting/shared/dist/models/Scenario'
import Switch from '@mui/joy/Switch'
import Button from '../../components/ui/Button/Button'
import IconButton from '../../components/ui/Button/IconButton/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import ShareIcon from '@mui/icons-material/Share'
import DeleteIcon from '@mui/icons-material/Delete'
import AlterationScenarioEditor from '../../components/business/AlterationScenarioEditor/AlterationScenarioEditor'

function formaterDate(dateString: string): string {
  const date = new Date(dateString)
  const jour = date.getUTCDate().toString().padStart(2, '0')
  const mois = (date.getUTCMonth() + 1).toString().padStart(2, '0')
  const annee = date.getUTCFullYear().toString()
  const heures = date.getUTCHours().toString().padStart(2, '0')
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')
  const secondes = date.getUTCSeconds().toString().padStart(2, '0')

  return `${jour}/${mois}/${annee} at ${heures}:${minutes}:${secondes}`
}

const MyScenariosPage: React.FunctionComponent = () => {
  const client = useClient()
  const [myScenarios, setMyScenarios] = useState<ReadonlyArray<Scenario>>([])

  useEffect(() => {
    if (!client) return
    let id_user: number = Number(localStorage.getItem('user_id'))
    console.log(id_user)
    client
      .listUserScenario(id_user)
      .then(({ scenarios, error }) => {
        if (error)
          return console.error(
            `Erreur lors de la récupération des scénarios : ${error}`
          )
        setMyScenarios(scenarios ?? [])
      })
      .catch((e) => {
        console.error('Erreur lors de la récupération des scénarios :', e)
      })
  }, [client])

  return (
    <div className={'root'}>
      <div className={'myScenariosPage'}>
        {myScenarios.map((scenario, index) => (
          <div key={index} className={'divScenario'}>
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
              <Switch
                className={'switchButton'}
                color={scenario.options.haveLabel ? 'success' : 'neutral'}
                checked={scenario.options.haveLabel}
                endDecorator={'Labeling'}
              />
              <Switch
                className={'switchButton'}
                color={scenario.options.haveRealism ? 'success' : 'neutral'}
                checked={scenario.options.haveRealism}
                endDecorator={'Realism'}
              />
              <Switch
                className={'switchButton'}
                color={scenario.options.haveNoise ? 'success' : 'neutral'}
                checked={scenario.options.haveNoise}
                endDecorator={'Noise'}
              />
              <Switch
                className={'switchButton'}
                color={
                  scenario.options.haveDisableLatitude ? 'success' : 'neutral'
                }
                checked={scenario.options.haveDisableLatitude}
                endDecorator={'Disable latitude'}
              />
              <Switch
                className={'switchButton'}
                color={
                  scenario.options.haveDisableLongitude ? 'success' : 'neutral'
                }
                checked={scenario.options.haveDisableLongitude}
                endDecorator={'Disable longitude'}
              />
              <Switch
                className={'switchButton'}
                color={
                  scenario.options.haveDisableAltitude ? 'success' : 'neutral'
                }
                checked={scenario.options.haveDisableAltitude}
                endDecorator={'Disable altitude'}
              />
            </div>
            <div className={'editScenario'}>
              <h2>
                last modification on{' '}
                {formaterDate(scenario.updatedAt.toString())}
              </h2>
              <div className={'buttonsScenario'}>
                <IconButton
                  className={'iconButton'}
                  text={''}
                  onClick={() => {}}
                  icon={<EditIcon fontSize={'small'} />}
                />
                <IconButton
                  className={'iconButton'}
                  text={''}
                  onClick={() => {}}
                  icon={<ShareIcon fontSize={'small'} />}
                />
                <IconButton
                  className={'iconButton'}
                  text={''}
                  onClick={() => {}}
                  icon={<DeleteIcon fontSize={'small'} />}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyScenariosPage
