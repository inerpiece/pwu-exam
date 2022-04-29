export default {
    title: 'Testimonial',
    name: 'testimonial',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Author Name',
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
        name: 'body',
        title: 'Testimonial Body',
        type: 'text',
        validation: Rule => Rule.required()
      },
      {
        name: 'image',
        title: 'Author Image',
        type: 'image',
      },
      {
        name: 'rating',
        title: 'Rating',
        type: 'number',
        options: {
            list: [1,2,3,4,5]
        },
        validation: Rule => Rule.required()
      },
    ]
  }
  