@echo off
echo Setting up your portfolio project...

REM ── Install packages ────────────────────────────────────────────────────────
echo Installing Sanity packages...
call npm install next-sanity @sanity/image-url @portabletext/react sanity-plugin-media

REM ── Create folder structure ──────────────────────────────────────────────────
mkdir components 2>nul
mkdir sanity\lib 2>nul
mkdir sanity\schemas 2>nul
mkdir "app\about" 2>nul
mkdir "app\projects" 2>nul
mkdir "app\studio\[[...tool]]" 2>nul

REM ── next.config.js ───────────────────────────────────────────────────────────
(
echo /** @type {import^('next'^).NextConfig} */
echo const nextConfig = {
echo   images: {
echo     remotePatterns: [
echo       {
echo         protocol: "https",
echo         hostname: "cdn.sanity.io",
echo       },
echo     ],
echo   },
echo };
echo module.exports = nextConfig;
) > next.config.js

REM ── .env.local.example ───────────────────────────────────────────────────────
(
echo NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
echo NEXT_PUBLIC_SANITY_DATASET=production
) > .env.local.example

REM ── app\globals.css ──────────────────────────────────────────────────────────
(
echo *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
echo :root {
echo   --black: #111111; --white: #ffffff;
echo   --grey-100: #f5f5f5; --grey-200: #ebebeb; --grey-300: #d8d8d8;
echo   --grey-400: #bbbbbb; --grey-500: #888888; --grey-600: #555555;
echo }
echo html { font-size: 16px; -webkit-font-smoothing: antialiased; }
echo body { font-family: var^(--font-body^), sans-serif; background: var^(--white^); color: var^(--black^); min-height: 100vh; }
echo a { color: inherit; text-decoration: none; }
echo img { display: block; max-width: 100%%; }
echo main { animation: fadeUp 0.4s ease both; }
echo @keyframes fadeUp { from { opacity: 0; transform: translateY^(10px^); } to { opacity: 1; transform: translateY^(0^); } }
) > app\globals.css

echo Folders and config files created.
echo.
echo Now writing TypeScript and CSS files...

REM ── Use PowerShell for the multi-line TS/TSX/CSS files ───────────────────────
powershell -Command "& {

$layout = @'
import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import Nav from '@/components/Nav';
import './globals.css';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' });

export const metadata: Metadata = {
  title: 'Alex Morgan — Photography',
  description: 'Photography portfolio and projects by Alex Morgan.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={`${playfair.variable} ${dmSans.variable}`}>
      <body><Nav /><main>{children}</main></body>
    </html>
  );
}
'@
Set-Content -Path 'app\layout.tsx' -Value $layout -Encoding UTF8

$pageModule = @'
.page { min-height: calc(100vh - 61px); }
.hero { padding: 52px 48px 28px; }
.label { font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--grey-400); margin-bottom: 10px; }
.title { font-family: var(--font-display), Georgia, serif; font-size: 38px; font-weight: 400; color: var(--black); letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 6px; }
.sub { font-size: 13px; color: var(--grey-400); }
.tabBar { display: flex; padding: 0 48px; border-bottom: 0.5px solid var(--grey-200); }
.tab { font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--grey-400); padding: 12px 0; margin-right: 28px; background: none; border: none; border-bottom: 1px solid transparent; cursor: pointer; transition: color 0.15s ease; }
.tab:hover { color: var(--grey-600); }
.tabActive { color: var(--black); border-bottom-color: var(--black); }
.grid { padding: 20px 48px 64px; columns: 3; column-gap: 6px; }
.card { break-inside: avoid; position: relative; margin-bottom: 6px; overflow: hidden; border-radius: 2px; cursor: pointer; }
.card::before { content: ''; display: block; padding-bottom: 75%; }
.tall::before { padding-bottom: 133%; }
.img { object-fit: cover; transition: transform 0.4s ease; }
.card:hover .img { transform: scale(1.02); }
.overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.18); opacity: 0; transition: opacity 0.2s ease; display: flex; align-items: flex-end; padding: 14px; }
.card:hover .overlay { opacity: 1; }
.overlayText { font-size: 10px; color: #fff; letter-spacing: 0.08em; text-transform: uppercase; }
@media (max-width: 900px) { .grid { columns: 2; padding: 16px 24px 48px; } .hero, .tabBar { padding-left: 24px; padding-right: 24px; } }
@media (max-width: 560px) { .grid { columns: 1; } }
'@
Set-Content -Path 'app\page.module.css' -Value $pageModule -Encoding UTF8

$page = @'
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getPhotos, getSiteSettings, urlFor } from '@/sanity/lib/client';
import styles from './page.module.css';

const ALL = 'All';

export default function PortfolioPage() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [categories, setCategories] = useState([ALL]);

  useEffect(() => {
    Promise.all([getPhotos(), getSiteSettings()]).then(([p, s]) => {
      setPhotos(p);
      setSettings(s);
      const cats = Array.from(new Set(p.map((photo: any) => photo.category).filter(Boolean))) as string[];
      setCategories([ALL, ...cats]);
    });
  }, []);

  const filtered = activeCategory === ALL ? photos : photos.filter((p) => p.category === activeCategory);

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.label}>Photography</p>
        <h1 className={styles.title}>{settings?.heroTitle ?? 'Selected Work'}</h1>
        <p className={styles.sub}>{settings?.heroPeriod ?? '2020 — Present'}</p>
      </header>
      <div className={styles.tabBar}>
        {categories.map((cat) => (
          <button key={cat} className={`${styles.tab} ${activeCategory === cat ? styles.tabActive : ''}`} onClick={() => setActiveCategory(cat)}>{cat}</button>
        ))}
      </div>
      <div className={styles.grid}>
        {filtered.map((photo) => (
          <div key={photo._id} className={`${styles.card} ${photo.tall ? styles.tall : ''}`}>
            {photo.image && (<Image src={urlFor(photo.image).width(800).url()} alt={photo.title ?? ''} fill sizes='(max-width: 768px) 100vw, 33vw' className={styles.img} />)}
            <div className={styles.overlay}><span className={styles.overlayText}>{[photo.location, photo.year].filter(Boolean).join(', ')}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}
'@
Set-Content -Path 'app\page.tsx' -Value $page -Encoding UTF8

$aboutCss = @'
.page { padding: 64px 48px; min-height: calc(100vh - 61px); }
.layout { display: grid; grid-template-columns: 240px 1fr; gap: 56px; align-items: start; max-width: 860px; }
.imageWrap { position: relative; width: 100%; aspect-ratio: 3 / 4; border-radius: 2px; overflow: hidden; background: var(--grey-100); }
.img { object-fit: cover; }
.textCol { padding-top: 8px; }
.name { font-family: var(--font-display), Georgia, serif; font-size: 30px; font-weight: 400; color: var(--black); letter-spacing: -0.01em; margin-bottom: 20px; }
.body { font-size: 14px; color: var(--grey-500); line-height: 1.85; margin-bottom: 14px; }
.divider { border: none; border-top: 0.5px solid var(--grey-200); margin: 28px 0; }
.contact { display: flex; gap: 20px; flex-wrap: wrap; }
.contactLink { font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--grey-400); transition: color 0.15s ease; }
.contactLink:hover { color: var(--black); }
@media (max-width: 768px) { .page { padding: 40px 24px; } .layout { grid-template-columns: 1fr; gap: 32px; } .imageWrap { max-width: 200px; } }
'@
Set-Content -Path 'app\about\about.module.css' -Value $aboutCss -Encoding UTF8

$about = @'
import { getSiteSettings, urlFor } from '@/sanity/lib/client';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import styles from './about.module.css';

export const metadata = { title: 'About — Portfolio' };

export default async function AboutPage() {
  const s = await getSiteSettings();
  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <div className={styles.imageCol}>
          <div className={styles.imageWrap}>
            {s?.aboutImage && (<Image src={urlFor(s.aboutImage).width(560).url()} alt={s.ownerName ?? ''} fill sizes='280px' className={styles.img} />)}
          </div>
        </div>
        <div className={styles.textCol}>
          <h1 className={styles.name}>Hi, I&apos;m {s?.ownerName ?? 'Alex'}.</h1>
          <div className={styles.body}>
            {s?.aboutText ? <PortableText value={s.aboutText} /> : <p>Update your bio in the Studio.</p>}
          </div>
          <div className={styles.divider} />
          <div className={styles.contact}>
            {s?.email && <a href={`mailto:${s.email}`} className={styles.contactLink}>{s.email}</a>}
            {s?.instagramUrl && <a href={s.instagramUrl} target='_blank' rel='noopener noreferrer' className={styles.contactLink}>Instagram</a>}
            {s?.behanceUrl && <a href={s.behanceUrl} target='_blank' rel='noopener noreferrer' className={styles.contactLink}>Behance</a>}
          </div>
        </div>
      </div>
    </div>
  );
}
'@
Set-Content -Path 'app\about\page.tsx' -Value $about -Encoding UTF8

$projCss = @'
.page { min-height: calc(100vh - 61px); }
.hero { padding: 52px 48px 28px; }
.label { font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--grey-400); margin-bottom: 10px; }
.title { font-family: var(--font-display), Georgia, serif; font-size: 38px; font-weight: 400; color: var(--black); letter-spacing: -0.02em; }
.grid { padding: 8px 48px 64px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
.card { display: flex; flex-direction: column; border: 0.5px solid var(--grey-200); border-radius: 4px; padding: 24px; cursor: pointer; transition: border-color 0.15s ease; text-decoration: none; }
.card:hover { border-color: var(--grey-400); }
.cardTop { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.tag { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--grey-400); }
.year { font-size: 11px; color: var(--grey-300); }
.cardTitle { font-size: 16px; font-weight: 500; color: var(--black); margin-bottom: 10px; }
.cardDesc { font-size: 13px; color: var(--grey-500); line-height: 1.7; flex: 1; }
.arrow { font-size: 14px; color: var(--grey-300); margin-top: 20px; transition: color 0.15s ease; }
.card:hover .arrow { color: var(--black); }
@media (max-width: 768px) { .grid { grid-template-columns: 1fr; padding: 8px 24px 48px; } .hero { padding: 40px 24px 24px; } }
'@
Set-Content -Path 'app\projects\projects.module.css' -Value $projCss -Encoding UTF8

$projects = @'
import { getProjects } from '@/sanity/lib/client';
import styles from './projects.module.css';

export const metadata = { title: 'Projects — Portfolio' };

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.label}>Side Projects</p>
        <h1 className={styles.title}>Dashboards & Tools</h1>
      </header>
      <div className={styles.grid}>
        {projects.map((p: any) => (
          <a key={p._id} href={p.url ?? '#'} className={styles.card} target={p.url ? '_blank' : undefined} rel='noopener noreferrer'>
            <div className={styles.cardTop}><span className={styles.tag}>{p.tag}</span><span className={styles.year}>{p.year}</span></div>
            <h2 className={styles.cardTitle}>{p.title}</h2>
            <p className={styles.cardDesc}>{p.description}</p>
            <span className={styles.arrow}>→</span>
          </a>
        ))}
      </div>
    </div>
  );
}
'@
Set-Content -Path 'app\projects\page.tsx' -Value $projects -Encoding UTF8

$studioPage = @'
'use client';
import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config';
export default function StudioPage() { return <NextStudio config={config} />; }
'@
Set-Content -Path 'app\studio\[[...tool]]\page.tsx' -Value $studioPage -Encoding UTF8

$studioLayout = @'
export const metadata = { title: 'Studio — Portfolio' };
export default function StudioLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
'@
Set-Content -Path 'app\studio\[[...tool]]\layout.tsx' -Value $studioLayout -Encoding UTF8

$navCss = @'
.nav { display: flex; justify-content: space-between; align-items: center; padding: 22px 48px; border-bottom: 0.5px solid var(--grey-200); background: var(--white); position: sticky; top: 0; z-index: 100; }
.name { font-size: 13px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--black); }
.links { display: flex; gap: 32px; list-style: none; }
.link { font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--grey-400); transition: color 0.15s ease; }
.link:hover { color: var(--grey-600); }
.active { color: var(--black); }
@media (max-width: 600px) { .nav { padding: 18px 24px; } .links { gap: 20px; } }
'@
Set-Content -Path 'components\Nav.module.css' -Value $navCss -Encoding UTF8

$nav = @'
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getSiteSettings } from '@/sanity/lib/client';
import styles from './Nav.module.css';

const allLinks = [
  { href: '/', label: 'Portfolio', key: 'showPortfolio' },
  { href: '/about', label: 'About', key: 'showAbout' },
  { href: '/projects', label: 'Projects', key: 'showProjects' },
];

export default function Nav() {
  const pathname = usePathname();
  const [settings, setSettings] = useState<any>(null);
  useEffect(() => { getSiteSettings().then(setSettings); }, []);
  if (pathname.startsWith('/studio')) return null;
  const visibleLinks = allLinks.filter((l) => !settings || settings[l.key] !== false);
  return (
    <nav className={styles.nav}>
      <Link href='/' className={styles.name}>{settings?.ownerName ?? 'Alex Morgan'}</Link>
      <ul className={styles.links}>
        {visibleLinks.map(({ href, label }) => (
          <li key={href}><Link href={href} className={`${styles.link} ${pathname === href ? styles.active : ''}`}>{label}</Link></li>
        ))}
      </ul>
    </nav>
  );
}
'@
Set-Content -Path 'components\Nav.tsx' -Value $nav -Encoding UTF8

$client = @'
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const builder = imageUrlBuilder(client);
export function urlFor(source: SanityImageSource) { return builder.image(source); }

export async function getPhotos() {
  return client.fetch(`*[_type == 'photo' && featured != false] | order(order asc) { _id, title, image, location, year, category, tall, featured, order }`);
}
export async function getSiteSettings() {
  return client.fetch(`*[_type == 'siteSettings'][0] { ownerName, tagline, heroTitle, heroPeriod, email, instagramUrl, behanceUrl, aboutImage, aboutText, showPortfolio, showAbout, showProjects }`);
}
export async function getProjects() {
  return client.fetch(`*[_type == 'project' && visible != false] | order(order asc) { _id, title, tag, description, year, url }`);
}
'@
Set-Content -Path 'sanity\lib\client.ts' -Value $client -Encoding UTF8

$photoSchema = @'
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
'@
Set-Content -Path 'sanity\schemas\photo.ts' -Value $photoSchema -Encoding UTF8

$settingsSchema = @'
import { defineField, defineType } from 'sanity';
export const siteSettings = defineType({
  name: 'siteSettings', title: 'Site Settings', type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'ownerName', title: 'Your name', type: 'string', validation: (Rule) => Rule.required() }),
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
'@
Set-Content -Path 'sanity\schemas\siteSettings.ts' -Value $settingsSchema -Encoding UTF8

$projectSchema = @'
import { defineField, defineType } from 'sanity';
export const project = defineType({
  name: 'project', title: 'Project', type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'tag', title: 'Tag (e.g. Analytics, Tool, Viz)', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'year', title: 'Year', type: 'string' }),
    defineField({ name: 'url', title: 'Project URL', type: 'url' }),
    defineField({ name: 'visible', title: 'Show on site', type: 'boolean', initialValue: true }),
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
  ],
  preview: { select: { title: 'title', subtitle: 'tag' } },
});
'@
Set-Content -Path 'sanity\schemas\project.ts' -Value $projectSchema -Encoding UTF8

$schemaIndex = @'
import { photo } from './photo';
import { siteSettings } from './siteSettings';
import { project } from './project';
export const schemaTypes = [photo, siteSettings, project];
'@
Set-Content -Path 'sanity\schemas\index.ts' -Value $schemaIndex -Encoding UTF8

$sanityConfig = @'
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/plugins/structure';
import { visionTool } from '@sanity/vision';
import { media } from 'sanity-plugin-media';
import { schemaTypes } from './sanity/schemas';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  name: 'portfolio-studio', title: 'Portfolio Studio',
  projectId, dataset,
  plugins: [
    structureTool({
      structure: (S) => S.list().title('Content').items([
        S.listItem().title('Site Settings').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
        S.divider(),
        S.listItem().title('Photos').child(S.documentTypeList('photo').title('Photos')),
        S.listItem().title('Projects').child(S.documentTypeList('project').title('Projects')),
      ]),
    }),
    visionTool(),
    media(),
  ],
  schema: { types: schemaTypes },
});
'@
Set-Content -Path 'sanity.config.ts' -Value $sanityConfig -Encoding UTF8

Write-Host 'All files written successfully!'
}"

echo.
echo ✓ Setup complete!
echo.
echo Next steps:
echo   1. Copy your .env.local.example to .env.local and add your Sanity Project ID
echo   2. Run: npm run dev
echo   3. Open http://localhost:3000
echo   4. Open http://localhost:3000/studio to edit your content
