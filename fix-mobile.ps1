$base = "C:\Users\Anne\Documents\Git\my-portfolio"

# Nav.tsx
[System.IO.File]::WriteAllText("$base\components\Nav.tsx", "'use client';
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
        <Link href=""/"" className={styles.name} onClick={() => setOpen(false)}>Anne Zeng</Link>
        <ul className={styles.links}>
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={styles.link + (pathname === href ? ' ' + styles.active : '')}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <button className={styles.hamburger} onClick={() => setOpen(o => !o)} aria-label=""Menu"">
          <span className={styles.bar + (open ? ' ' + styles.barOpen1 : '')} />
          <span className={styles.bar + (open ? ' ' + styles.barOpen2 : '')} />
          <span className={styles.bar + (open ? ' ' + styles.barOpen3 : '')} />
        </button>
      </nav>
      {open && (
        <div className={styles.mobileMenu}>
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
      )}
    </>
  );
}", (New-Object System.Text.UTF8Encoding $false))

Write-Host "Nav.tsx written"

# Nav.module.css
[System.IO.File]::WriteAllText("$base\components\Nav.module.css", ".nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 160px;
  border-bottom: 0.5px solid var(--grey-200);
  background: var(--white);
  position: sticky;
  top: 0;
  z-index: 200;
}
.name {
  font-family: var(--font-monument-regular), sans-serif;
  font-weight: 700;
  font-size: 22px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--black);
  text-decoration: none;
}
.links { display: flex; gap: 32px; list-style: none; }
.link {
  font-family: var(--font-body), sans-serif;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--grey-400);
  transition: color 0.15s ease;
  text-decoration: none;
}
.link:hover { color: var(--grey-600); }
.active { color: var(--black); }
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  min-width: 44px;
  min-height: 44px;
  align-items: center;
  justify-content: center;
}
.bar {
  display: block;
  width: 22px;
  height: 1.5px;
  background: var(--black);
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.barOpen1 { transform: translateY(6.5px) rotate(45deg); }
.barOpen2 { opacity: 0; }
.barOpen3 { transform: translateY(-6.5px) rotate(-45deg); }
.mobileMenu {
  display: none;
  flex-direction: column;
  background: var(--white);
  border-bottom: 0.5px solid var(--grey-200);
  padding: 8px 0 16px;
  position: sticky;
  top: 53px;
  z-index: 199;
}
.mobileLink {
  font-family: var(--font-body), sans-serif;
  font-size: 13px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--grey-400);
  text-decoration: none;
  padding: 14px 20px;
  transition: color 0.15s ease;
  min-height: 44px;
  display: flex;
  align-items: center;
}
.mobileLink:active { color: var(--black); }
.mobileLinkActive { color: var(--black); }
@media (max-width: 1100px) {
  .nav { padding: 16px 32px; }
  .name { font-size: 18px; }
}
@media (max-width: 768px) {
  .links { display: none; }
  .hamburger { display: flex; }
  .mobileMenu { display: flex; }
  .nav { padding: 14px 20px; }
  .name { font-size: 15px; }
}", (New-Object System.Text.UTF8Encoding $false))

Write-Host "Nav.module.css written"

# page.module.css
[System.IO.File]::WriteAllText("$base\app\page.module.css", ".page { min-height: calc(100vh - 61px); }
.subNav {
  display: flex;
  gap: 28px;
  padding: 20px 160px;
  border-bottom: 0.5px solid var(--grey-200);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.subNav::-webkit-scrollbar { display: none; }
.subNavLink {
  font-family: var(--font-monument-regular), sans-serif;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--grey-400);
  background: none;
  border: none;
  padding: 8px 0;
  cursor: pointer;
  transition: color 0.15s ease;
  white-space: nowrap;
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  min-height: 44px;
  display: flex;
  align-items: center;
}
.subNavLink:active { color: var(--black); }
.subNavActive { color: var(--black); }
.grid { padding: 24px 160px 0; columns: 3; column-gap: 8px; }
.gridTight { columns: 4; }
.card { break-inside: avoid; margin-bottom: 8px; position: relative; overflow: hidden; }
.overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex; align-items: flex-end; padding: 14px;
  transition: opacity 0.2s ease; pointer-events: none;
}
.overlayText { font-size: 10px; color: #fff; letter-spacing: 0.08em; text-transform: uppercase; font-family: var(--font-body), sans-serif; }
.empty { font-size: 13px; color: var(--grey-400); padding: 48px 0; }
.footer { padding: 48px 160px; font-family: var(--font-body), sans-serif; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--grey-300); }
@media (max-width: 1100px) {
  .grid { columns: 3; padding: 16px 32px 0; }
  .gridTight { columns: 3; }
  .subNav { padding: 16px 32px; }
  .footer { padding: 32px 32px; }
}
@media (max-width: 768px) {
  .grid { columns: 2; padding: 12px 16px 0; }
  .gridTight { columns: 2; }
  .subNav { padding: 14px 16px; gap: 20px; }
  .footer { padding: 28px 16px; }
}
@media (max-width: 480px) {
  .grid { columns: 1; padding: 10px 12px 0; }
  .gridTight { columns: 2; }
  .subNav { padding: 12px 12px; }
  .footer { padding: 24px 12px; }
}", (New-Object System.Text.UTF8Encoding $false))

Write-Host "page.module.css written"
Write-Host ""
Write-Host "All done! Run: npm run dev"
