export default {
  title: 'Car',
  name: 'car',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Car Model Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'fuelType',
      title: 'Car Fuel Type',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'fuelConsumption',
      title: 'Car Fuel Consumption/km',
      type: 'number',
    },
    {
      name: 'transmition',
      title: 'Transmition',
      type: 'string',
      of: [{type: 'string'}],
      options: {
        layout: 'dropdown',
        list: ['Manual', 'Automatic']
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'brand',
      title: 'Car Brand',
      type: 'array',
      of: [{type: 'reference', to: {type: 'brand'}}],
      validation: Rule => Rule.max(1),
    },
    {
      name: 'price',
      title: 'Car Price/Day',
      type: 'number',
      validation: Rule => Rule.required(),
    },
    {
      name: 'seats',
      title: 'Number of Passenger Seats',
      type: 'number',
      validation: Rule => Rule.required(),
    },
    {
      name: 'image',
      title: 'Car Image',
      type: 'image',
      validation: Rule => Rule.required(),
    },
    {
      name: 'category',
      title: 'Car Category',
      type: 'array',
      of: [{type: 'reference', to: {type: 'carCategories'}}],
      validation: Rule => Rule.max(1),
    },
  ]
}
