import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="site-footer border-t border-white/10 bg-[#050505] pt-10 sm:pt-14 lg:pt-18 pb-8 sm:pb-10 lg:pb-12">
      <div className="container-xcess">
        {/* ========================================================= */}
        {/* MOBILE FOOTER (block md:hidden)                           */}
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
              href="https://www.facebook.com/share/1VGdn1kfvm/?mibextid=wwXIfr"
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
              href="https://wa.me/919448553423?text=Hi"
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
              href="mailto:getintouchwithxcessmedia@gmail.com"
              aria-label="Email"
              className="hover:text-white transition-colors"
            >
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
            <a
              href="https://x.com/wexcessmedia"
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
                  <Link href="/#services" className="hover:text-white transition-colors">
                    Photography
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="hover:text-white transition-colors">
                    Short-form Videos / Reels
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="hover:text-white transition-colors">
                    Creative Designs
                  </Link>
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
                  <Link href="/#services" className="hover:text-white transition-colors">
                    Website
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="hover:text-white transition-colors">
                    Social Media Handling
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="hover:text-white transition-colors">
                    Google Business Profile
                  </Link>
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
                  <Link href="/#services" className="hover:text-white transition-colors">
                    Local SEO
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="hover:text-white transition-colors">
                    Meta Ads
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="hover:text-white transition-colors">
                    Google Ads
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Mobile Bottom Row: Copyright & Policy Links */}
          <div className="flex items-center justify-between gap-3 pt-6 border-t border-white/[0.06] mt-6 text-[8.5px] sm:text-[9px] font-mono uppercase tracking-[0.18em] text-[#666]">
            <span>© 2026 XCESS MEDIA.</span>
            <div className="flex items-center gap-4 sm:gap-5">
              <a
                href="#top"
                className="text-[18px] font-extrabold leading-none hover:text-white transition-colors"
                aria-label="Back to top"
              >
                ↑
              </a>
              <Link href="/privacy" className="hover:text-white transition-colors">
                PRIVACY
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                TERMS
              </Link>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* DESKTOP / TABLET FOOTER (hidden md:block)                 */}
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
                  href="https://www.facebook.com/share/1VGdn1kfvm/?mibextid=wwXIfr"
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
                  href="https://wa.me/919448553423?text=Hi"
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
                  href="mailto:getintouchwithxcessmedia@gmail.com"
                  aria-label="Email"
                  className="p-1 hover:text-white transition-colors"
                >
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>
                <a
                  href="https://x.com/wexcessmedia"
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

            {/* Right Nav Columns (4 Columns: CREATE, BUILD, GROW, QUICK LINKS) */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
              {/* Column 1: CREATE */}
              <div>
                <p className="mb-4 text-[10.5px] font-mono uppercase tracking-[0.2em] font-bold text-white">
                  CREATE
                </p>
                <ul className="space-y-2.5 text-[13px] text-[#8E8E93]">
                  <li>
                    <Link href="/#services" className="hover:text-white transition-colors">
                      Photography
                    </Link>
                  </li>
                  <li>
                    <Link href="/#services" className="hover:text-white transition-colors">
                      Short-form Videos / Reels
                    </Link>
                  </li>
                  <li>
                    <Link href="/#services" className="hover:text-white transition-colors">
                      Creative Designs
                    </Link>
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
                    <Link href="/#services" className="hover:text-white transition-colors">
                      Website
                    </Link>
                  </li>
                  <li>
                    <Link href="/#services" className="hover:text-white transition-colors">
                      Social Media Handling
                    </Link>
                  </li>
                  <li>
                    <Link href="/#services" className="hover:text-white transition-colors">
                      Google Business Profile
                    </Link>
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
                    <Link href="/#services" className="hover:text-white transition-colors">
                      Local SEO
                    </Link>
                  </li>
                  <li>
                    <Link href="/#services" className="hover:text-white transition-colors">
                      Meta Ads
                    </Link>
                  </li>
                  <li>
                    <Link href="/#services" className="hover:text-white transition-colors">
                      Google Ads
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 4: QUICK LINKS */}
              <div>
                <p className="mb-4 text-[10.5px] font-mono uppercase tracking-[0.2em] font-bold text-white">
                  QUICK LINKS
                </p>
                <ul className="space-y-2.5 text-[13px] text-[#8E8E93]">
                  <li>
                    <Link href="/#industries" className="hover:text-white transition-colors">
                      Industries
                    </Link>
                  </li>
                  <li>
                    <Link href="/#packages" className="hover:text-white transition-colors">
                      Packages
                    </Link>
                  </li>
                  <li>
                    <Link href="/#about" className="hover:text-white transition-colors">
                      About
                    </Link>
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
              <Link href="/privacy" className="hover:text-white transition-colors">
                PRIVACY
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                TERMS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
