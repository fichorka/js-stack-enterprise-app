import { API_URL } from '../config'
import { Employee } from './types'

const getEmployees: GetEmployees = async ({
  id,
  format,
  limit = 100,
  token
}) => {
  const urlEndpoint =
    API_URL +
    `/employees${id ? '/' + id : ''}` +
    `?limit=${limit}` +
    `${format === 'text' ? '&format=' + format : ''}`
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
      return res.result
    })
    .catch(() => false)
}

export { getEmployees }

export type GetEmployees = (
  props: Props
) => Promise<Employee[] | Employee | null | undefined>

interface Props {
  id?: string
  format?: 'text'
  limit?: number
  token: string
}
