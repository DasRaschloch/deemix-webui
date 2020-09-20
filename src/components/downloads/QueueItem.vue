<template>
	<div class="download_object" :id="`download_${queueItem.uuid}`" :data-deezerid="queueItem.id">
		<div class="download_info">
			<img width="75px" class="rounded coverart" :src="queueItem.cover" :alt="`Cover ${queueItem.title}`" />
			<div class="download_info_data">
				<span class="download_line">{{ queueItem.title }}</span> <span class="download_slim_separator"> - </span>
				<span class="secondary-text">{{ queueItem.artist }}</span>
			</div>
			<div class="download_info_status">
				<span class="download_line">
					<span class="queue_downloaded">{{ queueItem.downloaded + queueItem.failed }}</span
					>/{{ queueItem.size }}
				</span>
				<span class="secondary-text inline-flex" v-if="queueItem.failed >= 1">
					<span class="download_slim_separator">(</span>
					<span
						class="queue_failed_button inline-flex"
						:class="{ clickable: finishedWithFails }"
						@click="finishedWithFails ? $emit('show-errors', queueItem) : null"
					>
						<span class="queue_failed">{{ queueItem.failed }}</span>
						<i class="material-icons">error_outline</i>
					</span>
					<span class="download_slim_separator">)</span>
				</span>
			</div>
		</div>
		<div class="download_bar">
			<div class="progress">
				<div :id="`bar_${queueItem.uuid}`" :class="barClass" :style="barStyle"></div>
			</div>
			<i
				class="material-icons queue_icon"
				:data-uuid="queueItem.uuid"
				:class="{ clickable: finishedWithFails }"
				@click="onResultIconClick"
				v-if="!isLoading"
			>
				{{ resultIconText }}
			</i>
			<div v-else class="circle-loader"></div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isLoading: false
		}
	},
	props: {
		queueItem: Object
	},
	computed: {
		finishedWithFails() {
			return this.queueItem.status === 'download finished' && this.queueItem.failed >= 1
		},
		barClass() {
			return {
				converting: this.queueItem.status === 'converting',
				indeterminate: ['converting', 'downloading', 'download finished'].indexOf(this.queueItem.status) === -1,
				determinate: ['converting', 'downloading', 'download finished'].indexOf(this.queueItem.status) !== -1
			}
		},
		barStyle() {
			let width = 0

			if (this.queueItem.status === 'download finished') {
				width = 100
			}

			if (this.queueItem.status === 'downloading') {
				width = this.queueItem.progress
			}

			if (this.queueItem.status === 'converting') {
				width = 100 - this.queueItem.conversion
			}

			return {
				width: `${width}%`
			}
		},
		resultIconText() {
			let text = 'remove'

			if (this.queueItem.status === 'download finished') {
				if (this.queueItem.failed == 0) {
					text = 'done'
				} else {
					if (this.queueItem.failed >= this.queueItem.size) {
						text = 'error'
					} else {
						text = 'warning'
					}
				}
			}

			return text
		}
	},
	methods: {
		onResultIconClick() {
			if (this.finishedWithFails) {
				this.$emit('show-errors', this.queueItem)
			}

			if (this.queueItem.status === 'downloading') {
				this.isLoading = true
				this.$emit('remove-item', this.queueItem.uuid)
			}
		}
	}
}
</script>