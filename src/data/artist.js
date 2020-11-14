import { getPropertyWithFallback } from '@/utils/utils'

export function formatArtistData(artistData) {
	return {
		artistID: getPropertyWithFallback(artistData, 'id'),
		artistName: getPropertyWithFallback(artistData, 'name'),
		artistPictureXL: getPropertyWithFallback(artistData, 'picture_xl'),
		artistReleases: formatArtistReleases(getPropertyWithFallback(artistData, 'releases'))
	}
}

function formatArtistReleases(artistReleases) {
	let formattedReleases = {}

	for (const releaseType in artistReleases) {
		if (artistReleases.hasOwnProperty(releaseType)) {
			const releases = artistReleases[releaseType]
			formattedReleases[releaseType] = []

			for (const release of releases) {
				formattedReleases[releaseType].push({
					releaseID: getPropertyWithFallback(release, 'id'),
					releaseCover: getPropertyWithFallback(release, 'cover_small'),
					releaseTitle: getPropertyWithFallback(release, 'title'),
					releaseDate: getPropertyWithFallback(release, 'release_date'),
					releaseTracksNumber: getPropertyWithFallback(release, 'nb_song'),
					releaseLink: getPropertyWithFallback(release, 'link'),
					isReleaseExplicit: getPropertyWithFallback(release, 'explicit_lyrics')
				})
			}
		}
	}

	return formattedReleases
}
