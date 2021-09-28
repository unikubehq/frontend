import { TOrganizationMember, TProjectMember, TProjectRepositoryStatus } from '@/generated/graphql';
import { Avatar } from '@/typing';
import i18n from '@/i18n';
import VueI18n from 'vue-i18n';
import TranslateResult = VueI18n.TranslateResult;

export default class Converter {
  static memberToAvatar(member: TProjectMember | TOrganizationMember): Avatar {
    return {
      key: member?.user?.id || '',
      image: member?.user?.avatarImage || '',
      initials: `${member?.user?.givenName?.[0]}${member?.user?.familyName?.[0]}`,
      name: `${member?.user?.givenName} ${member?.user?.familyName}` || '',
      email: `${member?.user?.email}` || '',
      role: `${member?.role}` || '',
    };
  }

  static getReadableProjectStatus(status: TProjectRepositoryStatus): TranslateResult {
    let result: TranslateResult;
    switch (status) {
      case TProjectRepositoryStatus.AuthFailed: result = i18n.t('projects.status.authFail'); break;
      case TProjectRepositoryStatus.Cloning: result = i18n.t('projects.status.cloning'); break;
      case TProjectRepositoryStatus.CloningPending: result = i18n.t('projects.status.clonePending'); break;
      case TProjectRepositoryStatus.BranchUnavailable: result = i18n.t('projects.status.branchNotFound'); break;
      case TProjectRepositoryStatus.CloningFailed: result = i18n.t('projects.status.cloneFail'); break;
      case TProjectRepositoryStatus.CloningSuccessful: result = i18n.t('projects.status.cloneSuccess'); break;
      case TProjectRepositoryStatus.ParsingFailed: result = i18n.t('projects.status.parseFail'); break;
      case TProjectRepositoryStatus.Unknown: result = i18n.t('projects.status.unknown'); break;
      case TProjectRepositoryStatus.Ok: result = i18n.t('projects.status.ok'); break;
      default:
        result = i18n.t('projects.status.unknown');
        break;
    }
    return result;
  }

  static getProjectStatusLevel(status: TProjectRepositoryStatus): string {
    let result = '';
    switch (status) {
      case TProjectRepositoryStatus.AuthFailed: result = 'error'; break;
      case TProjectRepositoryStatus.Cloning: result = 'neutral'; break;
      case TProjectRepositoryStatus.CloningPending: result = 'neutral'; break;
      case TProjectRepositoryStatus.BranchUnavailable: result = 'error'; break;
      case TProjectRepositoryStatus.CloningFailed: result = 'error'; break;
      case TProjectRepositoryStatus.CloningSuccessful: result = 'primary'; break;
      case TProjectRepositoryStatus.ParsingFailed: result = 'error'; break;
      case TProjectRepositoryStatus.Unknown: result = 'warning'; break;
      case TProjectRepositoryStatus.Ok: result = 'primary'; break;
      default:
        result = 'neutral';
        break;
    }
    return result;
  }
}
