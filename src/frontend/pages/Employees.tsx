import React, { useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import {
  Department,
  Employee,
  postEmployee,
  patchEmployee,
  deleteEmployee
} from '../api'
import { EmployeeForm } from '../components/CreateUpdateForm/EmployeeForm'
import { List } from '../components/List'
import { PageLayout } from '../layouts'

export const Employees: React.FC<Props> = ({
  employees,
  limit,
  setIsDataStale,
  setLimit,
  token,
  departments,
  format,
  setFormat
}: Props) => {
  const [selection, setSelection] = useState({})

  const match = useRouteMatch()

  const resetFormat = () => {
    setFormat('json')
    setIsDataStale(true)
  }

  return (
    <PageLayout title="Employees">
      <Switch>
        <Route path={`${match.path}/new`}>
          <EmployeeForm
            setIsDataStale={setIsDataStale}
            token={token}
            apiFunction={postEmployee}
            setFormat={setFormat}
            departments={departments}
          />
        </Route>
        <Route path={`${match.path}/:id`}>
          <EmployeeForm
            employees={employees}
            setIsDataStale={setIsDataStale}
            token={token}
            apiFunction={patchEmployee}
            departments={departments}
            setFormat={setFormat}
          />
        </Route>
        <Route path={match.path}>
          <List
            data={
              Array.isArray(employees)
                ? employees.map(emp => {
                    return {
                      _id: emp._id,
                      employeeName: emp.employeeName,
                      salary: emp.salary,
                      departmentId: emp.departmentId
                    }
                  })
                : employees
            }
            setIsDataStale={setIsDataStale}
            limit={limit}
            setLimit={setLimit}
            setSelection={setSelection}
            deleteFunc={deleteEmployee}
            token={token}
            format={format}
            setFormat={setFormat}
          />
        </Route>
      </Switch>
    </PageLayout>
  )
}

interface Props {
  employees: Employee[]
  limit: number
  setIsDataStale: CallableFunction
  setLimit: CallableFunction
  token: string
  departments: Department[]
  format?: string
  setFormat?: CallableFunction
}
