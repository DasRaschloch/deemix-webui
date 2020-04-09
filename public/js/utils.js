function isValidURL(text){
	if (text.toLowerCase().startsWith("http"))
		if (text.toLowerCase().indexOf("deezer.com") >= 0 || text.toLowerCase().indexOf("open.spotify.com") >= 0)
			return true
	else if (text.toLowerCase().startsWith("spotify:"))
		return true
	return false
}
function convertDuration(duration) {
	//convert from seconds only to mm:ss format
	var mm, ss
	mm = Math.floor(duration / 60)
	ss = duration - (mm * 60)
	//add leading zero if ss < 0
	if (ss < 10) {
		ss = "0" + ss
	}
	return mm + ":" + ss
}

function convertDurationSeparated(duration){
	var hh, mm, ss
	mm = Math.floor(duration / 60)
	hh = Math.floor(mm / 60)
	ss = duration - (mm * 60)
	mm -= hh*60
	return [hh, mm, ss]
}

function numberWithDots(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
