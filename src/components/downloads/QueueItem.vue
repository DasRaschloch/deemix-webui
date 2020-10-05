<template>
	<div class="download-object">
		<div class="download-info">
			<img width="75px" class="rounded coverart" :src="queueItem.cover" :alt="`Cover ${queueItem.title}`" />

			<div class="download-info-data">
				<span class="download-line">{{ queueItem.title }}</span> <span class="download-slim-separator"> - </span>
				<span>{{ queueItem.artist }}</span>
			</div>

			<div class="download-info-status" style="text-align: center">
				<span class="download-line"> {{ queueItem.downloaded + queueItem.failed }}/{{ queueItem.size }} </span>

				<span
					v-if="hasFails"
					class="inline-flex"
					:class="{ clickable: finishedWithFails }"
					style="justify-content: center"
					@click="finishedWithFails ? $emit('show-errors', queueItem) : null"
				>
					{{ queueItem.failed }}
					<i class="material-icons">error_outline</i>
				</span>
			</div>
		</div>

		<div class="download-bar">
			<div class="progress">
				<div :class="barClass" :style="barStyle"></div>
			</div>
			<i
				v-if="!isLoading"
				class="material-icons queue_icon"
				:class="{ clickable: finishedWithFails || resultIconText === 'delete_forever' }"
				@click="onResultIconClick"
			>
				{{ resultIconText }}
			</i>
			<div v-else class="circle-loader"></div>
		</div>
	</div>
</template>

<style lang="scss">
.download-object {
	padding-bottom: 8px;

	.download-info {
		display: flex;
		align-items: center;

		img {
			height: 75px;
			flex-shrink: 0;
			flex: 0 0 75px;
		}

		.download-line {
			display: block;
		}

		.download-slim-separator {
			display: none;
		}
	}

	.download-info-data {
		flex: 1 50%;
		margin-left: 8px;
		overflow: hidden;
	}

	.download-info-status {
		flex: 1 15%;
		margin-left: 8px;
		width: 80px;
	}

	> .download-bar {
		display: flex;
		align-items: center;
		height: 24px;

		> .queue_icon {
			cursor: default;
			margin-left: 8px;
		}

		> .progress {
			margin: 0px;
		}
	}
}

#download_list:not(.slim) .download-line {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

#download_list.slim {
	> .download-object {
		.download-info {
			display: block;

			img {
				display: none;
			}

			.download-line {
				display: inline-block;
			}

			.download-slim-separator {
				display: inline-block;
			}
		}

		.download-info-data {
			width: calc(80% - 16px);
			display: inline-block;
			padding-left: 0px;
		}

		.download-info-status {
			width: 20%;
			display: inline-block; // ignored due to float
			float: right;
		}
	}
}
</style>

<script>
const possibleStates = ['converting', 'downloading', 'download finished']

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
		hasFails() {
			return this.queueItem.failed >= 1
		},
		allFailed() {
			let allFailed = false

			if (this.queueItem.status === 'download finished') {
				allFailed = this.queueItem.failed === this.queueItem.size
			}

			return allFailed
		},
		finishedWithFails() {
			return this.queueItem.status === 'download finished' && this.hasFails
		},
		barClass() {
			return {
				converting: this.queueItem.status === 'converting',
				indeterminate: possibleStates.indexOf(this.queueItem.status) === -1,
				determinate: possibleStates.indexOf(this.queueItem.status) !== -1
			}
		},
		barStyle() {
			let width = 0
			let backgroundColor = 'var(--accent-color)'

			if (this.hasFails) {
				// Orange
				backgroundColor = 'hsl(33, 100%, 47%)'
			} else {
				// Green
				backgroundColor = 'hsl(120, 100%, 40%)'
			}

			if (this.allFailed) {
				// Red
				backgroundColor = 'hsl(360, 100%, 35%)'
			}

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
				width: `${width}%`,
				backgroundColor
			}
		},
		resultIconText() {
			let text = 'delete_forever'

			if (this.queueItem.status === 'download finished') {
				if (!this.hasFails) {
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