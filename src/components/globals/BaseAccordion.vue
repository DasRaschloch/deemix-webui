<template functional>
	<details :class="{ 'with-arrow': props.withArrow }">
		<summary class="mb-6 cursor-pointer">
			<slot name="title">Setting</slot>
		</summary>

		<slot name="default">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos distinctio sint culpa, recusandae vel fugit esse hic
			tenetur autem. Debitis.
		</slot>
	</details>
</template>

<style>
details > summary::-webkit-details-marker {
	display: none;
}

details.with-arrow > summary::-webkit-details-marker {
	display: initial;
}
</style>

<script>
export default {
	props: {
		withArrow: {
			type: Boolean,
			default: false
		}
	}
}
</script>
