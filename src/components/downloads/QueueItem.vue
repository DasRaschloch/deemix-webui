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
			</div>
		</div>
		<div class="download_bar">
			<div class="progress">
				<div :id="`bar_${queueItem.uuid}`" class="indeterminate" :ref="`bar_${queueItem.uuid}`"></div>
			</div>
			<i class="material-icons queue_icon" :data-uuid="queueItem.uuid">remove</i>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		queueItem: Object
	}
}
</script>