import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Client from '../../Client'
import { mockUseClient } from '../../mocks/mockUseClient'
import { User } from '@smartesting/shared/dist/models/User'
import { uuid } from '@smartesting/shared/dist/uuid/uuid'
import { BrowserRouter } from 'react-router-dom'
import MyAccountPage, { MyAccountPageTestIds } from './MyAccountPage'

describe('MyAccountPage', () => {
  let user: User

  let userModifiedInfos: User

  let client: Client
  beforeEach(() => {
    user = {
      id: 0,
      email: 'bob.dupont@mail.fr',
      password: 'password',
      token: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    userModifiedInfos = {
      id: 0,
      email: 'boby.dupond@mail.fr',
      password: 'password',
      token: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    // Reset local storage before each test to isolate the tests
    localStorage.clear()
    client = new Client()
    mockUseClient(client)

    jest.spyOn(client, 'findUserByToken').mockReturnValue(
      Promise.resolve({
        error: null,
        user: user,
      })
    )
    jest.spyOn(client, 'updateUser').mockReturnValue(
      Promise.resolve({
        error: null,
        user: userModifiedInfos,
      })
    )

    jest.spyOn(client, 'updatePasswordUser').mockReturnValue(
      Promise.resolve({
        error: null,
        user: { id: 0, password: 'password', newPassword: 'newpassword' },
      })
    )

    jest.spyOn(client, 'deleteUser').mockReturnValue(
      Promise.resolve({
        error: null,
      })
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('displays my account page', async () => {
    render(
      <BrowserRouter>
        <MyAccountPage onLogout={() => {}} />
      </BrowserRouter>
    )
    expect(
      screen.getByTestId(MyAccountPageTestIds.INPUT_EMAIL)
    ).toBeInTheDocument()
    expect(
      screen.getByTestId(MyAccountPageTestIds.INPUT_CURRENT_PASSWORD)
    ).toBeInTheDocument()
    expect(
      screen.getByTestId(MyAccountPageTestIds.INPUT_NEW_PASSWORD)
    ).toBeInTheDocument()
    expect(
      screen.getByTestId(MyAccountPageTestIds.INPUT_NEW_PASSWORD_CONFIRM)
    ).toBeInTheDocument()
    expect(
      screen.getByTestId(MyAccountPageTestIds.INPUT_PASSWORD_DELETE_ACCOUNT)
    ).toBeInTheDocument()
    expect(
      screen.getByTestId(MyAccountPageTestIds.INPUT_REMOVE_ACCOUNT)
    ).toBeInTheDocument()

    expect(screen.getAllByText('Edit')).toHaveLength(2)
    expect(screen.getByText('Remove')).toBeInTheDocument()
  })

  it('type in all fields for modify informations and edit', async () => {
    render(<MyAccountPage onLogout={() => {}} />)

    user.email = 'boby.dupond@mail.fr'
    fireEvent.change(screen.getByTestId(MyAccountPageTestIds.INPUT_EMAIL), {
      target: { value: 'boby.dupond@mail.fr' },
    })

    await userEvent.click(screen.getAllByText('Edit')[0])

    await waitFor(() => {
      expect(client.updateUser).toHaveBeenCalledWith(
        'boby.dupond@mail.fr',
        'password'
      )
    })
  })

  it('type in all fields for modify password and edit', async () => {
    render(<MyAccountPage onLogout={() => {}} />)

    fireEvent.change(
      screen.getByTestId(MyAccountPageTestIds.INPUT_CURRENT_PASSWORD),
      { target: { value: 'password' } }
    )

    fireEvent.change(
      screen.getByTestId(MyAccountPageTestIds.INPUT_NEW_PASSWORD),
      { target: { value: 'newpassword' } }
    )

    fireEvent.change(
      screen.getByTestId(MyAccountPageTestIds.INPUT_NEW_PASSWORD_CONFIRM),
      { target: { value: 'newpassword' } }
    )

    await userEvent.click(screen.getAllByText('Edit')[1])

    await waitFor(() => {
      expect(client.updatePasswordUser).toHaveBeenCalledWith(
        'password',
        'newpassword'
      )
    })
  })

  it('type in all fields for remove account', async () => {
    render(<MyAccountPage onLogout={() => {}} />)

    fireEvent.change(
      screen.getByTestId(MyAccountPageTestIds.INPUT_PASSWORD_DELETE_ACCOUNT),
      { target: { value: 'password' } }
    )

    fireEvent.change(
      screen.getByTestId(MyAccountPageTestIds.INPUT_REMOVE_ACCOUNT),
      { target: { value: 'REMOVEACCOUNT' } }
    )

    await userEvent.click(screen.getByText('Remove'))

    await waitFor(() => {
      expect(client.deleteUser).toHaveBeenCalledWith('password')
    })
  })
})
