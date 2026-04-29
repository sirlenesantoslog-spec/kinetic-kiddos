import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Shield, Check, Sparkles } from 'lucide-react'
import { trackEvent } from '../../hooks/useMetaPixel'

const INCLUDES = [
  'Logic & Discovery games',
  'Motor Skills activities',
  'Language & Storytelling library',
  'Brain-Boosting Quizzes',
  'PDF Progress Reports',
  'Printable Worksheets',
  'Healthy Recipes bonus',
  '7-Day Money-Back Guarantee',
]

const CTA_URL = 'https://pay.kiwify.com/QPHoen5'

export default function PricingSection() {
  const [ripple, setRipple] = useState(false)

  const handleCTA = useCallback(() => {
    trackEvent('InitiateCheckout')
    setRipple(true)
    setTimeout(() => setRipple(false), 800)
  }, [])

  return (
    <section id="pricing" className="py-24 md:py-32 relative">
      {ripple && (
        <motion.div initial={{ scale: 0, opacity: 0.3 }} animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center" aria-hidden="true">
          <div className="w-64 h-64 rounded-full bg-yellow-400/20" />
        </motion.div>
      )}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="max-w-xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
            <div className="relative inline-flex items-center justify-center w-32 h-32">
              <svg viewBox="0 0 120 120" className="w-32 h-32 animate-slow-spin absolute inset-0" aria-hidden="true">
                <defs><path id="circle-text" d="M 60,60 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" /></defs>
                <text className="font-body" fontSize="9" fill="hsl(var(--primary))" opacity="0.5" letterSpacing="4">
                  <textPath href="#circle-text">★ RISK FREE ★ GUARANTEED ★ &nbsp;</textPath>
                </text>
              </svg>
              <Shield className="w-10 h-10 text-primary relative z-10" aria-hidden="true" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-blue-800/40 border border-blue-600/30 rounded-pebble-lg p-10 md:p-14 shadow-xl shadow-blue-900/50 backdrop-blur-md">
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground">Get Full Access Today</h2>
            <div className="mt-8 mb-2">
              <span className="font-heading text-7xl sm:text-8xl font-bold text-foreground">$47</span>
            </div>
            <p className="font-body text-sm text-muted-foreground">One-time payment · Lifetime access</p>
            <ul className="mt-8 text-left space-y-3" aria-label="What's included">
              {INCLUDES.map((item) => (
                <li key={item} className="flex items-center gap-3 font-body text-base text-foreground">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />{item}
                </li>
              ))}
            </ul>
            <div className="mt-10 space-y-3">
              <a href={CTA_URL} target="_blank" rel="noopener noreferrer" onClick={handleCTA}
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-body font-bold text-lg px-8 py-5 rounded-pebble flex items-center justify-center gap-2 animate-pulse-yellow">
                <Sparkles className="w-5 h-5" aria-hidden="true" />🚀 Get Started Today
              </a>
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground font-body text-sm">
              <Shield className="w-4 h-4" aria-hidden="true" />7-Day Money-Back Guarantee · No questions asked
            </div>
            <div className="mt-5 border-t border-blue-600/20 pt-5 space-y-2 text-center">
              <div className="flex items-center justify-center gap-2 font-body text-xs text-blue-200/70">
                <Shield className="w-3.5 h-3.5 text-green-400 flex-shrink-0" aria-hidden="true" />
                <span><strong className="text-green-400">Safe &amp; Secure</strong> 256-bit SSL Encrypted Checkout</span>
              </div>
              <p className="font-body text-xs text-blue-200/70">
                We accept all major international credit cards · <strong className="text-white">One-time payment only — no subscriptions, ever.</strong>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
