<template>
	<div id="main_search" class="search_tabcontent">
		<template v-for="(section, index) in results.ORDER">
			<div
				class="search_section"
				v-if="(section !== 'TOP_RESULT' && results[section].data.length > 0) || (results[section].length > 0)"
				:key="`section-${index}`"
			>
				<h1 @click="changeSearchTab(section)">{{ toTitleCase(section) }}</h1>
				<div v-if="section === 'TOP_RESULT'" class="top_result">
					<div class="cover_container">
						<img
							:src="getTopResultImgURL2(results.TOP_RESULT)"
							:class="(results.TOP_RESULT[0].__TYPE__ == 'artist' ? 'circle' : 'rounded') + ' coverart'"
						/>
						<div
							role="button"
							aria-label="download"
							@contextmenu="openQualityModal(event)"
							@click="addToQueue(event)"
							:data-link="topResult.buttonURL"
							class="download_overlay"
						>
							<i class="material-icons">get_app</i>
						</div>
					</div>
					<div class="info_box">
						<p class="primary-text">{{ topResult.primaryText }}</p>
						<p class="secondary-text">{{ topResult.secondaryText }}</p>
						<span class="tag">{{ topResult.tag }}</span>
					</div>
				</div>
				<div v-else-if="section === 'TRACK'">
					<table class="tracks_table">
						<tr v-for="track in results.TRACK.data.slice(0, 6)" :key="track.SNG_ID" class="track_row">
							<td style="width: 48px; text-align: center;">
								<img
									class="rounded coverart"
									v-bind:src="'https://e-cdns-images.dzcdn.net/images/cover/'+track.ALB_PICTURE+'/32x32-000000-80-0-0.jpg'"
								/>
							</td>
							<td class="breakline">{{track.SNG_TITLE + (track.VERSION ? ' '+track.VERSION : '')}}</td>
							<td class="breakline artists___">
								<!-- <span v-for="artist in track.ARTISTS" :key="artist.ART_ID">{{artist.ART_NAME}}</span> -->
								<span>{{track.ARTISTS.map(a => a.ART_NAME).join(' ')}}</span>
							</td>
							<td class="breakline">{{track.ALB_TITLE}}</td>
							<td>{{convertDuration(track.DURATION)}}</td>
							<td
								class="clickable"
								role="button"
								aria-label="download"
								@contextmenu="openQualityModal(event)"
								@click="addToQueue(event)"
								:data-link="'https://www.deezer.com/track/' + track.SNG_ID"
								style="width: 56px; text-align: center;"
							>
								<i class="material-icons">get_app</i>
							</td>
						</tr>
					</table>
				</div>
				<!-- <div v-else-if="section != 'TRACK' && section != 'TOP_RESULT'" class="release_grid firstrow_only"> -->
				<div v-else class="release_grid firstrow_only">
					<div v-for="(release, index) in results[section].data.slice(0, 10)" :key="`release-${index}`" class="release">
						<div class="cover_container">
							<img
								v-bind:class="(section == 'ARTIST' ? 'circle' : 'rounded') + ' coverart'"
								v-bind:src="(section == 'ARTIST' ? 'https://e-cdns-images.dzcdn.net/images/artist/' + release.ART_PICTURE : section == 'ALBUM' ? 'https://e-cdns-images.dzcdn.net/images/cover/' + release.ALB_PICTURE : section == 'PLAYLIST' ? 'https://e-cdns-images.dzcdn.net/images/'+ release.PICTURE_TYPE +'/' + release.PLAYLIST_PICTURE : 'https://e-cdns-images.dzcdn.net/images/cover/' ) + '/156x156-000000-80-0-0.jpg'"
							/>
							<div
								role="button"
								aria-label="download"
								v-on:contextmenu="openQualityModal(event)"
								v-on:click="addToQueue(event)"
								v-bind:data-link="'https://deezer.com/'+(section == 'ARTIST' ? 'artist/'+release.ART_ID : section == 'ALBUM' ? 'album/'+release.ALB_ID : section == 'PLAYLIST' ? 'playlist/'+release.PLAYLIST_ID : '')"
								class="download_overlay"
							>
								<i class="material-icons">get_app</i>
							</div>
						</div>
						<p
							class="primary-text"
						>{{ section == 'ARTIST' ? release.ART_NAME : section == 'ALBUM' ? release.ALB_TITLE : section == 'PLAYLIST' ? release.TITLE : '' }}</p>
						<p
							class="secondary-text"
						>{{ section == 'ARTIST' ? numberWithDots(release.NB_FAN) + ' fans' : section == 'ALBUM' ? release.ART_NAME+' - '+release.NUMBER_TRACK+' tracks' : section == 'PLAYLIST' ? release.NB_SONG+' tracks' : '' }}</p>
					</div>
				</div>
			</div>
		</template>
		<div
			v-if="results.ORDER.every(section => section == 'TOP_RESULT' ? results[section].length == 0 : results[section].data.length == 0)"
		>
			<h1>No results</h1>
		</div>
		<p>marco</p>
	</div>
</template>

<script>
module.exports = {
	data: () => ({
		results: {
			QUERY: '',
			ORDER: [],
			ALBUM: {},
			ARTIST: {},
			TRACK: {},
			TOP_RESULT: [],
			PLAYLIST: {}
		},
		topResult: {
			imgURL: '',
			buttonURL: '',
			primaryText: '',
			secondaryText: '',
			tag: ''
		}
	}),
	methods: {
		changeSearchTab(section) {
			if (section != 'TOP_RESULT') clickElement('search_' + section.toLowerCase() + '_tab')
		},
		addToQueue: function(e) {
			sendAddToQueue(e.currentTarget.dataset.link)
		},
		openQualityModal: function(e) {
			e.preventDefault()
			openQualityModal(e.currentTarget.dataset.link)
		},
		handleMainSearch(result) {
			this.results = result
		},
		toTitleCase(name) {
			if ('string' !== typeof name) {
				return
			}

			name = name.replace('_', ' ')

			// Step 1. Lowercase the string
			name = name.toLowerCase()

			// Step 2. Split the string into an array of strings
			name = name.split(' ')

			// Step 3. Create the FOR loop
			for (var i = 0; i < name.length; i++) {
				name[i] = name[i].charAt(0).toUpperCase() + name[i].slice(1)
			}

			name = name.join(' ')

			return name
		},
		getTopResultImgURL(results) {
			if (results.TOP_RESULT.length === 0) {
				this.topResult.imgURL = ''
				return
			}

			const topResult = results.TOP_RESULT[0]
			const topResultType = topResult.__TYPE__

			switch (topResultType) {
				case 'artist':
					this.topResult.imgURL = 'https://e-cdns-images.dzcdn.net/images/artist/' + topResult.ART_PICTURE
					break
				case 'album':
					this.topResult.imgURL = 'https://e-cdns-images.dzcdn.net/images/cover/' + topResult.ALB_PICTURE
					break
				case 'playlist':
					this.topResult.imgURL =
						'https://e-cdns-images.dzcdn.net/images/' + topResult.PICTURE_TYPE + '/' + topResult.PLAYLIST_PICTURE
					break
				default:
					this.topResult.imgURL = 'https://e-cdns-images.dzcdn.net/images/cover/'
					break
			}

			this.topResult.imgURL += '/156x156-000000-80-0-0.jpg'
		},
		getTopResultImgURL2(topRes) {
			if (topRes.length === 0) {
				return ''
			}

			const topResult = topRes[0]
			const topResultType = topResult.__TYPE__
			let imgURL = ''

			switch (topResultType) {
				case 'artist':
					imgURL = 'https://e-cdns-images.dzcdn.net/images/artist/' + topResult.ART_PICTURE
					break
				case 'album':
					imgURL = 'https://e-cdns-images.dzcdn.net/images/cover/' + topResult.ALB_PICTURE
					break
				case 'playlist':
					imgURL =
						'https://e-cdns-images.dzcdn.net/images/' + topResult.PICTURE_TYPE + '/' + topResult.PLAYLIST_PICTURE
					break
				default:
					imgURL = 'https://e-cdns-images.dzcdn.net/images/cover/'
					break
			}

			imgURL += '/156x156-000000-80-0-0.jpg'

			return imgURL
		},
		getTopResultButtonURL(results) {
			if (results.TOP_RESULT.length === 0) {
				this.topResult.buttonURL = ''
				return
			}

			const topResult = results.TOP_RESULT[0]
			const topResultType = topResult.__TYPE__

			this.topResult.buttonURL = 'https://deezer.com/' + topResultType + '/'

			switch (topResultType) {
				case 'artist':
					this.topResult.buttonURL += topResult.ART_ID
					break
				case 'album':
					this.topResult.buttonURL += topResult.ALB_ID
					break
				case 'playlist':
					this.topResult.buttonURL += topResult.PLAYLIST_ID
					break
				default:
					this.topResult.buttonURL += ''
					break
			}
		},
		getTopResultText(results) {
			if (results.TOP_RESULT.length === 0) {
				this.topResult.primaryText = ''
				this.topResult.secondaryText = ''
				this.topResult.tag = ''
				return
			}

			const topResult = results.TOP_RESULT[0]
			const topResultType = topResult.__TYPE__

			this.topResult.tag = this.toTitleCase(topResultType)

			switch (topResultType) {
				case 'artist':
					this.topResult.primaryText = topResult.ART_NAME
					this.topResult.secondaryText = numberWithDots(topResult.NB_FAN) + ' fans'
					break
				case 'album':
					this.topResult.primaryText = topResult.ALB_TITLE
					this.topResult.secondaryText = 'by ' + topResult.ART_NAME + ' - ' + topResult.NUMBER_TRACK + ' tracks'
					break
				case 'playlist':
					this.topResult.primaryText = topResult.TITLE
					this.topResult.secondaryText = 'by ' + topResult.PARENT_USERNAME + ' - ' + topResult.NB_SONG + ' tracks'
					break
				default:
					this.topResult.primaryText = ''
					this.topResult.secondaryText = ''
					break
			}
		}
	},
	watch: {
		results(newRes, oldRes) {
			console.log('new', newRes)
			console.log('old', oldRes)

			this.getTopResultImgURL(newRes)
			this.getTopResultButtonURL(newRes)
			this.getTopResultText(newRes)
		}
	},
	mounted() {
		socket.on('mainSearch', this.handleMainSearch)
	}
}
</script>

<style>
.artists > :not(:last-child)::after {
	content: ' ';
}
</style>