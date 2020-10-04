# js-stack-enterprise-app

_An example app for managing business departments and employees. Features a database and a frontend UI interface_

## Tools

| Backend    | Frontend                     |
| ---------- | ---------------------------- |
| MongoDb    | Webpack                      |
| Node       | React                        |
| Express    | React-router                 |
| Typescript | Typescript                   |
| -          | `useState()` state managment |
| -          | Babel                        |

## Usage

`npm install`

**To start a backend server:**

1. Rename `.env.example.txt` file into `.env` and enter your mongodb credentials here, or contact me at filip.biterski@gmail.com and I'll send you mine.
2. `npm run start-server`
3. ... API is available at http://localhost:3000/

**To start a frontend app:**

1. `npm start`
2. App is running at http://localhost:8080/

**Login credentials:**

| Username | Password   |
| -------- | ---------- |
| Bill     | ItsNotSoft |
| Jean     | trollsRule |

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
