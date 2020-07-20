const en = {
	globals: {
		welcome: 'Welcome to deemix',
		back: 'back',
		loading: 'loading',
		download: 'Download {0}',
		by: 'by {0}',
		in: 'in {0}',
		listTabs: {
			empty: '',
			all: 'all',
			album: 'album | albums',
			artist: 'artist | artists',
			single: 'single | singles',
			title: 'title | titles',
			track: 'track | tracks',
			trackN: '0 tracks | {n} track | {n} tracks',
			playlist: 'playlist | playlists',
			compile: 'compilation | compilations',
			ep: 'ep | eps',
			spotifyPlaylist: 'spotify playlist | spotify playlists',
			releaseDate: 'release date',
			error: 'error'
		}
	},
	charts: {
		title: 'Charts',
		changeCountry: 'Change Country',
		download: 'Download Chart'
	},
	errors: {
		title: 'Errors for'
	},
	favorites: {
		title: 'Favorites',
		noPlaylists: 'No Playlists found',
		noAlbums: 'No Favorite Albums found',
		noArtists: 'No Favorite Artists found',
		noTracks: 'No Favorite Tracks found'
	},
	home: {
		needTologin: 'You need to log into your Deezer account before you can start downloading.',
		openSettings: 'Open Settings',
		sections: {
			popularPlaylists: 'Popular playlists',
			popularAlbums: 'Most streamed albums'
		}
	},
	linkAnalyzer: {
		info: 'You can use this section to find out more information about the link you are trying to download.',
		useful:
			"This is useful if you're trying to download some tracks that are not available in your country and want to know where they are available, for instance.",
		linkNotSupported: 'This link is not yet supported',
		linkNotSupportedYet: 'Seems like this link is not yet supported, try analyzing another one.',
		table: {
			id: 'ID',
			isrc: 'ISRC',
			upc: 'UPC',
			duration: 'Duration',
			diskNumber: 'Disk Number',
			trackNumber: 'Track Number',
			releaseDate: 'Release Date',
			bpm: 'BPM',
			label: 'Label',
			recordType: 'Record Type',
			genres: 'Genres',
			tracklist: 'Tracklist'
		}
	},
	search: {
		startSearching: 'Start searching!',
		description:
			'You can search a track, a whole album, an artist, a playlist.... everything! You can also paste a Deezer link'
	},
	searchbar: 'Search anything you want (or just paste a link)',
	settings: {
		title: 'Settings',
		languages: 'Languages',
		login: {
			title: 'Login',
			loggedIn: 'You are logged in as {username}',
			arl: {
				question: 'How do I get my own ARL?',
				update: 'Update ARL'
			},
			logout: 'Logout'
		},
		appearance: {
			title: 'Appearance',
			slimDownloadTab: 'Slim download tab'
		},
		downloadPath: {
			title: 'Download Path'
		},
		templates: {
			title: 'Templates',
			tracknameTemplate: 'Trackname template',
			albumTracknameTemplate: 'Album track template',
			playlistTracknameTemplate: 'Playlist track template'
		},
		folders: {
			title: 'Folders',
			createPlaylistFolder: 'Create folder for playlists',
			playlistNameTemplate: 'Playlist folder template',
			createArtistFolder: 'Create folder for artist',
			artistNameTemplate: 'Artist folder template',
			createAlbumFolder: 'Create folder for album',
			albumNameTemplate: 'Album folder template',
			createCDFolder: 'Create folder for CDs',
			createStructurePlaylist: 'Create folder structure for playlists',
			createSingleFolder: 'Create folder structure for singles'
		},
		trackTitles: {
			title: 'Track titles',
			padTracks: 'Pad tracks',
			paddingSize: 'Overwrite padding size',
			illegalCharacterReplacer: 'Illegal Character replacer'
		},
		downloads: {
			title: 'Downloads',
			queueConcurrency: 'Concurrent Downloads',
			maxBitrate: {
				title: 'Preferred Bitrate',
				9: 'FLAC 1411kbps',
				3: 'MP3 320kbps',
				1: 'MP3 128kbps'
			},
			overwriteFile: {
				title: 'Should I overwrite the files?',
				y: 'Yes, overwrite the file',
				n: "No, don't overwrite the file",
				t: 'Overwrite only the tags'
			},
			fallbackBitrate: 'Bitrate fallback',
			fallbackSearch: 'Search fallback',
			logErrors: 'Create log files for errors',
			logSearched: 'Create log files for searched tracks',
			createM3U8File: 'Create playlist file',
			syncedLyrics: 'Create .lyr files (Sync Lyrics)',
			playlistFilenameTemplate: 'Playlist filename template',
			saveDownloadQueue: 'Save download queue when closing the app'
		},
		covers: {
			title: 'Album covers',
			saveArtwork: 'Save Covers',
			coverImageTemplate: 'Cover name template',
			saveArtworkArtist: 'Save artist image',
			artistImageTemplate: 'Artist image template',
			localArtworkSize: 'Local artwork size',
			embeddedArtworkSize: 'Embedded artwork size',
			localArtworkFormat: {
				title: 'What format do you want the local artwork to be?',
				jpg: 'A jpeg image',
				png: 'A png image',
				both: 'Both a jpeg and a png'
			},
			jpegImageQuality: 'JPEG image quality'
		},
		tags: {
			head: 'Which tags to save',
			title: 'Title',
			artist: 'Artist',
			album: 'Album',
			cover: 'Cover',
			trackNumber: 'Track Number',
			trackTotal: 'Track Total',
			discNumber: 'Disc Number',
			discTotal: 'Disc Total',
			albumArtist: 'Album Artist',
			genre: 'Genre',
			year: 'Year',
			date: 'Date',
			explicit: 'Explicit Lyrics',
			isrc: 'ISRC',
			length: 'Track Length',
			barcode: 'Album Barcode (UPC)',
			bpm: 'BPM',
			replayGain: 'Replay Gain',
			label: 'Album Label',
			lyrics: 'Unsynchronized Lyrics',
			copyright: 'Copyright',
			composer: 'Composer',
			involvedPeople: 'Involved People'
		},
		other: {
			title: 'Other',
			savePlaylistAsCompilation: 'Save playlists as compilation',
			useNullSeparator: 'Use null separator',
			saveID3v1: 'Save ID3v1 as well',
			multiArtistSeparator: {
				title: 'How would you like to separate your artists?',
				nothing: 'Save only the main artist',
				default: 'Using standard specification',
				andFeat: 'Using & and feat.',
				using: 'Using "{0}"'
			},
			singleAlbumArtist: 'Save only the main album artist',
			albumVariousArtists: 'Keep "Various Artists" in the Album Artists',
			removeAlbumVersion: 'Remove "Album Version" from track title',
			removeDuplicateArtists: 'Remove combinations of artists',
			dateFormat: {
				title: 'Date format for FLAC files',
				year: 'YYYY',
				month: 'MM',
				day: 'DD'
			},
			featuredToTitle: {
				title: 'What should I do with featured artists?',
				0: 'Nothing',
				1: 'Remove it from the title',
				3: 'Remove it from the title and the album title',
				2: 'Move it to the title'
			},
			titleCasing: 'Title casing',
			artistCasing: 'Artist casing',
			casing: {
				nothing: 'Keep unchanged',
				lower: 'lowercase',
				upper: 'UPPERCASE',
				start: 'Start Of Each Word',
				sentence: 'Like a sentence'
			},
			previewVolume: 'Preview Volume',
			executeCommand: {
				title: 'Command to execute after download',
				description: 'Leave blank for no action'
			}
		},
		spotify: {
			title: 'Spotify Features',
			clientID: 'Spotify clientID',
			clientSecret: 'Spotify Client Secret',
			username: 'Spotify username'
		},
		reset: 'Reset to Default',
		save: 'Save',
		toasts: {
			init: 'Settings loaded!',
			update: 'Settings updated!',
			ARLcopied: 'ARL copied to clipboard'
		}
	},
	sidebar: {
		home: 'home',
		search: 'search',
		charts: 'charts',
		favorites: 'favorites',
		linkAnalyzer: 'link analyzer',
		settings: 'settings',
		about: 'about'
	},
	tracklist: {
		downloadSelection: 'Download selection'
	}
}

export default en
