import { API_URL } from '../config'
import { Department } from './types'

const postDepartment: PostDepartments = async ({ info, token }) => {
  const urlEndpoint = API_URL + `/departments`
  return await fetch(urlEndpoint, {
    method: 'POST',
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

export { postDepartment }

type PostDepartments = (
  props: Props
) => Promise<Department | boolean | undefined>

interface Props {
  info: Department
  token: string
}
