import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Review the Terms & Conditions governing the use of Xcess Media’s website, service descriptions, proposals and commercial engagements.',
  alternates: {
    canonical: '/terms',
  },
}

interface TermsSection {
  number: string
  title: string
  intro?: string
  bullets?: string[]
  paragraphs?: string[]
}

const TERMS_SECTIONS: TermsSection[] = [
  {
    number: '01',
    title: 'About Xcess Media',
    paragraphs: [
      'Xcess Media provides creative, digital marketing and related services to businesses, including restaurants and interior design studios.',
      'Our services may include photography, videography, creative design, website development, social media management, SEO, Google Business Profile management, digital advertising and related services.',
    ],
  },
  {
    number: '02',
    title: 'Website Usage',
    paragraphs: ['You agree to use this website for lawful purposes.'],
    intro: 'You must not:',
    bullets: [
      'Use the website in any unlawful or fraudulent manner',
      'Attempt to disrupt, damage or compromise website functionality or security',
      'Submit false, misleading or unauthorized information',
      'Copy, reproduce or misuse website content without permission',
    ],
  },
  {
    number: '03',
    title: 'Services and Enquiries',
    paragraphs: [
      'Information presented on this website describes our services and is intended for general informational purposes.',
      'Submitting an enquiry does not constitute acceptance of a project, confirmation of availability or formation of a contractual relationship.',
      'Any engagement with Xcess Media will be subject to mutually agreed scope, deliverables, pricing, timelines and other applicable terms.',
    ],
  },
  {
    number: '04',
    title: 'Packages and Pricing',
    paragraphs: [
      'Package descriptions and prices displayed on our website are indicative of the services offered under each package.',
      'The final scope, deliverables, pricing, payment arrangements and applicable conditions will be confirmed in a separate proposal, quotation or written agreement.',
      'Advertising media spend for Meta Ads and Google Ads is separate from our service fees unless explicitly agreed otherwise in writing.',
    ],
  },
  {
    number: '05',
    title: 'Client Responsibilities',
    intro: 'Clients are responsible for:',
    bullets: [
      'Providing accurate business information and project requirements',
      'Providing necessary materials, assets, approvals and feedback',
      'Ensuring they have the rights and permissions to use materials supplied to us',
      'Reviewing and approving content, designs and deliverables within agreed timelines',
      'Complying with applicable laws and platform policies relevant to their business',
    ],
    paragraphs: [
      'Delays in receiving required information, materials or approvals may affect project timelines.',
    ],
  },
  {
    number: '06',
    title: 'Intellectual Property',
    paragraphs: [
      'All original website content, branding, graphics, text, design elements and other materials displayed on this website belong to Xcess Media or their respective owners, unless otherwise stated.',
      'They may not be reproduced, distributed, modified or commercially used without appropriate authorization.',
      'Ownership, licensing and usage rights for client-specific deliverables will be governed by the applicable project proposal or written agreement.',
    ],
  },
  {
    number: '07',
    title: 'Third-Party Platforms and Services',
    paragraphs: [
      'Our services may involve third-party platforms such as Instagram, Facebook, Google, advertising platforms, hosting providers and other digital tools.',
      'These platforms operate independently and are subject to their own terms, policies, availability and technical limitations.',
      'Xcess Media does not control third-party platform changes, outages, restrictions or decisions.',
    ],
  },
  {
    number: '08',
    title: 'Marketing and Performance Disclaimer',
    paragraphs: [
      'We aim to provide thoughtful, strategic and professionally executed creative and digital marketing services.',
    ],
    intro: 'However, we do not guarantee specific results such as:',
    bullets: [
      'A particular number of followers or views',
      'Guaranteed reach or viral content',
      'Specific search rankings or Google Maps positions',
      'Guaranteed leads, enquiries, bookings or sales',
      'Specific advertising returns or revenue',
    ],
    // The closing paragraph for this section
    customClosing:
      'Results depend on multiple factors, including audience behavior, competition, platform algorithms, advertising budgets, market conditions and other circumstances.',
  } as any,
  {
    number: '09',
    title: 'Payments and Project Terms',
    paragraphs: [
      'Payment schedules, cancellation terms, project timelines, revisions, deliverables and other commercial conditions will be specified in the relevant proposal, quotation or written agreement.',
      'Where a separate agreement exists, its applicable terms will govern the engagement.',
    ],
  },
  {
    number: '10',
    title: 'Limitation of Liability',
    paragraphs: [
      'To the extent permitted by applicable law, Xcess Media shall not be held responsible for indirect or consequential losses arising from the use of this website, reliance on general website information or interruptions caused by third-party services.',
      'Nothing in these Terms excludes liability that cannot legally be excluded under applicable law.',
    ],
  },
  {
    number: '11',
    title: 'External Links',
    paragraphs: [
      'This website may contain links to third-party websites and platforms for convenience.',
      'We do not endorse or assume responsibility for the content, policies or practices of external websites.',
    ],
  },
  {
    number: '12',
    title: 'Changes to These Terms',
    paragraphs: [
      'We may revise these Terms & Conditions as our website or services evolve.',
      'Updated terms will be published on this page with a revised date.',
    ],
  },
  {
    number: '13',
    title: 'Governing Law',
    paragraphs: [
      'These Terms shall be subject to applicable laws of India. Any legal matters shall be addressed in accordance with applicable law and jurisdiction.',
    ],
  },
  {
    number: '14',
    title: 'Contact Us',
    paragraphs: [
      'For questions regarding these Terms or our services, please contact Xcess Media through our Contact Page.',
    ],
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#F8F8F8] selection:bg-[#8B0000] selection:text-white flex flex-col justify-between">
      {/* Global Fixed Navbar */}
      <Navbar activePage="Terms" />

      {/* Main Editorial Content Container */}
      <main className="pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 flex-grow">
        <div className="container-xcess">
          {/* Centered Editorial Reading Column */}
          <article className="max-w-3xl mx-auto">
            {/* Page Header */}
            <header className="pb-8 sm:pb-12 border-b border-white/10">
              {/* Category Breadcrumb / Kicker */}
              <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.24em] text-[#8B0000] mb-3 sm:mb-4">
                <span>LEGAL // XCESS MEDIA</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F8F8F8] leading-[1.08] mb-4">
                Terms &amp; Conditions
              </h1>

              {/* Revision Date */}
              <p className="text-xs sm:text-[13px] font-mono text-[#8E8E93] tracking-wide mb-6">
                Last updated:{' '}
                <span className="text-neutral-300 font-semibold">31 October 2026</span>
              </p>

              {/* Introductory Lead */}
              <p className="text-sm sm:text-base lg:text-[17px] leading-relaxed text-[#B3B3B3] font-sans">
                Welcome to Xcess Media. By accessing or using our website, you agree to the following terms.
                Please read them carefully.
              </p>
            </header>

            {/* Numbered Legal Sections with Thin Editorial Dividers */}
            <div className="divide-y divide-white/[0.08]">
              {TERMS_SECTIONS.map((section: any) => (
                <section
                  key={section.number}
                  id={`section-${section.number}`}
                  className="py-8 sm:py-10 scroll-mt-28"
                >
                  {/* Section Title Header */}
                  <div className="flex items-baseline gap-2.5 sm:gap-3.5 mb-4 sm:mb-5">
                    <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.16em] text-[#8B0000]">
                      {section.number}.
                    </span>
                    <h2 className="font-display text-lg sm:text-xl lg:text-[22px] font-semibold tracking-tight text-[#F8F8F8]">
                      {section.title}
                    </h2>
                  </div>

                  {/* Paragraphs before bullets (if any) */}
                  {section.paragraphs && (
                    <div className="space-y-3 sm:space-y-3.5 font-sans text-sm sm:text-[15px] leading-relaxed text-[#B3B3B3] mb-3 sm:mb-4">
                      {section.paragraphs.map((p: string, idx: number) => {
                        // Special handling for Contact Us link in section 14
                        if (section.number === '14' && p.includes('Contact Page')) {
                          return (
                            <p key={idx}>
                              For questions regarding these Terms or our services, please contact Xcess Media
                              through our{' '}
                              <Link
                                href="/contact"
                                className="text-white font-medium underline underline-offset-4 decoration-[#8B0000] hover:text-[#8B0000] transition-colors"
                              >
                                Contact Page
                              </Link>
                              .
                            </p>
                          )
                        }

                        return <p key={idx}>{p}</p>
                      })}
                    </div>
                  )}

                  {/* Optional Section Intro before bullets */}
                  {section.intro && (
                    <p className="text-sm sm:text-[15px] leading-relaxed text-[#B3B3B3] font-sans mb-3 sm:mb-4">
                      {section.intro}
                    </p>
                  )}

                  {/* Bulleted List if present */}
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="space-y-2 sm:space-y-2.5 my-3 sm:my-4 font-sans text-sm sm:text-[15px] text-[#B3B3B3]">
                      {section.bullets.map((bullet: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8B0000] mt-2 shrink-0" />
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Custom Closing Paragraph (e.g. section 08) */}
                  {section.customClosing && (
                    <p className="text-sm sm:text-[15px] leading-relaxed text-[#B3B3B3] font-sans mt-3 sm:mt-4">
                      {section.customClosing}
                    </p>
                  )}
                </section>
              ))}
            </div>

            {/* Subtle Editorial Back to Home Navigation */}
            <div className="pt-10 sm:pt-14 pb-4 flex items-center justify-between border-t border-white/10">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 text-xs sm:text-[13px] font-mono uppercase tracking-[0.18em] text-[#8E8E93] hover:text-white transition-colors duration-200"
              >
                <span className="transition-transform duration-200 group-hover:-translate-x-1 text-[#8B0000]">←</span>
                <span>Back to Home</span>
              </Link>

              <Link
                href="#top"
                className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-mono uppercase tracking-[0.18em] text-[#8E8E93] hover:text-white transition-colors duration-200"
              >
                <span>Back to Top</span>
                <span className="text-[#8B0000]">↑</span>
              </Link>
            </div>
          </article>
        </div>
      </main>

      {/* Global Standardized Footer */}
      <Footer />
    </div>
  )
}
