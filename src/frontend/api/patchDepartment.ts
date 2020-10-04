import { API_URL } from '../config'
import { Department } from './types'

const patchDepartment: PatchDepartment = async ({ info, token }) => {
  const urlEndpoint = API_URL + `/departments/${info._id}`
  debugger
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

export { patchDepartment }

type PatchDepartment = (props: Props) => Promise<boolean | void>

interface Props {
  id: string
  info: Department
  token: string
}
