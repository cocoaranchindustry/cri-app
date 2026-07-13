import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center container-cri py-16">
      <div className="text-center max-w-lg">
        <h1 className="text-7xl text-cri-gold">404</h1>
        <h2 className="mt-4 text-2xl text-cri-forest">Page introuvable</h2>
        <p className="mt-4 text-cri-humus">
          La page que vous cherchez n&apos;existe pas ou a été déplacée.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn bg-cri-forest text-white hover:bg-cri-canopy">
            <Home className="mr-2 h-5 w-5" aria-hidden="true" />
            Retour à l&apos;accueil
          </Link>
          <Link href="/contact" className="btn border-2 border-cri-cacao text-cri-cacao hover:bg-cri-cacao hover:text-white">
            <ArrowLeft className="mr-2 h-5 w-5" aria-hidden="true" />
            Nous contacter
          </Link>
        </div>
      </div>
    </main>
  );
}
