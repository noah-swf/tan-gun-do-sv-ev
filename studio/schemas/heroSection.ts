import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
    }),
    defineField({
      name: 'slides',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'image', type: 'image', options: {hotspot: true}},
            {name: 'alt', type: 'string'},
            {name: 'caption', type: 'text'},
            {name: 'link', type: 'url'},
            {name: 'durationMs', type: 'number', description: 'Optional pro Slide'}
          ]
        }
      ]
    })
  ]
})
