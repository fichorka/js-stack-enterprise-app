import { API_URL } from '../config'
import { Department } from './types'

const postDepartment: PostDepartments = async departmentInfo => {
  const urlEndpoint = API_URL + `/departments`
  return await !!fetch(urlEndpoint, {
    method: 'POST',
    headers: {
      'Conter-Type': 'json'
    },
    body: JSON.stringify(departmentInfo)
  })
    .then(res => res.json())
    .then(res => res?.meta?.isSuccess)
    .catch(() => false)
}

export { postDepartment }

type PostDepartments = (
  departmentInfo: Department
) => Promise<Department | boolean | false>
