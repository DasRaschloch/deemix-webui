const ptBr = {
	globals: {
		welcome: 'Bem vindo ao deemix',
		back: 'voltar',
		loading: 'carregando',
		download: 'Baixar {0}',
		by: 'por {0}',
		in: 'em {0}',
		download_hint: 'Baixar',
		play_hint: 'Reproduzir',
		toggle_download_tab_hint: 'Expandir/Recolher',
		clean_queue_hint: 'Limpar os terminados',
		cancel_queue_hint: 'Cancelar todos',
		listTabs: {
			empty: '',
			all: 'todos',
			top_result: 'Resultado principal',
			album: 'álbum | álbuns',
			artist: 'artista | artistas',
			single: 'single | singles',
			title: 'título | títulos',
			track: 'faixa | faixas',
			trackN: '0 faixas | {n} faixa | {n} faixas',
			releaseN: '0 lançamentos | {n} lançamento | {n} lançamentos',
			playlist: 'playlist | playlists',
			compile: 'compilação | compilações',
			ep: 'ep | eps',
			spotifyPlaylist: 'playlist do spotify | playlists do spotify',
			releaseDate: 'data de lançamento',
			error: 'erro'
		}
	},
	about: {
		titles: {
			usefulLinks: 'Links Úteis',
			bugReports: 'Relatar Bugs',
			contributing: 'Contribuições',
			donations: 'Doações',
			license: 'Licença'
		},
		subtitles: {
			bugReports: 'Tem algo não funcionando no deemix? Informe-nos!',
			contributing: 'Quer contribuir com este projeto? Há várias formas!',
			donations: 'Quer contribuir monetariamente? Você pode fazer uma doação!'
		},
		usesLibrary:
			'Este programa usa a biblioteca <strong>deemix</strong>, no qual você pode usar para construir uma UI para o seu deemix.',
		thanks: `Obrigado <strong>rtonno</strong>, <strong>uhwot</strong> e <strong>lollilol</strong> por me ajudarem com este projeto e <strong>BasCurtiz</strong> e <strong>scarvimane</strong> por fazerem o ícone.`,
		upToDate: `Seja avisado quando houver novas atualizações, siga o <a href="https://t.me/RemixDevNews" target="_blank">nosso canal de notícias</a> no Telegram.`,
		officialWebsite: 'Website Oficial',
		officialRepo: 'Repositório da Biblioteca Oficial',
		officialWebuiRepo: 'Repositório da WebUI Oficial',
		officialSubreddit: 'Subreddit Oficial',
		newsChannel: 'Canal de Notícia',
		questions: `Caso houver dúvidas ou problemas com o programa, procure uma solução no <a href="https://www.reddit.com/r/deemix" target="_blank">subreddit</a>. Caso não encontre nada, você pode fazer um post com a sua dúvida no subreddit.`,
		beforeReporting: `Antes de reportar um bug tenha certeza de que o seu deemix esteja atualizado e que o seu relato seja realmente um bug e não um problema no seu lado de usuário.`,
		beSure: `Certifique-se de que o bug ocorra em outras máquinas e <strong>NÃO</strong> relate-o caso ele	já tenha sido relatado.`,
		duplicateReports: 'Relatos duplicados de bug serão fechados, então fique de olho.',
		dontOpenIssues: `<strong>NÃO</strong> abra uma issue para fazer questões, o subreddit é para isso.`,
		newUI: `Caso seja fluente em python, você pode tentar fazer uma nova UI para o app usando a biblioteca base, ou consertar os bugs da biblioteca com uma pull request na <a href="https://codeberg.org/RemixDev/deemix" target="_blank">repo do projeto</a>.`,
		acceptFeatures: `Eu aceito recursos também, mas nada muito complexo e que possa ser implementado diretamente no aplicativo e não na biblioteca.`,
		otherLanguages: `Caso seja fluente em outra linguagem de programação você pode tentar portar o deemix para ela!`,
		understandingCode: `Precisa de ajuda para entender o código? Contate o RemixDev no Telegram ou Reddit.`,
		contributeWebUI: `Caso saiba Vue.js (JavaScript), HTML ou CSS você pode contribuir para a <a href="https://codeberg.org/RemixDev/deemix-webui" target="_blank">WebUI</a>.`,
		itsFree: `Mantenha em mente que <strong>este é um projeto gratuito</strong> e que <strong>você deve apoiar os artistas que ama</strong> antes de apoiar os desenvolvedores.`,
		notObligated: `Não se sinta obrigado a doar, agradecemos da mesma forma!`,
		lincensedUnder: `Este trabalho é licenciado sob a
			<a rel="license" href="https://www.gnu.org/licenses/gpl-3.0.en.html" target="_blank"
				>GNU General Public License 3.0</a
			>.`
	},
	charts: {
		title: 'Charts',
		changeCountry: 'Trocar o país',
		download: 'Baixe a chart'
	},
	errors: {
		title: 'Erros para {0}',
		ids: {
			invalidURL: 'URL não reconhecida',
			unsupportedURL: 'URL não suportada',
			ISRCnotOnDeezer: 'ISRC da faixa não está no deezer',
			notYourPrivatePlaylist: 'Você não pode baixar playlists privadas de outros usuários.',
			spotifyDisabled: 'Recursos do Spotify não estão configurados corretamente.',
			trackNotOnDeezer: 'Faixa não encontrada no deezer!',
			albumNotOnDeezer: 'Álbum não encontrada no deezer!',
			notOnDeezer: 'Faixa não disponível no Deezer!',
			notEncoded: 'Faixa ainda não encodada!',
			notEncodedNoAlternative: 'Faixa ainda não encodada e sem alternativas encontradas!',
			wrongBitrate: 'Faixa não encontrada no bitrate desejado.',
			wrongBitrateNoAlternative: 'Faixa não encontrada no bitrate desejado e sem alternativas encontradas!',
			no360RA: 'Faixa não disponível no Reality Audio 360.',
			notAvailable: 'Faixa não disponível nos servidores do deezer!',
			notAvailableNoAlternative: 'Faixa não disponível nos servidores do deezer e sem alternativas encontradas!'
		}
	},
	favorites: {
		title: 'Favorites',
		noPlaylists: 'Nenhuma playlists favorita encontrada',
		noAlbums: 'Nenhum álbum favorito encontrado',
		noArtists: 'Nenhum artista favorito encontrado',
		noTracks: 'Nenhuma faixa favorita encontrada'
	},
	home: {
		needTologin: 'Você precisa logar na sua conta do Deezer antes de poder começar a baixar.',
		openSettings: 'Abrir configurações',
		sections: {
			popularPlaylists: 'Playlists populares',
			popularAlbums: 'Álbuns mais ouvidos'
		}
	},
	linkAnalyzer: {
		info: 'Você pode usar esta seção para descobrir mais informações sobre o link que está tentando baixar.',
		useful:
			'Esta função é útil caso esteja tentando baixar algumas faixas que não estão disponíveis no seu país e você quer descobrir aonde estão disponíveis, por exemplo.',
		linkNotSupported: 'Este link não é suportado ainda',
		linkNotSupportedYet: 'Aparentemente este link ainda não é suportado, tente analizar algum outro.',
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
			tracklist: 'Lista de faixas'
		}
	},
	search: {
		startSearching: 'Comece a procurar!',
		description:
			'Você pode procurar uma faixa, um álbum inteiro, um artista, uma playlist... tudo! Você também pode colar um link do Deezer',
		fans: '{0} fãs',
		noResults: 'Sem resultados',
		noResultsTrack: 'Nenhuma faixa encontrada',
		noResultsAlbum: 'Nenhum álbum encontrado',
		noResultsArtist: 'Nenhum artista encontrado',
		noResultsPlaylist: 'Nenhuma playlist encontrada'
	},
	searchbar: 'Pesquise tudo o que quiser (ou simplesmente cole um link)',
	downloads: 'downloads',
	toasts: {
		addedToQueue: '{0} adicionado à lista de espera',
		alreadyInQueue: '{0} já está na lista de espera!',
		finishDownload: '{0} terminou de baixar.',
		allDownloaded: 'Todos os downloads terminaram!',
		refreshFavs: 'Atualização completa!',
		loggingIn: 'Entrando na conta',
		loggedIn: 'Conta logada',
		alreadyLogged: 'Já está na conta',
		loginFailed: 'Não pode entrar na conta',
		loggedOut: 'Saindo da conta',
		cancellingCurrentItem: 'Cancelando item atual.',
		currentItemCancelled: 'Cancelado item atual.',
		startAddingArtist: 'Adicionando {0} álbuns à lista de espera',
		finishAddingArtist: '{0} álbuns adicionados à lista de espera',
		startConvertingSpotifyPlaylist: 'Convertendo faixas do Spotify para faixas do Deezer',
		finishConvertingSpotifyPlaylist: 'Playlist do Spotify convertida'
	},
	settings: {
		title: 'Configurações',
		languages: 'Linguagens',
		login: {
			title: 'Login',
			loggedIn: 'Você já está logado como {username}',
			arl: {
				question: 'Como eu pego a minha ARL?',
				update: 'Atualizar a ARL'
			},
			logout: 'Sair'
		},
		appearance: {
			title: 'Aparência',
			slimDownloadTab: 'Guia de download slim'
		},
		downloadPath: {
			title: 'Diretório de download'
		},
		templates: {
			title: 'Templates',
			tracknameTemplate: 'Template do nome da faixa avulsa',
			albumTracknameTemplate: 'Template do nome da faixa no álbum',
			playlistTracknameTemplate: 'Template do nome da faixa na playlist'
		},
		folders: {
			title: 'Pastas',
			createPlaylistFolder: 'Criar pasta para playlists',
			playlistNameTemplate: 'Template do nome da pasta da playlist',
			createArtistFolder: 'Criar pasta para artistas',
			artistNameTemplate: 'Template do nome da pasta do artista',
			createAlbumFolder: 'Criar pasta para álbuns',
			albumNameTemplate: 'Template do nome da pasta do álbum',
			createCDFolder: 'Criar pasta para discos',
			createStructurePlaylist: 'Criar estrutura de pasta para playlists',
			createSingleFolder: 'Criar estrutura de pasta para singles'
		},
		trackTitles: {
			title: 'Títulos das faixas',
			padTracks: 'Pad das faixas',
			paddingSize: 'Substituir tamanho do padding',
			illegalCharacterReplacer: 'Substituto de caracter ilegal'
		},
		downloads: {
			title: 'Downloads',
			queueConcurrency: 'Downloads simultâneos',
			maxBitrate: {
				title: 'Bitrate preferido',
				9: 'FLAC 1411kbps',
				3: 'MP3 320kbps',
				1: 'MP3 128kbps'
			},
			overwriteFile: {
				title: 'Posso substituir os arquivos?',
				y: 'Sim, substitua os arquivos',
				n: 'Não, não substitua os arquivos',
				t: 'Substitua apenas as tags'
			},
			fallbackBitrate: 'Bitrate reserva',
			fallbackSearch: 'Pesquisa reserva',
			logErrors: 'Criar log para erros',
			logSearched: 'Criar log para faixas pesquisadas',
			createM3U8File: 'Criar arquivo de playlist',
			syncedLyrics: 'Criar arquivos .lyr (Letras sincronizadas)',
			playlistFilenameTemplate: 'Template do nome da playlist',
			saveDownloadQueue: 'Salvar lista de espera do download ao fechar o programa'
		},
		covers: {
			title: 'Capa dos álbuns',
			saveArtwork: 'Salvar as capas',
			coverImageTemplate: 'Template do nome da capa',
			saveArtworkArtist: 'Salvar imagem do artista',
			artistImageTemplate: 'Template da imagem do artista',
			localArtworkSize: 'Tamanho da artwork local',
			embeddedArtworkSize: 'Tamanho da artwork embutida',
			localArtworkFormat: {
				title: 'Qual formato você quer que a artwork local seja?',
				jpg: 'Uma imagem jpeg',
				png: 'Uma imagem png',
				both: 'Ambos um jpeg e um png'
			},
			jpegImageQuality: 'Qualidade do JPEG'
		},
		tags: {
			head: 'Quais tags salvar',
			title: 'Título',
			artist: 'Artista',
			album: 'Álbuns',
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
			barcode: 'Barcode do álbum (UPC)',
			bpm: 'BPM',
			replayGain: 'Replay Gain',
			label: 'Gravadora do álbum',
			lyrics: 'Letras desincronizadas',
			copyright: 'Copyright',
			composer: 'Compositor',
			involvedPeople: 'Pessoas involvidas'
		},
		other: {
			title: 'Outros',
			savePlaylistAsCompilation: 'Savar playlists como uma compilação',
			useNullSeparator: 'Usar separador nulo',
			saveID3v1: 'Salvar ID3v1',
			multiArtistSeparator: {
				title: 'Como gostaria de separar seus artistas?',
				nothing: 'Salvar apenas o artista principal',
				default: 'Usando especificação padrão',
				andFeat: 'Usando & e feat.',
				using: 'Usando "{0}"'
			},
			singleAlbumArtist: 'Salvar apenas o artista principal do álbum',
			albumVariousArtists: 'Manter "Various Artists" em Artistas do Álbum',
			removeAlbumVersion: 'Remover "Album Version" do título de faixas',
			removeDuplicateArtists: 'Remover combinações de artistas',
			dateFormat: {
				title: 'Formato da data para arquivos FLAC',
				year: 'AAAA',
				month: 'MM',
				day: 'DD'
			},
			featuredToTitle: {
				title: 'O que eu deveria fazer com os artistas feat.?',
				0: 'Nada',
				1: 'Remova-os do título da faixa',
				3: 'Remova-os do título da faixa e do álbum',
				2: 'Mova-os para o título da faixa'
			},
			titleCasing: 'Formatação do título',
			artistCasing: 'Formatação do artista',
			casing: {
				nothing: 'Manter intocado',
				lower: 'minúsculo',
				upper: 'MAIÚSCULO',
				start: 'No Começo De Cada Palavra',
				sentence: 'Como uma frase'
			},
			previewVolume: 'Volume da prévia',
			executeCommand: {
				title: 'Comando para executar depois do download',
				description: 'Deixe em branco para não executar nada'
			}
		},
		spotify: {
			title: 'Destaques do Spotify',
			clientID: 'Spotify clientID',
			clientSecret: 'Spotify Client Secret',
			username: 'Nome de usuário do Spotify'
		},
		reset: 'Resetar para Padrão',
		save: 'Save',
		toasts: {
			init: 'Configurações carregadas!',
			update: 'Configurações atualizadas!',
			ARLcopied: 'ARL copiado para o clipboard'
		}
	},
	sidebar: {
		home: 'home',
		search: 'pesquisa',
		charts: 'charts',
		favorites: 'favoritos',
		linkAnalyzer: 'analizador de links',
		settings: 'configurações',
		about: 'sobre'
	},
	tracklist: {
		downloadSelection: 'Baixar seleção'
	}
}

export default ptBr
