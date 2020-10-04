import React from 'react'
import './pageLayout.css'

const PageLayout: React.FC<Props> = ({ title, children }: Props) => {
  return (
    <div className="page">
      <h1 className="page__title">{title}</h1>
      {children}
    </div>
  )
}

export { PageLayout }

interface Props {
  title: string
  children: ReactNode
}
