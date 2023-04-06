import React from 'react'
import '../../styles.css'
import './HeaderMenu.css'

const HeaderMenu: React.FunctionComponent = () => {
  return (
    <nav className='menu'>
      <ul>
        <li>
          <a href='http://localhost:3000/'>Accueil</a>
        </li>
        <li>
          <a href=''>Documentation</a>
        </li>
      </ul>
    </nav>
  )
}

export default HeaderMenu
