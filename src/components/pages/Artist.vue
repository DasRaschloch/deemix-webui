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
				class="section-tabs__tab uppercase-first-letter"
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
						class="uppercase-first-letter"
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
				<tr v-for="release in sortedData" :key="release.releaseID">
					<RouterLink
						tag="td"
						class="flex items-center clickable"
						:to="{ name: 'Album', params: { id: release.releaseID } }"
					>
						<img
							class="rounded coverart"
							:src="release.releaseCover"
							style="margin-right: 16px; width: 56px; height: 56px"
						/>
						<i v-if="release.isReleaseExplicit" class="material-icons title-icon title-icon--explicit">explicit</i>
						{{ release.releaseTitle }}
						<i
							v-if="checkNewRelease(release.releaseDate)"
							class="material-icons title-icon title-icon--new title-icon--right"
						>
							fiber_new
						</i>
					</RouterLink>
					<td class="text-center">{{ release.releaseDate }}</td>
					<td class="text-center">{{ release.releaseTracksNumber }}</td>
					<td @click.stop="sendAddToQueue(release.releaseLink)" class="clickable">
						<i class="material-icons" :title="$t('globals.download_hint')"> file_download </i>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { defineComponent, ref, unref, reactive, computed, onMounted, toRefs } from '@vue/composition-api'
import { orderBy } from 'lodash-es'

import { socket } from '@/utils/socket'
import { sendAddToQueue } from '@/utils/downloads'
import { checkNewRelease } from '@/utils/dates'
import { formatArtistData, getArtistData } from '@/data/artist'
import { standardizeData } from '@/data/standardize'

export default defineComponent({
	setup(props, ctx) {
		const state = reactive({
			currentTab: '',
			sortKey: 'releaseDate',
			sortOrder: 'desc',
			artistReleases: {},
			artistName: '',
			artistPicture: '',
			currentRelease: computed(() => state.artistReleases[state.currentTab])
		})

		const artistID = computed(() => ctx.root.$router.currentRoute.params.id)
		const hasDataLoaded = ref(false)

		getArtistData(unref(artistID))
			.then(artistData => {
				hasDataLoaded.value = true

				const {
					data: [{ artistName, artistPictureXL, artistReleases }]
				} = standardizeData({ data: [artistData], hasLoaded: unref(hasDataLoaded) }, formatArtistData)

				Object.assign(state, {
					artistName,
					artistPicture: artistPictureXL,
					artistReleases,
					currentTab: Object.keys(artistReleases)[0]
				})
			})
			.catch(err => console.error(err))

		const sortedData = computed(() => {
			if (!unref(hasDataLoaded)) {
				return []
			}

			let sortKey = state.sortKey

			if (sortKey === 'releaseTracksNumber') {
				sortKey = o => new Number(o.releaseTracksNumber)
			}

			return orderBy(state.currentRelease, sortKey, state.sortOrder)
		})

		const changeTab = newTab => {
			state.currentTab = newTab
		}

		return {
			...toRefs(state),
			downloadLink: computed(() => `https://www.deezer.com/artist/${unref(artistID)}`),
			headerStyle: computed(() => ({
				backgroundImage: `linear-gradient(to bottom, transparent 0%, var(--main-background) 100%), url(${state.artistPicture})`
			})),
			sortedData,
			sendAddToQueue,
			checkNewRelease,
			changeTab
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
		}
	}
})
</script>

