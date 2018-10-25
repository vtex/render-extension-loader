import typescript from 'rollup-plugin-typescript2'
import uglify from 'rollup-plugin-uglify'
import pkg from './package.json'

const addMinExtension = (filePath) => {
  return filePath.replace(/\.([^.]*)$/, '.min.$1')
}

export default [
  {
    input: 'src/render-extension-loader.ts',
    output: [{
      name: 'RenderExtensionLoader',
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
    }, {
      name: 'RenderExtensionLoader',
      file: addMinExtension(pkg.browser),
      format: 'umd',
      sourcemap: true,
    }],
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
