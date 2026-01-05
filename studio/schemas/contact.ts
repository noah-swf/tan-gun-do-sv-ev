import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Kontakt',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      initialValue: 'Kontakt',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
