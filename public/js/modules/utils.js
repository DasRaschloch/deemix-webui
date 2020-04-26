function isValidURL(text) {
	if (text.toLowerCase().startsWith('http')) {
		if (text.toLowerCase().indexOf('deezer.com') >= 0 || text.toLowerCase().indexOf('open.spotify.com') >= 0)
			return true
	} else if (text.toLowerCase().startsWith('spotify:')) return true
	return false
}

function convertDuration(duration) {
	//convert from seconds only to mm:ss format
	let mm, ss
	mm = Math.floor(duration / 60)
	ss = duration - mm * 60
	//add leading zero if ss < 0
	if (ss < 10) {
		ss = '0' + ss
	}
	return mm + ':' + ss
}

function convertDurationSeparated(duration) {
	let hh, mm, ss
	mm = Math.floor(duration / 60)
	hh = Math.floor(mm / 60)
	ss = duration - mm * 60
	mm -= hh * 60
	return [hh, mm, ss]
}

function numberWithDots(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

// On scroll event, returns currentTarget = null
// Probably on other events too
function debounce(func, wait, immediate) {
	var timeout
	return function () {
		var context = this
		var args = arguments
		var later = function () {
			timeout = null
			if (!immediate) func.apply(context, args)
		}
		var callNow = immediate && !timeout
		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
		if (callNow) func.apply(context, args)
	}
}

export default {
	isValidURL,
	convertDuration,
	convertDurationSeparated,
  numberWithDots,
	debounce
}
