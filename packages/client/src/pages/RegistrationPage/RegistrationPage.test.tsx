import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RegistrationPage, { RegistrationPageTestIds } from './RegistrationPage'
import Client from '../../Client'
import { mockUseClient } from '../../mocks/mockUseClient'
import { User } from '@smartesting/shared/dist/models/User'
import { CreateUserError } from '@smartesting/shared/dist/responses/createUser'
import { uuid } from '@smartesting/shared/dist/uuid/uuid'
import ScenariosFilters, {
  ScenariosFiltersTestIds,
} from '../ScenariosPage/ScenariosFilters/ScenariosFilters'

describe('RegistrationPage', () => {
  let user: User = {
    id: 0,
    firstname: 'bob',
    lastname: 'dupont',
    email: 'bob.dupont@mail.fr',
    password: 'password',
    isAdmin: false,
    token: uuid(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  let client: Client
  beforeEach(() => {
    // Reset local storage before each test to isolate the tests
    localStorage.clear()
    client = new Client()
    mockUseClient(client)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders registration form', async () => {
    render(<RegistrationPage onLogin={() => {}} />)

    expect(screen.getByLabelText('Firstname')).toBeInTheDocument()
    expect(screen.getByLabelText('Lastname')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument()
    expect(screen.getByText('Sign up')).toBeInTheDocument()
  })

  it('type in all fields and sign up', async () => {
    jest.spyOn(client, 'createUser').mockReturnValue(
      Promise.resolve({
        error: null,
        user: user,
      })
    )
    render(<RegistrationPage onLogin={() => {}} />)

    fireEvent.change(
      screen.getByTestId(RegistrationPageTestIds.INPUT_FIRSTNAME),
      { target: { value: 'Bob' } }
    )

    fireEvent.change(
      screen.getByTestId(RegistrationPageTestIds.INPUT_LASTNAME),
      { target: { value: 'Dupont' } }
    )

    fireEvent.change(screen.getByTestId(RegistrationPageTestIds.INPUT_EMAIL), {
      target: { value: 'bob.dupont@mail.fr' },
    })

    fireEvent.change(
      screen.getByTestId(RegistrationPageTestIds.INPUT_PASSWORD),
      { target: { value: 's3cret!' } }
    )

    fireEvent.change(
      screen.getByTestId(RegistrationPageTestIds.INPUT_CONFIRM_PASSWORD),
      { target: { value: 's3cret!' } }
    )

    await userEvent.click(screen.getByText('Sign up'))

    await waitFor(() => {
      expect(client.createUser).toHaveBeenCalledWith(
        'Bob',
        'Dupont',
        'bob.dupont@mail.fr',
        's3cret!'
      )
    })
  })

  it('submits form with valid data', async () => {
    jest.spyOn(client, 'createUser').mockReturnValue(
      Promise.resolve({
        error: null,
        user: user,
      })
    )
    const onLogin = jest.fn()
    render(<RegistrationPage onLogin={onLogin} />)

    await userEvent.click(screen.getByText('Sign up'))
    await waitFor(() => {
      expect(onLogin).toBeCalledTimes(1)
    })
    await waitFor(() => {
      expect(onLogin).toBeCalledWith(user.token)
    })
  })

  it('submits form with invalid data', async () => {
    jest.spyOn(client, 'createUser').mockReturnValue(
      Promise.resolve({
        error: CreateUserError.emptyFirstname,
        user: null,
      })
    )
    const onLogin = jest.fn()
    render(<RegistrationPage onLogin={onLogin} />)

    await userEvent.click(screen.getByText('Sign up'))
    await waitFor(() => {
      expect(onLogin).toBeCalledTimes(0)
    })
  })
})
