/**
 * ============================================================================
 * XCESS MEDIA — CENTRALIZED PRICING & PACKAGE CONFIGURATION
 * ============================================================================
 * 
 * Single source of truth for:
 * 1. Supported Industries (Restaurants, Interior Design)
 * 2. Industry-specific Packages (Starter, Foundation, Standard, Signature, Luxury, Custom)
 * 3. Package Pricing & Included Services
 * 4. Custom Individual Service Pricing (CUSTOM_SERVICE_PRICING)
 * 5. Custom All-9-Services Bundle Pricing (CUSTOM_ALL_SERVICES_BUNDLE_PRICE = 89999)
 * 6. Smart Signature/Luxury Complete Package Recommendation
 * 
 * NOTE: Edit prices in this file to update both the Homepage Packages section
 * and the Contact / Enquiry form automatically.
 */

export type Industry = 'Restaurants' | 'Interior Design'

export type PackageType =
  | 'Starter'
  | 'Foundation'
  | 'Standard'
  | 'Signature'
  | 'Luxury'
  | 'Custom'

export interface PackageItem {
  name: string
  included: boolean
}

export interface PackagePlan {
  num: string
  name: PackageType
  recommended?: boolean
  price: string
  priceNumber: number
  priceSuffix?: string
  description: string
  items?: PackageItem[]
  ctaText: string
}

export interface CustomServiceConfig {
  id: string
  name: string
  pillar: 'CREATE' | 'CONNECT' | 'GROW'
  price: number
  isAdSpend?: boolean
  description: string
}

export interface ServicePillarGroup {
  pillar: 'CREATE' | 'CONNECT' | 'GROW'
  code: string
  tagline: string
  services: CustomServiceConfig[]
}

/**
 * ============================================================================
 * CUSTOM SERVICE PRICING CONFIGURATION (Single Centralized Store)
 * ============================================================================
 * Individual service base prices (Sum of all 9 = ₹1,00,000)
 */
export const CUSTOM_SERVICE_PRICING: Record<string, number> = {
  'Photography': 12000,
  'Short-form Videos / Reels': 14000,
  'Creative Designs': 8000,
  'Website': 18000,
  'Social Media Handling': 10000,
  'Google Business Profile': 6000,
  'Local SEO': 8000,
  'Meta Ads': 12000,
  'Google Ads': 12000,
}

/**
 * Total count of standard custom services
 */
export const TOTAL_CUSTOM_SERVICES_COUNT = Object.keys(CUSTOM_SERVICE_PRICING).length // 9

/**
 * Complete all-9-services Custom bundle price
 */
export const CUSTOM_ALL_SERVICES_BUNDLE_PRICE = 89999 // ₹89,999 / month

/**
 * Predefined complete package configurations by industry
 */
export const COMPLETE_PACKAGE_CONFIG: Record<
  Industry,
  {
    name: PackageType
    price: number
    priceFormatted: string
    savingsVsCustomAllServices: number // 89999 - 79999 = 10000
  }
> = {
  Restaurants: {
    name: 'Signature',
    price: 79999,
    priceFormatted: '₹79,999',
    savingsVsCustomAllServices: 10000,
  },
  'Interior Design': {
    name: 'Luxury',
    price: 79999,
    priceFormatted: '₹79,999',
    savingsVsCustomAllServices: 10000,
  },
}

/**
 * 9 Standard Services grouped into CREATE, CONNECT, GROW pillars
 */
export const CUSTOM_SERVICE_PILLARS: ServicePillarGroup[] = [
  {
    pillar: 'CREATE',
    code: '01',
    tagline: 'Make your business worth looking at.',
    services: [
      {
        id: 'photography',
        name: 'Photography',
        pillar: 'CREATE',
        price: CUSTOM_SERVICE_PRICING['Photography'],
        description: 'Food, interior, architectural & brand photography.',
      },
      {
        id: 'reels',
        name: 'Short-form Videos / Reels',
        pillar: 'CREATE',
        price: CUSTOM_SERVICE_PRICING['Short-form Videos / Reels'],
        description: 'High-impact short-form videos & walkthrough reels.',
      },
      {
        id: 'creative_designs',
        name: 'Creative Designs',
        pillar: 'CREATE',
        price: CUSTOM_SERVICE_PRICING['Creative Designs'],
        description: 'Social creatives, promotional artwork & brand assets.',
      },
    ],
  },
  {
    pillar: 'CONNECT',
    code: '02',
    tagline: 'Give your business a digital home.',
    services: [
      {
        id: 'website',
        name: 'Website',
        pillar: 'CONNECT',
        price: CUSTOM_SERVICE_PRICING['Website'],
        description: 'Modern, high-conversion responsive website.',
      },
      {
        id: 'social_media',
        name: 'Social Media Handling',
        pillar: 'CONNECT',
        price: CUSTOM_SERVICE_PRICING['Social Media Handling'],
        description: 'Content calendar, publishing & account management.',
      },
      {
        id: 'google_business',
        name: 'Google Business Profile',
        pillar: 'CONNECT',
        price: CUSTOM_SERVICE_PRICING['Google Business Profile'],
        description: 'Profile optimization, rankings & reputation setup.',
      },
    ],
  },
  {
    pillar: 'GROW',
    code: '03',
    tagline: 'Put your business in front of the right people.',
    services: [
      {
        id: 'local_seo',
        name: 'Local SEO',
        pillar: 'GROW',
        price: CUSTOM_SERVICE_PRICING['Local SEO'],
        description: 'Local neighborhood search dominance & Maps ranking.',
      },
      {
        id: 'meta_ads',
        name: 'Meta Ads',
        pillar: 'GROW',
        price: CUSTOM_SERVICE_PRICING['Meta Ads'],
        isAdSpend: true,
        description: 'Targeted customer campaigns on Instagram & Facebook.',
      },
      {
        id: 'google_ads',
        name: 'Google Ads',
        pillar: 'GROW',
        price: CUSTOM_SERVICE_PRICING['Google Ads'],
        isAdSpend: true,
        description: 'High-intent search advertising for active inquiries.',
      },
    ],
  },
]

/**
 * Service name alias map to normalize varying service labels between industries
 */
export const SERVICE_ALIAS_MAP: Record<string, string> = {
  'food & restaurant photography': 'Photography',
  'project & spatial photography': 'Photography',
  'project photo': 'Photography',
  'photography': 'Photography',
  '5 short-form videos or reels': 'Short-form Videos / Reels',
  'short-form videos or reels': 'Short-form Videos / Reels',
  'short-form videos': 'Short-form Videos / Reels',
  '5 short-form walkthrough reels': 'Short-form Videos / Reels',
  'short-form walkthrough reels': 'Short-form Videos / Reels',
  'walkthroughs': 'Short-form Videos / Reels',
  'reels': 'Short-form Videos / Reels',
  'creative designs': 'Creative Designs',
  'creative design': 'Creative Designs',
  'restaurant website': 'Website',
  'portfolio website': 'Website',
  'portfolios': 'Website',
  'portfolio': 'Website',
  'website': 'Website',
  'websites': 'Website',
  'social media handling': 'Social Media Handling',
  'social media': 'Social Media Handling',
  'social': 'Social Media Handling',
  'google business profile': 'Google Business Profile',
  'google business': 'Google Business Profile',
  'local seo': 'Local SEO',
  'meta ads': 'Meta Ads',
  'google ads': 'Google Ads',
}

/**
 * Normalize any service label to its canonical name
 */
export function normalizeServiceName(name: string): string {
  const clean = name.trim().toLowerCase()
  return SERVICE_ALIAS_MAP[clean] || name.trim()
}

/**
 * Package Plans by Industry
 */
export const packagePlans: Record<Industry, PackagePlan[]> = {
  Restaurants: [
    {
      num: '01',
      name: 'Starter',
      price: '₹34,999',
      priceNumber: 34999,
      priceSuffix: '/ month',
      description: 'A focused foundation for restaurants ready to strengthen their digital presence.',
      items: [
        { name: 'Food & Restaurant Photography', included: true },
        { name: '5 Short-form Videos or Reels', included: true },
        { name: 'Creative Designs', included: true },
        { name: 'Restaurant Website', included: false },
        { name: 'Social Media Handling', included: false },
        { name: 'Google Business Profile', included: true },
        { name: 'Local SEO', included: true },
        { name: 'Meta Ads', included: false },
        { name: 'Google Ads', included: false },
      ],
      ctaText: 'SELECT STARTER',
    },
    {
      num: '02',
      name: 'Standard',
      recommended: true,
      price: '₹54,999',
      priceNumber: 54999,
      priceSuffix: '/ month',
      description: 'A stronger digital presence for restaurants ready to build consistency and footfall.',
      items: [
        { name: 'Food & Restaurant Photography', included: true },
        { name: 'Short-form Videos or Reels', included: true },
        { name: 'Creative Designs', included: true },
        { name: 'Restaurant Website', included: true },
        { name: 'Social Media Handling', included: true },
        { name: 'Google Business Profile', included: true },
        { name: 'Local SEO', included: true },
        { name: 'Meta Ads', included: false },
        { name: 'Google Ads', included: false },
      ],
      ctaText: 'SELECT STANDARD',
    },
    {
      num: '03',
      name: 'Signature',
      price: '₹79,999',
      priceNumber: 79999,
      priceSuffix: '/ month',
      description: 'A complete digital growth engine for restaurants ready to dominate local dining.',
      items: [
        { name: 'Food & Restaurant Photography', included: true },
        { name: 'Short-form Videos or Reels', included: true },
        { name: 'Creative Designs', included: true },
        { name: 'Restaurant Website', included: true },
        { name: 'Social Media Handling', included: true },
        { name: 'Google Business Profile', included: true },
        { name: 'Local SEO', included: true },
        { name: 'Meta Ads', included: true },
        { name: 'Google Ads', included: true },
      ],
      ctaText: 'SELECT SIGNATURE',
    },
    {
      num: '04',
      name: 'Custom',
      price: 'From ₹25,000',
      priceNumber: 25000,
      priceSuffix: '/ month',
      description: 'A flexible package built around exactly what your restaurant needs.',
      ctaText: 'BUILD CUSTOM PACKAGE',
    },
  ],
  'Interior Design': [
    {
      num: '01',
      name: 'Foundation',
      price: '₹34,999',
      priceNumber: 34999,
      priceSuffix: '/ month',
      description: 'A focused foundation for studios and designers ready to showcase spatial work.',
      items: [
        { name: 'Project & Spatial Photography', included: true },
        { name: '5 Short-form Walkthrough Reels', included: true },
        { name: 'Creative Designs', included: true },
        { name: 'Portfolio Website', included: false },
        { name: 'Social Media Handling', included: false },
        { name: 'Google Business Profile', included: true },
        { name: 'Local SEO', included: true },
        { name: 'Meta Ads', included: false },
        { name: 'Google Ads', included: false },
      ],
      ctaText: 'SELECT FOUNDATION',
    },
    {
      num: '02',
      name: 'Standard',
      recommended: true,
      price: '₹54,999',
      priceNumber: 54999,
      priceSuffix: '/ month',
      description: 'A comprehensive digital presence to position projects in front of high-value clientele.',
      items: [
        { name: 'Project & Spatial Photography', included: true },
        { name: 'Short-form Walkthrough Reels', included: true },
        { name: 'Creative Designs', included: true },
        { name: 'Portfolio Website', included: true },
        { name: 'Social Media Handling', included: true },
        { name: 'Google Business Profile', included: true },
        { name: 'Local SEO', included: true },
        { name: 'Meta Ads', included: false },
        { name: 'Google Ads', included: false },
      ],
      ctaText: 'SELECT STANDARD',
    },
    {
      num: '03',
      name: 'Luxury',
      price: '₹79,999',
      priceNumber: 79999,
      priceSuffix: '/ month',
      description: 'An end-to-end digital and acquisition system for established architectural practices.',
      items: [
        { name: 'Project & Spatial Photography', included: true },
        { name: 'Short-form Walkthrough Reels', included: true },
        { name: 'Creative Designs', included: true },
        { name: 'Portfolio Website', included: true },
        { name: 'Social Media Handling', included: true },
        { name: 'Google Business Profile', included: true },
        { name: 'Local SEO', included: true },
        { name: 'Meta Ads', included: true },
        { name: 'Google Ads', included: true },
      ],
      ctaText: 'SELECT LUXURY',
    },
    {
      num: '04',
      name: 'Custom',
      price: 'From ₹25,000',
      priceNumber: 25000,
      priceSuffix: '/ month',
      description: 'A bespoke package tailored to your studio’s specific project and growth requirements.',
      ctaText: 'BUILD CUSTOM PACKAGE',
    },
  ],
}

export const customServiceList: Record<Industry, string[]> = {
  Restaurants: [
    'Photography',
    'Creative Designs',
    'Short-form Videos',
    'Website',
    'Social Media',
    'Google Business',
    'Local SEO',
    'Meta Ads',
    'Google Ads',
  ],
  'Interior Design': [
    'Project Photo',
    'Creative Designs',
    'Walkthroughs',
    'Website',
    'Social Media',
    'Google Business',
    'Local SEO',
    'Meta Ads',
    'Google Ads',
  ],
}

/**
 * Format currency in Indian Numbering format (INR)
 */
export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}

/**
 * Get included services for a specific industry and package plan
 */
export function getIncludedServices(industry: Industry, packageName: PackageType): string[] {
  const plans = packagePlans[industry] || packagePlans.Restaurants
  const plan = plans.find((p) => p.name.toLowerCase() === packageName.toLowerCase())
  if (!plan || !plan.items) return []
  return plan.items.filter((item) => item.included).map((item) => item.name)
}

/**
 * Get plan details for a specific industry and package
 */
export function getPackagePlan(industry: Industry, packageName: PackageType): PackagePlan | undefined {
  const plans = packagePlans[industry] || packagePlans.Restaurants
  return plans.find((p) => p.name.toLowerCase() === packageName.toLowerCase())
}

export interface CustomPackageCalculation {
  total: number
  individualSum: number
  selectedCount: number
  isAllServicesSelected: boolean
  hasAdSpend: boolean
  breakdown: { name: string; price: number }[]
  recommendedPackage: {
    name: PackageType
    price: number
    priceFormatted: string
    savingsVsCustom: number
  }
}

/**
 * Calculate dynamic custom package total with all-9-services bundle discount
 * and smart Signature/Luxury recommendation
 */
export function calculateCustomPackageTotal(
  selectedServices: string[],
  industry: Industry = 'Restaurants'
): CustomPackageCalculation {
  const canonicalSet = new Set<string>()
  selectedServices.forEach((s) => {
    const canonical = normalizeServiceName(s)
    if (canonical) canonicalSet.add(canonical)
  })

  let individualSum = 0
  let hasAdSpend = false
  const breakdown: { name: string; price: number }[] = []

  canonicalSet.forEach((canonicalName) => {
    const price = CUSTOM_SERVICE_PRICING[canonicalName] || 0
    individualSum += price
    breakdown.push({ name: canonicalName, price })

    if (canonicalName === 'Meta Ads' || canonicalName === 'Google Ads') {
      hasAdSpend = true
    }
  })

  const selectedCount = canonicalSet.size
  const isAllServicesSelected = selectedCount === TOTAL_CUSTOM_SERVICES_COUNT

  // When all 9 services are selected, override the individual sum (₹1,00,000) with the bundle price (₹89,999)
  const total = isAllServicesSelected ? CUSTOM_ALL_SERVICES_BUNDLE_PRICE : individualSum

  const completeConfig = COMPLETE_PACKAGE_CONFIG[industry] || COMPLETE_PACKAGE_CONFIG.Restaurants

  return {
    total,
    individualSum,
    selectedCount,
    isAllServicesSelected,
    hasAdSpend,
    breakdown,
    recommendedPackage: {
      name: completeConfig.name,
      price: completeConfig.price,
      priceFormatted: completeConfig.priceFormatted,
      savingsVsCustom: completeConfig.savingsVsCustomAllServices,
    },
  }
}
