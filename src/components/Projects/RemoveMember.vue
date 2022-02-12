<template>
  <v-dialog
      v-model="dialog"
      persistent
      width="550"
    >
      <v-card v-if="dialog" class="py-8 px-7">
        <v-card-title class="headline">
          Remove {{ member.user.givenName }} {{ member.user.familyName }} from {{ project.title }}?
        </v-card-title>
        <v-card-text>
          <div>
            Are you sure you want to remove
            {{ member.user.givenName }} {{ member.user.familyName }} from {{ project.title }}
            as a member?<br><br>
          </div>
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
            @click="removeProjectMember"
          >Agree</v-btn>
            </v-col>
          </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { DeleteProjectMemberMutation, TProjectMember, TProjectNode } from '@/generated/graphql';

export default defineComponent({
  data() {
    return {
      dialog: false,
    };
  },
  props: {
    project: {
      type: Object as PropType<TProjectNode>,
      required: true,
    },
    member: {
      type: Object as PropType<TProjectMember>,
      required: true,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    removeProjectMember(): void {
      if (this.member?.user) {
        this.$apollo.mutate({
          mutation: DeleteProjectMemberMutation,
          variables: {
            id: this.project.id,
            user: this.member.user.id,
          },
        }).then(() => {
          this.$emit('removed');
          this.$emit('hide');
        });
      }
    },
  },
  watch: {
    show(newVal) {
      this.dialog = newVal;
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
