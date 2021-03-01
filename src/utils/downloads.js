import { fetchApi } from '@/utils/api'

/**
 * @param	{string}	url
 * @param	{number}	bitrate
 */
export function sendAddToQueue(url, bitrate = null) {
	if (!url) throw new Error('No URL given to sendAddToQueue function!')

	fetchApi('addToQueue', { url, bitrate })
}

export function aggregateDownloadLinks(releases) {
	let links = []

	releases.forEach(release => {
		links.push(release.link)
	})

	return links.join(';')
}
