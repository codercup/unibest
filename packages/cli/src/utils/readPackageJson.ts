import fs from 'node:fs'

export interface PackageJson {
  name: string
  version: string
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  [key: string]: any
}

export function readPackageJson(pkgPath: string): PackageJson {
  if (!fs.existsSync(pkgPath)) {
    throw new Error(`package.json not found: ${pkgPath}`)
  }

  const content = fs.readFileSync(pkgPath, 'utf-8')
  return JSON.parse(content) as PackageJson
}

export function writePackageJson(pkgPath: string, pkg: PackageJson): void {
  fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`)
}
