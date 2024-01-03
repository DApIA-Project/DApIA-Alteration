import { AlterRecordingResponse } from '@smartesting/shared/dist/responses/alterRecordingResponse'
import { CreateScenarioResponse } from '@smartesting/shared/dist/responses/createScenario'
import { UpdateScenarioResponse } from '@smartesting/shared/dist/responses/updateScenario'
import { DeleteScenarioResponse } from '@smartesting/shared/dist/responses/deleteScenario'
import { ListScenarioResponse } from '@smartesting/shared/dist/responses/listScenario'
import { OptionsAlteration, Recording } from '@smartesting/shared/dist'
import apiUrl from './config'

export default class Client {
  private static async apiCall<T>(url: string, data?: any): Promise<T> {
    let response: Response
    if (data) {
      response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    } else {
      response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: null,
      })
    }

    return await response.json()
  }
  static async alteration(
    value: string | null,
    recording: Recording,
    optionsAlteration: OptionsAlteration,
    recordingToReplay?: Recording
  ): Promise<AlterRecordingResponse> {
    const url: string = `${apiUrl}/recording/alteration`
    const data = {
      scenario: value,
      recording,
      optionsAlteration,
      recordingToReplay,
    }

    return this.apiCall<AlterRecordingResponse>(url, data)
  }

  static async createScenario(
    name: string,
    text: string,
    optionsAlteration: OptionsAlteration
  ): Promise<CreateScenarioResponse> {
    const url: string = `${apiUrl}/scenario/create`
    const data = {
      name,
      text,
      options: optionsAlteration,
    }
    return this.apiCall<CreateScenarioResponse>(url, data)
  }

  static async updateScenario(
    id_scenario: string,
    newName: string,
    newText: string,
    optionsAlteration: OptionsAlteration
  ): Promise<UpdateScenarioResponse> {
    const url: string = `${apiUrl}/scenario/update`
    const data = {
      id: id_scenario,
      name: newName,
      text: newText,
      options: optionsAlteration,
    }
    return this.apiCall<UpdateScenarioResponse>(url, data)
  }

  static async deleteScenario(
    id_scenario: string
  ): Promise<DeleteScenarioResponse> {
    const url: string = `${apiUrl}/scenario/delete`
    const data = {
      id: id_scenario,
    }
    return this.apiCall<DeleteScenarioResponse>(url, data)
  }

  static async listScenario(): Promise<ListScenarioResponse> {
    const url: string = `${apiUrl}/scenario/list`
    return this.apiCall<ListScenarioResponse>(url)
  }
}
