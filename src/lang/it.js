const it = {
	globals: {
		welcome: 'Benvenuto su deemix',
		back: 'indietro',
		loading: 'caricamento',
		download: 'Scarica {0}',
		by: 'di {0}',
		in: 'in {0}',
		download_hint: 'Scarica',
		play_hint: 'Play',
		toggle_download_tab_hint: 'Expand/Collapse',
		clean_queue_hint: 'Clear Finished',
		cancel_queue_hint: 'Cancel All',
		listTabs: {
			all: 'tutto',
			top_result: 'miglior risultato',
			album: 'album',
			artist: 'artista | artisti',
			single: 'singolo | singoli',
			title: 'titolo | titoli',
			track: 'brano | brani',
			trackN: '0 brani | {n} brano | {n} brani',
			releaseN: '0 dischi | {n} disco | {n} dischi',
			playlist: 'playlist',
			compile: 'compilation',
			ep: 'ep',
			spotifyPlaylist: 'playlist spotify',
			releaseDate: 'data di uscita',
			error: 'errore',
			empty: ''
		}
	},
	charts: {
		title: 'Classifiche',
		changeCountry: 'Cambia Paese',
		download: 'Scarica Classifica'
	},
	errors: {
		title: 'Errori riguardanti {0}',
		ids: {
			invalidURL: 'URL non riconosciuto',
			unsupportedURL: 'URL non ancora supportato',
			ISRCnotOnDeezer: 'Questo ISRC non è disponibile su Deezer',
			notYourPrivatePlaylist: 'Non puoi scaricare le playlist private degli altri.',
			spotifyDisabled: 'Spotify Features non è impostato correttamente.',
			trackNotOnDeezer: 'Brano non trovato su Deezer!',
			albumNotOnDeezer: 'Album non trovato su Deezer!',
			notOnDeezer: 'Brano non disponibile su Deezer!',
			notEncoded: 'Brano non ancora codificato!',
			notEncodedNoAlternative: 'Brano non ancora codificato e nessuna alternativa trovata!',
			wrongBitrate: 'Brano non trovato con il bitrate specificato.',
			wrongBitrateNoAlternative: 'Brano non trovato con il bitrate specificato e nessuna alternativa trovata!',
			no360RA: 'Brano non disponibile in Reality Audio 360.',
			notAvailable: 'Brano non presente sui server di Deezer!',
			notAvailableNoAlternative: 'Brano non presente sui server di Deezer e nessuna alternativa trovata!'
		}
	},
	favorites: {
		title: 'Preferiti',
		noPlaylists: 'Nessuna Playlist preferita trovata',
		noAlbums: 'Nessun Album preferito trovato',
		noArtists: 'Nessun Artista preferito trovato',
		noTracks: 'Nessun Brano preferito trovato'
	},
	home: {
		needTologin: 'Devi accedere al tuo account Deezer, fino a quel momento non potrai scaricare nulla.',
		openSettings: 'Apri le impostazioni',
		sections: {
			popularPlaylists: 'Playlyst Popolari',
			popularAlbums: 'Album più riprodotti'
		}
	},
	linkAnalyzer: {
		info:
			'Puoi utilizzare questa sezione per avere più informazioni riguardanti il link che stai cercando di scaricare.',
		useful:
			'Ciò può esserti utile se stai cercando di scaricare brani che non sono disponibili nel tuo Paese e vuoi sapere in quale Paese sono invece disponibili, per esempio.',
		linkNotSupported: 'Questo link non è ancora supportato',
		linkNotSupportedYet: 'Sembra che questo link non sia ancora supportato, prova ad analizzarne un altro.',
		table: {
			id: 'ID',
			isrc: 'ISRC',
			upc: 'UPC',
			duration: 'Durata',
			diskNumber: 'Numero Disco',
			trackNumber: 'Numero Traccia',
			releaseDate: 'Data di uscita',
			bpm: 'BPM',
			label: 'Etichetta',
			recordType: 'Tipologia di registrazione',
			genres: 'Generi',
			tracklist: 'Lista tracce'
		}
	},
	search: {
		startSearching: 'Inizia a cercare!',
		description:
			'Puoi cercare un brano, un intero album, un artista, una playlist.... quello che vuoi! Puoi anche incollare un link di Deezer',
		fans: '{0} fan',
		noResults: 'Nessun risultato',
		noResultsTrack: 'Nessun brano trovato',
		noResultsAlbum: 'Nessun album trovato',
		noResultsArtist: 'Nessun artista trovato',
		noResultsPlaylist: 'Nessuna playlist trovata'
	},
	searchbar: 'Cerca qualsiasi cosa (o incolla semplicemente un link)',
	downloads: 'download',
	toasts: {
		addedToQueue: '{0} aggiunto alla coda',
		alreadyInQueue: '{0} è già nella coda!',
		finishDownload: '{0} ha finito di scaricarsi.',
		allDownloaded: 'Tutti i download completati!',
		refreshFavs: 'Preferiti ricaricati!',
		loggingIn: 'Effettuando il login',
		loggedIn: 'Login effettuato',
		alreadyLogged: 'Sei già loggato',
		loginFailed: 'Impossibile loggarsi',
		loggedOut: 'Disconnesso',
		cancellingCurrentItem: 'Cancellando download corrente.',
		currentItemCancelled: 'Download corrente cancellato.',
		startAddingArtist: 'Aggiungendo gli album di {0} alla coda',
		finishAddingArtist: 'Aggiunto gli album di {0} alla coda',
		startConvertingSpotifyPlaylist: 'Convertendo i brani da spotify a deezer',
		finishConvertingSpotifyPlaylist: 'Playlist di spotify convertita'
	},
	settings: {
		title: 'Impostazioni',
		languages: 'Lingue',
		login: {
			title: 'Login',
			loggedIn: 'Sei loggato come {username}',
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
			tracknameTemplate: 'Template nome brano',
			albumTracknameTemplate: 'Template nome brano negli Album',
			playlistTracknameTemplate: 'Template nome brano nelle Playlist'
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
			createSingleFolder: 'Crea la struttura di cartelle per i brani singoli'
		},
		trackTitles: {
			title: 'Titoli brani',
			padTracks: 'Aggiungi zeri ai numeri di traccia',
			paddingSize: 'Sovrascrivi il numero di zeri da aggiungere',
			illegalCharacterReplacer: 'Rimpiazza caratteri illegali con'
		},
		downloads: {
			title: 'Download',
			queueConcurrency: 'Download simultanei',
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
			fallbackBitrate: 'Utilizza bitrate più bassi se il bitrate preferito non è disponibile',
			fallbackSearch: 'Cerca il brano se il link originale non è disponibile',
			logErrors: 'Crea file di log per gli errori',
			logSearched: 'Crea file di log per le alternative cercate',
			syncedLyrics: 'Crea i file .lyr (Testi Sincronizzati)',
			createM3U8File: 'Crea i file playlist',
			playlistFilenameTemplate: 'Template nome del file playlist',
			saveDownloadQueue: "Salva la coda di download quando chiudi l'app"
		},
		covers: {
			title: 'Copertine',
			saveArtwork: 'Salva copertina album',
			coverImageTemplate: 'Template nome copertina album',
			saveArtworkArtist: 'Salva copertina artista',
			artistImageTemplate: 'Template nome copertina artista',
			localArtworkSize: 'Dimensioni copertine locali',
			embeddedArtworkSize: 'Dimensioni copertine incorporate',
			localArtworkFormat: {
				title: 'Come vuoi salvare le copertine locali?',
				jpg: 'In jpeg',
				png: 'In png',
				both: 'Sia in jpeg che in png'
			},
			jpegImageQuality: 'Qualità immagine JPEG'
		},
		tags: {
			head: 'Quali tag salvare',
			title: 'Titolo',
			artist: 'Artista',
			album: 'Album',
			cover: 'Copertina',
			trackNumber: 'Numero Traccia',
			trackTotal: 'Tracce Totali',
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
			replayGain: 'Replay gain',
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
			saveID3v1: 'Salva anche l\'ID3v1',
			multiArtistSeparator: {
				title: 'Come vuoi separare gli artisti?',
				nothing: "Salva solo l'artista principale",
				default: 'Usando la specificazione standard',
				andFeat: 'Usando & e feat.',
				using: 'Usando "{0}"'
			},
			singleAlbumArtist: "Salva solo l'artista dell'album principale",
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
			titleCasing: 'Formato testo dei titoli',
			artistCasing: 'Formato testo degli artisti',
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
	},
	sidebar: {
		home: 'home',
		search: 'ricerca',
		charts: 'classifiche',
		favorites: 'preferiti',
		linkAnalyzer: 'analizza link',
		settings: 'impostazioni',
		about: 'info'
	},
	tracklist: {
		downloadSelection: 'Scarica selezionati'
	}
}

export default it
