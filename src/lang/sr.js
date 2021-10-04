const sr = {
	globals: {
		welcome: 'Добродошли у deemix',
		back: 'назад',
		loading: 'Учитавам',
		download: 'Преузми {thing}',
		by: '{artist}',
		in: 'на {album}',
		download_hint: 'Преузми',
		play_hint: 'Репродукуј',
		toggle_download_tab_hint: 'Рашири/Скупи',
		clean_queue_hint: 'Склони завршено',
		cancel_queue_hint: 'Откажи све',
		open_downloads_folder: 'Отвори Downloads фолдер',
		cut: 'исеци',
		copy: 'копирај',
		copyLink: 'копирај линк',
		copyImageLink: 'копирај линк до слике',
		copyDeezerLink: 'копирај deezer линк',
		paste: 'налепи',
		listTabs: {
			empty: '',
			all: 'све',
			top_result: 'најбољи резултат',
			album: 'албум | албуме',
			artist: 'извођача | извођаче',
			single: 'сингл | синглове',
			title: 'наслов | наслове',
			track: 'песму | песме',
			releaseN: '0 издања | {n} издање | {n} издања',
			playlist: 'плејлисту | плејлисте',
			compile: 'компилацију | компилације',
			ep: 'еп | еп-ови',
			bundle: 'bundle | bundle-ови',
			more: 'Још албума',
			featured: 'Појављује се у',
			spotifyPlaylist: 'Spotify плејлисту | Spotify плејлисте',
			releaseDate: 'датум издавања',
			error: 'грешка',
			trackN: '0 песама | {n} песма | {n} песама',
			albumN: '0 албума | {n} албум | {n} албума',
			artistN: '0 извођача | {n} извођач | {n} извођача',
			playlistN: '0 плејлисти | {n} плејлиста | {n} плејлисти'
		}
	},
	about: {
		appStatus: {
			online: 'апликација је на мрежи',
			offline: 'апликација је ван мреже'
		},
		updates: {
			currentVersion: 'Тренутна верзија',
			currentWebuiVersion: 'Тренутна WebUI верзија',
			versionNotAvailable: 'N/A',
			updateAvailable: `Немате најновије доступну верзију: {version}`,
			deemixVersion: 'Верзија deemix библиотеке'
		},
		titles: {
			usefulLinks: 'Корисни линкови',
			bugReports: 'Пријављивање грешака',
			contributing: 'Доприноси',
			donations: 'Донације',
			license: 'Лиценца'
		},
		subtitles: {
			bugReports: 'Да ли нешто не ради у deemix-у? Обавестите нас!',
			contributing: 'Желите да допринесете овом пројекту? Постоји више начина да то урадите!',
			donations: 'Желите да допринесете новчано? Можете да нам донирате!'
		},
		usesLibrary:
			'Ова апликација користи <strong>deemix</strong> библиотеку, коју можете да користите да направите свој кориснички интерфејс за deemix.',
		thanks: `Хвала корисницима <strong>rtonno</strong>, <strong>uhwot</strong> и <strong>lollilol</strong> што су ми помогли на овом пројекту и хвала кориснику <strong>BasCurtiz</strong> што је направио иконицу.`,
		upToDate: {
			text: `Останите у току са најновијим вестима преко нашег {newsChannel} на апликацији Телеграм.`,
			newsChannel: 'канала са новостима'
		},
		officialWebsite: 'Званични вебсајт',
		officialRepo: 'Званични репозиторијум библиотеке',
		officialWebuiRepo: 'Званични репозиторијум WebUI-а',
		officialSubreddit: 'Званични подредит',
		newsChannel: 'Канал са новостима',
		questions: {
			text: `Уколико имате питања или проблеме са апликацијом, потражите прво решење на {subreddit}. Након тога, уколико нисте нашли одговор, можете да направите нови пост са описом проблема на подредиту.`,
			subreddit: 'подредиту'
		},
		beforeReporting: `Пре него што пријавите грешку, проверите да ли имате најновију верзију апликације. Такође, постарајте се да то што желите да пријавите не представља неку грешку која се јавља само код вас.`,
		beSure: `Проверите да ли се грешка може репродуковати на другим уређајима. <strong>НЕМОЈТЕ</strong> да пријављујете грешку уколико је већ пријављена.`,
		duplicateReports: 'Дупликати пријављених грешака биће затворени, обратите пажњу на то.',
		dontOpenIssues: `<strong>НЕМОЈТЕ</strong> да отварате issue да бисте поставили питање, постоји подредит за ту намену.`,
		newUI: {
			text: `Уколико знате Пајтон, можете да пробате да направите нови UI за апликацију користећи основну библиотеку, или да исправите багове у библиотеци слањем pull request-a на {repo}.`,
			repo: 'репозиторијум'
		},
		acceptFeatures: `Прихватам и нове опције, уколико нису превише сложене, које се могу имплементирати у апликацији а не библиотеци.`,
		otherLanguages: `Уколико знате неки други програмски језик, можете да пробате да портујете deemix на други програмски језик!`,
		understandingCode: `Треба вам помоћ да разумете код? Потражите RemixDev на Телеграму или Редиту.`,
		contributeWebUI: {
			text: `Ако знате Vue.js (JavaScript), HTML или CSS, можете да допринесете {webui}-у.`,
			webui: 'WebUI'
		},
		itsFree: `Имајте на уму да је ово <strong>бесплатни пројекат</strong> и да би требало да <strong>подржите извођаче које волите</strong> пре него да подржите програмере.`,
		notObligated: `Не осећајте обавезу да донирате, свакако вас ценим!`,
		lincensedUnder: {
			text: `Ова апликација је објављена под лиценцом {gpl3}.`,
			gpl3: 'GNU General Public License 3.0'
		}
	},
	charts: {
		title: 'Топ листе',
		changeCountry: 'Промени земљу',
		download: 'Преузми топ листу'
	},
	errors: {
		title: 'Грешке за {name}',
		ids: {
			invalidURL: 'URL није препознат',
			unsupportedURL: 'URL још није подржан',
			ISRCnotOnDeezer: 'ISRC наслова није доступан на Deezer-у',
			notYourPrivatePlaylist: 'Не можете да преузмете туђе приватне плејлисте',
			spotifyDisabled: 'Spotify опције нису исправно подешене.',
			trackNotOnDeezer: 'Песма није пронађена на Deezer-у!',
			albumNotOnDeezer: 'Албум није пронађен на Deezer-у!',
			notOnDeezer: 'Песма није доступна на Deezer-у!',
			notEncoded: 'Песма још није енкодирана!',
			notEncodedNoAlternative: 'Песма још није енкодирана и нема пронађених алтернатива!',
			wrongBitrate: 'Нисам пронашао песму у жељеном битрејту.',
			wrongBitrateNoAlternative: 'Нисам пронашао песму у жељеном битрејту и нема пронађених алтернатива!',
			no360RA: 'Песма није доступна у Reality Audio 360.',
			notAvailable: 'Песна није доступна на Deezer-овим серверима!',
			notAvailableNoAlternative: 'Песна није доступна на Deezer-овим серверима и нема пронађених алтернатива!',
			noSpaceLeft: 'Нема више слободног простора на уређају!',
			albumDoesntExists: 'Албум песме не постоји, нисам успео да прикупим информације.',
			wrongLicense: 'Ваш налог не може да стримује песму у жељеном битрејту.',
			wrongGeolocation: 'Ваш налог не може да стримује песму из тренутне земље.'
		}
	},
	favorites: {
		title: 'Омиљено',
		noPlaylists: 'Нема плејлисти',
		noAlbums: 'Нема омиљених албума',
		noArtists: 'Нема омиљених извођача',
		noTracks: 'Нема омиљених наслова'
	},
	home: {
		needTologin: 'Морате да се пријавите на свој Deezer налог пре него што кренете са преузимањем.',
		openSettings: 'Отвори Подешавања',
		sections: {
			popularPlaylists: 'Популарне плејлисте',
			popularAlbums: 'Најслушанији албуми'
		}
	},
	linkAnalyzer: {
		info: 'Можете да користе ову секцију да сазнате више информација о линку који желите да преузмете.',
		useful:
			'Ово можете бити корисно уколико желите да преузмете неке песме које нису доступне у вашој земљи а желите да сазнате са којих локација су доступне.',
		linkNotSupported: 'Овај линк још није подржан',
		linkNotSupportedYet: 'Изгледа да овај линк још није подржан, пробајте да анализирате неки други.',
		table: {
			id: 'ID',
			isrc: 'ISRC',
			upc: 'UPC',
			duration: 'Трајање',
			diskNumber: 'Број диска',
			trackNumber: 'Број песме',
			releaseDate: 'Датум објављивања',
			bpm: 'BPM',
			label: 'Издавачка кућа',
			recordType: 'Record Type',
			genres: 'Жанрови',
			tracklist: 'Tracklist'
		}
	},
	search: {
		startSearching: 'Започните претрагу!',
		description:
			'Можете да тражите песму, цео албум, извођача, плејлисту.... било шта! Можете и да налепите Deezer линк',
		fans: '{n} фанова',
		noResults: 'Нема резултата',
		noResultsTrack: 'Нема пронађених песама',
		noResultsAlbum: 'Нема пронађених албума',
		noResultsArtist: 'Нема пронађених извођача',
		noResultsPlaylist: 'Нема пронађених плејлисти'
	},
	searchbar: 'Претражите било шта (или налепите линк)',
	downloads: 'преузимања',
	toasts: {
		restoringQueue: 'Обнављам ред за преузимање...',
		queueRestored: 'Ред за преузимање је обновљен!',
		addedToQueue: '{item} - додато у ред',
		addedMoreToQueue: '{n} ставке(и) додате у ред',
		alreadyInQueue: '{item} је већ у реду!',
		finishDownload: '{item} - завршено преузимање.',
		allDownloaded: 'Сва преузимања су завршена!',
		refreshFavs: 'Освежавање завршено!',
		loggingIn: 'Пријављивање...',
		loggedIn: 'Пријављени',
		alreadyLogged: 'Већ сте пријављени',
		loginFailed: 'Нисам могао да вас пријавим',
		loggedOut: 'Одјављени',
		cancellingCurrentItem: 'Отказујем тренутну ставку.',
		currentItemCancelled: 'Тренутно ставка отказана.',
		startAddingArtist: 'Додајем албуме извођача {artist} у ред',
		finishAddingArtist: 'Додао албуме извођача {artist} у ред',
		startConvertingSpotifyPlaylist: 'Конвертујем Spotify песме у Deezer пезме',
		finishConvertingSpotifyPlaylist: 'Spotify плејлиста је конвертована',
		loginNeededToDownload: 'Морате да се пријавите да бисте преузели песме!',
		deezerNotAvailable: 'Deezer није доступан у вашој земљи. Требало би да користите VPN.',
		startGeneratingItems: 'Обрађујем {n} ставки...',
		finishGeneratingItems: 'Генерисао {n} ставки.'
	},
	settings: {
		title: 'Подешавања',
		languages: 'Језици',
		login: {
			title: 'Пријављивање',
			loggedIn: 'Пријављени сте као {username}',
			arl: {
				question: 'Како да набавим свој ARL?',
				update: 'Ажурирај ARL'
			},
			logout: 'Одјава',
			login: 'Пријава преко deezer.com'
		},
		loginWithCredentials: {
			title: 'Пријава имејлом и шифром',
			login: 'Пријава'
		},
		appearance: {
			title: 'Приказ',
			slimDownloadTab: 'Танки таб за преузимање',
			slimSidebar: 'Танка бочна трака'
		},
		downloadPath: {
			title: 'Путања за смештање преузетих фајлова'
		},
		templates: {
			title: 'Шаблони',
			tracknameTemplate: 'Шаблон имена песме',
			tracknameAvailableVariables: 'Доступне променљиве за име песме',
			albumTracknameTemplate: 'Шаблон имена албума',
			albumTracknameAvailableVariables: 'Доступне променљиве за албум',
			playlistTracknameTemplate: 'Шаблон имена плејлисте',
			playlistTracknameAvailableVariables: 'Доступне променљиве за плејлисту'
		},
		folders: {
			title: 'Фолдери',
			createPlaylistFolder: 'Направи фолдер за плејлисте',
			playlistNameTemplate: 'Шаблон фолдера за плејлисте',
			createArtistFolder: 'Направи фолдер за извођача',
			artistNameTemplate: 'Шаблон фолдера за извођача',
			createAlbumFolder: 'Направи фолдер за албум',
			albumNameTemplate: 'Шаблон фолдера за албум',
			createCDFolder: 'Направи фолдер за CD-ове',
			createStructurePlaylist: 'Направи низ фолдера за плејлисте',
			createSingleFolder: 'Направи низ фолдера за синглове'
		},
		trackTitles: {
			title: 'Наслови песама',
			padTracks: 'Pad tracks',
			paddingSize: 'Overwrite padding size',
			illegalCharacterReplacer: 'Замена нелегалних знакова'
		},
		downloads: {
			title: 'Преузимања',
			queueConcurrency: 'Број истовремених преузимања',
			maxBitrate: {
				title: 'Жељени битрејт',
				9: 'FLAC 1411kbps',
				3: 'MP3 320kbps',
				1: 'MP3 128kbps'
			},
			overwriteFile: {
				title: 'Да ли да прегазим постојеће фајлове?',
				y: 'Да, прегази фајл',
				n: 'Не, немој да прегазиш фајл',
				t: 'Препиши само тагове',
				b: 'Не, задржи оба фајла и додај број дупликату',
				e: 'Не, и не гледај екстензије'
			},
			fallbackBitrate: 'Bitrate fallback',
			fallbackSearch: 'Search fallback',
			logErrors: 'Направи фајл са извештајем о грешкама',
			logSearched: 'Направи фајл са извештајем о претраживаним песмама',
			createM3U8File: 'Направи фајл за плејлисту',
			syncedLyrics: 'Направи .lyr фајлове (Sync Lyrics)',
			playlistFilenameTemplate: 'Шаблон за фајл за плејлисте',
			saveDownloadQueue: 'Сними ред за преузимање приликом затварања апликације'
		},
		covers: {
			title: 'Омоти албума',
			saveArtwork: 'Сними омоте',
			coverImageTemplate: 'Шаблон за име омота',
			saveArtworkArtist: 'Сачувај слику извођача',
			artistImageTemplate: 'Шаблон за слику извођача',
			localArtworkSize: 'Величина локалних слика',
			embeddedArtworkSize: 'Величина уграђених слика',
			localArtworkFormat: {
				title: 'У ком формату желите да снимите локалне слике?',
				jpg: 'JPEG слика',
				png: 'PNG слика',
				both: 'И JPEG и PNG'
			},
			jpegImageQuality: 'Квалитет JPEG слике',
			embeddedArtworkPNG: 'Сними уграђене слике као PNG',
			embeddedPNGWarning: 'Deezer нема званичну подршку за PNG формат па може доћи до багова',
			imageSizeWarning: 'Deezer не подржава све изнад x1200, може доћи до грешака',
			coverDescriptionUTF8: 'Сачувај опис омота као UTF8 (iTunes Cover Fix)'
		},
		tags: {
			head: 'Које тагове да сачувам',
			title: 'Наслов',
			artist: 'Извођач',
			album: 'Албум',
			cover: 'Омот албума',
			trackNumber: 'Број песме',
			trackTotal: 'Укупно песама',
			discNumber: 'Број диска',
			discTotal: 'Укупно дискова',
			albumArtist: 'Извођач албума',
			genre: 'Жанр',
			year: 'Година',
			date: 'Датум',
			explicit: 'Експлицитан текст',
			isrc: 'ISRC',
			length: 'Дужина песме',
			barcode: 'Баркод албума (UPC)',
			bpm: 'BPM',
			replayGain: 'Replay Gain',
			label: 'Издавачка кућа',
			lyrics: 'Несинхронизован текст песме',
			syncedLyrics: 'Синхронизован текст песме',
			copyright: 'Ауторска права',
			composer: 'Композитор',
			involvedPeople: 'Укључени људи',
			source: 'Порекло и ID песме'
		},
		other: {
			title: 'Остало',
			savePlaylistAsCompilation: 'Сачувај плејлисте као компилације',
			useNullSeparator: 'Користи null сепаратор',
			saveID3v1: 'Сними и ID3v1',
			multiArtistSeparator: {
				title: 'Како желите да раздвојите више извођача?',
				nothing: 'Сними само главног извођача',
				default: 'Користећи стандардну спецификацију',
				andFeat: 'Користећи & и feat.',
				using: "Користећи '{separator}'"
			},
			singleAlbumArtist: 'Сними само име главног извођача на албуму',
			albumVariousArtists: "Задржи 'Various Artists' као извођаче на албуму",
			removeAlbumVersion: "Уклони 'Album Version' из наслова песме",
			removeDuplicateArtists: 'Уклони комбинацију извођача',
			dateFormat: {
				title: 'Формат датума за FLAC фајлове',
				year: 'ГГГГ',
				month: 'ММ',
				day: 'ДД'
			},
			featuredToTitle: {
				title: 'Шта да урадим са истакнутим извођачима?',
				0: 'Ништа',
				1: 'Уклони их из имена песме',
				3: 'Уклони их из имена песме и албума',
				2: 'Премести их у наслов'
			},
			titleCasing: 'Величина слова наслова',
			artistCasing: 'Величина слова извођача',
			casing: {
				nothing: 'Остави непромењено',
				lower: 'малим словима',
				upper: 'ВЕЛИКИМ СЛОВИМА',
				start: 'Почетак Сваке Речи Великим Словима',
				sentence: 'Као у реченици'
			},
			previewVolume: 'Јачина звука за преслушавање',
			executeCommand: {
				title: 'Команда коју да извршим након преузимања',
				description: 'Оставите празно за неизвршавање акције'
			}
		},
		spotify: {
			title: 'Spotify опције',
			clientID: 'Spotify ClientID',
			clientSecret: 'Spotify Client Secret',
			username: 'Spotify корисничко име',
			question: 'Како да омогућим Spotify опције?'
		},
		reset: 'Врати на почетне вредности',
		resetMessage: 'Да ли сте сигурни да желите да се вратите на почетне вредности?',
		save: 'Сними',
		toasts: {
			init: 'Подешавања учитана!',
			update: 'Подешавања ажурирана!',
			reset: 'Подешавања враћена на почетне вредности!',
			ARLcopied: 'ARL копиран у оставу'
		},
		logs: {
			title: 'Дневници',
			areLogsActive: 'Укључени'
		}
	},
	sidebar: {
		home: 'почетна',
		search: 'претрага',
		charts: 'топ листе',
		favorites: 'омиљено',
		linkAnalyzer: 'анализа линкова',
		settings: 'подешавања',
		logs: 'дневници',
		about: 'о програму'
	},
	tracklist: {
		downloadSelection: 'Преузми одабрано'
	},
	logs: {
		event: 'Догађај',
		data: 'Подаци'
	}
}

export default sr
