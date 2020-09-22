<template>
	<audio id="preview-track" @canplay="onCanPlay" @timeupdate="onTimeUpdate" ref="preview">
		<source id="preview-track_source" src="" type="audio/mpeg" />
	</audio>
</template>

<script>
// import $ from 'jquery'
import EventBus from '@/utils/EventBus'

import { adjustVolume } from '@/utils/adjust-volume'

export default {
	data: () => ({
		previewStopped: false
	}),
	mounted() {
		this.$refs.preview.volume = 1

		EventBus.$on('trackPreview:playPausePreview', this.playPausePreview)
		EventBus.$on('trackPreview:stopStackedTabsPreview', this.stopStackedTabsPreview)
		EventBus.$on('trackPreview:previewMouseEnter', this.previewMouseEnter)
		EventBus.$on('trackPreview:previewMouseLeave', this.previewMouseLeave)
	},
	methods: {
		async onCanPlay() {
			await this.$refs.preview.play()

			this.previewStopped = false

			await adjustVolume(this.$refs.preview, window.vol.preview_max_volume / 100, { duration: 500 })
			// $(this.$refs.preview).animate({ volume: window.vol.preview_max_volume / 100 }, 500)
			// this.$refs.preview.volume = window.vol.preview_max_volume / 100
		},
		async onTimeUpdate() {
			// Prevents first time entering in this function
			if (isNaN(this.$refs.preview.duration)) return

			let duration = this.$refs.preview.duration

			if (!isFinite(duration)) {
				duration = 30
			}

			if (duration - this.$refs.preview.currentTime >= 1) return
			if (this.previewStopped) return

			await adjustVolume(this.$refs.preview, 0, { duration: 800 })
			// this.$refs.preview.volume = 0
			// $(this.$refs.preview).animate({ volume: 0 }, 800)

			this.previewStopped = true

			// $('a[playing] > .preview_controls').css({ opacity: 0 })

			document.querySelectorAll('a[playing] > .preview_controls').forEach(control => {
				control.style.opacity = 0
			})

			// $('*').removeAttr('playing')
			document.querySelectorAll('*').forEach(el => {
				el.removeAttribute('playing')
			})

			// $('.preview_controls').text('play_arrow')
			// $('.preview_playlist_controls').text('play_arrow')
			document.querySelectorAll('.preview_controls, .preview_playlist_controls').forEach(el => {
				el.textContent = 'play_arrow'
			})
		},
		async playPausePreview(e) {
			e.preventDefault()
			e.stopPropagation()

			const { currentTarget: obj } = event

			// var $icon = obj.tagName == 'I' ? $(obj) : $(obj).children('i')
			var icon = obj.tagName == 'I' ? obj : obj.querySelector('i')

			// if ($(obj).attr('playing')) {
			if (obj.hasAttribute('playing')) {
				if (this.$refs.preview.paused) {
					this.$refs.preview.play()
					this.previewStopped = false

					// $icon.text('pause')
					icon.innerText = 'pause'

					// this.$refs.preview.volume = window.vol.preview_max_volume / 100
					await adjustVolume(this.$refs.preview, window.vol.preview_max_volume / 100, { duration: 500 })
					// $(this.$refs.preview).animate({ volume: window.vol.preview_max_volume / 100 }, 500)
				} else {
					this.previewStopped = true

					// $icon.text('play_arrow')
					icon.innerText = 'play_arrow'

					// this.$refs.preview.volume = 0

					await adjustVolume(this.$refs.preview, 0, { duration: 250 })
					// $(this.$refs.preview).animate({ volume: 0 }, 250, 'swing', () => {
					this.$refs.preview.pause()
					// })
				}
			} else {
				// $('*').removeAttr('playing')
				document.querySelectorAll('*').forEach(el => {
					el.removeAttribute('playing')
				})
				// $(obj).attr('playing', true)
				obj.setAttribute('playing', true)

				// $('.preview_controls').text('play_arrow')
				// $('.preview_playlist_controls').text('play_arrow')

				document.querySelectorAll('.preview_controls, .preview_playlist_controls').forEach(el => {
					el.textContent = 'play_arrow'
				})

				// $('.preview_controls').css({ opacity: 0 })
				document.querySelectorAll('.preview_controls').forEach(el => {
					el.style.opacity = 0
				})

				// $icon.text('pause')
				// $icon.css({ opacity: 1 })
				icon.innerText = 'pause'
				icon.style.opacity = 1

				this.previewStopped = false

				// this.$refs.preview.volume = 0
				// $(this.$refs.preview).animate({ volume: 0 }, 250, 'swing', () => {
				await adjustVolume(this.$refs.preview, 0, { duration: 250 })
				this.$refs.preview.pause()

				// $('#preview-track_source').prop('src', $(obj).data('preview'))
				document.getElementById('preview-track_source').src = obj.getAttribute('data-preview')

				this.$refs.preview.load()
				// })
			}
		},
		async stopStackedTabsPreview() {
			let controls = Array.prototype.slice.call(document.querySelectorAll('.preview_playlist_controls[playing]'))

			// $('.preview_playlist_controls').filter(function () {
			// 	return $(this).attr('playing')
			// }).length

			if (controls.length === 0) return

			// $(this.$refs.preview).animate({ volume: 0 }, 800)
			await adjustVolume(this.$refs.preview, 0, { duration: 800 })
			// this.$refs.preview.volume = 0
			this.previewStopped = true

			controls.forEach(control => {
				control.removeAttribute('playing')
				control.innerText = 'play_arrow'
			})

			// $('.preview_playlist_controls').removeAttr('playing')
			// $('.preview_playlist_controls').text('play_arrow')
		},
		previewMouseEnter(e) {
			e.currentTarget.style.opacity = 1
			// $(e.currentTarget).css({ opacity: 1 })
		},
		previewMouseLeave(event) {
			const { currentTarget: obj } = event

			const parentIsPlaying = obj.parentElement.hasAttribute('playing')

			// if (($(obj).parent().attr('playing') && this.previewStopped) || !$(obj).parent().attr('playing')) {
			// 	$(obj).css({ opacity: 0 }, 200)
			// }

			if ((parentIsPlaying && this.previewStopped) || !parentIsPlaying) {
				// $(obj).css({ opacity: 0 }, 200)
				obj.style.opacity = 0
			}
		}
	}
}
</script>

<style>
</style>
