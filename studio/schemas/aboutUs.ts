import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutUs',
  title: 'Über uns',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      initialValue: 'Unsere Geschichte',
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung',
      type: 'blockContent',
    }),
    defineField({
      name: 'trainers',
      title: 'Trainer',
      type: 'array',
      of: [{type: 'reference', to: {type: 'trainer'}}],
    }),
    defineField({
      name: 'coTrainers',
      title: 'Co-Trainer',
      type: 'array',
      of: [{type: 'reference', to: {type: 'trainer'}}],
    }),
    defineField({
      name: 'certifications',
      title: 'Zertifizierungen & Verbände',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', type: 'string', title: 'Name'},
            {name: 'logo', type: 'image', title: 'Logo'},
            {name: 'link', type: 'url', title: 'Link (optional)'}
          ]
        }
      ],
    }),
  ],
})
