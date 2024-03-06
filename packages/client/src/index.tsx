import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import ScenarioEditorPage from './pages/ScenarioEditorPage/ScenarioEditorPage'
import './styles.css'
import HeaderMenu from './pages/HeaderMenu/HeaderMenu'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import DocumentationPage from './pages/DocumentationPage/DocumentationPage'
import ClientProvider from './providers/ClientProvider/ClientProvider'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import { unstable_batchedUpdates } from 'react-dom'
import ConnectionPage from './pages/ConnectionPage/ConnectionPage'
import MyAccountPage from './pages/MyAccountPage/MyAccountPage'

const AuthContext = React.createContext<boolean>(false)

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false)

  const setAuth = (value: boolean) => {
    setIsAuthenticated(value)
  }

  const handleLogin = (user_id: number) => {
    unstable_batchedUpdates(() => {
      localStorage.setItem('user_id', user_id.toString())
      setAuth(true)
    })
  }

  const handleLogout = () => {
    localStorage.clear()
    setAuth(false)
  }

  useEffect(() => {
    if (localStorage.getItem('user_id') !== null) {
      setAuth(true)
    }
  }, [isAuthenticated])

  return (
    <AuthContext.Provider value={isAuthenticated}>
      <React.StrictMode>
        <ClientProvider>
          <BrowserRouter>
            {/* Afficher HeaderMenu si l'utilisateur est connecté */}
            {isAuthenticated && <HeaderMenu onLogout={handleLogout} />}
            <Routes>
              {/* Redirections selon le statut de connexion */}
              {!isAuthenticated && (
                <Route path='/' element={<Navigate to='/connection' />} />
              )}
              {!isAuthenticated && (
                <Route
                  path='/documentation'
                  element={<Navigate to='/connection' />}
                />
              )}
              {isAuthenticated && (
                <Route path='/connection' element={<Navigate to='/' />} />
              )}
              {isAuthenticated && (
                <Route path='/registration' element={<Navigate to='/' />} />
              )}

              {/* Affichage des pages */}
              {!isAuthenticated && (
                <Route
                  path='/registration'
                  element={<RegistrationPage onLogin={handleLogin} />}
                />
              )}
              {!isAuthenticated && (
                <Route
                  path='/connection'
                  element={<ConnectionPage onLogin={handleLogin} />}
                />
              )}
              {isAuthenticated && (
                <Route path='/' element={<ScenarioEditorPage />} />
              )}
              {isAuthenticated && (
                <Route path='/documentation' element={<DocumentationPage />} />
              )}
              {isAuthenticated && (
                <Route path='/my-account' element={<MyAccountPage />} />
              )}
            </Routes>
          </BrowserRouter>
        </ClientProvider>
      </React.StrictMode>
    </AuthContext.Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
