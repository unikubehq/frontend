// eslint-disable-next-line import/no-extraneous-dependencies
import {
  shallowMount, createLocalVue,
// eslint-disable-next-line import/no-extraneous-dependencies
} from '@vue/test-utils';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Projects from '@/views/Projects.vue';
import ProjectList from '@/components/Projects/ProjectList.vue';

const project = {
  title: 'Openlane-project',
  modified: '2021-01-07T19:28:29.100759+00:00',
  description: 'This is an awesome project',
  currentCommit: '3b24b97cc930107e2c7b742cbcd38d1e43dce780',
  id: '4bfcc9e3-a709-47a5-96eb-f144106bbe70',
  slug: 'openlane-project',
  decks: {
    resultCount: 1,
  },
  members: [
    {
      user:
        {
          firstName: 'Prudence',
          lastName: 'Stehr',
          avatar: 'http://www.nwrUZidjgbnaWPHdGQgKhgwLvjMWPY.com/',
        },
    },
  ],
};

describe('Projects.vue', () => {
  const localVue = createLocalVue();

  let vuetify: Vuetify;
  beforeEach(() => {
    vuetify = new Vuetify();
    localVue.use(VueRouter);
  });

  it('renders correctly', async () => {
    const wrapper = shallowMount(Projects, {
      localVue,
      vuetify,
      stubs: {
        'project-list': ProjectList,
      },
    });
    expect(wrapper.element).toBeTruthy();
  });

  it('refetches projects', async () => {
    const refetch = jest.fn().mockImplementation(() => Promise.resolve());
    const wrapper = shallowMount(Projects, {
      localVue,
      vuetify,
      data() {
        return {
          $apolloData: {
            queries: {
              allProjects: {
                loading: false,
              },
            },
          },
          allProjects: {
            results: [
              project,
            ],
          },
        };
      },
      mocks: {
        $apollo: {
          queries: {
            allProjects: {
              refetch,
            },
          },
        },
      },
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    wrapper.vm.refetchProjects();
    expect(refetch).toBeCalled();
  });
});
