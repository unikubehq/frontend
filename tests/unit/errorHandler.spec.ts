// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import ErrorHandler from '@/components/ErrorHandler.vue';
import Errors from '@/store/modules/errors';

describe('ErrorHandler.vue', () => {
  let store: Store<any>;
  const errorCode = 100;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        errors: Errors,
      },
    });
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
    store.commit({
      type: 'errors/setError',
      error: null,
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
