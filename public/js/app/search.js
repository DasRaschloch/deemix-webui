// Load more content when the search page is at the end
$('#content').on('scroll', function () {
	if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
		if (
			main_selected == 'search_tab' &&
			['track_search', 'album_search', 'artist_search', 'playlist_search'].indexOf(search_selected) != -1
		) {
			scrolledSearch(search_selected.split('_')[0])
		}
	}
})

function search(type) {
	query = MainSearch.results.query
	socket.emit('search', {
		term: query,
		type: type,
		start: MainSearch.results[type+"Tab"].next,
		nb: 30
	})
}

function scrolledSearch(type) {
	query = MainSearch.results.query
	if (MainSearch.results[type+"Tab"].next < MainSearch.results[type+"Tab"].total) {
		socket.emit('search', {
			term: query,
			type: type,
			start: MainSearch.results[type+"Tab"].next,
			nb: 30
		})
	}
}

function searchUpadate(result) {
	let next = 0
	if (result.next) next = parseInt(result.next.match(/index=(\d*)/)[1])
	else next = result.total
	if (MainSearch.results[result.type+"Tab"].total != result.total) MainSearch.results[result.type+"Tab"].total = result.total
	if (MainSearch.results[result.type+"Tab"].next != next) {
		MainSearch.results[result.type+"Tab"].next = next
		MainSearch.results[result.type+"Tab"].data = MainSearch.results[result.type+"Tab"].data.concat(result.data)
	}
	MainSearch.results[result.type+"Tab"].loaded = true
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
	el: '#search_tab',
	data: {
		names: {
			TOP_RESULT: 'Top Result',
			TRACK: 'Tracks',
			ARTIST: 'Artists',
			ALBUM: 'Albums',
			PLAYLIST: 'Playlists'
		},
		results: {
			query: '',
			allTab: {
				ORDER: [],
				TOP_RESULT: [],
				ALBUM: {},
				ARTIST: {},
				TRACK: {},
				PLAYLIST: {}
			},
			trackTab: {
				data: [],
				next: 0,
				total: 0,
				loaded: false
			},
			albumTab: {
				data: [],
				next: 0,
				total: 0,
				loaded: false
			},
			artistTab: {
				data: [],
				next: 0,
				total: 0,
				loaded: false
			},
			playlistTab: {
				data: [],
				next: 0,
				total: 0,
				loaded: false
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

// Search section
$("#searchbar").keyup(function(e){
  if(e.keyCode == 13){
    let term = this.value
    if (isValidURL(term)){
      if (e.ctrlKey){
        openQualityModal(term);
      }else{
        sendAddToQueue(term);
      }
    }else{
			if (term != MainSearch.query || main_selected == 'search_tab'){
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
	let resetObj = {data: [], next: 0, total: 0, loaded: false}
	MainSearch.results.allTab = result
	MainSearch.results.query = result.QUERY
	MainSearch.results.trackTab = {...resetObj}
	MainSearch.results.albumTab = {...resetObj}
	MainSearch.results.artistTab = {...resetObj}
	MainSearch.results.playlistTab = {...resetObj}
	document.getElementById('search_all_tab').click()
	document.getElementById('search_tab_content').style.display = 'block'
	document.getElementById('main_search_tablink').click()
}

socket.on('mainSearch', function (result) {
	mainSearchHandler(result)
})
