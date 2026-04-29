import React, { memo } from 'react'
import { Shield, Sparkles } from 'lucide-react'

const year = new Date().getFullYear()

const ComplianceFooter = memo(function ComplianceFooter() {
  return (
    <footer className="relative">
      <div className="bg-foreground/5 border-t border-border">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-primary" aria-hidden="true" />
            <h3 className="font-heading text-lg font-semibold text-foreground">Safety &amp; Ethics</h3>
          </div>
          <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-3xl">
            <strong className="text-foreground">Important Disclaimer:</strong> This application is an educational
            support tool intended to stimulate early childhood development. It is not a medical device and does not
            replace professional consultation, diagnosis, or treatment by healthcare providers (such as
            Speech-Language Pathologists or Pediatricians). Results may vary based on each child's individual
            interaction and usage.
          </p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="font-heading text-sm font-semibold text-foreground">LittleMinds</span>
          </div>
          <p className="font-body text-xs text-muted-foreground">
            © {year} LittleMinds. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
})

export default ComplianceFooter
