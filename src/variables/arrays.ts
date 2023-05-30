export const dishConfig = [
  {
    type: 'pizza',
    fields: [
      {
        name: 'no_of_slices',
        label: 'Number of Slices',
        placeholder: '2-10',
        type: 'number',
        validation: {
          required: true,
          min: 2,
        },
      },
      {
        name: 'diameter',
        label: 'Diameter',
        placeholder: '20, 25, 30, 35 or 40',
        type: 'number',
        step: '5',
        validation: {
          required: true,
          min: 20,
          max: 40,
        },
      },
    ],
  },
  {
    type: 'soup',
    fields: [
      {
        name: 'spiciness_scale',
        label: 'Spiciness Scale',
        placeholder: '1-10',
        type: 'number',
        validation: {
          required: true,
          min: 1,
          max: 10,
        },
      },
    ],
  },
  {
    type: 'sandwich',
    fields: [
      {
        name: 'slices_of_bread',
        label: 'Slices of Bread',
        placeholder: 'Minimum 1',
        type: 'number',
        validation: {
          required: true,
          min: 1,
        },
      },
    ],
  },
]
