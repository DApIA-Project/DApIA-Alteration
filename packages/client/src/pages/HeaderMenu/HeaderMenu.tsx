import React from 'react'
import '../../styles.css'
import './HeaderMenu.css'
import { NavLink } from 'react-router-dom'

export enum HeaderMenuTestIds {
  NAVIGATION_ACCUEIL = 'HeaderMenu.action.isNavigationAccueil',
  NAVIGATION_DOCUMENTATION = 'HeaderMenu.action.isNavigationDocumentation',
}
const HeaderMenu: React.FunctionComponent = () => {
  return (
    <nav className='menu'>
      <ul>
        <li>
          <NavLink
            className='navbar-item'
            to='/'
            data-testid={HeaderMenuTestIds.NAVIGATION_ACCUEIL}
          >
            Accueil
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
      </ul>
    </nav>
  )
}

export default HeaderMenu
