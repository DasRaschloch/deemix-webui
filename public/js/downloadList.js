var downloadList = new Vue({
  el: '#download_list',
  data: {
		queue: [],
		queueList: {}
  }
})

socket.on("addedToQueue", function(queueItem){
	downloadList.queueList[queueItem.uuid] = queueItem
	downloadList.queue.push(queueItem)
})

socket.on("updateQueue", function(update){
	if (update.uuid && downloadList.queue.indexOf(update.uuid) > -1){
		console.log(update)
		if (update.downloaded) downloadList.queueList[update.uuid].downloaded++
		if (update.failed) downloadList.queueList[update.uuid].failed++
		if (update.progress) downloadList.queueList[update.uuid].progress = update.progress
	}
})
