'use client';
import Image from 'next/image';
import { useState } from 'react';
import styles from './about.module.css';


const teams = [
  { name: 'Toronto Tempo',          number: '26', primary: '#6B1F3A', secondary: '#A8C8E8', accent: '#FFFFFF' },
  { name: 'Toronto Blue Jays',      number: '27', primary: '#134A8E', secondary: '#FFFFFF', accent: '#FFFFFF' },
  { name: 'UConn Huskies WBB',      number: '35', primary: '#000E2F', secondary: '#E03A3E', accent: '#FFFFFF' },
  { name: 'Golden State Valkyries', number: '22', primary: '#1a1a2e', secondary: '#C8A2C8', accent: '#FFFFFF' },
  { name: 'Indiana Fever',          number: '22', primary: '#002D62', secondary: '#E03A3E', accent: '#C9A84C' },
  { name: 'Seattle Storm',          number: '5',  primary: '#2C5F2E', secondary: '#FFC72C', accent: '#FFFFFF' },
  { name: 'Los Angeles Lakers',     number: '23', primary: '#552583', secondary: '#FDB927', accent: '#FFFFFF' },
];

function Jersey({ name, number, primary, secondary, accent }: typeof teams[0]) {
  const [touched, setTouched] = useState(false);
  return (
    <div
      className={styles.jerseyWrap + (touched ? ' ' + styles.touched : '')}
      onTouchStart={() => setTouched(true)}
      onTouchEnd={() => setTimeout(() => setTouched(false), 1200)}
    >
      <svg width="48" height="52" viewBox="0 0 48 52" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
        <rect x="8"  y="10" width="32" height="42" fill={primary} rx="1" />
        <rect x="0"  y="10" width="10" height="14" fill={primary} rx="1" />
        <rect x="38" y="10" width="10" height="14" fill={primary} rx="1" />
        <rect x="16" y="7"  width="16" height="6"  fill={primary} />
        <rect x="18" y="5"  width="12" height="5"  fill={primary} rx="2" />
        <rect x="8"  y="10" width="5"  height="42" fill={secondary} opacity="0.6" />
        <rect x="35" y="10" width="5"  height="42" fill={secondary} opacity="0.6" />
        <rect x="0"  y="18" width="10" height="3"  fill={secondary} opacity="0.6" />
        <rect x="38" y="18" width="10" height="3"  fill={secondary} opacity="0.6" />
        <text x="24" y="34" textAnchor="middle" dominantBaseline="middle" fill={accent} fontSize="16" fontWeight="900" fontFamily="Impact, Arial Black, sans-serif">{number}</text>
      </svg>
      <div className={styles.jerseyTooltip}>{name}</div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.layout}>

        <div className={styles.imageCol}>
          <div className={styles.imageWrap}>
            <Image
              src="/photos/portrait.jpg"
              alt="Anne Zeng"
              width={1030}
              height={1030}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
          <a href="mailto:info@annezeng.site" className={styles.emailUnderPhoto}>info@annezeng.site</a>
        </div>

        <div className={styles.textCol}>
          <h1 className={styles.name}>Hi, I&apos;m Anne.</h1>
          <p className={styles.tagline}>Toronto-based. Senior Analyst. Photographer.</p>
          <p className={styles.body}>
            I build systems that organize and visualize information. I also take lots of photos!
            My work ranges from architecting data dashboards to producing live broadcast assets
            to high-speed sports photography.
          </p>

          <div className={styles.divider} />

          <div className={styles.teamsSection}>
            <p className={styles.teamsLabel}>Teams I Root For</p>
            <div className={styles.jerseys}>
              {teams.map((team) => (
                <Jersey key={team.name} {...team} />
              ))}
            </div>
          </div>

          <a href="/collection" className={styles.collectionLink}>
            Check out my card collection
          </a>
        </div>

      </div>
    </div>
  );
}
