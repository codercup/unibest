import { createProdMockServer } from 'vite-plugin-mock/client'

const modules = import.meta.glob('/mock/**/*.ts', { eager: true })

const mockModules: any[] = []
Object.keys(modules).forEach((key) => {
  if (key.includes('/_')) {
    return
  }
  mockModules.push(...(modules as Recordable)[key].default)
})

console.log('mockModules -> ', mockModules)

/**
 * Used in a production environment. Need to manually import all modules
 */
export function setupProdMockServer() {
  createProdMockServer(mockModules)
}
