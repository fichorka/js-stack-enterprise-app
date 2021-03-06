export interface Department {
  _id?: string
  departmentName: string
  departmentLocation: string
}

export interface Employee {
  _id?: string
  employeeName: string
  salary: number
  departmentId: string
}

export interface LoginInfo {
  _id?: string
  username: string
  password: string
}
