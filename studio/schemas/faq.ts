import {defineField, defineType} from 'sanity'
export default defineType({
    name: 'faq',
    title: 'FAQ',
    type: 'document',
    fields:[
        defineField({
            name: 'question',
            title: 'Frage',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'answer',
            title: 'Antwort',
            type: 'text',
            validation: (Rule) => Rule.required(),
        }),
    ]
})