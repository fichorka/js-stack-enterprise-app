# App specification

**Requirements:**

- Databases: Login, Department and Employee
- Lists for departments and employees
- User authorization for accessing tables (collections)
- Special Queries
- Feature: export table to text

## Entities:

**Login:**

- \_id: ObjectId
- loginUsername: string 20
- loginloginPassword: string 20

**Department**:

- \_id: ObjectId
- departmentName: string 20
- departmentLocation: string 20

**Employee**

- \_id: ObjectId
- employeeName: string 50,
- salary: number
- departmendId: ObjectId
- lastModifyDate: date/time

## Routes:

**Backend (API)**:

`http://localhost:3000`

- POST `/api/login` Accepts user info for authentication in _json_ format
- GET `/api/employees:?format=?` returns a list of employees. Accepts format query prameter with values of _json_, or _txt_. Defaults to _json_.
- Post `/api/employees` Adds a new employee to database. Accepts body payload in JSON format.
- GET/POST `/api/departments` returns a list of departments / adds a new one

**Frontend**:

`http://localhost:8000`

- GET `/login` - UI form
- GET `/employees` - UI list
- GET `/employees/new` UI form
- GET `/departments` - UI list
- GET `/departments/new` UI form
