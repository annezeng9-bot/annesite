'use client';
import styles from './workout.module.css';

export default function WorkoutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <a href="/data" className={styles.back}>Projects</a>
        <p className={styles.label}>Data</p>
        <h1 className={styles.title}>Workout Log</h1>
      </div>

      <div className={styles.window}>
        <iframe
          src="/workout-dashboard.html"
          className={styles.iframe}
          title="Workout Dashboard"
          suppressHydrationWarning
        />
      </div>
    </div>
  );
}
