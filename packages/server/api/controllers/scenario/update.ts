import {
  UpdateScenarioError,
  UpdateScenarioResponse,
} from '@smartesting/shared/dist/responses/updateScenario'
import { makeRequestHandler } from '../utils/makeRequestHandler'
import { Scenario } from '@smartesting/shared/dist/models/Scenario'
import update from '../../core/scenario/update'
import IScenarioManager from '../../adapters/scenario/IScenarioManager'

type Body = Record<string, any>

export default makeRequestHandler<UpdateScenarioResponse>(
  async (req): Promise<UpdateScenarioResponse> => {
    const { scenarioManager } = req.adapters
    const { error, scenario } = await validateScenario(
      req.body,
      scenarioManager
    )
    if (error || !scenario) return { error, scenario: null }
    return await update(
      scenario.id,
      scenario.name,
      scenario.text,
      scenario.options,
      scenarioManager
    )
  }
)

async function validateScenario(
  body: Body,
  scenarioManager: IScenarioManager
): Promise<{
  error: UpdateScenarioError | null
  scenario: Scenario | null
}> {
  if (!body.name || typeof body.name !== 'string')
    return {
      error: UpdateScenarioError.emptyName,
      scenario: null,
    }
  if (
    body.text === null ||
    body.text === undefined ||
    typeof body.text !== 'string'
  )
    return {
      error: UpdateScenarioError.emptyTextScenario,
      scenario: null,
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
      error: UpdateScenarioError.optionsBadType,
      scenario: null,
    }
  }

  const scenarioBefore: Scenario | null = await scenarioManager.findScenario(
    body.id
  )
  if (!scenarioBefore) {
    return {
      error: UpdateScenarioError.scenarioNotFound,
      scenario: null,
    }
  }

  return {
    scenario: {
      id: body.id,
      name: body.name,
      text: body.text,
      options: body.options,
      createdAt: scenarioBefore.createdAt,
      updatedAt: scenarioBefore.updatedAt,
    },
    error: null,
  }
}
