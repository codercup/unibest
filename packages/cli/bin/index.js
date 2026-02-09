#!/usr/bin/env node
import { dirname } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import('../dist/index.js').catch((err) => {
  console.error('Failed to load CLI:', err)
  process.exit(1)
})
