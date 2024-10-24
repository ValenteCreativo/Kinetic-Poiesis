'use client';
import Head from 'next/head';
import BodyPose from '../../../components/BodyPose';
import styles from '../BodyPose.module.css'; // Import styles
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}> {/* Apply container styles */}
      <Head>
        <title>Kinetic Poetry - Body Pose Detection</title>
      </Head>

      {/* Parallax background */}
      <div className={styles.backgroundImage}>
        <div className={styles.parallaxLayer1}>
          <img src="https://coral-near-warbler-359.mypinata.cloud/ipfs/QmPaGtEH16EwsopD4hBEY2wQnjLKzJRq7rnktyB67DY5J8" alt="Layer 1" className={styles.image} />
        </div>
        <div className={styles.parallaxLayer2}>
          <img src="/images/layer2.png" alt="Layer 2" className={styles.image} />
        </div>
      </div>

      <div className={styles.mainContent}>
        <h1 className={`${styles.mainTitle} ${styles.gradientText}`}>Body Pose Detection</h1>
        <p className={styles.description}>
          Experience the power of real-time human body pose detection with ML5.js and Next.js. 
          Our innovative technology allows you to interact with your movements like never before.
          <br /><br />
          Whether you're a dancer, athlete, or simply exploring your body's capabilities, our platform provides the tools to capture and analyze your poses seamlessly.
        </p>

        {/* Include the BodyPose component */}
        <div className={styles.buttonContainer}>
          <Link href="/StartDetection">
            <button className={styles.mainButton}>
              <span className={styles.buttonGlow}></span>
              Start Detection
            </button>
          </Link>

          <button className={styles.secondaryButton}>Learn More</button>
        </div>
      </div>

      <footer className={styles.footer}>
        <a href="/about" className={styles.link}>About Us</a>
        <span className={styles.footerText}> Join us in exploring the art of movement!</span>
      </footer>
    </div>
  );
}
