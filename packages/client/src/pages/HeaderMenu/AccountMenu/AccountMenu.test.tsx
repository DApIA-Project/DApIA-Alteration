import React from 'react'
import { render, screen } from '@testing-library/react'
import AccountMenu, { AccountMenuTestIds } from './AccountMenu'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { HeaderMenuTestIds } from '../HeaderMenu'
describe('AccountMenu', () => {
  it('displays header menu', async () => {
    render(
      <BrowserRouter>
        <AccountMenu onLogout={() => {}} />
      </BrowserRouter>
    )

    let accountAvatar = await screen.findByTestId(
      HeaderMenuTestIds.NAVIGATION_ACCOUNT
    )
    await userEvent.click(accountAvatar)
    screen.getByTestId(AccountMenuTestIds.BUTTON_MY_ACCOUNT)

    screen.getByTestId(AccountMenuTestIds.BUTTON_MY_SCENARIOS)
    screen.getByTestId(AccountMenuTestIds.BUTTON_LOG_OUT)
  })

  it('redirects to my account when click on My Account Button', async () => {
    render(
      <BrowserRouter>
        <AccountMenu onLogout={() => {}} />
      </BrowserRouter>
    )
    let accountAvatar = await screen.findByTestId(
      HeaderMenuTestIds.NAVIGATION_ACCOUNT
    )
    await userEvent.click(accountAvatar)

    let myAccountButton = await screen.findByTestId(
      AccountMenuTestIds.BUTTON_MY_ACCOUNT
    )

    await userEvent.click(myAccountButton)
    expect(window.location.pathname).toBe('/my-account')
  })

  it('redirects to homepage when click on My scenarios Button', async () => {
    render(
      <BrowserRouter>
        <AccountMenu onLogout={() => {}} />
      </BrowserRouter>
    )
    let accountAvatar = await screen.findByTestId(
      HeaderMenuTestIds.NAVIGATION_ACCOUNT
    )
    await userEvent.click(accountAvatar)

    let myScenariosButton = await screen.findByTestId(
      AccountMenuTestIds.BUTTON_MY_SCENARIOS
    )

    await userEvent.click(myScenariosButton)
    expect(window.location.pathname).toBe('/')
  })

  it('redirects to connection when click on logout Button', async () => {
    render(
      <BrowserRouter>
        <AccountMenu onLogout={() => {}} />
      </BrowserRouter>
    )
    let accountAvatar = await screen.findByTestId(
      HeaderMenuTestIds.NAVIGATION_ACCOUNT
    )
    await userEvent.click(accountAvatar)

    let logoutButton = await screen.findByTestId(
      AccountMenuTestIds.BUTTON_LOG_OUT
    )

    await userEvent.click(logoutButton)
    expect(window.location.pathname).toBe('/')
  })
})
