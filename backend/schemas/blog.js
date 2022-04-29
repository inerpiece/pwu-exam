export default {
    title: 'Blog',
    name: 'blog',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Blog Name',
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
        title: 'Blog Body',
        type: 'text',
        validation: Rule => Rule.required()
      },
      {
        name: 'image',
        title: 'Blog Image',
        type: 'image',
      },
      {
        name: 'author',
        title: 'Blog Author',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'date',
        title: 'Blog Publish Date',
        type: 'date',
        options: {
            dateFormat: 'DD-MM-YYYY'
        },
        validation: Rule => Rule.required()
      },
    ]
  }
  