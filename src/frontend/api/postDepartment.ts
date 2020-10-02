import { API_URL } from '../config'
import { Department } from './types'

const postDepartment: PostDepartments = async ({ info, token }) => {
  const urlEndpoint = API_URL + `/departments`
  return await fetch(urlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(info)
  })
    .then(res => res.json())
    .then(res => res?.meta?.isSuccess)
    .catch(error => {
      console.error(error)
      return
    })
}

export { postDepartment }

type PostDepartments = (
  props: Props
) => Promise<Department | boolean | undefined>

interface Props {
  info: Department
  token: string
}
