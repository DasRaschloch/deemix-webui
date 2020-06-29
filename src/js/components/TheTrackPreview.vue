<template>
	<audio id="preview-track" @canplay="onCanPlay" @timeupdate="onTimeUpdate" ref="previewEl">
		<source id="preview-track_source" src="" type="audio/mpeg" />
	</audio>
</template>

<script>
import $ from 'jquery'

export default {
	data: () => ({
		previewStopped: false
	}),
	methods: {
		async onCanPlay() {
			await this.$refs.previewEl.play()

			this.previewStopped = false
			$(this.$refs.previewEl).animate({ volume: vol.preview_max_volume / 100 }, 500)
		},
		onTimeUpdate() {
			// Prevents first time entering in this function
			if (isNaN(this.$refs.previewEl.duration)) return
			if (this.$refs.previewEl.currentTime <= this.$refs.previewEl.duration - 1) return

			$(this.$refs.previewEl).animate({ volume: 0 }, 800)

			this.previewStopped = true

			$('a[playing] > .preview_controls').css({ opacity: 0 })
			$('*').removeAttr('playing')
			$('.preview_controls').text('play_arrow')
			$('.preview_playlist_controls').text('play_arrow')
		}
	}
}
</script>

<style>
</style>