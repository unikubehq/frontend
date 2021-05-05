import { TProjectNode } from '@/generated/graphql';
import { Ability, InferSubjects } from '@casl/ability';

export interface IPermission {
  rsid: string
  rsname: string
  scopes: string[]
}

export type Dropzone = {
  getAcceptedFiles(): File[]
}

export type Action = 'edit' | 'view' | 'projects:add' | 'projects:view';
export type Subject = InferSubjects<TProjectNode>;
export type UnikubeAbility = Ability<[Action, Subject]>;
