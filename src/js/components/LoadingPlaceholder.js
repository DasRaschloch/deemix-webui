import Vue from 'vue'

Vue.component('loading-placeholder', {
	template: `<div class="loading_placeholder">
		<span class="loading_placeholder__text">Loading...</span>
		<div class="lds-ring">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	</div>`
})
