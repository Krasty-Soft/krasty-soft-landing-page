'use client'

import { Slide } from './slide';
import { Next, Prev, Dot } from './controls';
import useEmblaCarousel from "embla-carousel-react";
import React, {useCallback, useEffect, useState} from "react";

export const Slider = ({slides} : { slides: any[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi, setSelectedIndex]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index:number) => emblaApi && emblaApi.scrollTo(index), [
    emblaApi
  ]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
  }, [emblaApi, setScrollSnaps, onSelect]);
  return (
    <div className="relative">
      <div className="overflow-hidden mb-7" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={index} className="min-w-full flex-[0_0_100%]">
              <Slide slide={slide} />
            </div>
          ))}
        </div>
      </div>


      <div className="flex items-center gap-5">
        <Prev onClick={scrollPrev} enabled={prevBtnEnabled} />
        <div className="flex-grow flex gap-4">
          {scrollSnaps.map((_, index) => (
            <Dot
              key={index}
              selected={index === selectedIndex}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>

        <Next onClick={scrollNext} enabled={nextBtnEnabled} />
      </div>
    </div>
  )
}
