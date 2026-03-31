'use client';
import { useRef, useState } from 'react';
import styles from './video.module.css';

const livestreamEvents = [
  { src: '/videos/BoBStream.gif', title: 'Band of Barbells Meet', subtitle: 'Powerlifting Competition' },
  { src: '/videos/ApexCupStream.gif', title: 'Afterburn Apex Cup', subtitle: 'Paddle Erg Competition' },
];

const travelVideos = [
  { src: '/videos/New York.mp4', title: 'New York, USA', subtitle: 'Part I' },
  { src: '/videos/New York Food Tour.mp4', title: 'New York, USA', subtitle: 'Food Tour' },
];

function VideoCard({ src, title, subtitle }: { src: string; title: string; subtitle: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function handlePlay() {
    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
    }
  }

  return (
    <div className={styles.videoCard}>
      <div className={styles.videoWrap}>
        <video
          ref={videoRef}
          playsInline
          preload="metadata"
          disablePictureInPicture
          controlsList="nofullscreen nodownload"
          controls={playing}
          className={styles.video}
          onEnded={() => setPlaying(false)}
        >
          <source src={src} type="video/mp4" />
        </video>
        {!playing && (
          <div className={styles.overlay} onClick={handlePlay}>
            <span className={styles.playText}>Click to play</span>
          </div>
        )}
      </div>
      <p className={styles.videoTitle}>{title}<br/><span className={styles.videoSubtitle}>{subtitle}</span></p>
    </div>
  );
}

export default function VideoPage() {
  return (
    <div className={styles.page}>

      <section className={styles.section}>
        <p className={styles.label}>Travel</p>
        <div className={styles.videoGrid}>
          {travelVideos.map((video) => (
            <VideoCard key={video.src} src={video.src} title={video.title} subtitle={video.subtitle} />
          ))}
        </div>
      </section>

      <div className={styles.divider} />

      <section className={styles.section}>
        <p className={styles.label}>Live Production</p>
        <div className={styles.gifGrid}>
          {livestreamEvents.map((event, i) => (
            <div key={i} className={styles.gifCard}>
              <div className={styles.gifWrap}>
                <img src={event.src} alt={event.title} className={styles.gif} />
              </div>
              <p className={styles.videoTitle}>{event.title}<br/><span className={styles.videoSubtitle}>{event.subtitle}</span></p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
