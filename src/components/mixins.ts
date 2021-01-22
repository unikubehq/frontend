/* eslint-disable max-classes-per-file */
import { Component, Vue } from 'vue-property-decorator';

@Component
// eslint-disable-next-line import/prefer-default-export
export class paginationMixin extends Vue {
  offset = 0;

  limit = 3;

  currentPage = 1;

  changeOffset(page: number): void {
    this.offset = page > 1 ? (page - 1) * this.limit : 0;
  }

  get listLength(): number {
    return this.$data.allProjects?.totalCount
      ? Math.ceil(this.$data.allProjects?.totalCount / this.limit)
      : 1;
  }
}
