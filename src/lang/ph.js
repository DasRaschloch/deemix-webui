const ph = {
	globals: {
		welcome: 'Welcome sa deemix',
		back: 'bumalik',
		loading: 'kumakarga',
		download: 'I-download {thing}',
		by: 'ayon sa {artist}',
		in: 'sa {album}',
		download_hint: 'I-download',
		play_hint: 'I-play',
		toggle_download_tab_hint: 'Palakihin/Paliitan',
		clean_queue_hint: 'Natapos na ang Pag-alis',
		cancel_queue_hint: 'Ikansel Lahat',
		open_downloads_folder: 'Buksan ang Polder ng Download',
		cut: 'i-cut',
		copy: 'kopyahin',
		copyLink: 'kopyahin ang link',
		copyImageLink: 'kopyahin ang imahe sa link',
		copyDeezerLink: 'kopyahin ang link ng deezer',
		paste: 'idikit',
		listTabs: {
			empty: '',
			all: 'lahat',
			top_result: 'nangungunang resulta',
			album: 'album | mga album',
			artist: 'artist | mga artist',
			single: 'single | mga single',
			title: 'pamagat | mga pamagat',
			track: 'track | mga track',
			trackN: '0 mga track | {n} track | {n} mga track',
			releaseN: '0 mga release | {n} release | {n} mga release',
			playlist: 'playlist | mga playlist',
			compile: 'pinagsama | mga pinagsama',
			ep: 'ep | mga ep',
			bundle: 'bundle | mga bundle',
			more: 'Iba pang mga album',
			featured: 'Ibinida sa',
			spotifyPlaylist: 'playlist sa spotify | mga playlist sa spotify',
			releaseDate: 'petsa ng paglabas',
			error: 'error'
		}
	},
	about: {
		updates: {
			currentVersion: 'Kasalukuyang version',
			versionNotAvailable: 'H/P',
			updateAvailable: `Hindi mo ginagamit ang pinakabagong version: {version}`,
			deemixVersion: 'deemix lib version'
		},
		titles: {
			usefulLinks: 'Nakatutulong na mga Link',
			bugReports: 'Report sa Bug',
			contributing: 'Pagtulong',
			donations: 'Mga donasiyon',
			license: 'Lisensiya'
		},
		subtitles: {
			bugReports: 'Meron bang hindi gumagana sa deemix? Ipaalam mo sa amin!',
			contributing: 'Gusto mo bang tumulong sa proyektong ito? Pwede mong gawin iyan sa maraming paraan!',
			donations: 'Gusto mo bang tumulong sa pamamagitan ng pera? Pwede kang magbigay ng donasiyon!'
		},
		usesLibrary:
			'Ang app na ito ay gumagamit ng library galing sa <strong>deemix</strong>, na kung saan ay pwede mong gamitin para gumawa ng sarili mong UI ng deemix.',
		thanks: `Salamat kay <strong>rtonno</strong>, <strong>uhwot</strong> at <strong>lollilol</strong> sa pagtulong sa akin para sa proyektong ito at kay <strong>BasCurtiz</strong> sa paggawa ng icon.`,
		upToDate: {
			text: `Huwag magpapahuli sa mga update patungkol dito sa pamamagitan ng pagsali sa {newsChannel} sa Telegram.`,
			newsChannel: 'news channel'
		},
		officialWebsite: 'Opisyal na Website',
		officialRepo: 'Opisyal na Library Repository',
		officialWebuiRepo: 'Opisyal na Repository ng WebUI',
		officialSubreddit: 'Opisyal na Subreddit',
		newsChannel: 'News Channel',
		questions: {
			text: `Kung may tanong ka o problema sa app, maghanap ka muna ng solusiyon sa {subreddit}. Ngayon, kung wala ka talagang mahanap ay pwede kang mag-post patungkol sa iyong isyu doon sa subreddit.`,
			subreddit: 'subreddit'
		},
		beforeReporting: `Bago ka magreport ng bug, siguraduhing pinakabagong version ang ginagamit mo at ang ire-report mo ay talagang bug at hindi dahil sa pagkakamali mo lang ng paggamit.`,
		beSure: `Siguraduhing nangyayari rin ang bug sa iba't ibang plataporma at tsaka <strong>HUWAG</strong> mo nang i-report ang bug kung ito ay naipa-alam na ng iba.`,
		duplicateReports: 'Isasara namin ang mga magkaparehong report sa bug, kaya alamin mo muna.',
		dontOpenIssues: `<strong>HUWAG</strong> kayong magbubukas ng isyu kung magtatanong lang kayo, meron tayong subreddit para diyan.`,
		newUI: {
			text: `Kung ikaw ay maraming alam sa python, subukan mong gumawa ng bagong UI gamit ng base library, o kaya ayusin ang mga bug sa library sa pamamagitan ng pag-pull ng request sa {repo}.`,
			repo: 'repo'
		},
		acceptFeatures: `Tumatangggap din ako ng mga feature, basta hindi komplikado, dahil diretso ko itong nilalagay sa app at hindi sa library.`,
		otherLanguages: `Kung ikaw ay maraming alam sa ibang programming language, maaari mo ring subukan i-port ang deemix sa iba't ibang programming language!`,
		understandingCode: `Kailangan mo ba ng tulong para maintindihan ang code? Bisitahin si RemixDev sa Telegram o sa Reddit.`,
		contributeWebUI: {
			text: `Kung may alam ka sa Vue.js (JavaScript), HTML o kaya CSS, maaari kang sumali at tumulong dito sa {webui}.`,
			webui: 'WebUI'
		},
		itsFree: `Lagi mong tandaang <strong>ang proyektong ito ay libre</strong> at <strong>suportuhanmuna ang minamahal ninyong mga artist</strong> bago ang mga developer.`,
		notObligated: `Huwag mong pilitin ang sarili para mag-donate, Naiintindihan ka namin!`,
		lincensedUnder: {
			text: `Ang aktibidad na ito ay lisensiyado sa {gpl3}.`,
			gpl3: 'GNU General Public License 3.0'
		}
	},
	charts: {
		title: 'Mga Chart',
		changeCountry: 'Palitan ang Country',
		download: 'I-download ang Chart'
	},
	errors: {
		title: 'Mga error sa {name}',
		ids: {
			invalidURL: 'Hindi makilala ang URL',
			unsupportedURL: 'Hindi pa suportado ang URL',
			ISRCnotOnDeezer: 'Ang Track ISRC ay hindi pwede sa Deezer',
			notYourPrivatePlaylist: 'Hindi pwedeng i-download ang mga pribadong playlist ng iba.',
			spotifyDisabled: 'Hindi mo nai-set nang tama ang Spotify Features.',
			trackNotOnDeezer: 'Hindi mahanap ang track sa Deezer!',
			albumNotOnDeezer: 'Hindi mahanap ang album sa Deezer!',
			notOnDeezer: 'Hindi available ang track sa Deezer!',
			notEncoded: 'Hindi pa nae-encode ang track!',
			notEncodedNoAlternative: 'Hindi pa nae-encode ang track at walang mahanap na iba!',
			wrongBitrate: 'Hindi mahanap ang track sa gusto mong bitrate.',
			wrongBitrateNoAlternative: 'Hindi mahanap ang track sa gusto mong bitrate at walang mahanap na iba!',
			no360RA: 'Hindi pwede ang track para sa Reality Audio 360.',
			notAvailable: 'Walang available na track sa server ng Deezer!',
			notAvailableNoAlternative: 'Walang available na track sa server ng Deezer at walang mahanap na iba!',
			noSpaceLeft: 'Wala nang natitirang space sa iyong device!'
		}
	},
	favorites: {
		title: 'Mga Paborito',
		noPlaylists: 'Walang makitang mga Playlist',
		noAlbums: 'Walang makitang mga Paboritong Album',
		noArtists: 'Walang makitang mga Paboritong Artist',
		noTracks: 'Walang makitang mga Paboritong Track'
	},
	home: {
		needTologin: 'Kailangan mong mag-log in sa iyong Deezer account bago ka makasimulang magdownload.',
		openSettings: 'Buksan ang Mga Setting',
		sections: {
			popularPlaylists: 'Mga sikat na playlist',
			popularAlbums: 'Pinakamaraming pinakikinggang mga album'
		}
	},
	linkAnalyzer: {
		info: 'Pwede gamitin ang section na ito para sa iba pang impormasyon patungkol sa link na gusto mong i-download.',
		useful:
			'Makatutulong ito kung meron kang gustong i-download na track na hindi available sa bansa mo at gusto mong malaman kung meron bang ganito kapag sa iba.',
		linkNotSupported: 'Hindi pa suportado ang link',
		linkNotSupportedYet: 'Mukhang hindi pa suportado itong link, iba na lang ang ilagay mo.',
		table: {
			id: 'ID',
			isrc: 'ISRC',
			upc: 'UPC',
			duration: 'Haba',
			diskNumber: 'Bilang ng Disk',
			trackNumber: 'Bilang ng Track',
			releaseDate: 'Petsa ng Release',
			bpm: 'BPM',
			label: 'Label',
			recordType: 'Uri ng Rekord',
			genres: 'Mga Genre',
			tracklist: 'Listahan ng Track'
		}
	},
	search: {
		startSearching: 'Simulang Maghanap!',
		description:
			'Pwede kang maghanap ng track, buong album, artist, playlist.... kahit ano! Pwede ka ring mag-paste dito ng link na galing sa Deezer',
		fans: '{n} mga fan',
		noResults: 'Walang resulta',
		noResultsTrack: 'Walang mahanap na mga Track',
		noResultsAlbum: 'Walang mahanap na mga Album',
		noResultsArtist: 'Walang mahanap na mga Artist',
		noResultsPlaylist: 'Walang mahanap na mga Playlist'
	},
	searchbar: 'Maghanap ka ng gusto mo (o mag-paste ka ng link)',
	downloads: 'mga download',
	toasts: {
		restoringQueue: 'Binabalik ang download queue...',
		queueRestored: 'Naibalik na ang download queue!',
		addedToQueue: '{item} ay naidagdag sa queue',
		addedMoreToQueue: '{n} naidagdag rin sa queue',
		alreadyInQueue: '{item} ay meron na sa queue!',
		finishDownload: '{item} ay natapos nang i-download.',
		allDownloaded: 'Nadownload na lahat!',
		refreshFavs: 'Narefresh na!',
		loggingIn: 'Nagla-log in...',
		loggedIn: 'Na-login na',
		alreadyLogged: 'Nakalogin ka na',
		loginFailed: 'Hindi maka-log in',
		loggedOut: 'Na-logout na',
		cancellingCurrentItem: 'Kinakansel ang item.',
		currentItemCancelled: 'Nakansel na ang item.',
		startAddingArtist: 'Idinadagdag si {artist} sa queue ng mga album',
		finishAddingArtist: 'Naidagdag na si {artist} sa queue ng mga album',
		startConvertingSpotifyPlaylist: 'Kino-convert ang mga track sa spotify papuntang Deezer',
		finishConvertingSpotifyPlaylist: 'Naconvert na ang playlist sa Spotify',
		loginNeededToDownload: 'Kailangan mong mag-login para madownload ang mga track!',
		deezerNotAvailable: 'Hindi available ang Deezer sa iyong bansa. Kailangan mong gumamit ng VPN.'
	},
	settings: {
		title: 'Mga Setting',
		languages: 'Mga Wika',
		login: {
			title: 'Login',
			loggedIn: 'Ikaw ay naka-login sa pangalang {username}',
			arl: {
				question: 'Paano ako makakuha ng sariling ARL?',
				update: 'I-update ang ARL'
			},
			logout: 'Logout',
			login: 'Mag-login gamit ng deezer.com'
		},
		appearance: {
			title: 'Hitsura',
			slimDownloadTab: 'Pinaliit na download tab'
		},
		downloadPath: {
			title: 'Paglalagyan ng Download'
		},
		templates: {
			title: 'Mga Template',
			tracknameTemplate: 'Template sa pangalan ng Track',
			albumTracknameTemplate: 'Template sa track ng Album',
			playlistTracknameTemplate: 'Template sa track ng Playlist'
		},
		folders: {
			title: 'Mga Folder',
			createPlaylistFolder: 'Gumawa ng folder para sa mga playlist',
			playlistNameTemplate: 'Template sa folder ng Playlist',
			createArtistFolder: 'Gumawa ng folder para sa artist',
			artistNameTemplate: 'Template sa folder ng Artist',
			createAlbumFolder: 'Gumawa ng folder para sa album',
			albumNameTemplate: 'Template sa folder ng Album',
			createCDFolder: 'Gumawa ng folder para sa mga CD',
			createStructurePlaylist: 'Gumawa ng istraktura ng folder para sa mga playlist',
			createSingleFolder: 'Gumawa ng istraktura ng folder para sa mga single'
		},
		trackTitles: {
			title: 'Pamagat sa mga track',
			padTracks: 'Mga track ng Pad',
			paddingSize: 'Patungan ang laki ng padding',
			illegalCharacterReplacer: 'Pamalit sa ilegal na Karakter'
		},
		downloads: {
			title: 'Mga Download',
			queueConcurrency: 'Mga Kasabay na Download',
			maxBitrate: {
				title: 'Gustong Bitrate',
				9: 'FLAC 1411kbps',
				3: 'MP3 320kbps',
				1: 'MP3 128kbps'
			},
			overwriteFile: {
				title: 'Papatungan ko ba ang file?',
				y: 'Oo, patungan mo ang file',
				n: 'Hindi, huwag mong patungan ang file',
				t: 'Patungan mo lang ang mga tag',
				b: 'Hindi, hayaan mo silang dalawa at lagyan mo lang ng numero sa kapareho niya',
				e: 'Hindi, at huwag mong tignan ang mga extension'
			},
			fallbackBitrate: 'Binabaang bitrate',
			fallbackSearch: 'Maghanap para sa binabaan',
			logErrors: 'Gumawa ng log file para sa mga error',
			logSearched: 'Gumawa ng log file para sa mga hinanap na track',
			createM3U8File: 'Gumawa ng file sa playlist',
			syncedLyrics: 'Gumawa ng mga .lyr file (Mga Sync Lyric)',
			playlistFilenameTemplate: 'Template sa pangalan ng Playlist file',
			saveDownloadQueue: 'I-save ang download queue kapag isasara the app'
		},
		covers: {
			title: 'Mga cover ng album',
			saveArtwork: 'I-save ang mga Cover',
			coverImageTemplate: 'Template ng pangalan ng cover',
			saveArtworkArtist: 'I-save ang imahe ng artist',
			artistImageTemplate: 'Template ng imahe ng artist',
			localArtworkSize: 'Laki ng lokal na artwork',
			embeddedArtworkSize: 'Laki ng Nakadikit na artwork',
			localArtworkFormat: {
				title: 'Anong gusto mong format para sa mga lokal na artwork?',
				jpg: 'jpeg na imahe',
				png: 'png na imahe',
				both: 'Parehong jpeg at png'
			},
			jpegImageQuality: 'Kalidad ng JPEG na imahe',
			embeddedArtworkPNG: 'I-save ang nakadikit na artwork bilang PNG',
			embeddedPNGWarning: 'Ang mga PNG ay hindi opisyal na suportado ng Deezer at maaaring magkaroon ng bug',
			imageSizeWarning:
				'Lahat ng mas mataas sa x1200 ay hindi opisyal na ginagamit sa Deezer, at posibleng magkaroon ng isyu',
			coverDescriptionUTF8: 'I-save ang deskripsyon ng cover gamit ng UTF8 (iTunes Cover Fix)'
		},
		tags: {
			head: 'Aling tag ang ise-save',
			title: 'Pamagat',
			artist: 'Artist',
			album: 'Album',
			cover: 'Cover',
			trackNumber: 'Bilang ng Track',
			trackTotal: 'Kabuuang Track',
			discNumber: 'Bilang ng Disk',
			discTotal: 'Kabuuang Disk',
			albumArtist: 'Album Artist',
			genre: 'Genre',
			year: 'Taon',
			date: 'Petsa',
			explicit: 'Mga Explicit na Lyric',
			isrc: 'ISRC',
			length: 'Haba ng Track',
			barcode: 'Barcode ng Album (UPC)',
			bpm: 'BPM',
			replayGain: 'Replay Gain',
			label: 'Label ng Album',
			lyrics: 'Unsynchronized na mga Lyric',
			syncedLyrics: 'Synchronized na mga Lyric',
			copyright: 'Karapatang Ari',
			composer: 'Komposer',
			involvedPeople: 'Mga Kasamang Tao'
		},
		other: {
			title: 'Iba pa',
			savePlaylistAsCompilation: 'I-save ang mga playlist bilang compilation',
			useNullSeparator: 'Gumamit ng panghiwalay sa null',
			saveID3v1: 'I-save rin ang ID3v1',
			multiArtistSeparator: {
				title: 'Anong gusto mo para maihanay mga artist?',
				nothing: 'I-save lang ang pangunahing artist',
				default: 'Gamit ng standard na specification',
				andFeat: 'Gamit ng & at feat.',
				using: 'Gamit ng "{separator}"'
			},
			singleAlbumArtist: 'I-save lang ang pangunahing album ng artist',
			albumVariousArtists: 'Isama ang  "Various Artists" sa mga Album Artist',
			removeAlbumVersion: 'Tanggalin ang "Album Version" sa pamagat ng track',
			removeDuplicateArtists: 'Tanggalin ang kombinasyon ng mga artist',
			dateFormat: {
				title: 'Format ng petsa para sa mga FLAC file',
				year: 'YYYY',
				month: 'MM',
				day: 'DD'
			},
			featuredToTitle: {
				title: 'Anong gagawin ko sa mga itinampok na artist',
				0: 'Wala',
				1: 'Tanggalin mo sila sa Pamagat',
				3: 'Tanggalin mo sila sa Pamagat mismo at Pamagat ng Album',
				2: 'Ilipat mo sila sa pamagat'
			},
			titleCasing: 'Pagleletra sa Pamagat',
			artistCasing: 'Pagleletra sa Artist',
			casing: {
				nothing: 'Walang babaguhin',
				lower: 'maliliit',
				upper: 'MALALAKI',
				start: 'Simula Ng Bawata Salita',
				sentence: 'Kagaya ng pangungusap'
			},
			previewVolume: 'Volume ng Preview',
			executeCommand: {
				title: 'Mga gagawin pagkatapos ng download',
				description: 'Hayaan lang na blangko kung wala'
			}
		},
		spotify: {
			title: 'Spotify Features',
			clientID: 'Spotify ClientID',
			clientSecret: 'Spotify Client Secret',
			username: 'Spotify Username',
			question: 'Paano ma-enable ang Spotify Features?'
		},
		reset: 'Ibalik sa Dati',
		save: 'I-save',
		toasts: {
			init: 'Ikinarga ang mga Setting!',
			update: 'In-update ang mga Setting!',
			ARLcopied: 'Kinopya ang ARL sa clipboard'
		}
	},
	sidebar: {
		home: 'tahanan',
		search: 'maghanap',
		charts: 'mga chart',
		favorites: 'mga paborito',
		linkAnalyzer: 'tagasuri ng link',
		settings: 'mga setting',
		about: 'tungkol sa'
	},
	tracklist: {
		downloadSelection: 'Pagpipili ng download'
	}
}

export default ph
