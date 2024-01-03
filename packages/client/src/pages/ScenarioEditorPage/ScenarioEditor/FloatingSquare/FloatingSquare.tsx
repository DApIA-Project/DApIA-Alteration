import React from 'react'
import './FloatingSquare.css'

interface FloatingSquareProps {
  onClose: () => void
}

const FloatingSquare: React.FunctionComponent<FloatingSquareProps> = ({
  onClose,
}) => {
  return (
    <div>
      <div className='overlay'></div> {/* Ajout de l'overlay */}
      <div className={'squareBody'}>
        <p>Contenu du carré flottant</p>
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  )
}

export default FloatingSquare
