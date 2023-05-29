import { useForm, FieldValues } from 'react-hook-form'
import { dishConfig } from '../variables/arrays'

interface DishField {
  name: string
  label: string
  type: string
  step?: string
  validation: Record<string, unknown>
}

interface DishConfig {
  type: string
  fields: DishField[]
}

const DishForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>()

  const onSubmit = async (data: FieldValues) => {
    console.log(data)
  }

  const dishType = watch('type')

  const currentDishConfig = dishConfig.find(
    (config: DishConfig) => config.type === dishType
  )

  const requiredField = <span>This field is required</span>

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input {...register('name', { required: true })} />
        {errors.name && requiredField}
      </div>

      <div>
        <label>Preparation Time:</label>
        <input
          {...register('preparation_time', { required: true })}
          placeholder="HH:MM:SS"
        />
        {errors.preparation_time && requiredField}
      </div>

      <div>
        <label>Type:</label>
        <select {...register('type', { required: true })}>
          <option value="">Select Type</option>
          <option value="pizza">Pizza</option>
          <option value="soup">Soup</option>
          <option value="sandwich">Sandwich</option>
        </select>
        {errors.type && requiredField}
      </div>

      {currentDishConfig &&
        currentDishConfig.fields.map((field: DishField) => (
          <div key={field.name}>
            <label>{field.label}:</label>
            <input
              {...register(field.name as string, field.validation)}
              type={field.type}
              step={field.step}
            />
            {errors[field.name] && requiredField}
          </div>
        ))}

      <button type="submit">Submit</button>
    </form>
  )
}

export default DishForm
