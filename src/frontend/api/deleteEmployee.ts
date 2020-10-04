import { API_URL } from '../config'

const deleteEmployee: DeleteEmployee = async ({ id, token }) => {
  const urlEndpoint = API_URL + `/employees/${id}`
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

export { deleteEmployee }

type DeleteEmployee = (
  props: Props
) => Promise<Record<string, unknown>>

interface Props {
  id: string
  token: string
}
