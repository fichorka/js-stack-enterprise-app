import React, { useEffect, useState } from 'react'
import {
  Department,
  Employee,
  getDepartments,
  getEmployees,
  postEmployee
} from './api'
import { List } from './components/List'
import { Login } from './components/login/Login'
import jwt from 'jsonwebtoken'
import { CreateUpdateForm } from './components/CreateUpdateForm/CreateUpdateForm'
import { employeeTemplate } from './constants/employeeTemplate'
import { Navbar } from './components/Navbar/Navbar'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from 'react-router-dom'
import './app.css'
import { Employees } from './pages/employees'
import { useData } from './custom-hooks/useData'
import { Departments } from './pages/Departments'
import './form.css'

export const App: React.FC = () => {
  console.log('app')
  // root state
  const [token, setToken] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkJpbGwiLCJpYXQiOjE2MDE4MzUwNzgsImV4cCI6MTYwMTgzODY3OH0.oAFVCCue6IhQ3noaae3be7CpdLIapGTosCBmJ52yNJ8'
  )
  const [username, setUsername] = useState('')
  const [departments, setDepartments] = useState<Department[] | []>(
    []
  )
  const [isDepartmentsStale, setIsDepartmentsStale] = useState(true)
  const [employees, setEmployees] = useState<Employee[] | []>([])
  const [isEmployeesStale, setIsEmployeesStale] = useState(true)
  const [limit, setLimit] = useState(10)

  useData({
    isDataStale: isDepartmentsStale,
    setIsDataStale: setIsDepartmentsStale,
    data: departments,
    setData: setDepartments,
    fetchData: getDepartments,
    limit,
    token
  })

  useData({
    isDataStale: isEmployeesStale,
    setIsDataStale: setIsEmployeesStale,
    data: employees,
    setData: setEmployees,
    fetchData: getEmployees,
    limit,
    token
  })

  // reafactor as "useUsername"
  useEffect(() => {
    if (token && !username) {
      const decoded = jwt.decode(token) as Record<string, string>
      if (decoded && decoded.username) setUsername(decoded.username)
    }
    if (!token) {
      setUsername('')
      setEmployees([])
      setDepartments([])
    }
  }, [token])

  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/employees">
            <Employees
              employees={employees}
              departments={departments}
              limit={limit}
              setIsDataStale={setIsEmployeesStale}
              setLimit={setLimit}
              token={token}
            />
          </Route>
          <Route path="/departments">
            <Departments
              departments={departments}
              limit={limit}
              setIsDataStale={setIsDepartmentsStale}
              setLimit={setLimit}
              token={token}
            />
          </Route>
          <Route path="/">
            <Login
              title="Login"
              username={username}
              setToken={setToken}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
