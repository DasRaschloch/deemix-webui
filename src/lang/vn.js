const vn = {
	globals: {
		welcome: 'Chào mừng đến với deemix',
		back: 'trở lại',
		loading: 'đang tải',
		download: 'Tải xuống {thing}',
		by: 'bởi {artist}',
		in: 'trong {album}',
		download_hint: 'Tải xuống',
		play_hint: 'Phát',
		toggle_download_tab_hint: 'Mở rộng/Giấu',
		clean_queue_hint: 'Xóa những file đã tải xong',
		cancel_queue_hint: 'Hủy tất cả',
		listTabs: {
			empty: '',
			all: 'tất cả',
			top_result: 'kết quả hàng đầu',
			album: 'album | album',
			artist: 'Nghệ sĩ | Nghệ sĩ',
			single: 'đơn | đơn',
			title: 'tiêu đề | tiêu đề',
			track: 'Bài hát | Bài hát',
			trackN: '0 Bài hát | {n} Bài hát | {n} Bài hát',
			releaseN: '0 sản phẩm | {n} sản phẩm | {n} sản phẩm',
			playlist: 'playlist | playlist',
			compile: 'tổng hợp | tổng hợp',
			ep: 'ep | ep',
			spotifyPlaylist: 'playlist của spotify | playlist của spotify',
			releaseDate: 'ngày phát hành',
			error: 'lỗi'
		}
	},
	about: {
		titles: {
			usefulLinks: 'Link hữu dụng',
			bugReports: 'Báo lỗi',
			contributing: 'Đóng góp',
			donations: 'Quyên góp',
			license: 'Bằng phép'
		},
		subtitles: {
			bugReports: "Bạn thấy có gì đó không hoạt động trong deemix? Xin hãy báo với chúng tôi!",
			contributing: 'Bạn muốn đóng góp cho dự án này? Bạn có thể làm điều đó với nhiều cách khác nhau!',
			donations: 'Bạn muốn ủng hộ kinh phí? Bạn có thể quyên góp tại đây!'
		},
		usesLibrary: 'Ứng dụng này sử dụng thư viện <strong>deemix</strong>, bạn có thể dùng nó để tạo một UI riêng cho deemix.',
		thanks: `Cảm ơn <strong>rtonno</strong>, <strong>uhwot</strong> và <strong>lollilol</strong> đã giúp tôi với dự án này và <strong>BasCurtiz</strong> và <strong>scarvimane</strong> với việc thiết kế biểu tượng.`,
		upToDate: {
			text: `Cập nhật app bằng cách theo dõi {newsChannel} trên Telegram.`,
			newsChannel: 'kênh tin tức'
		},
		officialWebsite: 'Website chính thức',
		officialRepo: 'Repo thư viện chính thức',
		officialWebuiRepo: 'Repo WebUI chính thức',
		officialSubreddit: 'Subreddit chính thức',
		newsChannel: 'Kênh tin tức',
		questions: {
			text: `Nếu bạn có câu hỏi hoặc vấn đề về ứng dụng này, xin hãy tìm giải pháp trên {subreddit} trước. Sau đó, nếu bạn không tìm được gì thì bạn có thể tạo một bài đăng về vấn đề của bạn trên subreddit dó.`,
			subreddit: 'subreddit'
		},
		beforeReporting: `Trước khi báo lỗi hãy đảm bảo bạn đang sử dụng phiên bản mới nhất của ứng dụng và lỗi bạn đang gặp không phải là do bạn.`,
		beSure: `Hãy đảm bảo là lỗi này vẫn có thể xảy ra trên các thiết bị khác và <strong>XIN ĐỪNG</strong> báo lỗi đã được báo rồi.`,
		duplicateReports: 'Những bản báo lỗi trùng nhau sẽ bị đóng, xin bạn hãy để ý điều này.',
		dontOpenIssues: `<strong>XIN ĐỪNG</strong> mở vấn đề để hỏi, bạn có thể dùng subreddit trên cho việc đó.`,
		newUI: {
			text: `Nếu bạn thành thạo với python bạn có thể tạo một UI mới bằng cách sử dụng thư viện gốc, hoặc sửa lỗi trong thư viện đó với một pull request trên {repo}.`,
			repo: 'repo này'
		},
		acceptFeatures: `Tôi có chấp nhận yêu cầu về tính năng mới nhưng không quá phức tạp bởi vì chúng có thể được triển khai trực tiếp vào ứng dụng thay vì vào thư viện.`,
		otherLanguages: `Nếu bạn thành thạo với một ngôn ngữ khác, bạn có thể port deemix sang ngôn ngữ đó!`,
		understandingCode: `Bạn muốn hiểu code của deemix? Xin hãy liên lạc RemixDev trên Telegram hoặc Reddit.`,
		contributeWebUI: {
			text: `Nếu bạn biết Vue.js (JavaScript), HTML hoặc CSS, bạn có thể góp phần phát triển {webui}.`,
			webui: 'WebUI'
		},
		itsFree: `Bạn nên nhớ rằng <strong>đây là một dự án phi lợi nhuận</strong> và <strong>bạn nên ủng hộ những Nghệ sĩ yêu thích của bạn</strong> trước khi ủng hộ nhà phát triển.`,
		notObligated: `Đừng nghĩ rằng bạn phải đóng góp tiền, tôi vẫn sẽ rất biết ơn bạn!`,
		lincensedUnder: {
			text: `Dự án này được cấp phép bởi {gpl3}.`,
			gpl3: 'GNU General Public License 3.0'
		}
	},
	charts: {
		title: 'Bảng xếp hạng',
		changeCountry: 'Thay đổi quốc gia',
		download: 'Tải xuống bảng xếp hạng này'
	},
	errors: {
		title: 'Lỗi {name}',
		ids: {
			invalidURL: 'Không nhận diện được URL',
			unsupportedURL: 'URL này chưa được hỗ trợ',
			ISRCnotOnDeezer: 'ISRC của bài hát này hiện không có trên Deezer',
			notYourPrivatePlaylist: "Bạn không thể tải xuống playlist riêng của người khác.",
			spotifyDisabled: 'Chức năng Spotify chưa được thiết lập đúng cách.',
			trackNotOnDeezer: 'Bài hát không có trên Deezer!',
			albumNotOnDeezer: 'Album không có trên Deezer!',
			notOnDeezer: 'Bài hát chưa có trên Deezer!',
			notEncoded: 'Bài hát chưa được encode!',
			notEncodedNoAlternative: 'Bài hát chưa được encode và không có bản thay thế nào khác!',
			wrongBitrate: 'Bài hát này không có ở bitrate bạn muốn.',
			wrongBitrateNoAlternative: 'Bài hát này không có ở bitrate bạn muốn và không có bản thay thế nào khác!',
			no360RA: 'Bài hát này không có ở dạng Reality Audio 360.',
			notAvailable: "Bài hát này không có trên server của Deezer!",
			notAvailableNoAlternative: "Bài hát này không có trên server của Deezer và không có bản thay thế nào khác!"
		}
	},
	favorites: {
		title: 'Yêu thích',
		noPlaylists: 'Không tìm được Playlist',
		noAlbums: 'Không tìm được Album Yêu thích',
		noArtists: 'Không tìm được Nghệ sĩ Yêu thích',
		noTracks: 'Không tìm được Bài hát Yêu thích'
	},
	home: {
		needTologin: 'Bạn cần phải đăng nhập vào tài khoản Deezer trước khi bắt đầu tải xuống.',
		openSettings: 'Mở Cài đặt',
		sections: {
			popularPlaylists: 'Playlist Nổi tiếng',
			popularAlbums: 'Album được stream nhiều nhất'
		}
	},
	linkAnalyzer: {
		info: 'Bạn có thể sử dụng chức năng này để kiếm thêm thông tin về đường link mà bạn muốn tải xuống.',
		useful:
			"Chức năng này rất hữu dụng nếu bạn muốn tải các bài hát hiện không có sẵn ở quốc gia của bạn và muốn biết các quốc gia được hỗ trợ.",
		linkNotSupported: 'Đường link này chưa được hỗ trợ',
		linkNotSupportedYet: 'Đường link này chưa được hỗ trợ, xin hãy thử lại với một đường link khác.',
		table: {
			id: 'ID',
			isrc: 'ISRC',
			upc: 'UPC',
			duration: 'Thời lượng',
			diskNumber: 'Số đĩa',
			trackNumber: 'Số bài hát',
			releaseDate: 'Ngày phát hành',
			bpm: 'BPM',
			label: 'Hãng',
			recordType: 'Loại Thu âm',
			genres: 'Thể loại',
			tracklist: 'Danh sách các bài hát'
		}
	},
	search: {
		startSearching: 'Bắt đầu tìm kiếm!',
		description:
			'Bạn có thể tìm một bài hát, album, nghệ sĩ, playlist, v.v...! Bạn cũng có thể dùng link của Deezer',
		fans: '{n} người hâm mộ',
		noResults: 'Không có kết quả',
		noResultsTrack: 'Không tìm được bài hát nào',
		noResultsAlbum: 'Không tìm được album nào',
		noResultsArtist: 'Không tìm được nghệ sĩ nào',
		noResultsPlaylist: 'Không tìm được playlist nào'
	},
	searchbar: 'Tìm những gì bạn muốn (bạn cũng có thể sữ dụng một đường link)',
	downloads: 'Tải xuống',
	toasts: {
		addedToQueue: '{item} đã được đưa vào hàng chờ',
		alreadyInQueue: '{item} đã đang trong hàng chờ!',
		finishDownload: '{item} đã tải xong.',
		allDownloaded: 'Tất cả các bài hát đã được tải xuống!',
		refreshFavs: 'Tải lại hoàn tất!',
		loggingIn: 'Đang đăng nhập',
		loggedIn: 'Đăng nhập thành công',
		alreadyLogged: 'Đã đăng nhập',
		loginFailed: "Không thể đăng nhập",
		loggedOut: 'Đăng xuất',
		cancellingCurrentItem: 'Đang hủy file hiện tại.',
		currentItemCancelled: 'File hiện tại đã bị hủy.',
		startAddingArtist: 'Đang đưa {artist} album vào hàng chờ',
		finishAddingArtist: 'Đã đưa {artist} album vào hàng chờ',
		startConvertingSpotifyPlaylist: 'Đang chuyển đổi các bài hát từ Spotify sang Deezer',
		finishConvertingSpotifyPlaylist: 'Playlist của Spotify đã được chuyển đổi',
		loginNeededToDownload: 'Bạn cần phải đang nhập để tải nhạc!'
	},
	settings: {
		title: 'Cài đặt',
		languages: 'Ngôn ngữ',
		login: {
			title: 'Đăng nhập',
			loggedIn: 'Bạn đã đăng nhập với tên {username}',
			arl: {
				question: 'Làm cách nào để có ARL của tôi?',
				update: 'Cập nhật ARL'
			},
			logout: 'Đăng xuất'
		},
		appearance: {
			title: 'Giao diện',
			slimDownloadTab: 'Thanh tải xuống nhỏ'
		},
		downloadPath: {
			title: 'Nơi tải xuống'
		},
		templates: {
			title: 'Bản mẫu',
			tracknameTemplate: 'Bài hát mẫu',
			albumTracknameTemplate: 'Bài hát trong album mẫu',
			playlistTracknameTemplate: 'Bài hát trong playlist mẫu'
		},
		folders: {
			title: 'Thư mục',
			createPlaylistFolder: 'Tạo thư mục cho playlist',
			playlistNameTemplate: 'Thư mục playlist mẫu',
			createArtistFolder: 'Tạo thư mục cho nghệ sĩ',
			artistNameTemplate: 'Thư mục Nghệ sĩ mẫu',
			createAlbumFolder: 'Tạo thư mục cho album',
			albumNameTemplate: 'Thư mục cho album mẫu',
			createCDFolder: 'Tạo thư mục cho đĩa CD',
			createStructurePlaylist: 'Tạo thư mục có kết cấu cho playlist',
			createSingleFolder: 'Tạo thư mục có kết cấu cho đĩa đơn'
		},
		trackTitles: {
			title: 'Tên bài hát',
			padTracks: 'Đệm tên bài hát',
			paddingSize: 'Ghì đè kích cỡ phần đệm',
			illegalCharacterReplacer: 'Thay các kí tự không hợp lệ với'
		},
		downloads: {
			title: 'Tải xuống',
			queueConcurrency: 'Số lượng tải xuống cùng lúc',
			maxBitrate: {
				title: 'Bitrate ưa thích',
				9: 'FLAC 1411kbps',
				3: 'MP3 320kbps',
				1: 'MP3 128kbps'
			},
			overwriteFile: {
				title: 'Tôi có nên ghi đè file này không?',
				y: 'Có, hãy ghi đè file này',
				n: "Không, đừng ghi đè file này",
				t: 'Chỉ ghi đè các tag'
			},
			fallbackBitrate: 'Bitrate dự phòng',
			fallbackSearch: 'Search dự phòng',
			logErrors: 'Tạo file log khi có lỗi',
			logSearched: 'Tạo file log khi bạn tìm Bài hát',
			createM3U8File: 'Tạo file playlist',
			syncedLyrics: 'Tạo file .lyr (Lời Bài hát)',
			playlistFilenameTemplate: 'Tên playlist mẫu',
			saveDownloadQueue: 'Lưu hàng chờ download khi đóng ứng dụng'
		},
		covers: {
			title: 'Bìa album',
			saveArtwork: 'Lưu bìa',
			coverImageTemplate: 'Tên bìa mẫu',
			saveArtworkArtist: 'Lưu hình Nghệ sĩ',
			artistImageTemplate: 'Hình nghệ sĩ mẫu',
			localArtworkSize: 'Kích cỡ file bìa',
			embeddedArtworkSize: 'Kích cỡ bìa trong file bài hát',
			localArtworkFormat: {
				title: 'Bạn muốn file bìa ở định dạng nào?',
				jpg: 'jpg',
				png: 'png',
				both: 'Cả jpg và png'
			},
			jpegImageQuality: 'Chất lượng file JPEG'
		},
		tags: {
			head: 'Những tag sẽ được lưu',
			title: 'Tiêu đề',
			artist: 'Nghệ sĩ',
			album: 'Album',
			cover: 'Bìa',
			trackNumber: 'Số bài hát',
			trackTotal: 'Tổng số bài hát',
			discNumber: 'Số đĩa',
			discTotal: 'Tổng số đĩa',
			albumArtist: 'Nghệ sĩ của album',
			genre: 'Thể loại',
			year: 'Năm',
			date: 'Ngày',
			explicit: 'Lời explicit',
			isrc: 'ISRC',
			length: 'Thời lượng',
			barcode: 'Mã vạch của album (UPC)',
			bpm: 'BPM',
			replayGain: 'ReplayGain',
			label: 'Nhãn hiệu album',
			lyrics: 'Lời',
			copyright: 'Bản quyền',
			composer: 'Nhà soạn nhạc',
			involvedPeople: 'Những người liên quan'
		},
		other: {
			title: 'Khác',
			savePlaylistAsCompilation: 'Lưu playlist dưới dạng tuyển tập',
			useNullSeparator: 'Dùng dải phân cách null',
			saveID3v1: 'Lưu ID3v1',
			multiArtistSeparator: {
				title: 'Bạn muốn phân cách các nghệ sĩ như thế nào?',
				nothing: 'Chỉ lưu nghệ sĩ chính',
				default: 'Dùng quy cách tiêu chuẩn',
				andFeat: 'Dùng & và feat.',
				using: 'Dùng "{separator}"'
			},
			singleAlbumArtist: 'Chỉ lưu Nghệ sĩ Album chính',
			albumVariousArtists: 'Giữ nguyên "Nhiều Nghệ sĩ" trong Nghệ sĩ Album',
			removeAlbumVersion: 'Bỏ "Phiên bản Album" khỏi tên bài hát',
			removeDuplicateArtists: 'Bỏ các tên nghệ sĩ phối hợp',
			dateFormat: {
				title: 'Định dạng ngày cho file FLAC ',
				year: 'YYYY',
				month: 'MM',
				day: 'DD'
			},
			featuredToTitle: {
				title: 'Tôi nên làm gì với các nghệ sĩ đóng góp?',
				0: 'Không làm gì cả',
				1: 'Bỏ chúng khỏi tên bài hát',
				3: 'Bỏ chúng khỏi tên bài hát và tên album',
				2: 'Đưa chúng vào tên bài hát'
			},
			titleCasing: 'Định dạng tên bài hát',
			artistCasing: 'Định dạng tên nghệ sĩ',
			casing: {
				nothing: 'Không đổi',
				lower: 'chữ thường',
				upper: 'CHỮ HOA',
				start: 'Viết Hoa Ở Chữ Cái Đầu Tiên Của Mỗi Từ',
				sentence: 'Như một câu'
			},
			previewVolume: 'Âm lượng nghe thử',
			executeCommand: {
				title: 'Thực hiện những lệnh này khi đã tải xuống xong',
				description: 'Để trống nếu bạn không muốn thực hiện lệnh nào'
			}
		},
		spotify: {
			title: 'Chức năng Spotify',
			clientID: 'ClientID của Spotify',
			clientSecret: 'Client Secret của Spotify',
			username: 'Tên tài khoản của Spotify'
		},
		reset: 'Quay trở lại cài đặt mặc định',
		save: 'Lưu',
		toasts: {
			init: 'Cài đặt đã được thiết lập!',
			update: 'Cài đặt cập nhật thành công!',
			ARLcopied: 'ARL đã được sao chép vào clipboard'
		}
	},
	sidebar: {
		home: 'trang chủ',
		search: 'tìm kiếm',
		charts: 'bảng xếp hạng',
		favorites: 'yêu thích',
		linkAnalyzer: 'phân tích link',
		settings: 'cài đặt',
		about: 'thông tin'
	},
	tracklist: {
		downloadSelection: 'Tải xuống những mục đã chọn'
	}
}

export default vn
