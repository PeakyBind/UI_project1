<template>
  <v-card class="ma-4">
    <v-data-table
      :headers="headers"
      :items="categories"
      :items-per-page="10"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Catégories</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-dialog v-model="dialogForm" max-width="500px" @click:outside="closeForm">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">Ajouter</v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-text-field v-model="editedItem.title" label="Titre"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeForm">Annuler</v-btn>
                <v-btn color="blue darken-1" text @click="sendForm(editedItem)">Enregistrer</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog
            v-model="dialogDelete"
            max-width="500px"
          >
            <v-card>
              <v-card-text class="pt-4 subtitle-1">
                Etes-vous sur de vouloir supprimer cette catégorie ?
              </v-card-text>
              <v-card-actions class="pb-4 pr-3">
                <div class="flex-grow-1"></div>
                <v-btn class="red darken-1 white--text" @click="confirmDelete(itemToDelete.id)">Confirmer</v-btn>
                <v-btn class="blue darken-1 white--text" @click="cancelDelete">Annuler</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.action="{ item }">
        <v-icon
          small
          @click="showEditPanel(item)"
        >mdi-pencil</v-icon>
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
    name: 'CategoriesTable',
    data() {
      return {
        headers: [],
        dialogForm: Boolean,
        dialogDelete: Boolean,
        editedIndex: Number,
        editedItem: {},
        itemToDelete: {},
        defaultItem: {
          title: ''
        }
      }
    },
    methods: {
      ...mapActions([
        'addCategorie',
        'editCategorie',
        'deleteCategorie'
      ]),
      showEditPanel(item) {
        this.editedIndex = this.categories.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogForm = true;
      },
      showDeletePanel(item) {
        this.itemToDelete = item;
        this.dialogDelete = true;
      },
      confirmDelete(id) {
        this.deleteCategorie(id);
        this.dialogDelete = false;
      },
      cancelDelete() {
        this.dialogDelete = false;
      },
      closeForm() {
        this.dialogForm = false;
        this.editedIndex = -1;
        this.editedItem = Object.assign({}, this.defaultItem);
      },
      async sendForm(item) {
        if (this.editedIndex === -1) {
          await this.addCategorie(item);
        } else {
          await this.editCategorie({
            id: item.id,
            item: item
          });
        }

        this.dialogForm = false;
        this.editedIndex = -1;
        this.editedItem = Object.assign({}, this.defaultItem);
      }
    },
    computed: {
      ...mapState([
        'categories'
      ]),
      formTitle () {
        return this.editedIndex === -1 ? 'Ajouter une catégorie' : 'Editer la catégorie';
      },
    },
    mounted() {
      this.headers = [
        {
          text: 'Titre',
          value: 'title'
        },
        {
          text: 'Actions',
          value: 'action'
        }
      ];
      this.dialogForm = false;
      this.dialogDelete = false;
      this.editedIndex = -1;
      this.editedItem = this.defaultItem;
    }
  }
</script>
