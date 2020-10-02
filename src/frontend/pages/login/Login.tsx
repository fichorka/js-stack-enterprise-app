import React, { useState, useEffect, SetStateAction } from 'react'
import { postLogin } from '../../api'
import { PageLayout } from '../../layouts'

const Login: React.FC<Props> = ({ title, setToken }: Props) => {
  const [isError, setIsError] = useState(false)

  return (
    <PageLayout title={title}>
      <form
        onSubmit={evt => {
          console.log('submitting...')
          evt.preventDefault()
          const username = evt.target.children.username.value
          const password = evt.target.children.password.value
          postLogin({ username, password })
            .then(res => {
              if (res && res.meta.isSuccess) {
                setToken(res.token)
                setIsError(false)
              } else throw new Error()
            })
            .catch(error => {
              setIsError(true)
            })
        }}
      >
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
        />
        <input
          type="text"
          id="password"
          name="password"
          placeholder="Password"
        />
        <input type="submit" />
      </form>
      {isError && <div>Error</div>}
    </PageLayout>
  )
}

export { Login }

interface Props {
  title: string
  setToken: CallableFunction
}
