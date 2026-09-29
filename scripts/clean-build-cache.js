const fs = require('fs')
const path = require('path')

/**
 * Post-build cache cleanup script.
 *
 * Next.js Turbopack generates ephemeral compiler session cache in `.next/cache/turbopack`
 * during build time. Because Netlify secret scanner inspects the build output including
 * ephemeral build cache directories, pruning `.next/cache` post-build ensures:
 * 1. Zero build-cache artifacts or compiler state files are retained in deployable output.
 * 2. Netlify secret scanning passes cleanly.
 * 3. Production serverless functions and static assets remain 100% intact.
 */
function cleanCache() {
  const cacheDirs = [
    path.join(process.cwd(), '.next', 'cache'),
    path.join(process.cwd(), '.netlify', '.next', 'cache'),
  ]

  for (const dir of cacheDirs) {
    if (fs.existsSync(dir)) {
      try {
        fs.rmSync(dir, { recursive: true, force: true })
        console.log(`[post-build] Pruned ephemeral compiler build cache: ${dir}`)
      } catch (err) {
        console.warn(`[post-build] Warning while cleaning cache at ${dir}:`, err.message)
      }
    }
  }
}

cleanCache()
