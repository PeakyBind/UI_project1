<template>
  <v-menu
    offset-y
    bottom left
    :close-on-content-click="false"
  >

    <template v-slot:activator="{ on }">
      <v-btn small outlined color="#37323E" class="mx-3" v-on="on">
        <span>Se connecter</span>
        <v-icon right>mdi-login</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          class="ma-3"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            required
          >
          </v-text-field>

          <v-text-field
            type="password"
            v-model="password"
            :rules="passwordRules"
            label="Mot de passe"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="#37323E"
            @click="validate"
            outlined
          >Valider</v-btn>
        </v-form>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item>
        <v-btn small class="blue darken-1 white--text" @click="oauthGoogle">
          <span>Se connecter avec Google</span>
          <v-icon right>mdi-google</v-icon>
        </v-btn>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'SignIn',
    data() {
      return {
        data: {},
        valid: true,
        email: '',
        emailRules: [
          v => !!v || 'L\'adresse e-mail est requise',
          v => /.+@.+\..+/.test(v) || 'L\'adresse e-mail doit être valide'
        ],
        password: '',
        passwordRules: [
          v => !!v || 'Le mot de passe est requis'
        ]
      }
    },
    methods: {
      ...mapActions([
        'signIn'
      ]),
      async validate () {
        if (this.$refs.form.validate()) {
          this.data = {
            email: this.email,
            password: this.password
          };
          this.signIn(this.data);
        }
      },
      oauthGoogle () {
        apiService.oauthGoogle();
      }
    }
  }
</script>
