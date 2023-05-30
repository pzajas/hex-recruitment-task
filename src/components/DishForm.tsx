import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { dishConfig } from '../variables/arrays'
import { DishConfig, DishField, CustomFieldValues } from '../typescript/types'
import { validationSchema } from '../validation/schema'
import styled from 'styled-components'

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
    <StyledFormWrapper onSubmit={handleSubmit(onSubmit)}>
      <StyledInputWrapper>
        <StyledLabel>Name</StyledLabel>
        <StyledInput
          {...register('name')}
          placeholder="Name of the dish"
          autoComplete="off"
        />
        {errors.name && <span>{errors.name.message}</span>}
      </StyledInputWrapper>

      <StyledInputWrapper>
        <StyledLabel>Preparation Time</StyledLabel>
        <StyledInput
          {...register('preparation_time')}
          placeholder="HH:MM:SS"
          autoComplete="off"
        />
        {errors.preparation_time && (
          <span>{errors.preparation_time.message}</span>
        )}
      </StyledInputWrapper>

      <StyledInputWrapper>
        <StyledLabel>Type</StyledLabel>
        <StyledSelect {...register('type')} autoComplete="off">
          <option value="">Select Type</option>
          <option value="pizza">Pizza</option>
          <option value="soup">Soup</option>
          <option value="sandwich">Sandwich</option>
        </StyledSelect>
        {errors.type && <span>{errors.type.message}</span>}
      </StyledInputWrapper>

      {currentDishConfig &&
        currentDishConfig.fields.map((field: DishField) => (
          <StyledSelectWrapper key={field.name}>
            <StyledLabel>{field.label}:</StyledLabel>
            <StyledInput
              {...register(field.name, field.validation)}
              type={field.type}
              step={field.step}
              placeholder={field.placeholder}
            />
            {errors[field.name] && <span>{errors[field.name].message}</span>}
          </StyledSelectWrapper>
        ))}

      <StyledButton type="submit">Submit</StyledButton>
    </StyledFormWrapper>
  )
}

export default DishForm

const StyledFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledSelectWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledInput = styled.input`
  padding: 0.2rem 0.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;

  background-color: #252525;

  border: none;
  outline: none;
`

const StyledSelect = styled.select`
  font-size: 1rem;
  padding: 0.2rem 0.5rem;
  margin-bottom: 1rem;
  width: 33%;

  background-color: #252525;

  display: flex;
  align-items: center;

  border: none;
  outline: none;
`

const StyledLabel = styled.label`
  font-size: 0.6rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
`

const StyledButton = styled.button`
  margin-top: 2rem;
  border-radius: 0.1rem;
  font-size: 0.9rem;
  font-weight: 600;
  width: 25%;
  padding: 0.2rem 0.5rem;
  border: none;
  background-color: lightgreen;
  color: #181818;
`
