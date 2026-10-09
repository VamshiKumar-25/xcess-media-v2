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
 * Individual service base prices (Sum of all 9 = ₹61,000)
 */
export const CUSTOM_SERVICE_PRICING: Record<string, number> = {
  // Canonical names
  'Photography': 8000,
  '6 Reels': 10000,
  '6 Walkthrough Reels': 10000,
  '4 Creative Designs': 4000,
  'Website': 20000,
  'Social Media Handling': 3000,
  'Google Business Profile': 2500,
  'Local SEO': 2500,
  'Meta Ads': 5000,
  'Google Ads': 5000,

  // Direct aliases and label variants for seamless lookup
  '10 Reels': 18000,
  '12 Reels': 22000,
  '10 Walkthrough Reels': 18000,
  '12 Walkthrough Reels': 22000,
  'Short-form Videos / Reels': 10000,
  'Short-form Videos': 10000,
  'Walkthroughs': 10000,
  'Walkthrough Reels': 10000,
  'Reels': 10000,
  'Creative Designs': 4000,
  '6 Creative Designs': 6000,
  'Food Photography': 8000,
  'Food & Restaurant Photography': 8000,
  'Project & Spatial Photography': 8000,
  'Project Photo': 8000,
  'Social Media': 3000,
  'Google Business': 2500,
  'Restaurant Website': 20000,
  'Portfolio Website': 20000,
}

/**
 * Total count of standard custom services
 */
export const TOTAL_CUSTOM_SERVICES_COUNT = 9

/**
 * Complete all-9-services Custom bundle price (sum of 9 base services = ₹61,000)
 */
export const CUSTOM_ALL_SERVICES_BUNDLE_PRICE = 60000 // ₹61,000 / month

/**
 * Predefined complete package configurations by industry
 */
export const COMPLETE_PACKAGE_CONFIG: Record<
  Industry,
  {
    name: PackageType
    price: number
    priceFormatted: string
    savingsVsCustomAllServices: number
  }
> = {
  Restaurants: {
    name: 'Signature',
    price: 69999,
    priceFormatted: '₹69,999',
    savingsVsCustomAllServices: 0,
  },
  'Interior Design': {
    name: 'Luxury',
    price: 69999,
    priceFormatted: '₹69,999',
    savingsVsCustomAllServices: 0,
  },
}

/**
 * Get 9 Standard Services grouped into CREATE, CONNECT, GROW pillars by industry
 */
export function getCustomServicePillars(industry: Industry = 'Restaurants'): ServicePillarGroup[] {
  const isInteriors = industry === 'Interior Design'
  return [
    {
      pillar: 'CREATE',
      code: '01',
      tagline: 'Make your business worth looking at.',
      services: [
        {
          id: 'photography',
          name: isInteriors ? 'Project Photo' : 'Photography',
          pillar: 'CREATE',
          price: CUSTOM_SERVICE_PRICING['Photography'] ?? 8000,
          description: isInteriors
            ? 'Project, interior, architectural & spatial photography.'
            : 'Food, interior, architectural & brand photography.',
        },
        {
          id: 'reels',
          name: isInteriors ? '6 Walkthrough Reels' : '6 Reels',
          pillar: 'CREATE',
          price: CUSTOM_SERVICE_PRICING['6 Reels'] ?? 10000,
          description: isInteriors
            ? 'High-impact spatial walkthroughs & architectural reels.'
            : 'High-impact short-form videos & walkthrough reels.',
        },
        {
          id: 'creative_designs',
          name: '4 Creative Designs',
          pillar: 'CREATE',
          price: CUSTOM_SERVICE_PRICING['4 Creative Designs'] ?? 4000,
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
          price: CUSTOM_SERVICE_PRICING['Website'] ?? 20000,
          description: isInteriors
            ? 'Modern, high-conversion responsive portfolio website.'
            : 'Modern, high-conversion responsive website.',
        },
        {
          id: 'social_media',
          name: 'Social Media Handling',
          pillar: 'CONNECT',
          price: CUSTOM_SERVICE_PRICING['Social Media Handling'] ?? 3000,
          description: 'Content calendar, publishing & account management.',
        },
        {
          id: 'google_business',
          name: 'Google Business Profile',
          pillar: 'CONNECT',
          price: CUSTOM_SERVICE_PRICING['Google Business Profile'] ?? 2500,
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
          price: CUSTOM_SERVICE_PRICING['Local SEO'] ?? 2500,
          description: 'Local neighborhood search dominance & Maps ranking.',
        },
        {
          id: 'meta_ads',
          name: 'Meta Ads',
          pillar: 'GROW',
          price: CUSTOM_SERVICE_PRICING['Meta Ads'] ?? 5000,
          isAdSpend: true,
          description: 'Targeted customer campaigns on Instagram & Facebook.',
        },
        {
          id: 'google_ads',
          name: 'Google Ads',
          pillar: 'GROW',
          price: CUSTOM_SERVICE_PRICING['Google Ads'] ?? 5000,
          isAdSpend: true,
          description: 'High-intent search advertising for active inquiries.',
        },
      ],
    },
  ]
}

/**
 * Default standard service pillars (Restaurants)
 */
export const CUSTOM_SERVICE_PILLARS = getCustomServicePillars('Restaurants')

/**
 * Service name alias map to normalize varying service labels between industries
 */
export const SERVICE_ALIAS_MAP: Record<string, string> = {
  // Photography
  'food & restaurant photography': 'Photography',
  'food photography': 'Photography',
  'project & spatial photography': 'Photography',
  'project photo': 'Photography',
  'project photography': 'Photography',
  'photography': 'Photography',
  'photo': 'Photography',

  // 6 Reels / Video / Reels
  '6 reels': '6 Reels',
  '10 reels': '6 Reels',
  '12 reels': '6 Reels',
  '5 short-form videos or reels': '6 Reels',
  'short-form videos or reels': '6 Reels',
  'short-form videos / reels': '6 Reels',
  'short-form videos': '6 Reels',
  'short form videos': '6 Reels',
  '5 short-form walkthrough reels': '6 Reels',
  'short-form walkthrough reels': '6 Reels',
  'walkthroughs': '6 Reels',
  'walkthrough': '6 Reels',
  'reels': '6 Reels',
  'reel': '6 Reels',
  'videos': '6 Reels',
  'video': '6 Reels',

  // 4 Creative Designs
  '4 creative designs': '4 Creative Designs',
  '6 creative designs': '4 Creative Designs',
  'creative designs': '4 Creative Designs',
  'creative design': '4 Creative Designs',
  'creatives': '4 Creative Designs',
  'designs': '4 Creative Designs',

  // Website
  'restaurant website': 'Website',
  'portfolio website': 'Website',
  'portfolios': 'Website',
  'portfolio': 'Website',
  'website': 'Website',
  'websites': 'Website',

  // Social Media
  'social media handling': 'Social Media Handling',
  'social media': 'Social Media Handling',
  'social': 'Social Media Handling',

  // Google Business
  'google business profile': 'Google Business Profile',
  'google business': 'Google Business Profile',
  'gbp': 'Google Business Profile',
  'gmb': 'Google Business Profile',

  // Local SEO
  'local seo': 'Local SEO',
  'seo': 'Local SEO',

  // Ads
  'meta ads': 'Meta Ads',
  'meta ad': 'Meta Ads',
  'facebook ads': 'Meta Ads',
  'instagram ads': 'Meta Ads',
  'google ads': 'Google Ads',
  'google ad': 'Google Ads',
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
      price: '₹29,999',
      priceNumber: 29999,
      priceSuffix: '/ month',
      description: 'A focused foundation for restaurants ready to strengthen their digital presence.',
      items: [
        { name: 'Food Photography', included: true },
        { name: '6 Reels', included: true },
        { name: '4 Creative Designs', included: true },
        { name: 'Restaurant Website', included: false },
        { name: 'Social Media Handling', included: true },
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
      price: '₹39,999',
      priceNumber: 39999,
      priceSuffix: '/ month',
      description: 'A stronger digital presence for restaurants ready to build consistency and footfall.',
      items: [
        { name: 'Food Photography', included: true },
        { name: '10 Reels', included: true },
        { name: '6 Creative Designs', included: true },
        { name: 'Restaurant Website', included: false },
        { name: 'Social Media Handling', included: true },
        { name: 'Google Business Profile', included: true },
        { name: 'Local SEO', included: true },
        { name: 'Meta Ads', included: true },
        { name: 'Google Ads', included: false },
      ],
      ctaText: 'SELECT STANDARD',
    },
    {
      num: '03',
      name: 'Signature',
      price: '₹69,999',
      priceNumber: 69999,
      priceSuffix: '/ month',
      description: 'A complete digital growth engine for restaurants ready to dominate local dining.',
      items: [
        { name: 'Food & Restaurant Photography', included: true },
        { name: '12 Reels', included: true },
        { name: '8 Creative Designs', included: true },
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
      price: 'From ₹2,500',
      priceNumber: 2500,
      priceSuffix: '/ month',
      description: 'A flexible package built around exactly what your restaurant needs.',
      ctaText: 'BUILD CUSTOM PACKAGE',
    },
  ],
  'Interior Design': [
    {
      num: '01',
      name: 'Foundation',
      price: '₹29,999',
      priceNumber: 29999,
      priceSuffix: '/ month',
      description: 'A focused foundation for studios and designers ready to showcase spatial work.',
      items: [
        { name: 'Project & Spatial Photography', included: true },
        { name: '6 Walkthrough Reels', included: true },
        { name: '4 Creative Designs', included: true },
        { name: 'Portfolio Website', included: false },
        { name: 'Social Media Handling', included: true },
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
      price: '₹39,999',
      priceNumber: 39999,
      priceSuffix: '/ month',
      description: 'A comprehensive digital presence to position projects in front of high-value clientele.',
      items: [
        { name: 'Project & Spatial Photography', included: true },
        { name: '10 Walkthrough Reels', included: true },
        { name: '6 Creative Designs', included: true },
        { name: 'Portfolio Website', included: false },
        { name: 'Social Media Handling', included: true },
        { name: 'Google Business Profile', included: true },
        { name: 'Local SEO', included: true },
        { name: 'Meta Ads', included: true },
        { name: 'Google Ads', included: false },
      ],
      ctaText: 'SELECT STANDARD',
    },
    {
      num: '03',
      name: 'Luxury',
      price: '₹69,999',
      priceNumber: 69999,
      priceSuffix: '/ month',
      description: 'An end-to-end digital and acquisition system for established architectural practices.',
      items: [
        { name: 'Project & Spatial Photography', included: true },
        { name: '12 Walkthrough Reels', included: true },
        { name: '8Creative Designs', included: true },
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
      price: 'From ₹2,500',
      priceNumber: 2500,
      priceSuffix: '/ month',
      description: 'A bespoke package tailored to your studio’s specific project and growth requirements.',
      ctaText: 'BUILD CUSTOM PACKAGE',
    },
  ],
}

export const customServiceList: Record<Industry, string[]> = {
  Restaurants: [
    'Photography',
    '6 Reels',
    '4 Creative Designs',
    'Website',
    'Social Media Handling',
    'Google Business Profile',
    'Local SEO',
    'Meta Ads',
    'Google Ads',
  ],
  'Interior Design': [
    'Project Photo',
    '6 Walkthrough Reels',
    '4 Creative Designs',
    'Website',
    'Social Media Handling',
    'Google Business Profile',
    'Local SEO',
    'Meta Ads',
    'Google Ads',
  ],
}

/**
 * Format currency in Indian Numbering format (INR)
 */
export function formatINR(amount?: number | null): string {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '₹0'
  }
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
