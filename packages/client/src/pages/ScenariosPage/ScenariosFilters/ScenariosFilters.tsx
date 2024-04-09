import React, { useState } from 'react'
import '../../../styles.css'
import './ScenariosFilters.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import InputText from '../../../components/ui/InputText/InputText'
import Select from '../../../components/ui/Select/Select'
import CheckBox from '../../../components/ui/CheckBox/CheckBox'
import { OptionsAlteration, Sort } from '@smartesting/shared/dist'
import { formaterDateToString } from '../../../utils/formaterDate/formaterDate'
import { unstable_batchedUpdates } from 'react-dom'
import { useClient } from '../../../providers/ClientProvider/ClientProvider'
import { Scenario } from '@smartesting/shared/dist/models/Scenario'

export enum ScenariosFiltersTestIds {
  INPUT_SEARCH_BAR = 'InputSearchBar',
  INPUT_DATE = 'InputDate',
  DIV_FILTERS = 'ClickDivFilters',
  DIV_CHECKBOX_LIST = 'DivCheckboxList',
  INPUT_SELECT_SORT = 'InputSelectSort',
}

type ScenariosFiltersProps = {
  onScenarios: (scenariosList: readonly Scenario[] | []) => void
}

const ScenariosFilters: React.FunctionComponent<ScenariosFiltersProps> = ({
  onScenarios,
}) => {
  const client = useClient()

  const sorts = [
    { value: Sort.noSort, label: 'No sort' },
    { value: Sort.dateDescending, label: 'Sort by descending date' },
    { value: Sort.dateAscending, label: 'Sort by ascending date' },
    { value: Sort.alphabeticalOrder, label: 'Sort alphabetically' },
    { value: Sort.antialphabeticalOrder, label: 'Sort antialphabetically' },
  ]

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
        onScenarios(scenarios ?? [])
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

  async function handleSelectSort(value: string) {
    if (!client) return
    setSort(value)
    fetchScenarios(searchText, dateStart, dateEnd, undefined, value)
  }

  return (
    <>
      <div className={'options'}>
        <div
          data-testid={ScenariosFiltersTestIds.DIV_FILTERS}
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
            data-testid={ScenariosFiltersTestIds.INPUT_SEARCH_BAR}
          />
        </div>
        <div className={'selectSort'}>
          <Select
            value={sort}
            options={sorts}
            onChange={handleSelectSort}
            data-testid={ScenariosFiltersTestIds.INPUT_SELECT_SORT}
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
                data-testid={ScenariosFiltersTestIds.INPUT_DATE}
              />
            </div>
            <div>
              End date
              <input
                type='date'
                name='filter-end'
                onChange={handleChangeEndDate}
                data-testid={ScenariosFiltersTestIds.INPUT_DATE}
              />
            </div>
          </div>
          <div
            className={'optionsAlterationFilters'}
            data-testid={ScenariosFiltersTestIds.DIV_CHECKBOX_LIST}
          >
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
            <CheckBox label={'Noise'} checked={noise} onChange={handleNoise} />
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
    </>
  )
}

export default ScenariosFilters
