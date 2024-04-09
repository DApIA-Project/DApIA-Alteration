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
import ScenariosPage from './pages/ScenariosPage/ScenariosPage'

const AuthContext = React.createContext<boolean>(false)

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false)

  const setAuth = (value: boolean) => {
    setIsAuthenticated(value)
  }

  const handleLogin = (user_token: string) => {
    unstable_batchedUpdates(() => {
      localStorage.setItem('userToken', user_token)
      setAuth(true)
    })
  }

  const handleLogout = () => {
    localStorage.clear()
    setAuth(false)
  }

  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
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
              {!isAuthenticated && (
                <Route
                  path='/my-account'
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
                <Route path='/' element={<ScenariosPage />} />
              )}
              {isAuthenticated && (
                <Route path='/documentation' element={<DocumentationPage />} />
              )}
              {isAuthenticated && (
                <Route
                  path='/my-account'
                  element={<MyAccountPage onLogout={handleLogout} />}
                />
              )}

              {isAuthenticated && (
                <Route
                  path='/edit-scenario/:id?'
                  element={<ScenarioEditorPage />}
                />
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
