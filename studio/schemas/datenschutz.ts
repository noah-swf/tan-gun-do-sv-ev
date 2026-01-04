import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'datenschutz',
  title: 'Datenschutz',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      initialValue: 'Datenschutzerklärung',
    }),
    defineField({
      name: 'content',
      title: 'Inhalt',
      type: 'blockContent',
    }),
  ],
})
