'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  ChevronDown,
  X,
  Menu,
  Plus,
  Minus,
  TrendingUp,
  PenTool,
  Monitor,
} from 'lucide-react'

// Instagram SVG Icon
function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

// LinkedIn SVG Icon
function LinkedInIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

// Facebook SVG Icon
function FacebookIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  )
}

// X / Twitter SVG Icon
function XTwitterIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

// WhatsApp SVG Icon (Official Brand Vector)
function WhatsAppIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  )
}

// Brand Logo Component with refined scale
export function NavbarLogo({ className = 'h-9 sm:h-10 md:h-10.5 lg:h-11.5 w-auto' }: { className?: string }) {
  return (
    <Link href="/#top" className="group flex items-center gap-2 shrink-0" aria-label="Xcess Media Home">
      <img
        src="/images/xcess-media-logo.svg"
        alt="XCESS MEDIA"
        className={`${className} object-contain transition-transform duration-300 group-hover:scale-[1.02] group-hover:opacity-95`}
      />
    </Link>
  )
}

export interface NavbarProps {
  activePage?: string
}

export default function Navbar({ activePage = 'Home' }: NavbarProps) {
  const [openDropdown, setOpenDropdown] = useState<'services' | 'industries' | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<{ [key: string]: boolean }>({
    services: false,
    industries: false,
  })
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>(activePage.toLowerCase())
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Scroll detection & Scroll-Spy for Homepage Sections
  useEffect(() => {
    const navLinkedSections = [
      { id: 'top', key: 'home' },
      { id: 'industries', key: 'industries' },
      { id: 'services', key: 'services' },
      { id: 'showcase', key: 'work' },
      { id: 'packages', key: 'packages' },
      { id: 'about', key: 'about' },
      { id: 'help', key: 'help' },
    ]

    let ticking = false

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Only perform automatic scroll-spy on the homepage
      if (typeof window !== 'undefined' && (window.location.pathname === '/' || window.location.pathname === '')) {
        if (window.scrollY < 160) {
          setActiveSection('home')
          return
        }

        // Trigger offset: 30% of viewport height (bounded between 180px and 260px)
        const triggerOffset = Math.min(260, Math.max(180, window.innerHeight * 0.3))
        const scrollPosition = window.scrollY + triggerOffset

        // Scan through nav-linked sections in DOM order.
        // Unlinked sections (approach, process, solutions, why) are omitted from this list,
        // which naturally preserves the active state of the last reached nav section.
        let current = 'home'
        for (const sec of navLinkedSections) {
          if (sec.id === 'top') continue
          const el = document.getElementById(sec.id)
          if (el) {
            const sectionTop = el.getBoundingClientRect().top + window.scrollY
            if (scrollPosition >= sectionTop) {
              current = sec.key
            }
          }
        }

        // Activate last section (help) if scrolled near the bottom
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80) {
          current = 'help'
        }

        setActiveSection(current)
      }
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const handleMouseEnter = (menu: 'services' | 'industries') => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setOpenDropdown(menu)
  }

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null)
    }, 150)
  }

  const toggleMobileAccordion = (section: string) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Smooth scroll handler for anchor links
  const handleNavClick = (e: React.MouseEvent, targetId: string, sectionKey: string) => {
    setActiveSection(sectionKey)
    setOpenDropdown(null)
    setMobileMenuOpen(false)

    if (typeof window !== 'undefined' && (window.location.pathname === '/' || window.location.pathname === '')) {
      e.preventDefault()

      if (targetId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        window.history.pushState(null, '', '/#top')
      } else {
        // Find target element. On desktop screens, if clicking a sub-chapter, scroll to the #industries section container
        let el = document.getElementById(targetId)
        if (!el || (window.innerWidth >= 1024 && targetId.startsWith('industries-'))) {
          el = document.getElementById('industries') || el
        }

        if (el) {
          const yOffset = -85
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
          window.scrollTo({ top: y, behavior: 'smooth' })
          window.history.pushState(null, '', `/#${targetId}`)
        }
      }
    }
  }

  // Determine active/red status cleanly without overlaps
  const isNavActive = (key: string) => {
    if (hoveredNav !== null) {
      return hoveredNav === key
    }
    if (openDropdown !== null) {
      return openDropdown === key
    }
    return activeSection === key
  }

  return (
    <>
      {/* Background click-away overlay when mobile menu is open */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden pointer-events-auto transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <header className="fixed inset-x-0 top-0 z-50 pt-6 sm:pt-7 lg:pt-3.5 pointer-events-none">
        <div className="container-xcess pointer-events-auto">
          {/* Main Navbar Floating Bar / Expanded Menu Panel on Mobile */}
          <div
            className={`relative rounded-2xl border transition-all duration-300 ease-out ${mobileMenuOpen
              ? 'bg-[#070709]/95 backdrop-blur-2xl border-white/[0.12] shadow-[0_16px_50px_rgba(0,0,0,0.9)] px-6 pt-3.5 pb-6'
              : scrolled
                ? 'bg-[#08080a]/50 backdrop-blur-2xl border-white/[0.12] shadow-[0_14px_45px_rgba(0,0,0,0.85)] px-6 sm:px-7 py-3 sm:py-3.5 min-h-[68px] sm:min-h-[70px] lg:min-h-[72px]'
                : 'bg-[#0a0a0c]/60 backdrop-blur-xl border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)] px-6 sm:px-7 py-3 sm:py-3.5 min-h-[68px] sm:min-h-[70px] lg:min-h-[72px]'
              }`}
          >
            {/* Top Header Row */}
            <div className="flex items-center justify-between min-h-[44px]">
              {/* Left: Brand Logo */}
              <div className="flex items-center" onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}>
                <NavbarLogo className="h-9 sm:h-10 md:h-10.5 lg:h-11.5 w-auto" />
              </div>

              {/* Center: Desktop Navigation Links */}
              <nav className="hidden lg:flex items-center gap-6 xl:gap-7.5 font-display text-[15px] lg:text-[15.5px] font-medium tracking-normal">
                {/* Home Link */}
                <div
                  className="relative py-1"
                  onMouseEnter={() => setHoveredNav('home')}
                  onMouseLeave={() => setHoveredNav(null)}
                >
                  <Link
                    href="/#top"
                    onClick={(e) => handleNavClick(e, 'top', 'home')}
                    className={`transition-colors duration-200 font-display font-medium ${isNavActive('home') ? 'text-[#8B0000]' : 'text-neutral-300 hover:text-[#8B0000]'
                      }`}
                  >
                    Home
                  </Link>
                </div>

                {/* Industries Dropdown Link */}
                <div
                  className="relative py-1 group"
                  onMouseEnter={() => {
                    setHoveredNav('industries')
                    handleMouseEnter('industries')
                  }}
                  onMouseLeave={() => {
                    setHoveredNav(null)
                    handleMouseLeave()
                  }}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      handleNavClick(e, 'industries', 'industries')
                      setOpenDropdown(openDropdown === 'industries' ? null : 'industries')
                    }}
                    className={`flex items-center gap-1.5 transition-colors duration-200 font-display font-medium cursor-pointer ${isNavActive('industries') ? 'text-[#8B0000]' : 'text-neutral-300 hover:text-[#8B0000]'
                      }`}
                  >
                    <span>Industries</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-all duration-200 ${openDropdown === 'industries'
                        ? 'rotate-180 text-[#8B0000]'
                        : isNavActive('industries')
                          ? 'text-[#8B0000]'
                          : 'text-neutral-400 group-hover:text-[#8B0000]'
                        }`}
                    />
                  </button>

                  {/* Compact Two-Column Editorial Dropdown - INDUSTRIES */}
                  {openDropdown === 'industries' && (
                    <div
                      className="absolute top-[calc(100%+16px)] left-0 w-[720px] max-w-[90vw] rounded-[16px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-200 ease-out before:absolute before:-top-4 before:left-0 before:right-0 before:h-4 before:content-['']"
                      style={{
                        backgroundColor: 'rgba(8, 8, 8, 0.96)',
                        borderColor: 'rgba(255, 255, 255, 0.10)',
                        backdropFilter: 'blur(24px)',
                      }}
                      onMouseEnter={() => handleMouseEnter('industries')}
                      onMouseLeave={handleMouseLeave}
                    >
                      {/* Two Equal Columns Grid */}
                      <div className="p-6 grid grid-cols-2 gap-8 divide-x divide-white/[0.08]">
                        {/* Industry 01: RESTAURANTS */}
                        <Link
                          href="/#industries-restaurants"
                          onClick={(e) => {
                            window.dispatchEvent(new CustomEvent('xcess:set-industry', { detail: 'restaurants' }))
                            handleNavClick(e, 'industries-restaurants', 'industries')
                            setOpenDropdown(null)
                          }}
                          className="group/item flex flex-col pr-4 transition-transform duration-200 ease-out hover:translate-x-0.5"
                        >
                          <div className="flex items-baseline gap-2">
                            <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#8B0000] uppercase">
                              01 —
                            </span>
                            <h4 className="font-display text-[18px] font-semibold uppercase tracking-tight text-[#F8F8F8] transition-colors duration-200 group-hover/item:text-white">
                              RESTAURANTS
                            </h4>
                          </div>
                          <p className="mt-2.5 font-display text-[15px] font-medium text-[#E0E0E0] transition-colors duration-200 group-hover/item:text-white">
                            Food. Atmosphere. Experience.
                          </p>
                          <p className="mt-2 text-[13.5px] font-sans leading-relaxed text-[#B3B3B3] transition-colors duration-200 group-hover/item:text-[#D4D4D4]">
                            Visual and digital solutions for restaurants.
                          </p>
                        </Link>

                        {/* Industry 02: INTERIOR DESIGN */}
                        <Link
                          href="/#industries-interiors"
                          onClick={(e) => {
                            window.dispatchEvent(new CustomEvent('xcess:set-industry', { detail: 'interiors' }))
                            handleNavClick(e, 'industries-interiors', 'industries')
                            setOpenDropdown(null)
                          }}
                          className="group/item flex flex-col pl-8 transition-transform duration-200 ease-out hover:translate-x-0.5"
                        >
                          <div className="flex items-baseline gap-2">
                            <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#8B0000] uppercase">
                              02 —
                            </span>
                            <h4 className="font-display text-[18px] font-semibold uppercase tracking-tight text-[#F8F8F8] transition-colors duration-200 group-hover/item:text-white">
                              INTERIOR DESIGN
                            </h4>
                          </div>
                          <p className="mt-2.5 font-display text-[15px] font-medium text-[#E0E0E0] transition-colors duration-200 group-hover/item:text-white">
                            Spaces. Craftsmanship. Design.
                          </p>
                          <p className="mt-2 text-[13.5px] font-sans leading-relaxed text-[#B3B3B3] transition-colors duration-200 group-hover/item:text-[#D4D4D4]">
                            Visual and digital solutions for interior design studios.
                          </p>
                        </Link>
                      </div>

                      {/* Bottom Feature Footer */}
                      <div className="px-6 py-3.5 bg-white/[0.02] border-t border-[#2A2A2A] flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#8E8E93]">
                          TWO INDUSTRIES. ONE FOCUS.
                        </span>
                        <Link
                          href="/#industries"
                          onClick={(e) => {
                            handleNavClick(e, 'industries', 'industries')
                            setOpenDropdown(null)
                          }}
                          className="group/btn inline-flex items-center font-display text-[13.5px] font-medium text-white hover:text-[#8B0000] transition-colors duration-200"
                        >
                          <span>Explore Industries</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Services Dropdown Link */}
                <div
                  className="relative py-1 group"
                  onMouseEnter={() => {
                    setHoveredNav('services')
                    handleMouseEnter('services')
                  }}
                  onMouseLeave={() => {
                    setHoveredNav(null)
                    handleMouseLeave()
                  }}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      handleNavClick(e, 'services', 'services')
                      setOpenDropdown(openDropdown === 'services' ? null : 'services')
                    }}
                    className={`flex items-center gap-1.5 transition-colors duration-200 font-display font-medium cursor-pointer ${isNavActive('services') ? 'text-[#8B0000]' : 'text-neutral-300 hover:text-[#8B0000]'
                      }`}
                  >
                    <span>Services</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-all duration-200 ${openDropdown === 'services'
                        ? 'rotate-180 text-[#8B0000]'
                        : isNavActive('services')
                          ? 'text-[#8B0000]'
                          : 'text-neutral-400 group-hover:text-[#8B0000]'
                        }`}
                    />
                  </button>

                  {/* Compact Three-Column Editorial Dropdown - SERVICES */}
                  {openDropdown === 'services' && (
                    <div
                      className="absolute top-[calc(100%+16px)] left-[-120px] xl:left-[-140px] w-[980px] max-w-[92vw] rounded-[16px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-200 ease-out before:absolute before:-top-4 before:left-0 before:right-0 before:h-4 before:content-['']"
                      style={{
                        backgroundColor: 'rgba(8, 8, 8, 0.96)',
                        borderColor: 'rgba(255, 255, 255, 0.10)',
                        backdropFilter: 'blur(24px)',
                      }}
                      onMouseEnter={() => handleMouseEnter('services')}
                      onMouseLeave={handleMouseLeave}
                    >
                      {/* Three Equal Columns Grid */}
                      <div className="p-6 grid grid-cols-3 gap-6 divide-x divide-white/[0.08]">
                        {/* Pillar 01: CREATE */}
                        <div className="flex flex-col pr-2">
                          <div className="flex items-baseline gap-2">
                            <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#8B0000] uppercase">
                              01 —
                            </span>
                            <h4 className="font-display text-[18px] font-semibold uppercase tracking-tight text-[#F8F8F8]">
                              CREATE
                            </h4>
                          </div>
                          <ul className="mt-4 space-y-2 text-[13.5px] font-sans text-[#B3B3B3]">
                            <li>
                              <Link
                                href="/#services"
                                onClick={(e) => {
                                  handleNavClick(e, 'services', 'services')
                                  setOpenDropdown(null)
                                }}
                                className="block hover:text-[#8B0000] hover:translate-x-1 transition-all duration-200 ease-out"
                              >
                                Photography
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/#services"
                                onClick={(e) => {
                                  handleNavClick(e, 'services', 'services')
                                  setOpenDropdown(null)
                                }}
                                className="block hover:text-[#8B0000] hover:translate-x-1 transition-all duration-200 ease-out"
                              >
                                Short-form Videos / Reels
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/#services"
                                onClick={(e) => {
                                  handleNavClick(e, 'services', 'services')
                                  setOpenDropdown(null)
                                }}
                                className="block hover:text-[#8B0000] hover:translate-x-1 transition-all duration-200 ease-out"
                              >
                                Creative Designs
                              </Link>
                            </li>
                          </ul>
                        </div>

                        {/* Pillar 02: CONNECT */}
                        <div className="flex flex-col px-4">
                          <div className="flex items-baseline gap-2">
                            <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#8B0000] uppercase">
                              02 —
                            </span>
                            <h4 className="font-display text-[18px] font-semibold uppercase tracking-tight text-[#F8F8F8]">
                              CONNECT
                            </h4>
                          </div>
                          <ul className="mt-4 space-y-2 text-[13.5px] font-sans text-[#B3B3B3]">
                            <li>
                              <Link
                                href="/#services"
                                onClick={(e) => {
                                  handleNavClick(e, 'services', 'services')
                                  setOpenDropdown(null)
                                }}
                                className="block hover:text-[#8B0000] hover:translate-x-1 transition-all duration-200 ease-out"
                              >
                                Website
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/#services"
                                onClick={(e) => {
                                  handleNavClick(e, 'services', 'services')
                                  setOpenDropdown(null)
                                }}
                                className="block hover:text-[#8B0000] hover:translate-x-1 transition-all duration-200 ease-out"
                              >
                                Social Media Handling
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/#services"
                                onClick={(e) => {
                                  handleNavClick(e, 'services', 'services')
                                  setOpenDropdown(null)
                                }}
                                className="block hover:text-[#8B0000] hover:translate-x-1 transition-all duration-200 ease-out"
                              >
                                Google Business Profile
                              </Link>
                            </li>
                          </ul>
                        </div>

                        {/* Pillar 03: GROW */}
                        <div className="flex flex-col pl-4">
                          <div className="flex items-baseline gap-2">
                            <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#8B0000] uppercase">
                              03 —
                            </span>
                            <h4 className="font-display text-[18px] font-semibold uppercase tracking-tight text-[#F8F8F8]">
                              GROW
                            </h4>
                          </div>
                          <ul className="mt-4 space-y-2 text-[13.5px] font-sans text-[#B3B3B3]">
                            <li>
                              <Link
                                href="/#services"
                                onClick={(e) => {
                                  handleNavClick(e, 'services', 'services')
                                  setOpenDropdown(null)
                                }}
                                className="block hover:text-[#8B0000] hover:translate-x-1 transition-all duration-200 ease-out"
                              >
                                Local SEO
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/#services"
                                onClick={(e) => {
                                  handleNavClick(e, 'services', 'services')
                                  setOpenDropdown(null)
                                }}
                                className="block hover:text-[#8B0000] hover:translate-x-1 transition-all duration-200 ease-out"
                              >
                                Meta Ads
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/#services"
                                onClick={(e) => {
                                  handleNavClick(e, 'services', 'services')
                                  setOpenDropdown(null)
                                }}
                                className="block hover:text-[#8B0000] hover:translate-x-1 transition-all duration-200 ease-out"
                              >
                                Google Ads
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Bottom Editorial Footer */}
                      <div className="px-6 py-3.5 bg-white/[0.02] border-t border-[#2A2A2A] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#8E8E93]">
                            CREATE. CONNECT. GROW.
                          </span>
                          <span className="hidden sm:inline font-display text-[13.5px] font-medium text-[#B3B3B3] border-l border-white/10 pl-3">
                            Built around your business.
                          </span>
                        </div>
                        <Link
                          href="/#services"
                          onClick={(e) => {
                            handleNavClick(e, 'services', 'services')
                            setOpenDropdown(null)
                          }}
                          className="group/btn inline-flex items-center font-display text-[13.5px] font-medium text-white hover:text-[#8B0000] transition-colors duration-200"
                        >
                          <span>Explore All Services</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Work Link */}
                <div
                  className="relative py-1"
                  onMouseEnter={() => setHoveredNav('work')}
                  onMouseLeave={() => setHoveredNav(null)}
                >
                  <Link
                    href="/#showcase"
                    onClick={(e) => handleNavClick(e, 'showcase', 'work')}
                    className={`transition-colors duration-200 font-display font-medium ${isNavActive('work') ? 'text-[#8B0000]' : 'text-neutral-300 hover:text-[#8B0000]'
                      }`}
                  >
                    Work
                  </Link>
                </div>

                {/* Packages Link */}
                <div
                  className="relative py-1"
                  onMouseEnter={() => setHoveredNav('packages')}
                  onMouseLeave={() => setHoveredNav(null)}
                >
                  <Link
                    href="/#packages"
                    onClick={(e) => handleNavClick(e, 'packages', 'packages')}
                    className={`transition-colors duration-200 font-display font-medium ${isNavActive('packages') ? 'text-[#8B0000]' : 'text-neutral-300 hover:text-[#8B0000]'
                      }`}
                  >
                    Packages
                  </Link>
                </div>

                {/* About Link */}
                <div
                  className="relative py-1"
                  onMouseEnter={() => setHoveredNav('about')}
                  onMouseLeave={() => setHoveredNav(null)}
                >
                  <Link
                    href="/#about"
                    onClick={(e) => handleNavClick(e, 'about', 'about')}
                    className={`transition-colors duration-200 font-display font-medium ${isNavActive('about') ? 'text-[#8B0000]' : 'text-neutral-300 hover:text-[#8B0000]'
                      }`}
                  >
                    About
                  </Link>
                </div>

                {/* Help Link */}
                <div
                  className="relative py-1"
                  onMouseEnter={() => setHoveredNav('help')}
                  onMouseLeave={() => setHoveredNav(null)}
                >
                  <Link
                    href="/#help"
                    onClick={(e) => handleNavClick(e, 'help', 'help')}
                    className={`transition-colors duration-200 font-display font-medium ${isNavActive('help') ? 'text-[#8B0000]' : 'text-neutral-300 hover:text-[#8B0000]'
                      }`}
                  >
                    Help
                  </Link>
                </div>
              </nav>

              {/* Right: Divider & CTA Button */}
              <div className="hidden lg:flex items-center">
                <span className="w-[1px] h-5 bg-white/[0.12] mr-5" />
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center px-4.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#8B0000] hover:bg-[#A50000] text-white font-display text-[12.5px] sm:text-[13px] font-semibold uppercase tracking-wider transition-all duration-300 ease-out hover:shadow-[0_4px_18px_rgba(139,0,0,0.4)]"
                >
                  <span>LET&apos;S TALK</span>
                </Link>
              </div>

              {/* Mobile Menu Trigger Button (when closed) */}
              {!mobileMenuOpen && (
                <button
                  type="button"
                  aria-label="Toggle navigation menu"
                  aria-expanded={false}
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-neutral-300 hover:text-[#8B0000] rounded-lg transition-colors cursor-pointer"
                >
                  <Menu className="w-6 h-6" />
                </button>
              )}

              {/* Mobile Menu Close Button (when open) */}
              {mobileMenuOpen && (
                <button
                  type="button"
                  aria-label="Close navigation menu"
                  aria-expanded={true}
                  onClick={() => setMobileMenuOpen(false)}
                  className="lg:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-neutral-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Expanded Mobile Menu Content (when open) */}
            {mobileMenuOpen && (
              <div className="lg:hidden pt-4 flex flex-col animate-in fade-in slide-in-from-top-2 duration-200">
                {/* Vertical Navigation Links */}
                <div className="flex flex-col space-y-2.5 font-display">
                  {/* Home */}
                  <Link
                    href="/#top"
                    onClick={(e) => handleNavClick(e, 'top', 'home')}
                    className={`text-[15.5px] font-medium transition-colors py-1 ${activeSection === 'home' ? 'text-[#8B0000]' : 'text-white hover:text-[#8B0000]'
                      }`}
                  >
                    Home
                  </Link>

                  {/* Industries */}
                  <div>
                    <div className="flex items-center justify-between py-1">
                      <Link
                        href="/#industries"
                        onClick={(e) => handleNavClick(e, 'industries', 'industries')}
                        className={`text-[15.5px] font-medium transition-colors ${activeSection === 'industries' ? 'text-[#8B0000]' : 'text-white hover:text-[#8B0000]'
                          }`}
                      >
                        Industries
                      </Link>
                      <button
                        type="button"
                        aria-label="Toggle industries submenu"
                        onClick={() => toggleMobileAccordion('industries')}
                        className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                      >
                        {mobileExpanded.industries ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </button>
                    </div>
                    {mobileExpanded.industries && (
                      <div className="pl-3.5 py-2 space-y-2 border-l border-white/10 my-1 text-[13.5px] font-sans">
                        <Link
                          href="/#industries-restaurants"
                          onClick={(e) => {
                            window.dispatchEvent(new CustomEvent('xcess:set-industry', { detail: 'restaurants' }))
                            handleNavClick(e, 'industries-restaurants', 'industries')
                          }}
                          className="block text-neutral-300 hover:text-[#8B0000] transition-colors"
                        >
                          Restaurants
                        </Link>
                        <Link
                          href="/#industries-interiors"
                          onClick={(e) => {
                            window.dispatchEvent(new CustomEvent('xcess:set-industry', { detail: 'interiors' }))
                            handleNavClick(e, 'industries-interiors', 'industries')
                          }}
                          className="block text-neutral-300 hover:text-[#8B0000] transition-colors"
                        >
                          Interior Design
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Services */}
                  <div>
                    <div className="flex items-center justify-between py-1">
                      <Link
                        href="/#services"
                        onClick={(e) => handleNavClick(e, 'services', 'services')}
                        className={`text-[15.5px] font-medium transition-colors ${activeSection === 'services' ? 'text-[#8B0000]' : 'text-white hover:text-[#8B0000]'
                          }`}
                      >
                        Services
                      </Link>
                      <button
                        type="button"
                        aria-label="Toggle services submenu"
                        onClick={() => toggleMobileAccordion('services')}
                        className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                      >
                        {mobileExpanded.services ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </button>
                    </div>
                    {mobileExpanded.services && (
                      <div className="pl-3.5 py-2 space-y-2 border-l border-white/10 my-1 text-[13.5px] font-sans">
                        <Link
                          href="/#services"
                          onClick={(e) => handleNavClick(e, 'services', 'services')}
                          className="block text-neutral-300 hover:text-[#8B0000] transition-colors"
                        >
                          Create - Photography, Video, Designs
                        </Link>
                        <Link
                          href="/#services"
                          onClick={(e) => handleNavClick(e, 'services', 'services')}
                          className="block text-neutral-300 hover:text-[#8B0000] transition-colors"
                        >
                          Build - Websites, Social, Google Profile
                        </Link>
                        <Link
                          href="/#services"
                          onClick={(e) => handleNavClick(e, 'services', 'services')}
                          className="block text-neutral-300 hover:text-[#8B0000] transition-colors"
                        >
                          Grow - Local SEO, Meta Ads, Google Ads
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Work */}
                  <Link
                    href="/#showcase"
                    onClick={(e) => handleNavClick(e, 'showcase', 'work')}
                    className={`text-[15.5px] font-medium transition-colors py-1 ${activeSection === 'work' ? 'text-[#8B0000]' : 'text-white hover:text-[#8B0000]'
                      }`}
                  >
                    Work
                  </Link>

                  {/* Packages */}
                  <Link
                    href="/#packages"
                    onClick={(e) => handleNavClick(e, 'packages', 'packages')}
                    className={`text-[15.5px] font-medium transition-colors py-1 ${activeSection === 'packages' ? 'text-[#8B0000]' : 'text-white hover:text-[#8B0000]'
                      }`}
                  >
                    Packages
                  </Link>

                  {/* About */}
                  <Link
                    href="/#about"
                    onClick={(e) => handleNavClick(e, 'about', 'about')}
                    className={`text-[15.5px] font-medium transition-colors py-1 ${activeSection === 'about' ? 'text-[#8B0000]' : 'text-white hover:text-[#8B0000]'
                      }`}
                  >
                    About
                  </Link>

                  {/* Help */}
                  <Link
                    href="/#help"
                    onClick={(e) => handleNavClick(e, 'help', 'help')}
                    className={`text-[15.5px] font-medium transition-colors py-1 ${activeSection === 'help' ? 'text-[#8B0000]' : 'text-white hover:text-[#8B0000]'
                      }`}
                  >
                    Help
                  </Link>
                </div>

                {/* Primary CTA Button: Let's Talk */}
                <div className="pt-5">
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full h-[44px] rounded-xl bg-[#8B0000] hover:bg-[#A50000] text-white font-display text-[13.5px] sm:text-[14px] font-semibold transition-all duration-300 shadow-[0_4px_16px_rgba(139,0,0,0.35)] active:scale-[0.99]"
                  >
                    <span>Let&apos;s Talk</span>
                  </Link>
                </div>

                {/* Social Media Icons */}
                <div className="flex items-center justify-center gap-7 text-neutral-400 pt-5 pb-1">
                  <a
                    href="https://instagram.com/xcessmedia.in"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="hover:text-white transition-colors p-1"
                  >
                    <InstagramIcon className="w-5 h-5" />
                  </a>
                  <a
                    href="https://whatsapp.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="WhatsApp"
                    className="hover:text-white transition-colors p-1"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="hover:text-white transition-colors p-1"
                  >
                    <FacebookIcon className="w-5 h-5" />
                  </a>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="X / Twitter"
                    className="hover:text-white transition-colors p-1"
                  >
                    <XTwitterIcon className="w-5 h-5" />
                  </a>
                </div>
                {/* Copyright */}
                <p className="mt-3 pb-2 text-center font-mono text-[8px] tracking-[0.18em] uppercase text-neutral-500">
                  © 2026 XCESS MEDIA.
                </p>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  )
}
