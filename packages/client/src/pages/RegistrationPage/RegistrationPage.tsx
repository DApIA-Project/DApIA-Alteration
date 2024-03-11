import React, { useState } from 'react'
import { useClient } from '../../providers/ClientProvider/ClientProvider'
import InputText from '../../components/ui/InputText/InputText'
import Button from '../../components/ui/Button/Button'
import './RegistrationPage.css'
import { Alert } from '@mui/material'
import { CreateUserError } from '@smartesting/shared/dist/responses/createUser'
import {
  Conflict,
  UnprocessableContent,
} from '@smartesting/shared/dist/responses/responseError'

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
  const [errorRegister, setErrorRegister] = useState('')

  function showErrorRegister(error: CreateUserError) {
    switch (error) {
      case UnprocessableContent.emptyFirstname:
        setErrorRegister('Firstname is empty')
        break
      case UnprocessableContent.emptyLastname:
        setErrorRegister('Lastname is empty')
        break
      case UnprocessableContent.emptyEmail:
        setErrorRegister('Email is empty')
        break
      case UnprocessableContent.emptyPassword:
        setErrorRegister('Password is empty')
        break
      case Conflict.emailConflict:
        setErrorRegister('Email already used')
        break
    }
  }
  const handleSubmit = async () => {
    if (!client) return
    if (password !== confirmPassword) {
      setErrorRegister('Confirmation password is different to password')
      return
    }

    try {
      const { user, error } = await client.createUser(
        firstname,
        lastname,
        email,
        password
      )
      if (error) {
        showErrorRegister(error)
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
      <div className={'registrationPage'}>
        <div className={'imageFlight'}>
          <img src={'../assets/Flight_White.png'} alt={'Logo White Flight'} />
          <label>DApIA Alteration</label>
        </div>
        <div className={'allInputText'}>
          <InputText
            libelle={'Firstname'}
            value={firstname}
            id={'firstname-input'}
            onChange={handleFirstname}
            onSubmit={handleSubmit}
          />
          <InputText
            libelle={'Lastname'}
            value={lastname}
            onChange={handleLastname}
            id={'lastname-input'}
            onSubmit={handleSubmit}
          />
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
          <InputText
            libelle={'Confirm Password'}
            value={confirmPassword}
            onChange={handleConfirmPassword}
            isPassword={true}
            id={'confirmPassword-input'}
            onSubmit={handleSubmit}
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
        <div>
          {errorRegister !== '' && (
            <Alert className={'stateEdit'} severity='error'>
              {errorRegister}
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}

export default RegistrationPage
