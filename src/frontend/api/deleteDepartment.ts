import { API_URL } from '../config'

const deleteDepartment: DeleteDepartment = async ({ id, token }) => {
  const urlEndpoint = API_URL + `/departments/${id}`
  return await fetch(urlEndpoint, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .catch(error => {
      console.error(error)
      return
    })
}

export { deleteDepartment }

type DeleteDepartment = (
  props: Props
) => Promise<Record<string, unknown>>

interface Props {
  id: string
  token: string
}
