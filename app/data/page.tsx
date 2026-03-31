import styles from './data.module.css';

export const metadata = { title: 'Anne Zeng' };

const projects = [
  {
    tag: 'Analytics',
    title: 'Jalen Win Share Tracker',
    description: 'A highly analytical, game-breaking analysis dashboard on the impact of players named Jalen on a NBA team.',
    url: '/data/jalen',
  },
  {
    tag: 'Data',
    title: 'Workout Log',
    description: 'Personal workout dashboard tracking overall weight lifted over the course of my workouts and the breakdown of the exercise groups and other relevant information.',
    url: '/data/workout',
  },
];

export default function ProjectsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.label}>Data</p>
        <h1 className={styles.title}>Projects</h1>
      </header>

      <div className={styles.grid}>
        {projects.map((p) => (
          <a key={p.title} href={p.url} className={styles.card} target={p.url.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
            <div className={styles.cardTop}>
              <span className={styles.tag}>{p.tag}</span>
            </div>
            <h2 className={styles.cardTitle}>{p.title}</h2>
            <p className={styles.cardDesc}>{p.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
