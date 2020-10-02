import { Template } from '.'

const employeeTemplate: Template = [
  { name: 'employeeName', as: 'Name' },
  {
    name: 'salary',
    as: 'Salary',
    type: 'number'
  },
  {
    name: 'departmentId',
    as: 'Department',
    entries: [{ as: '', value: '' }]
  }
]

export { employeeTemplate }
