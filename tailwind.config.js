module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true
	},
	purge: {
		// https://medium.com/@kyis/vue-tailwind-purgecss-the-right-way-c70d04461475
		content: [`./public/**/*.html`, `./src/**/*.vue`],
		defaultExtractor(content) {
			const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '')
			return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || []
		},
		whitelist: [],
		whitelistPatterns: [
			/-(leave|enter|appear)(|-(to|from|active))$/,
			/^(?!(|.*?:)cursor-move).+-move$/,
			/^router-link(|-exact)-active$/
		]
	},
	theme: {
		extend: {
			colors: {
				grayscale: {
					80: 'hsl(0, 0%, 8%)', // Remove maybe
					100: 'hsl(0, 0%, 10%)',
					140: 'hsl(0, 0%, 14%)', // Remove maybe
					200: 'hsl(0, 0%, 20%)',
					240: 'hsl(0, 0%, 24%)', // Remove maybe
					300: 'hsl(0, 0%, 30%)',
					400: 'hsl(0, 0%, 40%)',
					500: 'hsl(0, 0%, 50%)',
					600: 'hsl(0, 0%, 60%)',
					700: 'hsl(0, 0%, 70%)',
					800: 'hsl(0, 0%, 80%)',
					840: 'hsl(0, 0%, 84%)', // Remove maybe
					870: 'hsl(0, 0%, 87%)', // Remove maybe
					900: 'hsl(0, 0%, 90%)',
					930: 'hsl(0, 0%, 93%)' // Remove maybe
				},
				accent: 'var(--accent-color)',
				background: {
					main: 'var(--main-background)',
					secondary: 'var(--secondary-background)'
				},
				foreground: {
					default: 'var(--foreground)',
					inverted: 'var(--foreground-inverted)'
				},
				panels: {
					bg: 'var(--panels-background)',
					text: 'var(--panels-text)'
				}
			}
		}
	},
	variants: {},
	corePlugins: {
		preflight: false
	},
	plugins: []
}
