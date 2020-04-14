// Debug messages for socketio
socket.on("message", function(msg){
	console.log(msg)
})

function changeTab(evt, section, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName(section+"_tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
	tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName(section+"_tablinks");
  for (i = 0; i < tablinks.length; i++) {
	tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
	window[section+"_selected"] = tabName
  evt.currentTarget.className += " active";
	// Check if you need to load more content in the search tab
	if (document.getElementById("content").offsetHeight >= document.getElementById("content").scrollHeight && main_selected == "search_tab" && ["track_search", "album_search", "artist_search", "playlist_search"].indexOf(search_selected) != -1){
		scrolledSearch(window[search_selected.split("_")[0]+"Search"])
	}
}

// Load more content when the search page is at the end
$('#content').on('scroll', function() {
  if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
		if (main_selected == "search_tab" && ["track_search", "album_search", "artist_search", "playlist_search"].indexOf(search_selected) != -1){
			scrolledSearch(window[search_selected.split("_")[0]+"Search"])
		}
  }
})

function scrolledSearch(vueTab){
	query = vueTab.query
	if (vueTab.results.next < vueTab.results.total){
		socket.emit("search", {term: vueTab.query, type: vueTab.type, start: vueTab.results.next, nb: vueTab.nb});
	}
}

function searchUpadate(result){
	console.log(result)
	vueTab = null;
	switch (result.type) {
		case "TRACK":
			vueTab = trackSearch;
		break;
		case "ALBUM":
			vueTab = albumSearch;
		break;
		case "ARTIST":
			vueTab = artistSearch;
		break;
		case "PLAYLIST":
			vueTab = playlistSearch;
		break;
	}
	if (vueTab && vueTab.results.next != result.next){
		vueTab.results.next = result.next
		vueTab.results.data = vueTab.results.data.concat(result.data)
	}
}
socket.on("search", function(result){searchUpadate(result)})

function clickElement(button){
	return document.getElementById(button).click()
}

function sendAddToQueue(url, bitrate = null){
	console.log(url)
	socket.emit("addToQueue", {url: url, bitrate:bitrate})
}

var mainSearch = new Vue({
  el: '#main_search',
  data: {
		names: {
			"TOP_RESULT": "Top Result",
			"TRACK": "Tracks",
			"ARTIST": "Artists",
			"ALBUM": "Albums",
			"PLAYLIST": "Playlists"
		},
		results: {
			QUERY: "",
			ORDER: [],
			ALBUM: {},
			ARTIST: {},
			TRACK: {},
			TOP_RESULT: [],
			PLAYLIST: {}
		},
  },
	methods: {
		changeSearchTab: function (section) {
			if (section != "TOP_RESULT")
				clickElement('search_'+section.toLowerCase()+'_tab')
		},
		addToQueue: function(url){sendAddToQueue(url)}
	}
})

var trackSearch = new Vue({
  el: '#track_search',
  data: {
		type: "TRACK",
		nb: 40,
		query: "",
		results: {
			data: [],
			next: 0,
			total: 0
		}
  },
	methods: {
		addToQueue: function(url){sendAddToQueue(url)}
	}
})

var albumSearch = new Vue({
  el: '#album_search',
  data: {
		type: "ALBUM",
		nb: 20,
		query: "",
		results: {
			data: [],
			next: 0,
			total: 0
		}
  },
	methods: {
		addToQueue: function(url){sendAddToQueue(url)}
	}
})

var artistSearch = new Vue({
  el: '#artist_search',
  data: {
		type: "ARTIST",
		nb: 20,
		query: "",
		results: {
			data: [],
			next: 0,
			total: 0
		}
  },
	methods: {
		addToQueue: function(url){sendAddToQueue(url)}
	}
})

var playlistSearch = new Vue({
  el: '#playlist_search',
  data: {
		type: "PLAYLIST",
		nb: 20,
		query: "",
		results: {
			data: [],
			next: 0,
			total: 0
		}
  },
	methods: {
		addToQueue: function(url){sendAddToQueue(url)}
	}
})

// Search section
$("#searchbar").keyup(function(e){
  if(e.keyCode == 13){
		term = this.value
		console.log(term)
		if (isValidURL(term))
			socket.emit("addToQueue", {url: term});
		else{
			document.getElementById("search_tab_content").style.display = "none";
			socket.emit("mainSearch", {term: term});
		}
  }
})

function mainSearchHandler(result){
	console.log(result)
	mainSearch.results = result
	trackSearch.results = result.TRACK
	albumSearch.results = result.ALBUM
	artistSearch.results = result.ARTIST
	playlistSearch.results = result.PLAYLIST
	trackSearch.query = result.QUERY
	albumSearch.query = result.QUERY
	artistSearch.query = result.QUERY
	playlistSearch.query = result.QUERY
	document.getElementById("search_all_tab").click();
	document.getElementById("search_tab_content").style.display = "block";
	document.getElementById("main_search_tablink").click();
}
socket.on("mainSearch", function(result){mainSearchHandler(result)})
