const socket = io.connect(window.location.href);

socket.on('connect', () => {
	document.getElementById('loading_overlay').classList.remove('active');
});

let toastsWithId = {};

const toast = function (msg, icon = null, dismiss = true, id = null) {
	if (toastsWithId[id]) {
		let toastObj = toastsWithId[id];
		let toastDOM = $(`div.toastify[toast_id=${id}]`);
		if (msg) {
			toastDOM.find('.toast-message').html(msg);
		}
		if (icon) {
			if (icon == 'loading') icon = `<div class="circle-loader"></div>`;
			else icon = `<i class="material-icons">${icon}</i>`;
			toastDOM.find('.toast-icon').html(icon);
		}
		if (dismiss !== null && dismiss) {
			setTimeout(function () {
				toastObj.hideToast();
				delete toastsWithId[id];
			}, 3000);
		}
	} else {
		if (icon == null) icon = '';
		else if (icon == 'loading') icon = `<div class="circle-loader"></div>`;
		else icon = `<i class="material-icons">${icon}</i>`;
		let toastObj = Toastify({
			text: `<span class="toast-icon">${icon}</span><span class="toast-message">${msg}</toast>`,
			duration: dismiss ? 3000 : 0,
			gravity: 'bottom',
			position: 'left'
		}).showToast();
		if (id) {
			toastsWithId[id] = toastObj;
			$(toastObj.toastElement).attr('toast_id', id);
		}
	}
};

socket.on('toast', data => {
	toast(data.msg, data.icon || null, data.dismiss !== undefined ? data.dismiss : true, data.id || null);
});

/* ===== Locals ===== */
const tabMinWidth = 250;
const tabMaxWidth = 500;

let cachedTabWidth = parseInt(localStorage.getItem('downloadTabWidth')) || 300;
let queueList = {};
let queue = [];
let queueComplete = [];
let tabContainerEl;
let listEl;
let dragHandlerEl;

function init() {
	// Find download DOM elements
	tabContainerEl = document.getElementById('download_tab_container');
	listEl = document.getElementById('download_list');
	dragHandlerEl = document.getElementById('download_tab_drag_handler');

	// Check if download tab should be open
	if ('true' === localStorage.getItem('downloadTabOpen')) {
		tabContainerEl.classList.remove('tab_hidden');

		setTabWidth(cachedTabWidth);
	}

	linkListeners();
}

function linkListeners() {
	listEl.addEventListener('click', handleListClick);
	document.getElementById('toggle_download_tab').addEventListener('click', toggleDownloadTab);

	// Queue buttons
	document.getElementById('clean_queue').addEventListener('click', () => {
		socket.emit('removeFinishedDownloads');
	});

	document.getElementById('cancel_queue').addEventListener('click', () => {
		socket.emit('cancelAllDownloads');
	});

	dragHandlerEl.addEventListener('mousedown', event => {
		event.preventDefault();

		document.addEventListener('mousemove', handleDrag);
	});

	document.addEventListener('mouseup', () => {
		document.removeEventListener('mousemove', handleDrag);
	});

	tabContainerEl.addEventListener('transitionend', () => {
		tabContainerEl.style.transition = '';
	});

	window.addEventListener('beforeunload', () => {
		localStorage.setItem('downloadTabWidth', cachedTabWidth);
	});
}

function setTabWidth(newWidth) {
	if (undefined === newWidth) {
		tabContainerEl.style.width = '';
		listEl.style.width = '';
	} else {
		tabContainerEl.style.width = newWidth + 'px';
		listEl.style.width = newWidth + 'px';
	}
}

function handleDrag(event) {
	let newWidth = window.innerWidth - event.pageX + 2;

	if (newWidth < tabMinWidth) {
		newWidth = tabMinWidth;
	} else if (newWidth > tabMaxWidth) {
		newWidth = tabMaxWidth;
	}

	cachedTabWidth = newWidth;

	setTabWidth(newWidth);
}

function sendAddToQueue(url, bitrate = null) {
	if (url.indexOf(';') !== -1) {
		let urls = url.split(';');
		urls.forEach(url => {
			socket.emit('addToQueue', { url: url, bitrate: bitrate });
		});
	} else if (url != '') {
		socket.emit('addToQueue', { url: url, bitrate: bitrate });
	}
}

function addToQueue(queueItem, current = false) {
	queueList[queueItem.uuid] = queueItem;
	if (queueItem.downloaded + queueItem.failed == queueItem.size) {
		queueComplete.push(queueItem.uuid);
	} else {
		queue.push(queueItem.uuid);
	}
	$(listEl).append(
		`<div class="download_object" id="download_${queueItem.uuid}" data-deezerid="${queueItem.id}">
		<div class="download_info">
			<img width="75px" class="rounded coverart" src="${queueItem.cover}" alt="Cover ${queueItem.title}"/>
			<div class="download_info_data">
				<span class="download_line">${queueItem.title}</span> <span class="download_slim_separator"> - </span>
				<span class="secondary-text">${queueItem.artist}</span>
			</div>
			<div class="download_info_status">
				<span class="download_line"><span class="queue_downloaded">${queueItem.downloaded + queueItem.failed}</span>/${
			queueItem.size
		}</span>
			</div>
		</div>
		<div class="download_bar">
			<div class="progress"><div id="bar_${queueItem.uuid}" class="indeterminate"></div></div>
			<i class="material-icons queue_icon" data-uuid="${queueItem.uuid}">remove</i>
		</div>
	</div>`
	);
	if (queueItem.progress > 0 || current) {
		$('#bar_' + queueItem.uuid)
			.removeClass('indeterminate')
			.addClass('determinate');
	}
	$('#bar_' + queueItem.uuid).css('width', queueItem.progress + '%');
	if (queueItem.failed >= 1) {
		$('#download_' + queueItem.uuid + ' .download_info_status').append(
			`<span class="secondary-text inline-flex"><span class="download_slim_separator">(</span><span class="queue_failed">${queueItem.failed}</span><i class="material-icons">error_outline</i><span class="download_slim_separator">)</span></span>`
		);
	}
	if (queueItem.downloaded + queueItem.failed == queueItem.size) {
		let result_icon = $('#download_' + queueItem.uuid).find('.queue_icon');
		if (queueItem.failed == 0) {
			result_icon.text('done');
		} else if (queueItem.failed == queueItem.size) {
			result_icon.text('error');
		} else {
			result_icon.text('warning');
		}
	}
}

function initQueue(data) {
	if (data.queueComplete.length) {
		data.queueComplete.forEach(item => {
			addToQueue(data.queueList[item]);
		});
	}
	if (data.currentItem) {
		addToQueue(data['queueList'][data.currentItem], true);
	}
	data.queue.forEach(item => {
		addToQueue(data.queueList[item]);
	});
}

function startDownload(uuid) {
	$('#bar_' + uuid)
		.removeClass('indeterminate')
		.addClass('determinate');
}

socket.on('startDownload', startDownload);

function handleListClick(event) {
	if (!event.target.matches('.queue_icon[data-uuid]')) {
		return
	}

	let icon = event.target.innerText;
	let uuid = $(event.target).data('uuid');

	switch (icon) {
		case 'remove':
			socket.emit('removeFromQueue', uuid);
			break
	}
}

// Show/Hide Download Tab
function toggleDownloadTab(ev) {
	ev.preventDefault();

	setTabWidth();

	tabContainerEl.style.transition = 'all 250ms ease-in-out';

	// Toggle returns a Boolean based on the action it performed
	let isHidden = tabContainerEl.classList.toggle('tab_hidden');

	if (!isHidden) {
		setTabWidth(cachedTabWidth);
	}

	localStorage.setItem('downloadTabOpen', !isHidden);
}

socket.on('init_downloadQueue', initQueue);
socket.on('addedToQueue', addToQueue);

function removeFromQueue(uuid) {
	let index = queue.indexOf(uuid);
	if (index > -1) {
		queue.splice(index, 1);
		$(`#download_${queueList[uuid].uuid}`).remove();
		delete queueList[uuid];
	}
}

socket.on('removedFromQueue', removeFromQueue);

function finishDownload(uuid) {
	if (queue.indexOf(uuid) > -1) {
		toast(`${queueList[uuid].title} finished downloading.`, 'done');
		$('#bar_' + uuid).css('width', '100%');
		let result_icon = $('#download_' + uuid).find('.queue_icon');
		if (queueList[uuid].failed == 0) {
			result_icon.text('done');
		} else if (queueList[uuid].failed >= queueList[uuid].size) {
			result_icon.text('error');
		} else {
			result_icon.text('warning');
		}
		let index = queue.indexOf(uuid);
		if (index > -1) {
			queue.splice(index, 1);
			queueComplete.push(uuid);
		}
		if (queue.length <= 0) {
			toast('All downloads completed!', 'done_all');
		}
	}
}

socket.on('finishDownload', finishDownload);

function removeAllDownloads(currentItem) {
	queueComplete = [];
	if (currentItem == '') {
		queue = [];
		queueList = {};
		$(listEl).html('');
	} else {
		queue = [currentItem];
		let tempQueueItem = queueList[currentItem];
		queueList = {};
		queueList[currentItem] = tempQueueItem;
		$('.download_object').each(function (index) {
			if ($(this).attr('id') != 'download_' + currentItem) $(this).remove();
		});
	}
}

socket.on('removedAllDownloads', removeAllDownloads);

function removedFinishedDownloads() {
	queueComplete.forEach(item => {
		$('#download_' + item).remove();
	});
	queueComplete = [];
}

socket.on('removedFinishedDownloads', removedFinishedDownloads);

function updateQueue(update) {
	if (update.uuid && queue.indexOf(update.uuid) > -1) {
		if (update.downloaded) {
			queueList[update.uuid].downloaded++;
			$('#download_' + update.uuid + ' .queue_downloaded').text(
				queueList[update.uuid].downloaded + queueList[update.uuid].failed
			);
		}
		if (update.failed) {
			queueList[update.uuid].failed++;
			$('#download_' + update.uuid + ' .queue_downloaded').text(
				queueList[update.uuid].downloaded + queueList[update.uuid].failed
			);
			if (queueList[update.uuid].failed == 1) {
				$('#download_' + update.uuid + ' .download_info_status').append(
					`<span class="secondary-text inline-flex"><span class="download_slim_separator">(</span><span class="queue_failed">1</span> <i class="material-icons">error_outline</i><span class="download_slim_separator">)</span></span>`
				);
			} else {
				$('#download_' + update.uuid + ' .queue_failed').text(queueList[update.uuid].failed);
			}
		}
		if (update.progress) {
			queueList[update.uuid].progress = update.progress;
			$('#bar_' + update.uuid).css('width', update.progress + '%');
		}
	}
}

socket.on('updateQueue', updateQueue);

var Downloads = {
	init,
	sendAddToQueue,
	addToQueue
};

const QualityModal = {
	// Defaults
	open: false,
	url: ''
};

function init$1() {
	QualityModal.element = document.getElementById('modal_quality');

	linkListeners$1();
}

function open(link) {
	QualityModal.url = link;
	QualityModal.element.style.display = 'block';
	QualityModal.element.classList.add('animated', 'fadeIn');
}

function linkListeners$1() {
	QualityModal.element.addEventListener('click', handleClick);
	QualityModal.element.addEventListener('webkitAnimationEnd', handleAnimationEnd);
}

function handleClick(event) {
	QualityModal.element.classList.add('animated', 'fadeOut');

	if (!event.target.matches('.quality-button')) {
		return
	}

	let bitrate = event.target.dataset.qualityValue;

	Downloads.sendAddToQueue(QualityModal.url, bitrate);
}

function handleAnimationEnd() {
	QualityModal.element.classList.remove('animated', QualityModal.open ? 'fadeOut' : 'fadeIn');
	QualityModal.element.style.display = QualityModal.open ? 'none' : 'block';
	QualityModal.open = !QualityModal.open;
}

var QualityModal$1 = {
	init: init$1,
	open
};

const ArtistTab = new Vue({
	data() {
		return {
			currentTab: '',
			sortKey: 'release_date',
			sortOrder: 'desc',
			title: '',
			image: '',
			type: '',
			link: '',
			head: null,
			body: null
		}
	},
	methods: {
		albumView,
		reset() {
			this.title = 'Loading...';
			this.image = '';
			this.type = '';
			this.currentTab = '';
			this.sortKey = 'release_date';
			this.sortOrder = 'desc';
			this.link = '';
			this.head = [];
			this.body = null;
		},
		addToQueue(e) {
			e.stopPropagation();
			Downloads.sendAddToQueue(e.currentTarget.dataset.link);
		},
		openQualityModal(e) {
			QualityModal$1.open(e.currentTarget.dataset.link);
		},
		sortBy(key) {
			if (key == this.sortKey) {
				this.sortOrder = this.sortOrder == 'asc' ? 'desc' : 'asc';
			} else {
				this.sortKey = key;
				this.sortOrder = 'asc';
			}
		},
		changeTab(tab) {
			this.currentTab = tab;
		},
		checkNewRelease(date) {
			let g1 = new Date();
			let g2 = new Date(date);
			g2.setDate(g2.getDate() + 3);
			g1.setHours(0, 0, 0, 0);

			return g1.getTime() <= g2.getTime()
		},
		showArtist(data) {
			this.title = data.name;
			this.image = data.picture_xl;
			this.type = 'Artist';
			this.link = `https://www.deezer.com/artist/${data.id}`;
			this.currentTab = Object.keys(data.releases)[0];
			this.sortKey = 'release_date';
			this.sortOrder = 'desc';
			this.head = [
				{ title: 'Title', sortKey: 'title' },
				{ title: 'Release Date', sortKey: 'release_date' },
				{ title: '', width: '32px' }
			];
			if (_.isEmpty(data.releases)) {
				this.body = null;
			} else {
				this.body = data.releases;
			}
		}
	},
	computed: {
		showTable() {
			if (this.body) return _.orderBy(this.body[this.currentTab], this.sortKey, this.sortOrder)
			else return []
		}
	},
	mounted() {
		socket.on('show_artist', this.showArtist);
	}
}).$mount('#artist_tab');

/* ===== Globals ====== */
window.preview_max_volume = 1;

/* ===== Locals ===== */
let preview_track = document.getElementById('preview-track');
let preview_stopped = true;

// init stuff
function init$2() {
	preview_track.volume = 1;
	/*preview_max_volume = parseFloat(localStorage.getItem("previewVolume"))
  if (preview_max_volume === null){
    preview_max_volume = 0.8
    localStorage.setItem("previewVolume", preview_max_volume)
  }*/

	// start playing when track loaded
	preview_track.addEventListener('canplay', function () {
		preview_track.play();
		preview_stopped = false;
		$(preview_track).animate({ volume: preview_max_volume }, 500);
	});

	// auto fadeout when at the end of the song
	preview_track.addEventListener('timeupdate', function () {
		if (preview_track.currentTime > preview_track.duration - 1) {
			$(preview_track).animate({ volume: 0 }, 800);
			preview_stopped = true;
			$('a[playing] > .preview_controls').css({ opacity: 0 });
			$('*').removeAttr('playing');
			$('.preview_controls').text('play_arrow');
			$('.preview_playlist_controls').text('play_arrow');
		}
	});
}

// on modal closing
function stopStackedTabsPreview() {
	if (
		$('.preview_playlist_controls').filter(function () {
			return $(this).attr('playing')
		}).length > 0
	) {
		$(preview_track).animate({ volume: 0 }, 800);
		preview_stopped = true;
		$('.preview_playlist_controls').removeAttr('playing');
		$('.preview_playlist_controls').text('play_arrow');
	}
}

// on hover event
function previewMouseEnter(e) {
	$(e.currentTarget).css({ opacity: 1 });
}

function previewMouseLeave(e) {
	let obj = e.currentTarget;
	if (($(obj).parent().attr('playing') && preview_stopped) || !$(obj).parent().attr('playing')) {
		$(obj).css({ opacity: 0 }, 200);
	}
}

// on click event
function playPausePreview(e) {
	e.preventDefault();
	let obj = e.currentTarget;
	var icon = obj.tagName == 'I' ? $(obj) : $(obj).children('i');
	if ($(obj).attr('playing')) {
		if (preview_track.paused) {
			preview_track.play();
			preview_stopped = false;
			icon.text('pause');
			$(preview_track).animate({ volume: preview_max_volume }, 500);
		} else {
			preview_stopped = true;
			icon.text('play_arrow');
			$(preview_track).animate({ volume: 0 }, 250, 'swing', () => {
				preview_track.pause();
			});
		}
	} else {
		$('*').removeAttr('playing');
		$(obj).attr('playing', true);
		$('.preview_controls').text('play_arrow');
		$('.preview_playlist_controls').text('play_arrow');
		$('.preview_controls').css({ opacity: 0 });
		icon.text('pause');
		icon.css({ opacity: 1 });
		preview_stopped = false;
		$(preview_track).animate({ volume: 0 }, 250, 'swing', () => {
			preview_track.pause();
			$('#preview-track_source').prop('src', $(obj).data('preview'));
			preview_track.load();
		});
	}
}

var TrackPreview = {
	init: init$2,
	stopStackedTabsPreview,
	previewMouseEnter,
	previewMouseLeave,
	playPausePreview
};

const TracklistTab = new Vue({
	data: () => ({
		title: '',
		metadata: '',
		release_date: '',
		label: '',
		explicit: false,
		image: '',
		type: '',
		link: '',
		head: null,
		body: []
	}),
	methods: {
		artistView,
		albumView,
		playPausePreview: TrackPreview.playPausePreview,
		reset() {
			this.title = 'Loading...';
			this.image = '';
			this.metadata = '';
			this.label = '';
			this.release_date = '';
			this.explicit = false;
			this.type = '';
			this.head = [];
			this.body = [];
		},
		addToQueue(e) {
			e.stopPropagation();
			Downloads.sendAddToQueue(e.currentTarget.dataset.link);
		},
		openQualityModal(e) {
			QualityModal$1.open(e.currentTarget.dataset.link);
		},
		toggleAll(e) {
			this.body.forEach(item => {
				if (item.type == 'track') {
					item.selected = e.currentTarget.checked;
				}
			});
		},
		selectedLinks() {
			var selected = [];
			if (this.body) {
				this.body.forEach(item => {
					if (item.type == 'track' && item.selected) selected.push(this.type == "Spotify Playlist" ? item.uri : item.link);
				});
			}
			return selected.join(';')
		},
		convertDuration(duration) {
			//convert from seconds only to mm:ss format
			let mm, ss;
			mm = Math.floor(duration / 60);
			ss = duration - mm * 60;
			//add leading zero if ss < 0
			if (ss < 10) {
				ss = '0' + ss;
			}
			return mm + ':' + ss
		},
		showAlbum(data) {
			this.type = 'Album';
			this.link = `https://www.deezer.com/album/${data.id}`;
			this.title = data.title;
			this.explicit = data.explicit_lyrics;
			this.label = data.label;
			this.metadata = `${data.artist.name} • ${data.tracks.length} songs`;
			this.release_date = data.release_date.substring(0, 10);
			this.image = data.cover_xl;
			this.head = [
				{ title: '<i class="material-icons">music_note</i>', width: '24px' },
				{ title: '#' },
				{ title: 'Song' },
				{ title: 'Artist' },
				{ title: '<i class="material-icons">timer</i>', width: '40px' }
			];
			if (_.isEmpty(data.tracks)) {
				console.log('show e lodash ok');

				this.body = null;
			} else {
				this.body = data.tracks;
			}
		},
		showPlaylist(data) {
			this.type = 'Playlist';
			this.link = `https://www.deezer.com/playlist/${data.id}`;
			this.title = data.title;
			this.image = data.picture_xl;
			this.release_date = data.creation_date.substring(0, 10);
			this.metadata = `by ${data.creator.name} • ${data.tracks.length} songs`;
			this.head = [
				{ title: '<i class="material-icons">music_note</i>', width: '24px' },
				{ title: '#' },
				{ title: 'Song' },
				{ title: 'Artist' },
				{ title: 'Album' },
				{ title: '<i class="material-icons">timer</i>', width: '40px' }
			];
			if (_.isEmpty(data.tracks)) {
				this.body = null;
			} else {
				this.body = data.tracks;
			}
		},
		showSpotifyPlaylist(data) {
			this.type = 'Spotify Playlist';
			this.link = data.uri;
			this.title = data.name;
			this.image = data.images.length ? data.images[0].url : "https://e-cdns-images.dzcdn.net/images/cover/d41d8cd98f00b204e9800998ecf8427e/1000x1000-000000-80-0-0.jpg";
			this.release_date = "";
			this.metadata = `by ${data.owner.display_name} • ${data.tracks.length} songs`;
			this.head = [
				{ title: '<i class="material-icons">music_note</i>', width: '24px' },
				{ title: '#' },
				{ title: 'Song' },
				{ title: 'Artist' },
				{ title: 'Album' },
				{ title: '<i class="material-icons">timer</i>', width: '40px' }
			];
			if (_.isEmpty(data.tracks)) {
				this.body = null;
			} else {
				this.body = data.tracks;
			}
		}
	},
	mounted() {
		socket.on('show_album', this.showAlbum);
		socket.on('show_playlist', this.showPlaylist);
		socket.on('show_spotifyplaylist', this.showSpotifyPlaylist);
	}
}).$mount('#tracklist_tab');

function isValidURL(text) {
	let lowerCaseText = text.toLowerCase();

	if (lowerCaseText.startsWith('http')) {
		if (lowerCaseText.indexOf('deezer.com') >= 0 || lowerCaseText.indexOf('open.spotify.com') >= 0) {
			return true
		}
	} else if (lowerCaseText.startsWith('spotify:')) {
		return true
	}
	return false
}

function convertDuration(duration) {
	// convert from seconds only to mm:ss format
	let mm, ss;
	mm = Math.floor(duration / 60);
	ss = duration - mm * 60;
	//add leading zero if ss < 0
	if (ss < 10) {
		ss = '0' + ss;
	}
	return mm + ':' + ss
}

function convertDurationSeparated(duration) {
	let hh, mm, ss;
	mm = Math.floor(duration / 60);
	hh = Math.floor(mm / 60);
	ss = duration - mm * 60;
	mm -= hh * 60;
	return [hh, mm, ss]
}

function numberWithDots(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

// On scroll event, returns currentTarget = null
// Probably on other events too
function debounce(func, wait, immediate) {
	var timeout;
	return function () {
		var context = this;
		var args = arguments;
		var later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	}
}

const COUNTRIES = {
	AF: 'Afghanistan',
	AX: '\u00c5land Islands',
	AL: 'Albania',
	DZ: 'Algeria',
	AS: 'American Samoa',
	AD: 'Andorra',
	AO: 'Angola',
	AI: 'Anguilla',
	AQ: 'Antarctica',
	AG: 'Antigua and Barbuda',
	AR: 'Argentina',
	AM: 'Armenia',
	AW: 'Aruba',
	AU: 'Australia',
	AT: 'Austria',
	AZ: 'Azerbaijan',
	BS: 'Bahamas',
	BH: 'Bahrain',
	BD: 'Bangladesh',
	BB: 'Barbados',
	BY: 'Belarus',
	BE: 'Belgium',
	BZ: 'Belize',
	BJ: 'Benin',
	BM: 'Bermuda',
	BT: 'Bhutan',
	BO: 'Bolivia, Plurinational State of',
	BQ: 'Bonaire, Sint Eustatius and Saba',
	BA: 'Bosnia and Herzegovina',
	BW: 'Botswana',
	BV: 'Bouvet Island',
	BR: 'Brazil',
	IO: 'British Indian Ocean Territory',
	BN: 'Brunei Darussalam',
	BG: 'Bulgaria',
	BF: 'Burkina Faso',
	BI: 'Burundi',
	KH: 'Cambodia',
	CM: 'Cameroon',
	CA: 'Canada',
	CV: 'Cape Verde',
	KY: 'Cayman Islands',
	CF: 'Central African Republic',
	TD: 'Chad',
	CL: 'Chile',
	CN: 'China',
	CX: 'Christmas Island',
	CC: 'Cocos (Keeling) Islands',
	CO: 'Colombia',
	KM: 'Comoros',
	CG: 'Congo',
	CD: 'Congo, the Democratic Republic of the',
	CK: 'Cook Islands',
	CR: 'Costa Rica',
	CI: "C\u00f4te d'Ivoire",
	HR: 'Croatia',
	CU: 'Cuba',
	CW: 'Cura\u00e7ao',
	CY: 'Cyprus',
	CZ: 'Czech Republic',
	DK: 'Denmark',
	DJ: 'Djibouti',
	DM: 'Dominica',
	DO: 'Dominican Republic',
	EC: 'Ecuador',
	EG: 'Egypt',
	SV: 'El Salvador',
	GQ: 'Equatorial Guinea',
	ER: 'Eritrea',
	EE: 'Estonia',
	ET: 'Ethiopia',
	FK: 'Falkland Islands (Malvinas)',
	FO: 'Faroe Islands',
	FJ: 'Fiji',
	FI: 'Finland',
	FR: 'France',
	GF: 'French Guiana',
	PF: 'French Polynesia',
	TF: 'French Southern Territories',
	GA: 'Gabon',
	GM: 'Gambia',
	GE: 'Georgia',
	DE: 'Germany',
	GH: 'Ghana',
	GI: 'Gibraltar',
	GR: 'Greece',
	GL: 'Greenland',
	GD: 'Grenada',
	GP: 'Guadeloupe',
	GU: 'Guam',
	GT: 'Guatemala',
	GG: 'Guernsey',
	GN: 'Guinea',
	GW: 'Guinea-Bissau',
	GY: 'Guyana',
	HT: 'Haiti',
	HM: 'Heard Island and McDonald Islands',
	VA: 'Holy See (Vatican City State)',
	HN: 'Honduras',
	HK: 'Hong Kong',
	HU: 'Hungary',
	IS: 'Iceland',
	IN: 'India',
	ID: 'Indonesia',
	IR: 'Iran, Islamic Republic of',
	IQ: 'Iraq',
	IE: 'Ireland',
	IM: 'Isle of Man',
	IL: 'Israel',
	IT: 'Italy',
	JM: 'Jamaica',
	JP: 'Japan',
	JE: 'Jersey',
	JO: 'Jordan',
	KZ: 'Kazakhstan',
	KE: 'Kenya',
	KI: 'Kiribati',
	KP: "Korea, Democratic People's Republic of",
	KR: 'Korea, Republic of',
	KW: 'Kuwait',
	KG: 'Kyrgyzstan',
	LA: "Lao People's Democratic Republic",
	LV: 'Latvia',
	LB: 'Lebanon',
	LS: 'Lesotho',
	LR: 'Liberia',
	LY: 'Libya',
	LI: 'Liechtenstein',
	LT: 'Lithuania',
	LU: 'Luxembourg',
	MO: 'Macao',
	MK: 'Macedonia, the Former Yugoslav Republic of',
	MG: 'Madagascar',
	MW: 'Malawi',
	MY: 'Malaysia',
	MV: 'Maldives',
	ML: 'Mali',
	MT: 'Malta',
	MH: 'Marshall Islands',
	MQ: 'Martinique',
	MR: 'Mauritania',
	MU: 'Mauritius',
	YT: 'Mayotte',
	MX: 'Mexico',
	FM: 'Micronesia, Federated States of',
	MD: 'Moldova, Republic of',
	MC: 'Monaco',
	MN: 'Mongolia',
	ME: 'Montenegro',
	MS: 'Montserrat',
	MA: 'Morocco',
	MZ: 'Mozambique',
	MM: 'Myanmar',
	NA: 'Namibia',
	NR: 'Nauru',
	NP: 'Nepal',
	NL: 'Netherlands',
	NC: 'New Caledonia',
	NZ: 'New Zealand',
	NI: 'Nicaragua',
	NE: 'Niger',
	NG: 'Nigeria',
	NU: 'Niue',
	NF: 'Norfolk Island',
	MP: 'Northern Mariana Islands',
	NO: 'Norway',
	OM: 'Oman',
	PK: 'Pakistan',
	PW: 'Palau',
	PS: 'Palestine, State of',
	PA: 'Panama',
	PG: 'Papua New Guinea',
	PY: 'Paraguay',
	PE: 'Peru',
	PH: 'Philippines',
	PN: 'Pitcairn',
	PL: 'Poland',
	PT: 'Portugal',
	PR: 'Puerto Rico',
	QA: 'Qatar',
	RE: 'R\u00e9union',
	RO: 'Romania',
	RU: 'Russian Federation',
	RW: 'Rwanda',
	BL: 'Saint Barth\u00e9lemy',
	SH: 'Saint Helena, Ascension and Tristan da Cunha',
	KN: 'Saint Kitts and Nevis',
	LC: 'Saint Lucia',
	MF: 'Saint Martin (French part)',
	PM: 'Saint Pierre and Miquelon',
	VC: 'Saint Vincent and the Grenadines',
	WS: 'Samoa',
	SM: 'San Marino',
	ST: 'Sao Tome and Principe',
	SA: 'Saudi Arabia',
	SN: 'Senegal',
	RS: 'Serbia',
	SC: 'Seychelles',
	SL: 'Sierra Leone',
	SG: 'Singapore',
	SX: 'Sint Maarten (Dutch part)',
	SK: 'Slovakia',
	SI: 'Slovenia',
	SB: 'Solomon Islands',
	SO: 'Somalia',
	ZA: 'South Africa',
	GS: 'South Georgia and the South Sandwich Islands',
	SS: 'South Sudan',
	ES: 'Spain',
	LK: 'Sri Lanka',
	SD: 'Sudan',
	SR: 'Suriname',
	SJ: 'Svalbard and Jan Mayen',
	SZ: 'Swaziland',
	SE: 'Sweden',
	CH: 'Switzerland',
	SY: 'Syrian Arab Republic',
	TW: 'Taiwan, Province of China',
	TJ: 'Tajikistan',
	TZ: 'Tanzania, United Republic of',
	TH: 'Thailand',
	TL: 'Timor-Leste',
	TG: 'Togo',
	TK: 'Tokelau',
	TO: 'Tonga',
	TT: 'Trinidad and Tobago',
	TN: 'Tunisia',
	TR: 'Turkey',
	TM: 'Turkmenistan',
	TC: 'Turks and Caicos Islands',
	TV: 'Tuvalu',
	UG: 'Uganda',
	UA: 'Ukraine',
	AE: 'United Arab Emirates',
	GB: 'United Kingdom',
	US: 'United States',
	UM: 'United States Minor Outlying Islands',
	UY: 'Uruguay',
	UZ: 'Uzbekistan',
	VU: 'Vanuatu',
	VE: 'Venezuela, Bolivarian Republic of',
	VN: 'Viet Nam',
	VG: 'Virgin Islands, British',
	VI: 'Virgin Islands, U.S.',
	WF: 'Wallis and Futuna',
	EH: 'Western Sahara',
	YE: 'Yemen',
	ZM: 'Zambia',
	ZW: 'Zimbabwe'
};

var Utils = {
	isValidURL,
	convertDuration,
	convertDurationSeparated,
	numberWithDots,
	debounce,
	COUNTRIES
};

const LinkAnalyzerTab = new Vue({
	data() {
		return {
			title: '',
			subtitle: '',
			image: '',
			data: {},
			type: '',
			link: '',
			countries: []
		}
	},
	methods: {
		albumView,
		convertDuration: Utils.convertDuration,
		reset() {
			this.title = 'Loading...';
			this.subtitle = '';
			this.image = '';
			this.data = {};
			this.type = '';
			this.link = '';
			this.countries = [];
		},
		showTrack(data) {
			this.title =
				data.title +
				(data.title_version && data.title.indexOf(data.title_version) == -1 ? ' ' + data.title_version : '');
			this.subtitle = `by ${data.artist.name}\nin ${data.album.title}`;
			this.image = data.album.cover_xl;
			this.type = 'track';
			this.link = data.link;
			data.available_countries.forEach(cc => {
				let temp = [];
				let chars = [...cc].map(c => c.charCodeAt() + 127397);
				temp.push(String.fromCodePoint(...chars));
				temp.push(Utils.COUNTRIES[cc]);
				this.countries.push(temp);
			});
			this.data = data;
		},
		showAlbum(data) {
			console.log(data);
			this.title = data.title;
			this.subtitle = `by ${data.artist.name}\n${data.nb_tracks} tracks`;
			this.image = data.cover_xl;
			this.type = 'album';
			this.link = data.link;
			this.data = data;
		}
	},
	mounted() {
		socket.on('analyze_track', this.showTrack);
		socket.on('analyze_album', this.showAlbum);
	}
}).$mount('#analyzer_tab');

const HomeTab = new Vue({
	data() {
		return {
			tracks: [],
			albums: [],
			artists: [],
			playlists: []
		}
	},
	methods: {
		artistView,
		albumView,
		playlistView,
		playPausePreview: TrackPreview.playPausePreview,
		previewMouseEnter: TrackPreview.previewMouseEnter,
		previewMouseLeave: TrackPreview.previewMouseLeave,
		numberWithDots: Utils.numberWithDots,
		convertDuration: Utils.convertDuration,
		addToQueue(e) {
			e.stopPropagation();
			Downloads.sendAddToQueue(e.currentTarget.dataset.link);
		},
		openQualityModal(e) {
			QualityModal$1.open(e.currentTarget.dataset.link);
		},
		initHome(data) {
			this.tracks = data.tracks.data;
			this.albums = data.albums.data;
			this.artists = data.artists.data;
			this.playlists = data.playlists.data;
		}
	},
	mounted() {
		socket.on('init_home', this.initHome);
	}
}).$mount('#home_tab');

const ChartsTab = new Vue({
	data() {
		return {
			country: '',
      id: 0,
      countries: [],
      chart: []
		}
	},
	methods: {
    artistView,
		albumView,
		playPausePreview: TrackPreview.playPausePreview,
		previewMouseEnter: TrackPreview.previewMouseEnter,
		previewMouseLeave: TrackPreview.previewMouseLeave,
		convertDuration: Utils.convertDuration,
		addToQueue(e) {
			e.stopPropagation();
			Downloads.sendAddToQueue(e.currentTarget.dataset.link);
		},
		openQualityModal(e) {
			QualityModal$1.open(e.currentTarget.dataset.link);
		},
    getTrackList(e){
      this.country = e.currentTarget.dataset.title;
      localStorage.setItem('chart', this.country);
      this.id = e.currentTarget.dataset.id;
      socket.emit('getChartTracks', this.id);
    },
    setTracklist(data){
      this.chart = data;
    },
    changeCountry(){
      this.country = '';
      this.id = 0;
    },
		initCharts(data) {
      this.countries = data;
      this.country = localStorage.getItem('chart') || '';
      if (this.country){
        let i = 0;
        for (i; i < this.countries.length; i++) if (this.countries[i].title == this.country) break
        if (i != this.countries.length){
          this.id = this.countries[i].id;
          socket.emit('getChartTracks', this.id);
        }else {
          this.country = '';
          localStorage.setItem('chart', this.country);
        }
      }
		}
	},
	mounted() {
		socket.on('init_charts', this.initCharts);
    socket.on('setChartTracks', this.setTracklist);
	}
}).$mount('#charts_tab');

const FavoritesTab = new Vue({
	data() {
		return {
			tracks: [],
			albums: [],
			artists: [],
			playlists: [],
			spotifyPlaylists: []
		}
	},
	methods: {
		playlistView,
		artistView,
		albumView,
		spotifyPlaylistView,
		playPausePreview: TrackPreview.playPausePreview,
		previewMouseEnter: TrackPreview.previewMouseEnter,
		previewMouseLeave: TrackPreview.previewMouseLeave,
		convertDuration: Utils.convertDuration,
		addToQueue(e) {
			e.stopPropagation();
			Downloads.sendAddToQueue(e.currentTarget.dataset.link);
		},
		openQualityModal(e) {
			QualityModal$1.open(e.currentTarget.dataset.link);
		},
		updated_userSpotifyPlaylists(data){this.spotifyPlaylists = data;},
		updated_userPlaylists(data){this.playlists = data;},
		updated_userAlbums(data){this.albums = data;},
		updated_userArtist(data){this.artists = data;},
		updated_userTracks(data){this.tracks = data;},
		initFavorites(data) {
			this.tracks = data.tracks;
			this.albums = data.albums;
			this.artists = data.artists;
			this.playlists = data.playlists;
			document.getElementById('favorites_playlist_tab').click();
		}
	},
	mounted() {
		socket.on('init_favorites', this.initFavorites);
		socket.on('updated_userSpotifyPlaylists', this.updated_userSpotifyPlaylists);
		socket.on('updated_userPlaylists', this.updated_userPlaylists);
		socket.on('updated_userAlbums', this.updated_userAlbums);
		socket.on('updated_userArtist', this.updated_userArtist);
		socket.on('updated_userTracks', this.updated_userTracks);
	}
}).$mount('#favorites_tab');

const SettingsTab = new Vue({
	data: () => ({
		settings: { tags: {} },
		lastSettings: {},
		spotifyFeatures: {},
		lastCredentials: {},
		defaultSettings: {},
		lastUser: '',
		spotifyUser: '',
		darkMode: false,
		slimDownloads: false
	}),
	computed: {
		changeDarkMode: {
			get() {
				return this.darkMode
			},
			set(wantDarkMode) {
				this.darkMode = wantDarkMode;
				document.documentElement.setAttribute('data-theme', wantDarkMode ? 'dark' : 'default');
				localStorage.setItem('darkMode', wantDarkMode);
			}
		},
		changeSlimDownloads: {
			get() {
				return this.slimDownloads
			},
			set(wantSlimDownloads) {
				this.slimDownloads = wantSlimDownloads;
				document.getElementById('download_list').classList.toggle('slim', wantSlimDownloads);
				localStorage.setItem('slimDownloads', wantSlimDownloads);
			}
		}
	},
	methods: {
		copyARLtoClipboard() {
			let copyText = this.$refs.loginInput;

			copyText.setAttribute('type', 'text');
			copyText.select();
			copyText.setSelectionRange(0, 99999);
			document.execCommand('copy');
			copyText.setAttribute('type', 'password');

			toast('ARL copied to clipboard', 'assignment');
		},
		saveSettings() {
			this.lastSettings = { ...this.settings };
			this.lastCredentials = { ...this.spotifyFeatures };
			let changed = false;
			if (this.lastUser != this.spotifyUser) {
				// force cloning without linking
				this.lastUser = (' ' + this.spotifyUser).slice(1);
				localStorage.setItem('spotifyUser', this.lastUser);
				changed = true;
			}

			socket.emit('saveSettings', this.lastSettings, this.lastCredentials, changed ? this.lastUser : false);
			console.log(this.darkMode);
		},
		loadSettings(settings, spotifyCredentials, defaults = null) {
			if (defaults) {
				this.defaultSettings = { ...defaults };
			}

			this.lastSettings = { ...settings };
			this.lastCredentials = { ...spotifyCredentials };
			this.settings = settings;
			this.spotifyFeatures = spotifyCredentials;
		},
		login() {
			let arl = this.$refs.loginInput.value;
			if (arl != '' && arl != localStorage.getItem('arl')) {
				socket.emit('login', arl, true);
			}
		},
		logout() {
			socket.emit('logout');
		},
		initSettings(settings, credentials, defaults) {
			this.loadSettings(settings, credentials, defaults);
			toast('Settings loaded!', 'settings');
		},
		updateSettings(settings, credentials) {
			this.loadSettings(settings, credentials);
			toast('Settings updated!', 'settings');
		},
		resetSettings() {
			this.settings = { ...this.defaultSettings };
		}
	},
	mounted() {
		socket.on('init_settings', this.initSettings);
		socket.on('updateSettings', this.updateSettings);

		let spotyUser = localStorage.getItem('spotifyUser');

		if ('' !== spotyUser) {
			this.lastUser = spotyUser;
			this.spotifyUser = spotyUser;
		}

		this.changeDarkMode = 'true' === localStorage.getItem('darkMode');
		this.changeSlimDownloads = 'true' === localStorage.getItem('slimDownloads');
	}
}).$mount('#settings_tab');

const MainSearch = new Vue({
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
		artistView,
		albumView,
		playlistView,
		playPausePreview: TrackPreview.playPausePreview,
		previewMouseEnter: TrackPreview.previewMouseEnter,
		previewMouseLeave: TrackPreview.previewMouseLeave,
		handleClickTopResult(event) {
			let topResultType = this.results.allTab.TOP_RESULT[0].type;

			switch (topResultType) {
				case 'artist':
					this.artistView(event);
					break
				case 'album':
					this.albumView(event);
					break
				case 'playlist':
					this.playlistView(event);
					break
			}
		},
		changeSearchTab(section) {
			if (section != 'TOP_RESULT') {
				document.getElementById(`search_${section.toLowerCase()}_tab`).click();
			}
		},
		addToQueue: function (e) {
			Downloads.sendAddToQueue(e.currentTarget.dataset.link);
		},
		openQualityModal: function (e) {
			QualityModal$1.open(e.currentTarget.dataset.link);
		},
		numberWithDots: Utils.numberWithDots,
		convertDuration: Utils.convertDuration,
		search(type) {
			socket.emit('search', {
				term: this.results.query,
				type: type,
				start: this.results[type + 'Tab'].next,
				nb: 30
			});
		},
		scrolledSearch(type) {
			if (this.results[type + 'Tab'].next < this.results[type + 'Tab'].total) {
				socket.emit('search', {
					term: this.results.query,
					type: type,
					start: this.results[type + 'Tab'].next,
					nb: 30
				});
			}
		},
		handleMainSearch(result) {
			let resetObj = { data: [], next: 0, total: 0, loaded: false };
			this.results.allTab = result;
			this.results.query = result.QUERY;
			this.results.trackTab = { ...resetObj };
			this.results.albumTab = { ...resetObj };
			this.results.artistTab = { ...resetObj };
			this.results.playlistTab = { ...resetObj };
			document.getElementById('search_all_tab').click();
			document.getElementById('search_tab_content').style.display = 'block';
			document.getElementById('main_search_tablink').click();
		},
		handleSearch(result) {
			let next = 0;

			if (result.next) {
				next = parseInt(result.next.match(/index=(\d*)/)[1]);
			} else {
				next = result.total;
			}

			if (this.results[result.type + 'Tab'].total != result.total) {
				this.results[result.type + 'Tab'].total = result.total;
			}

			if (this.results[result.type + 'Tab'].next != next) {
				this.results[result.type + 'Tab'].next = next;
				this.results[result.type + 'Tab'].data = this.results[result.type + 'Tab'].data.concat(result.data);
			}
			this.results[result.type + 'Tab'].loaded = true;
		}
	},
	mounted() {
		socket.on('mainSearch', this.handleMainSearch);
		socket.on('search', this.handleSearch);
	}
}).$mount('#search_tab');

/* ===== Globals ====== */
window.search_selected = '';
window.main_selected = '';
window.windows_stack = [];

/* ===== Locals ===== */
let currentStack = {};

// Exporting this function out of the default export
// because it's used in components that are needed
// in this file too
function artistView(ev) {
	let id = ev.currentTarget.dataset.id;
	ArtistTab.reset();
	socket.emit('getTracklist', { type: 'artist', id: id });
	showTab('artist', id);
}

// Exporting this function out of the default export
// because it's used in components that are needed
// in this file too
function albumView(ev) {
	let id = ev.currentTarget.dataset.id;
	TracklistTab.reset();
	socket.emit('getTracklist', { type: 'album', id: id });
	showTab('album', id);
}

// Exporting this function out of the default export
// because it's used in components that are needed
// in this file too
function playlistView(ev) {
	let id = ev.currentTarget.dataset.id;
	TracklistTab.reset();
	socket.emit('getTracklist', { type: 'playlist', id: id });
	showTab('playlist', id);
}

function spotifyPlaylistView(ev) {
	let id = ev.currentTarget.dataset.id;
	TracklistTab.reset();
	socket.emit('getTracklist', { type: 'spotifyplaylist', id: id });
	showTab('spotifyplaylist', id);
}

function analyzeLink(link) {
	console.log('Analyzing: ' + link);
	LinkAnalyzerTab.reset();
	socket.emit('analyzeLink', link);
}

function linkListeners$2() {
	document.getElementById('search_tab').addEventListener('click', handleSearchTabClick);
	document.getElementById('favorites_tab').addEventListener('click', handleFavoritesTabClick);
	document.getElementById('sidebar').addEventListener('click', handleSidebarClick);

	const backButtons = Array.from(document.getElementsByClassName('back-button'));

	backButtons.forEach(button => {
		button.addEventListener('click', backTab);
	});
}

/**
 * Handles click Event on the sidebar and changes tab
 * according to clicked icon.
 * Uses event delegation
 * @param		{Event}		event
 * @since		0.1.0
 */
function handleSidebarClick(event) {
	if (!(event.target.matches('.main_tablinks') || event.target.parentElement.matches('.main_tablinks'))) {
		return
	}

	let sidebarEl = event.target.matches('.main_tablinks') ? event.target : event.target.parentElement;
	let targetID = sidebarEl.getAttribute('id');

	switch (targetID) {
		case 'main_search_tablink':
			changeTab(sidebarEl, 'main', 'search_tab');
			break
		case 'main_home_tablink':
			changeTab(sidebarEl, 'main', 'home_tab');
			break
		case 'main_charts_tablink':
			changeTab(sidebarEl, 'main', 'charts_tab');
			break
		case 'main_favorites_tablink':
			changeTab(sidebarEl, 'main', 'favorites_tab');
			break
		case 'main_analyzer_tablink':
			changeTab(sidebarEl, 'main', 'analyzer_tab');
			break
		case 'main_settings_tablink':
			changeTab(sidebarEl, 'main', 'settings_tab');
			break
		case 'main_about_tablink':
			changeTab(sidebarEl, 'main', 'about_tab');
			break
	}
}

function handleSearchTabClick(event) {
	let targetID = event.target.id;

	switch (targetID) {
		case 'search_all_tab':
			changeTab(event.target, 'search', 'main_search');
			break
		case 'search_track_tab':
			changeTab(event.target, 'search', 'track_search');
			break
		case 'search_album_tab':
			changeTab(event.target, 'search', 'album_search');
			break
		case 'search_artist_tab':
			changeTab(event.target, 'search', 'artist_search');
			break
		case 'search_playlist_tab':
			changeTab(event.target, 'search', 'playlist_search');
			break
	}
}

function handleFavoritesTabClick(event) {
	let targetID = event.target.id;

	switch (targetID) {
		case 'favorites_playlist_tab':
			changeTab(event.target, 'favorites', 'playlist_favorites');
			break
		case 'favorites_album_tab':
			changeTab(event.target, 'favorites', 'album_favorites');
			break
		case 'favorites_artist_tab':
			changeTab(event.target, 'favorites', 'artist_favorites');
			break
		case 'favorites_track_tab':
			changeTab(event.target, 'favorites', 'track_favorites');
			break
	}
}

function changeTab(sidebarEl, section, tabName) {
	windows_stack = [];
	currentStack = {};
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName(section + '_tabcontent');
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = 'none';
	}
	tablinks = document.getElementsByClassName(section + '_tablinks');
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].classList.remove('active');
	}
	if (tabName == 'settings_tab' && main_selected != 'settings_tab') {
		SettingsTab.settings = { ...SettingsTab.lastSettings };
		SettingsTab.spotifyCredentials = { ...SettingsTab.lastCredentials };
		SettingsTab.spotifyUser = (' ' + SettingsTab.lastUser).slice(1);
	}

	document.getElementById(tabName).style.display = 'block';

	if ('main' === section) {
		main_selected = tabName;
	} else if ('search' === section) {
		search_selected = tabName;
	}

	// Not choosing .currentTarget beacuse the event
	// is delegated
	sidebarEl.classList.add('active');

	// Check if you need to load more content in the search tab
	if (
		main_selected == 'search_tab' &&
		['track_search', 'album_search', 'artist_search', 'playlist_search'].indexOf(search_selected) != -1 &&
		MainSearch.results[search_selected.split('_')[0] + 'Tab'].data.length == 0
	) {
		MainSearch.search(search_selected.split('_')[0]);
	}
}

function showTab(type, id, back = false) {
	if (windows_stack.length == 0) {
		windows_stack.push({ tab: main_selected });
	} else if (!back) {
		windows_stack.push(currentStack);
	}

	window.tab = type == 'artist' ? 'artist_tab' : 'tracklist_tab';

	currentStack = { type: type, id: id };
	let tabcontent = document.getElementsByClassName('main_tabcontent');

	for (let i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = 'none';
	}
	document.getElementById(tab).style.display = 'block';
	TrackPreview.stopStackedTabsPreview();
}

function backTab() {
	if (windows_stack.length == 1) {
		document.getElementById(`main_${main_selected}link`).click();
	} else {
		let tabObj = windows_stack.pop();
		if (tabObj.type == 'artist') {
			ArtistTab.reset();
		} else {
			TracklistTab.reset();
		}
		socket.emit('getTracklist', { type: tabObj.type, id: tabObj.id });
		showTab(tabObj.type, tabObj.id, true);
	}
	TrackPreview.stopStackedTabsPreview();
}

var Tabs = {
	linkListeners: linkListeners$2,
	artistView,
	albumView,
	playlistView,
	analyzeLink
};

function linkListeners$3() {
	document.getElementById('content').addEventListener('scroll', Utils.debounce(handleContentScroll, 100));
	document.getElementById('searchbar').addEventListener('keyup', handleSearchBarKeyup);
}

// Load more content when the search page is at the end
function handleContentScroll(event) {
	let contentElement = event.target;

	if (contentElement.scrollTop + contentElement.clientHeight >= contentElement.scrollHeight) {
		if (
			main_selected === 'search_tab' &&
			['track_search', 'album_search', 'artist_search', 'playlist_search'].indexOf(search_selected) != -1
		) {
			MainSearch.scrolledSearch(search_selected.split('_')[0]);
		}
	}
}

function handleSearchBarKeyup(e) {
	if (e.keyCode == 13) {
		let term = this.value;
		if (Utils.isValidURL(term)) {
			if (e.ctrlKey) {
				QualityModal$1.open(term);
			} else {
				if (window.main_selected == 'analyzer_tab') {
					Tabs.analyzeLink(term);
				} else {
					Downloads.sendAddToQueue(term);
				}
			}
		} else {
			if (term != MainSearch.query || main_selected == 'search_tab') {
				document.getElementById('search_tab_content').style.display = 'none';
				socket.emit('mainSearch', { term: term });
			} else {
				document.getElementById('search_all_tab').click();
				document.getElementById('search_tab_content').style.display = 'block';
				document.getElementById('main_search_tablink').click();
			}
		}
	}
}

var Search = {
	linkListeners: linkListeners$3
};

/* ===== Socketio listeners ===== */

// Debug messages for socketio
socket.on('message', function (msg) {
	console.log(msg);
});

socket.on('logging_in', function () {
	toast('Logging in', 'loading', false, 'login-toast');
});

socket.on('logged_in', function (data) {
	switch (data.status) {
		case 1:
		case 3:
			toast('Logged in', 'done', true, 'login-toast');
			if (data.arl) {
				localStorage.setItem('arl', data.arl);
				$('#login_input_arl').val(data.arl);
			}
			$('#open_login_prompt').hide();
			if (data.user) {
				$('#settings_username').text(data.user.name);
				$('#settings_picture').attr(
					'src',
					`https://e-cdns-images.dzcdn.net/images/user/${data.user.picture}/125x125-000000-80-0-0.jpg`
				);
				// $('#logged_in_info').show()
				document.getElementById('logged_in_info').classList.remove('hide');
			}
			break
		case 2:
			toast('Already logged in', 'done', true, 'login-toast');
			if (data.user) {
				$('#settings_username').text(data.user.name);
				$('#settings_picture').attr(
					'src',
					`https://e-cdns-images.dzcdn.net/images/user/${data.user.picture}/125x125-000000-80-0-0.jpg`
				);
				// $('#logged_in_info').show()
				document.getElementById('logged_in_info').classList.remove('hide');
			}
			break
		case 0:
			toast("Couldn't log in", 'close', true, 'login-toast');
			localStorage.removeItem('arl');
			$('#login_input_arl').val('');
			$('#open_login_prompt').show();
			document.getElementById('logged_in_info').classList.add('hide');
			// $('#logged_in_info').hide()
			$('#settings_username').text('Not Logged');
			$('#settings_picture').attr('src', `https://e-cdns-images.dzcdn.net/images/user/125x125-000000-80-0-0.jpg`);
			break
	}
});

socket.on('logged_out', function () {
	toast('Logged out', 'done', true, 'login-toast');
	localStorage.removeItem('arl');
	$('#login_input_arl').val('');
	$('#open_login_prompt').show();
	document.getElementById('logged_in_info').classList.add('hide');
	// $('#logged_in_info').hide()
	$('#settings_username').text('Not Logged');
	$('#settings_picture').attr('src', `https://e-cdns-images.dzcdn.net/images/user/125x125-000000-80-0-0.jpg`);
});

/* ===== App initialization ===== */
function startApp() {
	Downloads.init();
	QualityModal$1.init();
	Tabs.linkListeners();
	Search.linkListeners();
	TrackPreview.init();

	document.getElementById('logged_in_info').classList.add('hide');

	if (localStorage.getItem('arl')) {
		let arl = localStorage.getItem('arl');

		socket.emit('login', arl);
		$('#login_input_arl').val(arl);
	}
	if ('true' === localStorage.getItem('slimDownloads')) {
		document.getElementById('download_list').classList.add('slim');
	}
	let spotifyUser = localStorage.getItem('spotifyUser');
	if (spotifyUser != '') {
		socket.emit('update_userSpotifyPlaylists', spotifyUser);
	}
	// Open default tab
	document.getElementById('main_home_tablink').click();
}

document.addEventListener('DOMContentLoaded', startApp);
//# sourceMappingURL=bundle.js.map
