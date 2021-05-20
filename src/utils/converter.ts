import { TOrganizationMember, TProjectMember } from '@/generated/graphql';
import { Avatar } from '@/typing';

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
}
