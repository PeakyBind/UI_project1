<template>
  <v-card class="ma-4">
    <v-card-title>
      Utilisateurs
      <div class="flex-grow-1"></div>
      <v-text-field
        v-model="search"
        append-icon="mdi-search"
        label="Rechercher"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="users"
      :search="search"
      :items-per-page="10"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <v-card>
            <v-card-text class="pt-4 subtitle-1">
              Etes-vous sur de vouloir supprimer cet utilisateur ?
            </v-card-text>
            <v-card-actions class="pb-4 pr-3">
              <div class="flex-grow-1"></div>
              <v-btn class="red darken-1 white--text" @click="confirmDelete(itemToDelete.id)">Confirmer</v-btn>
              <v-btn class="blue darken-1 white--text" @click="cancelDelete">Annuler</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>

      <template v-slot:item.action="{ item }">
        <v-icon
          small
          @click="showDeletePanel(item)"
        >mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-card>

</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'UsersTable',
    data() {
      return {
        headers: [],
        search: '',
        dialog: Boolean,
        itemToDelete: {}
      }
    },
    methods: {
      ...mapActions([
        'deleteUser'
      ]),
      showDeletePanel(item) {
        this.itemToDelete = item;
        this.dialog = true;
      },
      confirmDelete(id) {
        this.deleteUser(id);
        this.dialog = false;
      },
      cancelDelete() {
        this.dialog = false;
      }
    },
    computed: mapState([
      'users'
    ]),
    mounted() {
      this.headers = [
        {
          text: 'Adresse E-mail',
          value: 'email',
        },
        {
          text: 'Méthode',
          value: 'method'
        },
        {
          text: 'Date d\'inscription',
          value: 'createdAt'
        },
        {
          text: 'Actions',
          value: 'action'
        }
      ];
      this.dialog = false;
    }
  }
</script>

