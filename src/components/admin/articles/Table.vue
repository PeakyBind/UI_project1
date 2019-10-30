<template>
  <v-card class="ma-4">
    <v-data-table
      :headers="headers"
      :items="articles"
      :items-per-page="10"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Articles</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-dialog v-model="dialogDetails" max-width="500px">
            <v-card>
              <v-card-title>Prévisualisation</v-card-title>
              <v-card-text>
              </v-card-text>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogForm" max-width="1400px" @click:outside="closeForm">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">Ajouter</v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text class="ma-3">
                <v-text-field v-model="editedItem.title" label="Titre"></v-text-field>
                <article-editor ref="articleEditor" :data="editedItem.content"></article-editor>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeForm">Annuler</v-btn>
                <v-btn color="blue darken-1" text @click="sendForm(editedItem)">Enregistrer</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-text class="pt-4 subtitle-1">
                Etes-vous sur de vouloir supprimer cet article ?
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
  import ArticleEditor from './editor';

  export default {
    name: 'ArticlesTable',
    components: {
      ArticleEditor
    },
    data() {
      return {
        headers: [
          {
            text: 'Titre',
            value: 'title'
          },
          {
            text: 'Tutoriel',
            value: 'tutorial.title'
          },
          {
            text: 'Actions',
            value: 'action'
          },
        ],
        dialogAdd: false,
        created: false,
        dialogDetails: false,
        dialogForm: false,
        dialogDelete: false,
        editedIndex: -1,
        editedItem: {},
        itemToDelete: Object,
        itemToDetail: Object,
        defaultItem: {
          id: '',
          title: '',
          content: '',
          tutoriel: {
            id: '',
            title: ''
          },
        },
      }
    },
    methods: {
      ...mapActions([
        'addArticle',
        'editArticle',
        'deleteArticle',
      ]),
      async sendForm(item) {
        item.content = this.$refs.articleEditor.editorData;
        if (this.editedIndex === -1) {
          await this.addArticle(item);
        }

        this.dialogForm = false;
        this.editedIndex = -1;
        this.editedIndex = Object.assign({}, this.defaultItem);
      },
      showDetails(item) {
        this.itemToDetail = Object.assign({}, item);
        this.dialogDetails = true;
      },
      showEditPanel(item) {
        this.editedIndex = this.articles.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogForm = true;
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
      closeForm() {
        this.dialogForm = false;
        this.editedIndex = -1;
        this.editedItem = Object.assign({}, this.defaultItem);
      }
    },
    computed: {
      ...mapState([
        'tutorials',
        "articles"
      ]),
      formTitle () {
        return this.editedIndex === -1 ? 'Ajouter un article' : 'Editer l\'article ';
      }
    },
    created() {
      this.editedItem = Object.assign({}, this.defaultItem);
    },
  }
</script>
