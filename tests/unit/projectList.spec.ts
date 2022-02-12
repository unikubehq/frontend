// eslint-disable-next-line import/no-extraneous-dependencies
import { shallowMount } from '@vue/test-utils';
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

describe('Overview.vue', () => {
  it('renders correctly', async () => {
    const wrapper = shallowMount(ProjectList);
    expect(wrapper.get('h3').text()).toContain('No Projects Found');
    wrapper.setProps({ project });
    await wrapper.vm.$nextTick();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('calls Apollo delete mutation on click', async () => {
    const data = {
      data: {
        deleteProject: {
          ok: true,
        },
      },
    };
    const mutate = jest.fn().mockImplementation(() => Promise.resolve(data));
    const wrapper = shallowMount(ProjectList, {
      props: {
        project,
      },
      mocks: {
        $apollo: {
          mutate,
        },
      },
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    wrapper.vm.deleteProject(project.id);
    expect(mutate).toBeCalled();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().deletion).toBeTruthy();
  });

  it('gets correct avatar initials', async () => {
    const wrapper = shallowMount(ProjectList, {
      props: {
        project,
      },
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(wrapper.vm.avatarInitials).toContain('PS');
  });
});
