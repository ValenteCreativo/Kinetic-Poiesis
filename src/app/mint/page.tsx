'use client';
import Head from 'next/head';
import styles from '../Mint.module.css'; // Asegúrate de crear este archivo CSS

const MintPage: React.FC = () => {
  const handleConnectWallet = (): void => {
    window.open('https://wallet.bitte.ai/account/new', '_blank');
  };

  const handleMintVideo = (): void => {
    window.open('https://www.mintbase.xyz/contract/arrow.mintbase1.near/mint', '_blank');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Mint Your Video as NFT</title>
      </Head>

      <div className={styles.mainContent}>
        <h1 className={styles.mainTitle}>Mint Your Video as NFT</h1>
        <p className={styles.description}>Upload your dance, yoga, or sports video and mint it as an NFT.</p>

        {/* Simulador de carga de video */}
        <input type="file" accept="video/*" className={styles.videoUploader} />
        
        <div className={styles.buttonContainer}>
          <button onClick={handleConnectWallet} className={styles.mainButton}>
            Connect Wallet
          </button>

          <button onClick={handleMintVideo} className={styles.secondaryButton}>
            Mint Video
          </button>
        </div>

        <footer className={styles.footer}>
          <p>Explore the marketplace for your minted NFTs.</p>
          <a href="/marketplace" className={styles.link}>Go to Marketplace</a>
        </footer>
      </div>
    </div>
  );
};

export default MintPage;
