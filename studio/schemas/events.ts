import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Titel des Events',
    }),

  ]
})
