import React, { useCallback } from 'react'
import { motion } from 'framer-motion'
import { trackEvent } from '../../hooks/useMetaPixel'

const HERO_IMAGE = 'https://media.base44.com/images/public/69f0b2d2311bacc339deb06a/187facbb2_generated_1fccdd8c.png'
const CTA_URL = 'https://pay.kiwify.com/QPHoen5'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
})

const scaleIn = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.8, delay: 0.1 },
}

export default function HeroSection() {
  const handleCTA = useCallback(() => trackEvent('InitiateCheckout'), [])

  return (
    <section id="hero" className="py-10 md:py-16">
      <div className="max-w-2xl mx-auto px-6 text-center">

        <motion.div {...fadeUp()} className="mb-4">
          <span className="font-heading text-3xl sm:text-4xl font-bold text-yellow-400 drop-shadow-lg tracking-wide uppercase">
            UNLOCKING KIDS SPEECH
          </span>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="block h-px w-12 bg-yellow-400/40" />
            <span className="font-body text-xs text-yellow-300/80 tracking-widest uppercase">Interactive Learning App</span>
            <span className="block h-px w-12 bg-yellow-400/40" />
          </div>
        </motion.div>

        <motion.div {...scaleIn} className="relative mx-auto w-full max-w-sm mb-8">
          <div className="absolute -inset-4 bg-primary/10 rounded-pebble-lg blur-3xl" />
          <img
            src={HERO_IMAGE}
            alt="Criança usando app educacional com sorriso"
            className="relative w-full aspect-[3/4] object-cover rounded-pebble-lg shadow-2xl"
            loading="eager"
            fetchpriority="high"
            decoding="async"
            width="400"
            height="533"
          />
        </motion.div>

        <motion.div {...fadeUp(0.2)} className="flex flex-wrap justify-center gap-3 mb-5">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-body text-sm font-medium px-4 py-2 rounded-pebble">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Ages 2–5
          </div>
          <div className="inline-flex items-center gap-2 bg-yellow-400/15 text-yellow-300 font-body text-sm font-semibold px-4 py-2 rounded-pebble border border-yellow-400/30">
            <span className="text-base" aria-hidden="true">🌎</span>
            Now with Bilingual Support! EN · PT
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.3)}>
          <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground leading-tight tracking-tight">
            Turn Screen Time into{' '}
            <span className="text-primary italic">Real Development</span>{' '}
            for Your Child.
          </h1>
          <p className="font-body text-base text-blue-200/80 mt-4 leading-relaxed">
            Helping your child find their voice with interactive play and daily evolution tracking.
            Switch between <strong className="text-yellow-300">English &amp; Portuguese</strong> with a single click.
          </p>
        </motion.div>

        <motion.div {...fadeUp(0.4)} className="mt-8">
          <a
            href={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCTA}
            className="bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-body font-bold text-base px-8 py-4 rounded-pebble animate-pulse-yellow inline-block text-center w-full sm:w-auto"
          >
            🚀 Unlock My Child's Potential
          </a>
        </motion.div>

      </div>
    </section>
  )
}
