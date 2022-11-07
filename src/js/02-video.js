import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);

const VIDEO_CURRENT = 'videoplayer-current-time';
let videoTime = '';
let getVideoTime = {};
let numberVideoTime = 0;

const onPlay = function (data) {
  videoTime = JSON.stringify(data.seconds);
  localStorage.setItem(VIDEO_CURRENT, videoTime);
};

player.on('timeupdate', throttle(onPlay, 1000));

getVideoTime = localStorage.getItem(VIDEO_CURRENT);
numberVideoTime = JSON.parse(getVideoTime);

player
  .setCurrentTime(numberVideoTime)
  .then(function () {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
