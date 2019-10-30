<template>
  <video-player :options="videoOptions"></video-player>

</template>

<script>
  import VideoPlayer from "../videoPlayer";

  export default {
    name: 'tutorialVideoPlayer',
    components: {
      VideoPlayer
    },
    data() {
      return {
        videoOptions: {
          controls: true,
          fluid: true,
          fill: true,
          preload: true,
          language: 'fr',
          techOrder: ['youtube'],
          sources: [
            {
              src:
                "/https://www.youtube.com/embed/" + this.videoId + "?showinfo=0&enablejsapi=1&origin=http://localhost:8080",
              type: "video/youtube"
            }
          ]
        }
      };
    },
    props: {
      videoId: {
        type: String,
        default() {
          return ''
        }
      }
    }
  }
</script>
