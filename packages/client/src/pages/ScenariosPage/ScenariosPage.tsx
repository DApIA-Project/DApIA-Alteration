import React, { useEffect, useState } from 'react'
import { useClient } from '../../providers/ClientProvider/ClientProvider'
import './ScenariosPage.css'
import { Scenario } from '@smartesting/shared/dist/models/Scenario'
import { OptionsAlteration } from '@smartesting/shared/dist'
import ScenarioCreater from './ScenarioCreater/ScenarioCreater'
import ScenarioTile from './ScenarioTile/ScenarioTile'
import ScenariosFilters from './ScenariosFilters/ScenariosFilters'

export enum ScenariosPageTestIds {
  BUTTON_REMOVE_SCENARIO = 'ButtonRemoveScenario',
  BUTTON_ADD_SCENARIO = 'ButtonAddScenario',
  BUTTON_EDIT_SCENARIO = 'ButtonEditScenario',
  INPUT_SEARCH_BAR = 'InputSearchBar',
  INPUT_DATE = 'InputDate',
  DIV_FILTERS = 'ClickDivFilters',
  INPUT_SELECT_SORT = 'InputSelectSort',
}

const ScenariosPage: React.FunctionComponent = () => {
  const client = useClient()

  const [myScenarios, setMyScenarios] = useState<ReadonlyArray<Scenario>>([])

  function handleDeleteScenario(id_scenario: number) {
    client?.deleteScenario(id_scenario).then(({ error }) => {
      if (error) console.log(error)
    })

    const newScenariosSaved = myScenarios.filter(
      (scenarioSaved) => scenarioSaved.id !== id_scenario
    )

    setMyScenarios(newScenariosSaved)
  }
  function handleImportScenario(scenarioImported: Scenario) {
    let newListScenarios: Scenario[] = [...myScenarios]
    newListScenarios.push(scenarioImported)
    setMyScenarios(newListScenarios)
  }

  function handleFiltersScenarios(scenariosList: readonly Scenario[] | []) {
    setMyScenarios(scenariosList)
  }

  useEffect(() => {
    function fetchScenarios(
      searchText?: string,
      startDate?: string,
      endDate?: string,
      optionsAlterations?: OptionsAlteration,
      sort?: string
    ) {
      if (!client) return
      return client
        .listUserScenario(
          searchText,
          startDate,
          endDate,
          optionsAlterations,
          sort
        )
        .then(({ scenarios }) => {
          setMyScenarios(scenarios ?? [])
        })
        .catch((e) => {
          console.error('Erreur lors de la récupération des scénarios :', e)
        })
    }

    if (!client) return
    fetchScenarios()
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
          <ScenariosFilters onScenarios={handleFiltersScenarios} />

          {myScenarios.map((scenario, index) => (
            <ScenarioTile
              key={scenario.id}
              index={index}
              scenario={scenario}
              onDeleteScenario={handleDeleteScenario}
            />
          ))}
        </div>
      </div>

      <ScenarioCreater onScenario={handleImportScenario} />
    </>
  )
}

export default ScenariosPage
