import React from 'react'
import Client from '../../Client'
import { FunctionComponentWithChildren } from '../../react/FunctionComponentWithChildren'

const ClientContext = React.createContext<Client | undefined>(undefined)

const ClientProvider: FunctionComponentWithChildren<{
  client?: Client
}> = ({ client, children }) => {
  return (
    <ClientContext.Provider value={client ?? new Client()}>
      {children}
    </ClientContext.Provider>
  )
}
export default ClientProvider

export function useClient() {
  return React.useContext(ClientContext)
}
