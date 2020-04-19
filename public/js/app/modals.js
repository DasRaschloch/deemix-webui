// quality modal stuff
var modalQuality = document.getElementById('modal_quality')
modalQuality.open = false

window.onclick = function (event) {
	if (event.target == modalQuality && modalQuality.open) {
		$(modalQuality).addClass('animated fadeOut')
	}
}

$(modalQuality).on('webkitAnimationEnd', function () {
	if (modalQuality.open) {
		$(this).removeClass('animated fadeOut')
		$(this).css('display', 'none')
		modalQuality.open = false
	} else {
		$(this).removeClass('animated fadeIn')
		$(this).css('display', 'block')
		modalQuality.open = true
	}
})

function openQualityModal(link) {
	$(modalQuality).data('url', link)
	$(modalQuality).css('display', 'block')
	$(modalQuality).addClass('animated fadeIn')
}

function modalQualityButton(event) {
	if (!event.target.matches('.quality-button')) {
		return
	}

	let bitrate = event.target.dataset.qualityValue

	var url = $(modalQuality).data('url')
	sendAddToQueue(url, bitrate)
	$(modalQuality).addClass('animated fadeOut')
}