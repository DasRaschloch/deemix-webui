import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import alias from '@rollup/plugin-alias'
import { terser } from 'rollup-plugin-terser'

// 'npm run watch:js' -> 'production' is false
// 'npm run build:js' -> 'production' is true
const production = !process.env.ROLLUP_WATCH

export default {
	input: 'src/js/app.js',
	output: [
		{
			file: 'public/js/bundle.js',
			format: 'module',
			sourcemap: true
		}
	],
	plugins: [
		alias({
			entries: [
				{
					find: 'vue',
					replacement: 'vue/dist/vue.esm'
				}
			]
		}),
		// Needed for Vue imports
		replace({
			'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development')
		}),
		resolve(), // Tells Rollup how to find imported modules in node_modules
		commonjs(), // Converts imported modules to ES modules, if necessary
		production && terser() // Minify, but only in production
	]
}
