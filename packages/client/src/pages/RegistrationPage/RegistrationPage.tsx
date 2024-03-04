import React, { useState } from 'react'
import { useClient } from '../../providers/ClientProvider/ClientProvider'
import InputText from '../../components/ui/InputText/InputText'
import Button from '../../components/ui/Button/Button'
import './RegistrationPage.css'

type RegistrationPageProps = {
  onLogin: (user_id: number) => void
}

const RegistrationPage: React.FunctionComponent<RegistrationPageProps> = ({
  onLogin,
}) => {
  const client = useClient()

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = async () => {
    if (!client) return
    if (password !== confirmPassword) return

    try {
      const { user, error } = await client.createUser(
        firstname,
        lastname,
        email,
        password
      )
      if (error) {
        return
      }

      if (user) onLogin(user?.id)

      return user
    } catch (err) {
      throw err
    }
  }

  function handleFirstname(newFirstname: string) {
    setFirstname(newFirstname)
  }
  function handleLastname(newLastname: string) {
    setLastname(newLastname)
  }

  function handleEmail(newEmail: string) {
    setEmail(newEmail)
  }

  function handlePassword(newPassword: string) {
    setPassword(newPassword)
  }

  function handleConfirmPassword(newConfirmPassword: string) {
    setConfirmPassword(newConfirmPassword)
  }

  return (
    <div className={'root'}>
      <div className={'imageFlight'}>
        <img src={'../assets/Flight_White.png'} />
        <label>DApIA Alteration</label>
      </div>
      <div className={'allInputText'}>
        <InputText
          libelle={'Firstname'}
          value={''}
          onChange={handleFirstname}
        />
        <InputText libelle={'Lastname'} value={''} onChange={handleLastname} />
        <InputText libelle={'Email'} value={''} onChange={handleEmail} />
        <InputText
          libelle={'Password'}
          value={''}
          onChange={handlePassword}
          isPassword={true}
        />
        <InputText
          libelle={'Confirm Password'}
          value={''}
          onChange={handleConfirmPassword}
          isPassword={true}
        />
      </div>
      <div className={'submitZone'}>
        <a href={'http://localhost:3000/connection'}>Sign in ?</a>
        <Button
          text={'Sign up'}
          onClick={handleSubmit}
          className={'buttonCreateAccount'}
        />
      </div>
    </div>
  )
}

export default RegistrationPage
