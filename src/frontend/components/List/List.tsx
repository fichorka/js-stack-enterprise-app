import React from 'react'
import { Link, useLocation, useRouteMatch } from 'react-router-dom'
import { Department, Employee } from '../../api'
import './list.css'

const List: React.FC<Props> = ({
  data,
  limit,
  setLimit,
  setIsDataStale,
  setSelection,
  deleteFunc,
  token
}: Props) => {
  const match = useRouteMatch()
  console.log('list: ', match)
  return (
    <>
      {!!data.length && (
        <>
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

          <ol className="list">
            {data.map(item => (
              <Link
                key={item._id}
                to={`${match.url}/${item._id}`}
                onClick={() => {
                  setSelection(item)
                }}
              >
                <li className="item">
                  {Object.entries(item)
                    .filter(([key]) => key !== '_id')
                    .map(([key = '', value = ''], i) => (
                      <span key={key + i} className="item__field">
                        {value}
                      </span>
                    ))}
                  <span
                    className="item__field"
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
                    <button className="item__btn">Delete</button>
                  </span>
                </li>
              </Link>
            ))}
          </ol>
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
  setSelection: CallableFunction
  deleteFunc: CallableFunction
  token: string
}
