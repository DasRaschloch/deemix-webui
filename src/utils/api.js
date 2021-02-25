export const get = function(key, data){
  let url = `/api/${key}`
  if (data){
    let query = Object.keys(data)
               .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
               .join('&')
    url += '?'+query
  }
  return fetch(url).then(response => response.json())
}
