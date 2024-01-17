import {
  CreateScenarioError,
  CreateScenarioResponse,
} from '@smartesting/shared/dist/responses/createScenario'
import { makeRequestHandler } from '../utils/makeRequestHandler'
import { ScenarioAttributes } from '@smartesting/shared/dist/models/Scenario'
import create from '../../core/scenario/create'

type Body = Record<string, any>

export default makeRequestHandler<CreateScenarioResponse>(
  async (req): Promise<CreateScenarioResponse> => {
    const { scenarioManager } = req.adapters
    const { error, scenarioAttributes } = validateScenario(req.body)
    if (error || !scenarioAttributes) return { error, scenario: null }
    return await create(scenarioAttributes, scenarioManager)
  }
)

function validateScenario(body: Body): {
  error: CreateScenarioError | null
  scenarioAttributes: ScenarioAttributes | null
} {
  if (!body.name || typeof body.name !== 'string')
    return {
      error: CreateScenarioError.emptyName,
      scenarioAttributes: null,
    }

  if (
    body.text === null ||
    body.text === undefined ||
    typeof body.text !== 'string'
  )
    return {
      error: CreateScenarioError.emptyTextScenario,
      scenarioAttributes: null,
    }

  if (
    typeof body.options.haveNoise !== 'boolean' ||
    typeof body.options.haveLabel !== 'boolean' ||
    typeof body.options.haveRealism !== 'boolean' ||
    typeof body.options.haveDisableLatitude !== 'boolean' ||
    typeof body.options.haveDisableLongitude !== 'boolean' ||
    typeof body.options.haveDisableAltitude !== 'boolean'
  ) {
    return {
      error: CreateScenarioError.optionsBadType,
      scenarioAttributes: null,
    }
  }
  return {
    scenarioAttributes: {
      name: body.name,
      text: body.text,
      options: body.options,
    },
    error: null,
  }
}
