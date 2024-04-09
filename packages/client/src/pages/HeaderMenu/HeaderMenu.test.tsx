import React from 'react'
import { render, screen } from '@testing-library/react'
import HeaderMenu, { HeaderMenuTestIds } from './HeaderMenu'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
describe('HeaderMenu', () => {
  it('displays header menu', async () => {
    render(
      <BrowserRouter>
        <HeaderMenu onLogout={() => {}} />
      </BrowserRouter>
    )

    screen.getByTestId(HeaderMenuTestIds.NAVIGATION_HOMEPAGE)

    screen.getByTestId(HeaderMenuTestIds.NAVIGATION_DOCUMENTATION)
    screen.getByTestId(HeaderMenuTestIds.NAVIGATION_ACCOUNT)
  })

  it('redirects to homepage when click on Homepage Button', async () => {
    render(
      <BrowserRouter>
        <HeaderMenu onLogout={() => {}} />
      </BrowserRouter>
    )

    let homepageButton = await screen.findByTestId(
      HeaderMenuTestIds.NAVIGATION_HOMEPAGE
    )

    await userEvent.click(homepageButton)
    expect(window.location.pathname).toBe('/')
  })

  it('redirects to editor when click on editor Button', async () => {
    render(
      <BrowserRouter>
        <HeaderMenu onLogout={() => {}} />
      </BrowserRouter>
    )

    let editorButton = await screen.findByTestId(
      HeaderMenuTestIds.NAVIGATION_EDITOR
    )

    await userEvent.click(editorButton)
    expect(window.location.pathname).toBe('/edit-scenario')
  })

  it('redirects to documentation when click on documentation Button', async () => {
    render(
      <BrowserRouter>
        <HeaderMenu onLogout={() => {}} />
      </BrowserRouter>
    )

    let documentationButton = await screen.findByTestId(
      HeaderMenuTestIds.NAVIGATION_DOCUMENTATION
    )

    await userEvent.click(documentationButton)
    expect(window.location.pathname).toBe('/documentation')
  })
})
