import { API_URL } from '../config'

const getLogin: GetLogin = async () => {
  const urlEndpoint = API_URL + `/login`
  return await !!fetch(urlEndpoint)
    .then(res => res.json())
    .then(res => res.username)
    .catch(() => false)
}

export { getLogin }

type GetLogin = () => Promise<boolean>
