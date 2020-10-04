import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { Department } from '../../api'

const DepartmentForm: React.FC<Props> = ({
  departments,
  token,
  setIsDataStale,
  apiFunction
}: Props) => {
  const { id } = useRouteMatch().params as Record<string, string>

  const existingInfo: Department | Record<string, undefined> =
    id && departments.length
      ? departments.filter(dep => dep._id === id)[0]
      : {}

  const handleSubmit = evt => {
    evt.preventDefault()
    const info: Department = {
      ...existingInfo,
      departmentName: evt.target.children.departmentName.value,
      departmentLocation: evt.target.children.departmentLocation.value
    }
    apiFunction({ info, token })
      .then(res => {
        if (res) {
          setIsDataStale(true)
        }
      })
      .catch(error => {
        console.warn(error)
      })
  }

  return (
    <form
      className={`form${!token ? ' error' : ''}`}
      onSubmit={handleSubmit}
    >
      {(!id || (!!id && !!existingInfo.departmentName)) && (
        <>
          <label htmlFor="departmentName" className="form__label">
            Department name
          </label>
          <input
            type="text"
            name="departmentName"
            id="departmentName"
            className="form__input"
            defaultValue={existingInfo.departmentName}
          />
          <label htmlFor="departmentLocation" className="form__label">
            Department location
          </label>
          <input
            type="text"
            name="departmentLocation"
            id="departmentLocation"
            className="form__input"
            defaultValue={existingInfo.departmentLocation}
          />
          <input type="Submit" className="form__btn" />
        </>
      )}
    </form>
  )
}

export { DepartmentForm }

interface Props {
  departments: Department[] | []
  existingInfo?: Department | Record<string, string>
  token: string
  setIsDataStale: CallableFunction
  apiFunction: CallableFunction
}
