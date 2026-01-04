import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'trainingszeiten',
    title: 'Trainingszeiten',
    type: 'document',
    fields: [
        defineField({
            name: 'day',
            title: 'Tag',
            type: 'string',
            options:{
                list:[
                    {title: 'Montag', value: 'Montag'},
                    {title: 'Dienstag', value: 'Dienstag'},
                    {title: 'Mittwoch', value: 'Mittwoch'},
                    {title: 'Donnerstag', value: 'Donnerstag'},
                    {title: 'Freitag', value: 'Freitag'},
                    {title: 'Samstag', value: 'Samstag'},
                    {title: 'Sonntag', value: 'Sonntag'},
                ],
                layout:'dropdown'
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'units',
            title: 'Trainingseinheiten',
            type: 'array',
            of:[
                {
                    type:'object',
                    title:'Trainingseinheit',
                    fields:[
                        { name: 'ageGroup', title: 'Altersgruppe', type: 'string', description: 'Kids, Jugendliche, Erwachsene' },
                        { name: 'timeslot', title: 'Uhrzeit', type: 'string', description: 'z.B. 18:00 - 19:00 Uhr' },
                        { name: 'location', title: 'Ort', type: 'string', description: 'Große Halle, Kleine Halle' },
                        { name: 'comment', title: 'Anmerkung', type: 'string', description: 'z.B. Schutzausrüstung mitbringen' }
                    ]
                }
            ]
        })
    ]
})
