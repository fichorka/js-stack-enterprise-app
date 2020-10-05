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
    .then(res => {
      if (res.status > 300) {
        throw new Error()
      }
      return res
    })
    .then(res => res.json())
    .then(res => res.token)
}

export { postLogin }

type PostLogin = (loginInfo: LoginInfo) => Promise<boolean>
