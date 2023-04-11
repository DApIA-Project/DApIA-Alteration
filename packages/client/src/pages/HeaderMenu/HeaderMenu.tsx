import React from 'react'
import '../../styles.css'
import './HeaderMenu.css'
import { NavLink } from 'react-router-dom'
const HeaderMenu: React.FunctionComponent = () => {
  return (
    <nav className='menu'>
      <ul>
        <li>
          <NavLink className='navbar-item' to='/accueil'>
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink className='navbar-item' to='/documentation'>
            Documentation
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default HeaderMenu
