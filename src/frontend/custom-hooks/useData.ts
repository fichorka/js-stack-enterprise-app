import { useEffect } from 'react'
import { Department, Employee } from '../api'

const useData: UseData = ({
  isDataStale,
  setIsDataStale,
  data,
  setData,
  fetchData,
  token,
  limit
}: Props) => {
  useEffect(() => {
    // knows when to fetch data
    if (token && isDataStale) {
      fetchData({ token, limit }).then(data => {
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
  data: Department[] | Employee[]
  setData: CallableFunction
  fetchData: CallableFunction
  token: string
  limit?: number
}
