import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import buble from '@rollup/plugin-buble'
import path from 'path'
import fs from 'fs'

const pack = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf8'))

export default {
  input: 'src/index.js',
  output: [
    { format: 'esm', file: `dist/${pack.name}.esm.js` },
    { format: 'cjs', file: `dist/${pack.name}.common.js` }
  ],
  plugins: [
    commonjs(),
    vue({
      compileTemplate: true,
      standalone: true
    }),
    buble()
  ]
}
