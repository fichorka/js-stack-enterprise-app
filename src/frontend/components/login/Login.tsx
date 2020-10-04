import React, { useState } from 'react'
import { postLogin } from '../../api'
import { PageLayout } from '../../layouts'
import './login.css'

const Login: React.FC<Props> = ({
  title,
  username,
  setToken,
  token
}: Props) => {
  const [isError, setIsError] = useState(false)

  return (
    <PageLayout title={title}>
      {token ? (
        <div className="log-status">
          <div>
            <span className="log-message">
              Logged in as {username}
            </span>
            <button
              className="form__btn"
              onClick={() => {
                setToken('')
              }}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <form
          className={`form${isError ? ' error' : ''}`}
          onSubmit={evt => {
            evt.preventDefault()
            const username = evt.target.children.username.value
            const password = evt.target.children.password.value
            postLogin({ username, password })
              .then(res => {
                if (res) {
                  setToken(res)
                  setIsError(false)
                } else throw new Error()
              })
              .catch(() => {
                setIsError(true)
              })
          }}
        >
          <input
            className="form__input"
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            required
          />
          <input
            className="form__input"
            type="text"
            id="password"
            name="password"
            placeholder="Password"
            required
          />
          <input type="submit" className="form__btn" />
        </form>
      )}
    </PageLayout>
  )
}

export { Login }

interface Props {
  title: string
  token: string
  username: string
  setToken: CallableFunction
}
