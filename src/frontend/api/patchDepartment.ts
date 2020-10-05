import { API_URL } from '../config'
import { Department } from './types'

const patchDepartment: PatchDepartment = async ({ info, token }) => {
  const urlEndpoint = API_URL + `/departments/${info._id}`
  return await fetch(urlEndpoint, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(info)
  })
    .then(res => {
      if (res.status > 300) {
        throw new Error()
      }
      return res
    })
    .then(res => res.json())
}

export { patchDepartment }

type PatchDepartment = (props: Props) => Promise<boolean | void>

interface Props {
  id: string
  info: Department
  token: string
}
