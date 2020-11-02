<template>
	<div class="cover_container">
		<img aria-hidden="true" class="coverart" :class="{ rounded: isRounded, circle: isCircle }" :src="cover" />

		<button
			role="button"
			aria-label="download"
			v-on="$listeners"
			:data-link="link"
			class="bg-black download_overlay hover:bg-primary"
			tabindex="0"
		>
			<i class="material-icons" :title="$t('globals.download_hint')">get_app</i>
		</button>
	</div>
</template>

<script>
export default {
	inheritAttrs: false,
	props: {
		cover: {
			type: String,
			reqired: true
		},
		isRounded: {
			type: Boolean,
			required: false
		},
		isCircle: {
			type: Boolean,
			required: false
		},
		link: {
			type: String,
			reqired: true
		}
	}
}
</script>
