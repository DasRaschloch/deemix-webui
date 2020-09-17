<template>
	<audio id="preview-track" @canplay="onCanPlay" @timeupdate="onTimeUpdate" ref="preview">
		<source id="preview-track_source" src="" type="audio/mpeg" />
	</audio>
</template>

<script>
import $ from 'jquery'
import EventBus from '@/utils/EventBus'

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
			$(this.$refs.preview).animate({ volume: window.vol.preview_max_volume / 100 }, 500)
		},
		onTimeUpdate() {
			// Prevents first time entering in this function
			if (isNaN(this.$refs.preview.duration)) return
			let duration = this.$refs.preview.duration
			if (!isFinite(duration)) duration = 30
			if (duration - this.$refs.preview.currentTime >= 1) return
			if (this.previewStopped) return

			$(this.$refs.preview).animate({ volume: 0 }, 800)

			this.previewStopped = true

			$('a[playing] > .preview_controls').css({ opacity: 0 })
			$('*').removeAttr('playing')
			$('.preview_controls').text('play_arrow')
			$('.preview_playlist_controls').text('play_arrow')
		},
		playPausePreview(e) {
			e.preventDefault()
			e.stopPropagation()

			const { currentTarget: obj } = event

			var $icon = obj.tagName == 'I' ? $(obj) : $(obj).children('i')

			if ($(obj).attr('playing')) {
				if (this.$refs.preview.paused) {
					this.$refs.preview.play()
					this.previewStopped = false

					$icon.text('pause')

					$(this.$refs.preview).animate({ volume: window.vol.preview_max_volume / 100 }, 500)
				} else {
					this.previewStopped = true

					$icon.text('play_arrow')

					$(this.$refs.preview).animate({ volume: 0 }, 250, 'swing', () => {
						this.$refs.preview.pause()
					})
				}
			} else {
				$('*').removeAttr('playing')
				$(obj).attr('playing', true)

				$('.preview_controls').text('play_arrow')
				$('.preview_playlist_controls').text('play_arrow')
				$('.preview_controls').css({ opacity: 0 })

				$icon.text('pause')
				$icon.css({ opacity: 1 })

				this.previewStopped = false

				$(this.$refs.preview).animate({ volume: 0 }, 250, 'swing', () => {
					this.$refs.preview.pause()
					$('#preview-track_source').prop('src', $(obj).data('preview'))
					this.$refs.preview.load()
				})
			}
		},
		stopStackedTabsPreview() {
			if (
				$('.preview_playlist_controls').filter(function () {
					return $(this).attr('playing')
				}).length > 0
			) {
				$(this.$refs.preview).animate({ volume: 0 }, 800)
				this.previewStopped = true
				$('.preview_playlist_controls').removeAttr('playing')
				$('.preview_playlist_controls').text('play_arrow')
			}
		},
		previewMouseEnter(e) {
			$(e.currentTarget).css({ opacity: 1 })
		},
		previewMouseLeave(event) {
			const { currentTarget: obj } = event

			if (($(obj).parent().attr('playing') && this.previewStopped) || !$(obj).parent().attr('playing')) {
				$(obj).css({ opacity: 0 }, 200)
			}
		}
	}
}
</script>

<style>
</style>
