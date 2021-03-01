export function fetchApi(key, data) {
	const url = new URL(`${window.location.origin}/api/${key}`)

	Object.keys(data).forEach(key => {
		url.searchParams.append(key, data[key])
	})

	return fetch(url.href).then(response => response.json())
}
