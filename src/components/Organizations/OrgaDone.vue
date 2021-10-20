<template>
  <v-col cols="12" sm="8" md="3" class="text-center">
    <div v-if="rptRefreshed">
      <v-icon size="60">$vuetify.icons.done</v-icon>
      <h1>{{ $t('organization.wereDone') }}</h1>
      <p class="text--secondary">{{ $t('organization.tada', orgaTitle) }}</p>orgaTitle
      <router-link to="/overview">{{ $t('organization.goToDashboard') }}</router-link>
    </div>
    <div v-else>
      <div class="text-center">
        <div class="orga-loader"></div>
      </div>
      <h1>{{ $t('organization.finishingUp') }}</h1>
      <p class="text--secondary">{{ $t('organization.pleaseWait') }}</p>
    </div>
  </v-col>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class OrgaDone extends Vue {
  @Prop() readonly orgaId: string | undefined

  @Prop() readonly orgaTitle: string | undefined

  snackbar = false;

  rptRefreshed = false;

  created(): void {
    this.$store.dispatch('auth/refresh', -1).then(() => {
      this.rptRefreshed = true;
    });
  }
}
</script>

<style scoped>
.orga-loader {
  width: 20px;
  height: 20px;
  position: relative;
  animation: loading 1s ease infinite;
  top: 50%;
  margin: 0 auto 0 auto;
  margin-bottom: 80px;
}

@keyframes loading {
  0%, 100% {
    box-shadow: -13px 20px 0 #00DAA4, 13px 20px 0 #61DFC0, 13px 46px 0 #A2E7D6,
    -13px 46px 0 #CAF1E7;
  }
  25% {
    box-shadow: -13px 20px 0 #CAF1E7, 13px 20px 0 #00DAA4, 13px 46px 0 #61DFC0,
    -13px 46px 0 #A2E7D6;
  }
  50% {
    box-shadow: -13px 20px 0 #A2E7D6, 13px 20px 0 #CAF1E7, 13px 46px 0 #00DAA4,
    -13px 46px 0 #61DFC0;
  }
  75% {
    box-shadow: -13px 20px 0 #61DFC0, 13px 20px 0 #A2E7D6, 13px 46px 0 #CAF1E7,
    -13px 46px 0 #00DAA4;
  }
}

</style>
