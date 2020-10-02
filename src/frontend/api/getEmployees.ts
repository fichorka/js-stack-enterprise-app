import { API_URL } from '../config'
import { Employee } from './types'

const getEmployees: GetEmployee = async ({ id, format, token }) => {
  const urlEndpoint =
    API_URL +
    `/employees${id ? '/' + id : ''}` +
    `${format === 'text' ? '?format=' + format : ''}`
  return await fetch(urlEndpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      console.log('fetching')
      if (format === 'text') {
        return res.text()
      }
      return res.json()
    })
    .then(res => {
      if (format === 'text') {
        return res
      }
      return res
    })
    .catch(() => false)
}

export { getEmployees }

type GetEmployee = (
  props: Props
) => Promise<Employee[] | Employee | null | undefined>

interface Props {
  id: string | undefined
  format?: 'text'
  token: string
}
