import React from 'react'
import '../../styles.css'
import './HeaderMenu.css'
import { NavLink } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Tooltip } from '@mui/joy'

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
        <li>
          <NavLink
            className='navbar-item'
            to='/connect'
            data-testid={HeaderMenuTestIds.NAVIGATION_DOCUMENTATION}
          >
            <Tooltip arrow title={''} className={'tooltip'}>
              <AccountCircleIcon
                fontSize='large'
                className='accountCircleIcon'
              />
            </Tooltip>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default HeaderMenu
