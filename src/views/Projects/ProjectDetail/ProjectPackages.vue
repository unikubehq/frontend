<template>
  <div>
    <v-row v-if="!packageEdit">
      <v-col cols="6" v-for="pkg in project.packages" :key="pkg.id">
        <v-card outlined>
          <v-card-title>
            <v-row>
              <v-col cols="9">
                {{ pkg.title }}
              </v-col>
              <v-col cols="3" class="text-right">
                <v-btn
                  outlined
                  plain
                  color="#a1a9b2"
                  width="50"
                  @click="setPackageEdit(pkg)"
                >
                  <v-icon size="24">
                    $vuetify.icons.edit
                  </v-icon>
                </v-btn>
              </v-col>
              <v-divider></v-divider>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-divider class="mb-2"></v-divider>
            <v-col cols="12">
              <v-icon>$vuetify.icons.deployments</v-icon>
              {{ $tc('deployment.Deployment', pkg.deployments.length) }}
            </v-col>
            <v-col cols="12" class="d-flex flex-wrap">
              <span
                v-for="deployment in pkg.deployments"
                :key="deployment.id"
                class="deployment-badge mr-3 px-4 py-2"
              >
                {{ deployment.title }}
              </span>
            </v-col>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <edit-package
        v-for="clusterLevel in packageToBeEdited.clusterLevel"
        v-bind:key="clusterLevel.id"
        :package="packageToBeEdited"
        :cluster-level="clusterLevel"
        :sopsProviders="project.sops"
        @change="packageEdit = false"
      ></edit-package>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {
  TPackageNode,
  TProjectNode,
} from '@/generated/graphql';
import EditPackage from '@/components/Projects/EditPackage.vue';

@Component({
  components: {
    EditPackage,
  },
})
export default class ProjectPackages extends Vue {
  @Prop() readonly project!: TProjectNode;

  packageEdit = false;

  packageToBeEdited: TPackageNode | undefined;

  memberDrawer = false;

  setEdit(): void {
    this.$router.push({ query: { edit: 'true' } });
  }

  setPackageEdit(pkg: TPackageNode): void {
    this.packageToBeEdited = pkg;
    this.packageEdit = true;
  }
}
</script>

<style lang="scss" scoped>
.deployment-badge {
  font-weight: 500;
  background-color: #f3f4f9;
  color: #9eaed7;
  white-space: nowrap;
  flex: 0 0 auto;
  margin-bottom: 10px;
}

th:first-child {
  border-top-left-radius: 6px;
}

th:last-child {
  border-top-right-radius: 6px;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  color: white;
}
</style>
