// fix: https://github.com/unibest-tech/unibest/issues/219

// Windows path loader for Node.js ESM
// This loader converts Windows absolute paths to file:// URLs

import { pathToFileURL } from 'node:url'

/**
 * Resolve hook for ESM loader
 * Converts Windows absolute paths to file:// URLs
 */
export function resolve(specifier, context, defaultResolve) {
  // Check if this is a Windows absolute path (starts with drive letter like C:)
  if (specifier.match(/^[a-z]:\\/i) || specifier.match(/^[a-z]:\//i)) {
    // Convert Windows path to file:// URL
    const fileUrl = pathToFileURL(specifier).href
    return defaultResolve(fileUrl, context, defaultResolve)
  }

  // For all other specifiers, use the default resolve
  return defaultResolve(specifier, context, defaultResolve)
}

/**
 * Load hook for ESM loader
 */
export function load(url, context, defaultLoad) {
  return defaultLoad(url, context, defaultLoad)
}
