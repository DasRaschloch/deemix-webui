const gr = {
	globals: {
		welcome: 'Καλωσόρισες στο deemix',
		back: 'Πίσω',
		loading: 'φόρτωση',
		download: 'Λήψη {thing}',
		by: 'από {artist}',
		in: 'σε {album}',
		download_hint: 'Λήψη',
		play_hint: 'Αναπαραγωγή',
		toggle_download_tab_hint: 'Ανάπτυξη/Σύμπτυξη',
		clean_queue_hint: 'Ο Καθαρισμός Ολοκληρώθηκε',
		cancel_queue_hint: 'Ακύρωση Όλων',
		open_downloads_folder: 'Άνοιγμα Φακέλου Λήψεων',
		cut: 'αποκοπή',
		copy: 'αντιγραφή',
		copyLink: 'αντιγραφή συνδέσμου',
		copyImageLink: 'αντιγραφή συνδέσμου εικόνας',
		copyDeezerLink: 'αντιγραφή συνδέσμου deezer',
		paste: 'επικόλληση',
		listTabs: {
			empty: '',
			all: 'όλα',
			top_result: 'κορυφαίο αποτέλεσμα',
			album: 'άλμπουμ | άλμπουμ',
			artist: 'καλλιτέχνης | καλλιτέχνες',
			single: 'single | singles',
			title: 'τίτλος | τίτλοι',
			track: 'κομμάτι | κομμάτια',
			releaseN: '0 κυκλοφορίες | {n} κυκλοφορία | {n} κυκλοφορίες',
			playlist: 'λίστα αναπαραγωγής | λίστες αναπαραγωγής',
			compile: 'συλλογή | συλλογές',
			ep: 'ep | eps',
			bundle: 'δέσμη | δέσμες',
			more: 'Περισσότερα άλμπουμ',
			featured: 'Συμμετοχές',
			spotifyPlaylist: 'λίστα αναπαραγωγής spotify | λίστες αναπαραγωγής spotify',
			releaseDate: 'ημερομηνία κυκλοφορίας',
			error: 'σφάλμα',
			trackN: '0 κομμάτια | {n} κομμάτι | {n} κομμάτια',
			albumN: '0 άλμπουμ | {n} άλμπουμ | {n} άλμπουμ',
			artistN: '0 καλλιτέχνες | {n} καλλιτέχνης | {n} καλλιτέχνες',
			playlistN: '0 λίστες αναπαραγωγής | {n} λίστα αναπαραγωγής | {n} λίστες αναπαραγωγής'
		},
		yes: 'ναι',
		no: 'όχι',
		empty: 'κενό'
	},
	about: {
		appStatus: {
			online: 'εφαρμογή σε σύνδεση',
			offline: 'εφαρμογή εκτός σύνδεσης'
		},
		updates: {
			currentVersion: 'Τρέχουσα Έκδοση',
			currentWebuiVersion: 'Τρέχουσα Έκδοση WebUI',
			versionNotAvailable: 'Μη Διαθέσιμη',
			updateAvailable: `Δεν εκτελείτε την πιο πρόσφατη διαθέσιμη έκδοση: {version}`,
			deemixVersion: 'έκδοση deemix lib'
		},
		titles: {
			usefulLinks: 'Χρήσιμοι Σύνδεσμοι',
			bugReports: 'Αναφορές Σφαλμάτων',
			contributing: 'Συνεισφορά',
			donations: 'Δωρεές',
			license: 'Άδεια'
		},
		subtitles: {
			bugReports: "Υπάρχει κάτι που δεν λειτουργεί στο deemix; Ενημέρωσε μας!",
			contributing: 'Θέλετε να συμβάλλετε σε αυτό το πρότζεκτ; Μπορείτε να το κάνετε με διάφορους τρόπους!',
			donations: 'Θέλετε να συνεισφέρετε οικονομικά; Θα μπορούσατε να κάνετε μια δωρεά!'
		},
		usesLibrary: 'Αυτή η εφαρμογή χρησιμοποιεί τη βιβλιοθήκη <strong>deemix</strong>, την οποία μπορείτε να χρησιμοποιήσετε για να δημιουργήσετε το δικό σας περιβάλλον χρήστη για το deemix.',
		thanks: `Ευχαριστώ τους <strong>rtonno</strong>, <strong>uhwot</strong> και <strong>lollilol</strong> που με βοήθησαν σε αυτό το έργο και τον <strong>BasCurtiz</strong> για τη δημιουργία του εικονιδίου του deemix.`,
		upToDate: {
			text: `Μείνετε ενημερωμένοι ακολουθώντας το {newsChannel} στο Telegram.`,
			newsChannel: 'news channel'
		},
		officialWebsite: 'Επίσημη Ιστοσελίδα',
		officialRepo: 'Επίσημο Αποθετήριο Βιβλιοθήκης',
		officialWebuiRepo: 'Επίσημο Αποθετήριο WebUI',
		officialSubreddit: 'Επίσημο Subreddit',
		newsChannel: 'News Channel',
		devlogChannel: 'Devlog Channel',
		questions: {
			text: `Εάν έχετε ερωτήσεις ή προβλήματα με την εφαρμογή, αναζητήστε αρχικά μια λύση στο {subreddit}. Εάν δεν βρείτε τη λύση εκεί, μπορείτε να κάνετε μια ανάρτηση με το πρόβλημά σας στο subreddit.`,
			subreddit: 'subreddit'
		},
		beforeReporting: `Πριν αναφέρετε κάποιο σφάλμα, βεβαιωθείτε αρχικά ότι εκτελείτε την τελευταία έκδοση της εφαρμογής και ότι το συγκεκριμένο σφάλμα δεν είναι κάποιο πρόβλημα από πλευράς σας.`,
		beSure: `Βεβαιωθείτε ότι το σφάλμα συμβαίνει και σε άλλα μηχανήματα, πχ δοκιμάζοντας σε κάποιον άλλον υπολογιστή και <strong>ΜΗΝ</strong> αναφέρετε σφάλματα που έχουν ήδη αναφερθεί.`,
		duplicateReports: 'Οι διπλές αναφορές σφαλμάτων θα κλείνουν, οπότε έχετε το νου σας σε αυτό.',
		dontOpenIssues: `<strong>ΜΗΝ</strong> ανοίγετε ζητήματα για υποβολή απλών ερωτήσεων, υπάρχει subreddit για αυτό.`,
		newUI: {
			text: `Εάν χειρίζεστε άριστα την python, μπορείτε να δοκιμάσετε να δημιουργήσετε ένα νέο περιβάλλον χρήστη για την εφαρμογή χρησιμοποιώντας τη βασική βιβλιοθήκη ή να διορθώσετε σφάλματα στη βιβλιοθήκη με ένα pull request στο {repo}.`,
			repo: 'repo'
		},
		acceptFeatures: `Δέχομαι και επιπλέον λειτουργίες, αλλά όχι περίπλοκα πράγματα, έτσι ώστε να μπορούν να υλοποιηθούν απευθείας στην εφαρμογή και όχι στη βιβλιοθήκη.`,
		otherLanguages: `Εάν χειρίζεστε άριστα οποιαδήποτε άλλη γλώσσα προγραμματισμού, μπορείτε να προσπαθήσετε να μεταφέρετε το deemix σε αυτή τη γλώσσα!`,
		understandingCode: `Χρειάζεστε βοήθεια για την κατανόηση του κώδικα; Απλώς πατήστε το RemixDev στο Telegram ή το Reddit.`,
		contributeWebUI: {
			text: `Εάν γνωρίζετε Vue.js (JavaScript), HTML ή CSS, μπορείτε να συνεισφέρετε στο {webui}.`,
			webui: 'WebUI'
		},
		itsFree: `Πρέπει να έχετε υπόψιν ότι <strong>αυτό πρότζεκτ είναι δωρεάν</strong> και <strong>ότι θα πρέπει αρχικά να υποστηρίξετε τους καλλιτέχνες που αγαπάτε</strong> και μετά τους προγραμματιστές.`,
		notObligated: `Μην αισθάνεστε υποχρεωμένοι να κάνετε κάποια δωρεά, σας εκτιμώ ούτως ή άλλως!`,
		lincensedUnder: {
			text: `Αυτή η εργασία είναι αδειοδοτημένη βάσει του {gpl3}.`,
			gpl3: 'GNU General Public License 3.0'
		}
	},
	charts: {
		title: 'Διαγράμματα',
		changeCountry: 'Αλλαγή Χώρας',
		download: 'Λήψη Διαγράμματος'
	},
	errors: {
		title: 'Σφάλματα για {name}',
		postTitle: 'Μετά τη λήψη σφαλμάτων',
		ids: {
			invalidURL: 'Η διεύθυνση URL δεν αναγνωρίζεται',
			unsupportedURL: 'Η διεύθυνση URL δεν υποστηρίζεται ακόμη',
			ISRCnotOnDeezer: 'Το κομμάτι ISRC δεν είναι διαθέσιμο στο Deezer',
			notYourPrivatePlaylist: "Δεν μπορείτε να κατεβάσετε ιδιωτικές λίστες αναπαραγωγής άλλων.",
			spotifyDisabled: 'Οι δυνατότητες Spotify δεν έχουν ρυθμιστεί σωστά.',
			trackNotOnDeezer: 'Αυτό το κομμάτι δεν βρέθηκε στο Deezer!',
			albumNotOnDeezer: 'Αυτό το άλμπουμ δεν βρέθηκε στο Deezer!',
			notOnDeezer: 'Αυτό το κομμάτι δεν είναι διαθέσιμο στο Deezer!',
			notEncoded: 'Αυτό το κομμάτι δεν έχει κωδικοποιηθεί ακόμα!',
			notEncodedNoAlternative: 'Αυτό το κομμάτι δεν έχει κωδικοποιηθεί ακόμα και δεν βρέθηκε εναλλακτική λύση!',
			wrongBitrate: 'Αυτό το κομμάτι δεν βρέθηκε στο επιθυμητό bitrate.',
			wrongBitrateNoAlternative: 'Αυτό το κομμάτι δεν βρέθηκε στον επιθυμητό bitrate και δεν βρέθηκε εναλλακτική λύση!',
			no360RA: 'Αυτό το κομμάτι δεν είναι διαθέσιμο στο Reality Audio 360.',
			notAvailable: "Αυτό το κομμάτι δεν είναι διαθέσιμο στους διακομιστές του Deezer!",
			notAvailableNoAlternative: "Αυτό το κομμάτι δεν είναι διαθέσιμο στους διακομιστές του Deezer και δεν βρέθηκε εναλλακτική λύση!",
			noSpaceLeft: 'Δεν υπάρχει διαθέσιμος χώρος στη συσκευή!',
			albumDoesntExists: "Το άλμπουμ αυτού του κομματιού δεν υπάρχει, η συλλογή πληροφοριών απέτυχε.",
			wrongLicense: "Ο λογαριασμός σας δεν μπορεί να κάνει stream αυτό το κομμάτι με το επιθυμητό bitrate.",
			wrongGeolocation: "Ο λογαριασμός σας δεν μπορεί να κάνει stream αυτό το κομμάτι στην χώρα σας.",
			wrongGeolocationNoAlternative:
				"Ο λογαριασμός σας δεν μπορεί να μεταδώσει το συγκεκριμένο κομμάτι από την τρέχουσα χώρα και δεν βρέθηκε εναλλακτική πηγή."
		}
	},
	favorites: {
		title: 'Αγαπημένα',
		noPlaylists: 'Δεν Βρέθηκαν Λίστες Αναπαραγωγής',
		noAlbums: 'Δεν Βρέθηκαν Αγαπημένα Άλμπουμ',
		noArtists: 'Δεν Βρέθηκαν Αγαπημένοι Καλλιτέχνες',
		noTracks: 'Δεν Βρέθηκαν Αγαπημένα Κομμάτια'
	},
	home: {
		needTologin: 'Πρέπει να συνδεθείτε στον λογαριασμό σας Deezer προτού ξεκινήσετε τη λήψη.',
		openSettings: 'Άνοιγμα Ρυθμίσεων',
		sections: {
			popularPlaylists: 'Δημοφιλείς λίστες αναπαραγωγής',
			popularAlbums: 'Τα άλμπουμ με τις περισσότερες αναπαραγωγές'
		}
	},
	linkAnalyzer: {
		info: 'Μπορείτε να χρησιμοποιήσετε αυτήν την ενότητα για να βρείτε περισσότερες πληροφορίες σχετικά με τον σύνδεσμο που προσπαθείτε να κατεβάσετε.',
		useful:
			"Αυτό για παράδειγμα είναι χρήσιμο εάν προσπαθείτε να κατεβάσετε μερικά κομμάτια που δεν είναι διαθέσιμα στη χώρα σας και θέλετε να μάθετε πού είναι διαθέσιμα.",
		linkNotSupported: 'Αυτός ο σύνδεσμος δεν υποστηρίζεται ακόμη',
		linkNotSupportedYet: 'Φαίνεται ότι αυτός ο σύνδεσμος δεν υποστηρίζεται ακόμη, δοκιμάστε να αναλύσετε κάποιον άλλο.',
		table: {
			id: 'ID',
			isrc: 'ISRC',
			upc: 'UPC',
			duration: 'Διάρκεια',
			diskNumber: 'Αριθμός Δίσκου',
			trackNumber: 'Αριθμός Τραγουδιού',
			releaseDate: 'Ημερομηνία Κυκλοφορίας',
			bpm: 'BPM',
			label: 'Ετικέτα',
			recordType: 'Τύπος Εγγραφής',
			genres: 'Είδη',
			tracklist: 'Λίστα Κομματιών',
			readable: 'Αναγνώσιμο',
			available: 'Διαθέσιμο'
		},
		countries: 'Χώρες',
		noCountries: 'Αυτό το κομμάτι δεν είναι διαθέσιμο σε καμία χώρα.'
	},
	search: {
		startSearching: 'Έναρξη αναζήτησης!',
		description:
			'Μπορείτε να αναζητήσετε ένα κομμάτι, ένα ολόκληρο άλμπουμ, έναν καλλιτέχνη, μια λίστα αναπαραγωγής ή οτιδήποτε άλλο! Μπορείτε επίσης να επικολλήσετε έναν σύνδεσμο Deezer',
		fans: '{n} θαυμαστές',
		noResults: 'Δεν βρέθηκαν αποτελέσματα',
		noResultsTrack: 'Δεν βρέθηκαν κομμάτια',
		noResultsAlbum: 'Δεν βρέθηκαν άλμπουμ',
		noResultsArtist: 'Δεν βρέθηκαν καλλιτέχνες',
		noResultsPlaylist: 'Δεν βρέθηκαν λίστες αναπαραγωγής'
	},
	searchbar: 'Αναζητήστε οτιδήποτε θέλετε ή απλά επικολλήστε έναν σύνδεσμο',
	downloads: 'λήψεις',
	toasts: {
		restoringQueue: 'Επαναφορά της ουράς λήψης…',
		queueRestored: 'Η ουρά λήψης αποκαταστάθηκε!',
		addedToQueue: '{item} προστέθηκε στην ουρά',
		addedMoreToQueue: '{n} στοιχεία προστέθηκαν στην ουρά',
		alreadyInQueue: 'Το {item} είναι ήδη στην ουρά!',
		finishDownload: 'Η λήψη του {item} ολοκληρώθηκε.',
		allDownloaded: 'Όλες οι λήψεις ολοκληρώθηκαν!',
		refreshFavs: 'Η ανανέωση ολοκληρώθηκε!',
		loggingIn: 'Σύνδεση...',
		loggedIn: 'Συνδεδεμένος',
		alreadyLogged: 'Ήδη συνδεδεμένος',
		loginFailed: "Δεν ήταν δυνατή η σύνδεση",
		loggedOut: 'Αποσυνδεδεμένος',
		cancellingCurrentItem: 'Ακύρωση τρέχοντος στοιχείου.',
		currentItemCancelled: 'Το τρέχον στοιχείο ακυρώθηκε.',
		startAddingArtist: 'Προσθήκη άλμπουμ του καλλιτέχνη {artist} στην ουρά',
		finishAddingArtist: 'Προστέθηκαν άλμπουμ του καλλιτέχνη {artist} στην ουρά',
		startConvertingSpotifyPlaylist: 'Μετατροπή κομματιών spotify σε κομμάτια Deezer',
		finishConvertingSpotifyPlaylist: 'Η λίστα αναπαραγωγής Spotify μετατράπηκε',
		loginNeededToDownload: 'Πρέπει να συνδεθείτε για να κατεβάσετε κομμάτια!',
		deezerNotAvailable: 'Το Deezer δεν είναι διαθέσιμο στη χώρα σας. Θα πρέπει να χρησιμοποιήσετε κάποια VPN υπηρεσία.',
		startGeneratingItems: 'Επεξεργασία {n} στοιχείων...',
		finishGeneratingItems: 'Δημιουργήθηκαν {n} στοιχεία.',
		noLovedPlaylist: 'Δεν υπάρχει λίστα αναπαραγωγής αγαπημένων κομματιών!',
		checkingUpdates: 'Ελεγχος για ενημερώσεις...',
		noUpdateAvailable: 'Δεν βρέθηκαν ενημερώσεις',
		updateAvailable: 'Υπάρχει διαθέσιμη ενημέρωση!'
	},
	settings: {
		title: 'Ρυθμίσεις',
		languages: 'Γλώσσες',
		login: {
			title: 'Σύνδεση',
			loggedIn: 'Έχετε συνδεθεί ως {username}',
			arl: {
				title: 'Χρήση ARL',
				question: 'Πώς μπορώ να αποκτήσω το δικό μου ARL;',
				update: 'Ενημέρωση ARL'
			},
			logout: 'Αποσύνδεση',
			login: 'Σύνδεση',
			email: 'E-mail',
			password: 'Password'
		},
		appearance: {
			title: 'Εμφάνιση',
			slimDownloadTab: 'Λεπτή καρτέλα λήψης',
			slimSidebar: 'Λεπτή πλαϊνή μπάρα',
			searchButton: 'Εμφάνιση κουμπιού αναζήτησης',
			bitrateTags: 'Εμφάνιση ετικέτας ποιότητας στην ουρά λήψης'
		},
		downloadPath: {
			title: 'Διαδρομή Λήψεων'
		},
		templates: {
			title: 'Πρότυπα',
			tracknameTemplate: 'Πρότυπο ονόματος κομματιού',
			tracknameAvailableVariables: 'Διαθέσιμες μεταβλητές ονόματος κομματιού',
			albumTracknameTemplate: 'Πρότυπο άλμπουμ κομματιού',
			albumTracknameAvailableVariables: 'Διαθέσιμες μεταβλητές άλμπουμ κομματιού',
			playlistTracknameTemplate: 'Πρότυπο λίστας αναπαραγωγής κομματιού',
			playlistTracknameAvailableVariables: 'Διαθέσιμες μεταβλητές λίστας αναπαραγωγής κομματιών'
		},
		folders: {
			title: 'Φάκελοι',
			createPlaylistFolder: 'Δημιουργία φακέλου για λίστες αναπαραγωγής',
			playlistNameTemplate: 'Πρότυπο φακέλου λίστας αναπαραγωγής',
			createArtistFolder: 'Δημιουργία φακέλου για καλλιτέχνη',
			artistNameTemplate: 'Πρότυπο φακέλου καλλιτέχνη',
			createAlbumFolder: 'Δημιουργία φακέλου για άλμπουμ',
			albumNameTemplate: 'Πρότυπο φακέλου άλμπουμ',
			createCDFolder: 'Δημιουργία φακέλου για CDs',
			createStructurePlaylist: 'Δημιουργία δομής φακέλου για λίστες αναπαραγωγής',
			createSingleFolder: 'Δημιουργία δομής φακέλου για singles'
		},
		trackTitles: {
			title: 'Τίτλοι κομματιών',
			padTracks: 'Εισαγωγή (0) στην αρίθμηση κομματιών',
			paddingSize: 'Πλήθος μηδενικών',
			illegalCharacterReplacer: 'Αντικατάσταση μη επιτρεπόμενων χαρακτήρων'
		},
		downloads: {
			title: 'Λήψεις',
			queueConcurrency: 'Παράλληλες λήψεις',
			maxBitrate: {
				title: 'Προτιμώμενο Bitrate',
				9: 'FLAC 1411kbps',
				3: 'MP3 320kbps',
				1: 'MP3 128kbps'
			},
			overwriteFile: {
				title: 'Να αντικατασταθούν τα αρχεία;',
				y: 'Ναι, να αντικατασταθεί το αρχείο',
				n: "Όχι, να μην αντικατασταθεί το αρχείο",
				t: 'Να αντικατασταθούν μόνο τα tags',
				b: 'Όχι, να διατηρηθούν και τα δύο αρχεία και να προστεθεί αύξον αριθμός στο διπλότυπο',
				e: "Όχι, και να μην ληφθούν υπόψιν οι επεκτάσεις"
			},
			fallbackBitrate: 'Εναλλακτικό bitrate',
			fallbackSearch: 'Εναλλακτική αναζήτηση',
			fallbackISRC: 'Εναλλακτική αναζήτηση με ISRC',
			feelingLucky: 'Παίξτε με τα CDN και τις κρυφές μνήμες',
			logErrors: 'Να δημιουργηθούν αρχεία καταγραφής για σφάλματα',
			logSearched: 'Δημιουργία αρχείων καταγραφής για κομμάτια που έχουν αναζητηθεί',
			createM3U8File: 'Δημιουργία αρχείου λίστας αναπαραγωγής',
			syncedLyrics: 'Δημιουργία αρχείων .lyr (Συγχρονισμός στίχων)',
			playlistFilenameTemplate: 'Πρότυπο ονόματος αρχείου λίστας αναπαραγωγής',
			saveDownloadQueue: 'Αποθήκευση της ουράς λήψης κατά το κλείσιμο της εφαρμογής'
		},
		covers: {
			title: 'Εξώφυλλα άλμπουμ',
			saveArtwork: 'Αποθήκευση εξώφυλλων',
			coverImageTemplate: 'Πρότυπο ονόματος εξωφύλλου',
			saveArtworkArtist: 'Αποθήκευση εικόνας καλλιτέχνη',
			artistImageTemplate: 'Πρότυπο εικόνας καλλιτέχνη',
			localArtworkSize: 'Τοπικό μέγεθος εξωφύλλου',
			embeddedArtworkSize: 'Ενσωματωμένο μέγεθος εξωφύλλου',
			localArtworkFormat: {
				title: 'Μορφή τοπικού εξωφύλλου',
				jpg: 'Αρχείο εικόνας jpeg',
				png: 'Αρχείο εικόνας png',
				both: 'Αρχείο jpeg και png'
			},
			jpegImageQuality: 'Ποιότητα εικόνας JPEG',
			embeddedArtworkPNG: 'Αποθήκευση ενσωματωμένου εξωφύλλου σε ως PNG',
			embeddedPNGWarning: 'Τα αρχεία PNG δεν υποστηρίζονται επίσημα από το Deezer και μπορεί να αντιμετωπίσετε προβλήματα',
			imageSizeWarning: 'Οποιαδήποτε εικόνα πάνω από 1200 pixels δεν υποστηρίζονται επίσημα από το Deezer και μπορεί να αντιμετωπίσετε προβλήματα',
			coverDescriptionUTF8: 'Αποθήκευση περιγραφής εξωφύλλου χρησιμοποιώντας UTF8 (iTunes Cover Fix)'
		},
		tags: {
			head: 'Ποιες ετικέτες να αποθηκευθούν',
			title: 'Τίτλος',
			artist: 'Καλλιτέχνης',
			artists: 'Ετικέτα επιπλέον καλλιτεχνών',
			album: 'Άλμπουμ',
			cover: 'Εξώφυλλο',
			trackNumber: 'Αριθμός Κομματιού',
			trackTotal: 'Σύνολο Κομματιών',
			discNumber: 'Αριθμός Δίσκου',
			discTotal: 'Σύνολο Δίσκων',
			albumArtist: 'Καλλιτέχνης του Άλμπουμ',
			genre: 'Είδος',
			year: 'Χρονιά',
			date: 'Ημερομηνία',
			explicit: 'Ρητοί Στίχοι',
			isrc: 'ISRC',
			length: 'Διάρκεια Κομματιού',
			barcode: 'Barcode Άλμπουμ (UPC)',
			bpm: 'BPM',
			replayGain: 'Replay Gain',
			label: 'Ετικέτα Άλμπουμ',
			lyrics: 'Μη Συγχρονισμένοι Στίχοι',
			syncedLyrics: 'Συγχρονισμένοι Στίχοι',
			copyright: 'Copyright',
			composer: 'Συνθέτης',
			involvedPeople: 'Εμπλεκόμενοι',
			source: 'Πηγή και Αναγνωριστικό (ID) Κομματιού',
			artistsWarning:
				"Η απενεργοποίηση της ετικέτας επιπλέον καλλιτεχνών ενώ δεν χρησιμοποιείτε τυπικές προδιαγραφές δεν θα διατηρήσει την υποστήριξη πολλών καλλιτεχνών"
		},
		other: {
			title: 'Λοιπά',
			autoCheckForUpdates: 'Έλεγχος για ενημερώσεις κατά την εκκίνηση',
			savePlaylistAsCompilation: 'Αποθήκευση λιστών αναπαραγωγής ως συλλογή',
			useNullSeparator: 'Χρήση μηδενικού διαχωριστικού',
			saveID3v1: 'Αποθηκεύσει του ID3v1',
			multiArtistSeparator: {
				title: 'Πώς θα θέλατε να χωρίσετε τους αγαπημένους σας καλλιτέχνες;',
				nothing: 'Αποθήκευση μόνο του κύριου καλλιτέχνη',
				default: 'Χρηση τυπικών προδιαγραφών',
				andFeat: 'Χρήση του συμβόλου (&) και της ένδειξης (feat.)',
				using: 'Χρήση "{separator}"',
				warning:
					'Η χρήση οποιουδήποτε διαχωριστικού εκτός από την τυπική προδιαγραφή θα προσθέσει μια επιπλέον ετικέτα επιπλέον καλλιτεχνών για να διατηρήσει την υποστήριξη πολλών καλλιτεχνών'
			},
			singleAlbumArtist: 'Αποθηκεύστε μόνο τον κύριο καλλιτέχνη του άλμπουμ',
			albumVariousArtists: 'Κρατήστε τα άλμπουμ διάφορων καλλιτεχνών στα άλμπουμ καλλιτεχνών',
			removeAlbumVersion: 'Κατάργηση της έκδοσης του άλμπουμ από τον τίτλο του κομματιού',
			removeDuplicateArtists: 'Κατάργηση των συνδυασμών των καλλιτεχνών',
			dateFormat: {
				title: 'Μορφή ημερομηνίας για αρχεία FLAC',
				year: 'ΕΕΕΕ',
				month: 'ΜΜ',
				day: 'ΗΗ'
			},
			featuredToTitle: {
				title: 'Τι να γίνεται με τους διακεκριμένους καλλιτέχνες (feat.)',
				0: 'Τίποτα',
				1: 'Αφαίρεση από τον τίτλο',
				3: 'Κατάργηση από τον τίτλο του κομματιού και τον τίτλο του άλμπουμ',
				2: 'Μετακίνηση στον τίτλο'
			},
			titleCasing: 'Περίβλημα τίτλου',
			artistCasing: 'Περίβλημα καλλιτέχνη',
			casing: {
				nothing: 'Να μείνει αμετάβλητο',
				lower: 'Όλα πεζά',
				upper: 'Όλα κεφαλαία',
				start: 'Κεφαλαίο το πρώτο γράμμα κάθε λέξης',
				sentence: 'Σαν μια πρόταση'
			},
			previewVolume: 'Ένταση προεπισκόπησης',
			executeCommand: {
				title: 'Εντολή για εκτέλεση μετά τη λήψη',
				description: 'Αφήστε κενό για καμία ενέργεια'
			}
		},
		spotify: {
			title: 'Χαρακτηριστικά Spotify',
			clientID: 'Spotify ClientID',
			clientSecret: 'Spotify Client Secret',
			username: 'Spotify Username',
			question: 'Πώς μπορώ να ενεργοποιήσω τις δυνατότητες Spotify;'
		},
		reset: 'Επαναφορά στις προεπιλεγμένες ρυθμίσεις',
		resetMessage: 'Είστε βέβαιοι ότι θέλετε να επιστρέψετε στις προεπιλεγμένες ρυθμίσεις;',
		save: 'Αποθήκευση',
		toasts: {
			init: 'Οι ρυθμίσεις φορτώθηκαν!',
			update: 'Οι ρυθμίσεις ενημερώθηκαν!',
			reset: 'Οι ρυθμίσεις επαναφερθήκαν!',
			ARLcopied: 'Το ARL αντιγράφηκε'
		},
		logs: {
			title: 'Αρχεία Καταγραφής',
			areLogsActive: 'Ενεργοποιημένα'
		}
	},
	sidebar: {
		home: 'αρχική',
		search: 'αναζήτηση',
		charts: 'διαγράμματα',
		favorites: 'αγαπημένα',
		linkAnalyzer: 'αναλυτής συνδέσμου',
		settings: 'ρυθμίσεις',
		logs: 'αρχεία καταγραφής',
		about: 'σχετικά με'
	},
	tracklist: {
		downloadSelection: 'Λήψη επιλεγμένων'
	},
	logs: {
		event: 'Συμβάν',
		data: 'Δεδομένα'
	}
}

export default gr
