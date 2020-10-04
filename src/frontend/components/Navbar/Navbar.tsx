import React from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css'

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <NavLink
        activeClassName="active"
        className="navbar__link"
        exact
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        activeClassName="active"
        className="navbar__link"
        to="/employees"
      >
        Employees
      </NavLink>
      <NavLink
        activeClassName="active"
        className="navbar__link"
        to="/departments"
      >
        Departments
      </NavLink>
    </nav>
  )
}

export { Navbar }
