import React from 'react'
import '../../styles.css'
import './HeaderMenu.css'
import { NavLink } from 'react-router-dom'
import AccountMenu from './AccountMenu/AccountMenu'

type HeaderMenuProps = {
  onLogout: () => void
}

export enum HeaderMenuTestIds {
  NAVIGATION_HOMEPAGE = 'HeaderMenu.action.isNavigationHomepage',
  NAVIGATION_DOCUMENTATION = 'HeaderMenu.action.isNavigationDocumentation',
  NAVIGATION_EDITOR = 'HeaderMenu.action.isNavigationEditor',
  NAVIGATION_ACCOUNT = 'HeaderMenu.action.isNavigationAccount',
}

const HeaderMenu: React.FunctionComponent<HeaderMenuProps> = ({ onLogout }) => {
  return (
    <>
      <header>
        <span>DApIA</span>
        <span>Alteration</span>
      </header>
      <nav className='menu'>
        <ul>
          <li>
            <NavLink
              className='navbar-item'
              to='/'
              data-testid={HeaderMenuTestIds.NAVIGATION_HOMEPAGE}
            >
              Homepage
            </NavLink>
          </li>
          <li>
            <NavLink
              className='navbar-item'
              to='/edit-scenario'
              data-testid={HeaderMenuTestIds.NAVIGATION_EDITOR}
            >
              Editor
            </NavLink>
          </li>
          <li>
            <NavLink
              className='navbar-item'
              to='/documentation'
              data-testid={HeaderMenuTestIds.NAVIGATION_DOCUMENTATION}
            >
              Documentation
            </NavLink>
          </li>
          <li>
            <AccountMenu onLogout={onLogout} />
          </li>
        </ul>
      </nav>
    </>
  )
}

export default HeaderMenu
