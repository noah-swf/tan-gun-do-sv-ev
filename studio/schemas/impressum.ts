import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'impressum',
  title: 'Impressum',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      initialValue: 'Impressum',
    }),
    defineField({
      name: 'content',
      title: 'Inhalt',
      type: 'blockContent',
    }),
  ],
})
