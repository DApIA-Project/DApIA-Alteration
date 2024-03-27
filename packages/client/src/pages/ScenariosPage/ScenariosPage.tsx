import React, { useEffect, useState } from 'react'
import { useClient } from '../../providers/ClientProvider/ClientProvider'
import './ScenariosPage.css'
import {
  Scenario,
  ScenarioAttributes,
} from '@smartesting/shared/dist/models/Scenario'
import Switch from '@mui/joy/Switch'
import IconButton from '../../components/ui/Button/IconButton/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import AlterationScenarioEditor from '../../components/business/AlterationScenarioEditor/AlterationScenarioEditor'
import { useNavigate } from 'react-router-dom'
import InputText from '../../components/ui/InputText/InputText'
import Select from '../../components/ui/Select/Select'
import { OptionsAlteration, Sort } from '@smartesting/shared/dist'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { unstable_batchedUpdates } from 'react-dom'
import CheckBox from '../../components/ui/CheckBox/CheckBox'
import {
  formaterDateToString,
  formaterDateStringToTextDate,
} from '../../utils/formaterDate/formaterDate'
import { Alert } from '@mui/material'

export enum ScenariosPageTestIds {
  BUTTON_REMOVE_SCENARIO = 'ButtonRemoveScenario',
  BUTTON_ADD_SCENARIO = 'ButtonAddScenario',
  BUTTON_IMPORT_SCENARIO = 'ButtonImportScenario',
  BUTTON_EDIT_SCENARIO = 'ButtonEditScenario',
  INPUT_SEARCH_BAR = 'InputSearchBar',
  INPUT_DATE = 'InputDate',
  DIV_FILTERS = 'ClickDivFilters',
  DIV_SCENARIO = 'DivScenario',
  INPUT_SELECT_SORT = 'InputSelectSort',
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

  const [searchText, setSearchText] = useState('')

  const [sort, setSort] = useState('noSort')
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)
  const [showAlert, setShowAlert] = useState(false)
  const [errorAlert, setErrorAlert] = useState('')

  async function createScenario(
    name: string,
    text: string,
    options: OptionsAlteration
  ) {
    if (!client) return
    try {
      const { scenario, error } = await client.createScenario(
        name,
        text,
        options
      )
      if (error) {
        return
      }

      return scenario
    } catch (err) {
      throw err
    }
  }

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
      .then(({ scenarios, error }) => {
        setMyScenarios(scenarios ?? [])
      })
      .catch((e) => {
        console.error('Erreur lors de la récupération des scénarios :', e)
      })
  }

  function handleSearch(newsearch: string) {
    if (!client) return
    setSearchText(newsearch)
    fetchScenarios(newsearch)
  }
  function handleEdit(id_scenario: number) {
    navigate('/edit-scenario/' + id_scenario)
  }

  function handleDownloadScenario(scenarioToDownload: Scenario) {
    const { name, text, options } = scenarioToDownload
    const scenarioAttributes: ScenarioAttributes = { name, text, options }
    const scenarioJson = JSON.stringify(scenarioAttributes, null, 2)

    const fileBlob = new Blob([scenarioJson], { type: 'text/plain' })
    const fileUrl = URL.createObjectURL(fileBlob)
    const link = document.createElement('a')
    link.href = fileUrl
    link.download = `${scenarioToDownload.name}.json`
    document.body.appendChild(link)
    link.click()
  }

  function handleChangeStartDate(event: React.ChangeEvent<HTMLInputElement>) {
    if (!client) return
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
    fetchScenarios(searchText, startDate, dateEnd)
  }

  function handleChangeEndDate(event: React.ChangeEvent<HTMLInputElement>) {
    if (!client) return
    let endDate: string =
      event.target.value !== ''
        ? event.target.value + ' 00:00:00'
        : formaterDateToString(new Date())
    setDateEnd(endDate)
    fetchScenarios(searchText, dateStart, endDate)
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
    fetchScenarios(searchText, dateStart, dateEnd, optionsAlterations)
  }

  function handleActiveOptions() {
    if (!client) return
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
      fetchScenarios(searchText, dateStart, dateEnd, optionsAlterations)
    } else {
      fetchScenarios(searchText, dateStart, dateEnd)
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
    fetchScenarios(searchText, dateStart, dateEnd, undefined, value)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (!/\.json$/.test(file.name)) {
        setErrorAlert('Error file extension')
        setShowAlert(true)
        return
      }
      const reader = new FileReader()
      reader.onload = async (e) => {
        const content = e.target?.result as string
        try {
          const jsonContent = JSON.parse(content)

          if (!jsonContent.name || !jsonContent.text || !jsonContent.options) {
            setErrorAlert(
              'Error file content : Missing attribute name or text or options'
            )
            setShowAlert(true)
            return
          }
          if (
            jsonContent.options.haveLabel === undefined ||
            jsonContent.options.haveRealism === undefined ||
            jsonContent.options.haveNoise === undefined ||
            jsonContent.options.haveDisableLatitude === undefined ||
            jsonContent.options.haveDisableLongitude === undefined ||
            jsonContent.options.haveDisableAltitude === undefined
          ) {
            setErrorAlert(
              'Error file content : Missing attribute haveLabel or haveRealism or haveNoise or haveDisableLatitude or haveDisableLongitude or haveDisableAltitude'
            )
            setShowAlert(true)
            return
          }

          if (typeof jsonContent.name !== 'string') {
            setErrorAlert('Attribute name must be a string')
            setShowAlert(true)
            return
          }
          if (typeof jsonContent.text !== 'string') {
            setErrorAlert('Attribute text must be a string')
            setShowAlert(true)
            return
          }
          if (typeof jsonContent.options.haveLabel !== 'boolean') {
            setErrorAlert('Attribute haveLabel must be a boolean')
            setShowAlert(true)
            return
          }
          if (typeof jsonContent.options.haveRealism !== 'boolean') {
            setErrorAlert('Attribute haveRealism must be a boolean')
            setShowAlert(true)
            return
          }
          if (typeof jsonContent.options.haveNoise !== 'boolean') {
            setErrorAlert('Attribute haveNoise must be a boolean')
            setShowAlert(true)
            return
          }
          if (typeof jsonContent.options.haveDisableLatitude !== 'boolean') {
            setErrorAlert('Attribute haveDisableLatitude must be a boolean')
            setShowAlert(true)
            return
          }
          if (typeof jsonContent.options.haveDisableLongitude !== 'boolean') {
            setErrorAlert('Attribute haveDisableLongitude must be a boolean')
            setShowAlert(true)
            return
          }
          if (typeof jsonContent.options.haveDisableAltitude !== 'boolean') {
            setErrorAlert('Attribute haveDisableAltitude must be a boolean')
            setShowAlert(true)
            return
          }
          let newScenario = await createScenario(
            jsonContent.name,
            jsonContent.text,
            jsonContent.options
          )
          if (newScenario) {
            let newListScenarios: Scenario[] = [...myScenarios]
            newListScenarios.push(newScenario)
            setMyScenarios(newListScenarios)
          }
        } catch (error) {}
      }
      reader.readAsText(file)
    }
  }

  const handleImportButtonClick = () => {
    fileInputRef.current?.click()
  }

  useEffect(() => {
    if (!client) return
    fetchScenarios()
    const timer = setTimeout(() => {
      setShowAlert(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [client, showAlert])

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
              data-testid={ScenariosPageTestIds.DIV_FILTERS}
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
                data-testid={ScenariosPageTestIds.INPUT_SELECT_SORT}
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
                    data-testid={ScenariosPageTestIds.INPUT_DATE}
                  />
                </div>
                <div>
                  End date
                  <input
                    type='date'
                    name='filter-end'
                    onChange={handleChangeEndDate}
                    data-testid={ScenariosPageTestIds.INPUT_DATE}
                  />
                </div>
              </div>
              <div className={'optionsAlterationFilters'}>
                <CheckBox
                  label={'Options filter'}
                  checked={withOptionsAlterations}
                  onChange={handleActiveOptions}
                />
                <CheckBox
                  label={'Labeling'}
                  checked={labeling}
                  onChange={handleLabeling}
                />
                <CheckBox
                  label={'Realism'}
                  checked={realism}
                  onChange={handleRealism}
                />
                <CheckBox
                  label={'Noise'}
                  checked={noise}
                  onChange={handleNoise}
                />
                <CheckBox
                  label={'Disable latitude'}
                  checked={disableLatitude}
                  onChange={handleDisableLatitude}
                />
                <CheckBox
                  label={'Disable longitude'}
                  checked={disableLongitude}
                  onChange={handleDisableLongitude}
                />
                <CheckBox
                  label={'Disable altitude'}
                  checked={disableAltitude}
                  onChange={handleDisableAltitude}
                />
              </div>
            </div>
          )}
          {myScenarios.map((scenario, index) => (
            <div
              key={index}
              className={'divScenario'}
              data-testid={ScenariosPageTestIds.DIV_SCENARIO}
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
                  {formaterDateStringToTextDate(scenario.updatedAt.toString())}
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
                    onClick={() => {
                      handleDownloadScenario(scenario)
                    }}
                    icon={<FileDownloadIcon fontSize={'small'} />}
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
      <input
        ref={fileInputRef}
        type='file'
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <IconButton
        className={'importScenario'}
        text={''}
        onClick={handleImportButtonClick}
        data-testid={ScenariosPageTestIds.BUTTON_IMPORT_SCENARIO}
        icon={<FileUploadIcon fontSize={'large'} />}
      />
      <div className={'alertContainer'}>
        {showAlert && (
          <Alert
            className={'alert'}
            severity='error'
            onClose={() => setShowAlert(false)}
          >
            {errorAlert}
          </Alert>
        )}
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
