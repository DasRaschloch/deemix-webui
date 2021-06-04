<template>
	<div class="logs-container">
		<h1 class="mb-8 text-5xl capitalize">{{ $t('sidebar.logs') }}</h1>

		<table class="w-full text-center">
			<tr>
				<th></th>
				<th class="pr-5 h-12">Event</th>
				<th>Data</th>
			</tr>
			<tr v-for="(message, i) of logMessages" :key="i">
				<td class="count"></td>
				<td class="pr-5 w-1/3">{{ message.key }}</td>
				<td class="w-2/3">{{ message.data || 'Empty' }}</td>
			</tr>
		</table>
	</div>
</template>

<script>
import { useLogs } from '@/use/logs'
import { computed } from '@vue/composition-api'

export default {
	name: 'Logs',
	setup() {
		const messages = useLogs()
		const logMessages = computed(() => messages.value.slice(0, 50).reverse())

		return {
			logMessages
		}
	}
}
</script>

<style scoped>
.logs-container {
	counter-reset: logs;
}

.count::before {
	content: counter(logs);
	counter-increment: logs;
}
</style>
