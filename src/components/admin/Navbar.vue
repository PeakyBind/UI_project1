<template>
  <div>
    <v-app-bar app color="grey lighten-3" dark>

      <v-toolbar-title class="black--text title ">
        Dashboard
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn light fab small class="mx-3" :to="{ name: 'admin' }">
        <v-icon>mdi-view-dashboard</v-icon>
      </v-btn>

      <v-btn light fab small class="mx-3">
        <v-icon>mdi-bell</v-icon>
      </v-btn>

      <v-btn light fab small class="ml-3">
        <v-icon>mdi-account</v-icon>
      </v-btn>

    </v-app-bar>
  </div>
</template>

<script>
  export default {
    name: 'ANavbar',
  }
</script>
