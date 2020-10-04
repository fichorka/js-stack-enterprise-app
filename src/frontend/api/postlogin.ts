import { API_URL } from '../config'
import { LoginInfo } from './types'

const postLogin: PostLogin = async loginInfo => {
  const urlEndpoint = API_URL + `/login`
  return await fetch(urlEndpoint, {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginInfo)
  })
    .then(res => res.json())
    .then(res => res.token)
    .catch(() => false)
}

export { postLogin }

type PostLogin = (loginInfo: LoginInfo) => Promise<string | false>
