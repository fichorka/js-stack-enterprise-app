import React, { useState } from 'react'
import {
  Department,
  Employee,
  getDepartments,
  getEmployees
} from './api'
import { Login } from './components'
import { Navbar } from './components'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import './app.css'
import { Employees } from './pages'
import { useData } from './custom-hooks'
import { Departments } from './pages'
import './form.css'
import { useToken } from './custom-hooks'

export const App: React.FC = () => {
  // root state
  const [token, setToken] = useState('')
  const [username, setUsername] = useState('')
  const [departments, setDepartments] = useState<Department[] | []>(
    []
  )
  const [isDepartmentsStale, setIsDepartmentsStale] = useState(true)
  const [employees, setEmployees] = useState<Employee[] | []>([])
  const [isEmployeesStale, setIsEmployeesStale] = useState(true)
  const [employeeFormat, setEmployeeFormat] = useState('json')
  const [limit, setLimit] = useState(10)

  // use Departments data
  useData({
    isDataStale: isDepartmentsStale,
    setIsDataStale: setIsDepartmentsStale,
    setData: setDepartments,
    fetchData: getDepartments,
    limit,
    token,
    format: 'json'
  })

  // use Employees data
  useData({
    isDataStale: isEmployeesStale,
    setIsDataStale: setIsEmployeesStale,
    setData: setEmployees,
    fetchData: getEmployees,
    limit,
    token,
    format: employeeFormat
  })

  // manage login state
  useToken({
    token,
    setToken,
    setUsername,
    setDepartments,
    setEmployees
  })

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
              format={employeeFormat}
              setFormat={setEmployeeFormat}
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
              token={token}
              username={username}
              setToken={setToken}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
