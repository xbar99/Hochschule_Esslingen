import styles from './Footer.module.css';
import Image from 'next/image';
import instaIcon from '@/app/pictures/instaIcon.png';
import snapchatIcon from '@/app/pictures/snapchatIcon.png';
import twitterIcon from '@/app/pictures/twitterIcon.png';
import youtubeIcon from '@/app/pictures/youtubeIcon.png';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.socialsHeader}>Socials:</div>
      <div className={styles.socialsContainer}>
        <div className={styles.socialsItem}>
          <Image src={instaIcon} alt="instaIcon" className={styles.socialsPictures} />
          <div style={{ marginTop: '30px' }}>
            <a href="https://www.instagram.com/">
              <strong style={{ color: 'darkblue' }}>Instagram</strong>
            </a>
          </div>
        </div>
        <div className={styles.socialsItem}>
          <Image src={snapchatIcon} alt="snapIcon" className={styles.socialsPictures} />
          <div style={{ marginTop: '30px' }}>
            <a href="https://www.snapchat.com/de-DE">
              <strong style={{ color: 'darkblue' }}>Snapchat</strong>
            </a>
          </div>
        </div>
        <div className={styles.socialsItem}>
          <Image src={twitterIcon} alt="twitterIcon" className={styles.socialsPictures} style={{ marginTop: '5px' }} />
          <div style={{ marginTop: '30px' }}>
            <a href="https://twitter.com/?lang=de">
              <strong style={{ color: 'darkblue' }}>Twitter</strong>
            </a>
          </div>
        </div>
        <div className={styles.socialsItem}>
          <Image src={youtubeIcon} alt="youtubeIcon" className={styles.socialsPictures} />
          <div style={{ marginTop: '30px' }}>
            <a href="https://www.youtube.com/">
              <strong style={{ color: 'darkblue' }}>Youtube</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
