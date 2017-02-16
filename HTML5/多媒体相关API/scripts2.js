function playOrPauseVideo() {
	const videoUrl = document.querySelector('#videoUrl').value;
	const video = document.querySelector('#video');

	//使用事件监听方式捕捉事件
	video.addEventListener('timeupdate', () => {
		const timeDisplay = document.querySelector('#time');
	})
}