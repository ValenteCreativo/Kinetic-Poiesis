'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import styles from './page.module.css'; // Usamos el CSS modular

export default function Home() {
  useEffect(() => {
    const parallaxLayer1 = document.querySelector(`.${styles.parallaxLayer1}`) as HTMLElement;
    const parallaxLayer2 = document.querySelector(`.${styles.parallaxLayer2}`) as HTMLElement;

    if (parallaxLayer1 && parallaxLayer2) {
      parallaxLayer1.style.transform = "translateY(-10%)";
      parallaxLayer2.style.transform = "translateY(-20%)";
    }
  }, []);

  return (
    <div className={`${styles.container} relative flex items-center justify-center min-h-screen w-screen overflow-hidden`}>
      {/* Imagen de fondo con capas parallax */}
      <div className={`${styles.backgroundImage} absolute inset-0 z-[-1]`}>
        <Image
          src="https://coral-near-warbler-359.mypinata.cloud/ipfs/QmPaGtEH16EwsopD4hBEY2wQnjLKzJRq7rnktyB67DY5J8"
          alt="Kinetic Poiesis Background"
          layout="fill"
          objectFit="cover"
          className={`${styles.image}`}
        />
      </div>

      {/* Efecto Parallax */}
      <div className="absolute inset-0 z-[-2]">
        <div className={`${styles.parallaxLayer1} opacity-30`}></div>
        <div className={`${styles.parallaxLayer2} opacity-40`}></div>
      </div>

      {/* Contenido principal */}
      <div className={`${styles.mainContent} relative z-10 flex flex-col items-center gap-8 text-center`}>
        {/* Título principal con animación */}
        <h1 className={`${styles.mainTitle} text-5xl sm:text-7xl font-bold`}>
          <span className={styles.gradientText}>
            Kinetic
          </span>{" "}
          Poiesis
        </h1>

        {/* Descripción con efecto animado suave */}
        <p className={`${styles.description} text-lg sm:text-2xl max-w-2xl font-light`}>
          Transform your movement into art. Whether dancing, practicing yoga, or
          martial arts, your body becomes the brush to create unique kinetic
          poetry.
        </p>

        {/* Botón principal */}
        <Link href="/app" passHref>
          <button className={`${styles.mainButton} relative z-10`}>
            Launch App
            <span className={styles.buttonGlow}></span>
          </button>
        </Link>

        {/* Botón secundario */}
        <Link href="/mint" passHref>
          <button className={`${styles.secondaryButton}`}>
            Mint Your Art
          </button>
        </Link>
      </div>

      {/* Footer */}
      <footer className={`${styles.footer}`}>
        © 2024 Kinetic Poiesis. Crafted with love for art and technology.
      </footer>
    </div>
  );
}
