import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ConnectionPage, { ConnectionPageTestIds } from './ConnectionPage'
import Client from '../../Client'
import { mockUseClient } from '../../mocks/mockUseClient'
import { User } from '@smartesting/shared/dist/models/User'
import { LoginUserError } from '@smartesting/shared/dist/responses/loginUser'
import { uuid } from '@smartesting/shared/dist/uuid/uuid'

describe('ConnectionPage', () => {
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

  it('renders connection form', async () => {
    render(<ConnectionPage onLogin={() => {}} />)

    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByText('Sign in')).toBeInTheDocument()
  })

  it('type in all fields and sign in', async () => {
    jest.spyOn(client, 'login').mockReturnValue(
      Promise.resolve({
        error: null,
        user: user,
      })
    )
    render(<ConnectionPage onLogin={() => {}} />)

    fireEvent.change(screen.getByTestId(ConnectionPageTestIds.INPUT_EMAIL), {
      target: { value: 'bob.dupont@mail.fr' },
    })

    fireEvent.change(screen.getByTestId(ConnectionPageTestIds.INPUT_PASSWORD), {
      target: { value: 's3cret!' },
    })

    await userEvent.click(screen.getByText('Sign in'))

    await waitFor(() => {
      expect(client.login).toHaveBeenCalledWith('bob.dupont@mail.fr', 's3cret!')
    })
  })

  it('submits form with valid data', async () => {
    jest.spyOn(client, 'login').mockReturnValue(
      Promise.resolve({
        error: null,
        user: user,
      })
    )
    const onLogin = jest.fn()
    render(<ConnectionPage onLogin={onLogin} />)

    await userEvent.click(screen.getByText('Sign in'))
    await waitFor(() => {
      expect(onLogin).toBeCalledTimes(1)
    })
    await waitFor(() => {
      expect(onLogin).toBeCalledWith(user.token)
    })
  })

  it('submits form with invalid data', async () => {
    jest.spyOn(client, 'login').mockReturnValue(
      Promise.resolve({
        error: LoginUserError.passwordConflict,
        user: null,
      })
    )
    const onLogin = jest.fn()
    render(<ConnectionPage onLogin={onLogin} />)

    await userEvent.click(screen.getByText('Sign in'))
    await waitFor(() => {
      expect(onLogin).toBeCalledTimes(0)
    })
  })
})
