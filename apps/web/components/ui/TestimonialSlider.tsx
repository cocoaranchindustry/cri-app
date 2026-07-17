"use client";

import * as React from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import { GlassCard } from "./GlassCard";

/**
 * TestimonialSlider — Carrousel de témoignages producteurs/éleveurs
 *
 * Carousel horizontal avec autoplay, navigation par flèches et dots.
 * Témoignages de producteurs, éleveuses, jeunes insérés.
 * Glassmorphism sur fond gradient.
 */
const TESTIMONIALS = [
  {
    quote:
      "Grâce à la coopérative CRI, j'ai pu tripler ma production de cacao en 3 ans tout en préservant la forêt. Mes enfants iront à l'université.",
    author: "Marie NGO BIYIHA",
    role: "Productrice",
    location: "Njombé-Penja",
    years: "32 ans d'expérience",
    avatar: "M",
    color: "cacao",
  },
  {
    quote:
      "La formation CacaoTrace et l'appui technique de CRI ont transformé ma plantation en modèle d'agroforesterie. Mon cacao est aujourd'hui acheté 60 % au-dessus du prix bord-champ.",
    author: "Pierre ESSOMBA",
    role: "Producteur",
    location: "Village Ekombité",
    years: "18 ha en agroforesterie",
    avatar: "P",
    color: "canopy",
  },
  {
    quote:
      "Les provendes CRI-PROVEND CACAO ont réduit mes coûts d'élevage de 15 % tout en améliorant la qualité de ma chair de poulet. Un modèle à dupliquer.",
    author: "Sylvie MVONDO",
    role: "Éleveuse",
    location: "Njombé",
    years: "5 000 poulets/an",
    avatar: "S",
    color: "gold",
  },
  {
    quote:
      "Le programme d'insertion de CRI m'a permis de me former à la cacaoculture bio. Aujourd'hui, je gère ma propre parcelle certifiée.",
    author: "Junior KAMGA",
    role: "Jeune inséré",
    location: "Coopérative de Tombel",
    years: "24 ans",
    avatar: "J",
    color: "canopy",
  },
];

const colorMap = {
  cacao: "bg-cri-cacao text-cri-text-on-dark",
  canopy: "bg-cri-canopy text-cri-text-on-dark",
  gold: "bg-cri-gold text-cri-forest",
};

export const TestimonialSlider: React.FC<{ className?: string }> = ({ className }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = React.useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  return (
    <div className={cn("relative", className)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {TESTIMONIALS.map((t, i) => {
            const avatarClass = colorMap[t.color as keyof typeof colorMap];
            return (
              <div
                key={i}
                className="min-w-0 flex-[0_0_100%] md:flex-[0_0_60%] lg:flex-[0_0_45%]"
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} sur ${TESTIMONIALS.length}`}
              >
                <GlassCard variant="default" className="flex h-full flex-col justify-between p-8">
                  <div>
                    <Quote className="text-cri-gold/40 mb-4 h-10 w-10" aria-hidden="true" />
                    <p className="text-cri-humus font-serif text-lg italic leading-relaxed md:text-xl">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                  <div className="mt-8 flex items-center gap-4">
                    <div
                      className={cn(
                        "flex h-14 w-14 items-center justify-center rounded-full font-serif text-2xl font-bold",
                        avatarClass
                      )}
                      aria-hidden="true"
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-cri-forest font-serif text-lg font-bold">{t.author}</p>
                      <p className="text-cri-ink-muted text-sm">
                        {t.role} · {t.location}
                      </p>
                      <p className="text-cri-cacao mt-0.5 text-xs font-medium">{t.years}</p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={scrollPrev}
          className="bg-cri-parchment border-cri-moss/40 text-cri-forest hover:bg-cri-canopy hover:text-cri-text-on-dark focus-visible:ring-cri-gold flex h-11 w-11 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2"
          aria-label="Témoignage précédent"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={cn(
                "focus-visible:ring-cri-gold h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2",
                i === selectedIndex ? "bg-cri-cacao w-8" : "bg-cri-moss/40 hover:bg-cri-moss w-2"
              )}
              aria-label={`Aller au témoignage ${i + 1}`}
              aria-current={i === selectedIndex}
            />
          ))}
        </div>

        <button
          onClick={scrollNext}
          className="bg-cri-parchment border-cri-moss/40 text-cri-forest hover:bg-cri-canopy hover:text-cri-text-on-dark focus-visible:ring-cri-gold flex h-11 w-11 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2"
          aria-label="Témoignage suivant"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
