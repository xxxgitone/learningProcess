const timeNodes = Array.from(document.querySelectorAll('[data-time]'));

//获取视频时间
const seconds = timeNodes
  .map(node => node.dataset.time)
  .map(timeCode => {
    // const [mins, secs] = timeCode.split(':').map(function (str) {
    //   return parseFloat(str);
    // });
    const [mins, secs] = timeCode.split(':').map(parseFloat);
    return (mins * 60) + secs;
  })
  .reduce((total, vidSeconds) => total + vidSeconds);

let secondsLeft = seconds;
const hours = Math.floor(secondsLeft / 3600);
secondsLeft = secondsLeft % 3600;
const mins = Math.floor(secondsLeft / 60);
const secs = secondsLeft % 60;

console.log(hours, mins, secs);