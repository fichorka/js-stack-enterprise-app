import React, { useState, useEffect } from 'react'
import { Department, Employee } from '../../api'
import { PageLayout } from '../../layouts'

const List: React.FC<Props> = ({
  title,
  fetchList,
  token,
  data,
  setData
}: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (data.length === 0) {
      setIsLoading(true)
      fetchList({ token }).then(data => {
        if (!data) {
          setIsError(true)
          setIsLoading(false)
        } else {
          setIsError(false)
          setIsLoading(false)
          setData(data.result)
        }
      })
    }
  }, [token, data.length])

  return (
    <PageLayout title={title}>
      {isError && <div>Error.</div>}
      {isLoading && <div>Loading...</div>}
      {data.length &&
        data.map(item => (
          <li key={item._id} className="item">
            {Object.entries(item).map(([key = '', value = ''], i) => (
              <span key={key + i} className="item__field">
                {value}
              </span>
            ))}
          </li>
        ))}
      {!isError && !isLoading && !data.length && (
        <div>The list is empty</div>
      )}
    </PageLayout>
  )
}

export { List }

interface Props {
  title: string
  fetchList: FetchList
  token: string
  data: Department[] | Employee[]
  setData: CallableFunction
}

type FetchList = (
  props: Record<string, any>
) => Promise<any[] | any | null | undefined>
