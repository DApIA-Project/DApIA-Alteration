import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import './types.d.ts'
import ScenarioEditorPage from './pages/ScenarioEditorPage/ScenarioEditorPage'
import './styles.css'
import HeaderMenu from './pages/HeaderMenu/HeaderMenu'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DocumentationPage from './pages/DocumentationPage/DocumentationPage'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HeaderMenu />
      <Routes>
        <Route path={'/accueil'} element={<ScenarioEditorPage />} />
        <Route path={'/documentation'} element={<DocumentationPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
