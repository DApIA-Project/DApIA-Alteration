import React, { useState } from 'react'
import { useClient } from '../../providers/ClientProvider/ClientProvider'
import './MyAccountPage.css'

type MyAccountPagePageProps = {}

const MyAccountPage: React.FunctionComponent<MyAccountPagePageProps> = ({}) => {
  const client = useClient()

  return (
    <div className={'root'}>
      <div className={'myAccountPage'}>
        <div className={'modifyInfos'}>Test 1</div>
        <div className={'modifyPassword'}>Test 2</div>
        <div className={'removeAccount'}>Test 3</div>
      </div>
    </div>
  )
}

export default MyAccountPage
