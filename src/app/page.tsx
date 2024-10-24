import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex items-center justify-center min-h-screen w-screen overflow-hidden bg-blue text-white">
      {/* Imagen de fondo con capas parallax */}
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        <Image
          src="https://coral-near-warbler-359.mypinata.cloud/ipfs/QmPaGtEH16EwsopD4hBEY2wQnjLKzJRq7rnktyB67DY5J8"
          alt="Kinetic Poiesis Background"
          layout="fill"
          objectFit="cover"
          className="parallax-layer parallax-background opacity-80"
        />
      </div>

      {/* Efecto Parallax */}
      <div className="absolute inset-0 z-[-2]">
        <div className="parallax-layer-1 opacity-30"></div>
        <div className="parallax-layer-2 opacity-40"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center gap-8 text-center p-8 sm:p-16 backdrop-blur-lg bg-opacity-20 bg-black rounded-lg shadow-2xl">
        {/* Título principal con animación */}
        <h1 className="text-5xl sm:text-7xl font-bold tracking-wide leading-tight animate-fadeInSlow">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#1E90FF]">
            Kinetic
          </span>{" "}
          Poiesis
        </h1>

        {/* Descripción con efecto animado suave */}
        <p className="text-lg sm:text-2xl max-w-2xl font-light animate-flowEffect">
          Transform your movement into art. Whether dancing, practicing yoga, or
          martial arts, your body becomes the brush to create unique kinetic
          poetry.
        </p>

        {/* Botón principal */}
        <Link href="/app" passHref>
          <button className="relative z-10 bg-gradient-to-r from-[#00FFFF] to-[#1E90FF] px-10 py-4 rounded-full text-lg font-semibold text-black hover:scale-110 transition-all duration-300 ease-in-out shadow-xl focus:ring focus:ring-[#00FFFF]">
            Launch App
            <span className="absolute -inset-1.5 bg-gradient-to-r from-[#00FFFF] to-[#1E90FF] blur-xl opacity-60 rounded-full animate-pulse"></span>
          </button>
        </Link>

        {/* Botón secundario */}
        <Link href="/mint" passHref>
          <button className="mt-6 text-sm px-6 py-3 border border-[#00FFFF] text-[#00FFFF] rounded-full hover:bg-[#00FFFF] hover:text-black transition-all duration-300">
            Mint Your Art
          </button>
        </Link>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 text-xs text-center opacity-60">
        © 2024 Kinetic Poiesis. Crafted with love for art and technology.
      </footer>
    </div>
  );
}
