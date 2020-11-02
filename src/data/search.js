import { getProperty } from '@/utils/utils'

/**
 * @typedef		{object}				ReducedSearchResult
 * @property	{FormattedData}	data
 * @property	{boolean}				hasLoaded
 */

/**
 * @typedef		{object}	FormattedData
 */

/**
 * @typedef		{function}			Formatter
 * @returns		{FormattedData}	formattedData
 */

/**
 * Reduces passed data to a specific format decied by the formatter passed.
 *
 * @param		{object}		rawObj
 * @param		{Formatter}	formatFunc
 * @returns	{null|ReducedSearchResult}
 */
export function formatSearchResults(rawObj, formatFunc) {
	if (!rawObj.hasLoaded) {
		return null
	} else {
		const { data: rawData } = rawObj
		const formattedData = []

		for (const dataElement of rawData) {
			let formatted = formatFunc(dataElement)

			formattedData.push(formatted)
		}

		return {
			data: formattedData,
			hasLoaded: rawObj.hasLoaded
		}
	}
}

/**
 * @param {FormattedData}	track
 */
export function formatSingleTrack(track) {
	let isTrackExplicit = getProperty(track, 'explicit_lyrics', 'EXPLICIT_LYRICS')

	if (typeof isTrackExplicit === 'string') {
		isTrackExplicit = isTrackExplicit !== '0'
	}

	return {
		/* Track */
		trackTitle: getProperty(track, 'title', 'SNG_TITLE'),
		trackTitleVersion: getProperty(track, 'title_version', 'VERSION'),
		trackPreview: getProperty(track, 'preview'),
		trackDuration: getProperty(track, 'duration', 'DURATION'),
		trackLink: getProperty(track, 'link') || `https://www.deezer.com/track/${track.SNG_ID}`,
		isTrackExplicit,

		/* Artist */
		artistID: getProperty(track, 'artist.id', 'ART_ID'),
		artistName: getProperty(track, 'artist.name', 'ART_NAME'),

		/* Album */
		albumID: getProperty(track, 'album.id', 'ALB_ID'),
		albumTitle: getProperty(track, 'album.title', 'ALB_TITLE'),
		albumPicture:
			getProperty(track, 'album.cover_small') ||
			`https://e-cdns-images.dzcdn.net/images/cover/${track.ALB_PICTURE}/32x32-000000-80-0-0.jpg`
	}
}

export function formatAlbums(album) {
	let isAlbumExplicit = getProperty(album, 'explicit_lyrics', 'EXPLICIT_ALBUM_CONTENT.EXPLICIT_LYRICS_STATUS')

	if ('number' === typeof isAlbumExplicit) {
		isAlbumExplicit = isAlbumExplicit === 1
	}

	return {
		/* Album */
		albumID: getProperty(album, 'id', 'ALB_ID'),
		albumTitle: getProperty(album, 'title', 'ALB_TITLE'),
		albumCoverMedium:
			getProperty(album, 'cover_medium') ||
			`https://e-cdns-images.dzcdn.net/images/cover/${album.ALB_PICTURE}/156x156-000000-80-0-0.jpg`,
		albumLink: getProperty(album, 'link') || `https://deezer.com/album/${album.ALB_ID}`,
		albumTracks: getProperty(album, 'nb_tracks', 'NUMBER_TRACK'),
		isAlbumExplicit,

		/* Artist */
		artistName: getProperty(album, 'artist.name', 'ART_NAME')
	}
}

export function formatArtist(artist) {
	return {
		/* Artist */
		artistID: getProperty(artist, 'id', 'ART_ID'),
		artistName: getProperty(artist, 'name', 'ART_NAME'),
		artistPictureMedium:
			getProperty(artist, 'picture_medium') ||
			`https://e-cdns-images.dzcdn.net/images/artist/${artist.ART_PICTURE}/156x156-000000-80-0-0.jpg`,
		artistLink: getProperty(artist, 'link') || `https://deezer.com/artist/${artist.ART_ID}`,
		artistAlbumsNumber: getProperty(artist, 'nb_album', 'NB_FAN')
	}
}

export function formatPlaylist(playlist) {
	return {
		/* Playlist */
		playlistID: getProperty(playlist, 'id', 'PLAYLIST_ID'),
		playlistTitle: getProperty(playlist, 'title', 'TITLE'),
		playlistPictureMedium:
			getProperty(playlist, 'picture_medium') ||
			`https://e-cdns-images.dzcdn.net/images/${playlist.PICTURE_TYPE}/${
				playlist.PLAYLIST_PICTURE
			}/156x156-000000-80-0-0.jpg`,
		playlistLink: getProperty(playlist, 'link') || `https://deezer.com/playlist/${playlist.PLAYLIST_ID}`,
		playlistTracksNumber: getProperty(playlist, 'nb_tracks', 'NB_SONG'),

		/* Artist */
		artistName: getProperty(playlist, 'user.name')
	}
}
