import { computed, ref } from 'vue';

export default function setupPagination(limitIn: number, offsetIn: number, totalObjectCount: number) {
  const offset = ref(offsetIn || 0);
  const limit = ref(limitIn || 3);
  const currentPage = ref(1);

  const changeOffset = (page: number): void => {
    offset.value = page > 1 ? (page - 1) * limit.value : 0;
  };

  const listLength = computed((): number => {
    return totalObjectCount
      ? Math.ceil(totalObjectCount / limit.value)
      : 1;
  });

  return {
    offset,
    limit,
    currentPage,
    changeOffset,
    listLength,
  };
}