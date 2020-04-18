// Load more content when the search page is at the end
$('#content').on('scroll', function () {
	if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
		if (
			main_selected == 'search_tab' &&
			['track_search', 'album_search', 'artist_search', 'playlist_search'].indexOf(search_selected) != -1
		) {
			scrolledSearch(window[search_selected.split('_')[0] + 'Search'])
		}
	}
})

function scrolledSearch(vueTab) {
	query = vueTab.query
	if (vueTab.results.next < vueTab.results.total) {
		socket.emit('search', {
			term: vueTab.query,
			type: vueTab.type,
			start: vueTab.results.next,
			nb: vueTab.nb
		})
	}
}

function searchUpadate(result) {
	vueTab = null
	switch (result.type) {
		case 'TRACK':
			vueTab = trackSearch
			break
		case 'ALBUM':
			vueTab = albumSearch
			break
		case 'ARTIST':
			vueTab = artistSearch
			break
		case 'PLAYLIST':
			vueTab = playlistSearch
			break
	}
	if (vueTab && vueTab.results.next != result.next) {
		vueTab.results.next = result.next
		vueTab.results.data = vueTab.results.data.concat(result.data)
	}
}
socket.on('search', function (result) {
	searchUpadate(result)
})

function clickElement(button) {
	return document.getElementById(button).click()
}

function sendAddToQueue(url, bitrate = null) {
	if (url.indexOf(";") != -1){
		urls = url.split(";")
		urls.forEach(url=>{
			socket.emit('addToQueue', { url: url, bitrate: bitrate })
		})
	}else if(url != ""){
		socket.emit('addToQueue', { url: url, bitrate: bitrate })
	}
}

let MainSearch = new Vue({
	el: '#main_search',
	data() {
		return {
			names: {
				TOP_RESULT: 'Top Result',
				TRACK: 'Tracks',
				ARTIST: 'Artists',
				ALBUM: 'Albums',
				PLAYLIST: 'Playlists'
			},
			results: {
				QUERY: '',
				ORDER: [],
				ALBUM: {},
				ARTIST: {},
				TRACK: {},
				TOP_RESULT: [],
				PLAYLIST: {}
			}
		}
	},
	methods: {
		changeSearchTab(section) {
			if (section != 'TOP_RESULT') clickElement('search_' + section.toLowerCase() + '_tab')
		},
    addToQueue: function(e){e.stopPropagation(); sendAddToQueue(e.currentTarget.dataset.link)},
		openQualityModal: function(e){e.preventDefault(); openQualityModal(e.currentTarget.dataset.link)}
	}
})

var trackSearch = new Vue({
	el: '#track_search',
	data: {
		type: 'TRACK',
		nb: 40,
		query: '',
		results: {
			data: [],
			next: 0,
			total: 0
		}
	},
	methods: {
		addToQueue: function(e){e.stopPropagation(); sendAddToQueue(e.currentTarget.dataset.link)},
		openQualityModal: function(e){e.preventDefault(); openQualityModal(e.currentTarget.dataset.link)}
	}
})

var albumSearch = new Vue({
	el: '#album_search',
	data: {
		type: 'ALBUM',
		nb: 20,
		query: '',
		results: {
			data: [],
			next: 0,
			total: 0
		}
	},
	methods: {
		addToQueue: function(e){e.stopPropagation(); sendAddToQueue(e.currentTarget.dataset.link)},
		openQualityModal: function(e){e.preventDefault(); openQualityModal(e.currentTarget.dataset.link)}
	}
})

var artistSearch = new Vue({
	el: '#artist_search',
	data: {
		type: 'ARTIST',
		nb: 20,
		query: '',
		results: {
			data: [],
			next: 0,
			total: 0
		}
	},
	methods: {
		addToQueue: function(e){e.stopPropagation(); sendAddToQueue(e.currentTarget.dataset.link)},
		openQualityModal: function(e){e.preventDefault(); openQualityModal(e.currentTarget.dataset.link)}
	}
})

var playlistSearch = new Vue({
	el: '#playlist_search',
	data: {
		type: 'PLAYLIST',
		nb: 20,
		query: '',
		results: {
			data: [],
			next: 0,
			total: 0
		}
	},
	methods: {
		addToQueue: function(e){e.stopPropagation(); sendAddToQueue(e.currentTarget.dataset.link)},
		openQualityModal: function(e){e.preventDefault(); openQualityModal(e.currentTarget.dataset.link)}
	}
})

let term = null

// Search section
$("#searchbar").keyup(function(e){
  if(e.keyCode == 13){
    term = this.value
    if (isValidURL(term)){
      if (e.ctrlKey){
        openQualityModal(term);
      }else{
        sendAddToQueue(term);
      }
    }else{
			if (term != MainSearch.results.QUERY || main_selected == 'search_tab'){
				document.getElementById("search_tab_content").style.display = "none";
				socket.emit("mainSearch", {term: term});
			}else{
				document.getElementById('search_all_tab').click()
				document.getElementById('search_tab_content').style.display = 'block'
				document.getElementById('main_search_tablink').click()
			}
		}
	}
})

function mainSearchHandler(result) {
	MainSearch.results = result
	trackSearch.results = result.TRACK
	albumSearch.results = result.ALBUM
	artistSearch.results = result.ARTIST
	playlistSearch.results = result.PLAYLIST
	trackSearch.query = result.QUERY
	albumSearch.query = result.QUERY
	artistSearch.query = result.QUERY
	playlistSearch.query = result.QUERY
	document.getElementById('search_all_tab').click()
	document.getElementById('search_tab_content').style.display = 'block'
	document.getElementById('main_search_tablink').click()
}

socket.on('mainSearch', function (result) {
	mainSearchHandler(result)
})
