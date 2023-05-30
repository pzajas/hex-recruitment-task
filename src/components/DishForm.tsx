import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { dishConfig } from '../variables/arrays'
import { DishConfig, DishField, CustomFieldValues } from '../typescript/types'
import { validationSchema } from '../validation/schema'

import axios from 'axios'

const DishForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CustomFieldValues>({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit: SubmitHandler<CustomFieldValues> = async (data) => {
    try {
      const response = await axios.post(
        'https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/',
        data
      )
      console.log(response)
    } catch (error) {
      if (error.response) {
        const { data: responseData } = error.response
        // Validate errors from API response
        Object.keys(responseData).forEach((fieldName: string) => {
          const fieldError = responseData[fieldName]
          errors[fieldName] = {
            type: 'api',
            message: fieldError,
          }
        })
      } else {
        console.log(error.message)
      }
    }
  }

  const dishType = watch('type')

  const currentDishConfig = dishConfig.find(
    (config: DishConfig) => config.type === dishType
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input {...register('name')} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      <div>
        <label>Preparation Time:</label>
        <input {...register('preparation_time')} placeholder="HH:MM:SS" />
        {errors.preparation_time && (
          <span>{errors.preparation_time.message}</span>
        )}
      </div>

      <div>
        <label>Type:</label>
        <select {...register('type')}>
          <option value="">Select Type</option>
          <option value="pizza">Pizza</option>
          <option value="soup">Soup</option>
          <option value="sandwich">Sandwich</option>
        </select>
        {errors.type && <span>{errors.type.message}</span>}
      </div>

      {currentDishConfig &&
        currentDishConfig.fields.map((field: DishField) => (
          <div key={field.name}>
            <label>{field.label}:</label>
            <input
              {...register(field.name, field.validation)}
              type={field.type}
              step={field.step}
              placeholder={field.placeholder}
            />
            {errors[field.name] && <span>{errors[field.name].message}</span>}
          </div>
        ))}

      <button type="submit">Submit</button>
    </form>
  )
}

export default DishForm
