import buble from 'rollup-plugin-buble'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'

const config = {
  entry: 'src/app.js',
  plugins: [
    buble({
      jsx: "h",
      objectAssign: 'Object.assign'
    }),
    resolve({
      jsnext: true
    })
  ],
  targets: [
    {
      dest: 'public/bundle.js',
      format: 'iife',
      sourceMap: true
    }
  ]
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(uglify())
  config.targets[0].sourceMap = false
}

export default config
