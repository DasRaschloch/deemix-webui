const pt_br = {
	globals: {
		welcome: 'bem-vindo ao deemix',
		back: 'voltar',
		loading: 'carregando',
		download: 'Baixar {thing}',
		by: 'por {artist}',
		in: 'em {album}',
		download_hint: 'Baixar',
		play_hint: 'Reproduzir',
		toggle_download_tab_hint: 'Expandir/Recolher',
		clean_queue_hint: 'Limpar',
		cancel_queue_hint: 'Cancelar todos',
		open_downloads_folder: 'Abrir pasta de downloads',
		cut: 'recortar',
		copy: 'copiar',
		copyLink: 'copiar link',
		copyImageLink: 'copiar link da imagem',
		copyDeezerLink: 'copiar link do deezer',
		paste: 'colar',
		listTabs: {
			empty: '',
			all: 'todos',
			top_result: 'resultado principal',
			album: 'álbum | álbuns',
			artist: 'artista | artistas',
			single: 'single | singles',
			title: 'título | títulos',
			track: 'faixa | faixas',
			releaseN: '0 lançamento | {n} lançamento | {n} lançamentos',
			playlist: 'playlist | playlists',
			compile: 'compilação | compilações',
			ep: 'ep | eps',
			bundle: 'pacote | pacotes',
			more: 'Mais álbuns',
			featured: 'Participação em',
			spotifyPlaylist: 'playlist do Spotify | playlists do Spotify',
			releaseDate: 'data de lançamento',
			error: 'erro',
			trackN: '0 faixas | {n} faixa | {n} faixas',
			albumN: '0 álbuns | {n} álbum | {n} álbuns',
			artistN: '0 artistas | {n} artista | {n} artistas',
			playlistN: '0 playlists | {n} playlist | {n} playlists'
		},
		yes: 'sim',
		no: 'não',
		empty: 'vazio'
	},
	about: {
		appStatus: {
			online: 'app online',
			offline: 'app offline'
		},
		updates: {
			currentVersion: 'Versão atual',
			currentWebuiVersion: 'Versão WebUI atual',
			versionNotAvailable: 'N/A',
			updateAvailable: `Você está executando a versão mais recente: {version}`,
			deemixVersion: 'versão do deemix lib'
		},
		titles: {
			usefulLinks: 'Links úteis',
			bugReports: 'Relatar bugs',
			contributing: 'Contribuições',
			donations: 'Doações',
			license: 'Licença'
		},
		subtitles: {
			bugReports: 'Algo não funcionando no deemix? Nos diga!',
			contributing: 'Você quer contribuir para este projeto? Você pode fazer isso de diferentes maneiras!',
			donations: 'Você quer contribuir monetariamente? Você pode fazer uma doação!'
		},
		usesLibrary:
			'Esse app usa a biblioteca do <strong>deemix</strong>, no qual você pode usar para criar sua própria UI para o deemix',
		thanks: `Agradecimentos para <strong>rtonno</strong>, <strong>uhwot</strong> e <strong>lollilol</strong> por ajudar neste projeto, e para <strong>BasCurtiz</strong> por fazerem o ícone`,
		upToDate: {
			text: `Para mais novidades siga o {newsChannel} no Telegram.`,
			newsChannel: 'canal de notícias'
		},
		officialWebsite: 'Site oficial',
		officialRepo: 'Repositório oficial da biblioteca',
		officialWebuiRepo: 'Repositório oficial da WebUI',
		officialSubreddit: 'Subreddit oficial',
		newsChannel: 'Canal de notícias',
		devlogChannel: 'Canal Devlog',
		questions: {
			text: `Se você tiver dúvidas ou problemas com o app, procure uma solução em {subreddit} primeiro. Caso você não encontre, você pode fazer um post explicando seu problema no subreddit.`,
			subreddit: 'subreddit'
		},
		beforeReporting: `Antes de reportar um bug, tenha certeza que você está rodando a versão mais recente do app, e o que você quer reportar seja realmente um bug e não algo que esteja acontecendo especialmente com você.`,
		beSure: `Certifique-se que o bug é reproduzivel em outras máquinas e também <strong>NÃO</strong> reporte um bug se ele já foi reportado.`,
		duplicateReports: 'Reportes de bugs duplicados serão fechados, então fique atento a isso.',
		dontOpenIssues: `<strong>NÃO</strong> abra tópicos para fazer perguntas, há o subreddit para isso.`,
		newUI: {
			text: `Se você é fluente em Phython, você pode tentar fazer uma nova UI para o app usando a biblioteca base, ou consertar bugs da biblioteca com um pull request em {repo}.`,
			repo: 'repo'
		},
		acceptFeatures: `Eu aceito funcionalidades extras também, mas nada de coisas complexas, desde que ela possa ser implementada no app, e não na biblioteca.`,
		otherLanguages: `Se você for fluente em outra linguagem de programação, você pode tentar portar o deemix para outra linguagem!`,
		understandingCode: `Você precisa de ajuda para entender o código? Mande mensagem no RemixDex pelo Telegram ou pelo Reddit.`,
		contributeWebUI: {
			text: `Se você souber Vue.js (JavaScript), HTML ou CSS você pode contribuir para o {webui}.`,
			webui: 'WebUI'
		},
		itsFree: `Lembre-se que <strong>este projeto é livre</strong> e <strong>você deve dar suporte aos artistas que você ama</strong> antes de dar suporte aos desenvolvedores.`,
		notObligated: `Não se sinta na obrigação de doar, eu agradeço de qualquer maneira!`,
		lincensedUnder: {
			text: `Esse é um projeto licenciado através da {gpl3}.`,
			gpl3: 'GNU General Public License 3.0'
		}
	},
	charts: {
		title: 'Mais ouvidas',
		changeCountry: 'Mudar país',
		download: 'Baixar mais ouvidas'
	},
	errors: {
		title: 'Erros para {name}',
		postTitle: 'Após erros de download',
		ids: {
			invalidURL: 'URL inválido',
			unsupportedURL: 'URL não suportado ainda',
			ISRCnotOnDeezer: 'Faixa ISRC não está disponível ainda no Deezer',
			notYourPrivatePlaylist: 'Você não pode baixar playlists privadas.',
			spotifyDisabled: 'Os Recursos do Spotify não foram configurados corretamente.',
			trackNotOnDeezer: 'Faixa não encontrada no Deezer!',
			albumNotOnDeezer: 'Álbum não encontrado no Deezer!',
			notOnDeezer: 'Faixa indisponível no Deezer!',
			notEncoded: 'Faixa ainda não codificada!',
			notEncodedNoAlternative: 'Faixa ainda não codificada e sem alternativas encontradas!',
			wrongBitrate: 'Faixa não encontrada no bitrate desejado.',
			wrongBitrateNoAlternative: 'Faixa não encontrada no bitrate desejado e nenhuma outra alternativa encontrada!',
			no360RA: 'Faixa não disponível na qualidade Reality Audio 360.',
			notAvailable: 'Faixa não disponível nos servidores do Deezer!',
			notAvailableNoAlternative:
				'Faixa não disponível nos servidores do Deezer e nenhuma outra alternativa encontrada!',
			noSpaceLeft: 'Espaço insuficiente no dispositivo!',
			albumDoesntExists: 'O álbum da faixa não exite, falha ao obter informações.',
			wrongLicense: 'A sua conta não permite reproduzir a faixa na qualidade desejada.',
			wrongGeolocation: 'A sua conta não permite reproduzir a faixa a partir do país atual.'
		}
	},
	favorites: {
		title: 'Favoritos',
		noPlaylists: 'Nenhuma playlist encontrada',
		noAlbums: 'Nenhum álbum favorito encontrado',
		noArtists: 'Nenhum artista favorito encontrado',
		noTracks: 'Nenhuma faixa favorita encontrada'
	},
	home: {
		needTologin: 'Você precisa logar na sua conta do Deezer antes de começar a baixar músicas.',
		openSettings: 'Abrir Configurações',
		sections: {
			popularPlaylists: 'Playlists populares',
			popularAlbums: 'Álbuns mais ouvidos'
		}
	},
	linkAnalyzer: {
		info: 'Você pode usar essa seção para encontrar mais informações sobre o link que você quer baixar.',
		useful:
			'Isso é útil se você está tentando baixar algumas faixas que não estão disponíveis no seu país, e quer saber onde elas estão disponíveis, por exemplo.',
		linkNotSupported: 'Esse link não é suportado ainda',
		linkNotSupportedYet: 'Parece que esse link não é suportado ainda, tente analisar outro.',
		table: {
			id: 'ID',
			isrc: 'ISRC',
			upc: 'UPC',
			duration: 'Duração',
			diskNumber: 'Número do disco',
			trackNumber: 'Número da faixa',
			releaseDate: 'Data de lançamento',
			bpm: 'BPM',
			label: 'Gravadora',
			recordType: 'Tipo de gravação',
			genres: 'Gêneros',
			tracklist: 'Tracklist',
			readable: 'Leitura possível',
			available: 'Disponível'
		},
		countries: 'Países',
		noCountries: 'Esta faixa não está disponível em qualquer país.'
	},
	search: {
		startSearching: 'Comece pesquisando!',
		description:
			'Você pode pesquisar uma música, um álbum, um artista, uma playlist.... tudo! Você também pode colar um link do Deezer',
		fans: '{n} fãs',
		noResults: 'Nenhum resultado',
		noResultsTrack: 'Nenhuma faixa encontrada',
		noResultsAlbum: 'Nenhum álbum encontrado',
		noResultsArtist: 'Nenhum artista encontrado',
		noResultsPlaylist: 'Nenhuma playlist encontrada'
	},
	searchbar: 'Pesquise algo (ou apenas cole um link)',
	downloads: 'downloads',
	toasts: {
		restoringQueue: 'Restaurando fila de downloads...',
		queueRestored: 'Fila de downloads restaurada!',
		addedToQueue: '{item} adicionado à fila',
		addedMoreToQueue: '{n} itens adicionados à fila',
		alreadyInQueue: '{item} já está na fila!',
		finishDownload: '{item} download concluído.',
		allDownloaded: 'Todos os downloads foram concluídos!',
		refreshFavs: 'Atualização concluída!',
		loggingIn: 'Logando',
		loggedIn: 'Logado',
		alreadyLogged: 'Você já está logado',
		loginFailed: 'Não foi possível entrar',
		loggedOut: 'Desconectando',
		cancellingCurrentItem: 'Cancelando item atual.',
		currentItemCancelled: 'Item atual cancelado.',
		startAddingArtist: 'Adicionando álbuns de {artist} à fila',
		finishAddingArtist: 'Álbuns de {artist}adicionados a fila',
		startConvertingSpotifyPlaylist: 'Convertendo faixas do Spotify para faixas do Deezer',
		finishConvertingSpotifyPlaylist: 'Playlists do Spotify convertidas',
		loginNeededToDownload: 'Você precisa fazer login para baixar faixas!',
		deezerNotAvailable: 'Deezer não disponível no seu país. Você precisa usar uma VPN.',
		startGeneratingItems: 'Processando {n} itens...',
		finishGeneratingItems: '{n} itens gerados.',
		noLovedPlaylist: 'Nenhuma playlist de músicas curtidas!',
		checkingUpdates: 'Verificando por atualizações...',
		noUpdateAvailable: 'Nenhuma atualização disponível',
		updateAvailable: 'Uma atualização está disponível!'
	},
	settings: {
		title: 'Configurações',
		languages: 'Idiomas',
		login: {
			title: 'Login',
			loggedIn: 'Você está logado como {username}',
			arl: {
				title: 'Usar ARL',
				question: 'Como eu consigo o meu ARL?',
				update: 'Atualizar ARL'
			},
			logout: 'Sair',
			login: 'Entrar',
			email: 'E-mail',
			password: 'Senha'
		},
		appearance: {
			title: 'Aparência',
			slimDownloadTab: 'Aba de downloads pequena',
			slimSidebar: 'Barra lateral pequena',
			searchButton: 'Mostrar botão de pesquisa',
			bitrateTags: 'Mostrar tag de qualidade na fila de downloads'
		},
		downloadPath: {
			title: 'Pasta de downloads'
		},
		templates: {
			title: 'Modelos',
			tracknameTemplate: 'Modelo do nome da faixa',
			tracknameAvailableVariables: 'Variáveis de nomes de faixas disponíveis',
			albumTracknameTemplate: 'Modelo da faixa do álbum',
			albumTracknameAvailableVariables: 'Variáveis de faixa do álbum disponíveis',
			playlistTracknameTemplate: 'Modelo da faixa da playlist',
			playlistTracknameAvailableVariables: 'Variáveis de faixa da playlist disponíveis'
		},
		folders: {
			title: 'Pastas',
			createPlaylistFolder: 'Criar pasta para playlists',
			playlistNameTemplate: 'Modelo da pasta de playlist',
			createArtistFolder: 'Criar pasta para artista',
			artistNameTemplate: 'Modelo da pasta de artistas',
			createAlbumFolder: 'Criar pasta para álbuns',
			albumNameTemplate: 'Modelo da pasta de álbuns',
			createCDFolder: 'Criar pasta para CDs',
			createStructurePlaylist: 'Criar estrutura de pastas para playlists',
			createSingleFolder: 'Criar estrutura de pastas para singles'
		},
		trackTitles: {
			title: 'Título das faixas',
			padTracks: 'Faixas com pad',
			paddingSize: 'Sobrescrever tamanho do padding',
			illegalCharacterReplacer: 'Substituir caracteres inválidos'
		},
		downloads: {
			title: 'Downloads',
			queueConcurrency: 'Downloads simultâneos',
			maxBitrate: {
				title: 'Escolher taxa de bits',
				9: 'FLAC 1411kbps',
				3: 'MP3 320kbps',
				1: 'MP3 128kbps'
			},
			overwriteFile: {
				title: 'Sobrescrever arquivos?',
				y: 'Sim, sobrescrever arquivos',
				n: 'Não, não sobrescrever arquivos',
				t: 'Sobrescrever apenas as tags',
				b: 'Não, manter ambos os arquivos e adicionar número ao duplicado',
				e: 'Não, e não olhar para as extensões'
			},
			fallbackBitrate: 'Taxa de bits reserva',
			fallbackSearch: 'Procurar reserva',
			fallbackISRC: 'Reserva com pesquisa ISRC',
			feelingLucky: 'Negociar com CDNs e caches',
			logErrors: 'Criar arquivos de log para erros',
			logSearched: 'Criar arquivos de log para faixas pesquisadas',
			createM3U8File: 'Criar arquivo de playlist',
			syncedLyrics: 'Criar arquivos .lyr (Letras)',
			playlistFilenameTemplate: 'Modelo do nome do arquivo da playlist',
			saveDownloadQueue: 'Salvar a fila de downloads quando fechar o app'
		},
		covers: {
			title: 'Capa dos álbuns',
			saveArtwork: 'Salvar capas',
			coverImageTemplate: 'Modelo do nome da capa',
			saveArtworkArtist: 'Salvar imagem do artista',
			artistImageTemplate: 'Modelo da imagem do artista',
			localArtworkSize: 'Tamanho da capa local',
			embeddedArtworkSize: 'Tamanho da capa embutida',
			localArtworkFormat: {
				title: 'Qual o formato da imagem você quer para a capa local?',
				jpg: '.jpeg',
				png: '.png',
				both: 'Ambas, .jpeg e .png'
			},
			jpegImageQuality: 'Qualidade da imagem JPEG',
			embeddedArtworkPNG: 'Salvar capa embutida como PNG',
			embeddedPNGWarning: 'PNGs não são oficialmente suportados pelo Deezer e podem ficar bugados',
			imageSizeWarning: 'Tudo acima de x1200 não é oficialmente usado pelo Deezer,  você pode encontrar problemas',
			coverDescriptionUTF8: 'Salvar descrição da capa usando UTF-8 (correção para capa do iTunes)'
		},
		tags: {
			head: 'Quais tags salvar',
			title: 'Título',
			artist: 'Artista',
			artists: 'Tag de ARTISTAS extras',
			album: 'Álbum',
			cover: 'Capa',
			trackNumber: 'Número da faixa',
			trackTotal: 'Total de faixas',
			discNumber: 'Número de discos',
			discTotal: 'Total de discos',
			albumArtist: 'Artista do álbum',
			genre: 'Gênero',
			year: 'Ano',
			date: 'Data',
			explicit: 'Letras explícitas',
			isrc: 'ISRC',
			length: 'Tamanho da faixa',
			barcode: 'Código de barras do álbum (UPC)',
			bpm: 'BPM',
			replayGain: 'Replay Gain',
			label: 'Gravadora',
			lyrics: 'Letras não sincronizadas',
			syncedLyrics: 'Letras sincronizadas',
			copyright: 'Copyright',
			composer: 'Compositor',
			involvedPeople: 'Pessoas envolvidas',
			source: 'Fonte e ID da música',
			artistsWarning:
				'Desabilitar a tag ARTISTAS embora não use a especificação padrão, não preservará o suporte para vários artistas'
		},
		other: {
			title: 'Outros',
			autoCheckForUpdates: 'Verificar por atualizações ao iniciar',
			savePlaylistAsCompilation: 'Salvar playlists como uma compilação',
			useNullSeparator: 'Usar separador nulo',
			saveID3v1: 'Salvar ID3v1',
			multiArtistSeparator: {
				title: 'Como você gostaria de separar os artistas?',
				nothing: 'Salvar apenas o artista principal',
				default: 'Usar a especificação padrão',
				andFeat: 'Usar & e feat.',
				using: 'Usar "{separator}"',
				warning:
					'Usar qualquer separador diferente do que a especificação padrão irá adicionar uma tag de ARTISTAS extra para preservar o suporte a vários artistas'
			},
			singleAlbumArtist: 'Salvar apenas o artista principal',
			albumVariousArtists: 'Manter "Various Artists" nos Artistas do Álbum',
			removeAlbumVersion: 'Remover "Album Version" do título da faixa',
			removeDuplicateArtists: 'Remover combinação de artistas',
			dateFormat: {
				title: 'Formato da data para arquivos FLAC',
				year: 'AAAA',
				month: 'MM',
				day: 'DD'
			},
			featuredToTitle: {
				title: 'O que devo fazer com artistas participantes?',
				0: 'Nada',
				1: 'Remover do título da faixa',
				3: 'Remover do título da faixa e do álbum',
				2: 'Mover para o título da faixa'
			},
			titleCasing: 'Formatação do título',
			artistCasing: 'Formatação do artista',
			casing: {
				nothing: 'Manter inalterado',
				lower: 'minúsculo',
				upper: 'MAIÚSCULO',
				start: 'Começo De Cada Palavra',
				sentence: 'Como uma frase'
			},
			previewVolume: 'Volume da prévia',
			executeCommand: {
				title: 'Comando para executar depois de baixar',
				description: 'Deixe em branco para nenhuma ação'
			}
		},
		spotify: {
			title: 'Recursos do Spotify',
			clientID: 'Spotify clientID',
			clientSecret: 'Spotify Client Secret',
			username: 'Usuário do Spotify',
			question: 'Como habilitar os Recursos do Spotify?'
		},
		reset: 'Restaurar padrão',
		resetMessage: 'Deseja realmente restaurar as configurações padrão?',
		save: 'Salvar',
		toasts: {
			init: 'Configurações carregadas!',
			update: 'Configurações atualizadas!',
			reset: 'Configurações restauradas para o padrão!',
			ARLcopied: 'ARL copiado para a área de transferência'
		},
		logs: {
			title: 'Logs',
			areLogsActive: 'Ativo'
		}
	},
	sidebar: {
		home: 'início',
		search: 'pesquisar',
		charts: 'paradas',
		favorites: 'favoritos',
		linkAnalyzer: 'analisar links',
		settings: 'configurações',
		logs: 'logs',
		about: 'sobre'
	},
	tracklist: {
		downloadSelection: 'Baixar seleção'
	},
	logs: {
		event: 'Evento',
		data: 'Dados'
	}
}

export default pt_br
