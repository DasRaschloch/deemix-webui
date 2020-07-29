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
			contributing: 'Du möchtest zu diesem Projekt beitragen? Das kannst du auf verschiedene Arten tun!',
			donations: 'Du möchtest deemix finanziell unterstützen? Dann mach eine Spende'
		},
		usesLibrary: 'Diese App verwendet die <strong>deemix</strong> Bibliothek, die du verwenden kannst, um Deine eigene UI für Deemix zu erstellen.',
		thanks: `Danke an <strong>rtonno</strong>, <strong>uhwot</strong> und <strong>lollilol</strong> für die Hilfe bei diesem Projekt und an <strong>BasCurtiz</strong> und <strong>scarvimane</strong> für das Design der Icons.`,
		upToDate: `Bleib auf dem Laufenden mit den Updates indem du dem <a href="https://t.me/RemixDevNews" target="_blank">News Channel</a> auf Telegram folgst.`,
		officialWebsite: 'Offizielle Webseite',
		officialRepo: 'Offizielle Library Repository',
		officialWebuiRepo: 'Offizielle WebUI Repository',
		officialSubreddit: 'Offizieller Subreddit',
		newsChannel: 'News Kanal',
		questions: `Wenn du Fragen oder Probleme mit der App hast, suche zuerst nach einer Lösung im <a href="https://www.reddit.com/r/deemix" target="_blank">subreddit</a>. Wenn du dann nichts findest, kannst du einen Beitrag mit Deinem Thema auf dem Subreddit verfassen.`,
		beforeReporting: `Bevor du einen Fehler meldest, stelle sicher, dass du die neueste Version der App benutzt und dass das, was du melden möchtest, tatsächlich ein Bug ist und nicht etwas, das nur bei dir falsch ist.`,
		beSure: `Vergewissere dich, dass der Bug auf einem anderen Rechner vorhanden ist und melde <stark>NICHT</stark> einen Bug, wenn er bereits gemeldet wurde.`,
		duplicateReports: 'Doppelte Fehlerberichte werden geschlossen, also behalte das im Auge.',
		dontOpenIssues: `Erstelle <strong>KEINE</strong> Fehlerberichte, um Fragen zu stellen, dafür gibt es einen Subreddit.`,
		newUI: `Wenn du dich mit Python auskennst, könntest du versuchen, mit hilfe der base library eine neue Benutzeroberfläche für die App zu erstellen oder Fehler in der library mit einem Pull-Request in der <a href="https://codeberg.org/RemixDev/deemix" target="_blank">deemix Repo</a> zu beheben.`,
		acceptFeatures: `Ich akzeptiere auch Features, aber keine komplexen Dinge, da sie direkt in der App und nicht in der Bibliothek implementiert werden können.`,
		otherLanguages: `Wenn du eine andere Programmiersprache fließend beherrschst, könntest du versuchen, deemix in andere Programmiersprachen zu portieren!`,
		understandingCode: `Du benötigst Hilfe beim verstehen des Codes? Frag einfach RemixDev auf Telegram oder Reddit.`,
		contributeWebUI: `Wenn du Vue.js (JavaScript) oder HTML und CSS kennst, könntest du etwas zum <a href="https://codeberg.org/RemixDev/deemix-webui" target="_blank">WebUI</a> beitragen.`,
		itsFree: `Du solltest daran denken, dass dies ist ein <strong>kostenloses Projekt</strong> ist und <strong>Du solltest die Künstler, die du magst, unterstützen<strong>, bevor du die Entwickler unterstützt.`,
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
										invalidURL: 'URL nicht erkannt',
										unsupportedURL: 'URL noch nicht unterstützt',
										ISRCnotOnDeezer: 'Track ISRC ist auf deezer nicht verfügbar',
										notYourPrivatePlaylist: "Du kannst keine privaten Playlisten anderer herunterladen.",
										spotifyDisabled: 'Spotify-Funktionen sind nicht richtig eingerichtet',
										trackNotOnDeezer: 'Track ist nicht verfügbar auf Deezer!',
										albumNotOnDeezer: 'Album auf Deezer nicht gefunden!',
										notOnDeezer: 'Track auf Deezer nicht verfügbar!',
										notEncoded: 'Track noch nicht codiert!',
										notEncodedNoAlternative: 'Track noch nicht codiert und keine Alternative gefunden!',
										wrongBitrate: 'Spur mit gewünschter Bitrate nicht gefunden.',
										wrongBitrateNoAlternative: 'Track mit gewünschter Bitrate nicht gefunden und keine Alternative gefunden!',
										no360RA: 'Track ist nicht verfügbar in Reality Audio 360.',
										notAvailable: "Track ist noch nicht verfügbar auf den Servern von Deezer!",
										notAvailableNoAlternative: "Track ist noch nicht verfügbar auf den Servern von Deezer und keine Alternativen gefunden!!"
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
	downloads: 'Downloads',
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
		cancellingCurrentItem: 'Aktuelle Auswahl abbrechen.',
		currentItemCancelled: 'Aktuelle Auswahl abgebrochen.',
		startAddingArtist: '{0} Alben zur Warteschlange hinzufügen',
		finishAddingArtist: '{0} Alben zur Warteschlange hinzugefügt',
		startConvertingSpotifyPlaylist: 'Umwandlung von Spotify-Titel in Deezer-Titel',
		finishConvertingSpotifyPlaylist: 'Spotify Playlist konvertiert'
	},
	settings: {
		title: 'Einstellungen',
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
										createPlaylistFolder: 'Ordner für Playlist erstellen',
										playlistNameTemplate: 'Playlist Ordner Vorlage',
										createArtistFolder: 'Ordner für Künstler erstellen',
										artistNameTemplate: 'Künstler Ordner Vorlage',
										createAlbumFolder: 'Ordner für Album erstellen',
										albumNameTemplate: 'Album Ordner Vorlage',
										createCDFolder: 'Ordner für CDs erstellen',
										createStructurePlaylist: 'Erstellen von Künstler-, Alben- und CD-Ordnern auch für Playlisten',
										createSingleFolder: 'Ordner für einzelne Titel erstellen'
		},
						trackTitles: {
										title: 'Track Titel',
										padTracks: 'einheitliche Länge der Titelnummern (voranstehende Nullen werden ergänzt)',
										paddingSize: 'Paddinggröße überschreiben',
										illegalCharacterReplacer: 'unzulässige Zeichen ersetzen'
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
										fallbackBitrate: 'Falls gewünschte Bitrate nicht verfügbar, auf niedrigere Bitrate zurückgreifen',
										fallbackSearch: 'Zur Suche zurückkehren, wenn der Song nicht verfügbar ist',
										logErrors: 'Protokolldatei für Fehler im Download-Ordner erstellen',
										logSearched: 'Protokolldatei für gesuchte Tracks erstellen',
										createM3U8File: 'Erstelle Playlist-Datei (M3U8)',
										syncedLyrics: 'Erstelle synchrone Lyric-Datei (.lyr)',
										playlistFilenameTemplate: 'Dateinamenvorlage für Playlist',
										saveDownloadQueue: 'Download-Warteschlange beim Schließen der App speichern'
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
			savePlaylistAsCompilation: 'Wiedergabelisten als Zussammenstellung speichern',
			useNullSeparator: 'Null-Trennzeichen verwenden',
			saveID3v1: 'ID3v1 ebenfalls speichern',
			multiArtistSeparator: {
				title: 'Wie möchten Sie Ihre Künstler trennen?',
				nothing: 'Nur den Hauptkünstler speichern',
				default: 'Verwendung der Standardspezifikation',
				andFeat: 'Verwendung von & und feat.',
				using: 'Verwende "{0}"'
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
				sentence: 'Wie einen satz'
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
