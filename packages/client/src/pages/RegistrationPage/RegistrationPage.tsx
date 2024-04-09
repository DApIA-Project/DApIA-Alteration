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

export enum RegistrationPageTestIds {
  INPUT_EMAIL = 'InputEmail',
  INPUT_PASSWORD = 'InputPassword',
  INPUT_CONFIRM_PASSWORD = 'InputConfirmPassword',
}

type RegistrationPageProps = {
  onLogin: (user_token: string) => void
}

const RegistrationPage: React.FunctionComponent<RegistrationPageProps> = ({
  onLogin,
}) => {
  const client = useClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorRegister, setErrorRegister] = useState('')

  function showErrorRegister(error: CreateUserError) {
    switch (error) {
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
      const { user, error } = await client.createUser(email, password)
      if (error) {
        showErrorRegister(error)
        return
      }

      if (user) onLogin(user?.token)

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
            libelle={'Email'}
            value={email}
            onChange={handleEmail}
            id={'email-input'}
            onSubmit={handleSubmit}
            data-testid={RegistrationPageTestIds.INPUT_EMAIL}
          />
          <InputText
            libelle={'Password'}
            value={password}
            onChange={handlePassword}
            isPassword={true}
            id={'password-input'}
            onSubmit={handleSubmit}
            data-testid={RegistrationPageTestIds.INPUT_PASSWORD}
          />
          <InputText
            libelle={'Confirm Password'}
            value={confirmPassword}
            onChange={handleConfirmPassword}
            isPassword={true}
            id={'confirmPassword-input'}
            onSubmit={handleSubmit}
            data-testid={RegistrationPageTestIds.INPUT_CONFIRM_PASSWORD}
          />
        </div>
        <div className={'submitZone'}>
          <a href={'/connection'}>Sign in ?</a>
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
