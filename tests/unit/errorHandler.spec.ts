// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from '@vue/test-utils';
import ErrorHandler from '@/components/ErrorHandler.vue';
import useErrorStore from '@/stores/errors';

describe('ErrorHandler.vue', () => {
  const store = useErrorStore();
  const errorCode = 100;

  beforeEach(() => {
    store.$reset();
  });

  it('renders errors correctly', async () => {
    const $t = jest.fn();
    const wrapper = mount(ErrorHandler, {
      store,
      mocks: {
        $t,
      },
    });
    expect(wrapper.html()).not.toContain(errorCode);
    store.setError({
      error: {
        name: 'test',
        message: 'test',
      },
      code: errorCode,
      location: 'Projects.vue',
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toContain(errorCode);

    await wrapper.find('.v-btn').trigger('click');
    // store.commit('errors/clearError');
    // await wrapper.vm.$nextTick();
    expect(wrapper.html()).not.toContain(errorCode);
  });
});
