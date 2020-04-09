// Initialization
doAjax("/init", "POST");
search_selected = ""
main_selected=""

// Functions to connect to the Flask server
function getHttpRequestObject(){
	var xmlHttpRequst = false;
	if (window.XMLHttpRequest){
		xmlHttpRequst = new XMLHttpRequest();
	}else if (window.ActiveXObject){
		xmlHttpRequst = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xmlHttpRequst;
}
function doAjax(url, method, responseHandler, data){
	url = url || "";
	method = method || "GET";
	async = true;
	data = data || {};

	if(url == ""){
		alert("URL cannot be null/blank");
		return false;
	}
	var xmlHttpRequest = getHttpRequestObject();

	if(xmlHttpRequest != false){
		xmlHttpRequest.open(method, url, async);
		if(method == "POST"){
				xmlHttpRequest.setRequestHeader("Content-Type", "application/json");
		}
		if (typeof responseHandler === "function"){
			xmlHttpRequest.onreadystatechange = function(){
				if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
			    responseHandler(JSON.parse(this.responseText))
			  }
			}
		}
		xmlHttpRequest.send(JSON.stringify(data));
	}else{
		alert("Please use a browser with Ajax support!");
	}
}

// Show/Hide Download Tab
document.querySelector("#show_download_tab").onclick = (ev)=>{
	ev.preventDefault();
	document.querySelector("#download_tab_bar").style.display = "none";
	document.querySelector("#download_tab").style.display = "block";
}
document.querySelector("#hide_download_tab").onclick = (ev)=>{
	ev.preventDefault();
	document.querySelector("#download_tab_bar").style.display = "block";
	document.querySelector("#download_tab").style.display = "none";
}

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
	if (document.getElementById("content").offsetHeight >= document.getElementById("content").scrollHeight && main_selected == "search_tab" && ["track_search", "album_search", "artist_search", "playlist_search"].indexOf(search_selected) != -1){
		scrolledSearch(window[search_selected.split("_")[0]+"Search"])
	}
}

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
		doAjax("/search", "POST", searchUpadate, {term: vueTab.query, type: vueTab.type, start: vueTab.results.next, nb: vueTab.nb});
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

function clickElement(button){
	return document.getElementById(button).click()
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
		}
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
  }
})

// Search section
$("#searchbar").keyup(function(e){
  if(e.keyCode == 13){
		term = this.value
		console.log(term)
		if (isValidURL(term))
			doAjax("/download", "POST", null, {url: term});
		else{
			document.getElementById("search_tab_content").style.display = "none";
			doAjax("/mainsearch", "POST", searchHandler, {term: term});
		}
  }
})

function searchHandler(result){
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
	document.getElementById("search_defaultopen").click();
	document.getElementById("search_tab_content").style.display = "block";
	document.getElementById("show_searchtab").click();
}

$(function(){
	document.getElementById("main_defaultopen").click();
})
