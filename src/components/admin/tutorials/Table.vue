<template>
  <v-card class="ma-4">
    <v-data-table
      :headers="headers"
      :items="tutorials"
      :items-per-page="10"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Tutoriels</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-dialog
            v-model="dialogDetails" max-width="500px"
          >
            <v-card>
              <v-card-title>Détails du tutoriel</v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item>
                    <v-list-item-content>Titre: {{ itemToDetail.title }}</v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Sous-titre: {{ itemToDetail.headline }}</v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Formation: {{ itemToDetail.training.title }}</v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Description: {{ itemToDetail.description }}</v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Video</v-list-item-title>
                      <v-list dense>
                        <v-list-item>
                          <v-list-item-content>Id YouTube: {{ itemToDetail.video.youtubeId }}</v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-content>Date de publication: {{ itemToDetail.video.publishedAt }}</v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-content>Durée: {{ itemToDetail.video.duration }}min</v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogAdd" max-width="500px" @click:outside="closeAddPanel">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">Ajouter</v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="headline">Ajouter un tutoriel</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row v-if="!imported">
                    <v-col cols="12" sm="12">
                      <v-text-field v-model="youtubeVideo.url" label="URL YouTube"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row v-if="imported">
                    <v-col cols="12" sm="12">
                      <v-text-field v-model="itemToAdd.title" label="Titre"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <v-text-field v-model="itemToAdd.headline" label="Sous-titre"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <v-select v-model="itemToAdd.training.title" :items="trainings.map(x => x.title)" label="Associer à une formation"></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeAddPanel">Annuler</v-btn>
                <v-btn color="blue darken-1" text v-if="!imported" @click="importYoutubeVideo(youtubeVideo)">Suivant</v-btn>
                <v-btn color="blue darken-1" text v-if="imported" @click="addItem(itemToAdd)">Enregistrer</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogEdit" max-width="700px" @click:outside="closeEditPanel">
            <v-card>
              <v-card-title>
                <span class="headline">Editer le tutoriel</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-text-field v-model="itemToEdit.title" label="Titre"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <v-text-field v-model="itemToEdit.headline" label="Sous-titre"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <v-select v-model="itemToEdit.training.title" :items="trainings.map(x => x.title)" label="Associer à une formation"></v-select>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <v-text-field v-model="itemToEdit.description" label="Description"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeEditPanel">Annuler</v-btn>
                <v-btn color="blue darken-1" text @click="editItem(itemToEdit)">Enregistrer</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog
            v-model="dialogDelete"
            max-width="500px"
          >
            <v-card>
              <v-card-text class="pt-4 subtitle-1">
                Etes-vous sur de vouloir supprimer ce tutoriel ?
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
          @click="showDetails(item)"
        >mdi-details</v-icon>
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
  import APIService from "../../../APIService";
  const apiService = new APIService();

  export default {
    name: 'TutorialsTable',
    data() {
      return {
        headers: [
          {
            text: 'Titre',
            value: 'title'
          },
          {
            text: 'Sous-Titre',
            value: 'headline'
          },
          {
            text: 'Formation',
            value: 'training.title'
          },
          {
            text: 'Actions',
            value: 'action'
          },
        ],
        dialogAdd: false,
        imported: false,
        dialogDetails: false,
        dialogEdit: false,
        dialogDelete: false,
        itemToAdd: Object,
        itemToDetail: Object,
        itemToEdit: Object,
        itemToDelete: Object,
        defaultItem: {
          id: '',
          title: '',
          headline: '',
          description: '',
          training: {
            id: '',
            title: ''
          },
          video: {
            youtubeId: '',
            playerHtml: '',
            publishedAt: '',
            duration: '',
          },
        },
        youtubeVideo: {
          url: ''
        },
      }
    },
    methods: {
      ...mapActions([
        'addTutorial',
        'editTutorial',
        'deleteTutorial',
      ]),
      async importYoutubeVideo(video) {
        const importedVideo = await apiService.importYoutubeVideo(video);
        this.itemToAdd = Object.assign({}, importedVideo.data);
        this.imported = true;
      },
      async addItem(item) {
        const training = this.trainings.find((el) => {
          return el.title === item.training.title;
        });
        item.training.id = training.id;
        await this.addTutorial(item);
        this.dialogAdd = false;
        this.imported = false;
        this.youtubeVideo = Object.assign({}, { url: ''});
        this.itemToAdd = Object.assign({}, this.defaultItem);
      },
      async editItem(item) {
        const training = this.trainings.find((el) => {
          return el.title === item.training.title;
        });
        item.training.id = training.id;
        await this.editTutorial(item);
        this.dialogEdit = false;
        this.itemToAdd = Object.assign({}, this.defaultItem);
      },
      showDetails(item) {
        this.itemToDetail = Object.assign({}, item);
        this.dialogDetails = true;
      },
      showEditPanel(item) {
        this.itemToEdit = Object.assign({}, item);
        this.dialogEdit = true;
      },
      showDeletePanel(item) {
        this.itemToDelete = item;
        this.dialogDelete = true;
      },
      confirmDelete(id) {
        this.deleteTutorial(id);
        this.dialogDelete = false;
      },
      cancelDelete() {
        this.dialogDelete = false;
      },
      closeAddPanel() {
        this.dialogAdd = false;
        this.imported = false;
        this.itemToAdd = Object.assign({}, this.defaultItem);
      },
      closeEditPanel() {
        this.dialogEdit = false;
        this.itemToEdit = Object.assign({}, this.defaultItem);
      }
    },
    computed: {
      ...mapState([
        'tutorials',
        "trainings"
      ]),
    },
    created() {
      this.itemToDetail = Object.assign({}, this.defaultItem);
      this.itemToEdit = Object.assign({}, this.defaultItem);
    },
  }
</script>
