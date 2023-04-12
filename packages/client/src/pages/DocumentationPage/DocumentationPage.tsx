import React from 'react'
import '../../styles.css'
import './DocumentationPage.css'
import Button from '../../components/ui/Button/Button'

function openGrammar() {
  const url = '/assets/grammaireDsl.pdf'
  window.open(url)
}

const DocumentationPage: React.FunctionComponent = () => {
  return (
    <div className={'documentationPage'}>
      <Button text={'See grammar'} onClick={openGrammar} />
    </div>
  )
}

export default DocumentationPage
