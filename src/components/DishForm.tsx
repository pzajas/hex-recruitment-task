import { useState } from 'react'
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
    reset,
    formState: { errors },
  } = useForm<CustomFieldValues>({
    resolver: yupResolver(validationSchema),
  })

  const [preparationTime, setPreparationTime] = useState('')

  const handlePreparationTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputText = event.target.value.replace(/:/g, '')
    const formattedTime = inputText.slice(0, 6).replace(/(\d{2})(?=\d)/g, '$1:')
    setPreparationTime(formattedTime)
  }

  const onSubmit: SubmitHandler<CustomFieldValues> = async (data) => {
    try {
      await axios.post(
        'https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/',
        data
      )
      setPreparationTime('')
      reset()
    } catch (error) {
      if (error.response) {
        alert(
          `Error ${error.response.status} : Something went wrong. Please double check if the form is filled in the right way!`
        )
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
        {errors.name && (
          <StyledErrorMessage>{errors.name.message}</StyledErrorMessage>
        )}
      </StyledInputWrapper>

      <StyledInputWrapper>
        <StyledLabel>Preparation Time</StyledLabel>
        <StyledInput
          {...register('preparation_time')}
          value={preparationTime}
          onChange={handlePreparationTimeChange}
          placeholder="HH:MM:SS"
          autoComplete="off"
        />
        {errors.preparation_time && (
          <StyledErrorMessage>
            {errors.preparation_time.message}
          </StyledErrorMessage>
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
        {errors.type && (
          <StyledErrorMessage>{errors.type.message}</StyledErrorMessage>
        )}
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
            {errors[field.name] && (
              <StyledErrorMessage>
                {errors[field.name].message}
              </StyledErrorMessage>
            )}
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

const StyledErrorMessage = styled.span`
  font-size: 0.8rem;
  color: red;
  position: absolute;
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
  position: relative;

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
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  color: #909090;
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
