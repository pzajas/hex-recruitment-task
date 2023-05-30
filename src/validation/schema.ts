import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  preparation_time: yup.string().required('Preparation Time is required'),
  type: yup.string().required('Type is required'),
  no_of_slices: yup
    .number()
    .typeError('No. of Slices must be a number')
    .positive('No. of Slices must be a positive number')
    .integer('No. of Slices must be an integer')
    .required('No. of Slices is required'),
  diameter: yup
    .number()
    .typeError('No. of Slices must be a number')
    .positive('No. of Slices must be a positive number')
    .integer('No. of Slices must be an integer')
    .required('No. of Slices is required'),
})
