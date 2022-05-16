export default {
    title: 'Car Brand',
    name: 'brand',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Brand Name',
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
      }
    ]
  }
  