'use client';
import Head from 'next/head';
import styles from '../Mint.module.css'; // Ensure this CSS file is created

const MintPage: React.FC = () => {
  const handleConnectWallet = (): void => {
    window.open('https://wallet.bitte.ai/account/new', '_blank');
  };

  const handleMintVideo = (): void => {
    window.open('https://www.mintbase.xyz/contract/arrow.mintbase1.near/nfts/all/0', '_blank');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Mint Your Video as NFT</title>
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
        <h1 className={styles.mainTitle}>Mint Your Video as an NFT</h1>
        <p className={styles.description}>
          Turn your dance, yoga, or sports video into a unique NFT! 
          Upload your creation and let your movement be immortalized on the blockchain.
        </p>

        {/* Video upload simulator */}
        <input type="file" accept="video/*" className={styles.videoUploader} />

        <div className={styles.buttonContainer}>
          <button onClick={handleConnectWallet} className={styles.mainButton}>
            Connect Your Wallet
          </button>

          <button onClick={handleMintVideo} className={styles.secondaryButton}>
            Mint My Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default MintPage;
