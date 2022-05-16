export default {
    title: 'Car Categories',
    name: 'carCategories',
    type: 'document',
    fields: [
      {
        name: 'category',
        title: 'Car Category Name',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'category',
          maxLength: 96,
        },
        validation: Rule => Rule.required()
      }
    ]
  }
  