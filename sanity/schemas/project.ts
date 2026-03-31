import { defineField, defineType } from 'sanity';
export const project = defineType({
  name: 'project', title: 'Project', type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'tag', title: 'Tag', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'year', title: 'Year', type: 'string' }),
    defineField({ name: 'url', title: 'Project URL', type: 'url' }),
    defineField({ name: 'visible', title: 'Show on site', type: 'boolean', initialValue: true }),
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
  ],
  preview: { select: { title: 'title', subtitle: 'tag' } },
});
