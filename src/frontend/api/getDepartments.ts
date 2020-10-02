import { API_URL } from '../config'
import { Department } from './types'

const getDepartments: GetDepartments = async ({
  id,
  format,
  token
}) => {
  const urlEndpoint =
    API_URL +
    `/departments${id ? '/' + id : ''}` +
    `${format === 'text' ? '?format=' + format : ''}`

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
      return res
    })
    .catch(error => {
      console.error(error)
      return
    })
}

export { getDepartments }

type GetDepartments = (
  props: Props
) => Promise<Department[] | Department | null | undefined>

interface Props {
  id: string | undefined
  format?: 'text'
  token: string
}
