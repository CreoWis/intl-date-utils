
import { build } from 'esbuild'

await build({
  entryPoints: ['src/dateUtils.js'],
  outfile: 'dist/dateUtils.js',
  format: 'esm',
  platform: 'neutral',
})

await build({
  entryPoints: ['src/dateUtils.js'],
  outfile: 'dist/dateUtils.min.js',
  format: 'esm',
  minify: true,
  platform: 'neutral',
})

console.log('Build complete')
