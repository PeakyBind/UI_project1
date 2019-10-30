<template>
  <v-dialog
    width="500"
  >
    <template v-slot:activator="{ on }">
      <v-btn small depressed color="#37323E" v-on="on">
        <span>S'inscrire</span>
        <v-icon right>mdi-account-plus</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title
      >
        Inscription
      </v-card-title>

      <v-card-text>
        <v-form
          ref="form"
          class="ma-3"
        >
          <v-text-field
            v-model="email"
            :rules="[emailRules.required, emailRules.valid]"
            label="Email"
            required
          >
          </v-text-field>

          <v-text-field
            v-model="firstName"
            :rules="[firstNameRules.required]"
            label="Prénom"
            required
          >
          </v-text-field>

          <v-text-field
            v-model="lastName"
            :rules="[lastNameRules.required]"
            label="Nom"
            required
          >
          </v-text-field>

          <v-text-field
            type="password"
            v-model="password"
            :rules="[passwordRules.required]"
            label="Mot de passe"
            required
          ></v-text-field>

          <v-text-field
            type="password"
            v-model="passwordConfirm"
            :rules="[passwordConfirmedRules.required, passwordConfirmedRules.confirm]"
            label="Confirmation du mot de passe"
            required
          >
          </v-text-field>

          <v-btn
            color="#37323E"
            @click="validate"
            outlined
          >Valider</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'SignUp',
    data() {
      return {
        data: {},
        email: '',
        emailRules: {
          required: v => !!v || 'L\'adresse e-mail est requise',
          valid: v => /.+@.+\..+/.test(v) || 'L\'adresse e-mail doit être valide'
        },
        firstName: '',
        firstNameRules: {
          required: v => !!v || 'Le prénom est requis'
        },
        lastName: '',
        lastNameRules: {
          required:  v => !!v || 'Le nom est requis'
        },
        password: '',
        passwordRules: {
          required: v => !!v || 'Le mot de passe est requis'
        },
        passwordConfirm: '',
        passwordConfirmedRules: {
          required: v => !!v || 'La confirmation est requise',
          confirm: v => v === this.password || 'La confirmation n\'est pas identique'
        }
      }
    },
    methods: {
      ...mapActions([
        'signUp'
      ]),
      async validate () {
        const rulesGrouped = {
          email: this.emailRules,
          firstName: this.firstNameRules,
          lastName: this.lastNameRules,
          password: this.passwordRules,
          passwordConfirm: this.passwordConfirmedRules
        };
        for (let rules in rulesGrouped) {
          for (let rule of rules) {
            if (!rule) {
              return false;
            }
          }
        }
        await this.signUp({
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          password: this.password
        })
      }
    }
  }
</script>
