import { defineField, defineType } from 'sanity';
export const photo = defineType({
  name: 'photo', title: 'Photo', type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'year', title: 'Year', type: 'string' }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: [{ title: 'Landscape', value: 'Landscape' }, { title: 'Portrait', value: 'Portrait' }, { title: 'Urban', value: 'Urban' }, { title: 'Film', value: 'Film' }] } }),
    defineField({ name: 'tall', title: 'Tall / portrait orientation?', type: 'boolean', initialValue: false }),
    defineField({ name: 'featured', title: 'Featured (show on homepage)', type: 'boolean', initialValue: true }),
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
  ],
  preview: { select: { title: 'title', location: 'location', media: 'image' }, prepare({ title, location, media }) { return { title, subtitle: location, media }; } },
});
