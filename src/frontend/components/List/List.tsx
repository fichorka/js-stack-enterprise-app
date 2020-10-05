import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { Department, Employee } from '../../api'
import './list.css'

const List: React.FC<Props> = ({
  data,
  limit,
  setLimit,
  setIsDataStale,
  deleteFunc,
  format,
  setFormat,
  token
}: Props) => {
  const match = useRouteMatch()
  return (
    <>
      {!!data.length && (
        <>
          {!!format && (
            <div className="wrap">
              <label htmlFor="qty">Format </label>
              <select
                name="format"
                id="format"
                className="list-control"
                onChange={evt => {
                  setFormat(evt.target.value)
                  setIsDataStale(true)
                }}
                value={format}
              >
                <option value="json">JSON</option>
                <option value="text">TEXT</option>
              </select>
            </div>
          )}
          <div className="wrap">
            <label htmlFor="qty">Show item count: </label>
            <select
              name="qty"
              id="qty"
              className="list-control"
              onChange={evt => {
                setLimit(evt.target.value)
                setIsDataStale(true)
              }}
              value={limit}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <Link to={`${match.url}/new`} className="new-btn">
              New item
            </Link>
          </div>

          {typeof data !== 'string' && (
            <ol className="list">
              <li className="item item--header">
                {Object.entries(data[0])
                  .filter(([key]) => key !== '_id')
                  .map(([key = ''], i) => (
                    <span
                      key={key + i + 'header'}
                      className="item__field"
                    >
                      {key}
                    </span>
                  ))}
                <span className="item__field">Action</span>
              </li>
              {data.map(item => (
                <Link key={item._id} to={`${match.url}/${item._id}`}>
                  <li className="item">
                    {Object.entries(item)
                      .filter(([key]) => key !== '_id')
                      .map(([key = '', value = ''], i) => (
                        <span key={key + i} className="item__field">
                          {value}
                        </span>
                      ))}
                    <span
                      className="item__field item__btn"
                      onClick={evt => {
                        evt.stopPropagation()
                        evt.preventDefault()
                        deleteFunc({ id: item._id, token }).then(
                          res => {
                            if (res) setIsDataStale(true)
                          }
                        )
                      }}
                    >
                      Delete
                    </span>
                  </li>
                </Link>
              ))}
            </ol>
          )}
          {typeof data === 'string' && <pre>{data}</pre>}
        </>
      )}
      <div className="list__status">
        {!data.length && 'The list is empty'}
      </div>
    </>
  )
}

export { List }

interface Props {
  data: (Department | Employee)[]
  limit: number
  setIsDataStale: CallableFunction
  setLimit: CallableFunction
  deleteFunc: CallableFunction
  token: string
  format?: string
  setFormat?: CallableFunction
}
