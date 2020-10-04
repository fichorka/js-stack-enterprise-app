import { useEffect } from 'react'
import { Department, Employee } from '../api'

const useData: UseData = ({
  isDataStale,
  setIsDataStale,
  format,
  setData,
  fetchData,
  token,
  limit
}: Props) => {
  useEffect(() => {
    // knows when to fetch data
    if (token && isDataStale) {
      fetchData({ token, limit, format }).then(data => {
        if (data) {
          setData(data)
          setIsDataStale(false)
        }
      })
    }
  }, [token, isDataStale])
}

export { useData }

type UseData = (options: Props) => void

interface Props {
  isDataStale: boolean
  setIsDataStale: CallableFunction
  format: string
  setData: CallableFunction
  fetchData: CallableFunction
  token: string
  limit?: number
}
