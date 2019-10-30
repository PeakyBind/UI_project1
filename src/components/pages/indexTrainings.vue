<template>
  <v-container>
    <v-row
      justify="center"
      class="grey lighten-5"
    >

      <v-col v-for="training in trainings" :cols="11" class="mt-n2">
        <v-card>
          <v-card-title>
            {{ training.title }}
            <v-spacer></v-spacer>
            <v-btn  color="primary" @click="followTraining(training)">Suivre</v-btn>
          </v-card-title>
          <v-card-text>
              <v-carousel
                height="275"
                show-arrows-on-hover
              >
                <v-carousel-item v-for="tutorials in tutorialsChunked[training.id]">
                  <v-row>
                    <v-col v-for="tutorial in tutorials" :cols="3">
                      <v-card :to="{ name:'showTutorial', params: { id: tutorial.id } }">
                        <v-img :src="tutorial.thumbnails.medium.url"></v-img>
                        <v-card-title class="caption">{{ tutorial.title }}</v-card-title>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-carousel-item>
              </v-carousel>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'indexTrainings',
    data() {
      return {
        tutorialsChunked: {}
      }
    },
    computed: {
      ...mapState([
        'trainings',
        'tutorials',
        'user'
      ])
    },
    methods: {
      ...mapActions([
        'getTrainings',
        'getTutorials',
        'updateUserTrainings'
      ]),
      chunkTutorials() {
        for (let training of this.trainings) {
          const tutorialsFiltered = this.tutorials.filter(item => { return item.training.id === training.id });

          const chunk = 4;
          const tutorialsChunked = [];
          for (let i = 0; i < tutorialsFiltered.length; i+= chunk) {
            tutorialsChunked.push(tutorialsFiltered.slice(i, i+ chunk));

          }
          this.tutorialsChunked[training.id] = tutorialsChunked;
        }
      },
      async followTraining(training) {
        await this.updateUserTrainings({ user: this.user, training: training });
      }
    },
    mounted() {
      this.getTrainings();
      this.getTutorials();
      this.chunkTutorials();
    }
  }
</script>
