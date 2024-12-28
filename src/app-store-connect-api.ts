import { generateAuthToken, type AuthToken } from './auth'

const api = await import('./client/sdk.gen')
type AppStoreConnectApi = Omit<typeof api, 'client'>

const AppStoreConnect = {
  ... (api as AppStoreConnectApi),
  setConfig: async ({
    privateKeyId, 
    issuerId, 
    privateKey
  }: {
    privateKeyId: string
    issuerId: string
    privateKey: string
  }) => {
    let authToken: AuthToken | undefined = undefined
    api.client.setConfig({
      baseUrl: 'https://api.appstoreconnect.apple.com',
      fetch: async (request) => {

        if(!authToken || authToken.expireAt < Date.now()) {
  
          authToken = await generateAuthToken({
            privateKeyId: privateKeyId,
            issuerId: issuerId,
            privateKey: privateKey,
          })
        }

        request.headers.set('Authorization', `Bearer ${authToken.token}`)
        return fetch(request)
      }
    })
  },

  clearConfig: () => {
    api.client.setConfig({
      apiKey: undefined
    })
  }
}

export default AppStoreConnect