import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'event',
  title: 'Termine',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Titel des Events',
    }),
    defineField({
      name: 'date',
      type: 'datetime',
      description: 'Datum des Events',
    }),
    defineField({
      name: 'ort',
      type: 'string',
      description: 'Ort des Events',
    }),
    defineField({
      name: 'comment',
      type: 'text',
      description: 'Anmerkung zum Event (optional)',
    }),
  ]
})
