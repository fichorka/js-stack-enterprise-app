import React, { FormEvent } from 'react'
import { Template } from '../../constants'

const CreateUpdateForm: React.FC<Props> = ({
  fields,
  postFunction,
  token,
  setData
}: Props) => {
  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault()
    const submittedInfo = {}

    fields.forEach(f => {
      const inputValue = evt.target.querySelector(`#${f.name}`).value
      submittedInfo[f.name] =
        f.type === 'number' ? Number(inputValue) : inputValue
    })

    await postFunction({ info: submittedInfo, token }).then(() =>
      setData([])
    )
  }

  return (
    <div className="form-box">
      <form onSubmit={handleSubmit} className="form">
        {fields.map(f => {
          if (f.entries) {
            return (
              <div className="form_field" key={f.name}>
                <label htmlFor="name">{f.as}</label>
                <select name={f.name} id={f.name}>
                  {f.entries.map(entry => (
                    <option key={entry.value} value={entry.value}>
                      {entry.as}
                    </option>
                  ))}
                </select>
              </div>
            )
          } else {
            return (
              <div className="form_field" key={f.name}>
                <label htmlFor={f.name}>{f.as}</label>
                <input
                  type={f.type || 'text'}
                  name={f.name}
                  id={f.name}
                ></input>
              </div>
            )
          }
        })}
        <input type="Submit" />
      </form>
    </div>
  )
}

export { CreateUpdateForm }

interface Props {
  fields: Template
  token: string
  postFunction: CallableFunction
  setData: CallableFunction
}
