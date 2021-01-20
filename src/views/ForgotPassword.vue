<template>
  <v-main>
    <v-container fluid fill-height class="container--login">
      <v-img src="@/assets/img/Unikube-Logo-Icon.svg" class="logo--bottom"
             height="40%" width="30%" contain position="bottom right"/>
      <v-row justify="center">
        <v-col cols="10" class="text-center">
          <v-img class="d-inline-block" src="@/assets/img/Unikube-Logo-H.svg"
                 max-width="150"/>
        </v-col>
        <v-col cols="12" sm="8" md="3">
          <h1 class="text-h1">Forgot Password</h1>
          <p class="text--secondary">
            Enter your email address and we will send a link to reset your password.
          </p>
          <v-form>
            <v-text-field
                label="Email Address"
                name="login"
                filled
                outlined
                type="text"
                placeholder="Enter Email Address"
                v-model="username"
                @keyup.enter="login"
                :error-messages="usernameErrors"
                prepend-inner-icon="$vuetify.icons.email"
                @blur="$v.username.$touch()"
            />
                <v-dialog
                  v-model="dialog"
                  persistent
                  max-width="735"
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      v-bind="attrs"
                      v-on="on"
                      large
                      block
                      :disabled="$v.username.$invalid"
                    >
                      Send
                    </v-btn>
                  </template>
                  <v-card>
                    <h2 class="modal-card__headline">
                      We've emailed you the reset link on {{ username }}
                    </h2>
                    <p class="modal-card__paragraph">
                      If you don't receive it in a few minutes, check your spam/junk folder, or <br>
                      <router-link to="/login">contact customer support</router-link>.
                    </p>
                    <v-divider class="modal-card__divider"/>
                    <v-spacer/>
                    <v-card-actions class="modal-card__actions">
                        <v-btn
                          class="modal-card__button"
                          color="primary"
                          dark
                          @click="dialog = false"
                          width="214"
                          height="48"
                        >
                          Close
                        </v-btn>
                    </v-card-actions>

                  </v-card>
                </v-dialog>
            <div class="error" v-if="errors && errors.detail">
              {{ errors.detail }}
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { email, required } from 'vuelidate/lib/validators';
import { TranslateResult } from 'vue-i18n';

@Component({
  validations: {
    username: {
      required,
      email,
    },
  },
})
export default class Home extends Vue {
  username = '';

  dialog = false;

  errors = [];

  login(): void {
    console.log(this);
  }

  get usernameErrors(): TranslateResult[] {
    const errors = [];
    if (!this.$v.username.required) {
      errors.push(this.$t('requiredError'));
    }
    if (!this.$v.username.email) {
      errors.push(this.$t('emailError'));
    }
    return this.$v.username.$dirty ? errors : [];
  }
}
</script>

<style scoped>
.logo--bottom {
  position: absolute;
  bottom: -13%;
  right: -60px;
  opacity: 0.1;
}

.container--login {
  position: relative;
  overflow: hidden;
}
</style>
