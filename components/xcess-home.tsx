'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import Navbar from './navbar'
import {
  Industry,
  PackageType,
  packagePlans,
  customServiceList,
  calculateCustomPackageTotal,
  formatINR,
} from '@/lib/pricing'

// ============================================================================
// DATA DEFINITIONS (Clear Hierarchy, No Repetitive Brand Slogans)
// ============================================================================

const serviceChapters = [
  {
    num: '01',
    label: '01 — CREATE',
    id: 'pillar-create',
    name: 'CREATE',
    statement: 'Make your business worth looking at.',
    image: '/images/create-image.webp',
    badge: 'DIR // VISUAL PRODUCTION',
    services: [
      {
        code: '01.01',
        title: 'PHOTOGRAPHY',
        desc: 'Food, product, interior and brand photography.',
      },
      {
        code: '01.02',
        title: 'SHORT-FORM VIDEOS / REELS',
        desc: 'Short-form visual content designed for modern social platforms.',
      },
      {
        code: '01.03',
        title: 'CREATIVE DESIGNS',
        desc: 'Social creatives, promotional artwork and campaign visuals.',
      },
    ],
  },
  {
    num: '02',
    label: '02 — BUILD',
    id: 'pillar-build',
    name: 'BUILD',
    statement: 'Give your business a digital home.',
    image: '/images/connect-image.webp',
    badge: 'DIR // DIGITAL ARCHITECTURE',
    services: [
      {
        code: '02.01',
        title: 'WEBSITE',
        desc: 'Responsive websites and digital experiences built around the business.',
      },
      {
        code: '02.02',
        title: 'SOCIAL MEDIA HANDLING',
        desc: 'Content planning, publishing and ongoing social presence management.',
      },
      {
        code: '02.03',
        title: 'GOOGLE BUSINESS PROFILE',
        desc: 'A stronger and more complete local presence on Google.',
      },
    ],
  },
  {
    num: '03',
    label: '03 — GROW',
    id: 'pillar-grow',
    name: 'GROW',
    statement: 'Put your business in front of the right people.',
    image: '/images/grow-image.webp',
    badge: 'DIR // PAID ACQUISITION & SEARCH',
    services: [
      {
        code: '03.01',
        title: 'LOCAL SEO',
        desc: 'Improve local search visibility and presence.',
      },
      {
        code: '03.02',
        title: 'META ADS',
        desc: 'Campaigns across Instagram and Facebook.',
      },
      {
        code: '03.03',
        title: 'GOOGLE ADS',
        desc: 'Search advertising for people actively looking for relevant products or services.',
      },
    ],
  },
]

const workConcepts = [
  {
    num: '01',
    category: 'RESTAURANT',
    title: 'Food & Hospitality Concept',
    image: '/images/concept-1.webp',
    alt: '01 / RESTAURANT — Food & Hospitality Concept',
  },
  {
    num: '02',
    category: 'INTERIOR DESIGN',
    title: 'Spatial & Residential Concept',
    image: '/images/concept-2.webp',
    alt: '02 / INTERIOR DESIGN — Spatial & Residential Concept',
  },
  {
    num: '03',
    category: 'RESTAURANT',
    title: 'Dining Experience Concept',
    image: '/images/concept-3.webp',
    alt: '03 / RESTAURANT — Dining Experience Concept',
  },
]

const processStages = [
  {
    num: '01',
    title: 'DISCOVER',
    phase: 'FOUNDATION',
    timeline: 'Week 1',
    tagline: 'Understand before we create.',
    desc: 'Deep-dive into brand identity, audience dynamics and commercial objectives.',
    pillars: ['Brand & Identity Audit', 'Audience & Demand Profiling', 'Competitive Market Gap Analysis'],
    focusPoints: [
      { code: '01.A', title: 'Brand Blueprint', desc: 'Unpacking core identity, tone, and high-value proposition.' },
      { code: '01.B', title: 'Audience Insight', desc: 'Understanding guest psychology, dining habits, and project commissioning.' },
      { code: '01.C', title: 'Commercial Goal', desc: 'Setting measurable targets for footfall, inquiries, and brand prestige.' },
    ],
  },
  {
    num: '02',
    title: 'STRATEGIZE',
    phase: 'ARCHITECTURE',
    timeline: 'Week 1–2',
    tagline: 'Build the direction.',
    desc: 'Define creative direction, growth channels, content priorities and digital approach.',
    pillars: ['Creative Direction Roadmap', 'Content & Reel Playbook', 'Multi-Channel Acquisition Plan'],
    focusPoints: [
      { code: '02.A', title: 'Channel Blueprint', desc: 'Prioritizing high-impact touchpoints across Meta, Google Search & Maps.' },
      { code: '02.B', title: 'Storytelling Angle', desc: 'Scripting hooks, visual rhythm, and editorial narrative.' },
      { code: '02.C', title: 'Conversion Funnel', desc: 'Designing seamless pathways from first impression to table booking or lead.' },
    ],
  },
  {
    num: '03',
    title: 'CREATE',
    phase: 'PRODUCTION',
    timeline: 'Weeks 2–4',
    tagline: 'Bring the idea to life.',
    desc: 'Produce photography, short-form video, creative designs and digital experiences.',
    pillars: ['4K On-Site & Studio Shoots', 'Bespoke Web Development', 'Editorial Brand Collateral'],
    focusPoints: [
      { code: '03.A', title: 'Visual Assets', desc: 'Capturing atmosphere, culinary details, and architectural craftsmanship.' },
      { code: '03.B', title: 'Digital Platform', desc: 'Crafting responsive, high-speed website and mobile booking flow.' },
      { code: '03.C', title: 'Ad Creatives', desc: 'Developing scroll-stopping short-form video ads and curated carousels.' },
    ],
  },
  {
    num: '04',
    title: 'LAUNCH',
    phase: 'DEPLOYMENT',
    timeline: 'Week 4–5',
    tagline: 'Put it into motion.',
    desc: 'Launch websites, content, social presence and targeted campaigns.',
    pillars: ['Coordinated Go-Live', 'Targeted Paid Campaigns', 'Local SEO & Maps Domination'],
    focusPoints: [
      { code: '04.A', title: 'Omnichannel Launch', desc: 'Simultaneous deployment across web, social feeds, and search listings.' },
      { code: '04.B', title: 'Targeted Traffic', desc: 'Activating geo-fenced Meta and high-intent Google Search advertising.' },
      { code: '04.C', title: 'Local Search Presence', desc: 'Ranking on Google Business Profile to capture neighborhood intent.' },
    ],
  },
  {
    num: '05',
    title: 'REFINE',
    phase: 'SCALE & OPTIMIZE',
    timeline: 'Ongoing Growth',
    tagline: 'Keep improving.',
    desc: 'Review performance, learn from what works and continuously improve the digital presence.',
    pillars: ['Live Analytics & Heatmaps', 'Creative Iteration Cycles', 'Compounded Revenue Growth'],
    focusPoints: [
      { code: '05.A', title: 'Data Intelligence', desc: 'Analyzing reservation conversions, inquiry costs, and audience retention.' },
      { code: '05.B', title: 'Content Iteration', desc: 'Doubling down on highest-performing hooks, formats, and promotions.' },
      { code: '05.C', title: 'Market Leadership', desc: 'Continuous optimization to compound brand prestige and local market dominance.' },
    ],
  },
]

const principles = [
  {
    num: '01',
    title: 'STRATEGY',
    copy: 'Understand the commercial reality and audience behavior before we create.',
    mobileCopy: 'Understand the business before we create.',
  },
  {
    num: '02',
    title: 'CREATIVITY',
    copy: 'Create distinctive visual ideas that give businesses a stronger identity.',
    mobileCopy: 'Create ideas with a distinctive identity.',
  },
  {
    num: '03',
    title: 'EXECUTION',
    copy: 'Turn strategy into polished creative, digital experiences and practical delivery.',
    mobileCopy: 'Turn strategy into polished work.',
  },
  {
    num: '04',
    title: 'ATTENTION TO DETAIL',
    copy: 'Refine every visual, interaction and touchpoint so the final experience feels intentional.',
    mobileCopy: 'Refine every important touchpoint.',
  },
]

const industrySolutionsData = {
  Restaurants: {
    badge: 'HOSPITALITY & DINING',
    title: 'Transform dining atmosphere and culinary craft into an irresistible local magnet.',
    mobileTitle: 'Make your restaurant impossible to overlook.',
    copy: 'From viral short-form video that fills tables on weekday evenings to search dominance when guests look for top dining spots.',
    mobileCopy: 'Visual content and search visibility designed to bring guests through the doors.',
    image: '/images/built-1.webp',
    capabilities: [
      { label: 'Visual Storytelling', desc: 'Cinematic food photography & atmospheric reels capturing culinary artistry.', mobileDesc: 'Food photography and atmospheric reels.' },
      { label: 'Local Search Dominance', desc: 'Top 3 Google Maps positioning and local SEO for area diners.', mobileDesc: 'Local SEO and Google visibility.' },
      { label: 'High-Conversion Web', desc: 'Fast mobile menus, reservation integration, and visual ambiance.', mobileDesc: 'Fast websites built for mobile customers.' },
      { label: 'Targeted Customer Ads', desc: 'Geo-fenced Meta & Google Ads capturing high-intent diners.', mobileDesc: 'Geo-focused Meta and Google campaigns.' },
    ],
  },
  'Interior Design': {
    badge: 'INTERIORS & ARCHITECTURE',
    title: 'Position spatial projects and architectural vision in front of high-value clientele.',
    mobileTitle: 'Showcase spatial projects to high-value clients.',
    copy: 'Moving beyond static photo portfolios into immersive digital experiences that articulate spatial balance, materiality, and bespoke design mastery.',
    mobileCopy: 'Editorial visuals and portfolio experiences that articulate design craftsmanship.',
    image: '/images/built-2.webp',
    capabilities: [
      { label: 'Spatial Narrative', desc: 'High-end architectural walkthroughs & editorial portfolio photography.', mobileDesc: 'Architectural photography and walkthrough reels.' },
      { label: 'Bespoke Studio Website', desc: 'Ultra-clean, minimalist portfolio platforms with seamless project presentation.', mobileDesc: 'Minimalist portfolio websites.' },
      { label: 'High-Ticket Acquisition', desc: 'Targeted outreach and discovery campaigns for premium residential & commercial clients.', mobileDesc: 'Targeted client acquisition campaigns.' },
      { label: 'Brand Authority', desc: 'Refined brand collateral and curated aesthetic across all digital touchpoints.', mobileDesc: 'Refined studio brand collateral.' },
    ],
  },
}

interface FAQItem {
  num: string
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    num: '01',
    question: 'What services does Xcess Media offer?',
    answer:
      'We provide photography, short-form reels, creative design, websites, social media management, Google Business Profile, local SEO, and Meta & Google Ads.',
  },
  {
    num: '02',
    question: 'Which industries do you work with?',
    answer:
      'We work exclusively with Restaurants & Hospitality and Interior Design & Architecture practices.',
  },
  {
    num: '03',
    question: 'Do you work with restaurants?',
    answer:
      'Yes. We produce food photography, short-form reels, restaurant websites, Google Maps optimization, and local dining ad campaigns.',
  },
  {
    num: '04',
    question: 'Do you work with interior design businesses?',
    answer:
      'Yes. We craft architectural photography, walkthrough reels, portfolio websites, studio branding, and high-value client acquisition campaigns.',
  },
  {
    num: '05',
    question: 'Can I choose individual services?',
    answer:
      'Yes. You can engage us for standalone photo shoots, reel batches, website builds, or marketing campaigns without choosing a full package.',
  },
  {
    num: '06',
    question: 'Can I create a custom package?',
    answer:
      'Yes. Our Custom Package lets you select any combination of services suited to your specific needs and monthly budget.',
  },
  {
    num: '07',
    question: 'Can I get photography or reels without a full package?',
    answer:
      'Yes. We offer visual production as standalone engagements tailored for your menus, spaces, or design walkthroughs.',
  },
  {
    num: '08',
    question: 'Do you build websites?',
    answer:
      'Yes. We design and develop fast, responsive websites for restaurants (menus & reservations) and interior design practices (minimalist portfolios).',
  },
  {
    num: '09',
    question: 'How does the process work?',
    answer:
      'Our workflow follows five stages: 01 Discover, 02 Strategize, 03 Create, 04 Launch, and 05 Refine.',
  },
  {
    num: '10',
    question: 'How do I get started?',
    answer:
      'Click "Let’s Talk" or submit a contact inquiry. We’ll schedule an introductory conversation to understand your business and discuss the best approach.',
  },
]

// ============================================================================
// HELPER COMPONENTS & HOOKS
// ============================================================================

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Immediately mark visible if IntersectionObserver is not supported
    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible')
      return
    }

    // Immediate check if element is already within or near the viewport
    const rect = node.getBoundingClientRect()
    if (rect.top < window.innerHeight + 100 && rect.bottom > -100) {
      node.classList.add('is-visible')
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && (entry.isIntersecting || entry.intersectionRatio > 0)) {
          node.classList.add('is-visible')
          observer.unobserve(node)
        }
      },
      { threshold: [0, 0.05], rootMargin: '50px 0px 50px 0px' }
    )

    observer.observe(node)

    // Safety fallback timer: Ensure content is never permanently hidden
    const timer = setTimeout(() => {
      if (node && !node.classList.contains('is-visible')) {
        node.classList.add('is-visible')
      }
    }, 600)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])
  return ref
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useReveal<HTMLDivElement>()
  return <div ref={ref} style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties} className={`reveal ${className}`}>{children}</div>
}

function SectionIntro({ number, title, copy, light = false }: { number: string; title: string; copy: string; light?: boolean }) {
  return (
    <Reveal className={`section-intro ${light ? 'text-[#050505]' : ''}`}>
      <p className="section-label">{number}</p>
      <div>
        <h2 className="font-display max-w-4xl text-2xl sm:text-3xl md:text-4xl lg:text-[44px] leading-[0.95] tracking-[-0.04em]">{title}</h2>
        <p className="mt-3.5 max-w-xl text-sm sm:text-[15px] leading-relaxed opacity-70">{copy}</p>
      </div>
    </Reveal>
  )
}

function Magnetic({ children, className = '', href }: { children: React.ReactNode; className?: string; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const onMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window === 'undefined' || window.innerWidth < 900 || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (event.clientX - rect.left - rect.width / 2) * 0.12
    const y = (event.clientY - rect.top - rect.height / 2) * 0.12
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }
  const reset = () => { if (ref.current) ref.current.style.transform = '' }

  const isInternal = href.startsWith('/')

  if (isInternal) {
    return (
      <Link
        ref={ref}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={reset}
        className={`magnetic ${className}`}
      >
        {children}
      </Link>
    )
  }

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`magnetic ${className}`}
    >
      {children}
    </a>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function XcessHome() {
  const [industry, setIndustry] = useState<Industry>('Restaurants')
  const [solutionIndustry, setSolutionIndustry] = useState<Industry>('Restaurants')
  const [industryChapter, setIndustryChapter] = useState<'restaurants' | 'interiors'>('restaurants')
  const [selectedPackage, setSelectedPackage] = useState<PackageType>('Standard')
  const [customServices, setCustomServices] = useState<string[]>([
    'Photography',
    'Creative Designs',
    'Short-form Videos',
  ])
  const [faq, setFaq] = useState<number | null>(null)
  const [processStage, setProcessStage] = useState(0)
  const [processProgress, setProcessProgress] = useState(0)
  const [activeWorkIndex, setActiveWorkIndex] = useState(0)
  const workTouchStartX = useRef<number | null>(null)
  const workTouchStartY = useRef<number | null>(null)
  const workTouchEndX = useRef<number | null>(null)
  const workTouchEndY = useRef<number | null>(null)
  const isWorkPointerDownRef = useRef(false)
  const workAutoplayTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Mobile Packages Carousel State & Swipe Logic
  const [activePackageIndex, setActivePackageIndex] = useState(1) // Standard (02) centered by default
  const packageTouchStartX = useRef<number | null>(null)
  const packageTouchStartY = useRef<number | null>(null)
  const packageTouchEndX = useRef<number | null>(null)
  const packageTouchEndY = useRef<number | null>(null)
  const isPackagePointerDownRef = useRef(false)
  const [packageContainerWidth, setPackageContainerWidth] = useState(390)
  const packageCarouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateWidth = () => {
      if (packageCarouselRef.current) {
        setPackageContainerWidth(packageCarouselRef.current.offsetWidth || window.innerWidth)
      } else if (typeof window !== 'undefined') {
        setPackageContainerWidth(window.innerWidth)
      }
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  const handlePackageTouchStart = (e: React.TouchEvent) => {
    packageTouchStartX.current = e.touches[0].clientX
    packageTouchStartY.current = e.touches[0].clientY
    packageTouchEndX.current = e.touches[0].clientX
    packageTouchEndY.current = e.touches[0].clientY
  }

  const handlePackageTouchMove = (e: React.TouchEvent) => {
    packageTouchEndX.current = e.touches[0].clientX
    packageTouchEndY.current = e.touches[0].clientY
  }

  const handlePackageTouchEnd = () => {
    if (packageTouchStartX.current === null || packageTouchEndX.current === null) return
    const diffX = packageTouchStartX.current - packageTouchEndX.current
    const diffY = (packageTouchStartY.current || 0) - (packageTouchEndY.current || 0)

    if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
      const plans = packagePlans[industry]
      if (diffX > 0) {
        // Swiped left -> NEXT (loops 01 -> 02 -> 03 -> 04 -> 01)
        setActivePackageIndex((prev) => (prev + 1) % plans.length)
      } else {
        // Swiped right -> PREV (loops 04 -> 03 -> 02 -> 01 -> 04)
        setActivePackageIndex((prev) => (prev - 1 + plans.length) % plans.length)
      }
    }
    packageTouchStartX.current = null
    packageTouchStartY.current = null
    packageTouchEndX.current = null
    packageTouchEndY.current = null
  }

  const handlePackagePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button, input, a')) return
    isPackagePointerDownRef.current = true
    packageTouchStartX.current = e.clientX
    packageTouchStartY.current = e.clientY
    packageTouchEndX.current = e.clientX
    packageTouchEndY.current = e.clientY
  }

  const handlePackagePointerMove = (e: React.PointerEvent) => {
    if (!isPackagePointerDownRef.current) return
    packageTouchEndX.current = e.clientX
    packageTouchEndY.current = e.clientY
  }

  const handlePackagePointerUp = () => {
    if (!isPackagePointerDownRef.current) return
    isPackagePointerDownRef.current = false
    handlePackageTouchEnd()
  }

  const handleIndustryChange = (newIndustry: Industry) => {
    setIndustry(newIndustry)
    setActivePackageIndex(1) // Standard centered initially
    setSelectedPackage('Standard')
    if (newIndustry === 'Restaurants') {
      setCustomServices(['Photography', 'Creative Designs', 'Short-form Videos'])
    } else {
      setCustomServices(['Project Photo', 'Creative Designs', 'Walkthroughs'])
    }
  }

  const resetWorkAutoplay = () => {
    if (workAutoplayTimerRef.current) {
      clearInterval(workAutoplayTimerRef.current)
    }
    workAutoplayTimerRef.current = setInterval(() => {
      setActiveWorkIndex((prev) => (prev + 1) % workConcepts.length)
    }, 5000)
  }

  useEffect(() => {
    resetWorkAutoplay()
    return () => {
      if (workAutoplayTimerRef.current) {
        clearInterval(workAutoplayTimerRef.current)
      }
    }
  }, [])

  const handleWorkTouchStart = (e: React.TouchEvent) => {
    workTouchStartX.current = e.touches[0].clientX
    workTouchStartY.current = e.touches[0].clientY
    workTouchEndX.current = e.touches[0].clientX
    workTouchEndY.current = e.touches[0].clientY
  }

  const handleWorkTouchMove = (e: React.TouchEvent) => {
    workTouchEndX.current = e.touches[0].clientX
    workTouchEndY.current = e.touches[0].clientY
  }

  const handleWorkTouchEnd = () => {
    if (workTouchStartX.current === null || workTouchEndX.current === null) return
    const diffX = workTouchStartX.current - workTouchEndX.current
    const diffY = (workTouchStartY.current || 0) - (workTouchEndY.current || 0)

    if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        // Swiped left -> NEXT (01 -> 02 -> 03 -> 01)
        setActiveWorkIndex((prev) => (prev + 1) % workConcepts.length)
      } else {
        // Swiped right -> PREV (03 -> 02 -> 01 -> 03)
        setActiveWorkIndex((prev) => (prev - 1 + workConcepts.length) % workConcepts.length)
      }
      resetWorkAutoplay()
    }
    workTouchStartX.current = null
    workTouchStartY.current = null
    workTouchEndX.current = null
    workTouchEndY.current = null
  }

  const handleWorkPointerDown = (e: React.PointerEvent) => {
    isWorkPointerDownRef.current = true
    workTouchStartX.current = e.clientX
    workTouchStartY.current = e.clientY
    workTouchEndX.current = e.clientX
    workTouchEndY.current = e.clientY
  }

  const handleWorkPointerMove = (e: React.PointerEvent) => {
    if (!isWorkPointerDownRef.current) return
    workTouchEndX.current = e.clientX
    workTouchEndY.current = e.clientY
  }

  const handleWorkPointerUp = () => {
    if (!isWorkPointerDownRef.current) return
    isWorkPointerDownRef.current = false
    handleWorkTouchEnd()
  }

  const handleWorkDotClick = (index: number) => {
    setActiveWorkIndex(index)
    resetWorkAutoplay()
  }

  const hero = useRef<HTMLElement>(null)
  const processSectionRef = useRef<HTMLElement>(null)
  const stickyContainerRef = useRef<HTMLDivElement>(null)

  const scrollToStage = (stageIdx: number) => {
    setProcessStage(stageIdx)
    const section = processSectionRef.current
    const sticky = stickyContainerRef.current
    if (!section || !sticky) return
    const rect = section.getBoundingClientRect()
    const topOffset = parseInt(window.getComputedStyle(sticky).top, 10) || 96
    const stickyHeight = sticky.offsetHeight
    const totalScrollDistance = Math.max(1, rect.height - stickyHeight)
    const targetProgress = (stageIdx + 0.4) / 5
    const targetY = window.scrollY + rect.top - topOffset + targetProgress * totalScrollDistance
    window.scrollTo({ top: targetY, behavior: 'smooth' })
  }

  const toggleCustomService = (service: string) => {
    setCustomServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    )
  }

  // Listen for industry switch events (from navbar dropdown, etc.) and URL hash changes
  useEffect(() => {
    const handleIndustryEvent = (e: Event) => {
      const customEvent = e as CustomEvent<'restaurants' | 'interiors'>
      if (customEvent.detail === 'interiors') {
        setIndustryChapter('interiors')
        setSolutionIndustry('Interior Design')
      } else if (customEvent.detail === 'restaurants') {
        setIndustryChapter('restaurants')
        setSolutionIndustry('Restaurants')
      }
    }

    const handleHashChange = () => {
      if (typeof window !== 'undefined') {
        const hash = window.location.hash
        if (hash === '#industries-interiors' || hash.includes('interior')) {
          setIndustryChapter('interiors')
          setSolutionIndustry('Interior Design')
        } else if (hash === '#industries-restaurants' || hash === '#industries') {
          setIndustryChapter('restaurants')
          setSolutionIndustry('Restaurants')
        }
      }
    }

    // Check hash on initial mount
    handleHashChange()

    window.addEventListener('xcess:set-industry', handleIndustryEvent)
    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('xcess:set-industry', handleIndustryEvent)
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      if (typeof window === 'undefined' || window.innerWidth < 900 || !hero.current) return
      const x = (event.clientX / window.innerWidth - 0.5) * 12
      const y = (event.clientY / window.innerHeight - 0.5) * 12
      hero.current.style.setProperty('--mx', `${x}px`)
      hero.current.style.setProperty('--my', `${y}px`)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    let rafId: number
    const handleProcessScroll = () => {
      if (typeof window === 'undefined' || window.innerWidth < 768) return
      rafId = requestAnimationFrame(() => {
        const section = processSectionRef.current
        const sticky = stickyContainerRef.current
        if (!section || !sticky) return

        const rect = section.getBoundingClientRect()
        const topOffset = parseInt(window.getComputedStyle(sticky).top, 10) || 96
        const stickyHeight = sticky.offsetHeight
        const totalScrollDistance = Math.max(1, rect.height - stickyHeight)

        if (rect.top <= topOffset) {
          const scrolled = topOffset - rect.top
          const progress = Math.min(1, Math.max(0, scrolled / totalScrollDistance))
          setProcessProgress(progress)
          const stage = Math.min(4, Math.floor(progress * 5))
          setProcessStage(stage)
        } else {
          setProcessProgress(0)
          setProcessStage(0)
        }
      })
    }

    window.addEventListener('scroll', handleProcessScroll, { passive: true })
    window.addEventListener('resize', handleProcessScroll, { passive: true })
    handleProcessScroll()
    return () => {
      window.removeEventListener('scroll', handleProcessScroll)
      window.removeEventListener('resize', handleProcessScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const currentSol = industrySolutionsData[solutionIndustry]

  return (
    <main id="top" className="bg-[#050505] text-[#F8F8F8] font-sans selection:bg-[#8B0000] selection:text-white">
      <Navbar activePage="Home" />

      {/* ========================================================================= */}
      {/* 00. HERO SECTION (WE MAKE BRANDS MATTER. / CREATE · CONNECT · GROW)       */}
      {/* ========================================================================= */}
      <section ref={hero} className="hero relative min-h-[100dvh] lg:min-h-screen overflow-hidden border-b border-white/10 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 flex flex-col justify-start lg:justify-center">
        {/* Responsive Hero Background Image (Single <picture> for Instant LCP & Zero Duplicate Downloads) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <picture>
            <source media="(max-width: 1023px)" srcSet="/images/hero-mobile.webp" />
            <source media="(min-width: 1024px)" srcSet="/images/hero-cinematic-bg.webp" />
            <img
              src="/images/hero-cinematic-bg.webp"
              alt="Xcess Media Atmospheric Spatial Backdrop"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover object-[right_center] sm:object-right lg:object-center"
            />
          </picture>
          {/* Responsive Dark Gradient Overlays for optimal typographic contrast across mobile & desktop */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/95 via-[#050505]/40 to-transparent lg:from-[#050505]/90 lg:via-[#050505]/35 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40 lg:to-[#050505]/60 pointer-events-none" />
        </div>

        {/* Top Right Annotation (Desktop only - Unchanged) */}
        <div className="hidden lg:block absolute top-28 xl:top-32 right-8 sm:right-12 lg:right-14 xl:right-16 z-10 text-right select-none pointer-events-none">
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#A8A8A8] leading-relaxed">
            BRANDS<br />
            PEOPLE<br />
            POSSIBILITIES
          </p>
          <div className="w-8 h-[1.5px] bg-[#8B0000] ml-auto mt-2" />
        </div>

        {/* Absolute 3-Monolith Text Overlays (Desktop only - Unchanged) */}
        <div className="hidden lg:block absolute inset-0 z-10 pointer-events-none select-none">
          {/* Pillar 01: CREATE (on the Girl's Portrait Monolith - positioned neatly inside frame) */}
          <div className="absolute left-[48.5%] xl:left-[49%] top-[54%] xl:top-[55%] -translate-y-1/2 flex flex-col">
            <h3 className="font-display text-sm sm:text-base lg:text-[16px] font-bold uppercase tracking-[0.28em] text-white">
              CREATE
            </h3>
            <div className="mt-3 space-y-1.5 text-[10.5px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-[#A8A8A8]">
              <p>IDEAS</p>
              <p>CONTENT</p>
              <p>BRANDS</p>
            </div>
            <div className="w-6 h-[1.5px] bg-[#8B0000] mt-3" />
          </div>

          {/* Pillar 02: CONNECT (on the Middle Building/Interior Monolith) */}
          <div className="absolute left-[62%] xl:left-[62.5%] top-[54%] xl:top-[55%] -translate-y-1/2 flex flex-col">
            <h3 className="font-display text-sm sm:text-base lg:text-[16px] font-bold uppercase tracking-[0.28em] text-white">
              CONNECT
            </h3>
            <div className="mt-3 space-y-1.5 text-[10.5px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-[#A8A8A8]">
              <p>PEOPLE</p>
              <p>PLATFORMS</p>
              <p>OPPORTUNITIES</p>
            </div>
            <div className="w-6 h-[1.5px] bg-[#8B0000] mt-3" />
          </div>

          {/* Pillar 03: GROW (on the Mountain Peak Monolith) */}
          <div className="absolute left-[80%] xl:left-[80.5%] top-[54%] xl:top-[55%] -translate-y-1/2 flex flex-col">
            <h3 className="font-display text-sm sm:text-base lg:text-[16px] font-bold uppercase tracking-[0.28em] text-white">
              GROW
            </h3>
            <div className="mt-3 space-y-1.5 text-[10.5px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-[#A8A8A8]">
              <p>VISIBILITY</p>
              <p>CUSTOMERS</p>
              <p>BUSINESS</p>
            </div>
            <div className="w-6 h-[1.5px] bg-[#8B0000] mt-3" />
          </div>
        </div>

        {/* Main Content Container */}
        <div className="container-xcess relative z-10 w-full">
          {/* DESKTOP LAYOUT (lg:block - Unchanged) */}
          <div className="hidden lg:flex flex-col justify-center max-w-xl xl:max-w-2xl min-h-[calc(100vh-10rem)]">
            {/* Eyebrow */}
            <p className="font-mono text-[10.5px] sm:text-[11.5px] font-bold uppercase tracking-[0.28em] text-[#8E8E93] mb-5 sm:mb-6">
              DIGITAL <span className="text-[#8B0000] mx-2">×</span> CREATIVE <span className="text-[#8B0000] mx-2">×</span> GROWTH
            </p>

            {/* Main Headline: WE MAKE BRANDS MATTER. */}
            <h1 className="hero-title font-display font-black text-[clamp(44px,6.8vw,92px)] leading-[0.88] tracking-[-0.045em] text-white">
              <span>WE MAKE</span><br />
              <span>BRANDS</span><br />
              <span className="text-[#8B0000]">MATTER.</span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="mt-6 sm:mt-7 max-w-lg text-sm sm:text-[15px] leading-relaxed text-[#B3B3B3] font-sans">
              Strategy, creativity and digital experiences designed to help ambitious businesses stand out, connect with the right audience and grow with purpose.
            </p>

            {/* CTA Buttons Row */}
            <div className="mt-8 sm:mt-9 flex flex-wrap items-center gap-5 sm:gap-7">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-[#8B0000] hover:bg-[#A50000] text-white font-display font-medium text-[13.5px] sm:text-[14px] transition-all duration-300 ease-out hover:shadow-[0_6px_28px_rgba(139,0,0,0.55)]"
              >
                <span>Let&apos;s Talk</span>
              </Link>
              <a
                href="#showcase"
                className="group inline-flex items-center text-white hover:text-[#8B0000] font-display font-medium text-[13.5px] sm:text-[14px] border-b border-[#8B0000]/60 hover:border-[#8B0000] pb-1 transition-all duration-200"
              >
                <span>Explore Our Work</span>
              </a>
            </div>
          </div>

          {/* MOBILE / TABLET COMPOSITION (lg:hidden - Exact 1:1 Match to Image 2 Reference) */}
          <div className="flex lg:hidden flex-col justify-start w-full max-w-lg pt-[26vh] sm:pt-[30vh] pb-12 sm:pb-16">
            {/* Eyebrow */}
            <p className="font-mono text-[10px] sm:text-[11px] md:text-[12px] font-bold uppercase tracking-[0.22em] sm:tracking-[0.25em] md:tracking-[0.28em] text-[#8c8c8c] mb-4 sm:mb-4">
              DIGITAL <span className="text-[#8B0000] mx-1.5">×</span> CREATIVE{" "}
              <span className="text-[#8B0000] mx-1.5">×</span> GROWTH
            </p>

            {/* Mobile / Tablet / Large-screen Hero Headline */}
            <h1 className="w-full max-w-[400px] mt-2 font-display font-semibold sm:font-bold text-[clamp(58px,15.5vw,68px)] leading-[0.86] tracking-[-0.045em] text-white">
              <span>WE MAKE</span>
              <br />
              <span>BRANDS</span>
              <br />
              <span className="text-[#8B0000]">MATTER.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="mt-4 sm:mt-5 md:mt-6 max-w-[285px] sm:max-w-sm md:max-w-md text-[12px] sm:text-[14px] md:text-[15px] leading-relaxed text-[#8c8c8c] font-sans font-normal">
              Strategy, creativity and digital experiences built to help ambitious
              businesses stand out and grow.
            </p>

            {/* CTA Buttons */}
            <div className="mt-6 sm:mt-7 md:mt-8 w-full flex items-center gap-4 sm:gap-5 md:gap-6">
              {/* Primary CTA */}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center w-[172px] h-[42px] sm:w-auto sm:h-auto sm:px-6 md:px-7 py-2.5 sm:py-3 md:py-3.5 rounded-[9px] sm:rounded-xl bg-[#8B0000] hover:bg-[#A50000] text-white font-display font-semibold text-[13px] sm:text-[13.5px] md:text-[14.5px] transition-all duration-300 active:scale-[0.98] shrink-0"
              >
                <span>Let&apos;s Talk</span>
              </Link>

              {/* Secondary CTA — transparent button area */}
              <a
                href="#showcase"
                className="inline-flex items-center justify-center w-[172px] h-[42px] rounded-[9px] text-[#8B0000] hover:text-[#B30000] font-display font-semibold text-[13px] transition-colors duration-200 shrink-0 whitespace-nowrap"
              >
                <span>Explore Our Work</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Right: 01 A MORE CONNECTED BRAND WORLD (Desktop only - Unchanged) */}
        <div className="hidden sm:block absolute bottom-16 sm:bottom-20 lg:bottom-24 right-8 sm:right-12 lg:right-14 xl:right-16 z-10 text-right select-none pointer-events-none">
          <p className="font-mono text-xs sm:text-sm font-bold text-white tracking-wider mb-1.5">01</p>
          <p className="text-[9.5px] sm:text-[10px] font-mono uppercase tracking-[0.22em] text-[#C4C4C4] leading-snug">
            A MORE<br />
            CONNECTED<br />
            BRAND WORLD
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 01. INDUSTRIES (Cinematic Editorial Chapters / Two Visual Worlds)          */}
      {/* ========================================================================= */}
      <section id="industries" className="relative border-b border-white/10 bg-[#050505] pt-8 sm:pt-10 lg:pt-10 pb-16 lg:pb-22 overflow-hidden scroll-mt-20">
        {/* Subtle Ambient Background Flare */}
        <div className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(139,0,0,0.15),transparent)]" />

        <div className="container-xcess relative z-10">
          {/* Section Header Intro */}
          <Reveal className="mb-8 sm:mb-9">
            {/* INDUSTRIES Section Label */}
            <div className="flex items-center gap-2 xcess-section-label mb-3 sm:mb-4">
              <span>INDUSTRIES</span>
            </div>

            {/* Main Header Row: Typographic Lockup */}
            <div className="grid gap-6 lg:grid-cols-[1.3fr_.7fr] lg:items-end">
              {/* Horizontal Typographic Lockup: Red 2 Accent + Two Lines */}
              <div className="flex items-center gap-3.5 sm:gap-4.5 lg:gap-5 select-none">
                {/* Intentional Crimson 2 Accent */}
                <span className="font-display font-semibold text-5xl sm:text-6xl lg:text-[76px] leading-none text-[#8B0000] shrink-0">
                  2
                </span>

                {/* Two Lines starting at the exact same X position */}
                <h2 className="xcess-section-heading-expressive flex flex-col justify-center text-[#F8F8F8]">
                  <span>Industries.</span>
                  <span>Visual Worlds.</span>
                </h2>
              </div>
            </div>
          </Reveal>

          {/* Desktop Minimal Editorial Chapter Tabs */}
          <div className="hidden lg:flex items-center gap-8 border-b border-white/10 pb-3 mb-10">
            <button
              type="button"
              onClick={() => setIndustryChapter('restaurants')}
              className={`group relative pb-2 text-xs font-bold uppercase tracking-[0.22em] transition-all cursor-pointer ${industryChapter === 'restaurants' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
                }`}
            >
              <span className={industryChapter === 'restaurants' ? 'text-[#8B0000] mr-2 font-bold' : 'text-neutral-600 mr-2'}>
                01
              </span>
              <span className={industryChapter === 'restaurants' ? 'text-white' : 'text-neutral-500'}>
                RESTAURANTS
              </span>
              {industryChapter === 'restaurants' && (
                <span className="absolute -bottom-3 left-0 right-0 h-[2px] bg-[#8B0000] transition-all" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setIndustryChapter('interiors')}
              className={`group relative pb-2 text-xs font-bold uppercase tracking-[0.22em] transition-all cursor-pointer ${industryChapter === 'interiors' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
                }`}
            >
              <span className={industryChapter === 'interiors' ? 'text-[#8B0000] mr-2 font-bold' : 'text-neutral-600 mr-2'}>
                02
              </span>
              <span className={industryChapter === 'interiors' ? 'text-white' : 'text-neutral-500'}>
                INTERIOR DESIGN
              </span>
              {industryChapter === 'interiors' && (
                <span className="absolute -bottom-3 left-0 right-0 h-[2px] bg-[#8B0000] transition-all" />
              )}
            </button>
          </div>

          {/* ===================================================================== */}
          {/* DESKTOP EXPERIENCE (Single Prominent Editorial Stage per Chapter)     */}
          {/* ===================================================================== */}
          <div className="hidden lg:block">
            {industryChapter === 'restaurants' ? (
              <div
                key="restaurants-chapter"
                className="relative grid grid-cols-12 items-center gap-8 animate-in fade-in duration-500"
              >
                {/* Large Background Numeral Watermark */}
                <span className="pointer-events-none absolute -left-6 -top-10 font-display text-[14vw] font-bold leading-none text-white/[0.02] select-none">
                  01
                </span>

                {/* Left Content Column */}
                <div className="col-span-5 relative z-20 space-y-4">
                  <div className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B0000]">
                    <span>01</span>
                    <span className="h-px w-5 bg-[#8B0000]" />
                    <span>RESTAURANTS</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl lg:text-[36px] font-bold leading-[1.05] tracking-tight text-white">
                    Make Them<br />
                    Want To Be There.
                  </h3>

                  <p className="max-w-md xcess-intro-text text-sm sm:text-[14.5px] leading-relaxed text-neutral-300 pt-1">
                    Your restaurant is more than what's on the plate. We help bring the food, space and experience to life through photography, short-form content and a stronger digital presence.
                  </p>

                  {/* Subtle Service Tags */}
                  <div className="pt-1 flex flex-wrap gap-x-2.5 gap-y-1 text-[10px] uppercase tracking-[0.16em] text-neutral-400 font-medium">
                    <span>FOOD PHOTOGRAPHY</span>
                    <span className="text-neutral-600">·</span>
                    <span>SHORT-FORM REELS</span>
                    <span className="text-neutral-600">·</span>
                    <span>CREATIVE DESIGN</span>
                    <span className="text-neutral-600">·</span>
                    <span>WEBSITE</span>
                    <span>GOOGLE BUSINESS PROFILE</span>
                    <span className="text-neutral-600">·</span>
                    <span>LOCAL SEO</span>
                    <span className="text-neutral-600">·</span>
                    <span>META ADS</span>
                    <span className="text-neutral-600">·</span>
                    <span>GOOGLE ADS</span>
                  </div>

                  <div className="pt-4">
                    <a
                      href="#solutions"
                      onClick={() => setSolutionIndustry('Restaurants')}
                      className="group/cta inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-[#8B0000] hover:text-[#A50000] transition-all cursor-pointer"
                    >
                      <span className="border-b border-[#8B0000] pb-0.5 group-hover/cta:border-white transition-colors">
                        EXPLORE RESTAURANT SOLUTIONS
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-1" />
                    </a>
                  </div>
                </div>

                {/* Right Cinematic Canvas */}
                <div className="col-span-7 relative">
                  <div className="group relative aspect-[16/9] max-h-[410px] w-full overflow-hidden rounded-xl border border-white/10 bg-[#09090b] shadow-2xl transition-all duration-700">
                    <img
                      src="/images/industry-1.webp"
                      alt="Restaurant atmosphere, culinary craftsmanship and dining experience"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover filter contrast-[1.05] brightness-90 transition-transform duration-1000 ease-out group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute bottom-4 right-5 flex items-center gap-2.5 text-[8.5px] uppercase tracking-[0.22em] text-white/70 backdrop-blur-md bg-black/40 px-2.5 py-1 rounded border border-white/10">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#8B0000]" />
                      <span>REF // RESTAURANT DIRECTION</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                key="interiors-chapter"
                className="relative grid grid-cols-12 items-center gap-8 animate-in fade-in duration-500"
              >
                {/* Large Background Numeral Watermark */}
                <span className="pointer-events-none absolute -right-6 -top-10 font-display text-[14vw] font-bold leading-none text-white/[0.02] select-none">
                  02
                </span>

                {/* Left Cinematic Canvas */}
                <div className="col-span-7 relative">
                  <div className="group relative aspect-[16/9] max-h-[410px] w-full overflow-hidden rounded-xl border border-white/10 bg-[#09090b] shadow-2xl transition-all duration-700">
                    <img
                      src="/images/industry-2.webp"
                      alt="Interior design studio spatial aesthetics and material craftsmanship"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover filter contrast-[1.05] brightness-90 transition-transform duration-1000 ease-out group-hover:scale-105"
                    />

                    {/* Subtle Dark Edge Gradient for Typographic Interaction */}
                    <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/20 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Editorial Coordinate Caption */}
                    <div className="absolute bottom-4 left-5 flex items-center gap-2.5 text-[8.5px] uppercase tracking-[0.22em] text-white/70 backdrop-blur-md bg-black/40 px-2.5 py-1 rounded border border-white/10">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#8B0000]" />
                      <span>REF // INTERIOR DESIGN DIRECTION</span>
                    </div>
                  </div>
                </div>

                {/* Right Content Column */}
                <div className="col-span-5 relative z-20 pl-4 space-y-4">
                  <div className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B0000]">
                    <span>02</span>
                    <span className="h-px w-5 bg-[#8B0000]" />
                    <span>INTERIOR DESIGN</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl lg:text-[36px] font-bold leading-[1.05] tracking-tight text-white">
                    Make The<br />
                    Space Speak.
                  </h3>

                  <p className="max-w-md xcess-intro-text text-sm sm:text-[14.5px] leading-relaxed text-neutral-300 pt-1">
                    Every project has a point of view. We help interior design businesses translate spaces, materials and details into compelling visual content and a digital presence that reflects the quality of their work.
                  </p>

                  {/* Subtle Service Tags */}
                  <div className="pt-1 flex flex-wrap gap-x-2.5 gap-y-1 text-[10px] uppercase tracking-[0.16em] text-neutral-400 font-medium">
                    <span>ARCHITECTURAL PHOTOGRAPHY</span>
                    <span className="text-neutral-600">·</span>
                    <span>PROJECT WALKTHROUGHS</span>
                    <span className="text-neutral-600">·</span>
                    <span>PORTFOLIO WEBSITES</span>
                    <span className="text-neutral-600">·</span>
                    <span>STUDIO IDENTITY</span>
                    <span className="text-neutral-600">·</span>
                    <span>CLIENT ACQUISITION</span>
                    <span className="text-neutral-600">·</span>
                    <span>LOCAL SEO</span>
                  </div>

                  <div className="pt-4">
                    <a
                      href="#solutions"
                      onClick={() => setSolutionIndustry('Interior Design')}
                      className="group/cta inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-[#8B0000] hover:text-[#A50000] transition-all cursor-pointer"
                    >
                      <span className="border-b border-[#8B0000] pb-0.5 group-hover/cta:border-white transition-colors">
                        EXPLORE INTERIOR DESIGN SOLUTIONS
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ===================================================================== */}
          {/* MOBILE EXPERIENCE (Sequential Storytelling with Full-Width Images)   */}
          {/* ===================================================================== */}
          <div className="lg:hidden space-y-10">
            {/* Chapter 01: Restaurants */}
            <div id="industries-restaurants" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B0000]">
                <span>01 — RESTAURANTS</span>
              </div>

              {/* Large Image */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-[#09090b]">
                <img
                  src="/images/industry-1.webp"
                  alt="Restaurant atmosphere and culinary craftsmanship"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover filter contrast-[1.05] brightness-95"
                />
                <div className="absolute bottom-3 right-3 text-[8.5px] uppercase tracking-[0.2em] text-white/60 bg-black/60 px-2 py-0.5 rounded border border-white/10">
                  REF // RESTAURANTS
                </div>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold leading-tight tracking-tight text-white">
                Make Them<br />
                Want To Be There.
              </h3>

              <p className="xcess-intro-text text-xs sm:text-sm leading-relaxed text-neutral-300">
                Visual and digital solutions to bring food, atmosphere and the dining experience to life.
              </p>

              {/* Service Tags */}
              <div className="flex flex-wrap gap-x-2 gap-y-1 text-[9.5px] sm:text-[10px] uppercase tracking-wider text-neutral-400">
                <span>FOOD PHOTOGRAPHY</span> · <span>SHORT-FORM REELS</span> · <span>WEBSITES</span> · <span>LOCAL SEO</span>
              </div>

              <div className="pt-1">
                <a
                  href="#solutions"
                  onClick={() => setSolutionIndustry('Restaurants')}
                  className="inline-flex items-center gap-2 py-2 min-h-[44px] text-xs font-bold uppercase tracking-wider text-[#8B0000] hover:text-[#A50000] cursor-pointer"
                >
                  <span>EXPLORE RESTAURANT SOLUTIONS</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Chapter 02: Interior Design */}
            <div id="industries-interiors" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B0000]">
                <span>02 — INTERIOR DESIGN</span>
              </div>

              {/* Large Image */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-[#09090b]">
                <img
                  src="/images/industry-2.webp"
                  alt="Interior design studio spatial aesthetics"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover filter contrast-[1.05] brightness-95"
                />
                <div className="absolute bottom-3 right-3 text-[8.5px] uppercase tracking-[0.2em] text-white/60 bg-black/60 px-2 py-0.5 rounded border border-white/10">
                  REF // INTERIORS
                </div>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold leading-tight tracking-tight text-white">
                Make The<br />
                Space Speak.
              </h3>

              <p className="xcess-intro-text text-xs sm:text-sm leading-relaxed text-neutral-300">
                Visual and digital solutions to showcase spaces, craftsmanship and design portfolio.
              </p>

              {/* Service Tags */}
              <div className="flex flex-wrap gap-x-2 gap-y-1 text-[9.5px] sm:text-[10px] uppercase tracking-wider text-neutral-400">
                <span>ARCHITECTURAL PHOTOGRAPHY</span> · <span>PORTFOLIOS</span> · <span>STUDIO IDENTITY</span> · <span>CLIENT ACQUISITION</span>
              </div>

              <div className="pt-1">
                <a
                  href="#solutions"
                  onClick={() => setSolutionIndustry('Interior Design')}
                  className="inline-flex items-center gap-2 py-2 min-h-[44px] text-xs font-bold uppercase tracking-wider text-[#8B0000] hover:text-[#A50000] cursor-pointer"
                >
                  <span>EXPLORE INTERIOR DESIGN SOLUTIONS</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02. SERVICES (Three Large Horizontal Editorial Chapters: CREATE, BUILD, GROW) */}
      {/* ========================================================================= */}
      <section id="services" className="relative border-b border-white/10 bg-[#050505] pt-8 sm:pt-12 lg:pt-14 pb-12 sm:pb-20 lg:pb-28 overflow-hidden scroll-mt-20">
        {/* Subtle Ambient Background Light */}
        <div className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(139,0,0,0.12),transparent)]" />

        <div className="container-xcess relative z-10">
          {/* Section Intro: SERVICES / What We Do. */}
          <Reveal className="mb-8 sm:mb-12 lg:mb-14">
            <div className="flex items-center gap-2 xcess-section-label mb-3 sm:mb-4">
              <span>SERVICES</span>
            </div>
            <div className="mt-2">
              <h2 className="xcess-section-heading">
                What We <span className="text-[#8B0000]">Do.</span>
              </h2>
            </div>
          </Reveal>

          {/* Three Large Horizontal Editorial Chapters */}
          <div className="space-y-10 sm:space-y-16 lg:space-y-24">
            {serviceChapters.map((chapter, index) => {
              const isEven = index % 2 === 1 // Chapter 02 (BUILD): Image Left / Text Right on desktop

              return (
                <article
                  key={chapter.num}
                  id={chapter.id}
                  className="pt-8 sm:pt-12 lg:pt-16 border-t border-[#2A2A2A] first:border-t-0 first:pt-0 scroll-mt-24"
                >
                  <Reveal>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 xl:gap-16 items-center">
                      {/* Desktop Image Column when isEven (BUILD - Image Left on desktop) */}
                      {isEven && (
                        <div className="hidden lg:block lg:col-span-6">
                          <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-white/10 bg-[#09090b] shadow-[0_16px_40px_rgba(0,0,0,0.6)] group">
                            <img
                              src={chapter.image}
                              alt={`${chapter.name} — ${chapter.statement}`}
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full object-cover filter contrast-[1.05] brightness-90 transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-white/80 backdrop-blur-md bg-black/50 px-3 py-1.5 rounded-lg border border-white/10">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#8B0000]" />
                              <span>{chapter.badge}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Text Column: Chapter Info, Mobile Image & Editorial Service Rows */}
                      <div className="lg:col-span-6 space-y-5 sm:space-y-7">
                        {/* Chapter Header */}
                        <div className="space-y-2 sm:space-y-3">
                          <div className="flex items-center gap-2 text-[10.5px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-[#8B0000]">
                            <span>{chapter.label}</span>
                          </div>

                          <h3 className="font-display text-2xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[#F8F8F8] leading-none">
                            {chapter.name}
                          </h3>

                          <p className="xcess-intro-text text-xs sm:text-[15px] leading-relaxed text-[#B3B3B3] max-w-lg">
                            {chapter.statement}
                          </p>
                        </div>

                        {/* Mobile-Only Cinematic Image (Placed naturally between Header and Services) */}
                        <div className="block lg:hidden relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-[#09090b] shadow-xl my-3">
                          <img
                            src={chapter.image}
                            alt={`${chapter.name} — ${chapter.statement}`}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover filter contrast-[1.05] brightness-90"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                          <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[8px] uppercase tracking-[0.22em] text-white/80 backdrop-blur-md bg-black/50 px-2.5 py-1 rounded-md border border-white/10">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#8B0000]" />
                            <span>{chapter.badge}</span>
                          </div>
                        </div>

                        {/* Three Editorial Service Rows */}
                        <div className="divide-y divide-[#2A2A2A] border-y border-[#2A2A2A]">
                          {chapter.services.map((service) => (
                            <div
                              key={service.code}
                              className="group py-2.5 sm:py-3.5 lg:py-4.5 flex items-start justify-between gap-4 transition-colors duration-200 hover:bg-white/[0.02] px-1 sm:px-2 -mx-1 sm:-mx-2 rounded-lg"
                            >
                              <div className="space-y-0.5 sm:space-y-1 flex-1 pr-2">
                                <div className="flex items-center gap-2.5 sm:gap-3">
                                  <span className="text-[10.5px] sm:text-xs font-mono font-semibold text-[#8B0000] shrink-0">
                                    {service.code}
                                  </span>
                                  <h4 className="font-display text-[13.5px] sm:text-[15px] font-bold tracking-tight text-[#F8F8F8] group-hover:text-white transition-colors">
                                    {service.title}
                                  </h4>
                                </div>
                                <p className="hidden lg:block text-xs sm:text-[13.5px] leading-relaxed text-[#B3B3B3] pl-7 sm:pl-8 font-sans">
                                  {service.desc}
                                </p>
                              </div>
                              <div className="pt-0.5 text-neutral-600 group-hover:text-neutral-300 transition-colors shrink-0">
                                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Desktop Image Column when !isEven (CREATE & GROW - Image Right on desktop) */}
                      {!isEven && (
                        <div className="hidden lg:block lg:col-span-6">
                          <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-white/10 bg-[#09090b] shadow-[0_16px_40px_rgba(0,0,0,0.6)] group">
                            <img
                              src={chapter.image}
                              alt={`${chapter.name} — ${chapter.statement}`}
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full object-cover filter contrast-[1.05] brightness-90 transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-white/80 backdrop-blur-md bg-black/50 px-3 py-1.5 rounded-lg border border-white/10">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#8B0000]" />
                              <span>{chapter.badge}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Reveal>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03. THE BIGGER PICTURE (Editorial Two-Column Spread)                      */}
      {/* ========================================================================= */}
      <section id="approach" className="approach-section bg-[#F3F2EF] py-10 sm:py-16 lg:py-24 text-[#050505]">
        <div className="container-xcess">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 xl:gap-20 items-start">
              {/* Left Column: Section Label & Main Editorial Heading (No Paragraph) */}
              <div className="lg:col-span-5 space-y-2 sm:space-y-4">
                <div className="flex items-center gap-2 xcess-section-label mb-2 sm:mb-4">
                  <span>THE BIGGER PICTURE</span>
                </div>

                <h2 className="xcess-section-heading-expressive">
                  <span className="text-[#050505]">It All</span><br />
                  <span className="text-[#8B0000]">Matters.</span>
                </h2>
              </div>

              {/* Right Column: Five Connected Digital Touchpoints */}
              <div className="lg:col-span-7 divide-y divide-black/[0.12] border-y border-black/[0.12]">
                {[
                  { num: '01', title: 'PHOTOGRAPHY', desc: 'The way people see you.' },
                  { num: '02', title: 'WEBSITE', desc: 'The place they understand you.' },
                  { num: '03', title: 'GOOGLE', desc: 'The place they find you.' },
                  { num: '04', title: 'SOCIAL', desc: 'The place they remember you.' },
                  { num: '05', title: 'ADS', desc: 'The way you reach new people.' },
                ].map((item) => (
                  <div key={item.num} className="py-3.5 sm:py-4.5 lg:py-5.5 first:pt-2.5 last:pb-2.5">
                    <p className="text-xs sm:text-[13px] font-mono font-bold uppercase tracking-wider text-[#8B0000]">
                      {item.num} / <span className="text-[#050505] font-sans font-bold tracking-[0.16em]">{item.title}</span>
                    </p>
                    <p className="mt-1 xcess-intro-text text-xs sm:text-[15px] leading-relaxed text-[#252525]">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04. WORK (Three-Column Editorial Concept Gallery / Mobile Carousel)        */}
      {/* ========================================================================= */}
      <section id="showcase" className="showcase-section py-8 sm:py-16 lg:py-24 scroll-mt-20">
        <div className="container-xcess">
          {/* Section Header */}
          <Reveal className="mb-6 sm:mb-12 lg:mb-14">
            <div className="flex items-center gap-2 xcess-section-label mb-2 sm:mb-3.5">
              <span>WORK</span>
            </div>
            <div>
              <h2 className="xcess-section-heading">
                Selected Concepts.
              </h2>
              <p className="mt-2 sm:mt-3 xcess-intro-text text-xs sm:text-[14px] text-neutral-400 font-normal tracking-wide">
                Selected self-initiated concepts.
              </p>
            </div>
          </Reveal>

          {/* Desktop & Tablet: Three-Column Editorial Gallery (Unchanged) */}
          <Reveal className="hidden md:block">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 xl:gap-8">
              {workConcepts.map((concept) => (
                <article key={concept.num} className="group">
                  {/* Cinematic Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-[#09090b] shadow-[0_14px_35px_rgba(0,0,0,0.55)]">
                    <img
                      src={concept.image}
                      alt={concept.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover filter contrast-[1.05] brightness-90 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none opacity-50 group-hover:opacity-30 transition-opacity duration-500" />
                    <div className="absolute bottom-3.5 right-3.5 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 hidden sm:flex items-center px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/15 text-[9.5px] font-mono font-bold uppercase tracking-[0.16em] text-white">
                      <span>VIEW CONCEPT</span>
                    </div>
                  </div>

                  {/* Minimal Editorial Caption Directly Below Image */}
                  <div className="mt-2.5 sm:mt-4 space-y-0.5 sm:space-y-1">
                    <p className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#8B0000]">
                      {concept.num} / {concept.category}
                    </p>
                    <h3 className="font-display text-sm sm:text-[14.5px] font-medium tracking-tight text-[#E5E5E5] group-hover:text-white transition-colors">
                      {concept.title}
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>

          {/* Mobile Work Carousel (One card at a time, touch swipe + 5s autoplay + dots) */}
          <div className="block md:hidden">
            <div
              className="relative w-full overflow-hidden select-none touch-pan-y cursor-grab active:cursor-grabbing"
              onTouchStart={handleWorkTouchStart}
              onTouchMove={handleWorkTouchMove}
              onTouchEnd={handleWorkTouchEnd}
              onPointerDown={handleWorkPointerDown}
              onPointerMove={handleWorkPointerMove}
              onPointerUp={handleWorkPointerUp}
              onPointerCancel={handleWorkPointerUp}
            >
              <div
                className="flex transition-transform duration-600 ease-out will-change-transform"
                style={{ transform: `translateX(-${activeWorkIndex * 100}%)` }}
              >
                {workConcepts.map((concept) => (
                  <div key={concept.num} className="w-full shrink-0">
                    <article className="w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0e] shadow-[0_12px_30px_rgba(0,0,0,0.6)]">
                      {/* Cinematic Image Container */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#09090b]">
                        <img
                          src={concept.image}
                          alt={concept.alt}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover filter contrast-[1.05] brightness-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none opacity-40" />
                      </div>

                      {/* Compact Editorial Caption Directly Below Image */}
                      <div className="px-4 py-3.5 space-y-0.5 bg-[#0c0c0e]">
                        <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#8B0000]">
                          {concept.num} / {concept.category}
                        </p>
                        <h3 className="font-display text-sm font-medium tracking-tight text-white">
                          {concept.title}
                        </h3>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            {/* Dot Indicators */}
            <div
              className="mt-3.5 sm:mt-4 flex items-center justify-center gap-1"
              role="tablist"
              aria-label="Concept slides"
            >
              {workConcepts.map((concept, index) => {
                const isActive = index === activeWorkIndex
                return (
                  <button
                    key={concept.num}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Go to concept ${concept.num}: ${concept.title}`}
                    onClick={() => handleWorkDotClick(index)}
                    className="p-2 flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8B0000] rounded-full"
                  >
                    <span
                      className={`h-2 w-2 rounded-full transition-all duration-300 ${isActive
                        ? 'bg-[#8B0000] scale-110'
                        : 'bg-neutral-600 hover:bg-neutral-400'
                        }`}
                    />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05. PROCESS (Fixed Viewport Scroll-Driven Sequence - Desktop & Tablet)     */}
      {/* ========================================================================= */}
      <section
        id="process"
        ref={processSectionRef}
        className="hidden md:block relative bg-[#050505] border-y border-[#2A2A2A] sm:h-[1600px] lg:h-[2200px]"
      >
        {/* Pinned Sticky Viewport Container - Screen Fitted */}
        <div
          ref={stickyContainerRef}
          className="sticky top-20 md:top-24 w-full min-h-[calc(100vh-5rem)] lg:h-[calc(100vh-6.5rem)] flex flex-col justify-between py-3 sm:py-5 lg:py-6"
        >
          <div className="container-xcess w-full h-full flex flex-col justify-between flex-1">
            {/* 1. Section Header */}
            <div className="flex items-end justify-between pb-2.5 sm:pb-4 border-b border-[#222222]">
              <div>
                <p className="xcess-section-label">
                  PROCESS
                </p>
                <h2 className="mt-1 xcess-section-heading text-[#F8F8F8]">
                  How We Work.
                </h2>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-[#777777] uppercase tracking-[0.2em] shrink-0 pb-0.5">
                <span className="hidden sm:inline">STAGE</span>
                <span className="text-white bg-white/[0.06] border border-white/10 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded font-bold text-xs sm:text-sm">
                  0{processStage + 1} <span className="text-[#888]">/ 05</span>
                </span>
              </div>
            </div>

            {/* 2. Full-Screen 2-Column Stage Viewport Canvas */}
            <div className="flex-1 flex flex-col justify-center py-3 lg:py-6">
              <div
                key={processStage}
                className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-stretch animate-in fade-in zoom-in-95 duration-400 my-auto"
              >
                {/* Left Column (col-span-7): Headline, Narrative, Key Deliverables */}
                <div className="lg:col-span-7 flex flex-col justify-center space-y-2.5 sm:space-y-4 lg:space-y-5">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#8B0000]/10 border border-[#8B0000]/25 text-[9.5px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#8B0000] w-fit">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8B0000] animate-ping" />
                    <span>STAGE {processStages[processStage].num} // {processStages[processStage].phase}</span>
                  </div>

                  <h3 className="font-display text-xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-[1.1]">
                    {processStages[processStage].tagline}
                  </h3>

                  <p className="hidden lg:block text-sm sm:text-base md:text-[15.5px] leading-relaxed text-[#B3B3B3] max-w-xl font-sans">
                    {processStages[processStage].desc}
                  </p>

                  {/* Deliverables / Pillars */}
                  <div className="pt-0.5 sm:pt-1 flex flex-wrap gap-1.5 sm:gap-2">
                    {processStages[processStage].pillars.map((pillar, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md bg-white/[0.03] border border-white/10 text-[10px] sm:text-xs font-mono text-[#D4D4D4]"
                      >
                        <span className="text-[#8B0000] font-bold">✓</span>
                        <span>{pillar}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column (col-span-5): Glassmorphism Focus Breakdown Card */}
                <div className="hidden lg:block lg:col-span-5 relative">
                  <div className="relative h-full rounded-xl border border-white/10 bg-[#0a0a0c]/90 backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
                    {/* Subtle Watermark Stage Number */}
                    <div className="absolute right-3 bottom-0 text-[120px] font-mono font-black text-white/[0.025] select-none pointer-events-none leading-none">
                      {processStages[processStage].num}
                    </div>

                    {/* Card Header: Focus Areas & Timeline */}
                    <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8E8E93]">
                        CORE ACTIONS
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#8B0000]/15 border border-[#8B0000]/30 text-[10px] font-mono font-bold text-[#FF5555]">
                        <span>⏱ {processStages[processStage].timeline}</span>
                      </div>
                    </div>

                    {/* 3 Structured Focus Points */}
                    <div className="relative z-10 my-3.5 space-y-3">
                      {processStages[processStage].focusPoints.map((pt) => (
                        <div key={pt.code} className="flex items-start gap-2.5">
                          <span className="shrink-0 mt-0.5 px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/10 text-[9.5px] font-mono font-bold text-[#8B0000]">
                            {pt.code}
                          </span>
                          <div>
                            <h4 className="text-xs sm:text-[13px] font-display font-semibold text-[#F0F0F0]">
                              {pt.title}
                            </h4>
                            <p className="mt-0.5 text-[11px] sm:text-[11.5px] text-[#909095] leading-relaxed">
                              {pt.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Card Footer: Live Stage Progress */}
                    <div className="relative z-10 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#666]">
                      <span>PHASE STATUS</span>
                      <span className="text-[#8B0000] font-bold">
                        {Math.round((processStage + 1) * 20)}% COMPLETE
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Horizontal Progress Timeline */}
            <div className="pt-2.5 sm:pt-4 border-t border-[#222222]">
              <div className="relative mt-1 sm:mt-2 mb-1.5 sm:mb-3">
                {/* Inactive Rail Line (#2A2A2A) */}
                <div className="absolute top-[7px] left-[10%] right-[10%] h-[1.5px] bg-[#2A2A2A]" />

                {/* Active Crimson Progress Line (#8B0000) */}
                <div
                  className="absolute top-[7px] left-[10%] h-[1.5px] bg-[#8B0000] transition-[width] duration-150 ease-out"
                  style={{
                    width: `${Math.min(1, Math.max(0, processProgress)) * 80}%`
                  }}
                />

                {/* 5 Stage Nodes */}
                <div className="relative flex justify-between items-start z-10">
                  {processStages.map((stage, idx) => {
                    const isActive = processStage === idx
                    const isPassed = processStage > idx
                    return (
                      <button
                        key={stage.num}
                        type="button"
                        onClick={() => scrollToStage(idx)}
                        className="group flex flex-col items-center text-center cursor-pointer focus:outline-none transition-all duration-300"
                        style={{ width: '20%' }}
                      >
                        {/* Node Dot */}
                        <div className="relative flex items-center justify-center h-3.5 w-3.5 sm:h-4 sm:w-4">
                          <div
                            className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full transition-all duration-300 ${isActive
                              ? 'bg-[#8B0000] border-2 border-[#8B0000] shadow-[0_0_14px_rgba(139,0,0,0.9)] ring-4 ring-[#8B0000]/25 scale-125'
                              : isPassed
                                ? 'bg-[#8B0000] border border-[#8B0000]'
                                : 'bg-[#050505] border border-[#333333] group-hover:border-[#555555]'
                              }`}
                          />
                        </div>

                        {/* Node Number & Title */}
                        <div className="mt-1 sm:mt-1.5 flex flex-col items-center gap-0.5">
                          <span
                            className={`font-mono text-[9px] sm:text-[10.5px] transition-colors duration-300 ${isActive
                              ? 'text-[#8B0000] font-bold'
                              : isPassed
                                ? 'text-[#8B0000]/70 font-medium'
                                : 'text-[#555555]'
                              }`}
                          >
                            {stage.num}
                          </span>
                          <span
                            className={`font-display text-[8.5px] sm:text-[10.5px] md:text-xs tracking-[0.1em] sm:tracking-[0.14em] uppercase transition-all duration-300 truncate max-w-[54px] sm:max-w-none ${isActive
                              ? 'text-white font-bold'
                              : isPassed
                                ? 'text-[#888888] font-medium'
                                : 'text-[#555555] group-hover:text-[#777777]'
                              }`}
                          >
                            {stage.title}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06. INDUSTRY CAPABILITIES (Refined Editorial Layout)                       */}
      {/* ========================================================================= */}
      <section id="solutions" className="solutions-section pt-10 sm:pt-16 lg:pt-24 pb-10 sm:pb-14 lg:pb-20 border-b border-[#2A2A2A] scroll-mt-24">
        <div className="container-xcess">
          {/* Section Header: Left-Aligned Editorial Hierarchy */}
          <div className="max-w-2xl">
            <p className="xcess-section-label">
              INDUSTRY CAPABILITIES
            </p>
            <h2 className="mt-1.5 sm:mt-2 xcess-section-heading">
              Built for Your Industry.
            </h2>
            <p className="mt-2 sm:mt-2.5 xcess-intro-text text-xs sm:text-sm lg:text-[15px] text-[#8E8E93] leading-relaxed max-w-xl">
              Focused creative and digital solutions for restaurants and interior design businesses.
            </p>
          </div>

          {/* Editorial Industry Selector Tabs */}
          <div className="mt-5 sm:mt-8 mb-5 sm:mb-8 flex items-center gap-8 sm:gap-12 border-b border-white/10">
            <button
              type="button"
              onClick={() => setSolutionIndustry('Restaurants')}
              className={`group relative pb-2.5 sm:pb-3 text-xs sm:text-[13px] font-mono uppercase tracking-[0.18em] transition-all cursor-pointer ${solutionIndustry === 'Restaurants'
                ? 'text-white font-bold'
                : 'text-[#666666] hover:text-[#999999]'
                }`}
            >
              <span className="text-[#8B0000] font-bold mr-2">01</span>
              <span>RESTAURANTS</span>
              {solutionIndustry === 'Restaurants' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8B0000]" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setSolutionIndustry('Interior Design')}
              className={`group relative pb-2.5 sm:pb-3 text-xs sm:text-[13px] font-mono uppercase tracking-[0.18em] transition-all cursor-pointer ${solutionIndustry === 'Interior Design'
                ? 'text-white font-bold'
                : 'text-[#666666] hover:text-[#999999]'
                }`}
            >
              <span className="text-[#8B0000] font-bold mr-2">02</span>
              <span>INTERIOR DESIGN</span>
              {solutionIndustry === 'Interior Design' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8B0000]" />
              )}
            </button>
          </div>

          {/* Editorial 2-Column Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
            {/* Left Column: Image (~42-45% on desktop) */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-[#09090b] shadow-[0_14px_35px_rgba(0,0,0,0.55)]">
                <img
                  key={solutionIndustry}
                  src={currentSol.image}
                  alt={`${solutionIndustry} execution`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover filter contrast-[1.05] brightness-95 transition-transform duration-700 ease-out hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-[#8B0000]">
                  {currentSol.badge}
                </div>
              </div>
            </div>

            {/* Right Column: Title, Description, and Editorial Rows (~55-58% on desktop) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              {/* Industry Headline & Description */}
              <div>
                <h3 className="font-display text-lg sm:text-2xl lg:text-[25px] font-bold leading-snug tracking-tight text-white">
                  <span className="block lg:hidden">{currentSol.mobileTitle}</span>
                  <span className="hidden lg:block">{currentSol.title}</span>
                </h3>
                <p className="mt-1.5 sm:mt-2.5 xcess-intro-text text-xs sm:text-[13.5px] leading-relaxed text-[#9E9E9E] max-w-xl">
                  <span className="block lg:hidden">{currentSol.mobileCopy}</span>
                  <span className="hidden lg:block">{currentSol.copy}</span>
                </p>
              </div>

              {/* 4 Clean Editorial Capability Rows with thin dividers */}
              <div className="mt-5 sm:mt-6 border-t border-white/10 divide-y divide-white/10">
                {currentSol.capabilities.map((cap, idx) => (
                  <div key={cap.label} className="py-2.5 sm:py-3.5 lg:py-4 flex items-start gap-3 sm:gap-4 group">
                    <span className="shrink-0 font-mono text-[10px] sm:text-[11px] font-bold text-[#8B0000] pt-0.5">
                      0{idx + 1}
                    </span>
                    <div className="space-y-0.5">
                      <h4 className="font-display text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#EAEAEA] group-hover:text-white transition-colors">
                        {cap.label}
                      </h4>
                      <p className="text-xs sm:text-[12.5px] text-[#8E8E93] leading-relaxed font-sans">
                        <span className="block lg:hidden">{cap.mobileDesc}</span>
                        <span className="hidden lg:block">{cap.desc}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 07. WHY XCESS MEDIA (Editorial Principles List)                           */}
      {/* ========================================================================= */}
      <section id="why" className="editorial-light bg-[#F3F2EF] py-10 sm:py-16 lg:py-20 text-[#050505] border-b border-black/10 scroll-mt-24">
        <div className="container-xcess">
          {/* Section Header: Left-Aligned Editorial Hierarchy */}
          <div className="max-w-2xl">
            <p className="xcess-section-label">
              WHY XCESS MEDIA
            </p>
            <h2 className="mt-1.5 sm:mt-2 xcess-section-heading text-[#050505]">
              Why Xcess Media.
            </h2>
            <p className="mt-2 sm:mt-2.5 xcess-intro-text text-xs sm:text-sm lg:text-[15px] text-[#555555] leading-relaxed max-w-xl">
              Creative thinking, practical execution and attention to the details that matter.
            </p>
          </div>

          {/* Continuous Editorial Principles Rows */}
          <div className="mt-6 sm:mt-10 lg:mt-12 border-t border-black/10 divide-y divide-black/10">
            {principles.map((p) => (
              <div
                key={p.title}
                className="py-3.5 sm:py-5 lg:py-7 grid grid-cols-1 md:grid-cols-12 gap-1 sm:gap-4 md:gap-8 items-baseline group transition-colors"
              >
                {/* Number and Title */}
                <div className="md:col-span-4 flex items-baseline gap-2 sm:gap-3">
                  <span className="font-mono text-xs sm:text-[13px] font-bold text-[#8B0000] shrink-0">
                    {p.num} —
                  </span>
                  <h3 className="font-display text-sm sm:text-lg md:text-xl font-bold tracking-tight text-[#050505] group-hover:text-[#8B0000] transition-colors duration-300">
                    {p.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="md:col-span-8">
                  <p className="text-xs sm:text-sm md:text-[14.5px] leading-relaxed text-[#555555] max-w-2xl font-sans">
                    <span className="block lg:hidden">{p.mobileCopy}</span>
                    <span className="hidden lg:block">{p.copy}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 08. PACKAGES (Plans Built Around Your Business)                           */}
      {/* ========================================================================= */}
      <section id="packages" className="packages-section py-8 sm:py-16 lg:py-20 border-b border-[#2A2A2A] scroll-mt-24">
        <div className="container-xcess">
          {/* Section Header: Left-Aligned Editorial Hierarchy */}
          <div className="max-w-2xl">
            <p className="xcess-section-label">
              PACKAGES
            </p>
            <h2 className="mt-1.5 sm:mt-2 xcess-section-heading">
              Plans Built Around Your Business.
            </h2>
            <p className="mt-2 sm:mt-2.5 xcess-intro-text text-xs sm:text-sm lg:text-[15px] text-[#8E8E93] leading-relaxed max-w-xl">
              Choose a focused starting point or build a package around exactly what you need.
            </p>
          </div>

          {/* Desktop & Tablet: Industry Selector Tabs */}
          <div className="hidden md:flex items-center gap-8 sm:gap-12 border-b border-white/10 mt-5 sm:mt-8 mb-6 sm:mb-10">
            <button
              type="button"
              onClick={() => handleIndustryChange('Restaurants')}
              className={`group relative pb-2.5 sm:pb-3.5 text-xs sm:text-[13px] font-mono uppercase tracking-[0.18em] transition-all cursor-pointer ${industry === 'Restaurants' ? 'text-white font-bold' : 'text-[#666666] hover:text-[#999999]'
                }`}
            >
              <span className="text-[#8B0000] font-bold mr-2">01 —</span>
              <span>RESTAURANTS</span>
              {industry === 'Restaurants' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8B0000]" />
              )}
            </button>
            <button
              type="button"
              onClick={() => handleIndustryChange('Interior Design')}
              className={`group relative pb-2.5 sm:pb-3.5 text-xs sm:text-[13px] font-mono uppercase tracking-[0.18em] transition-all cursor-pointer ${industry === 'Interior Design' ? 'text-white font-bold' : 'text-[#666666] hover:text-[#999999]'
                }`}
            >
              <span className="text-[#8B0000] font-bold mr-2">02 —</span>
              <span>INTERIOR DESIGN</span>
              {industry === 'Interior Design' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8B0000]" />
              )}
            </button>
          </div>

          {/* Mobile: Industry Selector (Matching Image 2 Reference) */}
          <div className="flex md:hidden items-center justify-center gap-3 my-4 sm:my-5">
            <button
              type="button"
              onClick={() => handleIndustryChange('Restaurants')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${industry === 'Restaurants'
                ? 'bg-[#8B0000] text-white shadow-[0_2px_10px_rgba(139,0,0,0.4)]'
                : 'text-[#888888] hover:text-white font-semibold'
                }`}
            >
              RESTAURANTS
            </button>
            <button
              type="button"
              onClick={() => handleIndustryChange('Interior Design')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${industry === 'Interior Design'
                ? 'bg-[#8B0000] text-white shadow-[0_2px_10px_rgba(139,0,0,0.4)]'
                : 'text-[#888888] hover:text-white font-semibold'
                }`}
            >
              INTERIOR DESIGN
            </button>
          </div>

          {/* Desktop & Tablet: Package Cards Grid (Unchanged) */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-5 items-stretch">
            {packagePlans[industry].map((plan) => {
              const isSelected = selectedPackage === plan.name
              const isCustom = plan.name === 'Custom'
              const isRecommended = plan.recommended
              const customCalc = calculateCustomPackageTotal(customServices, industry)
              const displayPrice = isCustom
                ? (customServices.length > 0 ? formatINR(customCalc.total) : plan.price)
                : plan.price

              return (
                <div
                  key={plan.name}
                  onClick={() => setSelectedPackage(plan.name)}
                  className={`relative rounded-xl p-4 sm:p-5.5 transition-all duration-300 ease-out flex flex-col justify-between cursor-pointer group select-none ${isSelected
                    ? 'bg-[#0D0D0F] border border-[#8B0000] ring-1 ring-[#8B0000]/60 shadow-[0_8px_30px_rgba(139,0,0,0.22)] scale-[1.01] sm:scale-[1.02] z-10'
                    : 'bg-[#0D0D0F] border border-[#2A2A2A] hover:border-[#8B0000] hover:scale-[1.01] sm:hover:scale-[1.02] hover:z-20 hover:shadow-[0_12px_32px_rgba(0,0,0,0.6)]'
                    }`}
                >
                  <div>
                    {/* Header Row: Num, Badges */}
                    <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
                      <span className="font-mono text-xs font-bold tracking-widest text-[#B3B3B3]">
                        {plan.num}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {isRecommended && (
                          <span className="bg-[#8B0000]/15 text-[#FF5555] border border-[#8B0000]/40 text-[9px] uppercase tracking-[0.2em] font-mono px-2 py-0.5 rounded-full font-bold">
                            RECOMMENDED
                          </span>
                        )}
                        {isSelected && !isRecommended && (
                          <span className="bg-white/10 text-neutral-300 border border-white/15 text-[9px] uppercase tracking-[0.2em] font-mono px-2 py-0.5 rounded-full font-semibold">
                            SELECTED
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Package Title */}
                    <h3 className="font-display text-base sm:text-xl font-bold tracking-tight text-[#F8F8F8]">
                      {plan.name.toUpperCase()}
                    </h3>

                    {/* Price */}
                    <div className="mt-1 sm:mt-2 flex items-baseline gap-1.5">
                      <span className="font-display text-xl sm:text-[25px] font-bold tracking-tight text-[#F8F8F8]">
                        {displayPrice}
                      </span>
                      {plan.priceSuffix && (
                        <span className="text-[11px] sm:text-xs text-[#B3B3B3] font-normal tracking-normal font-sans">
                          {plan.priceSuffix}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="mt-1 text-[11px] sm:text-xs leading-relaxed text-[#B3B3B3] min-h-[auto] lg:min-h-[34px] font-sans">
                      {plan.description}
                    </p>

                    {/* Divider */}
                    <div className="my-2.5 sm:my-3 border-t border-[#2A2A2A]" />

                    {/* Section Label: INCLUDES or CHOOSE SERVICES */}
                    <div className="mb-2 sm:mb-2.5 flex items-center justify-between">
                      <span className="text-[9.5px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-[#B3B3B3]/70 font-semibold">
                        {isCustom ? 'CHOOSE SERVICES' : 'INCLUDES'}
                      </span>
                      {isCustom && (
                        <span className="text-[9px] font-mono uppercase tracking-wider text-[#8B0000] font-bold">
                          {customServices.length} {customServices.length === 1 ? 'SERVICE' : 'SERVICES'} SELECTED
                        </span>
                      )}
                    </div>

                    {/* Fixed Package Service Rows */}
                    {!isCustom && plan.items && (
                      <ul className="space-y-1 sm:space-y-2">
                        {plan.items.map((item) => (
                          <li
                            key={item.name}
                            className={`flex items-start gap-2 text-[10.5px] sm:text-[11.5px] leading-snug font-sans ${item.included ? 'text-[#F8F8F8]' : 'text-neutral-500/70'
                              }`}
                          >
                            {item.included ? (
                              <span className="mt-0.5 flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-[#8B0000]/20 text-[#8B0000]">
                                <Check className="h-2 w-2 stroke-[2.5]" />
                              </span>
                            ) : (
                              <span className="mt-0.5 flex h-3 w-3 shrink-0 items-center justify-center text-neutral-600 font-mono text-[9px] select-none">
                                ✕
                              </span>
                            )}
                            <span className={item.included ? 'text-[#E5E5E5] font-normal' : 'text-neutral-500'}>
                              {item.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Custom Interactive Checkbox Checklist - 2 COLUMNS ON DESKTOP */}
                    {isCustom && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-1.5 gap-y-1">
                        {customServiceList[industry].map((service) => {
                          const isChecked = customServices.includes(service)
                          return (
                            <button
                              key={service}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleCustomService(service)
                              }}
                              aria-pressed={isChecked}
                              className={`flex items-center gap-1.5 text-left text-[10px] xl:text-[10.5px] py-1 px-1 rounded hover:bg-white/[0.04] transition-colors duration-150 cursor-pointer ${isChecked ? 'text-[#F8F8F8] font-medium' : 'text-neutral-400 hover:text-neutral-200'
                                }`}
                            >
                              <span
                                className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border transition-all duration-150 ${isChecked
                                  ? 'bg-[#8B0000] border-[#8B0000] text-white shadow-[0_0_6px_rgba(139,0,0,0.5)]'
                                  : 'border-[#3A3A3A] bg-black/40 hover:border-neutral-500'
                                  }`}
                              >
                                {isChecked && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                              </span>
                              <span className="truncate leading-tight font-sans">{service}</span>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="mt-4 sm:mt-5 pt-1 sm:pt-2">
                    <Link
                      href={`/contact?mode=package&industry=${encodeURIComponent(industry)}&package=${encodeURIComponent(
                        plan.name
                      )}${isCustom ? `&services=${encodeURIComponent(customServices.join(','))}` : ''}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedPackage(plan.name)
                      }}
                      className={`w-full py-2.5 sm:py-3 px-3.5 min-h-[38px] sm:min-h-[40px] rounded-lg text-[10.5px] sm:text-[11.5px] font-bold uppercase tracking-[0.16em] flex items-center justify-center transition-all duration-300 ${isSelected
                        ? 'bg-[#8B0000] hover:bg-[#A50000] text-white shadow-[0_4px_16px_rgba(139,0,0,0.35)]'
                        : 'bg-white/[0.04] hover:bg-white/[0.08] text-white border border-[#2A2A2A] hover:border-[#3A3A3A]'
                        }`}
                    >
                      {plan.ctaText}
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Mobile: Centered Package Carousel (Matching Image 2 Reference) */}
          <div className="block md:hidden">
            {(() => {
              const cardWidth = Math.min(Math.max(packageContainerWidth * 0.78, 255), 335)
              const cardGap = 12
              const trackOffset = (packageContainerWidth - cardWidth) / 2 - activePackageIndex * (cardWidth + cardGap)

              return (
                <div
                  ref={packageCarouselRef}
                  className="relative w-full overflow-hidden select-none touch-pan-y py-5 cursor-grab active:cursor-grabbing"
                  onTouchStart={handlePackageTouchStart}
                  onTouchMove={handlePackageTouchMove}
                  onTouchEnd={handlePackageTouchEnd}
                  onPointerDown={handlePackagePointerDown}
                  onPointerMove={handlePackagePointerMove}
                  onPointerUp={handlePackagePointerUp}
                  onPointerCancel={handlePackagePointerUp}
                >
                  <div
                    className="flex items-center transition-transform duration-500 ease-out will-change-transform"
                    style={{
                      transform: `translateX(${trackOffset}px)`,
                      gap: `${cardGap}px`,
                    }}
                  >
                    {packagePlans[industry].map((plan, index) => {
                      const isActive = index === activePackageIndex
                      const isCustom = plan.name === 'Custom'
                      const isRecommended = plan.recommended
                      const customCalc = calculateCustomPackageTotal(customServices, industry)
                      const displayPrice = isCustom
                        ? (customServices.length > 0 ? formatINR(customCalc.total) : plan.price)
                        : plan.price

                      return (
                        <div
                          key={plan.name}
                          onClick={() => {
                            if (!isActive) setActivePackageIndex(index)
                          }}
                          style={{ width: `${cardWidth}px` }}
                          className={`shrink-0 rounded-2xl transition-all duration-400 ease-out flex flex-col justify-between cursor-pointer select-none ${isActive
                            ? 'min-h-[460px] py-5 px-4 sm:py-6 sm:px-5 bg-[#0D0D0F] border border-[#8B0000] ring-1 ring-[#8B0000]/40 shadow-[0_8px_30px_rgba(139,0,0,0.22)] opacity-100 z-10'
                            : 'min-h-[418px] py-3.5 px-4 sm:py-4 sm:px-5 bg-[#0D0D0F] border border-[#2A2A2A] opacity-70 hover:opacity-90'
                            }`}
                        >
                          <div>
                            {/* Header Row: Num, Badges */}
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <span className="font-mono text-xs font-bold tracking-widest text-[#B3B3B3]">
                                {plan.num}
                              </span>
                              {isRecommended && (
                                <span className="bg-[#8B0000]/20 text-[#FF5555] border border-[#8B0000]/40 text-[9px] uppercase tracking-[0.2em] font-mono px-2 py-0.5 rounded-full font-bold">
                                  RECOMMENDED
                                </span>
                              )}
                            </div>

                            {/* Package Title */}
                            <h3 className="font-display text-base font-bold tracking-tight text-[#F8F8F8]">
                              {plan.name.toUpperCase()}
                            </h3>

                            {/* Price */}
                            <div className="mt-1 flex items-baseline gap-1.5">
                              <span className="font-display text-xl font-bold tracking-tight text-[#F8F8F8]">
                                {displayPrice}
                              </span>
                              {plan.priceSuffix && (
                                <span className="text-[11px] text-[#B3B3B3] font-normal tracking-normal font-sans">
                                  {plan.priceSuffix}
                                </span>
                              )}
                            </div>

                            {/* Description */}
                            <p className="mt-1 text-[11px] leading-relaxed text-[#B3B3B3] font-sans">
                              {plan.description}
                            </p>

                            {/* Divider */}
                            <div className="my-2.5 border-t border-[#2A2A2A]" />

                            {/* Section Label: INCLUDES or CHOOSE SERVICES */}
                            <div className="mb-2 flex items-center justify-between">
                              <span className="text-[9.5px] font-mono uppercase tracking-[0.2em] text-[#B3B3B3]/70 font-semibold">
                                {isCustom ? 'CHOOSE SERVICES' : 'INCLUDES'}
                              </span>
                              {isCustom && (
                                <span className="text-[9px] font-mono uppercase tracking-wider text-[#8B0000] font-bold">
                                  {customServices.length} {customServices.length === 1 ? 'SERVICE' : 'SERVICES'} SELECTED
                                </span>
                              )}
                            </div>

                            {/* Fixed Package Service Rows */}
                            {!isCustom && plan.items && (
                              <ul className="space-y-1">
                                {plan.items.map((item) => (
                                  <li
                                    key={item.name}
                                    className={`flex items-start gap-2 text-[10.5px] leading-snug font-sans ${item.included ? 'text-[#F8F8F8]' : 'text-neutral-500/70'
                                      }`}
                                  >
                                    {item.included ? (
                                      <span className="mt-0.5 flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-[#8B0000]/20 text-[#8B0000]">
                                        <Check className="h-2 w-2 stroke-[2.5]" />
                                      </span>
                                    ) : (
                                      <span className="mt-0.5 flex h-3 w-3 shrink-0 items-center justify-center text-neutral-600 font-mono text-[9px] select-none">
                                        ✕
                                      </span>
                                    )}
                                    <span className={item.included ? 'text-[#E5E5E5] font-normal' : 'text-neutral-500'}>
                                      {item.name}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {/* Custom Interactive Checkbox Checklist */}
                            {isCustom && (
                              <div className="grid grid-cols-2 gap-x-1.5 gap-y-1">
                                {customServiceList[industry].map((service) => {
                                  const isChecked = customServices.includes(service)
                                  return (
                                    <button
                                      key={service}
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        toggleCustomService(service)
                                      }}
                                      aria-pressed={isChecked}
                                      className={`flex items-center gap-1.5 text-left text-[10px] py-1 px-1 rounded hover:bg-white/[0.04] transition-colors duration-150 cursor-pointer ${isChecked ? 'text-[#F8F8F8] font-medium' : 'text-neutral-400 hover:text-neutral-200'
                                        }`}
                                    >
                                      <span
                                        className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border transition-all duration-150 ${isChecked
                                          ? 'bg-[#8B0000] border-[#8B0000] text-white shadow-[0_0_6px_rgba(139,0,0,0.5)]'
                                          : 'border-[#3A3A3A] bg-black/40 hover:border-neutral-500'
                                          }`}
                                      >
                                        {isChecked && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                                      </span>
                                      <span className="truncate leading-tight font-sans">{service}</span>
                                    </button>
                                  )
                                })}
                              </div>
                            )}
                          </div>

                          {/* Card Bottom CTA */}
                          <div className="mt-4 pt-1">
                            <Link
                              href={`/contact?mode=package&industry=${encodeURIComponent(industry)}&package=${encodeURIComponent(
                                plan.name
                              )}${isCustom ? `&services=${encodeURIComponent(customServices.join(','))}` : ''}`}
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedPackage(plan.name)
                              }}
                              className={`w-full py-2.5 px-3.5 min-h-[38px] rounded-lg text-[10.5px] font-bold uppercase tracking-[0.16em] flex items-center justify-center transition-all duration-300 ${isActive && (isRecommended || plan.name === selectedPackage || isActive)
                                ? 'bg-[#8B0000] hover:bg-[#A50000] text-white shadow-[0_4px_16px_rgba(139,0,0,0.35)]'
                                : 'bg-white/[0.04] hover:bg-white/[0.08] text-white border border-[#2A2A2A] hover:border-[#3A3A3A]'
                                }`}
                            >
                              {plan.ctaText}
                            </Link>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })()}
          </div>

          {/* Editorial Ad Spend Note Box */}
          <div className="mt-6 sm:mt-10 max-w-xl mx-auto rounded-lg border border-[#8B0000]/30 bg-[#8B0000]/[0.05] p-3 sm:p-4 text-center">
            <p className="text-xs sm:text-[13px] leading-relaxed text-[#D4D4D4] font-sans">
              <span className="font-bold text-[#FF5555] font-mono uppercase tracking-[0.16em] mr-1.5">NOTE:</span>
              Advertising media spend for Meta &amp; Google Ads is billed separately.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 09. ABOUT XCESS MEDIA (Editorial, Compact, One-Viewport Fit)              */}
      {/* ========================================================================= */}
      <section id="about" className="about-section relative overflow-hidden border-b border-[#2A2A2A] bg-[#050505] py-10 sm:py-14 lg:py-16 scroll-mt-24">
        <div className="container-xcess relative z-10">
          {/* Section Tag */}
          <p className="xcess-section-label">
            ABOUT XCESS MEDIA
          </p>

          {/* Main Introduction Grid (Heading on Left, Copy on Right) */}
          <div className="mt-3 sm:mt-5 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-5 lg:gap-12 items-start">
            <div className="lg:col-span-5">
              <h2 className="xcess-section-heading-expressive">
                <span>We Create.</span><br />
                <span>We Connect.</span><br />
                <span className="text-[#8B0000]">We Grow.</span>
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="xcess-intro-text max-w-2xl font-sans">
                <span className="block lg:hidden">
                  Xcess Media is a creative and digital agency focused on restaurants and interior design businesses.
                </span>
                <span className="hidden lg:block">
                  Xcess Media is a creative and digital agency focused on restaurants and interior design businesses. We create visual content, digital experiences and marketing solutions that help businesses connect with their audience and build a stronger presence online.
                </span>
              </p>
            </div>
          </div>

          {/* Thin Horizontal Divider */}
          <div className="my-5 sm:my-7 border-t border-[#2A2A2A]" />

          {/* Three Core Pillars: 3-Column Editorial Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#2A2A2A]">
            {/* Column 01: CREATE */}
            <div className="pb-3.5 md:pb-0 md:pr-6 lg:pr-8">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#8B0000] tracking-wider">01 —</span>
                <span className="font-mono text-xs font-bold text-white uppercase tracking-[0.2em]">CREATE</span>
              </div>
              <p className="mt-1.5 sm:mt-2 text-[12.5px] sm:text-[13.5px] font-medium text-[#F8F8F8] leading-snug">
                Make the business worth looking at.
              </p>
              <ul className="mt-2 sm:mt-3 space-y-0.5 sm:space-y-1 text-xs sm:text-[12px] text-[#8E8E93]">
                <li className="hover:text-white transition-colors duration-150">Photography</li>
                <li className="hover:text-white transition-colors duration-150">Short-form Videos / Reels</li>
                <li className="hover:text-white transition-colors duration-150">Creative Designs</li>
              </ul>
            </div>

            {/* Column 02: CONNECT */}
            <div className="py-3.5 md:py-0 md:px-6 lg:px-8">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#8B0000] tracking-wider">02 —</span>
                <span className="font-mono text-xs font-bold text-white uppercase tracking-[0.2em]">CONNECT</span>
              </div>
              <p className="mt-1.5 sm:mt-2 text-[12.5px] sm:text-[13.5px] font-medium text-[#F8F8F8] leading-snug">
                Give the business a stronger digital presence.
              </p>
              <ul className="mt-2 sm:mt-3 space-y-0.5 sm:space-y-1 text-xs sm:text-[12px] text-[#8E8E93]">
                <li className="hover:text-white transition-colors duration-150">Website</li>
                <li className="hover:text-white transition-colors duration-150">Social Media Handling</li>
                <li className="hover:text-white transition-colors duration-150">Google Business Profile</li>
              </ul>
            </div>

            {/* Column 03: GROW */}
            <div className="pt-3.5 md:pt-0 md:pl-6 lg:pl-8">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#8B0000] tracking-wider">03 —</span>
                <span className="font-mono text-xs font-bold text-white uppercase tracking-[0.2em]">GROW</span>
              </div>
              <p className="mt-1.5 sm:mt-2 text-[12.5px] sm:text-[13.5px] font-medium text-[#F8F8F8] leading-snug">
                Put the business in front of the right people.
              </p>
              <ul className="mt-2 sm:mt-3 space-y-0.5 sm:space-y-1 text-xs sm:text-[12px] text-[#8E8E93]">
                <li className="hover:text-white transition-colors duration-150">Local SEO</li>
                <li className="hover:text-white transition-colors duration-150">Meta Ads</li>
                <li className="hover:text-white transition-colors duration-150">Google Ads</li>
              </ul>
            </div>
          </div>

          {/* Thin Horizontal Divider */}
          <div className="my-5 sm:my-7 border-t border-[#2A2A2A]" />

          {/* Two Industries Subsection */}
          <div>
            <p className="text-[10px] sm:text-[10.5px] font-mono font-bold uppercase tracking-[0.22em] text-[#8E8E93]">
              TWO INDUSTRIES. ONE FOCUS.
            </p>
            <div className="mt-2.5 sm:mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 lg:gap-8">
              <div className="p-3 sm:p-4 rounded-lg bg-white/[0.02] border border-[#2A2A2A]/80 hover:border-[#3A3A3A] transition-colors">
                <p className="text-xs sm:text-[12px] font-mono font-bold uppercase tracking-[0.16em] text-white">
                  RESTAURANTS
                </p>
                <p className="mt-0.5 sm:mt-1 text-xs sm:text-[12px] text-[#8E8E93] leading-relaxed">
                  Food, atmosphere and experience brought to life.
                </p>
              </div>
              <div className="p-3 sm:p-4 rounded-lg bg-white/[0.02] border border-[#2A2A2A]/80 hover:border-[#3A3A3A] transition-colors">
                <p className="text-xs sm:text-[12px] font-mono font-bold uppercase tracking-[0.16em] text-white">
                  INTERIOR DESIGN
                </p>
                <p className="mt-0.5 sm:mt-1 text-xs sm:text-[12px] text-[#8E8E93] leading-relaxed">
                  Spaces, craftsmanship and design brought to life.
                </p>
              </div>
            </div>
          </div>

          {/* Closing Brand Line */}
          <div className="mt-5 sm:mt-7 text-center pt-1">
            <p className="text-[10.5px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#8E8E93] select-none">
              CREATE. <span className="text-[#8B0000]">CONNECT.</span> GROW.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. HELP & FAQ (Editorial Numbered Accordion)                              */}
      {/* ========================================================================= */}
      <section id="help" className="help-section py-10 sm:py-16 lg:py-20 border-b border-[#2A2A2A] scroll-mt-24">
        <div className="container-xcess">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-start">
            {/* Left Header Column */}
            <div className="lg:col-span-4 xl:col-span-4 lg:sticky lg:top-28">
              <p className="xcess-section-label">
                HELP &amp; FAQ
              </p>
              <h2 className="xcess-section-heading mt-1.5 sm:mt-2">
                Before You Begin.
              </h2>
              <p className="xcess-intro-text mt-2 sm:mt-2.5 max-w-sm">
                A few things worth knowing before we start a conversation.
              </p>
            </div>

            {/* Right Accordion List Column */}
            <div className="lg:col-span-8 xl:col-span-8 border-t border-[#2A2A2A]">
              {faqItems.map((item, i) => {
                const isOpen = faq === i
                return (
                  <div key={item.num} className="border-b border-[#2A2A2A]">
                    <button
                      type="button"
                      onClick={() => setFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start justify-between py-3.5 sm:py-4.5 min-h-[44px] text-left group cursor-pointer transition-colors duration-200"
                    >
                      <div className="flex items-start gap-2.5 sm:gap-4.5 flex-1 pr-3">
                        <span className="font-mono text-xs sm:text-[12.5px] font-bold tracking-wider text-[#8B0000] mt-0.5 shrink-0 select-none">
                          {item.num}
                        </span>
                        <span className="font-medium text-[13.5px] sm:text-[15px] md:text-[15.5px] text-[#F8F8F8] group-hover:text-white transition-colors duration-200 leading-snug">
                          {item.question}
                        </span>
                      </div>
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center font-mono text-base sm:text-lg transition-transform duration-300 select-none ${isOpen ? 'rotate-45 text-[#8B0000]' : 'rotate-0 text-[#8B0000] group-hover:text-white'
                          }`}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-out motion-reduce:transition-none ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pl-6 sm:pl-8 pb-3.5 sm:pb-4.5 pt-0.5 text-xs sm:text-[13.5px] leading-relaxed text-[#B3B3B3] max-w-2xl">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. FINAL CTA (Cinematic Closing with Crimson Lighting)                   */}
      {/* ========================================================================= */}
      <section className="final-cta relative overflow-hidden border-t border-white/10 py-20 lg:py-28 bg-[#060608]">
        <div className="cta-noise" />
        <div className="red-light" />
        <div className="container-xcess relative z-10 lg:flex lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="xcess-section-label">
              START A CONVERSATION
            </p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[0.92] tracking-[-0.05em] text-white">
              Ready to make your business impossible to overlook?
            </h2>
            <p className="mt-6 max-w-lg text-sm sm:text-base leading-relaxed text-[#B3B3B3]">
              Tell us about your business, what you&apos;re looking to achieve, and how we can help elevate your digital presence.
            </p>
          </div>
          <div className="mt-8 lg:mt-0 shrink-0">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center w-full sm:w-auto min-w-[200px] sm:min-w-[220px] h-[48px] sm:h-[64px] px-8 sm:px-9 rounded-xl bg-[#8B0000] hover:bg-[#A50000] text-white text-xs sm:text-[13px] font-mono font-bold uppercase tracking-[0.2em] transition-all duration-300 ease-out hover:shadow-[0_8px_32px_rgba(139,0,0,0.45)]"
            >
              <span>LET&apos;S TALK</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. FOOTER (Exact Match to Reference Layout)                              */}
      {/* ========================================================================= */}
      <footer className="site-footer border-t border-white/10 bg-[#050505] pt-10 sm:pt-14 lg:pt-18 pb-8 sm:pb-10 lg:pb-12">
        <div className="container-xcess">
          {/* ========================================================= */}
          {/* MOBILE FOOTER (block md:hidden — Exact Match to Image 2)  */}
          {/* ========================================================= */}
          <div className="block md:hidden">
            {/* Top: Logo */}
            <div>
              <Link href="/#top" className="inline-block" aria-label="Xcess Media Home">
                <img
                  src="/images/xcess-media-logo.svg"
                  alt="XCESS MEDIA"
                  className="h-11 sm:h-12 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Description */}
            <p className="mt-3.5 text-[12.5px] sm:text-[13px] leading-relaxed text-[#8c8c8c] font-sans max-w-[340px]">
              We help restaurants and interior design businesses turn their vision into a stronger digital presence.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 text-neutral-400 mt-4.5 pt-0.5">
              <a
                href="https://instagram.com/xcessmedia.in"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-white transition-colors"
              >
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-white transition-colors"
              >
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="hover:text-white transition-colors"
              >
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.004 2C6.478 2 2 6.478 2 12.004c0 1.897.531 3.673 1.455 5.187L2 22l4.945-1.42a9.96 9.96 0 005.059 1.425c5.526 0 10.004-4.478 10.004-10.004 0-5.526-4.478-10.005-10.004-10.005zm5.733 14.195c-.242.679-1.218 1.298-1.996 1.464-.533.114-1.229.206-3.567-.762-2.988-1.236-4.914-4.277-5.064-4.477-.146-.199-1.212-1.614-1.212-3.078 0-1.464.767-2.184 1.04-2.478.273-.294.596-.368.795-.368.198 0 .397.002.571.01.185.01.433-.07.677.517.248.596.845 2.064.919 2.214.075.149.124.323.025.522-.099.199-.149.323-.298.497-.149.174-.313.388-.447.522-.149.149-.304.31-.131.608.174.298.772 1.272 1.656 2.059 1.138 1.013 2.097 1.326 2.395 1.475.298.149.472.124.646-.075.174-.199.745-.87.944-1.168.199-.298.397-.248.67-.149.273.099 1.739.82 2.037.969.298.149.497.223.571.348.075.124.075.72-.167 1.399z" />
                </svg>
              </a>
              <a
                href="mailto:contact@xcessmedia.com"
                aria-label="Email"
                className="hover:text-white transition-colors"
              >
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>

            {/* 3-Column Services Grid: CREATE, BUILD, GROW */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3.5 mt-7 pt-1">
              {/* Column 1: CREATE */}
              <div>
                <p className="mb-3 text-[9.5px] sm:text-[10px] font-mono uppercase tracking-[0.18em] font-bold text-white">
                  CREATE
                </p>
                <ul className="space-y-2 text-[11px] sm:text-[11.5px] text-[#8c8c8c] leading-snug">
                  <li>
                    <a href="#services" className="hover:text-white transition-colors">
                      Photography
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="hover:text-white transition-colors">
                      Short-form Videos / Reels
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="hover:text-white transition-colors">
                      Creative Designs
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 2: BUILD */}
              <div>
                <p className="mb-3 text-[9.5px] sm:text-[10px] font-mono uppercase tracking-[0.18em] font-bold text-white">
                  BUILD
                </p>
                <ul className="space-y-2 text-[11px] sm:text-[11.5px] text-[#8c8c8c] leading-snug">
                  <li>
                    <a href="#services" className="hover:text-white transition-colors">
                      Website
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="hover:text-white transition-colors">
                      Social Media Handling
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="hover:text-white transition-colors">
                      Google Business Profile
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 3: GROW (Crimson Label) */}
              <div>
                <p className="mb-3 text-[9.5px] sm:text-[10px] font-mono uppercase tracking-[0.18em] font-bold text-[#8B0000]">
                  GROW
                </p>
                <ul className="space-y-2 text-[11px] sm:text-[11.5px] text-[#8c8c8c] leading-snug">
                  <li>
                    <a href="#services" className="hover:text-white transition-colors">
                      Local SEO
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="hover:text-white transition-colors">
                      Meta Ads
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="hover:text-white transition-colors">
                      Google Ads
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Quick Links (Compact below 3 columns)
            <div className="mt-5 pt-3.5 border-t border-white/[0.06]">
              <p className="mb-2 text-[9.5px] sm:text-[10px] font-mono uppercase tracking-[0.18em] font-bold text-white">
                QUICK LINKS
              </p>
              <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-5 gap-y-1.5 text-[11px] sm:text-[11.5px] text-[#8c8c8c]">
                <a href="#industries" className="hover:text-white transition-colors">
                  Industries
                </a>
                <a href="#packages" className="hover:text-white transition-colors">
                  Packages
                </a>
                <a href="#about" className="hover:text-white transition-colors">
                  About
                </a>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </div>
            </div> */}

            {/* Mobile Bottom Row: Copyright & Policy Links */}
            <div className="flex items-center justify-between gap-3 pt-6 border-t border-white/[0.06] mt-6 text-[8.5px] sm:text-[9px] font-mono uppercase tracking-[0.18em] text-[#666]">
              <span>© 2026 XCESS MEDIA.</span>
              <div className="flex items-center gap-4 sm:gap-5">
                <a
                  href="#top"
                  className="text-[18px] font-extrabold leading-none hover:text-white transition-colors"
                >
                  ↑
                </a>
                <a href="#top" className="hover:text-white transition-colors">
                  PRIVACY
                </a>
                <a href="#top" className="hover:text-white transition-colors">
                  TERMS
                </a>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* DESKTOP / TABLET FOOTER (hidden md:block — 100% Original) */}
          {/* ========================================================= */}
          <div className="hidden md:block">
            {/* Main Footer Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 lg:pb-16 border-b border-white/[0.08]">
              {/* Left Brand Column */}
              <div className="lg:col-span-5 space-y-5 max-w-sm">
                <Link href="/#top" className="inline-block" aria-label="Xcess Media Home">
                  <img
                    src="/images/xcess-media-logo.svg"
                    alt="XCESS MEDIA"
                    className="h-16 sm:h-18 lg:h-20 w-auto object-contain"
                  />
                </Link>
                <p className="text-[13px] sm:text-[13.5px] leading-relaxed text-[#8E8E93] font-sans">
                  We help restaurants and interior design businesses turn their vision into a stronger digital presence.
                </p>
                {/* Social Icons */}
                <div className="flex items-center gap-4 text-[#8E8E93] pt-1">
                  <a
                    href="https://instagram.com/xcessmedia.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="p-1 hover:text-white transition-colors"
                  >
                    <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="p-1 hover:text-white transition-colors"
                  >
                    <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="https://whatsapp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="p-1 hover:text-white transition-colors"
                  >
                    <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.004 2C6.478 2 2 6.478 2 12.004c0 1.897.531 3.673 1.455 5.187L2 22l4.945-1.42a9.96 9.96 0 005.059 1.425c5.526 0 10.004-4.478 10.004-10.004 0-5.526-4.478-10.005-10.004-10.005zm5.733 14.195c-.242.679-1.218 1.298-1.996 1.464-.533.114-1.229.206-3.567-.762-2.988-1.236-4.914-4.277-5.064-4.477-.146-.199-1.212-1.614-1.212-3.078 0-1.464.767-2.184 1.04-2.478.273-.294.596-.368.795-.368.198 0 .397.002.571.01.185.01.433-.07.677.517.248.596.845 2.064.919 2.214.075.149.124.323.025.522-.099.199-.149.323-.298.497-.149.174-.313.388-.447.522-.149.149-.304.31-.131.608.174.298.772 1.272 1.656 2.059 1.138 1.013 2.097 1.326 2.395 1.475.298.149.472.124.646-.075.174-.199.745-.87.944-1.168.199-.298.397-.248.67-.149.273.099 1.739.82 2.037.969.298.149.497.223.571.348.075.124.075.72-.167 1.399z" />
                    </svg>
                  </a>
                  <a
                    href="mailto:contact@xcessmedia.com"
                    aria-label="Email"
                    className="p-1 hover:text-white transition-colors"
                  >
                    <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </a>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X (Twitter)"
                    className="p-1 hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Right Nav Columns (4 Columns: CREATE, BUILD, GROW, COMPANY) */}
              <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
                {/* Column 1: CREATE */}
                <div>
                  <p className="mb-4 text-[10.5px] font-mono uppercase tracking-[0.2em] font-bold text-white">
                    CREATE
                  </p>
                  <ul className="space-y-2.5 text-[13px] text-[#8E8E93]">
                    <li>
                      <a href="#services" className="hover:text-white transition-colors">
                        Photography
                      </a>
                    </li>
                    <li>
                      <a href="#services" className="hover:text-white transition-colors">
                        Short-form Videos / Reels
                      </a>
                    </li>
                    <li>
                      <a href="#services" className="hover:text-white transition-colors">
                        Creative Designs
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Column 2: BUILD */}
                <div>
                  <p className="mb-4 text-[10.5px] font-mono uppercase tracking-[0.2em] font-bold text-white">
                    BUILD
                  </p>
                  <ul className="space-y-2.5 text-[13px] text-[#8E8E93]">
                    <li>
                      <a href="#services" className="hover:text-white transition-colors">
                        Website
                      </a>
                    </li>
                    <li>
                      <a href="#services" className="hover:text-white transition-colors">
                        Social Media Handling
                      </a>
                    </li>
                    <li>
                      <a href="#services" className="hover:text-white transition-colors">
                        Google Business Profile
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Column 3: GROW (Red Title) */}
                <div>
                  <p className="mb-4 text-[10.5px] font-mono uppercase tracking-[0.2em] font-bold text-[#8B0000]">
                    GROW
                  </p>
                  <ul className="space-y-2.5 text-[13px] text-[#8E8E93]">
                    <li>
                      <a href="#services" className="hover:text-white transition-colors">
                        Local SEO
                      </a>
                    </li>
                    <li>
                      <a href="#services" className="hover:text-white transition-colors">
                        Meta Ads
                      </a>
                    </li>
                    <li>
                      <a href="#services" className="hover:text-white transition-colors">
                        Google Ads
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Column 4: COMPANY */}
                <div>
                  <p className="mb-4 text-[10.5px] font-mono uppercase tracking-[0.2em] font-bold text-white">
                    QUICK LINKS
                  </p>
                  <ul className="space-y-2.5 text-[13px] text-[#8E8E93]">
                    <li>
                      <a href="#industries" className="hover:text-white transition-colors">
                        Industries
                      </a>
                    </li>
                    <li>
                      <a href="#packages" className="hover:text-white transition-colors">
                        Packages
                      </a>
                    </li>
                    <li>
                      <a href="#about" className="hover:text-white transition-colors">
                        About
                      </a>
                    </li>
                    <li>
                      <Link href="/contact" className="hover:text-white transition-colors">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Bar: Copyright & Policy Links */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[10px] font-mono uppercase tracking-[0.18em] text-[#555]">
              <span>© 2026 XCESS MEDIA. ALL RIGHTS RESERVED.</span>
              <div className="flex items-center gap-6">
                <a href="#top" className="hover:text-white transition-colors">
                  BACK TO TOP ↑
                </a>
                <a href="#top" className="hover:text-white transition-colors">
                  PRIVACY
                </a>
                <a href="#top" className="hover:text-white transition-colors">
                  TERMS
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main >
  )
}
