import { Ability, AbilityBuilder, SubjectRawRule } from '@casl/ability';
import { Action as UAction, IPermission, UnikubeAbility } from '@/typing';
import { State } from './state';

const getters = {
  // eslint-disable-next-line
  caslRules(state: State): SubjectRawRule<any, any, any>[] {
    const { can, rules } = new AbilityBuilder<UnikubeAbility>(Ability);
    state.rpt.authorization.permissions.forEach((permission: IPermission) => {
      const type = permission.rsname.split(' ')[0];
      const nameMap: {[key: string]: string} = {
        project: 'ProjectNode',
        organization: 'OrganizationNode',
      };
      if (!Object.keys(nameMap).includes(type)) return;
      permission.scopes.forEach((scope) => {
        const verb: UAction = scope.substring(scope.indexOf(':') + 1) as UAction;
        can(verb, nameMap[type], { id: permission.rsid });
      });
    });
    return rules;
  },
};

export default getters;
