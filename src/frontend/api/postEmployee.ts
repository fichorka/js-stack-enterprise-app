import { API_URL } from '../config'
import { Employee } from './types'

const postEmployee: PostEmployee = async ({ info, token }) => {
  const urlEndpoint = API_URL + `/employees`
  return await fetch(urlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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

export { postEmployee }

type PostEmployee = (
  props: Props
) => Promise<Employee | boolean | undefined>

interface Props {
  info: Employee
  token: string
}
