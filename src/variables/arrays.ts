export const dishConfig = [
  {
    type: 'pizza',
    fields: [
      {
        name: 'no_of_slices',
        label: 'Number of Slices',
        type: 'number',
        validation: { required: true },
      },
      {
        name: 'diameter',
        label: 'Diameter',
        type: 'number',
        step: '0.01',
        validation: { required: true },
      },
    ],
  },
  {
    type: 'soup',
    fields: [
      {
        name: 'spiciness_scale',
        label: 'Spiciness Scale',
        type: 'number',
        validation: { required: true, min: 1, max: 10 },
      },
    ],
  },
  {
    type: 'sandwich',
    fields: [
      {
        name: 'slices_of_bread',
        label: 'Slices of Bread',
        type: 'number',
        validation: { required: true },
      },
    ],
  },
]
