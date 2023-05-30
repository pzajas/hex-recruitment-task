export const dishConfig = [
  {
    type: 'pizza',
    fields: [
      {
        name: 'no_of_slices',
        label: 'Number of Slices',
        placeholder: '8 slices',
        type: 'number',
        validation: {
          required: true,
          min: 2,
        },
      },
      {
        name: 'diameter',
        label: 'Diameter',
        placeholder: '20 cm',
        type: 'number',
        step: '5',
        validation: {
          required: true,
          min: 20,
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
        placeholder: 'min 1',
        type: 'number',
        validation: {
          required: true,
          min: 1,
        },
      },
    ],
  },
]
