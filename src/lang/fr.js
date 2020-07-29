const fr = {
	globals: {
		welcome: 'Bienvenue sur deemix',
		back: 'Arrière',
		loading: 'chargement',
		download: 'Téléchargement {0}',
		by: 'par {0}',
		in: 'dans {0}',
		download_hint: 'Téléchargement',
		play_hint: 'Jouer',
		toggle_download_tab_hint: 'Agrandir/Réduire',
		clean_queue_hint: 'Nettoyer la file terminée',
		cancel_queue_hint: 'Annuler tout',
		listTabs: {
			empty: '',
			all: 'Tous',
			top_result: 'meilleurs resultats',
			album: 'album | albums',
			artist: 'artiste | artistes',
			single: 'single | singles',
			title: 'titre | titres',
			track: 'piste | pistes',
			trackN: '0 piste | {n} piste | {n} pistes',
			releaseN: '0 sorties | {n} sortie | {n} sorties',
			playlist: 'playlist | playlists',
			compile: 'compilation | compilations',
			ep: 'ep | eps',
			spotifyPlaylist: 'spotify playlist | spotify playlists',
			releaseDate: 'date de sortie',
			error: 'error'
		}
	},
	about: {
		titles: {
			usefulLinks: 'Liens Utiles',
			bugReports: 'Rapporter un bug',
			contributing: 'Contribution',
			donations: 'Donations',
			license: 'License'
		},
		subtitles: {
			bugReports: "Y a-t-il quelque chose qui ne fonctionne pas dans deemix ? Dites-le nous !",
			contributing: 'Vous souhaitez contribuer à ce projet ? Vous pouvez le faire de différentes manières !',
			donations: 'Vous voulez contribuer financièrement ? Vous pouvez faire un don !'
		},
		usesLibrary: 'Cette application utilise la bibliothèque <strong>deemix</strong>, que vous pouvez utiliser pour créer votre propre interface utilisateur pour deemix.',
		thanks: `Merci à <strong>rtonno</strong>, <strong>uhwot</strong> et <strong>lollilol</strong>pour m'avoir aidé dans ce projet, ainsi que <strong>BasCurtiz</strong> et <strong>scarvimane</strong> pour avoir créer le logo.`,
		upToDate: `Restez au courant des mises à jour en suivant le <a href="https://t.me/RemixDevNews" target="_blank">Canal d'informations</a> sur Telegram.`,
		officialWebsite: 'Site Officiel',
		officialRepo: 'Dépôt officiel de la bibliothèque',
		officialWebuiRepo: 'Dépôt officiel de la webUI',
		officialSubreddit: 'SubReddit Officile',
		newsChannel: 'Canal informations',
		questions: `Si vous avez des questions ou des problèmes avec l'application, cherchez une solution dans le <a href="https://www.reddit.com/r/deemix" target="_blank">subreddit</a> en premier. Ensuite, si vous ne trouvez rien, vous pouvez faire un post avec votre numéro sur le subreddit..`,
		beforeReporting: `Avant de signaler un bogue, assurez-vous que vous utilisez la dernière version de l'application et que ce que vous voulez signaler est bien un bogue et non quelque chose qui ne va pas que de votre côté.`,
		beSure: `S'assurer que le bug est reproductible sur une autre machine et aussi <strong>NE PAS</strong> reporter un bug s'il a déjà été reporté`,
		duplicateReports: 'Les rapports de bug en double seront supprimés, gardez un oeil dessus.',
		dontOpenIssues: `<strong>NE PAS</strong> ouvrir une issuses pour poser une question, il y a un subreddit pour cela.`,
		newUI: `Si vous compétences en python sont suffisantes, vous pouvez tentez de créer une nouvelle interface utilisateur pour l'application en utilisant notre bibliothèque de base, ou résoudre des bugs dans notre bibliothèque avec une pull request sur notre<a href="https://codeberg.org/RemixDev/deemix" target="_blank">repo</a>.`,
		acceptFeatures: `J'accepte également les fonctionnalités, mais pas les choses complexes, car elles peuvent être implémentées directement dans l'application et non dans la bibliothèque.`,
		otherLanguages: `Si vous parlez couramment un autre langage de programmation, vous pourriez essayer de porter deemix dans d'autres langages de programmation !`,
		understandingCode: `Vous avez besoin d'aide pour comprendre le code ? Il suffit de cliquer sur RemixDev sur Telegram ou Reddit.`,
		contributeWebUI: `Si vous connaissez Vue.js (JavaScript), HTML ou CSS, vous pourriez contribuer à  <a href="https://codeberg.org/RemixDev/deemix-webui" target="_blank">l'interface Web uitilisateur</a>.`,
		itsFree: `Vous devez vous rappeler que <strong>ceci est un projet libre</strong> et <strong> vous devez soutenir les artistes que vous aimez</strong> avant de soutenir les développeurs.`,
		notObligated: `Ne vous sentez pas obligé de faire un don, je vous apprécie quand même !`,
		lincensedUnder: `Ce travail est autorisé dans le cadre d'une
			<a rel="license" href="https://www.gnu.org/licenses/gpl-3.0.en.html" target="_blank"
				>GNU General Public License 3.0</a
			>.`
	},
	charts: {
		title: 'Hit-parades',
		changeCountry: 'Changer de pays',
		download: 'Télécharger un hit-parades'
	},
	errors: {
		title: 'Erreurs pour {0}',
		ids: {
			invalidURL: 'URL non reconnue',
			unsupportedURL: 'URL non support actuellement',
			ISRCnotOnDeezer: 'la piste ISRC indisponible sur deezer',
			notYourPrivatePlaylist: "Vous ne pouvez pas télécharger les playlists privées des autres.",
			spotifyDisabled: 'Les paramètres de Spotify ne sont pas correctement réglés.',
			trackNotOnDeezer: 'piste non trouvée sur deezer!',
			albumNotOnDeezer: 'Album non trouvée sur deezer!',
			notOnDeezer: 'piste non disponible sur deezer',
			notEncoded: 'piste non encore encodée!',
			notEncodedNoAlternative: 'Piste non encore encodée et aucune alternative trouvée!',
			wrongBitrate: 'piste non trouvée au bitrate désiré.',
			wrongBitrateNoAlternative: 'piste non trouvée au bitrate désiré et aucune alternative trouvée!',
			no360RA: 'Cette piste est indisponible en Reality Audio 360.',
			notAvailable: "piste indisponible sur les serveurs de deezer!",
			notAvailableNoAlternative: "piste indisponible sur les serveurs de deezer! et aucune alternative trouvée"
		}
	},
	favorites: {
		title: 'Favorites',
		noPlaylists: 'Aucune Playliste trouvée',
		noAlbums: 'Aucun Album favoris trouvé',
		noArtists: "Aucun Album favoris de l'artiste trouvé",
		noTracks: 'Aucune piste favoris trouvé'
	},
	home: {
		needTologin: 'Vous devez vous connecter à votre compte Deezer avant de pouvoir commencer à télécharger.',
		openSettings: 'Ouvrir les paramètres',
		sections: {
			popularPlaylists: 'Playlites populaires',
			popularAlbums: 'Les albums les plus diffusés'
		}
	},
	linkAnalyzer: {
		info: "Vous pouvez utiliser cette section pour obtenir plus d'informations sur le lien que vous essayez de télécharger.",
		useful:
			"C'est utile si vous essayez de télécharger certains titres qui ne sont pas disponibles dans votre pays et que vous voulez savoir où ils sont disponibles, par exemple.",
		linkNotSupported: 'Ce lien n\'est pas encore pris en charge',
		linkNotSupportedYet: "Il semble que ce lien ne soit pas encore pris en charge, essayez d'en analyser un autre.",
		table: {
			id: 'ID',
			isrc: 'ISRC',
			upc: 'UPC',
			duration: 'Durée',
			diskNumber: 'Numero du disque',
			trackNumber: 'Numéro de la piste',
			releaseDate: 'Date de sortie',
			bpm: 'BPM',
			label: 'Label',
			recordType: 'Type d\'enregistrement',
			genres: 'Genres',
			tracklist: 'Liste des pistes'
		}
	},
	search: {
		startSearching: 'Commencer à chercher!',
		description:
			'Vous pouvez rechercher un titre, un album entier, un artiste, une playlist.... tout ! Vous pouvez également coller un lien Deezer',
		fans: '{0} fans',
		noResults: 'Aucun résultat',
		noResultsTrack: 'Aucune piste trouvé',
		noResultsAlbum: 'Aucun Album trouvé',
		noResultsArtist: 'Aucun Artiste trouvé',
		noResultsPlaylist: 'Aucune playliste trouvée'
	},
	searchbar: 'Cherchez ce que vous voulez (ou collez simplement un lien)',
	downloads: 'téléchargement',
	toasts: {
		addedToQueue: '{0} ajoutés à la file',
		alreadyInQueue: '{0} est déjà dans la file!',
		finishDownload: '{0} téléchargement terminé.',
		allDownloaded: 'Tous les téléchargements sont terminés!',
		refreshFavs: 'Rafraîchissement terminé!',
		loggingIn: 'Connexion',
		loggedIn: 'Connecté',
		alreadyLogged: 'Déjà connecté',
		loginFailed: "Impossible de se connecter",
		loggedOut: 'Déconnexion',
		cancellingCurrentItem: "Annulation de l'article en cours .",
		currentItemCancelled: 'Article en cours annulé.',
		startAddingArtist: 'ajout de {0} albums à la file',
		finishAddingArtist: '{0} albums ajoutés à la file',
		startConvertingSpotifyPlaylist: 'Conversion des pistes de spotify vers les pistes de deezer',
		finishConvertingSpotifyPlaylist: 'Playlist spotify convertie'
	},
	settings: {
		title: 'Paramètres',
		languages: 'Langages',
		login: {
			title: 'Connexion',
			loggedIn: 'Vous êtes connecté en tant que {username}',
			arl: {
				question: 'Comment puis-je obtenir mon ARL?',
				update: 'Mettre à jour ARL'
			},
			logout: 'Déconnexion'
		},
		appearance: {
			title: 'Apparence',
			slimDownloadTab: 'Onglet de téléchargement léger'
		},
		downloadPath: {
			title: 'Chemin de téléchargement'
		},
		templates: {
			title: 'Modèles',
			tracknameTemplate: 'Modèle de nom de piste',
			albumTracknameTemplate: 'Modèle de piste d\'album',
			playlistTracknameTemplate: 'Modèle de playlist'
		},
		folders: {
			title: 'Dossiers',
			createPlaylistFolder: 'Créer un dossier pour les playlistes',
			playlistNameTemplate: 'Modèle de dossier de liste de lecture',
			createArtistFolder: "Créer un dossier pour l'artiste",
			artistNameTemplate: "Modèle de dossier d'artiste",
			createAlbumFolder: "Créer un dossier pour l'album",
			albumNameTemplate: "Modèle de dossier d'album",
			createCDFolder: 'Créer un dossier pour les CD',
			createStructurePlaylist: 'Créer une structure de dossiers pour les playlists',
			createSingleFolder: 'Créer une structure de dossiers pour les singles'
		},
		trackTitles: {
			title: 'Titres des pistes',
			padTracks: 'Pad tracks',
			paddingSize: 'Ecraser la taille du remplissage',
			illegalCharacterReplacer: 'Caractères de remplacement illégal'
		},
		downloads: {
			title: 'Téléchargements',
			queueConcurrency: 'Téléchargements simultanés',
			maxBitrate: {
				title: 'Bitrate préféré',
				9: 'FLAC 1411kbps',
				3: 'MP3 320kbps',
				1: 'MP3 128kbps'
			},
			overwriteFile: {
				title: 'Dois-je écraser les fichiers ?',
				y: 'Oui, écraser le fichier',
				n: "Non, ne pas écraser le fichier",
				t: "N'écrasez que les balises"
			},
			fallbackBitrate: 'Bitrate fallback',
			fallbackSearch: 'Rechercher fallback',
			logErrors: 'Créer des fichiers journaux pour les erreurs',
			logSearched: 'Créer des fichiers journaux pour les pistes recherchées',
			createM3U8File: 'Créer un fichier de liste de lecture',
			syncedLyrics: 'Créer des fichiers .lyr (Sync paroles)',
			playlistFilenameTemplate: 'Modèle de nom de fichier de liste de lecture',
			saveDownloadQueue: "Sauvegarder la file de téléchargement lors de la fermeture de l'application"
		},
		covers: {
			title: "Couvertures d'albums",
			saveArtwork: 'Sauvegarder les couvertures',
			coverImageTemplate: 'Modèle de nom de couverture',
			saveArtworkArtist: "Sauvegarder l'image de l'artiste",
			artistImageTemplate: "Modèle d'image d'artiste",
			localArtworkSize: "Taille des œuvres d'art locales",
			embeddedArtworkSize: "Taille de l'œuvre d'art incorporée",
			localArtworkFormat: {
				title: "Quel format voulez-vous que l'œuvre d'art locale soit?",
				jpg: 'Une image jpeg',
				png: 'Une image png',
				both: 'A la fois une image jpeg et png'
			},
			jpegImageQuality: 'Qualité de l\'image JPEG'
		},
		tags: {
			head: 'uelles balises sauvegarder',
			title: 'Titre',
			artist: 'Artiste',
			album: 'Album',
			cover: 'Couverture',
			trackNumber: 'Numéro de piste',
			trackTotal: 'Nombre total de piste',
			discNumber: 'Disc Numéro',
			discTotal: 'Total de disc',
			albumArtist: "Artiste de l'album",
			genre: 'Genre',
			year: 'Année',
			date: 'Date',
			explicit: 'Paroles Explicites',
			isrc: 'ISRC',
			length: 'longeur de la piste',
			barcode: "Barcode de l'album (UPC)",
			bpm: 'BPM',
			replayGain: 'Replay Gain',
			label: "Label de l'album",
			lyrics: 'Paroles non synchronisées',
			copyright: 'Copyright',
			composer: 'Compositeur',
			involvedPeople: 'Personnes implquées'
		},
		other: {
			title: 'Autre',
			savePlaylistAsCompilation: 'Enregistrer les listes de lecture sous forme de compilation',
			useNullSeparator: 'Utiliser le séparateur nul',
			saveID3v1: 'Enregistrez également l\'ID3v1',
			multiArtistSeparator: {
				title: 'Comment souhaitez-vous séparer vos artistes?',
				nothing: "Ne sauver que l'artiste principal",
				default: 'Utilisation d\'une spécification standard',
				andFeat: 'Utiliser & et feat.',
				using: 'Utiliser "{0}"'
			},
			singleAlbumArtist: 'Sauvegarder uniquement l\'artiste de l\'album principal',
			albumVariousArtists: "Conservez Various Artists dans l'album",
			removeAlbumVersion: "Supprimer la version de l'album du titre de la piste",
			removeDuplicateArtists: 'Supprimer les combinaisons d\'artistes',
			dateFormat: {
				title: 'Format de date pour les fichiers FLAC',
				year: 'YYYY',
				month: 'MM',
				day: 'DD'
			},
			featuredToTitle: {
				title: 'Que dois-je faire avec les artistes présentés ?',
				0: 'Rien',
				1: 'Supprimer le titre',
				3: "Retirez-le du titre et du titre de l'album",
				2: 'Déplacez-le vers le titre'
			},
			titleCasing: 'Titre de la boîte',
			artistCasing: 'Artiste de la boîte',
			casing: {
				nothing: 'Ne rien changer',
				lower: 'minuscules',
				upper: 'MAJUSCULES',
				start: 'Début de chaque mot',
				sentence: 'Comme une phrase'
			},
			previewVolume: 'Prévisualisation du volum',
			executeCommand: {
				title: 'Commande à exécuter après le téléchargement',
				description: 'Laisser en blanc pour aucune action'
			}
		},
		spotify: {
			title: 'Spotify Features',
			clientID: 'Spotify clientID',
			clientSecret: 'Spotify Client Secret',
			username: "Nom d'utilisateur spotify"
		},
		reset: 'Remettre les options par défaut',
		save: 'Sauvegarder',
		toasts: {
			init: 'Paramètres chargés!',
			update: 'Paramètres mis à jour!',
			ARLcopied: 'ARL copié dans presse papier'
		}
	},
	sidebar: {
		home: 'accueil',
		search: 'recharcher',
		charts: 'Hit-parades',
		favorites: 'favoris',
		linkAnalyzer: 'analyseur de lien',
		settings: 'Paramètres',
		about: 'a propos'
	},
	tracklist: {
		downloadSelection: 'Télécharger la sélection'
	}
}

export default fr
