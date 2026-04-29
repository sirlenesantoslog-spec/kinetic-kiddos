import React, { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, RotateCcw, Sparkles } from 'lucide-react'
import { trackEvent } from '../../hooks/useMetaPixel'

const QUESTIONS = [
  { question: "Does your child point to things they want?", options: [{ label: "Always", value: "A" }, { label: "Sometimes", value: "B" }, { label: "Not yet", value: "C" }] },
  { question: "How many words does your child use regularly?", options: [{ label: "More than 50", value: "A" }, { label: "10 to 50", value: "B" }, { label: "Less than 10", value: "C" }] },
  { question: 'Does your child follow simple instructions like "pick up the toy"?', options: [{ label: "Easily", value: "A" }, { label: "Only with help", value: "B" }, { label: "Rarely", value: "C" }] },
  { question: "How does your child react to narrated stories?", options: [{ label: "Pays attention", value: "A" }, { label: "Gets distracted easily", value: "B" }, { label: "Doesn't show interest", value: "C" }] },
  { question: "Does your child try to repeat sounds or words you say?", options: [{ label: "Frequently", value: "A" }, { label: "Occasionally", value: "B" }, { label: "Rarely", value: "C" }] },
  { question: "Can your child identify basic colors or numbers?", options: [{ label: "Yes, most of them", value: "A" }, { label: "Only a few", value: "B" }, { label: "Not yet", value: "C" }] },
  { question: "How is your child's interaction with other kids?", options: [{ label: "Plays together", value: "A" }, { label: "Plays near them but alone", value: "B" }, { label: "Prefers to be isolated", value: "C" }] },
  { question: "Does your child use eye contact when communicating?", options: [{ label: "Consistently", value: "A" }, { label: "Sometimes", value: "B" }, { label: "Rarely", value: "C" }] },
  { question: "How often does your child use screens (TV/Tablet) without interaction?", options: [{ label: "Limited", value: "A" }, { label: "1–2 hours", value: "B" }, { label: "More than 2 hours", value: "C" }] },
  { question: "Do you feel confident in how to stimulate your child's speech daily?", options: [{ label: "Very confident", value: "A" }, { label: "I need more ideas", value: "B" }, { label: "I feel lost", value: "C" }] },
]

const CTA_URL = 'https://pay.kiwify.com/QPHoen5'

const slideVariants = {
  enter: { opacity: 0, x: 30 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
}

export default function QuizSection() {
  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)
  const [selected, setSelected] = useState(null)

  const progress = useMemo(
    () => (started ? Math.round((current / QUESTIONS.length) * 100) : 0),
    [started, current]
  )

  const handleOption = useCallback((value) => {
    setSelected(value)
    setTimeout(() => {
      const newAnswers = [...answers, value]
      if (current + 1 < QUESTIONS.length) {
        setAnswers(newAnswers)
        setCurrent((c) => c + 1)
        setSelected(null)
      } else {
        const aCount = newAnswers.filter((a) => a === 'A').length
        setResult(aCount >= 6 ? 'good' : 'needs')
        setAnswers(newAnswers)
        trackEvent('Lead')
      }
    }, 350)
  }, [answers, current])

  const reset = useCallback(() => {
    setStarted(false); setCurrent(0); setAnswers([]); setResult(null); setSelected(null)
  }, [])

  const handleCTA = useCallback(() => trackEvent('InitiateCheckout'), [])
  const currentQuestion = QUESTIONS[current]

  return (
    <section id="quiz" className="py-16 md:py-20">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6 }}
          className="bg-blue-800/40 border border-blue-500/30 rounded-pebble-lg overflow-hidden backdrop-blur-md shadow-xl shadow-blue-900/40"
        >
          <div className="bg-gradient-to-r from-blue-700/60 to-blue-600/40 px-8 py-8 text-center border-b border-blue-500/20">
            <div className="inline-flex items-center gap-2 bg-yellow-400/15 text-yellow-300 font-body text-xs font-semibold px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" /> 2-Minute Quiz
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-snug">
              Do you really know your child?<br />
              <span className="text-yellow-300">Do you know how to help them?</span>
            </h2>
            <p className="font-body text-sm text-blue-200/80 mt-3">Take this 2-minute quiz to find out.</p>
          </div>

          <div className="px-8 py-8">
            <AnimatePresence mode="wait">
              {!started && !result && (
                <motion.div key="start" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="text-center py-4">
                  <p className="font-body text-base text-blue-100/80 mb-8">10 quick questions about your child's development.<br />Honest answers lead to the best results.</p>
                  <button onClick={() => setStarted(true)} className="bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-body font-bold text-base px-10 py-4 rounded-pebble animate-pulse-yellow flex items-center gap-2 mx-auto">
                    Start the Quiz <ChevronRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                </motion.div>
              )}

              {started && !result && (
                <motion.div key={`q-${current}`} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-body text-xs text-blue-300/70">Question {current + 1} of {QUESTIONS.length}</span>
                      <span className="font-body text-xs text-yellow-400 font-semibold">{progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-blue-900/60 rounded-full overflow-hidden" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                      <motion.div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full"
                        initial={{ width: `${Math.round((current / QUESTIONS.length) * 100)}%` }}
                        animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
                    </div>
                  </div>
                  <p className="font-heading text-lg sm:text-xl font-semibold text-white mb-6 leading-snug">{currentQuestion.question}</p>
                  <div className="space-y-3">
                    {currentQuestion.options.map((opt) => (
                      <button key={opt.value} onClick={() => handleOption(opt.value)} disabled={selected !== null}
                        className={`w-full text-left px-5 py-4 rounded-pebble border font-body text-base transition-all duration-200 ${selected === opt.value ? 'bg-yellow-400/20 border-yellow-400 text-yellow-300 scale-[1.02]' : 'bg-blue-700/30 border-blue-500/30 text-blue-100 hover:bg-blue-600/40 hover:border-blue-400/50'}`}>
                        <span className="font-semibold text-yellow-400 mr-3">{opt.value}.</span>{opt.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {result && (
                <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="text-center py-4">
                  <div className="text-5xl mb-4" aria-hidden="true">{result === 'good' ? '🌟' : '💡'}</div>
                  {result === 'good' ? (
                    <>
                      <h3 className="font-heading text-2xl font-bold text-white mb-3">Your child is on a great path!</h3>
                      <p className="font-body text-base text-blue-200/80 leading-relaxed mb-8">To boost their potential even further, our tools can provide the extra challenge they need to truly thrive.</p>
                    </>
                  ) : (
                    <>
                      <h3 className="font-heading text-2xl font-bold text-yellow-300 mb-3">It's time to act.</h3>
                      <p className="font-body text-base text-blue-200/80 leading-relaxed mb-8">Your child may need more specific stimulation to find their voice. Our interactive method is designed <strong className="text-white">exactly for this stage.</strong></p>
                    </>
                  )}
                  <a href={CTA_URL} target="_blank" rel="noopener noreferrer" onClick={handleCTA}
                    className="block w-full bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-body font-bold text-base sm:text-lg px-8 py-5 rounded-pebble animate-pulse-yellow mb-4 text-center">
                    ✅ YES, I WANT TO HELP MY CHILD NOW
                  </a>
                  <button onClick={reset} className="flex items-center gap-1.5 text-blue-300/60 hover:text-blue-200 font-body text-sm mx-auto transition-colors">
                    <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" /> Retake the quiz
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
