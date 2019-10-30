<template>
    <v-container>
      <v-row
        justify="center"
        class="grey lighten-5"
      >
        <v-col :cols="12">
          <v-card>
            <v-card-title class="text-uppercase">Mon compte</v-card-title>
          </v-card>
        </v-col>

        <v-col :cols="11" class="mt-n2">
          <v-card >
            <v-card-title>
              Mes informations
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-row>
                    <v-col :cols="4">
                      <v-list-item-title>Prénom:</v-list-item-title>
                    </v-col>
                    <v-col :cols="4">
                      <v-list-item-subtitle>{{ user.firstName }}</v-list-item-subtitle>
                    </v-col>
                    <v-col :cols="3" class="d-flex justify-center">
                      <avatar :size="80"></avatar>
                    </v-col>
                  </v-row>
                </v-list-item>

                <v-list-item>
                  <v-row>
                    <v-col :cols="4">
                      <v-list-item-title>Nom:</v-list-item-title>
                    </v-col>
                    <v-col :cols="4">
                      <v-list-item-subtitle>{{ user.lastName }}</v-list-item-subtitle>
                    </v-col>
                    <v-col :cols="3" class="d-flex justify-center">
                      <v-btn absolute outlined small color="primary" class="mt-6" @click="triggerUploadPanel">Ajouter une image</v-btn>
                      <input type="file" name="avatar" style="visibility: hidden;" accept="image/*" ref="avatarInput" @change="uploadImage($event)"/>
                    </v-col>
                  </v-row>
                </v-list-item>

                <v-list-item>
                  <v-row>
                    <v-col :cols="4">
                      <v-list-item-title>Adresse email:</v-list-item-title>
                    </v-col>
                    <v-col :cols="4">
                      <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
                    </v-col>
                  </v-row>
                </v-list-item>
                <v-list-item>
                  <v-btn color="primary" outlined v-if="!password.formActive" @click="togglePasswordForm">Modifier mon mot de passe</v-btn>
                  <v-col :cols="4" v-if="password.formActive" >
                    <v-text-field type="password" v-model="password.value" :rules="[rules.required, rules.min]" label="Mot de passe"></v-text-field>
                  </v-col>
                  <v-col :cols="4" v-if="password.formActive">
                    <v-text-field type="password" v-model="password.confirm" :rules="[rules.confirm]" label="Confirmation"></v-text-field>
                  </v-col>
                  <v-col :cols="4" v-if="password.formActive">
                    <v-btn color="primary" @click="changePassword">Enregistrer</v-btn>
                    <v-btn color="error" class="ml-2" @click="togglePasswordForm">Annuler</v-btn>
                  </v-col>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col :cols="11" class="mt-n2">
          <v-card>
            <v-card-title>Mes formations</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import Avatar from "../users/Avatar";

  export default {
    name: 'UserProfile',
    data() {
      return {
        password: {
          formActive: false,
          value: '',
          confirm: ''
        },
        rules: {
          required: value => !!value || 'Le mot de passe est requis',
          min: value => value.length >= 6 || 'Minimum 6 caractères',
          confirm: value => value === this.password.value || 'La confirmation n\'est pas identique'
        }
      }
    },
    components: {
      Avatar
    },
    computed: {
      ...mapState([
        'user'
      ])
    },
    methods: {
      ...mapActions([
        'getUser',
        'updatePassword',
        'uploadAvatar'
      ]),
      togglePasswordForm() {
        this.password.formActive = !this.password.formActive;
      },
      async changePassword() {
        if (this.validatePassword()) {
          await this.updatePassword({
            id: this.user.id,
            password: this.password.value
          });
          this.password.formActive = false
        }
      },
      validatePassword() {
        for (let rule in this.rules) {
          if (!rule) {
            return false;
          }
        }
        return true;
      },
      triggerUploadPanel() {
        this.$refs.avatarInput.click();
      },
      async uploadImage(event) {
        const formData = new FormData();
        const avatar = event.target.files[0];
        formData.append('id', this.user.id);
        formData.append('avatar', avatar);
        await this.uploadAvatar(formData);
      }
    },
    mounted() {
      this.getUser(this.$route.params.id);
    }
  }
</script>
