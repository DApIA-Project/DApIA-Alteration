import React, { useEffect, useState } from 'react'
import { useClient } from '../../providers/ClientProvider/ClientProvider'
import './MyAccountPage.css'
import InputText from '../../components/ui/InputText/InputText'
import Button from '../../components/ui/Button/Button'
import { User } from '@smartesting/shared/dist/models/User'
import { useNavigate } from 'react-router-dom'

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

  function handleFirstname(newFirstname: string) {
    setFirstname(newFirstname)
  }
  function handleLastname(newLastname: string) {
    setLastname(newLastname)
  }
  function handleEmail(newEmail: string) {
    setEmail(newEmail)
  }

  function handleCurrentPassword(password: string) {
    setCurrentPassword(password)
  }

  function handleNewPassword(password: string) {
    setNewPassword(password)
  }

  function handleConfirmNewPassword(password: string) {
    setConfirmNewPassword(password)
  }

  function handleDeletePassword(password: string) {
    setDeletePassword(password)
  }
  function handleRemoveAccount(confirmation: string) {
    setRemoveAccount(confirmation)
  }

  useEffect(() => {
    async function fetchData() {
      if (!client) return
      const id_user: number = Number(localStorage.getItem('user_id'))
      const { user, error } = await client?.findUser(id_user)
      if (error) console.log(error)
      if (user !== null) {
        setUserConnected(user)
        setFirstname(user.firstname)
        setLastname(user.lastname)
        setEmail(user.email)
      }
      console.log(userConnected)
    }
    fetchData()
  }, [client])

  const handleEditInfo = async () => {
    if (!client) return
    if (userConnected == null) return
    try {
      const { user, error } = await client.updateUser(
        userConnected.id,
        firstname,
        lastname,
        email,
        userConnected.password,
        userConnected.isAdmin
      )
      if (error) {
        return
      }
      return user
    } catch (err) {
      throw err
    }
  }

  const handleEditPassword = async () => {
    if (!client) return
    if (userConnected == null) return
    if (newPassword !== confirmNewPassword) return
    try {
      const { user, error } = await client.updatePasswordUser(
        userConnected.id,
        currentPassword,
        newPassword
      )

      if (error) {
        return
      }
      return user
    } catch (err) {
      throw err
    }
  }

  const handleDeleteAccount = async () => {
    if (!client) return
    if (userConnected == null) return
    if (removeAccount !== 'REMOVEACCOUNT') return
    try {
      const error = await client.deleteUser(userConnected.id, deletePassword)
      if (error.error === null) {
        localStorage.clear()
        onLogout()
        return
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
        </div>
      </div>
    </div>
  )
}

export default MyAccountPage
