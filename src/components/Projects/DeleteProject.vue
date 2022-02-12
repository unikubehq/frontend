<template>
  <v-dialog
      v-model="dialog"
      persistent
      width="550"
      class="project-delete__modal"
    >
      <v-card v-if="dialog" class="py-8 px-7">
        <v-card-title class="headline">
          {{ $t('projects.deleteModal.title', { title: project.title }) }}
        </v-card-title>
        <v-card-text>
          <div>{{ $t('projects.deleteModal.intro', { title: project.title }) }}<br><br>
          </div>
          <v-alert
            dense
            outlined
            icon="$vuetify.icons.warning"
            type="error">{{ $t('projects.deleteModal.warning') }}</v-alert>
          <v-text-field
            name="projectName"
            filled
            outlined
            type="text"
            v-model="deleteTitle"
            prepend-inner-icon="$vuetify.icons.projectInput"
            persistent-placeholder
            class="project-delete__modal-input"
          />
        </v-card-text>
        <v-card-actions class="py-0">
          <v-container fluid class="py-0">
            <v-row>
          <v-col class="py-0"><v-btn
            large
            color="#a1a9b2"
            outlined
            elevation="0"
            block
            :ripple="false"
            text
            @click="$emit('hide')"
          >{{ $t('general.disagree') }}</v-btn>
            </v-col>
          <v-col class="py-0"><v-btn
            large
            block
            elevation="0"
            :ripple="false"
            color="error"
            class="project-delete__submit"
            @click="deleteAndHide"
            :disabled="deleteTitle !== project.title"
          >{{ $t('projects.deleteModal.agree') }}</v-btn>
            </v-col>
          </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { DeleteProject, TProjectNode } from '@/generated/graphql';

export default defineComponent({
  props: {
    project: {
      type: Object as PropType<TProjectNode>,
      required: true,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      deleteTitle: '',
      dialog: false,
    };
  },
  methods: {
    deleteAndHide():void {
      this.$emit('hide');
      this.deleteProject(this.project.id);
    },
    deleteProject(id: string): void {
      this.$apollo.mutate({
        mutation: DeleteProject,
        variables: {
          id,
        },
      })
        .then((data) => {
          if (data.data.deleteProject.ok) {
            this.$emit('deleted');
            this.$parent?.$emit('deletion');
          }
        })
        .catch((err) => console.log(err));
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
