<template>
  <div>
    <v-app-bar color="amber accent-2 " dark >
      <v-app-bar-nav-icon class="black--text"></v-app-bar-nav-icon>

        <v-toolbar-title>
          <router-link :to="{ name: 'home'}">
            <span class="black--text font-weight-light">ProjectOne</span>
            <span class="black--text text-uppercase">PeakyBinder</span>
          </router-link>
        </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn :to="{ name: 'trainings' }" text color="primary" class="mr-12">
        <v-icon class="mr-2">mdi-school</v-icon>
        <span>Formations</span>
      </v-btn>

      <sign-in v-if="!connected"></sign-in>

      <sign-up v-if="!connected"></sign-up>

      <avatar v-if="connected" :right="true"></avatar>

    </v-app-bar>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import SignIn from "./navbar/SignIn";
  import SignUp from "./navbar/SignUp";
  import Avatar from "./users/Avatar";

  export default {
    name: 'Navbar',
    components: {
      SignIn,
      SignUp,
      Avatar
    },
    computed: {
      ...mapState([
        'connected',
      ])
    }
  }
</script>

<style>
  .v-toolbar__title a {
    text-decoration: none;
  }
</style>
