<template>
  <video
    ref="videoPlayer"
    class="video-js vjs-default-skin"
  ></video>
</template>

<script>
  import videojs from 'video.js';
  import 'video.js/dist/video-js.min.css';
  import 'videojs-youtube';

  export default {
    name: "VideoPlayer",
    data() {
      return {
        player: null
      }
    },
    props: {
      options: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    mounted() {
      this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
        console.log('onPlayerReady', this);
      });
    },
    beforeDestroy() {
      if (this.player) {
        this.player.dispose()
      }
    }
  }
</script>
