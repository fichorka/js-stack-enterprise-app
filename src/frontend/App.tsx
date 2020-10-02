import React, { useEffect, useState } from 'react'
import {
  Department,
  Employee,
  getDepartments,
  getEmployees,
  postEmployee
} from './api'
import { List } from './pages/List'
import { Login } from './pages/login/Login'
import jwt from 'jsonwebtoken'
import { CreateUpdateForm } from './pages/CreateUpdateForm/CreateUpdateForm'
import { employeeTemplate } from './constants/employeeTemplate'

export const App: React.FC = () => {
  // root state
  const [token, setToken] = useState('')
  const [username, setUsername] = useState('')
  const [departments, setDepartments] = useState<Department[] | []>(
    []
  )
  const [employees, setEmployees] = useState<Employee[] | []>([])

  useEffect(() => {
    if (token && !username) {
      const decoded = jwt.decode(token) as Record<string, string>
      if (decoded && decoded.username) setUsername(decoded.username)
    }
  }, [token])

  return (
    <div>
      <div>{username}</div>
      <h1>Hello</h1>
      <Login title="Login" setToken={setToken} />
      <List
        title="Employees"
        fetchList={getEmployees}
        token={token}
        data={employees}
        setData={setEmployees}
      />
      <List
        title="Departments"
        fetchList={getDepartments}
        token={token}
        data={departments}
        setData={setDepartments}
      />
      <CreateUpdateForm
        postFunction={postEmployee}
        fields={employeeTemplate.map(field => {
          if (field.name === 'departmentId') {
            return {
              ...field,
              entries: [
                ...field.entries,
                ...departments.map(dep => {
                  return {
                    as: `${dep.departmentLocation} ${dep.departmentName}`,
                    value: dep._id
                  }
                })
              ]
            }
          } else {
            return field
          }
        })}
        token={token}
        setData={setEmployees}
      />
    </div>
  )
}
