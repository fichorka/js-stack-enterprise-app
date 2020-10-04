import React, { ReactNode } from 'react'
import { Link, useLocation, useRouteMatch } from 'react-router-dom'
import './pageLayout.css'

const PageLayout: React.FC<Props> = ({ title, children }: Props) => {
  const { path, url } = useRouteMatch()
  const { pathname } = useLocation()
  return (
    <div className="page">
      <h1 className="page__title">
        <Link className="title__link" to={url}>
          {title}
        </Link>
        {path !== pathname ? ` > ${pathname.split('/')[2]}` : ''}
      </h1>
      {children}
    </div>
  )
}

export { PageLayout }

interface Props {
  title: string
  children: ReactNode
}
