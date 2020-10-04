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

- POST `/login` requires `{username, pasword}` in request body and in _json_ format.

---

- GET `/employees` returns a list of employees. Accepts the following query params: `:?format=json|text` or `?queryNo=1|2|3|4`.
- POST `/employees` Creates a new employee. `{employeeName, salary, departmentId}` in _json_ format.
- PATCH `/employees/employeeId` Updates a new employee. requires _json_ formatted body with modified properties.
- DELETE `/employees/:employeeId` Deletes an employee.

---

- GET `/departments` returns a list of departments.
- POST `/departments` requires `{departmentName, departmentLocation}`.
- PATCH `/departments/departmentId` Updates a new employee. requires _json_ body with values for existing department.
- DELETE `/departments/:departmentId` Deletes a Department.

**Frontend**:

`http://localhost:8000`

- `/` - Login UI form
- `/employees` - UI list
- `/employees/new` UI form
- `/employees/employeeId` UI form
- `/departments` - UI list
- `/departments/new` UI form
- `/departments/departmentId` UI form
