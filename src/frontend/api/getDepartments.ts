import { API_URL } from '../config'
import { Department } from './types'

const getDepartments: GetDepartments = async ({
  id,
  format,
  limit = 100,
  token
}) => {
  const urlEndpoint =
    API_URL +
    `/departments${id ? '/' + id : ''}` +
    `?limit=${limit}` +
    `${format === 'text' ? '&format=' + format : ''}`

  return await fetch(urlEndpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
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
    .catch(error => {
      console.error(error)
      return
    })
}

export { getDepartments }

export type GetDepartments = (
  props: Props
) => Promise<Department[] | Department | null | undefined>

interface Props {
  id: string | undefined
  format?: 'text'
  limit?: number
  token: string
}
