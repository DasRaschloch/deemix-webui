const fr = {
	globals: {
		welcome: 'Bienvenue sur deemix',
		back: 'retour',
		loading: 'chargement',
		download: 'Téléchargement {0}',
		by: 'par {0}',
		in: 'en {0}',
		download_hint: 'Télécharger',
		play_hint: 'Jouer',
		toggle_download_tab_hint: 'Agrandir/Réduire',
		clean_queue_hint: 'Effacer les tâches terminées',
		cancel_queue_hint: 'Tout Annuler',
		listTabs: {
			empty: '',
			all: 'tout',
			top_result: 'meilleur résultat',
			album: 'album | albums',
			artist: 'artiste | artistes',
			single: 'single | singles',
			title: 'titre | titres',
			track: 'piste | pistes',
			trackN: '0 pistes | {n} piste | {n} pistes',
			releaseN: '0 releases | {n} sortie | {n} sorties',
			playlist: 'playlist | playlists',
			compile: 'compilation | compilations',
			ep: 'ep | eps',
			spotifyPlaylist: 'playlist spotify | playlists spotify',
			releaseDate: 'date de sortie',
			error: 'erreur'
		}
	},
	about: {
		titles: {
			usefulLinks: 'Liens Utiles',
			bugReports: 'Rapporter un Bug',
			contributing: 'Contribuer',
			donations: 'Donations',
			license: 'Licence'
		},
		subtitles: {
			bugReports: "Y a-t-il quelque chose qui ne fonctionne pas avec deemix ? Dites-le nous !",
			contributing: 'Vous souhaitez contribuer à ce projet ? Vous pouvez le faire de différentes manières !',
			donations: 'Vous souhaitez contribuer financièrement ? Vous pourriez faire un don !'
		},
		usesLibrary: 'Cette application utilise la librairie <strong>deemix</strong>, que vous pouvez utiliser afin de créer votre propre interface utilisateur pour deemix.',
		thanks: `Merci à <strong>rtonno</strong>, <strong>uhwot</strong> et <strong>lollilol</strong> pour m'avoir aidé avec ce projet et à <strong>BasCurtiz</strong> et <strong>scarvimane</strong> pour avoir réalisé l'icône.`,
		upToDate: `Restez informé des mises à jour en suivant le <a href="https://t.me/RemixDevNews" target="_blank">canal d'information</a> sur Telegram.`,
		officialWebsite: 'Site Officiel',
		officialRepo: 'Site Officiel de la Librairie',
		officialWebuiRepo: 'Site Officiel de WebUI',
		officialSubreddit: 'Subreddit Officiel',
		newsChannel: `Canal d'informations`,
		questions: `Si vous avez des questions ou soucis avec l'application, cherchez une solution sur le <a href="https://www.reddit.com/r/deemix" target="_blank">subreddit</a> d'abord. Ensuite, vous pouvez créer une publication sur le subreddit en décrivant votre problème.`,
		beforeReporting: `Avant de rapporter un bug, assurez vous d'avoir la dernière version de l'application et que ce que vous voulez rapporter est bien un bug et non pas quelque chose qui ne fonctionne pas juste pour vous.`,
		beSure: `Assurez vous que le bug est reproductible sur d'autres machines et <strong>NE PAS</strong> rapporter un bug si il l'est déjà par quelqu'un d'autre.`,
		duplicateReports: 'Les doublons de rapports de bug seront fermés, gardez un œil sur cela.',
		dontOpenIssues: `<strong>NE PAS</strong> ouvrir un problème pour poser des questions, il y a un subreddit pour cela.`,
		newUI: `Si vous maitrisez le python, vous pourriez essayer de créer une nouvelle interface utilisateur pour l'application à l'aide de la librairie de base, ou corriger des bugs de cette librairie sur son <a href="https://codeberg.org/RemixDev/deemix" target="_blank">repo git</a>.`,
		acceptFeatures: `J'accepte également de nouvelles fonctionnalités, mais pas de choses complexes, car elles peuvent être implémentées directement dans l'application et non dans la librairie.`,
		otherLanguages: `Si vous maîtrisez un autre langage de programmation, vous pouvez essayer de porter deemix dans d'autres langages de programmation !`,
		understandingCode: `Vous avez besoin d'aide pour comprendre le code ? Contactez RemixDev sur Telegram ou Reddit.`,
		contributeWebUI: `Si vous vous y connaissez en Vue.js (JavaScript), HTML ou CSS vous pourriez contribuer au <a href="https://codeberg.org/RemixDev/deemix-webui" target="_blank">WebUI</a>.`,
		itsFree: `N'oubliez pas que <strong>ce projet est gratuit</strong> et que <strong>vous devriez soutenir les artistes que vous aimez</strong> avant de supporter les développeurs.`,
		notObligated: `Ne vous sentez pas obligé de faire un don, je vous apprécie quand même !`,
		lincensedUnder: `Ce projet est fourni sous la
			<a rel="license" href="https://www.gnu.org/licenses/gpl-3.0.en.html" target="_blank"
				>Licence publique générale GNU 3.0</a
			>.`
	},
	charts: {
		title: 'Classements',
		changeCountry: 'Changer le Pays',
		download: 'Télécharger le Classement'
	},
	errors: {
		title: 'Erreurs pour {0}',
		ids: {
			invalidURL: 'URL non reconnue',
			unsupportedURL: 'URL pas encore prise en charge',
			ISRCnotOnDeezer: "L'ISRC de la piste n'est pas encore disponible sur deezer",
			notYourPrivatePlaylist: "Vous ne pouvez pas télécharger les playlists privées de quelqu'un d'autre.",
			spotifyDisabled: 'Les Fonctionnalités Spotify ne sont pas bien configurées.',
			trackNotOnDeezer: 'Piste introuvable sur deezer !',
			albumNotOnDeezer: 'Album introuvable sur deezer !',
			notOnDeezer: 'Piste non disponible sur Deezer !',
			notEncoded: 'Piste pas encore encodée !',
			notEncodedNoAlternative: "Piste pas encore encodée et aucune alternative trouvée !",
			wrongBitrate: 'Piste introuvable au débit souhaité.',
			wrongBitrateNoAlternative: 'Piste introuvable au débit souhaité et aucune alternative trouvée !',
			no360RA: "La piste n'est pas disponible avec Reality Audio 360.",
			notAvailable: "Piste non disponible sur les serveurs de deezer !",
			notAvailableNoAlternative: "Piste non disponible sur les serveurs de deezer et aucune alternative trouvée !"
		}
	},
	favorites: {
		title: 'Favoris',
		noPlaylists: 'Aucune Playlist trouvée',
		noAlbums: "Aucuns Album Favori trouvé",
		noArtists: "Aucun Artiste Favori trouvé",
		noTracks: 'Aucune Piste Favorite trouvée'
	},
	home: {
		needTologin: 'Vous devez vous connecter à votre compte Deezer avant de pouvoir commencer le téléchargement.',
		openSettings: 'Ouvrir les Paramètres',
		sections: {
			popularPlaylists: 'Playlists Populaires',
			popularAlbums: 'Albums les plus diffusés'
		}
	},
	linkAnalyzer: {
		info: "Vous pouvez utiliser cette section afin de trouver plus d'informations sur le lien que vous essayer de télcharger.",
		useful:
			"C'est utile si vous essayer de télécharger des pistes qui ne sont pas disponibles dans votre pays et que vous souhaitez savoir où elles sont disponibles, par exemple.",
		linkNotSupported: "Ce lien n'est pas encore supporté",
		linkNotSupportedYet: 'Seems like this link is not yet supported, try analyzing another one.',
		table: {
			id: 'ID',
			isrc: 'ISRC',
			upc: 'UPC',
			duration: 'Durée',
			diskNumber: 'Numéro de Disque',
			trackNumber: 'Numéro de Piste',
			releaseDate: 'Date de Sortie',
			bpm: 'BPM',
			label: 'Label',
			recordType: "Type d'Enregistrement",
			genres: 'Genres',
			tracklist: 'Tracklist'
		}
	},
	search: {
		startSearching: 'Lancer la recherche !',
		description:
			'Vous pouvez rechercher une piste, un album entier, un artiste, une playlist .... tout ! Vous pouvez également copier-coller un lien Deezer',
		fans: '{0} fans',
		noResults: 'Aucun résultat',
		noResultsTrack: 'Aucune Piste trouvée',
		noResultsAlbum: 'Aucun Album trouvé',
		noResultsArtist: 'Aucun Artiste trouvé',
		noResultsPlaylist: 'Aucune Playlist trouvée'
	},
	searchbar: 'Recherchez tout ce que vous voulez (ou copier-collez un lien)',
	downloads: 'téléchargements',
	toasts: {
		addedToQueue: "{0} ajouté à la file d'attente",
		alreadyInQueue: "{0} est déjà en file d'attente !",
		finishDownload: '{0} a fini de télécharger.',
		allDownloaded: 'Tous les téléchargements sont terminés !',
		refreshFavs: 'Actualisation terminée !',
		loggingIn: 'Connexion',
		loggedIn: 'Connecté',
		alreadyLogged: 'Déjà connecté',
		loginFailed: "Connexion impossible",
		loggedOut: 'Déconnecté',
		cancellingCurrentItem: "Annulation de l'élément actuel.",
		currentItemCancelled: 'Élément actuel annulé.',
		startAddingArtist: "Ajout de {0} albums en file d'attente",
		finishAddingArtist: "Ajouté {0} en file d'attente",
		startConvertingSpotifyPlaylist: 'Converting spotify tracks to deezer tracks',
		finishConvertingSpotifyPlaylist: 'Spotify playlist converted'
	},
	settings: {
		title: 'Paramètres',
		languages: 'Langues',
		login: {
			title: 'Connexion',
			loggedIn: 'Vous êtes connecté en tant que {username}',
			arl: {
				question: 'Comment obtenir mon propre ARL ?',
				update: "Mettre à jour l'ARL"
			},
			logout: 'Déconnecter'
		},
		appearance: {
			title: 'Apparence',
			slimDownloadTab: 'Onglet de téléchargement mince'
		},
		downloadPath: {
			title: 'Dossier de Téléchargement'
		},
		templates: {
			title: 'Modèles',
			tracknameTemplate: 'Modèle de nom de piste',
			albumTracknameTemplate: "Modèle de piste d'album",
			playlistTracknameTemplate: 'Modèle de piste de playlist'
		},
		folders: {
			title: 'Dossiers',
			createPlaylistFolder: 'Créer un dossier pour Playlists',
			playlistNameTemplate: 'Modèle de dossier pour Playlist',
			createArtistFolder: 'Créer un dossier pour Artiste',
			artistNameTemplate: 'Modèle de dossier pour Artiste',
			createAlbumFolder: 'Créer un dossier pour Album',
			albumNameTemplate: 'Modèle de dossier pour Album',
			createCDFolder: 'Créer un dossier pour CDs',
			createStructurePlaylist: 'Créer une structure de dossiers pour Playlists',
			createSingleFolder: 'Créer une structure de dossiers pour Singles'
		},
		trackTitles: {
			title: 'Titres de pistes',
			padTracks: 'Pad tracks',
			paddingSize: 'Écraser la taille du remplissage',
			illegalCharacterReplacer: 'Caractère de remplacement illégal'
		},
		downloads: {
			title: 'Téléchargements',
			queueConcurrency: 'Téléchargements Simultanés',
			maxBitrate: {
				title: 'Débit Préféré',
				9: 'FLAC 1411kbps',
				3: 'MP3 320kbps',
				1: 'MP3 128kbps'
			},
			overwriteFile: {
				title: 'Dois-je écraser les fichiers ?',
				y: 'Oui, écraser le fichier',
				n: "Non, n'écrasez pas le fichier",
				t: 'Écraser uniquement les balises'
			},
			fallbackBitrate: 'Débit de secours',
			fallbackSearch: 'Recherche de secours',
			logErrors: 'Créer des fichiers journaux pour les erreurs',
			logSearched: 'Créer des fichiers journaux pour les pistes recherchées',
			createM3U8File: 'Créer un fichier playlist',
			syncedLyrics: 'Créer des fichiers .lyr (Sync Paroles)',
			playlistFilenameTemplate: 'Modèle de nom de fichier de Playlist',
			saveDownloadQueue: "Enregistrer la file d'attente lors de la fermeture de l'application"
		},
		covers: {
			title: "Couvertures d'album",
			saveArtwork: 'Enregistrer les couvertures',
			coverImageTemplate: 'Modèle de nom de la couverture',
			saveArtworkArtist: "Enregistrer l'image de l'artiste",
			artistImageTemplate: "Modèle de l'image de l'artiste",
			localArtworkSize: "Taille de l'illustration locale",
			embeddedArtworkSize: "Taille de l'illustration intégrée",
			localArtworkFormat: {
				title: "Dans quel format voulez-vous que l'illustration locale soit ?",
				jpg: 'Une image jpeg',
				png: 'Une image png',
				both: 'Les deux, jpeg et png'
			},
			jpegImageQuality: "Qualité d'image JPEG"
		},
		tags: {
			head: 'Balises à sauvegarder',
			title: 'Titre',
			artist: 'Artiste',
			album: 'Album',
			cover: 'Couverture',
			trackNumber: 'Numéro de Piste',
			trackTotal: 'Nombre de Pistes',
			discNumber: 'Numéro du Disque',
			discTotal: 'Nombre de Disques',
			albumArtist: "Artiste de l'Album",
			genre: 'Genre',
			year: 'Année',
			date: 'Date',
			explicit: 'Paroles Explicites',
			isrc: 'ISRC',
			length: 'Durée de Piste',
			barcode: "Code-barres de l'album (UPC)",
			bpm: 'BPM',
			replayGain: "Gain du Replay",
			label: "Label de l'Album",
			lyrics: 'Paroles non synchronisées',
			copyright: "Droits d'auteur (copyright)",
			composer: 'Compositeur',
			involvedPeople: 'Personnes impliquées'
		},
		other: {
			title: 'Autre',
			savePlaylistAsCompilation: 'Enregistrer les playlists en tant que compilation',
			useNullSeparator: 'Utiliser un séparateur nul',
			saveID3v1: "Enregistrez l'ID3v1 également",
			multiArtistSeparator: {
				title: 'Comment aimeriez-vous séparer vos artistes ?',
				nothing: "Enregistrer uniquement l'artiste principal",
				default: "En utilisant la spécification standard",
				andFeat: 'En utilisant & et feat.',
				using: 'En utilisant "{0}"'
			},
			singleAlbumArtist: "Enregistrer uniquement l'artiste principal de l'album",
			albumVariousArtists: `Conserver "Artistes Divers" dans les artistes de l'album`,
			removeAlbumVersion: `Supprimer "Version de l'album" du titre de la piste`,
			removeDuplicateArtists: "Supprimer les combinaisons d'artistes",
			dateFormat: {
				title: 'Format de date pour les fichiers FLAC',
				year: 'AAAA',
				month: 'MM',
				day: 'JJ'
			},
			featuredToTitle: {
				title: 'Que dois-je faire avec les artistes en vedette ?',
				0: 'Rien',
				1: 'Retirez-les du titre',
				3: "Supprimez-les du titre et du titre de l'album",
				2: 'Déplacez-les vers le titre'
			},
			titleCasing: 'Titre de la boîte',
			artistCasing: "Boite de l'artiste",
			casing: {
				nothing: 'Rester inchangé',
				lower: 'minuscule',
				upper: 'MAJUSCULE',
				start: 'Début De Chaque Mot',
				sentence: 'Comme une phrase'
			},
			previewVolume: 'Aperçu du volume',
			executeCommand: {
				title: 'Commande à exécuter après le téléchargement',
				description: 'Laisser vide pour aucune action'
			}
		},
		spotify: {
			title: 'Fonctionnalités Spotify',
			clientID: 'ID Client Spotify',
			clientSecret: 'Secret Client Spotify',
			username: "Nom d'utilisateur Spotify"
		},
		reset: 'Rétablir les valeurs par défaut',
		save: 'Sauvegarder',
		toasts: {
			init: 'Paramètres chargés !',
			update: 'Paramètres mis à jour !',
			ARLcopied: 'ARL copié dans le presse-papier'
		}
	},
	sidebar: {
		home: 'accueil',
		search: 'chercher',
		charts: 'classements',
		favorites: 'favoris',
		linkAnalyzer: 'analyseur de liens',
		settings: 'paramètres',
		about: 'à propos'
	},
	tracklist: {
		downloadSelection: 'Section des téléchargements'
	}
}

export default fr