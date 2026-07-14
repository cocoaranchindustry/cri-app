"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Carousel — Carrousel accessible (Brandbook CRI v6)
 *
 * Wrapper léger autour d'Embla Carousel avec :
 * - Boutons prev/next stylés brandbook
 * - Indicateurs de position (dots)
 * - Support autoplay
 * - Boucle optionnelle
 *
 * Usage :
 *   <Carousel options={{ loop: true, align: "start" }}>
 *     <CarouselItem>...</CarouselItem>
 *     <CarouselItem>...</CarouselItem>
 *   </Carousel>
 */

export interface CarouselProps {
  children: React.ReactNode;
  options?: Parameters<typeof useEmblaCarousel>[0];
  autoplay?: boolean;
  autoplayDelay?: number;
  className?: string;
  showArrows?: boolean;
  showDots?: boolean;
}

export const CarouselContext = React.createContext<{
  emblaApi: unknown;
  selectedIndex: number;
  scrollSnaps: number[];
  scrollTo: (idx: number) => void;
  prev: () => void;
  next: () => void;
  canPrev: boolean;
  canNext: boolean;
} | null>(null);

const useCarouselContext = () => {
  const ctx = React.useContext(CarouselContext);
  if (!ctx) throw new Error("Carousel components must be inside <Carousel>");
  return ctx;
};

export const Carousel: React.FC<CarouselProps> = ({
  children,
  options = { loop: false, align: "start" },
  autoplay = false,
  autoplayDelay = 5000,
  className,
  showArrows = true,
  showDots = true,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Autoplay
  React.useEffect(() => {
    if (!autoplay || !emblaApi) return;
    const id = setInterval(() => {
      if (emblaApi.canScrollNext()) emblaApi.scrollNext();
      else emblaApi.scrollTo(0);
    }, autoplayDelay);
    return () => clearInterval(id);
  }, [autoplay, autoplayDelay, emblaApi]);

  const ctx = React.useMemo(
    () => ({
      emblaApi,
      selectedIndex,
      scrollSnaps,
      scrollTo: (i: number) => emblaApi?.scrollTo(i),
      prev: () => emblaApi?.scrollPrev(),
      next: () => emblaApi?.scrollNext(),
      canPrev,
      canNext,
    }),
    [emblaApi, selectedIndex, scrollSnaps, canPrev, canNext]
  );

  return (
    <CarouselContext.Provider value={ctx}>
      <div className={cn("relative", className)}>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">{children}</div>
        </div>

        {showArrows && (
          <>
            <button
              type="button"
              onClick={ctx.prev}
              disabled={!canPrev}
              className={cn(
                "absolute left-0 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2",
                "flex h-12 w-12 items-center justify-center rounded-full",
                "bg-cri-parchment border-cri-cacao/30 text-cri-cacao shadow-cri-md border-2",
                "hover:bg-cri-cacao hover:text-cri-parchment transition-all hover:scale-110",
                "disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
              )}
              aria-label="Précédent"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={ctx.next}
              disabled={!canNext}
              className={cn(
                "absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1/2",
                "flex h-12 w-12 items-center justify-center rounded-full",
                "bg-cri-parchment border-cri-cacao/30 text-cri-cacao shadow-cri-md border-2",
                "hover:bg-cri-cacao hover:text-cri-parchment transition-all hover:scale-110",
                "disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
              )}
              aria-label="Suivant"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {showDots && scrollSnaps.length > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => ctx.scrollTo(i)}
                aria-label={`Aller au slide ${i + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === selectedIndex
                    ? "bg-cri-cacao w-8"
                    : "bg-cri-cacao/30 hover:bg-cri-cacao/60 w-2"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </CarouselContext.Provider>
  );
};

export const CarouselItem: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => <div className={cn("min-w-0 flex-[0_0_auto]", className)}>{children}</div>;

/* Hook exporté pour usage externe (au cas où) */
export { useCarouselContext };
