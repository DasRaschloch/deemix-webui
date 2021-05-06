import { fetchData } from '@/utils/api'

let settingsData = {}
let defaultSettingsData = {}
let spotifyCredentials = {}

let cached = false

export async function getSettingsData() {
	if (!cached) {
		let data = await fetchData('getSettings')
		let { settings, defaultSettings, spotifySettings } = data
		// cached = true
		settingsData = settings
		defaultSettingsData = defaultSettings
		spotifyCredentials = spotifySettings || {}
	}
	return { settingsData, defaultSettingsData, spotifyCredentials }
}

/**
 * @returns	{number}
 */
export function getInitialPreviewVolume() {
	let volume = parseInt(localStorage.getItem('previewVolume'))

	if (isNaN(volume)) {
		volume = 80 // Default
		localStorage.setItem('previewVolume', volume.toString())
	}

	return volume
}

/**
 * @returns	{boolean}
 */
export function checkInitialSlimDownloads() {
	return 'true' === localStorage.getItem('slimDownloads')
}

/**
 * @returns	{boolean}
 */
export function checkInitialSlimSidebar() {
	return 'true' === localStorage.getItem('slimSidebar')
}
