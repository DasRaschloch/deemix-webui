<template>
	<button
		class="btn-primary border-transparent border-solid absolute flex items-center justify-center p-1 m-0 w-16 h-16 rounded-full"
		@click="$router.back()"
	>
		<i class="material-icons mirrored text-4xl text-white">forward</i>
	</button>
</template>

<style scoped>
button {
	top: 10px;
	left: 10px;

	transition: background 200ms ease-in-out;
}
</style>