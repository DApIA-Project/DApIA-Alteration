import Client from '../Client'
import * as ClientProviderModule from '../providers/ClientProvider/ClientProvider'

export function mockUseClient(client: Client) {
  jest.spyOn(ClientProviderModule, 'useClient').mockReturnValue(client)
}
