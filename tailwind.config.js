module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true
	},
	purge: ['./src/**/*.html', './src/**/*.vue'],
	theme: {
		extend: {}
	},
	variants: {},
	corePlugins: {
		preflight: false
	},
	plugins: []
}
