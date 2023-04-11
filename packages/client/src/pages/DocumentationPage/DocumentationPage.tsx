import React from 'react'
import '../../styles.css'
import './DocumentationPage.css'
import ReactMarkdown from 'react-markdown'

const DocumentationPage: React.FunctionComponent = () => {
  return (
    <div className={'documentationPage'}>
      <ReactMarkdown>test</ReactMarkdown>
    </div>
  )
}

export default DocumentationPage
