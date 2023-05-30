import { FieldValues } from 'react-hook-form'

type FormData = {
  name: string
  preparation_time: string
  type: string
  [key: string]: string | number
}

export type DishField = {
  name: string
  label: string
  type: string
  placeholder: string
  step?: string
  validation: Record<string, unknown>
}

export type DishConfig = {
  type: string
  fields: DishField[]
}

export type CustomFieldValues = FieldValues & FormData
