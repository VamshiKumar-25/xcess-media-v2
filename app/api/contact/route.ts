import 'server-only'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const OWNER_EMAIL = 'vamshikumar.2507@gmail.com'
const FALLBACK_FROM_EMAIL = 'Xcess Media <onboarding@resend.dev>'
const FALLBACK_SITE_URL = 'https://xcessmedia.in'

function getFromEmail(): string {
  return process.env['RESEND_FROM_EMAIL'] || FALLBACK_FROM_EMAIL
}

function getSiteUrl(): string {
  return process.env['NEXT_PUBLIC_SITE_URL'] || FALLBACK_SITE_URL
}

function getResendApiKey(): string | undefined {
  return process.env['RESEND_API_KEY']
}

/**
 * Loads inline email assets (PNG logo, SVG logo, and footer banner)
 * so they are embedded directly in the email payload with Content-ID (CID).
 * This ensures images render reliably in all email clients without relying on external domains.
 */
function getEmailAttachments() {
  const attachments: Array<{
    filename: string
    content: Buffer
    contentType?: string
    inlineContentId?: string
  }> = []

  try {
    const logoPngPath = path.join(process.cwd(), 'public/images/xcess-media-logo-email.png')
    if (fs.existsSync(logoPngPath)) {
      attachments.push({
        filename: 'xcess-media-logo.png',
        content: fs.readFileSync(logoPngPath),
        contentType: 'image/png',
        inlineContentId: 'xcess-media-logo',
      })
    }

    const footerBannerPath = path.join(process.cwd(), 'public/images/email-footer-banner.jpg')
    if (fs.existsSync(footerBannerPath)) {
      attachments.push({
        filename: 'email-footer-banner.jpg',
        content: fs.readFileSync(footerBannerPath),
        contentType: 'image/jpeg',
        inlineContentId: 'email-footer-banner',
      })
    }
  } catch (err) {
    console.warn('[EMAIL ATTACHMENTS LOAD WARNING]:', err)
  }

  return attachments
}

// ============================================================================
// 1. BRANDED CLIENT CONFIRMATION EMAIL TEMPLATE (Minimal, Luxury, Editorial)
// ============================================================================
function generateClientConfirmationEmail(params: {
  name: string
  mode: 'general' | 'package'
  industry?: string
  packageName?: string
  estimatedPrice?: string
  selectedServices?: string[]
  enquiryId: string
  submissionDate: string
}) {
  const {
    name,
    mode,
    industry = 'Restaurants',
    packageName = 'Standard',
    estimatedPrice = 'Custom',
    selectedServices = [],
    enquiryId,
    submissionDate,
  } = params

  const isPackage = mode === 'package'
  const subject = isPackage
    ? `We've received your enquiry: ${industry} — ${packageName} [${enquiryId}]`
    : `We've received your enquiry — Xcess Media [${enquiryId}]`

  const siteUrl = getSiteUrl()
  const logoUrl = 'cid:xcess-media-logo'
  const footerBannerUrl = 'cid:email-footer-banner'

  // Package Information Rows
  const packageDetailsHtml = isPackage
    ? `
    <!-- Package Details Card -->
    <tr>
      <td style="background-color: #121215; border: 1px solid #222226; border-radius: 10px; padding: 20px 22px; margin-top: 20px;">
        <p style="margin: 0 0 14px 0; font-size: 9.5px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #8B0000;">PACKAGE DETAILS</p>
        
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
          <tr>
            <td style="padding: 6px 0; border-bottom: 1px solid #1C1C20; font-size: 13px; color: #8E8E93;">INDUSTRY</td>
            <td style="padding: 6px 0; border-bottom: 1px solid #1C1C20; font-size: 13.5px; color: #F8F8F8; font-weight: 600; text-align: right;">${industry}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; border-bottom: 1px solid #1C1C20; font-size: 13px; color: #8E8E93;">SELECTED PACKAGE</td>
            <td style="padding: 6px 0; border-bottom: 1px solid #1C1C20; font-size: 13.5px; color: #FF4444; font-weight: 700; text-align: right;">${packageName.toUpperCase()}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 13px; color: #8E8E93;">ESTIMATED INVESTMENT</td>
            <td style="padding: 6px 0; font-size: 14px; color: #F8F8F8; font-weight: 700; text-align: right;">${estimatedPrice}</td>
          </tr>
        </table>

        ${selectedServices.length > 0 ? `
          <div style="margin-top: 16px; pt-3; border-top: 1px solid #1C1C20; padding-top: 14px;">
            <p style="margin: 0 0 8px 0; font-size: 9.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #8E8E93;">SELECTED SERVICES (${selectedServices.length})</p>
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              ${selectedServices.map((svc) => `
                <tr>
                  <td style="padding: 3px 0; font-size: 12.5px; color: #CCCCCC; line-height: 1.5;">
                    <span style="color: #8B0000; font-size: 14px; margin-right: 6px;">•</span> ${svc}
                  </td>
                </tr>
              `).join('')}
            </table>
          </div>
        ` : ''}
      </td>
    </tr>
    `
    : ''

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 24px 12px; background-color: #050505; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #F8F8F8; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #050505;">
    <tr>
      <td align="center">
        <!-- Main Email Container (Max 600px) -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #0D0D0F; border: 1px solid #222225; border-radius: 14px; overflow: hidden;">
          
          <!-- Top Branded Header -->
          <tr>
            <td style="padding: 28px 32px 24px 32px; text-align: center; background-color: #08080A; border-bottom: 2px solid #8B0000;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <a href="${siteUrl}" target="_blank" style="text-decoration: none; display: inline-block;">
                      <img src="${logoUrl}" alt="XCESS MEDIA" width="160" style="display: block; width: 160px; max-width: 100%; height: auto; border: 0;" />
                    </a>
                    <p style="margin: 8px 0 0 0; font-size: 9px; font-weight: 700; letter-spacing: 0.26em; color: #8B0000; text-transform: uppercase;">CREATE · BUILD · GROW</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Body Content -->
          <tr>
            <td style="padding: 32px 32px 28px 32px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                
                <!-- Status Badge -->
                <tr>
                  <td>
                    <table border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 18px;">
                      <tr>
                        <td style="background-color: rgba(139,0,0,0.12); border: 1px solid rgba(139,0,0,0.35); border-radius: 20px; padding: 4px 12px;">
                          <span style="color: #8B0000; font-size: 9px; margin-right: 5px;">●</span>
                          <span style="font-size: 9.5px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #FF5555;">ENQUIRY RECEIVED</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Personalized Greeting -->
                <tr>
                  <td>
                    <h2 style="margin: 0 0 12px 0; font-size: 22px; font-weight: 700; color: #F8F8F8; letter-spacing: -0.02em; line-height: 1.2;">
                      Hi ${name},
                    </h2>
                    <p style="margin: 0 0 16px 0; font-size: 14.5px; line-height: 1.65; color: #CCCCCC;">
                      Thank you for reaching out to Xcess Media. We've successfully received your enquiry and appreciate you taking the time to connect with us.
                    </p>
                    ${isPackage ? `
                      <div style="margin: 12px 0 18px 0; padding: 12px 16px; background-color: rgba(255,255,255,0.02); border-left: 3px solid #8B0000; border-radius: 0 6px 6px 0;">
                        <span style="font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #8E8E93;">ENQUIRY REGARDING:</span>
                        <div style="font-size: 15px; font-weight: 700; color: #F8F8F8; margin-top: 2px;">${industry} — <span style="color: #FF5555;">${packageName} Package</span></div>
                      </div>
                    ` : ''}
                  </td>
                </tr>

                <!-- Reference Block -->
                <tr>
                  <td style="padding: 14px 18px; background-color: #121215; border: 1px solid #222226; border-radius: 8px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                          <span style="font-size: 9px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #777777;">ENQUIRY REFERENCE</span>
                          <div style="font-size: 16px; font-family: 'SFMono-Regular', Consolas, Menlo, monospace; color: #F8F8F8; font-weight: 700; margin-top: 3px; letter-spacing: 0.05em;">${enquiryId}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Spacer -->
                <tr><td height="20"></td></tr>

                <!-- Package Details (If Package Mode) -->
                ${packageDetailsHtml}

                <!-- Next Steps Message -->
                <tr>
                  <td style="padding-top: ${isPackage ? '24px' : '8px'};">
                    <h3 style="margin: 0 0 6px 0; font-size: 14px; font-weight: 600; color: #F8F8F8;">What happens next?</h3>
                    <p style="margin: 0 0 8px 0; font-size: 13.5px; line-height: 1.6; color: #B3B3B3;">
                      We'll review your requirements and get back to you shortly via WhatsApp / Phone.
                    </p>
                    <p style="margin: 0; font-size: 12px; line-height: 1.5; color: #777777;">
                      If you need to contact us regarding this enquiry, please keep your enquiry reference <strong style="color: #AAAAAA;">${enquiryId}</strong> handy.
                    </p>
                  </td>
                </tr>

                <!-- CTA Button -->
                <tr>
                  <td align="center" style="padding: 28px 0 8px 0;">
                    <a href="${siteUrl}" target="_blank" style="display: inline-block; background-color: #8B0000; color: #FFFFFF; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; text-decoration: none; padding: 13px 28px; border-radius: 8px; box-shadow: 0 4px 16px rgba(139,0,0,0.3);">
                      BACK TO XCESS MEDIA
                    </a>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Cinematic Footer Image Banner -->
          <tr>
            <td style="padding: 0 24px;">
              <div style="border-radius: 8px; overflow: hidden; border: 1px solid #222226; background-color: #121214;">
                <img src="${footerBannerUrl}" alt="Xcess Media — Cinematic Hospitality & Spatial Design Ambience" width="552" style="display: block; width: 100%; height: auto; max-width: 100%; border: 0;" />
              </div>
            </td>
          </tr>

          <!-- Brand Footer -->
          <tr>
            <td style="padding: 28px 32px; text-align: center;">
              <p style="margin: 0; font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #F8F8F8;">XCESS MEDIA</p>
              <p style="margin: 3px 0 0 0; font-size: 9.5px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #8B0000;">CREATE · BUILD · GROW</p>
              <p style="margin: 8px 0 0 0; font-size: 11px; color: #777777;">Restaurants × Interior Design</p>
              
              <!-- Subtle Footer Links -->
              <p style="margin: 14px 0 0 0; font-size: 11px; color: #888888;">
                <a href="https://instagram.com/xcessmedia.in" target="_blank" style="color: #999999; text-decoration: none; margin: 0 8px;">Instagram</a>
                <span style="color: #444444;">·</span>
                <a href="${siteUrl}" target="_blank" style="color: #999999; text-decoration: none; margin: 0 8px;">Website</a>
              </p>

              <p style="margin: 14px 0 0 0; font-size: 10px; color: #555555; letter-spacing: 0.05em;">
                © 2026 Xcess Media. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `

  const text = isPackage
    ? `
XCESS MEDIA
CREATE · BUILD · GROW
--------------------------------------------------
ENQUIRY RECEIVED [Ref: ${enquiryId}]

Hi ${name},

Thank you for reaching out to Xcess Media. We've successfully received your enquiry for:
${industry} — ${packageName} Package

ENQUIRY DETAILS
--------------------------------------------------
Reference ID: ${enquiryId}
Industry: ${industry}
Package: ${packageName}
Estimated Investment: ${estimatedPrice}
Date: ${submissionDate} IST

SELECTED SERVICES:
${selectedServices.length > 0 ? selectedServices.map((s) => `• ${s}`).join('\n') : 'Standard package services included'}

WHAT HAPPENS NEXT?
--------------------------------------------------
We'll review your requirements and get back to you shortly via WhatsApp / Phone.
If you need to contact us regarding this enquiry, please keep your enquiry reference ${enquiryId} handy.

Website: ${siteUrl}
Instagram: https://instagram.com/xcessmedia.in

© 2026 Xcess Media. All rights reserved.
    `.trim()
    : `
XCESS MEDIA
CREATE · BUILD · GROW
--------------------------------------------------
ENQUIRY RECEIVED [Ref: ${enquiryId}]

Hi ${name},

Thank you for reaching out to Xcess Media. We've successfully received your enquiry and appreciate you taking the time to connect with us.

ENQUIRY DETAILS
--------------------------------------------------
Reference ID: ${enquiryId}
Date: ${submissionDate} IST

WHAT HAPPENS NEXT?
--------------------------------------------------
We'll review your requirements and get back to you shortly via WhatsApp / Phone.
If you need to contact us regarding this enquiry, please keep your enquiry reference ${enquiryId} handy.

Website: ${siteUrl}
Instagram: https://instagram.com/xcessmedia.in

© 2026 Xcess Media. All rights reserved.
    `.trim()

  return { subject, html, text }
}

// ============================================================================
// 2. OWNER NOTIFICATION EMAIL TEMPLATE (Operational Internal Notification)
// ============================================================================
function generateOwnerEmail(params: {
  name: string
  businessName: string | null
  phone: string
  email: string | null
  mode: 'general' | 'package'
  industry?: string
  packageName?: string
  estimatedPrice?: string
  selectedServices?: string[]
  helpTopics?: string[]
  message: string | null
  enquiryId: string
  submissionDate: string
}) {
  const {
    name,
    businessName,
    phone,
    email,
    mode,
    industry = 'Restaurants',
    packageName = 'Standard',
    estimatedPrice = 'Custom',
    selectedServices = [],
    helpTopics = [],
    message,
    enquiryId,
    submissionDate,
  } = params

  const isPackage = mode === 'package'
  const subject = isPackage
    ? `New Package Enquiry: ${industry} — ${packageName} (${name})`
    : `New General Enquiry — Xcess Media (${name})`

  let html = ''
  let text = ''

  if (isPackage) {
    const servicesHtml = selectedServices.length > 0
      ? `<ul style="margin: 8px 0; padding-left: 20px; color: #333333; line-height: 1.6;">
          ${selectedServices.map((s) => `<li style="margin-bottom: 4px;"><strong>${s}</strong></li>`).join('')}
         </ul>`
      : '<p style="color: #666666; font-style: italic;">Standard package services included</p>'

    const servicesText = selectedServices.length > 0
      ? selectedServices.map((s) => `• ${s}`).join('\n')
      : 'Standard package services included'

    html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${subject}</title></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 24px; color: #18181b;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e4e4e7; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    <tr>
      <td style="background-color: #050505; padding: 24px 28px; border-bottom: 3px solid #8B0000;">
        <h1 style="color: #ffffff; font-size: 18px; font-weight: 700; margin: 0; letter-spacing: 0.1em; text-transform: uppercase;">XCESS MEDIA</h1>
        <p style="color: #8B0000; font-size: 11px; font-weight: 700; margin: 4px 0 0 0; letter-spacing: 0.18em; text-transform: uppercase;">PACKAGE ENQUIRY // REF: ${enquiryId}</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 28px;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td style="background-color: #f9f9fb; border-radius: 8px; padding: 18px; border: 1px solid #e4e4e7;">
              <h3 style="margin: 0 0 12px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: #8B0000;">Client Information</h3>
              <p style="margin: 4px 0; font-size: 14px;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 4px 0; font-size: 14px;"><strong>Business / Brand:</strong> ${businessName || '<span style="color: #888;">Not specified</span>'}</p>
              <p style="margin: 4px 0; font-size: 14px;"><strong>Phone / WhatsApp:</strong> <a href="tel:${phone}" style="color: #8B0000; text-decoration: none; font-weight: 600;">${phone}</a></p>
              <p style="margin: 4px 0; font-size: 14px;"><strong>Email:</strong> ${email ? `<a href="mailto:${email}" style="color: #8B0000; text-decoration: none;">${email}</a>` : '<span style="color: #888;">Not provided</span>'}</p>
            </td>
          </tr>
          <tr><td height="16"></td></tr>
          <tr>
            <td style="background-color: #ffffff; border-radius: 8px; padding: 18px; border: 1px solid #e4e4e7;">
              <h3 style="margin: 0 0 12px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: #8B0000;">Package Selection</h3>
              <table width="100%" border="0" cellspacing="0" cellpadding="4" style="font-size: 14px;">
                <tr><td width="38%" style="color: #555555;"><strong>Industry:</strong></td><td style="color: #111111; font-weight: 600;">${industry}</td></tr>
                <tr><td style="color: #555555;"><strong>Selected Tier:</strong></td><td style="color: #8B0000; font-weight: 700;">${packageName.toUpperCase()}</td></tr>
                <tr><td style="color: #555555;"><strong>Package Amount:</strong></td><td style="color: #111111; font-size: 16px; font-weight: 700;">${estimatedPrice}</td></tr>
              </table>
              <div style="margin-top: 14px; border-top: 1px solid #e4e4e7; padding-top: 12px;">
                <p style="margin: 0 0 6px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #555555; font-weight: 600;">Selected Services (${selectedServices.length}):</p>
                ${servicesHtml}
              </div>
            </td>
          </tr>
          ${message ? `
          <tr><td height="16"></td></tr>
          <tr>
            <td style="background-color: #f9f9fb; border-radius: 8px; padding: 18px; border: 1px solid #e4e4e7;">
              <h3 style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: #8B0000;">Project Notes / Details</h3>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #222222; white-space: pre-wrap;">${message}</p>
            </td>
          </tr>` : ''}
          <tr><td height="20"></td></tr>
          <tr>
            <td style="border-top: 1px solid #e4e4e7; padding-top: 14px; font-size: 11px; color: #71717a; text-align: center;">
              Submitted on ${submissionDate} IST • Enquiry ID: ${enquiryId} • Internal Xcess Media Lead
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

    text = `
XCESS MEDIA — PACKAGE ENQUIRY LEAD
Reference ID: ${enquiryId}
Date: ${submissionDate} IST

CLIENT INFORMATION
------------------
Name: ${name}
Business: ${businessName || 'Not specified'}
Phone / WhatsApp: ${phone}
Email: ${email || 'Not provided'}

PACKAGE SELECTION
-----------------
Industry: ${industry}
Selected Package: ${packageName}
Package Amount: ${estimatedPrice}

SELECTED SERVICES:
${servicesText}

PROJECT DETAILS / NOTES:
${message || 'None provided'}
    `.trim()
  } else {
    const topicsHtml = helpTopics.length > 0
      ? `<div style="margin-top: 4px;">${helpTopics.map((t) => `<span style="display: inline-block; background-color: #f4f4f5; border: 1px solid #d4d4d8; padding: 3px 8px; border-radius: 4px; font-size: 12px; margin: 2px 4px 2px 0; font-weight: 500;">${t}</span>`).join('')}</div>`
      : '<span style="color: #888;">Not specified</span>'

    const topicsText = helpTopics.length > 0 ? helpTopics.join(', ') : 'Not specified'

    html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${subject}</title></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 24px; color: #18181b;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e4e4e7; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    <tr>
      <td style="background-color: #050505; padding: 24px 28px; border-bottom: 3px solid #8B0000;">
        <h1 style="color: #ffffff; font-size: 18px; font-weight: 700; margin: 0; letter-spacing: 0.1em; text-transform: uppercase;">XCESS MEDIA</h1>
        <p style="color: #8B0000; font-size: 11px; font-weight: 700; margin: 4px 0 0 0; letter-spacing: 0.18em; text-transform: uppercase;">GENERAL ENQUIRY // REF: ${enquiryId}</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 28px;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td style="background-color: #f9f9fb; border-radius: 8px; padding: 18px; border: 1px solid #e4e4e7;">
              <h3 style="margin: 0 0 12px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: #8B0000;">Contact Details</h3>
              <p style="margin: 4px 0; font-size: 14px;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 4px 0; font-size: 14px;"><strong>Business / Organization:</strong> ${businessName || '<span style="color: #888;">Not specified</span>'}</p>
              <p style="margin: 4px 0; font-size: 14px;"><strong>Phone / WhatsApp:</strong> <a href="tel:${phone}" style="color: #8B0000; text-decoration: none; font-weight: 600;">${phone}</a></p>
              <p style="margin: 4px 0; font-size: 14px;"><strong>Email:</strong> ${email ? `<a href="mailto:${email}" style="color: #8B0000; text-decoration: none;">${email}</a>` : '<span style="color: #888;">Not provided</span>'}</p>
            </td>
          </tr>
          <tr><td height="16"></td></tr>
          <tr>
            <td style="background-color: #ffffff; border-radius: 8px; padding: 18px; border: 1px solid #e4e4e7;">
              <h3 style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: #8B0000;">What can we help with?</h3>
              ${topicsHtml}
            </td>
          </tr>
          <tr><td height="16"></td></tr>
          <tr>
            <td style="background-color: #f9f9fb; border-radius: 8px; padding: 18px; border: 1px solid #e4e4e7;">
              <h3 style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: #8B0000;">Message</h3>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #222222; white-space: pre-wrap;">${message || '<span style="color: #888;">No additional message provided</span>'}</p>
            </td>
          </tr>
          <tr><td height="20"></td></tr>
          <tr>
            <td style="border-top: 1px solid #e4e4e7; padding-top: 14px; font-size: 11px; color: #71717a; text-align: center;">
              Submitted on ${submissionDate} IST • Enquiry ID: ${enquiryId} • Internal Xcess Media Lead
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

    text = `
XCESS MEDIA — GENERAL ENQUIRY LEAD
Reference ID: ${enquiryId}
Date: ${submissionDate} IST

CLIENT DETAILS
--------------
Name: ${name}
Business / Organization: ${businessName || 'Not specified'}
Phone / WhatsApp: ${phone}
Email: ${email || 'Not provided'}

WHAT CAN WE HELP WITH:
${topicsText}

MESSAGE:
${message || 'No additional message provided'}
    `.trim()
  }

  return { subject, html, text }
}

// ============================================================================
// 3. MAIN API HANDLER
// ============================================================================
export async function POST(request: Request) {
  try {
    const data = await request.json()

    const {
      mode = 'general',
      name,
      businessName,
      phone,
      email,
      helpTopics,
      industry,
      package: packageName,
      selectedServices,
      estimatedPrice,
      projectDetails,
      message,
      honeypot,
    } = data

    // 1. Spam Protection: Honeypot trap
    if (honeypot && typeof honeypot === 'string' && honeypot.trim().length > 0) {
      console.warn('[SPAM BOT TRAPPED]: Honeypot filled. Ignoring submission silently.')
      return NextResponse.json({
        success: true,
        message: 'Enquiry received.',
        enquiryId: `XCS-${Date.now().toString().slice(-6)}`,
      })
    }

    // 2. Validate mandatory fields
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Name is required (minimum 2 characters).' },
        { status: 400 }
      )
    }

    if (!phone || typeof phone !== 'string' || !/^[\d\s+\-()]{7,25}$/.test(phone.trim())) {
      return NextResponse.json(
        { success: false, error: 'A valid Phone / WhatsApp number is required.' },
        { status: 400 }
      )
    }

    // 3. Validate optional email if provided
    const trimmedEmail = email && typeof email === 'string' ? email.trim() : null
    if (trimmedEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(trimmedEmail)) {
        return NextResponse.json(
          { success: false, error: 'Please provide a valid email address.' },
          { status: 400 }
        )
      }
    }

    // 4. Sanitize inputs
    const trimmedName = name.trim()
    const trimmedBusiness = businessName && typeof businessName === 'string' ? businessName.trim() : null
    const trimmedPhone = phone.trim()
    const trimmedMessage =
      (message && typeof message === 'string' ? message.trim() : null) ||
      (projectDetails && typeof projectDetails === 'string' ? projectDetails.trim() : null)
    const enquiryId = `XCS-${Date.now().toString().slice(-6)}`
    const submissionDate = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    })

    const servicesList: string[] = Array.isArray(selectedServices) ? selectedServices : []
    const topicsList: string[] = Array.isArray(helpTopics)
      ? helpTopics
      : typeof helpTopics === 'string' && helpTopics
        ? [helpTopics]
        : []

    // 5. Check Resend API Key
    const apiKey = getResendApiKey()
    if (!apiKey || apiKey.trim() === '') {
      console.error('[EMAIL_SERVICE_CONFIG_MISSING]: Resend API key environment variable is not configured.')
      return NextResponse.json(
        {
          success: false,
          error: 'Email service configuration is pending. Please try again later.',
          code: 'MISSING_API_KEY',
        },
        { status: 500 }
      )
    }

    const resend = new Resend(apiKey)
    const fromEmail = getFromEmail()

    // 6. Generate Owner Notification Email
    const ownerEmailContent = generateOwnerEmail({
      name: trimmedName,
      businessName: trimmedBusiness,
      phone: trimmedPhone,
      email: trimmedEmail,
      mode,
      industry,
      packageName,
      estimatedPrice,
      selectedServices: servicesList,
      helpTopics: topicsList,
      message: trimmedMessage,
      enquiryId,
      submissionDate,
    })

    const ownerPayload: any = {
      from: fromEmail,
      to: [OWNER_EMAIL],
      subject: ownerEmailContent.subject,
      html: ownerEmailContent.html,
      text: ownerEmailContent.text,
    }

    if (trimmedEmail) {
      ownerPayload.replyTo = trimmedEmail
    }

    // Dispatch Owner Notification Email
    const ownerResult = await resend.emails.send(ownerPayload)

    if (ownerResult.error) {
      console.error('[RESEND OWNER EMAIL ERROR]:', ownerResult.error)
      return NextResponse.json(
        {
          success: false,
          error: `Email delivery failed: ${ownerResult.error.message || 'Unknown provider error'}`,
          providerError: ownerResult.error,
        },
        { status: 502 }
      )
    }

    console.log(`[OWNER EMAIL DISPATCHED]: ID ${ownerResult.data?.id} for Enquiry ${enquiryId}`)

    // 7. Dispatch Branded Client Confirmation Email (if visitor provided email)
    let clientEmailId: string | null = null
    if (trimmedEmail) {
      try {
        const clientEmailContent = generateClientConfirmationEmail({
          name: trimmedName,
          mode,
          industry,
          packageName,
          estimatedPrice,
          selectedServices: servicesList,
          enquiryId,
          submissionDate,
        })

        const emailAttachments = getEmailAttachments()

        const clientPayload: any = {
          from: fromEmail,
          to: [trimmedEmail],
          subject: clientEmailContent.subject,
          html: clientEmailContent.html,
          text: clientEmailContent.text,
          replyTo: OWNER_EMAIL,
          ...(emailAttachments.length > 0 ? { attachments: emailAttachments } : {}),
        }

        const clientResult = await resend.emails.send(clientPayload)

        if (clientResult.error) {
          console.warn('[RESEND CLIENT CONFIRMATION NOTICE]:', clientResult.error.message)
        } else {
          clientEmailId = clientResult.data?.id || null
          console.log(`[CLIENT CONFIRMATION EMAIL DISPATCHED]: ID ${clientEmailId} to ${trimmedEmail}`)
        }
      } catch (clientErr: any) {
        console.warn('[CLIENT CONFIRMATION DISPATCH CAUGHT]:', clientErr.message)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Enquiry sent successfully.',
      enquiryId,
      ownerEmailId: ownerResult.data?.id,
      clientEmailId,
    })
  } catch (error: any) {
    console.error('[ENQUIRY HANDLER ERROR]:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Something went wrong while sending your enquiry. Please try again.',
      },
      { status: 500 }
    )
  }
}
