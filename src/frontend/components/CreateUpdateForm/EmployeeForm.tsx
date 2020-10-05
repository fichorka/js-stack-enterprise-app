import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { Department, Employee } from '../../api'
import { sortDepartments } from '../../utils'

const EmployeeForm: React.FC<Props> = ({
  employees,
  token,
  departments,
  setIsDataStale,
  setFormat,
  apiFunction
}: Props) => {
  useEffect(() => {
    if (typeof employees === 'string') {
      setFormat('json')
      setIsDataStale(true)
    }
  }, [employees])

  const [isError, setIsError] = useState(false)
  const history = useHistory()

  const { id } = useRouteMatch().params as Record<string, string>
  const existingInfo: Employee | Record<string, undefined> =
    id && typeof employees !== 'string' && employees.length
      ? employees.filter(emp => emp._id === id)[0]
      : {}

  const handleSubmit = evt => {
    evt.preventDefault()
    const info: Employee = {
      ...existingInfo,
      employeeName: evt.target.children.employeeName.value,
      salary: Number(evt.target.children.salary.value),
      departmentId: evt.target.children.departmentId.value
    }

    apiFunction({ info, token })
      .then(res => {
        setIsError(false)
        setIsDataStale(true)
        history.push('/employees')
      })
      .catch(error => {
        setIsError(true)
        console.warn(error)
      })
  }

  return (
    <form
      className={`form${isError ? ' error' : ''}`}
      onSubmit={handleSubmit}
    >
      {((!id && !!departments.length) ||
        (!!id &&
          existingInfo.departmentId &&
          departments.length)) && (
        <>
          <label htmlFor="employeeName" className="form__label">
            Employee name
          </label>
          <input
            type="text"
            name="employeeName"
            id="employeeName"
            className="form__input"
            required
            defaultValue={existingInfo.employeeName}
          />
          <label htmlFor="salary" className="form__label">
            Salary
          </label>
          <input
            type="number"
            name="salary"
            id="salary"
            className="form__input"
            required
            defaultValue={existingInfo.salary}
          />
          <label htmlFor="departmentId" className="form__label">
            Department
          </label>
          {/* {!!departments.length && ( */}
          <select
            name="departmentId"
            id="departmentId"
            className="form__input"
            required
            defaultValue={existingInfo.departmentId}
          >
            <option value=""></option>
            {sortDepartments(departments).map(dep => (
              <option key={dep._id} value={dep._id}>
                {dep.departmentName} in {dep.departmentLocation}
              </option>
            ))}
          </select>

          <input type="Submit" className="form__btn" />
        </>
      )}
    </form>
  )
}

export { EmployeeForm }

interface Props {
  employees?: Employee[]
  token: string
  departments: Department[]
  setIsDataStale: CallableFunction
  apiFunction: CallableFunction
  setFormat: CallableFunction
}
