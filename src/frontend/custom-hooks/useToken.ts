import { useEffect } from 'react'
import jwt from 'jsonwebtoken'

const useToken: UseToken = ({
  token,
  setToken,
  setUsername,
  setEmployees,
  setDepartments
}) => {
  // custom hook that manages login state
  useEffect(() => {
    let decoded
    if (token) {
      decoded = jwt.decode(token) as {
        username: string
        exp: number
      }
    }

    if ((decoded && Date.now() > decoded.exp * 1000) || !token) {
      setToken('')
      setUsername('')
      setEmployees([])
      setDepartments([])
    } else {
      setUsername(decoded.username)
    }
  }, [token])
}

type UseToken = (props: Props) => void

interface Props {
  token: string
  setToken: CallableFunction
  setUsername: CallableFunction
  setEmployees: CallableFunction
  setDepartments: CallableFunction
}

export { useToken }
