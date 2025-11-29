import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'trainer',
  title: 'Trainer',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Bild',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'roles',
      title: 'Rollen',
      type: 'string',
    }),
    defineField({
      name: 'taekwondoSeit',
      title: 'Taekwondo seit',
      type: 'string',
    }),
    defineField({
      name: 'graduierung',
      title: 'Graduierung',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
