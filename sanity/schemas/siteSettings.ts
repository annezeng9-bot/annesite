import { defineField, defineType } from 'sanity';
export const siteSettings = defineType({
  name: 'siteSettings', title: 'Site Settings', type: 'document',
  fields: [
    defineField({ name: 'ownerName', title: 'Your name', type: 'string' }),
    defineField({ name: 'heroTitle', title: 'Portfolio hero title', type: 'string', initialValue: 'Selected Work' }),
    defineField({ name: 'heroPeriod', title: 'Portfolio date range', type: 'string', initialValue: '2020 — Present' }),
    defineField({ name: 'email', title: 'Contact email', type: 'string' }),
    defineField({ name: 'instagramUrl', title: 'Instagram URL', type: 'url' }),
    defineField({ name: 'behanceUrl', title: 'Behance URL', type: 'url' }),
    defineField({ name: 'aboutImage', title: 'About page photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'aboutText', title: 'About text', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'showPortfolio', title: 'Show Portfolio page', type: 'boolean', initialValue: true }),
    defineField({ name: 'showAbout', title: 'Show About page', type: 'boolean', initialValue: true }),
    defineField({ name: 'showProjects', title: 'Show Projects page', type: 'boolean', initialValue: true }),
  ],
  preview: { select: { title: 'ownerName' }, prepare({ title }) { return { title: title ?? 'Site Settings' }; } },
});
