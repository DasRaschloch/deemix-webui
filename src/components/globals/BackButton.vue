<template>
	<button class="top-back-button" @click="$router.back()">
		<i class="material-icons mirrored md-36">forward</i>
	</button>
</template>

<style lang="scss" scoped>
$button-dimension: 4rem;
$button-separator: 10px;

.top-back-button {
	display: flex;
	justify-content: center;
	align-items: center;

	position: absolute;
	top: $button-separator;
	left: $button-separator;

	min-width: unset;
	width: $button-dimension;
	height: $button-dimension;

	background: var(--secondary-background);
	border-radius: 50%;
	padding: 0.25rem;
	margin: 0;
	transition: background 200ms ease-in-out;

	&:hover {
		background: var(--accent-color);
	}
}
</style>