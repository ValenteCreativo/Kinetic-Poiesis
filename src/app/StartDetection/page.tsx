'use client';
import Head from 'next/head';
import BodyPose from '../../../components/BodyPose'; // Adjust the path as necessary
import styles from '../BodyPose.module.css'; // Import styles for BodyPose

const StartDetection: React.FC = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Body Pose Detection</title>
      </Head>

      <div className={styles.mainContent}>
        <h1 className={styles.mainTitle}>Body Pose Detection</h1>
        <div className={styles.bodyPoseContainer}>
          <BodyPose />
        </div>
      </div>
    </div>
  );
};

export default StartDetection;
