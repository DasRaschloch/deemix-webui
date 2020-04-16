new Vue({
	components: {
		'app': httpVueLoader('./public/js/app/components/App.vue')
	}
}).$mount('#v-app');