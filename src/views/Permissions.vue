<template>
<div>
  <member-list></member-list>
</div>
</template>

<script>
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import MemberList from '@/components/permissions/MemberList.vue';

@Component({
  components: {
    MemberList,
  },
})
export default class Permissions extends Vue {

}
</script>

<style scoped>

</style>
