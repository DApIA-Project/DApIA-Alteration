import React from 'react'
import { render, screen } from '@testing-library/react'
import MyAccountPage, { MyAccountPageTestIds } from './MyAccountPage'
import { BrowserRouter } from 'react-router-dom'

describe('MyAccountPage', () => {
  it('displays my account page', async () => {
    render(
      <BrowserRouter>
        <MyAccountPage onLogout={() => {}} />
      </BrowserRouter>
    )
    expect(
      screen.getByTestId(MyAccountPageTestIds.INPUT_FIRSTNAME)
    ).toBeInTheDocument()
    expect(
      screen.getByTestId(MyAccountPageTestIds.INPUT_LASTNAME)
    ).toBeInTheDocument()
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
})
