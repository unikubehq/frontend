<template>
<div>
  <member-list></member-list>
</div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import MemberList from '@/components/Permissions/MemberList.vue';

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
