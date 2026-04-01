import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

// local type for TypeScript
type SanityImageSource = string | Record<string, any>;

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export async function getPhotos() {
  return client.fetch('*[_type == "photo" && featured != false] | order(order asc) { _id, title, image, location, year, category, tall, featured, order }');
}

export async function getSiteSettings() {
  return client.fetch('*[_type == "siteSettings"][0] { ownerName, heroTitle, heroPeriod, email, instagramUrl, behanceUrl, aboutImage, aboutText, showPortfolio, showAbout, showProjects }');
}

export async function getProjects() {
  return client.fetch('*[_type == "project" && visible != false] | order(order asc) { _id, title, tag, description, year, url }');
}