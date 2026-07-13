import Link from "next/link";
import { ArrowRight, Sprout, Factory, Leaf, ShieldCheck } from "lucide-react";
import { KpiCard } from "@/components/ui/KpiCard";
import { SectionImpact } from "@/components/ui/SectionImpact";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

/**
 * Page d'accueil — Portail Public
 * Brandbook CRI v5 : dominante verte, or cacao, parchemin
 */

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main id="main">
        {/* ─────── HERO ─────── */}
        <section className="relative overflow-hidden bg-cri-gradient text-white">
          <div
            className="absolute inset-0 opacity-20 bg-feve-pattern pointer-events-none"
            aria-hidden="true"
          />
          <div className="container-cri relative py-20 md:py-32">
            <span className="inline-block bg-white/15 text-cri-gold-light text-label font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-6">
              Cameroun · Bassin du Mungo
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
              L&apos;agropole circulaire du cacao camerounais
            </h1>
            <p className="mt-6 text-lg md:text-xl text-cri-parchment max-w-2xl">
              Cacao premium <strong>zéro déforestation</strong>, provendes
              animales brevetées OAPI, traçabilité EUDR/CacaoTrace.
              Un modèle multi-revenus au service de 1 200 producteurs.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/projet" className="btn-gold group">
                Découvrir le projet
                <ArrowRight
                  className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/investisseurs"
                className="btn border-2 border-white text-white hover:bg-white hover:text-cri-forest"
              >
                Espace investisseurs
              </Link>
            </div>
          </div>
        </section>

        {/* ─────── KPIs ─────── */}
        <SectionImpact>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <KpiCard value={1200} label="Producteurs accompagnés" suffix="+" trend="up" />
            <KpiCard value={3200} label="Hectares bassin cacaoyer" suffix=" ha" />
            <KpiCard value={400} label="Tonnes cacao / an" suffix=" t" trend="up" />
            <KpiCard value={1.7} label="Chiffre d'affaires cible" suffix=" Md" />
          </div>
        </SectionImpact>

        {/* ─────── LES 2 PÔLES ─────── */}
        <section className="section-parchment">
          <div className="container-cri">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-label uppercase font-bold text-cri-cacao tracking-wider">
                Notre modèle
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl">Deux pôles, une circularité</h2>
              <p className="mt-4 text-lg text-cri-humus">
                Nous valorisons 100 % des sous-produits du cacao — fèves,
                cabosses, biomasse — dans une logique d&apos;économie circulaire.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Pôle 1 */}
              <article className="card hover:shadow-cri-lg">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cri-forest text-white mb-6">
                  <Sprout className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="text-2xl">🏭 Pôle 1 — Cacao Premium</h3>
                <p className="mt-3 text-cri-humus">
                  Collecte, fermentation et séchage de fèves premium auprès de
                  1 200 producteurs sur 6 villages du bassin de Bouba.
                </p>
                <ul className="mt-6 space-y-2 text-sm text-cri-humus">
                  <li className="flex items-start">
                    <span className="text-cri-gold mr-2">✓</span>
                    Qualité « zéro défaut »
                  </li>
                  <li className="flex items-start">
                    <span className="text-cri-gold mr-2">✓</span>
                    Traçabilité blockchain + QR Code
                  </li>
                  <li className="flex items-start">
                    <span className="text-cri-gold mr-2">✓</span>
                    Rémunération producteur &gt; 50 % du prix FOB
                  </li>
                </ul>
                <Link
                  href="/activites/cacao"
                  className="mt-6 inline-flex items-center text-cri-cacao hover:text-cri-gold font-bold"
                >
                  En savoir plus <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </article>

              {/* Pôle 2 */}
              <article className="card hover:shadow-cri-lg">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cri-cacao text-white mb-6">
                  <Factory className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="text-2xl">🐔 Pôle 2 — Provenderie &amp; Ferme</h3>
                <p className="mt-3 text-cri-humus">
                  Valorisation des cabosses de cacao en aliments pour bétail
                  « CRI-PROVEND CACAO » — formulation protégée par brevet{" "}
                  <strong>OAPI</strong>.
                </p>
                <ul className="mt-6 space-y-2 text-sm text-cri-humus">
                  <li className="flex items-start">
                    <span className="text-cri-gold mr-2">✓</span>
                    Provende poulet de chair
                  </li>
                  <li className="flex items-start">
                    <span className="text-cri-gold mr-2">✓</span>
                    Provende porc d&apos;engraissement
                  </li>
                  <li className="flex items-start">
                    <span className="text-cri-gold mr-2">✓</span>
                    -15 % vs marché · -20-30 % pour l&apos;éleveur final
                  </li>
                </ul>
                <Link
                  href="/activites/provendes"
                  className="mt-6 inline-flex items-center text-cri-cacao hover:text-cri-gold font-bold"
                >
                  En savoir plus <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            </div>
          </div>
        </section>

        {/* ─────── ENGAGEMENT RSE ─────── */}
        <section className="section bg-cri-forest text-white">
          <div className="container-cri text-center">
            <Leaf className="h-16 w-16 mx-auto text-cri-gold" aria-hidden="true" />
            <h2 className="mt-6 text-white text-3xl md:text-4xl">
              Zéro déforestation, zéro déchet, zéro CO₂
            </h2>
            <p className="mt-4 text-cri-parchment max-w-2xl mx-auto">
              Notre engagement RSE est adossé au programme CIMAR-Technopôle :
              promotion de l&apos;agroécologie, formation-insertion des jeunes
              et des femmes, diffusion des bio-intrants.
            </p>
            <div className="mt-10 grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: ShieldCheck,
                  title: "Conformité EUDR",
                  text: "Traçabilité parcelle → conteneur, géoloc ≥ 6 décimales",
                },
                {
                  icon: Leaf,
                  title: "100 % circulaire",
                  text: "Cabosses, biomasse, biofertilisants : tout est valorisé",
                },
                {
                  icon: Sprout,
                  title: "Impact social",
                  text: "1 200 producteurs, insertion jeunes et femmes",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-cri border border-white/15"
                >
                  <item.icon
                    className="h-8 w-8 mx-auto text-cri-gold"
                    aria-hidden="true"
                  />
                  <h3 className="mt-3 text-white text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm text-cri-parchment">{item.text}</p>
                </div>
              ))}
            </div>
            <Link
              href="/impact"
              className="mt-12 inline-flex btn-gold items-center"
            >
              Lire notre rapport d&apos;impact
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* ─────── CTA INVESTISSEURS ─────── */}
        <section className="section-parchment">
          <div className="container-cri">
            <div className="card bg-cri-gradient text-white text-center p-12">
              <h2 className="text-white text-3xl md:text-4xl">
                Investissez dans le cacao africain durable
              </h2>
              <p className="mt-4 text-cri-parchment max-w-2xl mx-auto">
                3,2 Md FCFA de financement recherché sur 2026-2030 pour un
                projet mature, différencié et bankable. Accédez à notre data
                room sécurisée.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/investisseurs"
                  className="btn-gold"
                >
                  Demander l&apos;accès investisseur
                </Link>
                <Link
                  href="/contact"
                  className="btn border-2 border-white text-white hover:bg-white hover:text-cri-forest"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
