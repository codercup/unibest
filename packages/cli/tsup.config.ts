import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  outDir: 'dist',
  splitting: false,
  sourcemap: false,
  clean: true,
  dts: false, // 禁用 dts 生成，避免类型问题
  tsconfig: 'tsconfig.json',
})
