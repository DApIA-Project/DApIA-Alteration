import React from 'react'
import { render, screen } from '@testing-library/react'
import HeaderMenu, { HeaderMenuTestIds } from './HeaderMenu'
import { BrowserRouter } from 'react-router-dom'
describe('HeaderMenu', () => {
  it('displays header menu', async () => {
    render(
      <BrowserRouter>
        <HeaderMenu />
      </BrowserRouter>
    )

    screen.getByTestId(HeaderMenuTestIds.NAVIGATION_ACCUEIL)

    screen.getByTestId(HeaderMenuTestIds.NAVIGATION_DOCUMENTATION)
  })
})
