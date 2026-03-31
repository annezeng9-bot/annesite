'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './collection.module.css';

const cards = [
  {
    cert: '134954619',
    front: 'https://d1htnxwo4o0jhw.cloudfront.net/cert/134954619/small/ksmkv8ckQEGg57qNM8UFaQ.jpg',
    back:  'https://d1htnxwo4o0jhw.cloudfront.net/cert/134954619/small/ep1_ywn09UCJETDaDjkR4w.jpg',
  },
  {
    cert: '165354373',
    front: 'https://d1htnxwo4o0jhw.cloudfront.net/cert/165354373/small/SJUUTt44L0a8SrzVOitcEA.jpg',
    back:  'https://d1htnxwo4o0jhw.cloudfront.net/cert/165354373/small/4geKHOYwY0e6BEer-TLH7Q.jpg',
  },
  {
    cert: '173140141',
    front: 'https://d1htnxwo4o0jhw.cloudfront.net/cert/173140141/small/HFye9aEh4kiRJDxu0k1Dkg.jpg',
    back:  'https://d1htnxwo4o0jhw.cloudfront.net/cert/173140141/small/cK8cgCcgsU-BpdvNKcDCRg.jpg',
  },
  {
    cert: '181269470',
    front: 'https://d1htnxwo4o0jhw.cloudfront.net/cert/181269470/small/SHb7Ui3-HUe0GDWONOISdg.jpg',
    back:  'https://d1htnxwo4o0jhw.cloudfront.net/cert/181269470/small/sgAZiE7qaU2ygKDTTtLT9Q.jpg',
  },
  {
    cert: '181269467',
    front: 'https://d1htnxwo4o0jhw.cloudfront.net/cert/181269467/small/A1hunQyQzkCCysBJkSEoCA.jpg',
    back:  'https://d1htnxwo4o0jhw.cloudfront.net/cert/181269467/small/WUG7Qjr8Mkqamcgt5x4Q5g.jpg',
  },
  {
    cert: '166740424',
    front: 'https://d1htnxwo4o0jhw.cloudfront.net/cert/166740424/small/AHOihvMvUES1Qbt8URhFZA.jpg',
    back:  'https://d1htnxwo4o0jhw.cloudfront.net/cert/166740424/small/Q4rKMbTkrUixxMWupx9eww.jpg',
  },
  {
    cert: '167486023',
    front: 'https://d1htnxwo4o0jhw.cloudfront.net/cert/167486023/small/PlrTglIKJEuKKQvIlO-BpQ.jpg',
    back:  'https://d1htnxwo4o0jhw.cloudfront.net/cert/167486023/small/zl_D_DCKnU-An6HqVsSbJA.jpg',
  },
  {
    cert: '193035678',
    front: 'https://d1htnxwo4o0jhw.cloudfront.net/cert/193035678/small/A71BpYLzN0KaCqFFi66qTQ.jpg',
    back:  'https://d1htnxwo4o0jhw.cloudfront.net/cert/193035678/small/Q2IphWn0QkSKbDHFhBNAYw.jpg',
  },
  {
    cert: '135794970',
    front: 'https://d1htnxwo4o0jhw.cloudfront.net/cert/135794970/small/SDlyWOc-u0ucTYROw08KNw.jpg',
    back:  'https://d1htnxwo4o0jhw.cloudfront.net/cert/135794970/small/6FjouH0Mbk-wEVBHUoyc1Q.jpg',
  },
  {
    cert: '193035677',
    front: 'https://d1htnxwo4o0jhw.cloudfront.net/cert/193035677/small/uwSC5-ExuU6v_Okpn7F4OA.jpg',
    back:  'https://d1htnxwo4o0jhw.cloudfront.net/cert/193035677/small/OMgh1bSyDUSrcjtGpgLnUA.jpg',
  },
  {
    cert: '193035681',
    front: 'https://d1htnxwo4o0jhw.cloudfront.net/cert/193035681/small/GWdVXYcDlE6aQLzxwFrj0g.jpg',
    back:  'https://d1htnxwo4o0jhw.cloudfront.net/cert/193035681/small/CRmtE-GfRk6P1WG4M9kfrg.jpg',
  },
  {
    cert: '193035675',
    front: 'https://d1htnxwo4o0jhw.cloudfront.net/cert/193035675/small/PPUT2ShBuk6iGjd1mG0s0A.jpg',
    back:  'https://d1htnxwo4o0jhw.cloudfront.net/cert/193035675/small/O_2CnWLYikO_QLWkt2c3lg.jpg',
  },
];

function Card({ cert, front, back }: typeof cards[0]) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className={styles.cardWrap} onClick={() => setFlipped(f => !f)}>
      <div className={`${styles.cardInner} ${flipped ? styles.flipped : ''}`}>
        <div className={styles.cardFace}>
          <Image src={front} alt={`PSA ${cert} front`} fill sizes="160px" style={{ objectFit: 'contain' }} unoptimized />
        </div>
        <div className={`${styles.cardFace} ${styles.cardBack}`}>
          <Image src={back} alt={`PSA ${cert} back`} fill sizes="160px" style={{ objectFit: 'contain' }} unoptimized />
        </div>
      </div>
    </div>
  );
}

export default function CollectionPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.label}>Some of my cards</p>
      </header>
      <div className={styles.grid}>
        {cards.map(card => (
          <Card key={card.cert} {...card} />
        ))}
      </div>
    </div>
  );
}
