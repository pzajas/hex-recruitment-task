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
    .test(
      'conditional-required',
      'No. of Slices is required',
      function (value) {
        const type = this.parent.type
        return type !== 'pizza' || (type === 'pizza' && value != null)
      }
    ),
  diameter: yup
    .number()
    .typeError('Diameter must be a number')
    .positive('Diameter must be a positive number')
    .integer('Diameter must be an integer')
    .test('conditional-required', 'Diameter is required', function (value) {
      const type = this.parent.type
      return type !== 'pizza' || (type === 'pizza' && value != null)
    }),
  spiciness_scale: yup
    .number()
    .typeError('Spiciness Scale must be a number')
    .positive('Spiciness Scale must be a positive number')
    .integer('Spiciness Scale must be an integer')
    .test(
      'conditional-required',
      'Spiciness Scale is required',
      function (value) {
        const type = this.parent.type
        return type !== 'soup' || (type === 'soup' && value != null)
      }
    ),
})
