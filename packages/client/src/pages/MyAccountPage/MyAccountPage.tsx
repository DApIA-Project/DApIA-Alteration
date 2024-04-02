import React, { useEffect, useState } from 'react'
import { useClient } from '../../providers/ClientProvider/ClientProvider'
import './MyAccountPage.css'
import InputText from '../../components/ui/InputText/InputText'
import Button from '../../components/ui/Button/Button'
import { User } from '@smartesting/shared/dist/models/User'
import { Alert } from '@mui/material'
import { UpdateUserError } from '@smartesting/shared/dist/responses/updateUser'
import { UpdatePasswordUserError } from '@smartesting/shared/dist/responses/updatePasswordUser'
import { DeleteUserError } from '@smartesting/shared/dist/responses/deleteUser'
import {
  Conflict,
  NotFound,
  UnprocessableContent,
} from '@smartesting/shared/dist/responses/responseError'
import { unstable_batchedUpdates } from 'react-dom'

type MyAccountPagePageProps = {
  onLogout: () => void
}

export enum MyAccountPageTestIds {
  INPUT_FIRSTNAME = 'MyAccountPage.action.isInputFirstname',
  INPUT_LASTNAME = 'MyAccountPage.action.isInputLastname',
  INPUT_EMAIL = 'MyAccountPage.action.isInputEmail',
  INPUT_CURRENT_PASSWORD = 'MyAccountPage.action.isInputCurrentPassword',
  INPUT_NEW_PASSWORD = 'MyAccountPage.action.isInputNewPassword',
  INPUT_NEW_PASSWORD_CONFIRM = 'MyAccountPage.action.isInputNewPasswordConfirm',
  INPUT_PASSWORD_DELETE_ACCOUNT = 'MyAccountPage.action.isInputPasswordDeleteAccount',
  INPUT_REMOVE_ACCOUNT = 'MyAccountPage.action.isInputRemoveAccount',
}

const MyAccountPage: React.FunctionComponent<MyAccountPagePageProps> = ({
  onLogout,
}) => {
  const client = useClient()

  const [userConnected, setUserConnected] = useState<User>()
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [deletePassword, setDeletePassword] = useState('')
  const [removeAccount, setRemoveAccount] = useState('')
  const [haventErrorInformation, setHaventErrorInformation] = useState(false)
  const [errorInformation, setErrorInformation] = useState('')
  const [haventErrorPassword, setHaventErrorPassword] = useState(false)
  const [errorPassword, setErrorPassword] = useState('')
  const [haventErrorRemoveAccount, setHaventErrorRemoveAccount] =
    useState(false)
  const [errorRemoveAccount, setErrorRemoveAccount] = useState('')

  function handleFirstname(newFirstname: string) {
    setHaventErrorInformation(false)
    setErrorInformation('')
    setFirstname(newFirstname)
  }
  function handleLastname(newLastname: string) {
    setHaventErrorInformation(false)
    setErrorInformation('')
    setLastname(newLastname)
  }
  function handleEmail(newEmail: string) {
    setHaventErrorInformation(false)
    setErrorInformation('')
    setEmail(newEmail)
  }

  function handleCurrentPassword(password: string) {
    setHaventErrorPassword(false)
    setErrorPassword('')
    setCurrentPassword(password)
  }

  function handleNewPassword(password: string) {
    setHaventErrorPassword(false)
    setErrorPassword('')
    setNewPassword(password)
  }

  function handleConfirmNewPassword(password: string) {
    setHaventErrorPassword(false)
    setErrorPassword('')
    setConfirmNewPassword(password)
  }

  function handleDeletePassword(password: string) {
    setHaventErrorRemoveAccount(false)
    setErrorRemoveAccount('')
    setDeletePassword(password)
  }
  function handleRemoveAccount(confirmation: string) {
    setHaventErrorRemoveAccount(false)
    setErrorRemoveAccount('')
    setRemoveAccount(confirmation)
  }

  function showErrorInformation(error: UpdateUserError) {
    switch (error) {
      case UnprocessableContent.emptyFirstname:
        setErrorInformation('Firstname is empty')
        break
      case UnprocessableContent.emptyLastname:
        setErrorInformation('Lastname is empty')
        break
      case UnprocessableContent.emptyEmail:
        setErrorInformation('Email is empty')
        break
    }
  }

  function showErrorPassword(error: UpdatePasswordUserError) {
    switch (error) {
      case NotFound.userNotFound:
        setErrorPassword('User not found')
        break
      case UnprocessableContent.emptyPassword:
        setErrorPassword('Current password is empty')
        break
      case UnprocessableContent.emptyNewPassword:
        setErrorPassword('New password is empty')
        break
    }
  }

  function showErrorRemoveAccount(error: DeleteUserError) {
    switch (error) {
      case Conflict.passwordConflict:
        setErrorRemoveAccount('Bad password')
        break
      case NotFound.userNotFound:
        setErrorPassword('User not found')
        break
    }
  }

  useEffect(() => {
    async function fetchData() {
      if (!client) return
      const { user, error } = await client?.findUserByToken()
      if (error) return
      if (user !== null) {
        unstable_batchedUpdates(() => {
          setUserConnected(user)
          setFirstname(user.firstname)
          setLastname(user.lastname)
          setEmail(user.email)
        })
      }
    }
    fetchData()
  }, [client])

  const handleEditInfo = async () => {
    if (!client) return
    if (userConnected == null) return
    try {
      const { user, error } = await client.updateUser(
        firstname,
        lastname,
        email,
        userConnected.password,
        userConnected.isAdmin
      )
      if (error !== null) {
        setHaventErrorInformation(false)
        showErrorInformation(error)
        return
      }
      setHaventErrorInformation(true)
      return user
    } catch (err) {
      throw err
    }
  }

  const handleEditPassword = async () => {
    if (!client) return
    if (userConnected == null) return
    if (newPassword !== confirmNewPassword) {
      unstable_batchedUpdates(() => {
        setHaventErrorPassword(false)
        setErrorPassword('Confirmation is different with New password')
      })

      return
    }
    try {
      const { user, error } = await client.updatePasswordUser(
        currentPassword,
        newPassword
      )
      if (error !== null) {
        setHaventErrorPassword(false)
        showErrorPassword(error)
        return
      }
      unstable_batchedUpdates(() => {
        setHaventErrorPassword(true)
        setCurrentPassword('')
        setNewPassword('')
        setConfirmNewPassword('')
      })

      return user
    } catch (err) {
      throw err
    }
  }

  const handleDeleteAccount = async () => {
    if (!client) return
    if (userConnected == null) return
    if (removeAccount !== 'REMOVEACCOUNT') {
      setErrorRemoveAccount("You didn't write REMOVEACCOUNT")
      return
    }
    try {
      const error = await client.deleteUser(deletePassword)
      if (error.error === null) {
        localStorage.clear()
        onLogout()
        return
      } else {
        showErrorRemoveAccount(error.error)
      }
    } catch (err) {
      throw err
    }
  }

  return (
    <div className={'root'}>
      <div className={'myAccountPage'}>
        <div className={'modifyInfos'}>
          <label>Edit my information</label>
          <InputText
            libelle={'Firstname'}
            value={firstname}
            onChange={handleFirstname}
            id={'firstname-input'}
            data-testid={MyAccountPageTestIds.INPUT_FIRSTNAME}
          />
          <InputText
            libelle={'Lastname'}
            value={lastname}
            onChange={handleLastname}
            id={'lastname-input'}
            data-testid={MyAccountPageTestIds.INPUT_LASTNAME}
          />
          <InputText
            libelle={'Email'}
            value={email}
            onChange={handleEmail}
            id={'email-input'}
            data-testid={MyAccountPageTestIds.INPUT_EMAIL}
          />
          <Button
            text={'Edit'}
            onClick={handleEditInfo}
            className={'buttonEdit'}
          />

          {haventErrorInformation && (
            <Alert className={'stateEdit'} severity='success'>
              Edited !
            </Alert>
          )}

          {!haventErrorInformation && errorInformation !== '' && (
            <Alert className={'stateEdit'} severity='error'>
              {errorInformation}
            </Alert>
          )}
        </div>
        <div className={'modifyPassword'}>
          <label>Edit my password</label>
          <InputText
            libelle={'Current password'}
            value={currentPassword}
            onChange={handleCurrentPassword}
            isPassword={true}
            id={'current-password-input'}
            data-testid={MyAccountPageTestIds.INPUT_CURRENT_PASSWORD}
          />
          <InputText
            libelle={'New password'}
            value={newPassword}
            onChange={handleNewPassword}
            isPassword={true}
            id={'new-password-input'}
            data-testid={MyAccountPageTestIds.INPUT_NEW_PASSWORD}
          />
          <InputText
            libelle={'Confirm the new password'}
            value={confirmNewPassword}
            onChange={handleConfirmNewPassword}
            isPassword={true}
            id={'confirm-new-password-input'}
            data-testid={MyAccountPageTestIds.INPUT_NEW_PASSWORD_CONFIRM}
          />
          <Button
            text={'Edit'}
            onClick={handleEditPassword}
            className={'buttonEdit'}
          />
          {haventErrorPassword && (
            <Alert className={'stateEdit'} severity='success'>
              Edited !
            </Alert>
          )}

          {!haventErrorPassword && errorPassword !== '' && (
            <Alert className={'stateEdit'} severity='error'>
              {errorPassword}
            </Alert>
          )}
        </div>
        <div className={'removeAccount'}>
          <label>Delete my account</label>
          <InputText
            libelle={'Password'}
            value={deletePassword}
            onChange={handleDeletePassword}
            isPassword={true}
            id={'delete-password-input'}
            data-testid={MyAccountPageTestIds.INPUT_PASSWORD_DELETE_ACCOUNT}
          />
          <InputText
            libelle={'Write REMOVEACCOUNT'}
            value={removeAccount}
            onChange={handleRemoveAccount}
            id={'remove-account-input'}
            data-testid={MyAccountPageTestIds.INPUT_REMOVE_ACCOUNT}
          />
          <Button
            text={'Remove'}
            onClick={handleDeleteAccount}
            className={'buttonRemove'}
          />
          {!haventErrorRemoveAccount && errorRemoveAccount !== '' && (
            <Alert className={'stateEdit'} severity='error'>
              {errorRemoveAccount}
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyAccountPage
