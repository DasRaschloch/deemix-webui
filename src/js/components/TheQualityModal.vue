<template functional>
	<div id="modal_quality" class="smallmodal">
		<div class="smallmodal-content">
			<button class="quality-button" data-quality-value="9">Download FLAC</button>
			<button class="quality-button" data-quality-value="3">Download MP3 320kbps</button>
			<button class="quality-button" data-quality-value="1">Download MP3 128kbps</button>
			<button class="quality-button" data-quality-value="15">Download 360 Reality Audio [HQ]</button>
			<button class="quality-button" data-quality-value="14">Download 360 Reality Audio [MQ]</button>
			<button class="quality-button" data-quality-value="13">Download 360 Reality Audio [LQ]</button>
		</div>
	</div>
</template>
<style>
.smallmodal {
	display: none;
	position: fixed;
	z-index: 1250;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgba(0, 0, 0, 0.4);
	animation-duration: 0.3s;
}

.smallmodal-content {
	background-color: transparent;
	margin: auto;
	width: var(--modal-content-width);
	position: relative;
	top: 50%;
	transform: translateY(-50%);
}

.smallmodal-content button {
	width: 100%;
	margin-bottom: 8px;
}
</style>