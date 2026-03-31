'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

const categories = [
  { label: 'Dragon Boat', key: 'dragonboat' },
  { label: 'Travel', key: 'travel' },
  { label: 'Live Events', key: 'liveevents' },
  { label: 'iPhone', key: 'iphone' },
];

type Photo = { src: string; alt: string; w: number; h: number; location?: string; year?: string; type?: 'photo' | 'video' };

const allPhotos: Record<string, Photo[]> = {
  dragonboat: [
    // --- 2025 CORA (column 1) ---
    { src: '/photos/dragonboat/20250809_CORA_001.jpg',                              alt: 'CORA 2025',        w: 1907, h: 1247 },
    { src: '/photos/dragonboat/20250809_CORA_068.jpg',                              alt: 'CORA 2025',        w: 2048, h: 1245 },
    { src: '/photos/dragonboat/20250809_CORA_244.jpg',                              alt: 'CORA 2025',        w: 2048, h: 1251 },
    { src: '/photos/dragonboat/20250809_CORA_464.jpg',                              alt: 'CORA 2025',        w: 1657, h: 1105 },
    { src: '/photos/dragonboat/20250809_CORA_523.jpg',                              alt: 'CORA 2025',        w: 1865, h: 1243 },
    { src: '/photos/dragonboat/38023575_680254382315294_5997706964535083008_n.jpg', alt: 'Dragon boat',      w: 1803, h: 1201 },
    { src: '/photos/dragonboat/20160716_GWNSport_488.jpg',                          alt: 'Dragon boat 2016', w: 1662, h: 1108 },
    { src: '/photos/dragonboat/20170709_MontrealChallenge_261.jpg',                 alt: 'Montreal 2017',    w: 1629, h: 1086 },
    // --- 2025 CORA (column 2) ---
    { src: '/photos/dragonboat/20250809_CORA_010.jpg',                              alt: 'CORA 2025',        w: 1884, h: 1229 },
    { src: '/photos/dragonboat/20250809_CORA_177.jpg',                              alt: 'CORA 2025',        w: 1035, h: 1365 },
    { src: '/photos/dragonboat/20250809_CORA_371.jpg',                              alt: 'CORA 2025',        w: 2048, h: 1233 },
    { src: '/photos/dragonboat/20250809_CORA_437.jpg',                              alt: 'CORA 2025',        w: 1881, h: 1253 },
    { src: '/photos/dragonboat/20250809_CORA_497.jpg',                              alt: 'CORA 2025',        w: 1872, h: 1247 },
    { src: '/photos/dragonboat/20250809_CORA_503.jpg',                              alt: 'CORA 2025',        w: 1645, h: 1097 },
    { src: '/photos/dragonboat/38241958_682774988729900_3546545746905923584_n.jpg', alt: 'Dragon boat',      w: 1598, h: 1066 },
    { src: '/photos/dragonboat/20160821_NationalsDayThree_63.jpg',                  alt: 'Nationals 2016',   w: 1635, h: 1090 },
    // --- 2025 TIDBRF + older (column 3) ---
    { src: '/photos/dragonboat/20250614_TIDBRF_Part1_011.jpg',                      alt: 'Tid Brf 2025',     w: 1872, h: 1265 },
    { src: '/photos/dragonboat/20250614_TIDBRF_Part2_031.jpg',                      alt: 'Tid Brf 2025',     w: 1644, h: 1107 },
    { src: '/photos/dragonboat/20250614_TIDBRF_Part2_099.jpg',                      alt: 'Tid Brf 2025',     w: 1812, h: 1263 },
    { src: '/photos/dragonboat/20250614_TIDBRF_Part2_220.jpg',                      alt: 'Tid Brf 2025',     w: 1803, h: 1264 },
    { src: '/photos/dragonboat/20250614_TIDBRF_Part2_322.jpg',                      alt: 'Tid Brf 2025',     w: 1705, h: 1096 },
    { src: '/photos/dragonboat/20240803_CORA_ESC_Part2_7636.jpg',                   alt: 'CORA ESC 2024',    w: 1365, h: 1922 },
    { src: '/photos/dragonboat/20240803_CORA_ESC_Part2_7692.jpg',                   alt: 'CORA ESC 2024',    w: 1772, h: 1251 },
    { src: '/photos/dragonboat/20240803_CORA_ESC_Part2_7882.jpg',                   alt: 'CORA ESC 2024',    w: 1800, h: 1061 },
    { src: '/photos/dragonboat/20240803_CORA_ESC_Part2_8102.jpg',                   alt: 'CORA ESC 2024',    w: 1641, h: 1098 },
    { src: '/photos/dragonboat/20240803_CORA_ESC_Part2_8128.jpg',                   alt: 'CORA ESC 2024',    w: 1876, h: 1267 },
    { src: '/photos/dragonboat/20230617_TIDBRF-IG_006.jpg',                         alt: 'Tid Brf 2023',     w: 864,  h: 1080 },
    { src: '/photos/dragonboat/20230617_TIDBRF-IG_008.jpg',                         alt: 'Tid Brf 2023',     w: 864,  h: 1080 },
    { src: '/photos/dragonboat/20230617_TIDBRF-IG_009.jpg',                         alt: 'Tid Brf 2023',     w: 864,  h: 1080 },
    { src: '/photos/dragonboat/20230617_TIDBRF_212.jpg',                            alt: 'Tid Brf 2023',     w: 1862, h: 1241 },
    { src: '/photos/dragonboat/38825363_689029981437734_8688260317689413632_n.jpg', alt: 'Dragon boat',      w: 1789, h: 1192 },
    { src: '/photos/dragonboat/38875588_689018771438855_5887729800025473024_n.jpg', alt: 'Dragon boat',      w: 1777, h: 1184 },
  ],
  travel: [
    { src: '/photos/travel/20211110_ZionCanyon_13.jpg',  alt: 'Zion Canyon',  w: 1291, h: 1936, location: 'Zion Canyon',  year: '2021' },
    { src: '/photos/travel/20221112_MET_002.jpg',        alt: 'New York',     w: 1365, h: 2048, location: 'New York',     year: '2022' },
    { src: '/photos/travel/20221215_NewYork_006.jpg',    alt: 'New York',     w: 1365, h: 2048, location: 'New York',     year: '2022' },
    { src: '/photos/travel/20221229_Seoul_004.jpg',      alt: 'Seoul',        w: 1365, h: 2048, location: 'Seoul',        year: '2022' },
    { src: '/photos/travel/20221230_Seoul_003.jpg',      alt: 'Seoul',        w: 1365, h: 2048, location: 'Seoul',        year: '2022' },
    { src: '/photos/travel/20211110_ZionCanyon_15.jpg',  alt: 'Zion Canyon',  w: 1291, h: 1936, location: 'Zion Canyon',  year: '2021' },
    { src: '/photos/travel/20221112_MET_003.jpg',        alt: 'New York',     w: 1365, h: 2048, location: 'New York',     year: '2022' },
    { src: '/photos/travel/20221215_NewYork_009.jpg',    alt: 'New York',     w: 1365, h: 2048, location: 'New York',     year: '2022' },
    { src: '/photos/travel/20230103_Jeju_024.jpg',       alt: 'Jeju',         w: 1365, h: 2048, location: 'Jeju',         year: '2023' },
    { src: '/photos/travel/20230105_Jeju_039.jpg',       alt: 'Jeju',         w: 1365, h: 2048, location: 'Jeju',         year: '2023' },
    { src: '/photos/travel/20230108_Jeju_045.jpg',       alt: 'Jeju',         w: 1365, h: 2048, location: 'Jeju',         year: '2023' },
    { src: '/photos/travel/20230129_LA_003.jpg',         alt: 'Los Angeles',  w: 1365, h: 2048, location: 'Los Angeles',  year: '2023' },
    { src: '/photos/travel/20230131_LA_IG_008.jpg',      alt: 'Los Angeles',  w: 900,  h: 1350, location: 'Los Angeles',  year: '2023' },
    { src: '/photos/travel/20230131_LA_IG_009.jpg',      alt: 'Los Angeles',  w: 900,  h: 1350, location: 'Los Angeles',  year: '2023' },
    { src: '/photos/travel/20230529_LondonIG_002.jpg',   alt: 'London',       w: 864,  h: 1080, location: 'London',       year: '2023' },
    { src: '/photos/travel/20230529_LondonIG_004.jpg',   alt: 'London',       w: 864,  h: 1080, location: 'London',       year: '2023' },
    { src: '/photos/travel/20230529_LondonIG_005.jpg',   alt: 'London',       w: 864,  h: 1080, location: 'London',       year: '2023' },
    { src: '/photos/travel/20240306_NYC_001.jpg',        alt: 'New York',     w: 900,  h: 1350, location: 'New York',     year: '2024' },
    { src: '/photos/travel/20240307_NYC_003.jpg',        alt: 'New York',     w: 900,  h: 1350, location: 'New York',     year: '2024' },
    { src: '/photos/travel/20240308_NYC_005.jpg',        alt: 'New York',     w: 900,  h: 1350, location: 'New York',     year: '2024' },
    { src: '/photos/travel/20240308_NYC_007.jpg',        alt: 'New York',     w: 900,  h: 1350, location: 'New York',     year: '2024' },
    { src: '/photos/travel/20240308_NYC_008.jpg',        alt: 'New York',     w: 900,  h: 1350, location: 'New York',     year: '2024' },
    { src: '/photos/travel/20250402_Fuzhou_003.jpg',     alt: 'Fuzhou',       w: 900,  h: 1350, location: 'Fuzhou',       year: '2025' },
    { src: '/photos/travel/20250403_Fuzhou_004.jpg',     alt: 'Fuzhou',       w: 900,  h: 1350, location: 'Fuzhou',       year: '2025' },
  ],
  liveevents: [
    { src: '/photos/live events/20230827_BP_Encore_001.jpg',        alt: 'Blackpink @ Dodger Stadium',                            w: 1800, h: 1200, location: 'Blackpink @ Dodger Stadium',                            year: '2023' },
    { src: '/photos/live events/20241102_Kings_02308.jpg',          alt: 'Vince Carter Retirement Ceremony',                      w: 1800, h: 1200, location: 'Vince Carter Retirement Ceremony',                      year: '2024' },
    { src: '/photos/live events/20240212_Raptors_001.jpg',          alt: 'Raptors vs Spurs @ Air Canada Centre',                  w: 1800, h: 1200, location: 'Raptors vs Spurs @ Air Canada Centre',                  year: '2024' },
    { src: '/photos/live events/20251031_WorldSeriesGame6_001.mov', alt: 'World Series Game 6 @ SkyDome',                         w: 560,  h: 316,  location: 'World Series Game 6 @ SkyDome',                         year: '2025', type: 'video' },
    { src: '/photos/live events/20240909_TIFF_02033.jpg',           alt: 'Toronto International Film Festival',                   w: 1800, h: 1200, location: 'Toronto International Film Festival',                   year: '2024' },
    { src: '/photos/live events/20230827_BP_Encore_00472.jpg',      alt: 'Blackpink @ Dodger Stadium',                            w: 1800, h: 1200, location: 'Blackpink @ Dodger Stadium',                            year: '2023' },
    { src: '/photos/live events/20240212_Raptors_002.jpg',          alt: 'Raptors vs Spurs @ Air Canada Centre',                  w: 1800, h: 1200, location: 'Raptors vs Spurs @ Air Canada Centre',                  year: '2024' },
    { src: '/photos/live events/20240427_Miami_01.mp4',             alt: 'Eastern Conference First Round Game 1 @ Kaseya Center', w: 560,  h: 996,  location: 'Eastern Conference First Round Game 1 @ Kaseya Center', year: '2024', type: 'video' },
    { src: '/photos/live events/20230911_TIFF_002.jpg',             alt: 'Toronto International Film Festival',                   w: 1800, h: 1200, location: 'Toronto International Film Festival',                   year: '2023' },
    { src: '/photos/live events/20240308_NYC_01764.jpg',            alt: 'Knicks vs Magic @ Madison Square Garden',               w: 1800, h: 1200, location: 'Knicks vs Magic @ Madison Square Garden',               year: '2024' },
    { src: '/photos/live events/20240308_NYC_01808.jpg',            alt: 'Knicks vs Magic @ Madison Square Garden',               w: 1800, h: 1200, location: 'Knicks vs Magic @ Madison Square Garden',               year: '2024' },
    { src: '/photos/live events/20240308_NYC_01.mp4',               alt: 'Knicks vs Magic @ Madison Square Garden',               w: 560,  h: 996,  location: 'Knicks vs Magic @ Madison Square Garden',               year: '2024', type: 'video' },
    { src: '/photos/live events/20240427_Miami_02008.jpg',          alt: 'Eastern Conference First Round Game 1 @ Kaseya Center', w: 1800, h: 1200, location: 'Eastern Conference First Round Game 1 @ Kaseya Center', year: '2024' },
    { src: '/photos/live events/20240909_TIFF_02058.jpg',           alt: 'Toronto International Film Festival',                   w: 1800, h: 1200, location: 'Toronto International Film Festival',                   year: '2024' },
    { src: '/photos/live events/20241101_Lakers_02226.jpg',         alt: 'Raptors vs Lakers @ Air Canada Centre',                 w: 1800, h: 1200, location: 'Raptors vs Lakers @ Air Canada Centre',                 year: '2024' },
    { src: '/photos/live events/20241102_Kings_001.mp4',            alt: 'Vince Carter Retirement Ceremony',                      w: 560,  h: 996,  location: 'Vince Carter Retirement Ceremony',                      year: '2024', type: 'video' },
    { src: '/photos/live events/20241101_Lakers_02243.jpg',         alt: 'Raptors vs Lakers @ Air Canada Centre',                 w: 1800, h: 1200, location: 'Raptors vs Lakers @ Air Canada Centre',                 year: '2024' },
    { src: '/photos/live events/20241113_HONNE_001.jpg',            alt: 'HONNE @ The Concert Hall',                              w: 1800, h: 1200, location: 'HONNE @ The Concert Hall',                              year: '2024' },
    { src: '/photos/live events/20250125_dhruv_1.mov',              alt: 'dhruv @ The Axis Club',                                 w: 560,  h: 996,  location: 'dhruv @ The Axis Club',                                 year: '2025', type: 'video' },
    { src: '/photos/live events/20251031_WorldSeriesGame6_002.mov', alt: 'World Series Game 6 @ SkyDome',                         w: 560,  h: 316,  location: 'World Series Game 6 @ SkyDome',                         year: '2025', type: 'video' },
  ],
  iphone: [
    { src: '/photos/iphone/20260325_Chiayi_2253.jpg',      alt: 'Chiayi',     w: 1536, h: 2048, location: 'Chiayi',     year: '2026' },
    { src: '/photos/iphone/20260325_Alishan_1943.jpg',     alt: 'Alishan',    w: 1536, h: 2048, location: 'Alishan',    year: '2026' },
    { src: '/photos/iphone/20260325_HongKong_2716.jpg',    alt: 'Hong Kong',  w: 1536, h: 2048, location: 'Hong Kong',  year: '2026' },
    { src: '/photos/iphone/20260325_Vigan_1606.jpg',       alt: 'Vigan',      w: 1536, h: 2048, location: 'Vigan',      year: '2026' },
    { src: '/photos/iphone/20260325_Laoag_1725.jpg',       alt: 'Laoag',      w: 1536, h: 2048, location: 'Laoag',      year: '2026' },
    { src: '/photos/iphone/20260325_Pagudpud_1841.jpg',    alt: 'Pagudpud',   w: 1536, h: 2048, location: 'Pagudpud',   year: '2026' },
    { src: '/photos/iphone/20260325_Alishan_2118.jpg',     alt: 'Alishan',    w: 1536, h: 2048, location: 'Alishan',    year: '2026' },
    { src: '/photos/iphone/20260325_HongKong_2718.jpg',    alt: 'Hong Kong',  w: 1536, h: 2048, location: 'Hong Kong',  year: '2026' },
    { src: '/photos/iphone/20260325_Pagudpud_1770.jpg',    alt: 'Pagudpud',   w: 1536, h: 2048, location: 'Pagudpud',   year: '2026' },
    { src: '/photos/iphone/20260325_Chiayi_1908.jpg',      alt: 'Chiayi',     w: 1536, h: 2048, location: 'Chiayi',     year: '2026' },
    { src: '/photos/iphone/20260325_Alishan_2138.jpg',     alt: 'Alishan',    w: 1536, h: 2048, location: 'Alishan',    year: '2026' },
    { src: '/photos/iphone/20260325_HongKong_2720.jpg',    alt: 'Hong Kong',  w: 1536, h: 2048, location: 'Hong Kong',  year: '2026' },
    { src: '/photos/iphone/20260228_Taipei_2606.jpg',      alt: 'Taipei',     w: 1536, h: 2048, location: 'Taipei',     year: '2026' },
    { src: '/photos/iphone/20260325_Pagudpud_1783.jpg',    alt: 'Pagudpud',   w: 1536, h: 2048, location: 'Pagudpud',   year: '2026' },
    { src: '/photos/iphone/20260325_Taichung_2437.jpg',    alt: 'Taichung',   w: 1536, h: 2048, location: 'Taichung',   year: '2026' },
    { src: '/photos/iphone/20260325_Vigan_1650.jpg',       alt: 'Vigan',      w: 1536, h: 2048, location: 'Vigan',      year: '2026' },
    { src: '/photos/iphone/20260325_Chiayi_2247.jpg',      alt: 'Chiayi',     w: 1536, h: 2048, location: 'Chiayi',     year: '2026' },
    { src: '/photos/iphone/20260325_Pagudpud_1813.jpg',    alt: 'Pagudpud',   w: 1536, h: 2048, location: 'Pagudpud',   year: '2026' },
    { src: '/photos/iphone/20260325_Taichung_2605.jpg',    alt: 'Taichung',   w: 1536, h: 2048, location: 'Taichung',   year: '2026' },
    { src: '/photos/iphone/20260325_Vigan_1651.jpg',       alt: 'Vigan',      w: 1536, h: 2048, location: 'Vigan',      year: '2026' },
    { src: '/photos/iphone/20260325_Shenzhen_2809.jpg',    alt: 'Shenzhen',   w: 1536, h: 2048, location: 'Shenzhen',   year: '2026' },
    { src: '/photos/iphone/20260325_Chiayi_2249.jpg',      alt: 'Chiayi',     w: 1536, h: 2048, location: 'Chiayi',     year: '2026' },
    { src: '/photos/iphone/20260325_Vigan_1689.jpg',       alt: 'Vigan',      w: 1536, h: 2048, location: 'Vigan',      year: '2026' },
    { src: '/photos/iphone/20260225_Taichung_2441.jpg',    alt: 'Taichung',   w: 1536, h: 2048, location: 'Taichung',   year: '2026' },
  ],
};

function VideoCard({ item }: { item: Photo }) {
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function handlePlay() {
    if (videoRef.current) { videoRef.current.play(); setPlaying(true); }
  }

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={!playing ? handlePlay : undefined}
      style={{ cursor: playing ? 'default' : 'pointer' }}
    >
      <video
        ref={videoRef}
        playsInline
        preload="metadata"
        controls={playing}
        onEnded={() => setPlaying(false)}
        style={{ width: '100%', height: 'auto', display: 'block', pointerEvents: playing ? 'auto' : 'none' }}
      >
        <source src={item.src} type="video/mp4" />
      </video>
      {!playing && (
        <div
          className={styles.overlay}
          style={{ opacity: hovered ? 1 : 0, pointerEvents: 'none' }}
        >
          <span className={styles.overlayText}>
            Click to play{(item.location || item.year) ? ` - ${[item.location, item.year].filter(Boolean).join(', ')}` : ''}
          </span>
        </div>
      )}
    </div>
  );
}

function MediaCard({ item }: { item: Photo }) {
  if (item.type === 'video') return <VideoCard item={item} />;
  return <PhotoCard photo={item} />;
}

function PhotoCard({ photo }: { photo: Photo }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.w}
        height={photo.h}
        sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
      {(photo.location || photo.year) && (
        <div className={styles.overlay} style={{ opacity: hovered ? 1 : 0 }}>
          <span className={styles.overlayText}>
            {[photo.location, photo.year].filter(Boolean).join(', ')}
          </span>
        </div>
      )}
    </div>
  );
}

export default function PortfolioPage() {
  const [active, setActive] = useState('dragonboat');
  const photos = allPhotos[active] ?? [];

  return (
    <div className={styles.page}>
      <div className={styles.subNav}>
        {categories.map(({ label, key }) => (
          <a
            key={key}
            href="#"
            className={styles.subNavLink + (active === key ? ' ' + styles.subNavActive : '')}
            onClick={(e) => { e.preventDefault(); setActive(key); }}
          >
            {label}
          </a>
        ))}
      </div>

      <div className={`${styles.grid} ${active === 'travel' || active === 'iphone' || active === 'liveevents' ? styles.gridTight : ''}`}>
        {photos.map((item, i) => (
          <MediaCard key={i} item={item} />
        ))}
        {photos.length === 0 && (
          <p className={styles.empty}>No photos yet in this category.</p>
        )}
      </div>

      <footer className={styles.footer}>
        <p>Â© {new Date().getFullYear()} Anne Zeng. All rights reserved.</p>
      </footer>
    </div>
  );
}
