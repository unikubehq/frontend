import { TProjectMember, TProjectNode } from '@/generated/graphql';
import { Ability, InferSubjects } from '@casl/ability';

export interface IPermission {
  rsid: string
  rsname: string
  scopes: string[]
}

export type Dropzone = {
  getAcceptedFiles(): File[]
}

export type Avatar = {
  key: string // for loops
  image: string
  role: string
  initials: string
  email: string
  name: string
}

export interface TProjectMemberEdit extends TProjectMember {
  editing?: boolean
  loading?: boolean
}

export type Action = 'edit' | 'view' | 'projects:add' | 'projects:view';
export type Subject = InferSubjects<TProjectNode>;
export type UnikubeAbility = Ability<[Action, Subject]>;

export type UnikubeError = {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  error: any,
  message: string,
  location: string,
}
