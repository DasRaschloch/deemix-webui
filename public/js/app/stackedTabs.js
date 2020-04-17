var artistTab = new Vue({
	el: '#artist_tab',
	data: {
		currentTab: '',
		sortKey: 'release_date',
		sortOrder: 'desc',
		title: "",
		image: "",
		type: "",
		link: "",
		head: null,
		body: null
	},
	methods: {
		addToQueue: function(e){e.stopPropagation(); sendAddToQueue(e.currentTarget.dataset.link)},
		openQualityModal: function(e){e.preventDefault(); openQualityModal(e.currentTarget.dataset.link)},
		moreInfo: function(url, e){
			if (e) e.preventDefault();
			showTrackListSelective(url, true)
		},
		sortBy: function(key) {
      if (key == this.sortKey) {
				this.sortOrder = (this.sortOrder == 'asc') ? 'desc' : 'asc';
      } else {
				this.sortKey = key;
				this.sortOrder = 'asc';
      }
		},
		changeTab: function(tab){
			this.currentTab = tab
		},
		checkNewRelease: function(date){
			var g1 = new Date();
    	var g2 = new Date(date);
			g2.setDate(g2.getDate()+3)
			g1.setHours(0,0,0,0)
			if (g1.getTime() <= g2.getTime()){
				return true;
			}else {
				return false;
			}
		}
	},
	computed: {
		showTable() {
			if (this.body)
				return _.orderBy(this.body[this.currentTab], this.sortKey, this.sortOrder)
			else
				return []
		}
	}
})

var tracklistTab = new Vue({
	el: '#tracklist_tab',
	data: {
		title: "",
		metadata : "",
		release_date: "",
		label: "",
		explicit: false,
		image: "",
		type: "",
		link: "",
		head: null,
		body: []
	},
	methods: {
		addToQueue: function(e){e.stopPropagation(); sendAddToQueue(e.currentTarget.dataset.link)},
		openQualityModal: function(e){e.preventDefault(); openQualityModal(e.currentTarget.dataset.link)}
	}
})

function artistView(ev){
	console.log("ARTIST")
	let id = ev.currentTarget.dataset.id
	artistTab.title = "Loading..."
	artistTab.image = ""
	artistTab.type = ""
	artistTab.currentTab = ''
	artistTab.sortKey = 'release_date'
	artistTab.sortOrder = 'desc'
	artistTab.link = 'https://deezer.com/artist/'+id
	artistTab.head = []
	artistTab.body = null
	socket.emit('getTracklist', {type: 'artist', id: id})
	showTab('artist', id)
}
function albumView(ev){
	console.log("ALBUM")
	tracklistTab.title = "Loading..."
	tracklistTab.image = ""
	tracklistTab.metadata = ""
	tracklistTab.label = ""
	tracklistTab.release_date = ""
	tracklistTab.explicit = false
	tracklistTab.type = ""
	tracklistTab.head = []
	tracklistTab.body = []
	let id = ev.currentTarget.dataset.id
	socket.emit('getTracklist', {type: 'album', id: id})
	showTab('album', id)
}
function playlistView(ev){
	console.log("PLAYLIST")
	tracklistTab.title = "Loading..."
	tracklistTab.image = ""
	tracklistTab.metadata = ""
	tracklistTab.label = ""
	tracklistTab.release_date = ""
	tracklistTab.explicit = false
	tracklistTab.type = ""
	tracklistTab.head = []
	tracklistTab.body = []
	let id = ev.currentTarget.dataset.id
	socket.emit('getTracklist', {type: 'playlist', id: id})
	showTab('playlist', id)
}

socket.on('show_artist', function(data){
	artistTab.title = data.name
	artistTab.image = data.picture_xl
	artistTab.type = "Artist"
	artistTab.link = `https://www.deezer.com/artist/${data.id}`
	artistTab.currentTab = Object.keys(data.data)[0]
	artistTab.sortKey = 'release_date'
	artistTab.sortOrder = 'desc'
	artistTab.head = [
		{title: 'Title', sortKey: "title"},
		{title: 'Release Date', sortKey: "release_date"},
		{title: '', width: "56px"}
	]
	if (_.isEmpty(data.data)){
		artistTab.body = null
	}else{
		artistTab.body = data.data
	}
})
