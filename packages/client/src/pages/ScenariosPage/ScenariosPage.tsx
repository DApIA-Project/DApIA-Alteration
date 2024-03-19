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
import InputText from '../../components/ui/InputText/InputText'
import Select from '../../components/ui/Select/Select'
import { OptionsAlteration, Sort } from '@smartesting/shared/dist'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { grey } from '@mui/material/colors'
import { unstable_batchedUpdates } from 'react-dom'

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

function formaterDateToString(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
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

  const sorts = [
    { value: Sort.noSort, label: 'No sort' },
    { value: Sort.dateDescending, label: 'Sort by descending date' },
    { value: Sort.dateAscending, label: 'Sort by ascending date' },
    { value: Sort.alphabeticalOrder, label: 'Sort alphabetically' },
    { value: Sort.antialphabeticalOrder, label: 'Sort antialphabetically' },
  ]

  const [myScenarios, setMyScenarios] = useState<ReadonlyArray<Scenario>>([])
  const [searchText, setSearchText] = useState('')
  const [sort, setSort] = useState('noSort')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [dateStart, setDateStart] = useState('')
  const [dateEnd, setDateEnd] = useState('')

  const [withOptionsAlterations, setWithOptionsAlterations] = useState(false)
  const [labeling, setLabeling] = useState(false)
  const [realism, setRealism] = useState(false)
  const [noise, setNoise] = useState(false)
  const [disableLatitude, setDisableLatitude] = useState(false)
  const [disableLongitude, setDisableLongitude] = useState(false)
  const [disableAltitude, setDisableAltitude] = useState(false)

  function handleSearch(newsearch: string) {
    if (!client) return
    let id_user: number = Number(localStorage.getItem('user_id'))
    setSearchText(newsearch)

    client
      .listUserScenario(id_user, newsearch)
      .then(({ scenarios, error }) => {
        setMyScenarios(scenarios ?? [])
      })
      .catch((e) => {
        console.error('Erreur lors de la récupération des scénarios :', e)
      })
  }
  function handleEdit(id_scenario: number) {
    navigate('/edit-scenario/' + id_scenario)
  }

  function handleChangeStartDate(event: React.ChangeEvent<HTMLInputElement>) {
    if (!client) return
    let id_user: number = Number(localStorage.getItem('user_id'))
    let startDate: string =
      event.target.value !== ''
        ? event.target.value + ' 00:00:00'
        : formaterDateToString(new Date(0))
    let endDate: string =
      dateEnd !== '' ? dateEnd : formaterDateToString(new Date())
    unstable_batchedUpdates(() => {
      setDateStart(startDate)
      setDateEnd(endDate)
    })
    client
      .listUserScenario(id_user, searchText, startDate, dateEnd)
      .then(({ scenarios, error }) => {
        setMyScenarios(scenarios ?? [])
      })
      .catch((e) => {
        console.error('Erreur lors de la récupération des scénarios :', e)
      })
  }

  function handleChangeEndDate(event: React.ChangeEvent<HTMLInputElement>) {
    if (!client) return
    let id_user: number = Number(localStorage.getItem('user_id'))
    let endDate: string =
      event.target.value !== ''
        ? event.target.value + ' 00:00:00'
        : formaterDateToString(new Date())
    setDateEnd(endDate)
    client
      .listUserScenario(id_user, searchText, dateStart, endDate)
      .then(({ scenarios, error }) => {
        setMyScenarios(scenarios ?? [])
      })
      .catch((e) => {
        console.error('Erreur lors de la récupération des scénarios :', e)
      })
  }

  function handleToggleState(
    toggleFunc: () => void,
    state: boolean,
    setState: (value: boolean) => void
  ) {
    if (!client) return
    let newState = state
    setState(newState)
    if (!withOptionsAlterations) return
    const id_user: number = Number(localStorage.getItem('user_id'))

    const optionsAlterations: OptionsAlteration = {
      haveLabel: toggleFunc === handleLabeling ? newState : labeling,
      haveRealism: toggleFunc === handleRealism ? newState : realism,
      haveNoise: toggleFunc === handleNoise ? newState : noise,
      haveDisableLatitude:
        toggleFunc === handleDisableLatitude ? newState : disableLatitude,
      haveDisableLongitude:
        toggleFunc === handleDisableLongitude ? newState : disableLongitude,
      haveDisableAltitude:
        toggleFunc === handleDisableAltitude ? newState : disableAltitude,
    }

    client
      .listUserScenario(
        id_user,
        searchText,
        dateStart,
        dateEnd,
        optionsAlterations
      )
      .then(({ scenarios, error }) => {
        setMyScenarios(scenarios ?? [])
      })
      .catch((e) => {
        console.error('Erreur lors de la récupération des scénarios :', e)
      })
  }

  function handleActiveOptions() {
    if (!client) return
    const id_user: number = Number(localStorage.getItem('user_id'))
    setWithOptionsAlterations(!withOptionsAlterations)

    if (!withOptionsAlterations) {
      const optionsAlterations: OptionsAlteration = {
        haveLabel: labeling,
        haveRealism: realism,
        haveNoise: noise,
        haveDisableLatitude: disableLatitude,
        haveDisableLongitude: disableLongitude,
        haveDisableAltitude: disableAltitude,
      }

      client
        .listUserScenario(
          id_user,
          searchText,
          dateStart,
          dateEnd,
          optionsAlterations
        )
        .then(({ scenarios, error }) => {
          setMyScenarios(scenarios ?? [])
        })
        .catch((e) => {
          console.error('Erreur lors de la récupération des scénarios :', e)
        })
    } else {
      client
        .listUserScenario(id_user, searchText, dateStart, dateEnd)
        .then(({ scenarios, error }) => {
          setMyScenarios(scenarios ?? [])
        })
        .catch((e) => {
          console.error('Erreur lors de la récupération des scénarios :', e)
        })
    }
  }

  function handleLabeling() {
    handleToggleState(handleLabeling, !labeling, setLabeling)
  }

  function handleRealism() {
    handleToggleState(handleRealism, !realism, setRealism)
  }

  function handleNoise() {
    handleToggleState(handleNoise, !noise, setNoise)
  }

  function handleDisableLatitude() {
    handleToggleState(
      handleDisableLatitude,
      !disableLatitude,
      setDisableLatitude
    )
  }

  function handleDisableLongitude() {
    handleToggleState(
      handleDisableLongitude,
      !disableLongitude,
      setDisableLongitude
    )
  }

  function handleDisableAltitude() {
    handleToggleState(
      handleDisableAltitude,
      !disableAltitude,
      setDisableAltitude
    )
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

  async function handleSelectSort(value: string) {
    if (!client) return
    setSort(value)
    const id_user: number = Number(localStorage.getItem('user_id'))

    client
      .listUserScenario(
        id_user,
        searchText,
        dateStart,
        dateEnd,
        undefined,
        value
      )
      .then(({ scenarios, error }) => {
        setMyScenarios(scenarios ?? [])
      })
      .catch((e) => {
        console.error('Erreur lors de la récupération des scénarios :', e)
      })
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
          <div className={'options'}>
            <div
              className={'filters'}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              {!isFilterOpen && <KeyboardArrowDownIcon fontSize={'medium'} />}
              {isFilterOpen && <KeyboardArrowUpIcon fontSize={'medium'} />}
              Filters
            </div>
            <div className={'searchBarDiv'}>
              <InputText
                libelle={''}
                value={searchText}
                onChange={handleSearch}
                id={'search-input'}
                data-testid={ScenariosPageTestIds.INPUT_SEARCH_BAR}
              />
            </div>
            <div className={'selectSort'}>
              <Select
                value={sort}
                options={sorts}
                onChange={handleSelectSort}
              />
            </div>
          </div>
          {isFilterOpen && (
            <div className={'additionalFilters'}>
              <div className={'datesFilters'}>
                <div>
                  Start date
                  <input
                    type='date'
                    name='filter-start'
                    onChange={handleChangeStartDate}
                  />
                </div>
                <div>
                  End date
                  <input
                    type='date'
                    name='filter-end'
                    onChange={handleChangeEndDate}
                  />
                </div>
              </div>
              <div className={'optionsAlterationFilters'}>
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: grey[50],
                        '&.Mui-checked': {
                          color: grey[50],
                        },
                      }}
                      onChange={handleActiveOptions}
                    />
                  }
                  label='Options filter'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: grey[50],
                        '&.Mui-checked': {
                          color: grey[50],
                        },
                      }}
                      onChange={handleLabeling}
                    />
                  }
                  label='Labeling'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: grey[50],
                        '&.Mui-checked': {
                          color: grey[50],
                        },
                      }}
                      onChange={handleRealism}
                    />
                  }
                  label='Realism'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: grey[50],
                        '&.Mui-checked': {
                          color: grey[50],
                        },
                      }}
                      onChange={handleNoise}
                    />
                  }
                  label='Noise'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: grey[50],
                        '&.Mui-checked': {
                          color: grey[50],
                        },
                      }}
                      onChange={handleDisableLatitude}
                    />
                  }
                  label='Disable latitude'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: grey[50],
                        '&.Mui-checked': {
                          color: grey[50],
                        },
                      }}
                      onChange={handleDisableLongitude}
                    />
                  }
                  label='Disable longitude'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: grey[50],
                        '&.Mui-checked': {
                          color: grey[50],
                        },
                      }}
                      onChange={handleDisableAltitude}
                    />
                  }
                  label='Disable altitude'
                />
              </div>
            </div>
          )}
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
