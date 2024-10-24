'use client'
import Head from 'next/head';
import BodyPose from '../../../components/BodyPose';

export default function Home() {
  return (
    <div>
      <Head>
        <title>ML5.js Body Pose in Next.js</title>
      </Head>
      <h1>Body Pose Detection</h1>
      <BodyPose />
    </div>
  );
}
