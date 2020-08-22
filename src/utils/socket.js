export const socket = io.connect(window.location.href)

socket.on('connect', () => {
	document.getElementById('start_app_placeholder').classList.add('loading_placeholder--hidden')
})

// socket.on('init_charts', data => {
// 	console.log(data)
// })

// socket.on('init_home', data => {
// 	console.log(data)
// 	localStorage.setItem('test_DELETE', JSON.stringify(data))
// 	console.log(JSON.parse(localStorage.getItem('test_DELETE')))
// })
