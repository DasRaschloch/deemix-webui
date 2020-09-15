<template functional>
	<div :id="props.id" class="loading_placeholder" v-show="!props.hidden">
		<span class="loading_placeholder__text">{{ props.text }}</span>
		<div class="lds-ring">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		text: {
			type: String,
			required: false,
			default: 'Loading...'
		},
		id: {
			type: String,
			required: false
		},
		hidden: {
			type: Boolean,
			required: false,
			default: false
		}
	}
}
</script>
