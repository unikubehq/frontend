// eslint-disable-next-line import/no-extraneous-dependencies
import { shallowMount } from '@vue/test-utils';
import Projects from '@/views/Projects.vue';
import ProjectList from '@/components/Projects/ProjectList.vue';
import { TProjectNode, TProjectRepositoryStatus, TProjectSpecType } from '@/generated/graphql';

const project: TProjectNode = {
  title: 'Openlane-project',
  kind: 'ProjectNode',
  created: new Date().getTime(),
  accessUsername: '',
  specRepository: '',
  repositoryStatus: TProjectRepositoryStatus.Ok,
  specType: TProjectSpecType.Helm,
  keycloakData: {},
  description: 'This is an awesome project',
  currentCommit: '3b24b97cc930107e2c7b742cbcd38d1e43dce780',
  id: '4bfcc9e3-a709-47a5-96eb-f144106bbe70',
  decks: [],
  members: [
    {
      user:
        {
          kind: 'UserNode',
          id: '1111',
          givenName: 'Prudence',
          familyName: 'Stehr',
          avatarImage: 'http://www.nwrUZidjgbnaWPHdGQgKhgwLvjMWPY.com/',
        },
    },
  ],
};

describe('Projects.vue', () => {

  it('renders correctly', async () => {
    const wrapper = shallowMount(Projects, {
      global: {
        stubs: {
          'project-list': ProjectList,
        },
      },
    });
    expect(wrapper.element).toBeTruthy();
  });

  it('refetches projects', async () => {
    const refetch = jest.fn().mockImplementation(() => Promise.resolve());
    const wrapper = shallowMount(Projects, {
      global: {
        mocks: {
          $apollo: {
            queries: {
              allProjects: {
                refetch,
              },
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
