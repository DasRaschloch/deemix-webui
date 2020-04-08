function isValidURL(text){
	if (text.toLowerCase().startsWith("http"))
		if (text.toLowerCase().indexOf("deezer.com") >= 0 || text.toLowerCase().indexOf("open.spotify.com") >= 0)
			return true
	else if (text.toLowerCase().startsWith("spotify:"))
		return true
	return false
}
