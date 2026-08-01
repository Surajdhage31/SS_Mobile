import { useEffect, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { heroSlides, storeInfo } from '../../data/store.js';

const AUTO_SLIDE_MS = 5000;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((next) => {
    setDirection(next > index || (index === heroSlides.length - 1 && next === 0) ? 1 : -1);
    setIndex(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const next = useCallback(() => goTo((index + 1) % heroSlides.length), [goTo, index]);
  const prev = useCallback(() => goTo((index - 1 + heroSlides.length) % heroSlides.length), [goTo, index]);

  useEffect(() => {
    const timer = setInterval(next, AUTO_SLIDE_MS);
    return () => clearInterval(timer);
  }, [next]);

  const slide = heroSlides[index];

  return (
    <section className="relative mx-4 mt-4 overflow-hidden rounded-3xl bg-gradient-to-br from-primary-light to-white sm:mx-6">
      <div className="grid gap-8 px-6 py-10 sm:px-10 sm:py-14 md:grid-cols-2 md:items-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 40 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="eyebrow"
            >
              {slide.eyebrow}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-4xl lg:text-5xl"
            >
              {slide.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 max-w-md text-sm text-muted sm:text-base"
            >
              {slide.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-6 flex flex-wrap gap-3"
            >
              <Link to="/shop" className="btn-primary">
                {slide.cta}
              </Link>
              <a href="#deals" className="btn-secondary">
                View deals
              </a>
            </motion.div>

            <div className="mt-8 flex flex-wrap gap-6 text-sm">
              <div>
                <strong className="block text-lg text-ink">{storeInfo.outlets}</strong>
                <span className="text-muted">Outlets</span>
              </div>
              <div>
                <strong className="block text-lg text-ink">{storeInfo.rating}</strong>
                <span className="text-muted">Customer rating</span>
              </div>
              <div>
                <strong className="block text-lg text-ink">Same day</strong>
                <span className="text-muted">Delivery in city</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-soft">
          <AnimatePresence mode="wait">
            <motion.img
              key={slide.id}
              src={slide.image}
              alt={slide.title}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5 }}
              className="h-full w-full object-cover"
            />
          </AnimatePresence>
        </div>
      </div>

      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/90 p-2.5 shadow-card hover:bg-white sm:block"
      >
        <FiChevronLeft />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/90 p-2.5 shadow-card hover:bg-white sm:block"
      >
        <FiChevronRight />
      </button>

      <div className="flex justify-center gap-2 pb-5">
        {heroSlides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-primary' : 'w-1.5 bg-primary/30'}`}
          />
        ))}
      </div>
    </section>
  );
}
