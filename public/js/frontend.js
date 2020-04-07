// Initialization
doAjax("/init", "POST");

// From https://gist.github.com/dharmavir/936328
function getHttpRequestObject(){
	// Define and initialize as false
	var xmlHttpRequst = false;
	// Mozilla/Safari/Non-IE
	if (window.XMLHttpRequest){
		xmlHttpRequst = new XMLHttpRequest();
	}
	// IE
	else if (window.ActiveXObject){
		xmlHttpRequst = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xmlHttpRequst;
}

// Does the AJAX call to URL specific with rest of the parameters
function doAjax(url, method, responseHandler, data){
	// Set the variables
	url = url || "";
	method = method || "GET";
	async = true;
	data = data || {};

	if(url == ""){
		alert("URL cannot be null/blank");
		return false;
	}
	var xmlHttpRequest = getHttpRequestObject();

	// If AJAX supported
	if(xmlHttpRequest != false){
		xmlHttpRequest.open(method, url, async);
		// Set request header (optional if GET method is used)
		if(method == "POST"){
				xmlHttpRequest.setRequestHeader("Content-Type", "application/json");
		}
		// Assign (or define) response-handler/callback when ReadyState is changed.
		xmlHttpRequest.onreadystatechange = function(){
			if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
		    responseHandler(JSON.parse(this.responseText))
		  }
		};
		// Send data
		xmlHttpRequest.send(JSON.stringify(data));
	}
	else{
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

// Search section
$("#searchbar").on('search', function(){
	term = this.value
	console.log(term)
	doAjax("/search", "POST", searchHandler, {term: term});
})

function searchHandler(result){
	console.log(result)
	$("#container").text(JSON.stringify(result))
}
