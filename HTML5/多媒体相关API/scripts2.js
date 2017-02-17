function playOrPauseVideo() {
	let videoUrl = document.querySelector('#valueUrl').value;
	const video = document.querySelector('#video');
	const playButton = document.querySelector('#playButton');

	//使用事件监听方式捕捉事件
	video.addEventListener('timeupdate', () => {
		const timeDisplay = document.querySelector('#time');
		//用秒数来显示当前播放进度
		currentTime = Math.floor(video.currentTime);
		duration = Math.floor(video.duration);
		timeDisplay.innerHTML = `${currentTime} / ${duration} (秒)`;
	});

	if (video.paused) {
		video.play();
		playButton.textContent = '播放';
	} else {
		video.pause();
		playButton.textContent = '暂停';
	}
}