import React, { useEffect, useState } from 'react'
import { useClient } from '../../providers/ClientProvider/ClientProvider'
import './ScenariosPage.css'
import { Scenario } from '@smartesting/shared/dist/models/Scenario'
import Switch from '@mui/joy/Switch'
import IconButton from '../../components/ui/Button/IconButton/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import ShareIcon from '@mui/icons-material/Share'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import AlterationScenarioEditor from '../../components/business/AlterationScenarioEditor/AlterationScenarioEditor'
import { useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material'
import InputText from '../../components/ui/InputText/InputText'
import { MyAccountPageTestIds } from '../MyAccountPage/MyAccountPage'

function formaterDate(dateString: string): string {
  const date = new Date(dateString)
  const jour = date.getDate().toString().padStart(2, '0')
  const mois = (date.getMonth() + 1).toString().padStart(2, '0')
  const annee = date.getFullYear().toString()
  const heures = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const secondes = date.getSeconds().toString().padStart(2, '0')

  return `${jour}/${mois}/${annee} at ${heures}:${minutes}:${secondes}`
}

export enum ScenariosPageTestIds {
  BUTTON_REMOVE_SCENARIO = 'ButtonRemoveScenario',
  BUTTON_ADD_SCENARIO = 'ButtonAddScenario',
  BUTTON_EDIT_SCENARIO = 'ButtonEditScenario',
  INPUT_SEARCH_BAR = 'InputSearchBar',
}

const ScenariosPage: React.FunctionComponent = () => {
  const client = useClient()
  const navigate = useNavigate()
  const [myScenarios, setMyScenarios] = useState<ReadonlyArray<Scenario>>([])
  const [searchText, setSearchText] = useState('')

  function handleSearch(newsearch: string) {
    setSearchText(newsearch)
  }
  function handleEdit(id_scenario: number) {
    navigate('/edit-scenario/' + id_scenario)
  }

  function handleRemove(id_scenario: number) {
    client?.deleteScenario(id_scenario).then(({ error }) => {
      if (error) console.log(error)
    })

    const newScenariosSaved = myScenarios.filter(
      (scenarioSaved, indexScenario) => scenarioSaved.id !== id_scenario
    )

    setMyScenarios(newScenariosSaved)
  }

  function handleAddScenario() {
    navigate('/edit-scenario')
  }

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
    <>
      <div className={'root'}>
        <div className={'myScenariosPage'}>
          {myScenarios.length === 0 ? (
            <h2>No scenarios found</h2>
          ) : (
            <h2>My scenarios</h2>
          )}
          <div className={'searchBarDiv'}>
            <InputText
              libelle={''}
              value={searchText}
              onChange={handleSearch}
              id={'search-input'}
              data-testid={ScenariosPageTestIds.INPUT_SEARCH_BAR}
            />
          </div>
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
                    scenario.options.haveDisableLongitude
                      ? 'success'
                      : 'neutral'
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
                <h4>
                  last modification on{' '}
                  {formaterDate(scenario.updatedAt.toString())}
                </h4>
                <div className={'buttonsScenario'}>
                  <IconButton
                    className={'iconButton'}
                    text={''}
                    onClick={() => {
                      handleEdit(scenario.id)
                    }}
                    data-testid={ScenariosPageTestIds.BUTTON_EDIT_SCENARIO}
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
                    onClick={() => {
                      handleRemove(scenario.id)
                    }}
                    data-testid={ScenariosPageTestIds.BUTTON_REMOVE_SCENARIO}
                    icon={<DeleteIcon fontSize={'small'} />}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <IconButton
        className={'addScenario'}
        text={''}
        onClick={() => {
          handleAddScenario()
        }}
        data-testid={ScenariosPageTestIds.BUTTON_ADD_SCENARIO}
        icon={<AddIcon fontSize={'large'} />}
      />
    </>
  )
}

export default ScenariosPage
