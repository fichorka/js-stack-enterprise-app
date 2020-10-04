import React, { useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import {
  deleteDepartment,
  Department,
  patchDepartment,
  postDepartment
} from '../api'
import { DepartmentForm } from '../components/CreateUpdateForm/'
import { List } from '../components/List'
import { PageLayout } from '../layouts'

export const Departments: React.FC<Props> = ({
  departments,
  limit,
  setIsDataStale,
  setLimit,
  token
}: Props) => {
  const [selection, setSelection] = useState({})

  const { path } = useRouteMatch()
  return (
    <PageLayout title="Employees">
      <Switch>
        <Route path={`${path}/new`}>
          <DepartmentForm
            departments={departments}
            setIsDataStale={setIsDataStale}
            token={token}
            apiFunction={postDepartment}
          />
        </Route>
        <Route path={`${path}/:id`}>
          <DepartmentForm
            departments={departments}
            existingInfo={selection}
            setIsDataStale={setIsDataStale}
            token={token}
            apiFunction={patchDepartment}
          />
        </Route>
        <Route path={path}>
          <List
            data={departments.map(dep => {
              return {
                _id: dep._id,
                departmentName: dep.departmentName,
                departmentLocation: dep.departmentLocation
              }
            })}
            limit={limit}
            setLimit={setLimit}
            setIsDataStale={setIsDataStale}
            setSelection={setSelection}
            deleteFunc={deleteDepartment}
            token={token}
          />
        </Route>
      </Switch>
    </PageLayout>
  )
}

interface Props {
  departments: Department[]
  limit: number
  setIsDataStale: CallableFunction
  setLimit: CallableFunction
  token: string
}
