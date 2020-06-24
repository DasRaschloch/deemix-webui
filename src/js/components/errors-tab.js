import Vue from 'vue'

const ErrorsTab = new Vue({
	data: () => ({
		title: '',
		errors: []
	}),
	methods: {
		reset(){
			this.title = ''
			this.errors = []
		},
		showErrors(data){
			this.title = data.artist+" - "+data.title
			this.errors = data.errors
		}
	}
}).$mount('#errors_tab')

export default ErrorsTab
