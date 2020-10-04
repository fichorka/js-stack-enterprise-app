import { API_URL } from '../config'
import { Employee } from './types'

const patchEmployee: PatchEmployee = async ({ info, token }) => {
  const urlEndpoint = API_URL + `/employees/${info._id}`
  return await fetch(urlEndpoint, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(info)
  })
    .then(res => res.json())
    .then(res => !!res)
    .catch(error => {
      console.error(error)
      return
    })
}

export { patchEmployee }

type PatchEmployee = (props: Props) => Promise<boolean | void>

interface Props {
  id: string
  info: Employee
  token: string
}
