<template>
  <v-container>
    <v-row
      justify="center"
      class="grey lighten-5"
    >
      <v-col :cols="8">
        <v-sheet class="grey lighten-5 text-center headline">{{ this.tutorial.title }}</v-sheet>
      </v-col>
      <v-col :cols="7">
        <tutorial-video-player :video-id="tutorial.video.youtubeId"></tutorial-video-player>
      </v-col>
      <v-col :cols="3">
        <v-list>
          <v-list-item class="justify-center">
            <v-list-item-title>Formation:</v-list-item-title>
            <span>{{ tutorial.training.title }}</span>
          </v-list-item>
          <v-list-item class="justify-center">
            <v-btn small color="primary">Marquer comme vu</v-btn>
          </v-list-item>
          <v-list-item class="justify-center mt-n2">
            <v-btn small color="primary">Regarder plus tard</v-btn>
          </v-list-item>
          <v-list-item class="justify-center mt-n2">
            <v-btn small color="primary">Télécharger les sources</v-btn>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col :cols="10" class="mt-n6">
        <v-card>
          <v-card-title>Description</v-card-title>
          <v-card-text>{{ tutorial.description }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import TutorialVideoPlayer from "../tutorials/tutorialVideoPlayer";

  export default {
    name: 'showTutorial',
    components: {
      TutorialVideoPlayer
    },
    computed: {
      tutorial() {
        return this.$store.getters.getTutorialById(this.$route.params.id);
      },
    },
    mounted() {
      console.log(this.tutorial)
    }
  }
</script>
