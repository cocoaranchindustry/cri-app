/**
 * Seed initial pour Firestore — Cocoa Ranch & Industry
 *
 * Peuple les collections publiques avec du contenu prêt pour le lancement :
 * - articles (8 articles : communiqués, études, événements, médias)
 * - products (4 produits : fèves, provendes, poulets, porcs)
 * - impactKpis (8 KPIs institutionnels)
 * - settings/public (coordonnées, mentions, social links)
 *
 * ⚠️  Les collections "producers", "parcels", "lots", "transactions" sont
 * volontairement NON seedées ici : elles doivent être remplies par les
 * enquêteurs terrain avec consentement RGPD.
 *
 * Usage : node scripts/seed-firestore.mjs [--dry-run]
 *   --dry-run : affiche ce qui serait créé sans écrire dans Firestore
 */

import { config as loadDotenv } from "dotenv";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ENV_PATH = resolve(__dirname, "../.env.production");
const DRY_RUN = process.argv.includes("--dry-run");

if (!existsSync(ENV_PATH)) {
  console.error(`❌ .env.production introuvable à : ${ENV_PATH}`);
  process.exit(1);
}
loadDotenv({ path: ENV_PATH });
console.log(`✅ .env.production chargé (${DRY_RUN ? "DRY-RUN" : "MODE ÉCRITURE"})\n`);

// Init Admin SDK
initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});
const db = getFirestore();
db.settings({ ignoreUndefinedProperties: true });

// =============================================================================
// SEED DATA
// =============================================================================

const ARTICLES = [
  {
    id: "levée-1-2-milliards-2026",
    title: "CRI lève 1,2 Md FCFA pour son premier closing",
    slug: "levee-1-2-milliards-2026",
    excerpt:
      "L'agropole Cocoa Ranch & Industry boucle son premier tour de table avec un pool d'investisseurs panafricains et un fonds européen spécialisé.",
    body: "Communiqué officiel de levée — détails financiers, gouvernance, perspectives.",
    category: "Communiqués",
    status: "published",
    publishedAt: new Date("2026-06-12T10:00:00Z"),
    author: "Direction CRI",
    coverImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&q=80",
    tags: ["levée", "investissement", "impact"],
  },
  {
    id: "etude-impact-provend-2026",
    title: "Étude : impact du brevet CRI-PROVEND CACAO sur la filière porcine camerounaise",
    slug: "etude-impact-provend-cacao-2026",
    excerpt:
      "Notre étude de terrain, menée en partenariat avec l'IRAD, démontre une réduction de 18 % du coût d'alimentation des élevages familiaux.",
    body: "Résumé exécutif, méthodologie, résultats clés, perspectives de passage à l'échelle.",
    category: "Études",
    status: "published",
    publishedAt: new Date("2026-05-04T09:00:00Z"),
    author: "Dr. A. Mbarga — IRAD",
    coverImage: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=1200&q=80",
    tags: ["provend", "porc", "IRAD", "étude"],
  },
  {
    id: "sara-2026-abidjan",
    title: "Salon SARA 2026 : CRI présente son modèle à Abidjan",
    slug: "sara-2026-abidjan",
    excerpt:
      "Retrouvez-nous du 22 au 25 mai au Salon International de l'Agriculture et des Ressources Animales d'Abidjan, stand B-42.",
    body: "Programme, démonstrations, contacts sur place.",
    category: "Événement",
    status: "published",
    publishedAt: new Date("2026-04-22T08:00:00Z"),
    author: "Équipe communication",
    coverImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80",
    tags: ["SARA", "Abidjan", "événement"],
  },
  {
    id: "premiere-livraison-cacaotrace",
    title: "Première livraison pilote de 12 t de fèves CacaoTrace",
    slug: "premiere-livraison-cacaotrace",
    excerpt:
      "Nos premiers conteneurs de fèves tracées sont en route vers Amsterdam pour un torréfacteur européen partenaire.",
    body: "Détails sur la traçabilité, le partenaire torréfacteur, les certifications.",
    category: "Communiqués",
    status: "published",
    publishedAt: new Date("2026-03-08T11:00:00Z"),
    author: "Direction commerciale",
    coverImage: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=1200&q=80",
    tags: ["CacaoTrace", "EUDR", "export"],
  },
  {
    id: "forbes-africa-2026",
    title: "CRI dans le magazine Forbes Africa",
    slug: "forbes-africa-2026",
    excerpt:
      "Notre agropole figure dans le top 10 des « Agritech africaines à suivre en 2026 » selon Forbes Africa.",
    body: "Couverture médiatique et retombées.",
    category: "Média",
    status: "published",
    publishedAt: new Date("2026-02-14T10:00:00Z"),
    author: "Revue de presse",
    coverImage: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1200&q=80",
    tags: ["presse", "Forbes", "reconnaissance"],
  },
  {
    id: "lancement-usine-sechage",
    title: "Lancement opérationnel du ranch et de l'usine de séchage",
    slug: "lancement-usine-sechage",
    excerpt:
      "Après 18 mois de travaux, l'usine de séchage de Njombé entre en service. 1 200 producteurs sont encadrés dès le premier trimestre.",
    body: "Détails techniques, capacité, retombées sociales.",
    category: "Communiqués",
    status: "published",
    publishedAt: new Date("2026-01-01T09:00:00Z"),
    author: "Direction CRI",
    coverImage: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1200&q=80",
    tags: ["lancement", "usine", "Njombé"],
  },
  {
    id: "brevet-oapi-2022",
    title: "Notre provende brevetée OAPI — 20 ans de protection",
    slug: "brevet-oapi-2022",
    excerpt:
      "Le brevet CRI-PROVEND CACAO a été délivré par l'OAPI en 2022. Plongée dans la R&D qui a mené à cette innovation.",
    body: "Historique R&D, formulation, avantages concurrentiels.",
    category: "Études",
    status: "published",
    publishedAt: new Date("2025-12-15T10:00:00Z"),
    author: "Cellule R&D",
    coverImage: "https://images.unsplash.com/photo-1620004085588-a982825a5327?w=1200&q=80",
    tags: ["brevet", "OAPI", "R&D"],
  },
  {
    id: "engagement-rgpd-antic",
    title: "Notre engagement RGPD & ANTIC Cameroun",
    slug: "engagement-rgpd-antic",
    excerpt:
      "CRI s'engage formellement à respecter le Règlement Général sur la Protection des Données et les directives de l'ANTIC Cameroun.",
    body: "Cadre juridique, mesures techniques, droits des personnes.",
    category: "Communiqués",
    status: "published",
    publishedAt: new Date("2025-11-20T09:00:00Z"),
    author: "DPO CRI",
    coverImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80",
    tags: ["RGPD", "ANTIC", "conformité"],
  },
];

const PRODUCTS = [
  {
    id: "feves-cacao-premium",
    name: "Fèves de cacao premium CacaoTrace",
    slug: "feves-cacao-premium",
    category: "Cacao",
    shortDescription:
      "Fèves fermentées 7 jours, séchées solaire 8-10 jours, taux d'humidité 6,5 %.",
    longDescription:
      "Issue de l'agropole de Njombé, notre cacao premium CacaoTrace est tracé de la parcelle au conteneur. Conformité EUDR, Rainforest Alliance et analyses pesticides/métaux lourds systématiques.",
    pricePerKgXAF: 4500,
    minOrderKg: 1000,
    certifications: ["EUDR", "Rainforest Alliance", "CacaoTrace"],
    images: [
      "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=1200&q=80",
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "provend-poulets",
    name: "CRI-PROVEND CACAO Poulets",
    slug: "cri-provend-cacao-poulets",
    category: "Provendes",
    shortDescription:
      "Aliment complet pour poulets de chair, cycle 0-45 jours. -15 % vs marché local.",
    longDescription:
      "Formulation brevetée OAPI à base de cabosses de cacao broyées, soja local et tourteau de palme. Réduction du coût d'alimentation de 30 % pour l'éleveur final.",
    pricePerKgXAF: 350,
    minOrderKg: 1000,
    certifications: ["Brevet OAPI 2022"],
    images: [
      "https://images.unsplash.com/photo-1620004085588-a982825a5327?w=1200&q=80",
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "provend-porcs",
    name: "CRI-PROVEND CACAO Porcs",
    slug: "cri-provend-cacao-porcs",
    category: "Provendes",
    shortDescription:
      "Aliment complet pour porcs d'engraissement, cycle 0-180 jours.",
    longDescription:
      "Même formulation brevetée, dosage adapté au cycle porc. Économie circulaire : valorisation des cabosses en intrant à forte valeur.",
    pricePerKgXAF: 320,
    minOrderKg: 1000,
    certifications: ["Brevet OAPI 2022"],
    images: [
      "https://images.unsplash.com/photo-1593179449456-39a7b1d92b3a?w=1200&q=80",
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "poulets-chair-ferme",
    name: "Poulets de chair — Ferme intégrée Njombé",
    slug: "poulets-chair-ferme",
    category: "Élevage",
    shortDescription:
      "Poulets de chair souche Cobb 500, alimentés CRI-PROVEND CACAO Poulets. Cycle 45 jours.",
    longDescription:
      "Élevage en plein air, traçabilité RFID animal par animal, abattage à la ferme sur commande. Commercialisation en circuit court (Bafoussam, Douala, Yaoundé).",
    pricePerKgXAF: 2800,
    minOrderKg: 10,
    certifications: ["Sans antibiotiques", "Traçabilité RFID"],
    images: [
      "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=1200&q=80",
    ],
    inStock: true,
    featured: false,
  },
];

const IMPACT_KPIS = [
  {
    id: "producteurs-accompagnes",
    label: "Producteurs accompagnés",
    value: 1200,
    unit: "",
    icon: "users",
    color: "cri-cacao",
    description: "6 villages du Bassin du Mungo, dont 40 % de femmes",
    order: 1,
  },
  {
    id: "hectares-agroforestiers",
    label: "Hectares agroforestiers",
    value: 200,
    unit: "ha",
    icon: "leaf",
    color: "cri-canopy",
    description: "Cacaoyers cultivés en agroforesterie",
    order: 2,
  },
  {
    id: "capacite-sechage",
    label: "Capacité de séchage",
    value: 450,
    unit: "t/an",
    icon: "trending-up",
    color: "cri-oro",
    description: "Fèves premium séchées à Njombé",
    order: 3,
  },
  {
    id: "part-prix-producteur",
    label: "Part du prix FOB au producteur",
    value: 50,
    unit: "%",
    icon: "handshake",
    color: "cri-cacao",
    description: "Vs 40 % en moyenne sur le marché conventionnel",
    order: 4,
  },
  {
    id: "reduction-cout-aliment",
    label: "Réduction coût d'alimentation",
    value: 30,
    unit: "%",
    icon: "trending-down",
    color: "cri-canopy",
    description: "Pour les éleveurs utilisateurs de CRI-PROVEND CACAO",
    order: 5,
  },
  {
    id: "poulets-par-an",
    label: "Poulets de chair produits",
    value: 15000,
    unit: "/an",
    icon: "drumstick",
    color: "cri-oro",
    description: "Ferme intégrée, cycle 45 jours",
    order: 6,
  },
  {
    id: "biofertilisant",
    label: "Biofertilisant valorisé",
    value: 120,
    unit: "t/an",
    icon: "recycle",
    color: "cri-canopy",
    description: "Fientes compostées vendues aux cacaoyers",
    order: 7,
  },
  {
    id: "brevets-actifs",
    label: "Brevets actifs",
    value: 1,
    unit: "",
    icon: "award",
    color: "cri-cacao",
    description: "CRI-PROVEND CACAO — OAPI 2022 — 20 ans",
    order: 8,
  },
];

const SETTINGS_PUBLIC = {
  id: "site",
  contact: {
    email: "contact@cocoaranchindustry.cloud",
    phone: "+237 6 XX XX XX XX",
    address: "Agropole de Njombé, Bassin du Mungo, Cameroun",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/cocoa-ranch-industry",
    twitter: "https://twitter.com/cocoaranch_industry",
    facebook: "https://www.facebook.com/cocoaranchindustry",
  },
  legal: {
    siren: "En cours d'immatriculation",
    vatNumber: "Non applicable",
    form: "SAS",
    capital: "À fixer au prochain closing",
  },
  seo: {
    defaultTitle: "Cocoa Ranch & Industry — Agropole intégrée au Cameroun",
    defaultDescription:
      "Première agropole intégrée du Cameroun : cacao premium tracé, provendes brevetées, ferme intégrée. 1 200 producteurs encadrés, 200 ha agroforestiers.",
    defaultImage:
      "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=1200&q=80",
  },
  updatedAt: FieldValue.serverTimestamp(),
};

// =============================================================================
// SEED LOOP
// =============================================================================

async function seedCollection(name, docs, transform) {
  console.log(`\n📦 ${name} — ${docs.length} document(s)`);
  for (const item of docs) {
    const id = item.id;
    const data = transform ? transform(item) : { ...item };
    delete data.id;
    if (DRY_RUN) {
      console.log(`   [DRY] ${name}/${id} → ${Object.keys(data).length} champs`);
    } else {
      await db.collection(name).doc(id).set(data, { merge: true });
      console.log(`   ✅ ${name}/${id}`);
    }
  }
}

async function main() {
  console.log("═══════════════════════════════════════════════════════════");
  console.log(`  🌱 Seed Firestore ${DRY_RUN ? "(DRY-RUN)" : "— Cocoa Ranch & Industry"}`);
  console.log("═══════════════════════════════════════════════════════════");

  await seedCollection("articles", ARTICLES, (a) => ({
    ...a,
    publishedAt: a.publishedAt,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  }));

  await seedCollection("products", PRODUCTS, (p) => ({
    ...p,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  }));

  await seedCollection("impactKpis", IMPACT_KPIS, (k) => ({
    ...k,
    updatedAt: FieldValue.serverTimestamp(),
  }));

  // Settings = single document
  console.log(`\n⚙️  settings/public — 1 document`);
  if (DRY_RUN) {
    console.log(`   [DRY] settings/public/site → ${Object.keys(SETTINGS_PUBLIC).length} champs`);
  } else {
    await db.collection("settings").doc("public").collection("site").doc("main").set(SETTINGS_PUBLIC, { merge: true });
    console.log(`   ✅ settings/public/site/main`);
  }

  console.log("\n═══════════════════════════════════════════════════════════");
  console.log(
    DRY_RUN
      ? "  🔍 DRY-RUN terminé — relancer sans --dry-run pour écrire"
      : "  🎉 SEED TERMINÉ — Collections peuplées"
  );
  console.log("═══════════════════════════════════════════════════════════");
  process.exit(0);
}

main().catch((err) => {
  console.error("\n❌ Erreur fatale :", err);
  process.exit(1);
});
