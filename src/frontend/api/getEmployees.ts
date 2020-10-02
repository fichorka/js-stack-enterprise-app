import { API_URL } from '../config'
import { Employee } from './types'

const getEmployee: GetEmployee = async (id, format) => {
  const urlEndpoint =
    API_URL +
    `/employees${id ? '/' + id : ''}` +
    `${format === 'text' ? '?format=' + format : ''}`
  return await fetch(urlEndpoint)
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
      if (res?.meta?.isSuccess) throw new Error(res.meta.message)
      return res?.result
    })
    .catch(() => false)
}

export { getEmployee as getDepartments }

type GetEmployee = (
  id: string | undefined,
  format?: 'text'
) => Promise<Employee[] | Employee | null | false | string>
