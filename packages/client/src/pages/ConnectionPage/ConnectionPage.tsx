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

    /*try {
      const { user, error } = await client.findUserWithEmail(
        email
      )
      if (error) {
        return
      }

      if (user) onLogin(user?.id);

      return user
    } catch (err) {
      throw err
    }*/
  }

  function handleEmail(newEmail: string) {
    setEmail(newEmail)
  }

  function handlePassword(newPassword: string) {
    setPassword(newPassword)
  }

  return (
    <div className={'root'}>
      <div className={'imageFlight'}>
        <img src={'../assets/Flight_White.png'} />
        <label>DApIA Alteration</label>
      </div>
      <div className={'allInputText'}>
        <InputText libelle={'Email'} value={''} onChange={handleEmail} />
        <InputText
          libelle={'Password'}
          value={''}
          onChange={handlePassword}
          isPassword={true}
        />
      </div>
      <div className={'submitZone'}>
        <a href={'http://localhost:3000/forgotpassword'}>Forgot password ?</a>
        <a href={'http://localhost:3000/registration'}>Sign up ?</a>
        <Button
          text={'Sign in'}
          onClick={handleSubmit}
          className={'buttonConnectAccount'}
        />
      </div>
    </div>
  )
}

export default ConnectionPage
