import vue from 'rollup-plugin-vue'
import buble from '@rollup/plugin-buble'
import path from 'path'
import fs from 'fs'

const pack = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf8'))

export default {
  input: 'src/index.js',
  output: [
    { format: 'es', file: `dist/${pack.name}.esm.js` },
    { format: 'cjs', file: `dist/${pack.name}.common.js` }
  ],
  plugins: [
    vue({
      compileTemplate: true,
      standalone: true
    }),
    buble()
  ]
}
