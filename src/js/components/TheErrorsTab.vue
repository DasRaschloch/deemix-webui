<template>
	<div id="errors_tab" class="main_tabcontent">
		<h1>Errors for {{ title }}</h1>
		<table>
			<tr>
				<th>ID</th>
				<th>Artist</th>
				<th>Title</th>
				<th>Error</th>
			</tr>
			<tr v-for="error in errors">
				<td>{{ error.data.id }}</td>
				<td>{{ error.data.artist }}</td>
				<td>{{ error.data.title }}</td>
				<td>{{ error.message }}</td>
			</tr>
		</table>
	</div>
</template>

<script>
import EventBus from '@/js/EventBus'

export default {
	name: 'the-errors-tab',
	data: () => ({
		title: '',
		errors: []
	}),
	methods: {
		reset() {
			this.title = ''
			this.errors = []
		},
		showErrors(data) {
			this.title = data.artist + ' - ' + data.title
			this.errors = data.errors
		}
	},
	mounted() {
		EventBus.$on('showErrors', this.showErrors)
	}
}
</script>

<style>
</style>