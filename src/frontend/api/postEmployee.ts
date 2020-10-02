import { API_URL } from '../config'
import { Employee } from './types'

const postEmployee: PostEmployee = async employeeInfo => {
  const urlEndpoint = API_URL + `/eployees`
  return await !!fetch(urlEndpoint, {
    method: 'POST',
    headers: {
      'Conter-Type': 'json'
    },
    body: JSON.stringify(employeeInfo)
  })
    .then(res => res.json())
    .then(res => res?.meta?.isSuccess)
    .catch(() => false)
}

export { postEmployee }

type PostEmployee = (
  departmentInfo: Employee
) => Promise<Employee | boolean | false>
