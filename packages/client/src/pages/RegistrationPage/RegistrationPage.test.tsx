import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RegistrationPage, { RegistrationPageTestIds } from './RegistrationPage'
import Client from '../../Client'
import { mockUseClient } from '../../mocks/mockUseClient'
import { User } from '@smartesting/shared/dist/models/User'
import { CreateUserError } from '@smartesting/shared/dist/responses/createUser'
import { uuid } from '@smartesting/shared/dist/uuid/uuid'

describe('RegistrationPage', () => {
  let user: User = {
    id: 0,
    email: 'bob.dupont@mail.fr',
    password: 'password',
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
        error: CreateUserError.emptyEmail,
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
