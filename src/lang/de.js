const de = {
	globals: {
		welcome: 'Willkommen bei deemix',
		back: 'zurück',
		loading: 'lädt',
		download: 'Download {0}',
		by: 'um {0}',
		in: 'in {0}',
		download_hint: 'Download',
		play_hint: 'Abspielen',
		toggle_download_tab_hint: 'Einblenden/Ausblenden',
		clean_queue_hint: 'Fertige löschen',
		cancel_queue_hint: 'Alle abbrechen',
		listTabs: {
			empty: '',
			all: 'alle',
			top_result: 'top-ergebnis',
			album: 'album | alben',
			artist: 'künstler | künstler',
			single: 'single | singles',
			title: 'titel | titel',
			track: 'track | tracks',
			trackN: '0 tracks | {n} track | {n} tracks',
			releaseN: '0 veröffentlichungen | {n} veröffentlichung | {n} veröffentlichungen',
			playlist: 'playlist | playlisten',
			compile: 'compilation | compilations',
			ep: 'ep | eps',
			spotifyPlaylist: 'spotify playlist | spotify playlists',
			releaseDate: 'veröffentlichungsdatum',
			error: 'fehler'
		}
	},
	about: {
		titles: {
			usefulLinks: 'Hilfreiche Links',
			bugReports: 'Fehlerberichte',
			contributing: 'Mitwirkende',
			donations: 'Spenden',
			license: 'Lizenz'
		},
		subtitles: {
			bugReports: "Gibt es etwas, das im Deemix nicht funktioniert? Teil es uns mit!",
			contributing: 'du möchtest zu diesem Projekt beitragen? Das kannst du auf verschiedene Weise tun!',
			donations: 'du möchtest einen monetären Beitrag leisten? Gib uns eine Spende!'
		},
		usesLibrary: 'Diese App verwendet die <strong>deemix</strong> Bibliothek, die du verwenden kannst, um Deine eigene UI für Deemix zu erstellen.',
		thanks: `Danke an <strong>rtonno</strong>, <strong>uhwot</strong> und <strong>lollilol</strong> für die Hilfe bei diesem Projekt und an <strong>BasCurtiz</strong> und <strong>scarvimane</strong> für das Design der Icons.`,
		upToDate: `Bleibe mit den Aktualisierungen auf dem Laufenden, indem du dem <a href="https://t.me/RemixDevNews" target="_blank">Nachrichtenkanal</a> auf Telegram folgst.`,
		officialWebsite: 'Offizielle Webseite',
		officialRepo: 'Offizielle Library Repository',
		officialWebuiRepo: 'Offizielle WebUI Repository',
		officialSubreddit: 'Offizieller Subreddit',
		newsChannel: 'News Kanal',
		questions: `Wenn du Fragen oder Probleme mit der App hast, suche zuerst nach einer Lösung im <a href="https://www.reddit.com/r/deemix" target="_blank">subreddit</a>. Wenn du dann nichts findest, kannst du einen Beitrag mit Deinem Thema auf dem subreddit verfassen.`,
		beforeReporting: `Bevor du einen Fehler meldest, stelle sicher, dass du die neueste Version der App benutzt und dass das, was du melden möchtest, tatsächlich ein Fehler ist und nicht etwas, das nur auf deiner Seite falsch ist.`,
		beSure: `Vergewissere dich, dass der Fehler auf einem anderen Rechner reproduzierbar ist und auch <stark>DO NOT</stark> melde einen Fehler, wenn er bereits gemeldet wurde.`,
		duplicateReports: 'Doppelte Fehlerberichte werden geschlossen, also behalte das im Auge.',
		dontOpenIssues: `Erstelle <strong>KEINE</strong> Einträge, um Fragen zu stellen, dafür gibt es einen Unterpunkt.`,
		newUI: `Wenn du dich mit Python auskennst, könntest du versuchen, ein neues UI für die Anwendung zu erstellen, indem du die Basisbibliothek benutzt, oder Fehler in der Bibliothek mit einer Pull-Anfrage auf der <a href="https://codeberg.org/RemixDev/deemix" target="_blank">Repo</a> behebst.`,
		acceptFeatures: `Ich akzeptiere auch Features, aber keine komplexen Dinge, da sie direkt in der App und nicht in der Bibliothek implementiert werden können.`,
		otherLanguages: `Wenn du eine andere Programmiersprache fließend beherrschst, könntest du versuchen, deemix in andere Programmiersprachen zu portieren!`,
		understandingCode: `Sie benötigen Hilfe beim Verständnis des Codes? Drücken Sie einfach RemixDev auf Telegram oder Reddit.`,
		contributeWebUI: `Wenn du Vue.js (JavaScript), HTML oder CSS kennst, könntest du zum <a href="https://codeberg.org/RemixDev/deemix-webui" target="_blank">WebUI</a> beitragen.`,
		itsFree: `Du solltest daran denken, dass dies ist ein <strong>freies Projekt</strong> ist und <strong>Du solltest die Künstler, die du liebst, unterstützen<strong>, bevor du die Entwickler unterstützt.`,
		notObligated: `Fühle dich nicht verpflichtet zu spenden, wir schätzen deinen Beitrag trotzdem!`,
		lincensedunder: `Diese Arbeit ist lizensiert unter einer
			<a rel="license" href="https://www.gnu.org/licenses/gpl-3.0.en.html" target="_blank"
				>GNU General Public License 3.0</a
			>.`
	},
	charts: {
		title: 'Charts',
		changeCountry: 'Land ändern',
		download: 'Charts herunterladen'
	},
	errors: {
		title: 'Fehler für {0}',
		ids: {
			invaliduRL: 'URL nicht erkannt',
			unsupporteduRL: 'URL noch nicht unterstützt',
			ISRCnotOnDeezer: 'Titel ISRC ist auf deezer nicht verfügbar',
			notYourPrivatePlaylist: "Du kannst keine privaten Playlisten anderer herunterladen.",
			spotifyDisabled: 'Spotify Features sind nicht korrekt eingerichtet.',
			trackNotOnDeezer: 'Titel auf der Deezer nicht gefunden!',
			albumNotOnDeezer: 'Album auf der Deezer nicht gefunden!',
			notOnDeezer: 'Titel bei Deezer nicht verfügbar!',
			notEncoded: 'Titel noch nicht kodiert!',
			notEncodedNoAlternative: 'Titel noch nicht kodiert und keine Alternative gefunden!',
			wrongBitrate: 'Titel mit der gewünschten Bitrate nicht gefunden.',
			wrongBitrateNoAlternative: 'Titel mit der gewünschten Bitrate nicht gefunden und keine Alternative gefunden!',
			no360RA: 'Der Titel ist im Reality Audio 360 Format nicht verfügbar.',
			notAvailable: "Titel auf den Servern von deezer nicht verfügbar!",
			notAvailableNoAlternative: "Titel auf den Servern von deezer nicht verfügbar und keine Alternative gefunden!"
		}
	},
	favorites: {
		title: 'Favoriten',
		noPlaylists: 'Keine Playlisten gefunden',
		noAlbums: 'Keine Album-Favoriten gefunden',
		noArtists: 'Keine Künstler-Favoriten gefunden',
		noTracks: 'Keine Titel-Favoriten gefunden'
	},
	home: {
		needTologin: 'Du musst dich in dein Deezer-Konto einloggen, bevor du mit dem Download beginnen kannst.',
		openSettings: 'Einstellungen öffnen',
		sections: {
			popularPlaylists: 'Beliebte Playlisten',
			popularAlbums: 'Meist gestreamte Alben'
		}
	},
	linkAnalyzer: {
		info: 'In dieser Sektion findest du weitere Informationen über den Link, den du versuchst herunterzuladen.',
		useful:
			"Dies ist nützlich, wenn du versuchst, einige Titel herunterzuladen, die in deinem Land nicht verfügbar sind, und du zum Beispiel wissen willst, wo sie verfügbar sind.",
		linkNotSupported: 'Dieser Link wird noch nicht unterstützt',
		linkNotSupportedYet: 'Es scheint, als ob dieser Link noch nicht unterstützt wird, versuche einen anderen zu analysieren.',
		table: {
			id: 'ID',
			isrc: 'ISRC',
			upc: 'UPC',
			duration: 'Länge',
			diskNumber: 'Disk Nummer',
			trackNumber: 'Titel Nummer',
			releaseDate: 'Veröffentlichungsdatum',
			bpm: 'BPM',
			label: 'Musiklabel',
			recordType: 'Record Typ',
			genres: 'Genres',
			tracklist: 'Tracklist'
		}
	},
	search: {
		startSearching: 'Suche starten!',
		description:
			'Du kannst einen Track suchen, ein ganzes Album, einen Künstler, eine Playlist.... alles! Du kannst auch einen Deezer-Link einfügen',
		fans: '{0} Fans',
		noResults: 'Keine Ergebnisse',
		noResultsTrack: 'Keine Titel gefunden',
		noResultsAlbum: 'Keine Alben gefunden',
		noResultsArtist: 'Keine Künstler gefunden',
		noResultsPlaylist: 'Keine Playlisten gefunden'
	},
	searchbar: 'Suche alles, was du willst (oder füge einfach einen Link ein)',
	downloads: 'downloads',
	toasts: {
		addedToQueue: '{0} zur Warteschlange hinzugefügt',
		alreadyInQueue: '{0} ist bereits in der Warteschlange!',
		finishDownload: '{0} bereits heruntgeladen',
		allDownloaded: 'Alle Downloads abgeschlossen!',
		refreshFavs: 'Aktualisierung abgeschlossen!',
		loggingIn: 'Einloggen',
		loggedIn: 'Eingeloggt',
		alreadyLogged: 'Bereits eingeloggt',
		loginFailed: "Einloggen nicht möglich",
		loggedOut: 'Ausgeloggt',
		cancellingCurrentItem: 'Aktuellen Eintrag abbrechen.',
		currentItemCancelled: 'Aktueller Eintrag abgebrochen.',
		startAddingArtist: '{0} Alben zur Warteschlange hinzufügen',
		finishAddingArtist: '{0} Alben zur Warteschlange hinzugefügt',
		startConvertingSpotifyPlaylist: 'Umwandlung von Spotify-Titel in Deezer-Titel',
		finishConvertingSpotifyPlaylist: 'Spotify Playlist konvertiert'
	},
	settings: {
		title: 'Eisntellungen',
		languages: 'Sprachen',
		login: {
			title: 'Login',
			loggedIn: 'Sie sind eingeloggt als {username}',
			arl: {
				question: 'Wie bekomme ich meine eigene ARL?',
				update: 'ARL aktualisieren'
			},
			logout: 'Ausloggen'
		},
		appearance: {
			title: 'Aussehen',
			slimDownloadTab: 'Schlanker Download-Tab'
		},
		downloadPath: {
			title: 'Download Pfad'
		},
		templates: {
			title: 'Vorlagen',
			tracknameTemplate: 'Titelname Vorlage',
			albumTracknameTemplate: 'Album Titel Vorlage',
			playlistTracknameTemplate: 'Playlist Titel Vorlage'
		},
		folders: {
			title: 'Ordner',
			createPlaylistFolder: 'Ordner für Playlists erstellen',
			playlistNameTemplate: 'Vorlage für Playlist-Ordner',
			createArtistFolder: 'Ordner für Künstler erstellen',
			artistNameTemplate: 'Vorlage für Künstler-Ordner',
			createAlbumFolder: 'Ordner für Album erstellen',
			albumNameTemplate: 'Vorlage für Album-Ordner',
			createCDFolder: 'Ordner für CDs erstellen',
			createStructurePlaylist: 'Ordnerstruktur für Wiedergabelisten erstellen',
			createSingleFolder: 'Ordnerstruktur für Singles erstellen'
		},
		trackTitles: {
			title: 'Tracktitel',
			padTracks: 'Pad tracks',
			paddingSize: 'Overwrite padding size',
			illegalCharacterReplacer: 'Unzulässiger Zeichen-Ersetzer'
		},
		downloads: {
			title: 'Downloads',
			queueConcurrency: 'Gleichzeitige Downloads',
			maxBitrate: {
				title: 'Bevorzugte Bitrate',
				9: 'FLAC 1411kbps',
				3: 'MP3 320kbps',
				1: 'MP3 128kbps'
			},
			overwriteFile: {
				title: 'Soll ich die Dateien überschreiben?',
				y: 'Ja, Datei überschreiben',
				n: "Nein, Datei nicht überschreiben",
				t: 'Nur Tags überschreiben'
			},
			fallbackBitrate: 'Fallback Bitrate',
			fallbackSearch: 'Fallback suchen',
			logErrors: 'Protokolldateien für Fehler erstellen',
			logSearched: 'Protokolldateien für gesuchte Titel erstellen',
			createM3U8File: 'Playlist-Datei erstellen (M3U8)',
			syncedLyrics: '.lyr-Dateien erstellen (Liedtexte synchronisieren)',
			playlistFilenameTemplate: 'Vorlage für Playlist-Dateinamen',
			saveDownloadQueue: 'Speichern der Download-Warteschlange beim Schließen der Anwendung'
		},
		covers: {
			title: 'Album-Cover',
			saveArtwork: 'Cover speichern',
			coverImageTemplate: 'Vorlage für Cover-Bezeichnung',
			saveArtworkArtist: 'Künstlerbild speichern',
			artistImageTemplate: 'Vorlage für Künstlerbild',
			localArtworkSize: 'Lokale Größe des Künstlerbildes',
			embeddedArtworkSize: 'Eingebettete Größe des Künstlerbildes',
			localArtworkFormat: {
				title: 'Welches Format soll das lokale Künstlerbild haben?',
				jpg: 'Ein jpeg Bild',
				png: 'Ein png Bild',
				both: 'Beides, eine jpeg und eine png'
			},
			jpegImageQuality: 'JPEG Bild Qualität'
		},
		tags: {
			head: 'Welche Tags sollen gespeichert werden',
			title: 'Titel',
			artist: 'Künstler',
			album: 'Album',
			cover: 'Cover',
			trackNumber: 'Titel Nummer',
			trackTotal: 'Titel Insgesamt',
			discNumber: 'Disc Nummer',
			discTotal: 'Disc Insgesamt',
			albumArtist: 'Album Künstler',
			genre: 'Genre',
			year: 'Jahr',
			date: 'Datum',
			explicit: 'Explizite Texte',
			isrc: 'ISRC',
			length: 'Länge',
			barcode: 'Album Barcode (UPC)',
			bpm: 'BPM',
			replayGain: 'Replay Gain',
			label: 'Album Plattenlabel',
			lyrics: 'Unsynchronisierte Liedtexte',
			copyright: 'Urheberrecht',
			composer: 'Komponist',
			involvedPeople: 'Beteiligte Personen'
		},
		other: {
			title: 'Andere',
			savePlaylistAsCompilation: 'Wiedergabelisten als Compilation speichern',
			useNullSeparator: 'Null-Trennzeichen verwenden',
			saveID3v1: 'ID3v1 ebenfalls speichern',
			multiArtistSeparator: {
				title: 'Wie möchten Sie Ihre Künstler trennen?',
				nothing: 'Nur den Hauptkünstler speichern',
				default: 'Verwendung der Standardspezifikation',
				andFeat: 'Verwendung von & und feat.',
				using: 'Verwendet "{0}"'
			},
			singleAlbumArtist: 'Nur den Interpreten des Hauptalbums speichern',
			albumVariousArtists: '"Verschiedene Künstler" im Album Künstler Tag behalten',
			removeAlbumVersion: '"Album-Version" aus dem Titelnamen entfernen',
			removeduplicateArtists: 'Kombinationen von Künstlern entfernen',
			dateFormat: {
				title: 'Datumsformat für FLAC-Dateien',
				year: 'YYYY',
				month: 'MM',
				day: 'DD'
			},
			featuredToTitle: {
				title: 'Was soll ich mit den Featured Künstlern machen?',
				0: 'Nichts',
				1: 'Aus dem Titel entfernen',
				3: 'Aus dem Titel und dem Albumtitel entfernen',
				2: 'In den Titel verschieben'
			},
			titleCasing: 'Titel Textformattierung',
			artistCasing: 'Künstler Textformattierung',
			casing: {
				nothing: 'Unverändert lassen',
				lower: 'kleinbuchstaben',
				upper: 'GROSSBUCHSTABEN',
				start: 'Anfang Jedes Wortes',
				sentence: 'Wie einen Satz'
			},
			previewVolume: 'Vorschau Lautstärke',
			executeCommand: {
				title: 'Befehl zur Ausführung nach dem Download',
				description: 'Leer lassen für keine Aktion'
			}
		},
		spotify: {
			title: 'Spotify-Funktionen',
			clientID: 'Spotify clientID',
			clientSecret: 'Spotify Client Secret',
			username: 'Spotify Benutzername'
		},
		reset: 'Auf Standard zurücksetzen',
		save: 'Speichern',
		toasts: {
			init: 'Einstellungen geladen!',
			update: 'Einstellungen aktualisiert!',
			ARLcopied: 'ARL in die Zwischenablage kopiert'
		}
	},
	sidebar: {
		home: 'start',
		search: 'suche',
		charts: 'charts',
		favorites: 'favoriten',
		linkAnalyzer: 'link-analysator',
		settings: 'einstellungen',
		about: 'über'
	},
	tracklist: {
		downloadSelection: 'Auswahl herunterladen'
	}
}

export default de
