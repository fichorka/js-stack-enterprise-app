import { API_URL } from '../config'
import { LoginInfo } from './types'

const login: Login = async loginInfo => {
  const urlEndpoint = API_URL + `/login`
  return await !!fetch(urlEndpoint, {
    method: 'POST',
    headers: {
      'Conter-Type': 'json'
    },
    body: JSON.stringify(loginInfo)
  })
    .then(res => res.json())
    .then(res => {
      return res?.meta?.isSuccess
    })
    .catch(() => false)
}

export { login }

type Login = (loginInfo: LoginInfo) => Promise<boolean>
