const it = {
	globals: {
		welcome: 'Benvenuto su deemix',
		back: 'indietro',
		loading: 'caricamento',
		download: 'Scarica',
		by: 'di',
		listTabs: {
			all: 'tutto',
			album: 'album',
			artist: 'artista | artisti',
			single: 'singolo | singoli',
			title: 'titolo | titoli',
			track: 'traccia | tracce',
			playlist: 'playlist',
			releaseDate: 'data di rilascio',
			error: 'errore'
		}
	},
	charts: {
		title: 'Classifiche',
		changeCountry: 'Cambia Paese',
		download: 'Scarica Classifica'
	},
	errors: {
		title: 'Errori riguardanti'
	},
	favorites: {
		title: 'Preferiti',
		noPlaylists: 'Nessuna Playlist preferita trovata',
		noAlbums: 'Nessun Album preferito trovato',
		noArtists: 'Nessun Artista preferito trovato',
		noTracks: 'Nessuna Traccia preferito trovata'
	},
	home: {
		needTologin: 'Devi accedere al tuo account Deezer, fino a quel momento non potrai scaricare nulla.',
		openSettings: 'Apri le impostazioni',
		sections: {
			popularPlaylists: 'Playlyst Popolari',
			popularAlbums: 'Album più riprodotti'
		}
	},
	settings: {
		title: 'Impostazioni',
		languages: 'Lingue',
		login: {
			title: 'Login',
			loggedIn: 'Sei loggato come',
			arl: {
				question: 'Come ottengo il mio ARL?',
				update: 'Aggiorna ARL'
			},
			logout: 'Disconnettiti'
		},
		appearance: {
			title: 'Aspetto',
			slimDownloadTab: 'Tab dei download slim'
		},
		downloadPath: {
			title: 'Cartella di download'
		},
		templates: {
			title: 'Template',
			tracknameTemplate: 'Template nome traccia',
			albumTracknameTemplate: 'Template nome traccia negli Album',
			playlistTracknameTemplate: 'Template nome traccia nelle Playlist'
		},
		folders: {
			title: 'Cartelle',
			createPlaylistFolder: 'Crea cartelle per le Playlist',
			playlistNameTemplate: 'Template nome della cartella Playlist',
			createArtistFolder: 'Crea cartelle per gli Artisti',
			artistNameTemplate: 'Template nome della cartella Artista',
			createAlbumFolder: 'Crea cartelle per gli Album',
			albumNameTemplate: 'Template nome della cartella Album',
			createCDFolder: 'Crea cartelle per i CD',
			createStructurePlaylist: 'Crea la struttura di cartelle per le Playlist',
			createSingleFolder: 'Crea la struttura di cartelle per le traccie singole'
		},
		trackTitles: {
			title: 'Titoli tracce',
			padTracks: 'Aggiungi zeri ai numeri di traccia',
			paddingSize: 'Sovrascrivi il numero di zeri da aggiungere',
			illegalCharacterReplacer: 'Rimpiazza caratteri illegali con'
		},
		downloads: {
			title: 'Download',
			queueConcurrency: 'Download Concorrenti',
			maxBitrate: {
				title: 'Bitrate preferito',
				9: 'FLAC 1411kbps',
				3: 'MP3 320kbps',
				1: 'MP3 128kbps'
			},
			overwriteFile: {
				title: 'Dovrei sovrascrivere i file già scaricati?',
				y: 'Si, sovrascrivi i file',
				n: 'No, non sovrascrivere i file',
				t: 'Sovrascrivi solo i tag'
			},
			fallbackBitrate: 'Ripiega a bitrate più bassi',
			fallbackSearch: 'Ripiega alla ricerca',
			logErrors: 'Crea file di log per gli errori',
			logSearched: 'Crea file di log per le alternative',
			syncedLyrics: 'Crea il file .lyr (Testi Sincronizzati)',
			createM3U8File: 'Crea il file playlist',
			playlistFilenameTemplate: 'Template nome del file playlist',
			saveDownloadQueue: "Salva la coda di download quando chiudi l'app"
		},
		covers: {
			title: 'Copertine',
			saveArtwork: 'Salva copertina album',
			coverImageTemplate: 'Template nome copertina Album',
			saveArtworkArtist: 'Salva copertina artista',
			artistImageTemplate: 'Template nome copertina artista',
			localArtworkSize: 'Dimensioni copertine locali',
			embeddedArtworkSize: 'Dimensioni copertine incorporate',
			PNGcovers: 'Salva immagini come PNG',
			jpegImageQuality: 'Qualità immagine JPEG'
		},
		tags: {
			head: 'Quali tag salvare',
			title: 'Titolo',
			artist: 'Artista',
			album: 'Album',
			cover: 'Copertina',
			trackNumber: 'Numero Traccia',
			trackTotal: 'Traccie Totali',
			discNumber: 'Numero Disco',
			discTotal: 'Dischi Totali',
			albumArtist: "Artista dell'album",
			genre: 'Genere',
			year: 'Anno',
			date: 'Data',
			explicit: 'Testo Esplicito',
			isrc: 'ISRC',
			length: 'Durata Traccia',
			barcode: "Barcode dell'album (UPC)",
			bpm: 'BPM',
			replayGain: 'Guadagno Brano',
			label: 'Casa Discografica',
			lyrics: 'Testo non Sincronizzato',
			copyright: 'Copyright',
			composer: 'Compositori',
			involvedPeople: 'Persone Coinvolte'
		},
		other: {
			title: 'Altro',
			savePlaylistAsCompilation: 'Salva le playlist come Compilation',
			useNullSeparator: 'Usa il carattere NULL come separatore',
			saveID3v1: 'Salva anche il ID3v1',
			multitagSeparator: {
				title: 'Come vuoi separare gli artisti?',
				default: 'Usando la specificazione standard',
				andFeat: 'Usando & e feat.',
				using: 'Usando "{0}"'
			},
			albumVariousArtists: 'Lascia "Artisti Vari" negli artisti dell\'album',
			removeAlbumVersion: 'Rimuovi "Album Version" dal titolo del brano',
			removeDuplicateArtists: 'Rimuovi le combinazioni di artisti',
			dateFormat: {
				title: 'Formato della data per i file FLAC',
				year: 'AAAA',
				month: 'MM',
				day: 'GG'
			},
			featuredToTitle: {
				title: 'Cosa dovrei fare con i feat?',
				0: 'Niente',
				1: 'Rimuovili dal titolo',
				3: "Rimuovili dal titolo e dal nome dell'album",
				2: 'Spostali sul titolo'
			},
			titleCasing: 'Capitalizzazione Titoli',
			artistCasing: 'Capitalizzazione Artisti',
			casing: {
				nothing: 'Non cambiare',
				lower: 'TUTTO MAIUSCOLO',
				upper: 'tutto minuscolo',
				start: 'Prima Lettera Maiuscola',
				sentence: 'Come una frase'
			},
			previewVolume: 'Volume Anteprime',
			executeCommand: {
				title: 'Comando da eseguire dopo il download',
				description: 'Lascia vuoto per nessuna azione'
			}
		},
		spotify: {
			title: 'Spotify Features',
			clientID: 'Spotify clientID',
			clientSecret: 'Spotify Client Secret',
			username: 'Spotify username'
		},
		reset: 'Reimposta Default',
		save: 'Salva',
		toasts: {
			init: 'Impostazioni caricate!',
			update: 'Impostazioni aggiornate!',
			ARLcopied: 'ARL copiato negli appunti'
		}
	}
}

export default it
