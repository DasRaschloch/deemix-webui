<template>
	<div class="relative image-header">
		<header class="flex items-center" :style="headerStyle">
			<h1 class="m-0">{{ artistName }}</h1>

			<div
				class="grid w-16 h-16 ml-auto rounded-full cursor-pointer bg-primary text-grayscale-870 place-items-center"
				@click.stop="sendAddToQueue(downloadLink)"
				aria-label="download"
				role="button"
			>
				<i class="text-4xl material-icons" :title="$t('globals.download_hint')">get_app</i>
			</div>
		</header>

		<ul class="my-8 section-tabs">
			<li
				v-for="(item, name) in artistReleases"
				:key="name"
				class="section-tabs__tab"
				@click="changeTab(name)"
				:class="{ active: currentTab === name }"
			>
				{{ $tc(`globals.listTabs.${name}`, 2) }}
			</li>
		</ul>

		<table class="table">
			<thead>
				<tr>
					<th
						v-for="data in head"
						:key="data.title"
						@click="data.sortKey ? sortBy(data.sortKey) : null"
						:style="{ width: data.width ? data.width : 'auto' }"
						:class="{
							'sort-asc': data.sortKey == sortKey && sortOrder == 'asc',
							'sort-desc': data.sortKey == sortKey && sortOrder == 'desc',
							sortable: data.sortKey,
							clickable: data.sortKey
						}"
					>
						<!-- Need to change this behaviour for translations -->
						{{ data.title }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="release in showTable">
					<router-link
						tag="td"
						class="flex items-center clickable"
						:to="{ name: 'Album', params: { id: release.releaseID } }"
					>
						<img
							class="rounded coverart"
							:src="release.releaseCover"
							style="margin-right: 16px; width: 56px; height: 56px"
						/>
						<i v-if="release.isReleaseExplicit" class="material-icons explicit-icon">explicit</i>
						{{ release.releaseTitle }}
						<i v-if="checkNewRelease(release.releaseDate)" class="material-icons" style="color: #ff7300">fiber_new</i>
					</router-link>
					<td>{{ release.releaseDate }}</td>
					<td>{{ release.releaseTracksNumber }}</td>
					<td @click.stop="sendAddToQueue(release.releaseLink)" class="clickable">
						<i class="material-icons" :title="$t('globals.download_hint')"> file_download </i>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { orderBy } from 'lodash-es'

import { socket } from '@/utils/socket'
import { sendAddToQueue } from '@/utils/downloads'
import EventBus from '@/utils/EventBus'
import { formatArtistData } from '@/data/artist'
import { standardizeData } from '@/data/standardize'
import { ref, reactive, computed, onMounted, toRefs, onDeactivated } from '@vue/composition-api'

export default {
	setup() {
		const state = reactive({
			currentTab: '',
			sortKey: 'releaseDate',
			sortOrder: 'desc',
			artistReleases: {},
			artistID: '',
			artistName: '',
			artistPicture: ''
		})

		const currentRelease = computed(() => state.artistReleases[state.currentTab])

		const setupData = data => {
			const {
				data: [{ artistID, artistName, artistPictureXL, artistReleases }]
			} = standardizeData({ data: [data], hasLoaded: true }, formatArtistData)

			Object.assign(state, {
				artistID,
				artistName,
				artistPicture: artistPictureXL,
				artistReleases
			})

			// ? Is it not granted that it's always 'all' ?
			state.currentTab = Object.keys(artistReleases)[0]
		}

		const reset = () => {
			state.currentTab = ''
			state.sortKey = 'releaseDate'
			state.sortOrder = 'desc'
		}

		onDeactivated(reset)

		onMounted(() => {
			socket.on('show_artist', setupData)
		})

		const showTable = computed(() => {
			if (Object.keys(state.artistReleases).length !== 0) {
				let sortKey = state.sortKey

				if (sortKey == 'releaseTracksNumber') {
					sortKey = o => new Number(o.releaseTracksNumber)
				}

				return orderBy(currentRelease.value, sortKey, state.sortOrder)
			}

			return []
		})

		return {
			...toRefs(state),
			downloadLink: computed(() => `https://www.deezer.com/artist/${state.artistID}`),
			headerStyle: computed(() => ({
				backgroundImage: `linear-gradient(to bottom, transparent 0%, var(--main-background) 100%), url(${state.artistPicture})`
			})),
			showTable,
			sendAddToQueue,
			currentRelease
		}
	},
	data() {
		const $t = this.$t.bind(this)
		const $tc = this.$tc.bind(this)

		return {
			head: [
				{ title: $tc('globals.listTabs.title', 1), sortKey: 'releaseTitle' },
				{ title: $t('globals.listTabs.releaseDate'), sortKey: 'releaseDate' },
				{ title: $tc('globals.listTabs.track', 2), sortKey: 'releaseTracksNumber' },
				{ title: '', width: '32px' }
			]
		}
	},
	methods: {
		sortBy(key) {
			if (key === this.sortKey) {
				this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
			} else {
				this.sortKey = key
				this.sortOrder = 'asc'
			}
		},
		changeTab(tab) {
			this.currentTab = tab
		},
		checkNewRelease(date) {
			let g1 = new Date()
			let g2 = new Date(date)
			g2.setDate(g2.getDate() + 3)
			g1.setHours(0, 0, 0, 0)

			return g1.getTime() <= g2.getTime()
		}
	}
}
</script>

