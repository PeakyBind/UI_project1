<template>
  <v-btn absolute :right="right" icon :to="{ name: 'userProfile', params: { id: user.id }}">
    <v-avatar :size="size" color="red">
      <img v-if="this.user.avatar" :src="this.user.avatar" alt="avatar">
      <span v-else class="white--text headline">CA</span>
    </v-avatar>
  </v-btn>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'Avatar',
    props: {
      size: {
        type: Number,
        default: 45
      },
      right: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapState([
        'user',
      ])
    }
  }
</script>
