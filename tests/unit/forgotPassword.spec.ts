// eslint-disable-next-line import/no-extraneous-dependencies
import { mount, createLocalVue } from '@vue/test-utils';
import forgotPassword from '@/views/ForgotPassword.vue';
import Vuetify from 'vuetify';

describe('ForgotPassword.vue', () => {
  const localVue = createLocalVue();

  let vuetify: Vuetify;
  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('validates the email address correctly', async () => {
    const wrapper = mount(forgotPassword, {
      localVue,
      vuetify,
      mocks: {
        $t: () => '',
      },
    });
    const faultyEmail = 'test';
    const correctEmail = 'test@blueshoe.de';

    wrapper.setData({ username: faultyEmail });
    wrapper.vm.$v.$touch();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$v.username.$error).toBe(true);

    wrapper.setData({ username: correctEmail });
    wrapper.vm.$v.$touch();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$v.username.$error).toBe(false);
  });
});
