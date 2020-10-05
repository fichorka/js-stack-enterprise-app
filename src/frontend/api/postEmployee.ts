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
    .then(res => {
      if (res.status > 300) {
        throw new Error()
      }
      return res
    })
    .then(res => res.json())
}

export { postEmployee }

type PostEmployee = (
  props: Props
) => Promise<Employee | boolean | undefined>

interface Props {
  info: Employee
  token: string
}
