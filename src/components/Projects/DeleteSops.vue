<template>
  <v-dialog
      v-model="show"
      persistent
      width="550"
    >
      <v-card v-if="show" class="py-8 px-7">
        <v-card-title class="headline">
          {{ $t('projects.deleteSopsModal.title', { title: sops.title }) }}
        </v-card-title>
        <v-card-text>
          <div>{{ $t('projects.deleteSopsModal.intro', { title: sops.title }) }}<br><br>
          </div>
          <v-alert
            dense
            outlined
            icon="$vuetify.icons.warning"
            type="error">{{ $t('projects.deleteSopsModal.warning') }}</v-alert>
          <v-text-field
            name="sopsName"
            filled
            outlined
            type="text"
            v-model="deleteTitle"
            prepend-inner-icon="$vuetify.icons.accessToken"
              persistent-placeholder
          />
        </v-card-text>
        <v-card-actions class="py-0">
          <v-container fluid class="py-0">
            <v-row>
          <v-col class="py-0"><v-btn
            large
            block
            :ripple="false"
            text
            @click="$emit('hide')"
          >{{ $t('general.disagree') }}</v-btn>
            </v-col>
          <v-col class="py-0"><v-btn
            large
            block
            :ripple="false"
            color="error"
            @click="deleteAndHide"
            :disabled="deleteTitle !== sops.title"
          >{{ $t('projects.deleteSopsModal.agree') }}</v-btn>
            </v-col>
          </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { DeleteSops, TSopsProviderNode } from '@/generated/graphql';

@Component({})
export default class SopsDeleteDialog extends Vue {
  @Prop() readonly sops!: TSopsProviderNode

  @Prop() readonly show: boolean | undefined

  deleteTitle = ''

  deleteAndHide():void {
    this.$emit('hide');
    this.deleteSops(this.sops.id);
  }

  deleteSops(id: string): void {
    this.$apollo.mutate({
      mutation: DeleteSops,
      variables: {
        input: id,
      },
    })
      .then((data) => {
        if (data.data.deleteSops.ok) {
          this.$emit('deleted');
        }
      })
      .catch((err) => console.log(err));
  }
}
</script>

<style lang="scss" scoped>
.project-card{
  &__wrapper {
    box-shadow: 0 2px 40px 0 rgba(183, 183, 183, 0.15);
  }
  &__detail {
    transform: rotate(-90deg);
  }
}
hr {
  height: 42px;
  align-self: center;
}
</style>
