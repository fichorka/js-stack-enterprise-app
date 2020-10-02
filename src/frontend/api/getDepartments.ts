import { API_URL } from '../config'
import { Department } from './types'

const getDepartments: GetDepartments = async (id, format) => {
  const urlEndpoint =
    API_URL +
    `/departments${id ? '/' + id : ''}` +
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

export { getDepartments }

type GetDepartments = (
  id: string | undefined,
  format?: 'text'
) => Promise<Department[] | Department | null | false | string>
