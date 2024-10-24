'use client';
import Head from 'next/head';
import BodyPose from '../../../components/BodyPose';
import styles from '../BodyPose.module.css'; // Importa los estilos

export default function Home() {
  return (
    <div className={styles.container}> {/* Aplica el estilo del contenedor */}
      <Head>
        <title>ML5.js Body Pose in Next.js</title>
      </Head>

      {/* Fondo con parallax */}
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
        <p className={styles.description}>Detect human body poses in real-time using ML5.js and Next.js</p>

        {/* Coloca el componente BodyPose */}
        <div className={styles.bodyPoseContainer}>
          <BodyPose />
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.mainButton}>
            <span className={styles.buttonGlow}></span>
            Start Detection
          </button>

          <button className={styles.secondaryButton}>Learn More</button>
        </div>
      </div>

      <footer className={styles.footer}>
        <a href="/about" className={styles.link}>About Us</a>
      </footer>
    </div>
  );
}
