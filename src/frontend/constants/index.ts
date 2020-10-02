export type Template = Field[]

interface Field {
  name: string
  as: string
  type?: string
  entries?: {
    value: string
    as: string
  }[]
}
