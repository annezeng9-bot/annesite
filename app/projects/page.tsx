import styles from './projects.module.css';

export const metadata = { title: 'Projects — Alex Morgan' };

// ─── ADD YOUR PROJECTS HERE ──────────────────────────────────────────────────
const projects = [
  {
    tag: 'Analytics',
    title: 'Weather Dashboard',
    description: 'Live weather data visualized across Canadian cities. Built with Next.js and D3.',
    year: '2024',
    url: '#',
  },
  {
    tag: 'Data',
    title: 'Film Log Tracker',
    description: 'Personal film photography log with exposure stats and gear tracking.',
    year: '2023',
    url: '#',
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.label}>Side Projects</p>
        <h1 className={styles.title}>Dashboards & Tools</h1>
      </header>

      <div className={styles.grid}>
        {projects.map((p) => (
          <a key={p.title} href={p.url} className={styles.card} target={p.url !== '#' ? '_blank' : undefined} rel="noopener noreferrer">
            <div className={styles.cardTop}>
              <span className={styles.tag}>{p.tag}</span>
              <span className={styles.year}>{p.year}</span>
            </div>
            <h2 className={styles.cardTitle}>{p.title}</h2>
            <p className={styles.cardDesc}>{p.description}</p>
            <span className={styles.arrow}>→</span>
          </a>
        ))}
      </div>
    </div>
  );
}
