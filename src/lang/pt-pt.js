const pt = {
    globals: {
        welcome: 'Bem-vindo ao deemix',
        back: 'voltar',
        loading: 'A carregar',
        download: 'Transferir {0}',
        by: 'por {0}',
        in: 'em {0}',
        download_hint: 'Descarregar',
        play_hint: 'Tocar',
        toggle_download_tab_hint: 'Expandir/Recolher',
        clean_queue_hint: 'Limpar Finalizados',
        cancel_queue_hint: 'Cancelar Tudo',
        listTabs: {
            empty: '',
            all: 'Tudo',
            top_result: 'melhor resultado',
            album: 'álbum | álbums',
            artist: 'artista | artistas',
            single: 'single | singles',
            title: 'título | títulos',
            track: 'faixa | faixas',
            trackN: '0 faixas | {n} faixa | {n} faixas',
            releaseN: '0 lançamentos | {n} lançamento | {n} lançamento',
            playlist: 'lista de reprodução | listas de reprodução',
            compile: 'compilação | compilações',
            ep: 'ep | eps',
            spotifyPlaylist: 'lista de reprodução spotify | listas de reprodução spotify',
            releaseDate: 'data de lançamento',
            error: 'erro'
        }
    },
    about: {
        titles: {
            usefulLinks: 'Links Úteis',
            bugReports: 'Relatório de erros',
            contributing: 'Contribuir',
            donations: 'Doações',
            license: 'Licenças'
        },
        subtitles: {
            bugReports: "Existe alguma coisa que não funciona no deemix? Informa-nos!",
            contributing: 'Queres contribuir para o projecto? Podes fazê-lo de diferentes formas!',
            donations: 'Desejas contribuir monetariamente? Faz uma doação!'
        },
        usesLibrary: 'Esta aplicação usa a biblioteca <strong>deemix</strong>, que poderás usar para desenvolver o teu proprio UI para o deemix.,
        thanks: `Agradeço a <strong>rtonno</strong>, <strong>uhwot</strong> and <strong>lollilol</strong> por me ajudarem neste projeto e a <strong>BasCurtiz</strong> and <strong>scarvimane</strong> por elaborarem o ícone.`,
        upToDate: `Mantem-te atualizado seguindo o <a href="https://t.me/RemixDevNews" target="_blank">canal de notícias</a> no Telegram.`,
        officialWebsite: 'Site Oficial',
        officialRepo: 'Repositório Oficial da Biblioteca',
        officialWebuiRepo: 'Repositório Oficial WebUI',
        officialSubreddit: 'Subreddit Oficial',
        newsChannel: 'Canal de Notícias',
        questions: `Caso tenhas alguma duvida ou problema com a app, primeiro procura por uma solução no <a href="https://www.reddit.com/r/deemix" target="_blank">subreddit</a>. Caso não encontres nada podes criar um post com a tua questão no subreddit.`,
        beforeReporting: `Antes de reportares um bug certifica-te que estás a correr a versão mais recente e que o que queres reportar é mesmo um bug e não algo que apenas não funciona do teu lado.`,
        beSure: `Certifica-te que o erro é reprodutivel noutros dispositivos e <strong>NÃO</strong> reportes um bug que já tenha sido reportado.`,
        duplicateReports: 'Bug reports duplicados serão fechados, mantém-te atento a isso.',
        dontOpenIssues: `<strong>NÃO</strong> abras issues para colocar questões, existe um subreddit para isso.`,
        newUI: `Caso sejas fluente em python podes tentar criar um novo UI para a aplicação recorrendo à biblioteca base , ou corrigir erros na biblioteca com um pull request no <a href="https://codeberg.org/RemixDev/deemix" target="_blank">repositório</a>.`,
        acceptFeatures: `Também aceito funcionalidades não complexas caso possam ser implementadas directamente na app e não na biblioteca.`,
        otherLanguages: `Caso sejas fluente noutra linguagem de programação podes tentar migrar o deemix para outra linguagem de programação!`,
        understandingCode: `Precisas de ajuda a entender o código? Acede a RemixDev no Telegram ou no Reddit.`,
        contributeWebUI: `Caso saibas Vue.js (JavaScript), HTML ou CSS podes contribuir para o <a href="https://codeberg.org/RemixDev/deemix-webui" target="_blank">WebUI</a>.`,
        itsFree: `Deves ter em conta que <strong>que este projecto é gratuito</strong> e <strong>deverás apoiar os artistas que aprecias</strong> antes de apoiares os programadores.`,
        notObligated: `Não te sintas obrigado a doar, agradeço-te na mesma!`,
        lincensedUnder: `This work is licensed under a
            <a rel="license" href="https://www.gnu.org/licenses/gpl-3.0.en.html" target="_blank"
                >GNU General Public License 3.0</a
            >.`
    },
    charts: {
        title: 'Tabelas',
        changeCountry: 'Alterar país',
        download: 'Descarregar tabela'
    },
    errors: {
        title: 'Erros para {0}',
        ids: {
            invalidURL: 'URL não reconhecido',
            unsupportedURL: 'URL ainda não suportado',
            ISRCnotOnDeezer: 'Track ISRC não disponível no deezer',
            notYourPrivatePlaylist: "You can't download others private playlists.",
            spotifyDisabled: 'Funcionalidades do Spotify não estão definidas corretamente.',
            trackNotOnDeezer: 'Faixa não encontrada no deezer!',
            albumNotOnDeezer: 'Álbum não encontrado no deezer!',
            notOnDeezer: 'Faixa não encontrada no Deezer!',
            notEncoded: 'Faixa ainda não codificada!',
            notEncodedNoAlternative: 'Faixa ainda não codificada e não foi encontrada alternativa!',
            wrongBitrate: 'Faixa não encontrada no bitrate desejado.',
            wrongBitrateNoAlternative: 'Faixa não encontrada no bitrate desejado e não foi encontrada alternativa!',
            no360RA: 'Faixa não disponível em Reality Audio 360.',
            notAvailable: "Faixa não disponível nos servidores do deezer!",
            notAvailableNoAlternative: "Faixa não disponível nos servidores do deezer e não foi encontrada alternativa!"
        }
    },
    favorites: {
        title: 'Favoritos',
        noPlaylists: 'Listas de reprodução não encontradas',
        noAlbums: 'Álbuns favoritos não encontrados',
        noArtists: 'Artistas favoritos não encontrados',
        noTracks: 'Faixas favoritas não encontradas'
    },
    home: {
        needTologin: 'Antes de iniciar transferências é necessário efectuar autenticação na conta Deezer.',
        openSettings: 'Abrir Definições',
        sections: {
            popularPlaylists: 'Listas de reprodução populares',
            popularAlbums: 'Álbuns mais ouvidos'
        }
    },
    linkAnalyzer: {
        info: 'Podes usar esta secção para obteres mais informação sobre o link que estás a tentar transferir.',
        useful:
            "Isto é útil caso estejas a tentar transferir faixas que não estão disponíveis no teu país e queres saber onde estão disponíveis, por exemplo.",
        linkNotSupported: 'Este link ainda não é suportado',
        linkNotSupportedYet: 'Parece que este link ainda não é suportado, tenta analisar outro.',
        table: {
            id: 'ID',
            isrc: 'ISRC',
            upc: 'UPC',
            duration: 'Duração',
            diskNumber: 'Número do disco',
            trackNumber: 'Número da faixa',
            releaseDate: 'Data de lançamento',
            bpm: 'BPM',
            label: 'Editora',
            recordType: 'Record Type',
            genres: 'Géneros',
            tracklist: 'Lista de faixas'
        }
    },
    search: {
        startSearching: 'Começa a pesquisar!',
        description:
            'Podes perquisar uma música, um álbum inteiro, um artista, uma lista de reprodução... tudo! Também podes colar um link do Deezer',
        fans: '{0} fãs',
        noResults: 'Sem resultados',
        noResultsTrack: 'Faixa não encontrada',
        noResultsAlbum: 'Álbum não encontrado',
        noResultsArtist: 'Artista não encontrado',
        noResultsPlaylist: 'Lista de reprodução não encontrada'
    },
    searchbar: 'Pesquisa o que quiseres (ou cola um link)',
    downloads: 'transferências',
    toasts: {
        addedToQueue: '{0} adicionados à fila',
        alreadyInQueue: '{0} já está na fila!',
        finishDownload: '{0} foi transferido.',
        allDownloaded: 'Todas as transferências terminadas!',
        refreshFavs: 'Actualizar terminados!',
        loggingIn: 'A autenticar',
        loggedIn: 'Autenticado',
        alreadyLogged: 'Já estás autenticado',
        loginFailed: "Couldn't log in",
        loggedOut: 'Logged out',
        cancellingCurrentItem: 'A cancelar item actual.',
        currentItemCancelled: 'Item actual cancelado.',
        startAddingArtist: 'A adicionar {0} álbuns à fila',
        finishAddingArtist: 'Adicionados {0} álbuns à fila',
        startConvertingSpotifyPlaylist: 'A converter faixas do spotify em faixas do deezer',
        finishConvertingSpotifyPlaylist: 'Lista de reprodução do Spotify convertida.'
    },
    settings: {
        title: 'Definições',
        languages: 'Idioma',
        login: {
            title: 'Login',
            loggedIn: 'Estás autenticado como {username}',
            arl: {
                question: 'Como obter o meu ARL?',
                update: 'Atualizar ARL'
            },
            logout: 'Sair'
        },
        appearance: {
            title: 'Aspecto',
            slimDownloadTab: 'Aba de transferências estreita'
        },
        downloadPath: {
            title: 'Caminho de transferências'
        },
        templates: {
            title: 'Formatos',
            tracknameTemplate: 'Formato do nome de faixa',
            albumTracknameTemplate: 'Formato do nome de Álbum',
            playlistTracknameTemplate: 'Formato do nome de lista de reprodução'
        },
        folders: {
            title: 'Pastas',
            createPlaylistFolder: 'Criar pasta para lista de reprodução',
            playlistNameTemplate: 'Formato da pasta de lista de reprodução',
            createArtistFolder: 'Criar pasta para artista',
            artistNameTemplate: 'Formato da pasta de artista',
            createAlbumFolder: 'Criar pasta para álbum',
            albumNameTemplate: 'Formato da pasta de álbum',
            createCDFolder: 'Criar pasta para CDs',
            createStructurePlaylist: 'Criar estrutura de pastas para listas reprodução',
            createSingleFolder: 'Criar estrutura de pastas para singles'
        },
        trackTitles: {
            title: 'Título',
            padTracks: 'Pad tracks',
            paddingSize: 'Overwrite padding size',
            illegalCharacterReplacer: 'Substituir caractere inválidos'
        },
        downloads: {
            title: 'Transferências',
            queueConcurrency: 'Transferências concorrentes',
            maxBitrate: {
                title: 'Bitrate preferencial',
                9: 'FLAC 1411kbps',
                3: 'MP3 320kbps',
                1: 'MP3 128kbps'
            },
            overwriteFile: {
                title: 'Ficheiros existentes. Substituir?',
                y: 'Sim, substituir o ficheiro',
                n: "Não substituir o ficheiro",
                t: 'Sobrescrever apenas as etiquetas'
            },
            fallbackBitrate: 'Bitrate fallback',
            fallbackSearch: 'Fallback de pesquisa',
            logErrors: 'Criar logs para erros',
            logSearched: 'Criar logs para faixas pesquisadas',
            createM3U8File: 'Criar ficheiro de lista de reprodução',
            syncedLyrics: 'Criar ficheiro .lyr (Letras Sincronizadas)',
            playlistFilenameTemplate: 'Formato do nome de ficheiro playlists',
            saveDownloadQueue: 'Guardar fila de transferências ao fechar a aplicação'
        },
        covers: {
            title: 'Capas do Álbum',
            saveArtwork: 'Guardar capas',
            coverImageTemplate: 'Cover name template',
            saveArtworkArtist: 'Save artist image',
            artistImageTemplate: 'Artist image template',
            localArtworkSize: 'Local artwork size',
            embeddedArtworkSize: 'Embedded artwork size',
            localArtworkFormat: {
                title: 'What format do you want the local artwork to be?',
                jpg: 'A jpeg image',
                png: 'A png image',
                both: 'Both a jpeg and a png'
            },
            jpegImageQuality: 'Qualidade de imagem JPEG'
        },
        tags: {
            head: 'Etiquetas a guardar',
            title: 'Título',
            artist: 'Artista',
            album: 'Álbum',
            cover: 'Capa',
            trackNumber: 'Número de faixa',
            trackTotal: 'Total de faixas',
            discNumber: 'Número do Disco',
            discTotal: 'Total de Discos',
            albumArtist: 'Artista do Álbum',
            genre: 'Género',
            year: 'Ano',
            date: 'Data',
            explicit: 'Letra Explícita',
            isrc: 'ISRC',
            length: 'Duração da faixa',
            barcode: 'Código de barras do álbum (UPC)',
            bpm: 'BPM',
            replayGain: 'Replay Gain',
            label: 'Editora do álbum',
            lyrics: 'Unsynchronized Lyrics',
            copyright: 'Copyright',
            composer: 'Compositor',
            involvedPeople: 'Pessoas envolvidas'
        },
        other: {
            title: 'Outros',
            savePlaylistAsCompilation: 'Save playlists as compilation',
            useNullSeparator: 'Usar separador null',
            saveID3v1: 'Também guardar ID3v1',
            multiArtistSeparator: {
                title: 'Como queres separarar os artistas?',
                nothing: 'Guardar apenas o artista principal',
                default: 'Usar especificação padrão',
                andFeat: 'Usar & e feat.',
                using: 'Usar "{0}"'
            },
            singleAlbumArtist: 'Guardar apenas o artista principal do álbum',
            albumVariousArtists: 'Manter "Various Artists" nos Artistas do Álbum',
            removeAlbumVersion: 'Remover "Album Version" do título da faixa',
            removeDuplicateArtists: 'Remover combinação de artistas',
            dateFormat: {
                title: 'Formtado de data nos ficheiros FLAC',
                year: 'AAAA',
                month: 'MM',
                day: 'DD'
            },
            featuredToTitle: {
                title: 'What should I do with featured artists?',
                0: 'Nada',
                1: 'Remover do título',
                3: 'Remover do título de do título do album',
                2: 'Movê-lo para o título'
            },
            titleCasing: 'Title casing',
            artistCasing: 'Artist casing',
            casing: {
                nothing: 'Manter inalterado',
                lower: 'minusculas',
                upper: 'MAIÙSCULAS',
                start: 'Ínicio De Cada Palavra',
                sentence: 'Like a sentence'
            },
            previewVolume: 'Preview Volume',
            executeCommand: {
                title: 'Comando a executar após transferir',
                description: 'Deixar em branco para nenhuma acção'
            }
        },
        spotify: {
            title: 'Funcionalidades Spotify',
            clientID: 'Spotify clientID',
            clientSecret: 'Spotify Client Secret',
            username: 'nome de utilizador Spotify'
        },
        reset: 'Reset to Default',
        save: 'Save',
        toasts: {
            init: 'Configurações carregadas!',
            update: 'Configurações actualizadas',
            ARLcopied: 'ARL copied to clipboard'
        }
    },
    sidebar: {
        home: 'início',
        search: 'pesquisa',
        charts: 'tabelas',
        favorites: 'favoritos',
        linkAnalyzer: 'link analyzer',
        settings: 'definições',
        about: 'sobre'
    },
    tracklist: {
        downloadSelection: 'Descarregar seleccionados'
    }
}

export default pt