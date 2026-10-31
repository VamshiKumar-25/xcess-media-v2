import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Learn how Xcess Media collects, uses and handles information when you visit our website or contact us regarding our services.',
  alternates: {
    canonical: '/privacy',
  },
}

interface PolicySection {
  number: string
  title: string
  intro?: string
  bullets?: string[]
  paragraphs?: string[]
  subItems?: Array<{ label: string; text: string }>
  customNode?: React.ReactNode
}

const PRIVACY_SECTIONS: PolicySection[] = [
  {
    number: '01',
    title: 'Information We Collect',
    intro: 'When you submit an enquiry through our website, we may collect:',
    bullets: [
      'Name',
      'Business or organization name',
      'Email address',
      'Phone number or WhatsApp number',
      'Industry and selected services',
      'Package information',
      'Project requirements and details',
      'Messages and other information you voluntarily provide',
    ],
    paragraphs: [
      'We may also collect basic technical information associated with your visit, such as browser and device information, where applicable.',
    ],
  },
  {
    number: '02',
    title: 'How We Use Your Information',
    intro: 'We use the information you provide to:',
    bullets: [
      'Respond to your enquiries and questions',
      'Understand your business requirements',
      'Prepare proposals, quotations and service recommendations',
      'Communicate with you regarding potential or ongoing projects',
      'Process and manage service-related communications',
      'Maintain and improve our website and services',
      'Protect our website against misuse and unauthorized activity',
    ],
  },
  {
    number: '03',
    title: 'Enquiry Forms and Communication',
    paragraphs: [
      "When you submit an enquiry, the information is processed through our website's enquiry system.",
      'We may send you an acknowledgement or confirmation email when your enquiry is successfully received. We may also contact you through email, phone or WhatsApp using the details you provide.',
      'Submitting an enquiry does not automatically establish a client relationship or service agreement.',
    ],
  },
  {
    number: '04',
    title: 'Third-Party Service Providers',
    intro: 'We use third-party services to operate our website and communication system, including:',
    subItems: [
      {
        label: 'Netlify:',
        text: 'Website hosting and deployment infrastructure.',
      },
      {
        label: 'Resend:',
        text: 'Email delivery and transactional enquiry notifications.',
      },
    ],
    paragraphs: [
      'These providers may process relevant information as necessary to perform their services, subject to their respective policies and practices.',
      'We do not control the privacy practices of third-party services.',
    ],
  },
  {
    number: '05',
    title: 'Data Sharing',
    paragraphs: [
      'We do not sell your personal information.',
      'We may share relevant information with service providers who help us operate our website, communicate with you or deliver our services.',
      'Information may also be disclosed where required by applicable law or where necessary to protect our rights, website or legitimate interests.',
    ],
  },
  {
    number: '06',
    title: 'Data Security',
    paragraphs: [
      'We take reasonable technical and organizational measures to protect the information submitted through our website.',
      'However, no method of electronic transmission or storage can be guaranteed to be completely secure.',
    ],
  },
  {
    number: '07',
    title: 'Data Retention',
    paragraphs: [
      'We retain enquiry information for as long as reasonably necessary to respond to enquiries, maintain business communications, manage client relationships and fulfill applicable legal or business requirements.',
    ],
  },
  {
    number: '08',
    title: 'Your Privacy Requests',
    paragraphs: [
      'You may contact us to request access to, correction of or deletion of personal information you have provided, subject to applicable legal and operational requirements.',
      'We will review and respond to reasonable requests.',
    ],
  },
  {
    number: '09',
    title: 'Cookies and Website Technologies',
    paragraphs: [
      'Our website may use essential technologies necessary for its functionality.',
      'Any analytics, tracking or additional technologies used on the website should be disclosed and configured in accordance with applicable requirements.',
    ],
  },
  {
    number: '10',
    title: 'External Links',
    paragraphs: [
      'Our website may contain links to external websites or platforms. We are not responsible for the content, security or privacy practices of those external services.',
    ],
  },
  {
    number: '11',
    title: 'Updates to This Policy',
    paragraphs: [
      'We may update this Privacy Policy when our website, services or practices change.',
      'The latest version will be published on this page with an updated revision date.',
    ],
  },
  {
    number: '12',
    title: 'Contact Us',
    paragraphs: [
      'For privacy-related questions or requests, please contact Xcess Media through our Contact Page.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#F8F8F8] selection:bg-[#8B0000] selection:text-white flex flex-col justify-between">
      {/* Global Fixed Navbar */}
      <Navbar activePage="Privacy" />

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
                Privacy Policy
              </h1>

              {/* Revision Date */}
              <p className="text-xs sm:text-[13px] font-mono text-[#8E8E93] tracking-wide mb-6">
                Last updated:{' '}
                <span className="text-neutral-300 font-semibold">31 October 2026</span>
              </p>

              {/* Introductory Lead */}
              <p className="text-sm sm:text-base lg:text-[17px] leading-relaxed text-[#B3B3B3] font-sans">
                Xcess Media (&ldquo;we&rdquo;, &ldquo;our&rdquo; or &ldquo;us&rdquo;) respects your privacy.
                This Privacy Policy explains how we collect, use and handle information when you visit our
                website or contact us regarding our services.
              </p>
            </header>

            {/* Numbered Legal Sections with Thin Editorial Dividers */}
            <div className="divide-y divide-white/[0.08]">
              {PRIVACY_SECTIONS.map((section) => (
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

                  {/* Optional Section Intro */}
                  {section.intro && (
                    <p className="text-sm sm:text-[15px] leading-relaxed text-[#B3B3B3] font-sans mb-3 sm:mb-4">
                      {section.intro}
                    </p>
                  )}

                  {/* Bulleted List if present */}
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="space-y-2 sm:space-y-2.5 my-3 sm:my-4 font-sans text-sm sm:text-[15px] text-[#B3B3B3]">
                      {section.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8B0000] mt-2 shrink-0" />
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Sub-Items (Key-Value style for third parties) */}
                  {section.subItems && section.subItems.length > 0 && (
                    <div className="space-y-2.5 sm:space-y-3 my-3 sm:my-4 font-sans text-sm sm:text-[15px]">
                      {section.subItems.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8B0000] mt-2 shrink-0" />
                          <div className="leading-relaxed text-[#B3B3B3]">
                            <strong className="text-white font-medium">{item.label}</strong>{' '}
                            {item.text}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Paragraphs */}
                  {section.paragraphs && (
                    <div className="space-y-3 sm:space-y-3.5 mt-3 sm:mt-4 font-sans text-sm sm:text-[15px] leading-relaxed text-[#B3B3B3]">
                      {section.paragraphs.map((p, idx) => {
                        // Special handling for Contact Us link in section 12
                        if (section.number === '12' && p.includes('Contact Page')) {
                          return (
                            <p key={idx}>
                              For privacy-related questions or requests, please contact Xcess Media through our{' '}
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
