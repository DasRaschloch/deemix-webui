// Initialization
doAjax("/init", "POST");

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
			ORDER: [],
			ALBUM: {},
			ARTIST: {},
			TRACK: {},
			TOP_RESULT: [],
			PLAYLIST: {}
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
		else
			doAjax("/search", "POST", searchHandler, {term: term});
  }
})

function searchHandler(result){
	console.log(result)
	mainSearch.results = result
}
