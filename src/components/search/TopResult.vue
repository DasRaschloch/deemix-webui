<template>
	<router-link
		tag="div"
		class="top_result cursor-pointer flex items-center flex-col"
		:to="{ name: upperCaseFirstLowerCaseRest($attrs.info.type), params: { id: $attrs.info.id } }"
	>
		<div class="cover_container">
			<img
				aria-hidden="true"
				class="coverart"
				:src="$attrs.info.picture"
				:class="$attrs.info.type == 'artist' ? 'circle' : 'rounded'"
			/>

			<button
				role="button"
				aria-label="download"
				@click.stop="$emit('add-to-queue', $event)"
				:data-link="$attrs.info.link"
				class="download_overlay"
				tabindex="0"
			>
				<i class="material-icons" :title="$t('globals.download_hint')">get_app</i>
			</button>
		</div>
		<div class="info_box">
			<p class="primary-text">{{ $attrs.info.title }}</p>
			<p class="secondary-text">
				{{ fansNumber }}
			</p>
			<span class="tag">{{ $tc(`globals.listTabs.${$attrs.info.type}`, 1) }}</span>
		</div>
	</router-link>
</template>

<style scoped>
.tag {
	background-color: var(--tag-background);
	border-radius: 2px;
	color: var(--tag-text);
	display: inline-block;
	font-size: 10px;
	padding: 3px 6px;
	text-transform: capitalize;
}
</style>

<script>
import { upperCaseFirstLowerCaseRest } from '@/utils/texts'

export default {
	methods: {
		upperCaseFirstLowerCaseRest
	},
	computed: {
		fansNumber() {
			let number

			try {
				number = this.$n(this.$attrs.info.nb_fan)
			} catch (error) {
				number = this.$n(this.$attrs.info.nb_fan, { locale: 'en' })
			}

			return this.$attrs.info.type == 'artist'
				? this.$t('search.fans', { n: number })
				: this.$t('globals.by', { artist: this.$attrs.info.artist }) +
						' - ' +
						this.$tc('globals.listTabs.trackN', this.$attrs.info.nb_song)
		}
	}
}
</script>
