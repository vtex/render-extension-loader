import typescript from 'rollup-plugin-typescript2'
import uglify from 'rollup-plugin-uglify'
import pkg from './package.json'

export default [
  {
    input: 'src/render-extension-loader.ts',
    output: {
      name: 'RenderExtensionLoader',
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
    },
    plugins: [
      typescript(),
      uglify(),
    ],
    onwarn: function(warning) {
      if (warning.code === 'THIS_IS_UNDEFINED') return
      console.error(warning.message)
    },
  }
]
