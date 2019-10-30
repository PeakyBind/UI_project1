<template>
  <v-card class="ma-4">
    <v-data-table
      :headers="headers"
      :items="trainings"
      :items-per-page="10"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Formations</v-toolbar-title>

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

          <v-dialog v-model="dialogImport" max-width="500px" @click:outside="closeImportPanel">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="ml-3 mb-2" v-on="on">Importer playlist</v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="headline">Importer une playlist YouTube</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row v-if="!imported">
                    <v-col cols="12" sm="12">
                      <v-text-field v-model="youtubePlaylist.url" label="Url YouTube"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row v-if="imported">
                    <v-col cols="12" sm="12">
                      <v-text-field v-model="itemToAdd.title" label="Titre"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeImportPanel">Annuler</v-btn>
                <v-btn color="blue darken-1" text @click="importYoutubePlaylist">Suivant</v-btn>
                <v-btn color="blue darken-1" text v-if="imported" @click="addItemImported(itemToAdd)">Enregistrer</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog
            v-model="dialogDelete"
            max-width="500px"
          >
            <v-card>
              <v-card-text class="pt-4 subtitle-1">
                Etes-vous sur de vouloir supprimer cette formation ?
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
  import APIService from "../../../APIService";
  import { mapState, mapActions } from 'vuex';

  const apiService = new APIService();

  export default {
    name: 'TrainingsTable',
    data() {
      return {
        headers: [
          {
            text: 'Titre',
            value: 'title'
          },
          {
            text: 'Actions',
            value: 'action'
          }
        ],
        imported: false,
        dialogForm: false,
        dialogImport: false,
        dialogDelete: false,
        editedIndex: -1,
        editedItem: {},
        itemToAdd: {},
        itemToDelete: {},
        defaultItem: {
          title: ''
        },
        youtubePlaylist: {
          url: '',
          data: []
        }
      }
    },
    methods: {
      ...mapActions([
        'addTraining',
        'addTrainingImported',
        'editTraining',
        'deleteTraining'
      ]),
      showEditPanel(item) {
        this.editedIndex = this.trainings.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogForm = true;
      },
      showDeletePanel(item) {
        this.itemToDelete = item;
        this.dialogDelete = true;
      },
      confirmDelete(id) {
        this.deleteTraining(id);
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
      closeImportPanel() {
        this.dialogImport = false;
      },
      async importYoutubePlaylist() {
        const response = await apiService.importYoutubePlaylist(this.youtubePlaylist);
        this.youtubePlaylist.data = response.data;
        this.imported = true;
      },
      async addItemImported(item) {
        await this.addTrainingImported({ training: item, tutorials: this.youtubePlaylist.data });
        this.imported = false;
        this.dialogImport = false;
        this.youtubePlaylist = Object.assign({}, {
          url: '',
          data: []
        });
      },
      async sendForm(item) {
        if (this.editedIndex === -1) {
          await this.addTraining(item);
        } else {
          await this.editTraining({
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
        'trainings'
      ]),
      formTitle () {
        return this.editedIndex === -1 ? 'Ajouter une formation' : 'Editer la formation';
      },
    },
    created() {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.itemToAdd = Object.assign({}, this.defaultItem);
    }
  }
</script>
