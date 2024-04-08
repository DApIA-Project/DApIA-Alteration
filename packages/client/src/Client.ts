import { AlterRecordingResponse } from '@smartesting/shared/dist/responses/alterRecordingResponse'
import { CreateScenarioResponse } from '@smartesting/shared/dist/responses/createScenario'
import { UpdateScenarioResponse } from '@smartesting/shared/dist/responses/updateScenario'
import { DeleteScenarioResponse } from '@smartesting/shared/dist/responses/deleteScenario'
import { ListUserScenarioResponse } from '@smartesting/shared/dist/responses/listUserScenario'
import { FindUserByTokenResponse } from '@smartesting/shared/dist/responses/findUserByToken'
import { FindScenarioResponse } from '@smartesting/shared/dist/responses/findScenario'
import { OptionsAlteration, Recording } from '@smartesting/shared/dist'
import { CreateUserResponse } from '@smartesting/shared/dist/responses/createUser'
import { LoginUserResponse } from '@smartesting/shared/dist/responses/loginUser'
import { UpdateUserResponse } from '@smartesting/shared/dist/responses/updateUser'
import { UpdatePasswordUserResponse } from '@smartesting/shared/dist/responses/updatePasswordUser'
import { DeleteUserResponse } from '@smartesting/shared/dist/responses/deleteUser'
import apiUrl from './config'

export default class Client {
  private async apiCall<T>(
    url: string,
    method: string,
    data?: any
  ): Promise<T> {
    let response: Response
    let headers: HeadersInit = {
      'Content-Type': 'application/json',
    }
    let token = localStorage.getItem('userToken')
    if (token) {
      headers['userToken'] = token
    }
    console.log(JSON.stringify(data))
    if (data) {
      response = await fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(data),
      })
    } else {
      response = await fetch(url, {
        method: method,
        headers: headers,
        body: null,
      })
    }

    return await response.json()
  }
  async alteration(
    value: string | null,
    recording: Recording,
    optionsAlteration: OptionsAlteration,
    outputFormat: string,
    recordingToReplay?: Recording
  ): Promise<AlterRecordingResponse> {
    const url: string = `${apiUrl}/recording/alteration`
    const data = {
      scenario: value,
      recording,
      optionsAlteration,
      recordingToReplay,
      outputFormat,
    }

    return this.apiCall<AlterRecordingResponse>(url, 'POST', data)
  }

  async createScenario(
    name: string,
    text: string,
    optionsAlteration: OptionsAlteration
  ): Promise<CreateScenarioResponse> {
    const url: string = `${apiUrl}/scenarios`
    const data = {
      name,
      text,
      options: optionsAlteration,
    }
    return this.apiCall<CreateScenarioResponse>(url, 'POST', data)
  }

  async updateScenario(
    id_scenario: number,
    newName: string,
    newText: string,
    newOptionsAlteration: OptionsAlteration
  ): Promise<UpdateScenarioResponse> {
    const url: string = `${apiUrl}/scenarios`
    const data = {
      id: id_scenario,
      name: newName,
      text: newText,
      options: newOptionsAlteration,
    }
    return this.apiCall<UpdateScenarioResponse>(url, 'PUT', data)
  }

  async deleteScenario(id_scenario: number): Promise<DeleteScenarioResponse> {
    const url: string = `${apiUrl}/scenarios`
    const data = {
      id: id_scenario,
    }
    return this.apiCall<DeleteScenarioResponse>(url, 'DELETE', data)
  }

  async findScenario(id: number): Promise<FindScenarioResponse> {
    const url: string = `${apiUrl}/scenarios/${id}`
    return this.apiCall<FindScenarioResponse>(url, 'GET')
  }

  async listUserScenario(
    searchBar?: string,
    startDate?: string,
    endDate?: string,
    optionsAlteration?: OptionsAlteration,
    sort?: string
  ): Promise<ListUserScenarioResponse> {
    const url: string = `${apiUrl}/scenarios/filters`
    const data = {
      searchBar: searchBar,
      startDate: startDate,
      endDate: endDate,
      optionsAlteration: optionsAlteration,
      sort: sort,
    }
    return this.apiCall<ListUserScenarioResponse>(url, 'POST', data)
  }

  async createUser(
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ): Promise<CreateUserResponse> {
    const url: string = `${apiUrl}/users`
    const data = {
      firstname,
      lastname,
      email,
      password,
      isAdmin: false,
    }
    return this.apiCall<CreateUserResponse>(url, 'POST', data)
  }
  async findUserByToken(): Promise<FindUserByTokenResponse> {
    let token = localStorage.getItem('userToken')
    if (token) {
      const url: string = `${apiUrl}/users/${token}`
      return this.apiCall<FindUserByTokenResponse>(url, 'GET')
    }
    const url: string = `${apiUrl}/users/null`
    return this.apiCall<FindUserByTokenResponse>(url, 'GET')
  }

  async login(email: string, password: string): Promise<LoginUserResponse> {
    const url: string = `${apiUrl}/login`
    const data = {
      email,
      password,
    }
    return this.apiCall<LoginUserResponse>(url, 'POST', data)
  }

  async updateUser(
    newFirstName: string,
    newLastname: string,
    newEmail: string,
    password: string,
    isAdmin: boolean
  ): Promise<UpdateUserResponse> {
    const url: string = `${apiUrl}/users`
    const data = {
      firstname: newFirstName,
      lastname: newLastname,
      email: newEmail,
      password: password,
      isAdmin: isAdmin,
    }
    return this.apiCall<UpdateUserResponse>(url, 'PUT', data)
  }

  async deleteUser(password: string): Promise<DeleteUserResponse> {
    const url: string = `${apiUrl}/users`
    const data = {
      password: password,
    }
    return this.apiCall<DeleteUserResponse>(url, 'DELETE', data)
  }

  async updatePasswordUser(
    password: string,
    newPassword: string
  ): Promise<UpdatePasswordUserResponse> {
    const url: string = `${apiUrl}/users/password`
    const data = {
      password: password,
      newPassword: newPassword,
    }
    return this.apiCall<UpdatePasswordUserResponse>(url, 'PUT', data)
  }
}
