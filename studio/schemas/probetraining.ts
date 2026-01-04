import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'probetraining',
  title: 'Probetraining',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Bild',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heroText',
      title: 'Hero Text',
      type: 'blockContent',
    }),
    defineField({
      name: 'contactPersons',
      title: 'Ansprechpartner',
      type: 'array',
      of: [{type: 'reference', to: {type: 'trainer'}}],
    }),
  ],
})
