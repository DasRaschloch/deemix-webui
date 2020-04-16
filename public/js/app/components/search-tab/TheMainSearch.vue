<template>
	<div id="main_search-2" class="search_tabcontentZZZ">
		<template v-for="(section, index) in results.ORDER">
			<div
				class="search_section"
				v-if="(section !== 'TOP_RESULT' && results[section].data.length > 0) || (results[section].length > 0)"
				:key="`section-${index}`"
			>
				<h1 @click="changeSearchTab(section)">{{ formatNames(section) }}</h1>
				<div v-if="section == 'TOP_RESULT'" class="top_result">
					<div class="cover_container">
						<img
							:src="topResultURL"
							:class="(results.TOP_RESULT[0].__TYPE__ == 'artist' ? 'circle' : 'rounded') + ' coverart'"
						/>
						<div
							role="button"
							aria-label="download"
							v-on:contextmenu="openQualityModal(event)"
							v-on:click="addToQueue(event)"
							v-bind:data-link="'https://deezer.com/'+results.TOP_RESULT[0].__TYPE__+'/'+(results.TOP_RESULT[0].__TYPE__ == 'artist' ? results.TOP_RESULT[0].ART_ID : results.TOP_RESULT[0].__TYPE__ == 'album' ? results.TOP_RESULT[0].ALB_ID : results.TOP_RESULT[0].__TYPE__ == 'playlist' ? results.TOP_RESULT[0].PLAYLIST_ID : '')"
							class="download_overlay"
						>
							<i class="material-icons">get_app</i>
						</div>
					</div>
					<div class="info_box">
						<p
							class="primary-text"
						>{{ results.TOP_RESULT[0].__TYPE__ == 'artist' ? results.TOP_RESULT[0].ART_NAME : results.TOP_RESULT[0].__TYPE__ == 'album' ? results.TOP_RESULT[0].ALB_TITLE : results.TOP_RESULT[0].__TYPE__ == 'playlist' ? results.TOP_RESULT[0].TITLE : '' }}</p>
						<p
							class="secondary-text"
						>{{ results.TOP_RESULT[0].__TYPE__ == 'artist' ? numberWithDots(results.TOP_RESULT[0].NB_FAN) + ' fans' : results.TOP_RESULT[0].__TYPE__ == 'album' ? 'by '+results.TOP_RESULT[0].ART_NAME+' - '+results.TOP_RESULT[0].NUMBER_TRACK+' tracks' : results.TOP_RESULT[0].__TYPE__ == 'playlist' ? 'by '+results.TOP_RESULT[0].PARENT_USERNAME+' - '+results.TOP_RESULT[0].NB_SONG+' tracks' : '' }}</p>
						<span
							class="tag"
						>{{ results.TOP_RESULT[0].__TYPE__.charAt(0).toUpperCase() + results.TOP_RESULT[0].__TYPE__.substring(1)}}</span>
					</div>
				</div>
				<!-- <div v-if="section == 'TRACK'">
					<table class="tracks_table">
						<tr v-for="track in results.TRACK.data.slice(0, 6)" class="track_row">
							<td style="width: 48px; text-align: center;">
								<img
									class="rounded coverart"
									v-bind:src="'https://e-cdns-images.dzcdn.net/images/cover/'+track.ALB_PICTURE+'/32x32-000000-80-0-0.jpg'"
								/>
							</td>
							<td class="breakline">{{track.SNG_TITLE + (track.VERSION ? ' '+track.VERSION : '')}}</td>
							<td class="breakline">
								<span v-for="artist in track.ARTISTS">{{artist.ART_NAME}}</span>
							</td>
							<td class="breakline">{{track.ALB_TITLE}}</td>
							<td>{{convertDuration(track.DURATION)}}</td>
							<td
								role="button"
								aria-label="download"
								v-on:contextmenu="openQualityModal(event)"
								v-on:click="addToQueue(event)"
								v-bind:data-link="'https://www.deezer.com/track/'+track.SNG_ID"
								style="width: 56px; text-align: center;"
								class="clickable"
							>
								<i class="material-icons">get_app</i>
							</td>
						</tr>
					</table>
				</div>-->
				<!-- <div v-if="section != 'TRACK' && section != 'TOP_RESULT'" class="release_grid firstrow_only">
					<div v-for="release in results[section].data.slice(0, 10)" class="release">
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
				</div>-->
			</div>
		</template>
		<div
			v-if="results.ORDER.every(section => section == 'TOP_RESULT' ? results[section].length == 0 : results[section].data.length == 0)"
		>
			<h1>No results</h1>
		</div>
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
		topResultURL: ''
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
		formatNames(name) {
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
		getTopResultURL(result) {
			if (result.TOP_RESULT.length === 0) {
				this.topResultURL = ''
				return
			}

			let topResultType = result.TOP_RESULT[0].__TYPE__

			switch (topResultType) {
				case 'artist':
					this.topResultURL = 'https://e-cdns-images.dzcdn.net/images/artist/' + result.TOP_RESULT[0].ART_PICTURE
					break
				case 'album':
					this.topResultURL = 'https://e-cdns-images.dzcdn.net/images/cover/' + result.TOP_RESULT[0].ALB_PICTURE
					break
				case 'playlist':
					this.topResultURL =
						'https://e-cdns-images.dzcdn.net/images/' +
						result.TOP_RESULT[0].PICTURE_TYPE +
						'/' +
						result.TOP_RESULT[0].PLAYLIST_PICTURE
					break
				default:
					this.topResultURL = 'https://e-cdns-images.dzcdn.net/images/cover/'
					break
			}

			this.topResultURL += '/156x156-000000-80-0-0.jpg'

			// Testing purposes
			let idem =
				(result.TOP_RESULT[0].__TYPE__ == 'artist'
					? 'https://e-cdns-images.dzcdn.net/images/artist/' + result.TOP_RESULT[0].ART_PICTURE
					: result.TOP_RESULT[0].__TYPE__ == 'album'
					? 'https://e-cdns-images.dzcdn.net/images/cover/' + result.TOP_RESULT[0].ALB_PICTURE
					: result.TOP_RESULT[0].__TYPE__ == 'playlist'
					? 'https://e-cdns-images.dzcdn.net/images/' +
					  result.TOP_RESULT[0].PICTURE_TYPE +
					  '/' +
					  result.TOP_RESULT[0].PLAYLIST_PICTURE
					: 'https://e-cdns-images.dzcdn.net/images/cover/') + '/156x156-000000-80-0-0.jpg'

			console.log(this.topResultURL)
			console.log(idem)
		}
	},
	watch: {
		results(newRes, oldRes) {
			console.log('new', newRes)
			console.log('old', oldRes)

			this.getTopResultURL(newRes)
		}
	},
	mounted() {
		socket.on('mainSearch', this.handleMainSearch)
	}
}
</script>

<style>
</style>