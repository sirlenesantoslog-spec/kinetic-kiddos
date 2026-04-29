import React from 'react'
import HeroSection from '../components/sales/HeroSection'
import QuizSection from '../components/sales/QuizSection'
import PricingSection from '../components/sales/PricingSection'
import ComplianceFooter from '../components/sales/ComplianceFooter'

export default function Home() {
  return (
    <div className="font-body min-h-screen bg-background">
      <HeroSection />
      <QuizSection />
      <PricingSection />
      <ComplianceFooter />
    </div>
  )
}
