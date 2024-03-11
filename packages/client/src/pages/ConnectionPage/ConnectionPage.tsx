import React, { useState } from 'react'
import { useClient } from '../../providers/ClientProvider/ClientProvider'
import InputText from '../../components/ui/InputText/InputText'
import Button from '../../components/ui/Button/Button'
import './ConnectionPage.css'

type ConnectionPageProps = {
  onLogin: (user_id: number) => void
}

const ConnectionPage: React.FunctionComponent<ConnectionPageProps> = ({
  onLogin,
}) => {
  const client = useClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
    if (!client) return

    try {
      const { user, error } = await client.login(email, password)
      if (error) {
        return
      }

      if (user !== null) {
        onLogin(user?.id)
      }

      return user
    } catch (err) {
      throw err
    }
  }

  function handleEmail(newEmail: string) {
    setEmail(newEmail)
  }

  function handlePassword(newPassword: string) {
    setPassword(newPassword)
  }

  return (
    <div className={'root'}>
      <div className={'connectionPage'}>
        <div className={'imageFlight'}>
          <img src={'../assets/Flight_White.png'} alt={'Logo White Flight'} />
          <label>DApIA Alteration</label>
        </div>
        <div className={'allInputText'}>
          <InputText
            libelle={'Email'}
            value={email}
            onChange={handleEmail}
            id={'email-input'}
            onSubmit={handleSubmit}
          />
          <InputText
            libelle={'Password'}
            value={password}
            onChange={handlePassword}
            isPassword={true}
            id={'password-input'}
            onSubmit={handleSubmit}
          />
        </div>
        <div className={'submitZone'}>
          <a href={'http://localhost:3000/registration'}>Sign up ?</a>
          <Button
            text={'Sign in'}
            onClick={handleSubmit}
            className={'buttonConnectAccount'}
          />
        </div>
      </div>
    </div>
  )
}

export default ConnectionPage
