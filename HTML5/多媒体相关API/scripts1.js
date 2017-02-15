const video = document.querySelector('#video1');

window.onload = () => {
	//监听视频播放结束事件
	
	video.addEventListener('ended', () => console.log('播放结束'));

	//错误
	video.addEventListener('error', () => {
		switch (video.error.code){
			case MediaError.MEDIA_ERROR_ABORTED:
				console.log('视频下载过程被中止');
				break;
			case MediaError.MEDIA_ERROR_NETWORK:
				console.log('网络发生故障，视频的下载过程被中止');
				break;
			case MediaError.MEDIA_ERROR_DECODE:
                console.log("解码失败。");
                break;
            case MediaError.MEDIA_ERROR_SRC_NOT_SUPPORTED:
                console.log("媒体资源不可用或媒体格式不被支持。");
                break;
            default:
                console.log("发生未知错误。");
		}
	})
	
}

function play() {
	video.play();
}

function pause() {
	video.pause();
}