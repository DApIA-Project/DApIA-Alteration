import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RegistrationPage from './RegistrationPage'
import Client from '../../Client'
import { mockUseClient } from '../../mocks/mockUseClient'
import { User } from '@smartesting/shared/dist/models/User'
import { CreateUserError } from '@smartesting/shared/dist/responses/createUser'

describe('RegistrationPage', () => {
  let user: User = {
    id: 0,
    firstname: 'bob',
    lastname: 'dupont',
    email: 'bob.dupont@mail.fr',
    password: 'password',
    isAdmin: false,
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
      expect(onLogin).toBeCalledWith(0)
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
