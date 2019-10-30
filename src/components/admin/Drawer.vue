<template>
  <v-navigation-drawer app permanent color="grey darken-2">

    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="white--text text-center">
          <span class="font-weight-light">ProjectOne</span>
          <span class="text-uppercase">PeakyBinder</span>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider class="white"></v-divider>

    <v-list>

      <v-list-item :to="{ name: 'adminUsers' }">
          <v-list-item-icon>
            <v-icon class="white--text">mdi-account-group</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="white--text">Utilisateurs</v-list-item-title>
      </v-list-item>

      <v-list-item :to="{ name: 'adminCategories' }">
        <v-list-item-icon>
          <v-icon class="white--text">mdi-folder-open</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="white--text">Catégories</v-list-item-title>
      </v-list-item>

      <v-list-item :to="{ name: 'adminTrainings' }">
        <v-list-item-icon>
          <v-icon class="white--text">mdi-school</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="white--text">Formations</v-list-item-title>
      </v-list-item>

      <v-list-item :to="{ name: 'adminTutorials' }">
        <v-list-item-icon>
          <v-icon class="white--text">mdi-youtube</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="white--text">Tutoriels</v-list-item-title>
      </v-list-item>

      <v-list-item :to="{ name: 'adminArticles' }">
        <v-list-item-icon>
          <v-icon class="white--text">mdi-file-document-edit</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="white--text">Articles</v-list-item-title>
      </v-list-item>

    </v-list>

  </v-navigation-drawer>

</template>

<script>
  export default {
    name: 'ADrawer',
  }
</script>
