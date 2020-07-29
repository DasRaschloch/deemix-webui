const ru = {
	globals: {
		welcome: 'Добро пожаловать в deemix',
		back: 'назад',
		loading: 'загрузка',
		download: 'Скачать {0}',
		by: '{0}',
		in: 'из {0}',
		download_hint: 'Скачать',
		play_hint: 'Прослушать',
		toggle_download_tab_hint: 'Показать/Свернуть',
		clean_queue_hint: 'Очистить завершённые',
		cancel_queue_hint: 'Очистить всё',
		listTabs: {
			empty: '',
			all: 'все',
			top_result: 'лучший результат',
			album: 'альбом | альбомы',
			artist: 'исполнитель | исполнители',
			single: 'сингл | синглы',
			title: 'название | названия',
			track: 'трек | треки',
			trackN: '0 треков | {n} трек | {n} трека | {n} треков',
			releaseN: '0 релизов | {n} релиз | {n} релиза | {n} релизов',
			playlist: 'плейлист | плейлисты',
			compile: 'сборник | сборники',
			ep: 'ep | eps',
			spotifyPlaylist: 'плейлисты spotify | плейлисты spotify',
			releaseDate: 'Дата выхода',
			error: 'ошибка'
		}
	},
	about: {
		titles: {
			usefulLinks: 'Полезные ссылки',
			bugReports: 'Отчёты об ошибках',
			contributing: 'Помощь проекту',
			donations: 'Пожертвования',
			license: 'Лицензия'
		},
		subtitles: {
			bugReports: "Что-то не работает? Скажите нам!",
			contributing: 'Хотите поддержать проект? Это можно сделать разными способами!',
			donations: 'Хотите поддержать материально? Можно сделать пожертвование!'
		},
		usesLibrary: 'Приложение использует библиотеку <strong>deemix</strong>, с помощью которой вы можете сделать собственный UI deemix.',
		thanks: `Спасибо <strong>rtonno</strong>, <strong>uhwot</strong> и <strong>lollilol</strong> за помощь с этим проектом, а также <strong>BasCurtiz</strong> и <strong>scarvimane</strong> за иконку.`,
		upToDate: `Следите за последними обновлениями на <a href="https://t.me/RemixDevNews" target="_blank">канале</a> в Telegram.`,
		officialWebsite: 'Официальный сайт',
		officialRepo: 'Официальный репозиторий библиотеки',
		officialWebuiRepo: 'Официальный репозиторий WebUI',
		officialSubreddit: 'Официальный сабреддит',
		newsChannel: 'Канал новостей',
		questions: `Если у вас возникли вопросы или проблемы с приложением, поищите решение на <a href="https://www.reddit.com/r/deemix" target="_blank">сабреддите</a>. Если решения не нашли, можете создать новый пост и описать вашу проблему.`,
		beforeReporting: `Перед тем, как сообщать об ошибках, убедитесь, что у вас стоит последняя версия приложения и что проблема не на вашей стороне.`,
		beSure: `Убедитесь, что ошибка возникает и на других устройствах. Также <strong>НЕ </strong> сообщайте об ошибке, если про неё уже известно.`,
		duplicateReports: 'Повторные сообщения об ошибках рассматриваться не будут.',
		dontOpenIssues: `<strong>НЕ НАДО</strong> создавать задачу с простым вопросом, для этого есть сабреддит.`,
		newUI: `Если вы хорошо знаете python, то можете сделать новый UI для приложения с использованием базовой библиотеки или пофиксить в ней баги и сделать pull request в <a href="https://codeberg.org/RemixDev/deemix" target="_blank">репозитории</a>.`,
		acceptFeatures: `Новые фичи также приветствуются, но не слишком сложные, так как они будут добавлены в приложение, а не в саму библиотеку.`,
		otherLanguages: `Если вы хорошо знаете другой язык программирования, можете портировать на нём deemix!`,
		understandingCode: `Не можете разобраться в коде? Напишите RemixDev в Telegram или на Reddit.`,
		contributeWebUI: `Если вы знаете Vue.js (JavaScript), HTML или CSS, можете внести вклад в <a href="https://codeberg.org/RemixDev/deemix-webui" target="_blank">WebUI</a>.`,
		itsFree: `Помните, что это <strong>бесплатное приложение</strong> и вам следует <strong>поддерживать исполнителей</strong>, которые вам нравятся прежде, чем поддерживать разработчиков.`,
		notObligated: `Вы не обязаны делать пожертвования, я всё равно вас ценю!`,
		lincensedUnder: `Проект распространяется на условиях лицензии
			<a rel="license" href="https://www.gnu.org/licenses/gpl-3.0.en.html" target="_blank"
				>GNU General Public License 3.0</a
			>.`
	},
	charts: {
		title: 'Чарты',
		changeCountry: 'Изменить страну',
		download: 'Скачать чарт'
	},
	errors: {
		title: 'Ошибки {0}',
		ids: {
			invalidURL: 'URL не распознан',
			unsupportedURL: 'URL не поддерживается',
			ISRCnotOnDeezer: 'ISRC трека недоступен на deezer',
			notYourPrivatePlaylist: "Нельзя скачивать чужие плейлисты.",
			spotifyDisabled: 'Неправильно настроены параметры Spotify.',
			trackNotOnDeezer: 'Трек не найден на deezer!',
			albumNotOnDeezer: 'Альбом не найден deezer!',
			notOnDeezer: 'Трек недоступен на Deezer!',
			notEncoded: 'Трек ещё не перекодирован!',
			notEncodedNoAlternative: 'Трек не перекодирован, альтернатив не найдено!',
			wrongBitrate: 'Не найден трек с нужным битрейтом.',
			wrongBitrateNoAlternative: 'Не найден трек с нужным битрейтом. Альтернатив не найдено!',
			no360RA: 'Трек недоступен в Reality Audio 360.',
			notAvailable: "Трек недоступен на серверах deezer!",
			notAvailableNoAlternative: "Трек недоступен на серверах deezer. Альтернатив не найдено!"
		}
	},
	favorites: {
		title: 'Избранное',
		noPlaylists: 'Плейлисты не найдены',
		noAlbums: 'Избранные альбомы не найдены',
		noArtists: 'Избранные исполнители не найдены',
		noTracks: 'Избранные треки не найдены'
	},
	home: {
		needTologin: 'Вам нужно зайти под своим аккаунтом Deezer прежде, чем скачивать.',
		openSettings: 'Открыть настройки',
		sections: {
			popularPlaylists: 'Популярные плейлисты',
			popularAlbums: 'Самые прослушиваемые альбомы'
		}
	},
	linkAnalyzer: {
		info: 'Используйте этот раздел, чтобы узнать информацию о ссылке, по которой вы хотите скачать.',
		useful:
			"Этот раздел нужен, если вы хотите скачать треки, недоступные в вашей стране, а также посмотреть, где они доступны.",
		linkNotSupported: 'Ссылка не поддерживается',
		linkNotSupportedYet: 'Эта ссылка не поддерживается, попробуйте вставить другую.',
		table: {
			id: 'ID',
			isrc: 'ISRC',
			upc: 'UPC',
			duration: 'Продолжительность',
			diskNumber: 'Номер диска',
			trackNumber: 'Номер трека',
			releaseDate: 'Дата выхода',
			bpm: 'BPM',
			label: 'Издатель',
			recordType: 'Тип',
			genres: 'Жанр',
			tracklist: 'Треклист'
		}
	},
	search: {
		startSearching: 'Начните искать!',
		description:
			'Здесь можно найти трек, альбом, исполнителя, плейлист... всё! Можно также вставить ссылку Deezer',
		fans: '{0} поклонников',
		noResults: 'Нет результатов',
		noResultsTrack: 'Треков не найдено',
		noResultsAlbum: 'Альбомов не найдено',
		noResultsArtist: 'Исполнителей не найдено',
		noResultsPlaylist: 'Плейлистов не найдено'
	},
	searchbar: 'Ищите, что хотите (или вставьте ссылку)',
	downloads: 'загрузки',
	toasts: {
		addedToQueue: '{0} добавлено в очередь',
		alreadyInQueue: '{0} уже есть в очереди!',
		finishDownload: '{0} загрузок завершено.',
		allDownloaded: 'Все загрузки завершены!',
		refreshFavs: 'Обновление завершено!',
		loggingIn: 'Вход',
		loggedIn: 'Вход выполнен',
		alreadyLogged: 'Вход уже выполнен',
		loginFailed: "Вход не выполнен",
		loggedOut: 'Вы вышли из аккаунта',
		cancellingCurrentItem: 'Отмена закачки.',
		currentItemCancelled: 'Отменено.',
		startAddingArtist: 'Добавление {0} альбомов в очередь',
		finishAddingArtist: 'Добавлено {0} альбомов в очередь',
		startConvertingSpotifyPlaylist: 'Преобразование треков из spotify в deezer',
		finishConvertingSpotifyPlaylist: 'Преобразование Spotify playlist converted'
	},
	settings: {
		title: 'Настройки',
		languages: 'Язык',
		login: {
			title: 'Вход',
			loggedIn: 'Вы вошли как {username}',
			arl: {
				question: 'Как узнать свой ARL?',
				update: 'Обновить ARL'
			},
			logout: 'Выйти'
		},
		appearance: {
			title: 'Внешний вид',
			slimDownloadTab: 'Компактная вкладка с загрузками'
		},
		downloadPath: {
			title: 'Путь сохранения'
		},
		templates: {
			title: 'Шаблоны',
			tracknameTemplate: 'Шаблон названия трека',
			albumTracknameTemplate: 'Шаблон названия трека альбома',
			playlistTracknameTemplate: 'Шаблон названия трека плейлиста'
		},
		folders: {
			title: 'Папки',
			createPlaylistFolder: 'Создавать папки для плейлистов',
			playlistNameTemplate: 'Название папки плейлиста',
			createArtistFolder: 'Создавать папки для исполнителя',
			artistNameTemplate: 'Название папки исполнителя',
			createAlbumFolder: 'Создавать папки для альбома',
			albumNameTemplate: 'Название папки альбома',
			createCDFolder: 'Создавать папки для CD',
			createStructurePlaylist: 'Создавать структуру папок для плейлистов',
			createSingleFolder: 'Создавать структуру папок для синглов'
		},
		trackTitles: {
			title: 'Названия треков',
			padTracks: 'Добавлять нули',
			paddingSize: 'Количество цифр',
			illegalCharacterReplacer: 'Замена для запрещённых символов'
		},
		downloads: {
			title: 'Загрузки',
			queueConcurrency: 'Количество одновременных закачек',
			maxBitrate: {
				title: 'Предпочитаемый битрейт',
				9: 'FLAC 1411kbps',
				3: 'MP3 320kbps',
				1: 'MP3 128kbps'
			},
			overwriteFile: {
				title: 'Нужно ли перезаписывать файлы?',
				y: 'Да, перезаписать файл',
				n: "Нет, не перезаписывать",
				t: 'Обновить только теги'
			},
			fallbackBitrate: 'Скачивать с низким битрейтом, если текущий недоступен',
			fallbackSearch: 'Искать похожий трек, если нужный недоступен',
			logErrors: 'Сохранять логи ошибок',
			logSearched: 'Сохранять лог истории поиска',
			createM3U8File: 'Создавать файлы плейлистов',
			syncedLyrics: 'Создавать .lyr файлы (синхронизированная лирика)',
			playlistFilenameTemplate: 'Шаблон названия плейлиста',
			saveDownloadQueue: 'Сохранять текущий список загрузок при закрытии приложения'
		},
		covers: {
			title: 'Обложки',
			saveArtwork: 'Сохранять обложки',
			coverImageTemplate: 'Шаблон названия обложки',
			saveArtworkArtist: 'Сохранять изображение исполнителя',
			artistImageTemplate: 'Шаблон названия изображения',
			localArtworkSize: 'Размер сохраненной обложки',
			embeddedArtworkSize: 'Размер встроенной',
			localArtworkFormat: {
				title: 'В каком формате сохранять обложки?',
				jpg: 'jpeg',
				png: 'png',
				both: 'jpeg и png'
			},
			jpegImageQuality: 'Качество JPEG'
		},
		tags: {
			head: 'Какие теги сохранять',
			title: 'Название',
			artist: 'Исполнитель',
			album: 'Альбом',
			cover: 'Обложка',
			trackNumber: 'Номер трека',
			trackTotal: 'Кол-во треков',
			discNumber: 'Номер диска',
			discTotal: 'Кол-во дисков',
			albumArtist: 'Исполнитель альбома',
			genre: 'Жанр',
			year: 'Год',
			date: 'Дата',
			explicit: 'Нецензурная лирика',
			isrc: 'ISRC',
			length: 'Продолжительность',
			barcode: 'Штрихкод альбома (UPC)',
			bpm: 'BPM',
			replayGain: 'Replay Gain',
			label: 'Издатель',
			lyrics: 'Несинхронизированная лирика',
			copyright: 'Права',
			composer: 'Композитор',
			involvedPeople: 'Вовлечённые люди'
		},
		other: {
			title: 'Разное',
			savePlaylistAsCompilation: 'Сохранять плейлисты как сборники',
			useNullSeparator: 'Использовать null в качестве разделителя',
			saveID3v1: 'Сохранять ID3v1',
			multiArtistSeparator: {
				title: 'Как разделять несколько исполнителей?',
				nothing: 'Сохранить только основного',
				default: 'Используя стандартную спецификацию',
				andFeat: 'Используя & и feat.',
				using: 'Используя "{0}"'
			},
			singleAlbumArtist: 'Сохранять только основного исполнителя альбома',
			albumVariousArtists: 'Оставлять "Various Artists" в Исполнителях альбома',
			removeAlbumVersion: 'Удалять "Album Version" из названия трека',
			removeDuplicateArtists: 'Удалять повторяющихся исполнителей',
			dateFormat: {
				title: 'Формат даты для FLAC файлов',
				year: 'YYYY',
				month: 'MM',
				day: 'DD'
			},
			featuredToTitle: {
				title: 'Что делать с приглашёнными исполнителями?',
				0: 'Ничего',
				1: 'Удалить их из названия',
				3: 'Удалить из названия и названия альбома',
				2: 'Добавить в название'
			},
			titleCasing: 'Регистр названия',
			artistCasing: 'Регистр исполнителя',
			casing: {
				nothing: 'Не менять',
				lower: 'в нижнем регистре',
				upper: 'В ВЕРХНЕМ РЕГИСТРЕ',
				start: 'Каждое Слово С Заглавной Буквы',
				sentence: 'Как в предложении'
			},
			previewVolume: 'Громкость прослушивания',
			executeCommand: {
				title: 'Выполнять команды по окончании загрузок',
				description: 'Оставьте поле пустым, если ничего не требуется'
			}
		},
		spotify: {
			title: 'Функции Spotify',
			clientID: 'Spotify clientID',
			clientSecret: 'Spotify Client Secret',
			username: 'Spotify username'
		},
		reset: 'По умолчанию',
		save: 'Сохранить',
		toasts: {
			init: 'Настройки загружены!',
			update: 'Настройки обновлены!',
			ARLcopied: 'ARL скопирован в буфер обмена'
		}
	},
	sidebar: {
		home: 'главная',
		search: 'поиск',
		charts: 'чарты',
		favorites: 'избранное',
		linkAnalyzer: 'анализ ссылок',
		settings: 'настройки',
		about: 'о проекте'
	},
	tracklist: {
		downloadSelection: 'Скачать выбранные'
	}
}

export default ru
