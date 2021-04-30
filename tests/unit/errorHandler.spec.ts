// eslint-disable-next-line import/no-extraneous-dependencies
import { createLocalVue, mount } from '@vue/test-utils';
import ErrorHandler from '@/components/ErrorHandler.vue';
import Vuetify from 'vuetify';
import Vuex, { Store } from 'vuex';
import Errors from '@/store/modules/errors';

describe('ErrorHandler.vue', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  let store: Store<any>;
  let vuetify: Vuetify;
  const errorCode = 100;

  beforeEach(() => {
    vuetify = new Vuetify();
    store = new Vuex.Store({
      modules: {
        errors: Errors,
      },
    });
  });

  it('renders errors correctly', async () => {
    const $t = jest.fn();
    const wrapper = mount(ErrorHandler, {
      localVue,
      vuetify,
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
