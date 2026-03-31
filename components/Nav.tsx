'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from './Nav.module.css';

const links = [
  { href: '/', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/data', label: 'Data' },
  { href: '/video', label: 'Video' },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className={styles.nav}>
        <Link href="/" className={styles.name}>Anne Zeng</Link>

        <ul className={styles.links}>
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={styles.link + (pathname === href ? ' ' + styles.active : '')}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <a
          className={styles.menuToggle}
          href="#menu"
          onClick={(e) => { e.preventDefault(); setOpen(o => !o); }}
        >
          {open ? 'Close' : 'Menu'}
        </a>
      </nav>

      <div className={styles.mobileMenu + (open ? ' ' + styles.mobileMenuOpen : '')}>
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={styles.mobileLink + (pathname === href ? ' ' + styles.mobileLinkActive : '')}
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
      </div>
    </>
  );
}
