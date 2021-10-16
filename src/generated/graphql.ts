/* eslint-disable */
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSONString: any;
  UUID: any;
};








export type TAwskmsNode = {
  kind: 'AwskmsNode';
  __typename?: 'AWSKMSNode';
  accessKey: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  secretAccessKey: Scalars['String'];
  title: Scalars['String'];
};

export type TClusterSettingsNode = {
  kind: 'ClusterSettingsNode';
  __typename?: 'ClusterSettingsNode';
  id: Scalars['ID'];
  port: Scalars['Int'];
};

export type TCreateOrganizationMemberInvitation = {
  __typename?: 'CreateOrganizationMemberInvitation';
  ok?: Maybe<Scalars['Boolean']>;
};

export type TCreateProjectMember = {
  __typename?: 'CreateProjectMember';
  ok?: Maybe<Scalars['Boolean']>;
};

export type TCreateUpdateEnvironmentInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  deck: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  namespace: Scalars['String'];
  sopsCredentials?: Maybe<Scalars['ID']>;
  title: Scalars['String'];
  type: Scalars['String'];
  valuesPath?: Maybe<Scalars['String']>;
  valuesType?: Maybe<Scalars['String']>;
};

export type TCreateUpdateEnvironmentPayload = {
  __typename?: 'CreateUpdateEnvironmentPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  environment?: Maybe<TEnvironmentNode>;
  errors?: Maybe<Array<Maybe<TErrorType>>>;
};

export type TCreateUpdateHelmOverrides = {
  __typename?: 'CreateUpdateHelmOverrides';
  ok?: Maybe<Scalars['Boolean']>;
};

export type TCreateUpdateOrganizationInput = {
  avatarImage?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  onTrial?: Maybe<Scalars['Boolean']>;
  title: Scalars['String'];
};

export type TCreateUpdateOrganizationPayload = {
  __typename?: 'CreateUpdateOrganizationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<Maybe<TErrorType>>>;
  organization?: Maybe<TOrganizationNode>;
};

export type TCreateUpdateProject = {
  __typename?: 'CreateUpdateProject';
  project?: Maybe<TProjectNode>;
};

export type TCreateUpdateSops = {
  __typename?: 'CreateUpdateSOPS';
  ok?: Maybe<Scalars['Boolean']>;
};


export type TDeckNode = {
  kind: 'DeckNode';
  __typename?: 'DeckNode';
  deployments?: Maybe<Array<Maybe<TDeploymentNode>>>;
  description?: Maybe<Scalars['String']>;
  dirPath: Scalars['String'];
  environment?: Maybe<Array<Maybe<TEnvironmentNode>>>;
  fileInformation?: Maybe<Array<Maybe<TFileInformationNode>>>;
  hash: Scalars['String'];
  id: Scalars['UUID'];
  namespace: Scalars['String'];
  project: TProjectNode;
  title: Scalars['String'];
  type: Scalars['String'];
};


export type TDeckNodeDeploymentsArgs = {
  level?: Maybe<Scalars['String']>;
  switchable?: Maybe<Scalars['Boolean']>;
};


export type TDeckNodeEnvironmentArgs = {
  level?: Maybe<Scalars['String']>;
};

export type TDeckNodePage = {
  __typename?: 'DeckNodePage';
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  resultCount?: Maybe<Scalars['Int']>;
  results?: Maybe<Array<Maybe<TDeckNode>>>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type TDeleteAvatar = {
  __typename?: 'DeleteAvatar';
  ok?: Maybe<Scalars['Boolean']>;
};

export type TDeleteEnvironment = {
  __typename?: 'DeleteEnvironment';
  ok?: Maybe<Scalars['Boolean']>;
};

export type TDeleteOrganizationMember = {
  __typename?: 'DeleteOrganizationMember';
  ok?: Maybe<Scalars['Boolean']>;
};

export type TDeleteProject = {
  __typename?: 'DeleteProject';
  ok?: Maybe<Scalars['Boolean']>;
};

export type TDeleteProjectMember = {
  __typename?: 'DeleteProjectMember';
  ok?: Maybe<Scalars['Boolean']>;
};

export type TDeleteSops = {
  __typename?: 'DeleteSOPS';
  ok?: Maybe<Scalars['Boolean']>;
};

export type TDeploymentNode = {
  kind: 'DeploymentNode';
  __typename?: 'DeploymentNode';
  description?: Maybe<Scalars['String']>;
  environment: TEnvironmentNode;
  id: Scalars['UUID'];
  isSwitchable: Scalars['Boolean'];
  ports: Scalars['String'];
  title: Scalars['String'];
};

export type TEnvironmentNode = {
  kind: 'EnvironmentNode';
  __typename?: 'EnvironmentNode';
  deck: TDeckNode;
  deployments: Array<TDeploymentNode>;
  description?: Maybe<Scalars['String']>;
  helmOverrides?: Maybe<THelmOverridesNode>;
  id: Scalars['UUID'];
  namespace: Scalars['String'];
  sopsCredentials?: Maybe<TSopsProviderNode>;
  specsUrl?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  type: TEnvironmentType;
  valueSchema?: Maybe<Scalars['String']>;
  valuesPath: Scalars['String'];
  valuesType?: Maybe<TEnvironmentValuesType>;
};

export enum TEnvironmentType {
  Local = 'LOCAL',
  Remote = 'REMOTE'
}

export enum TEnvironmentValuesType {
  Dir = 'DIR',
  File = 'FILE'
}

export type TErrorType = {
  __typename?: 'ErrorType';
  field: Scalars['String'];
  messages: Array<Scalars['String']>;
};

export type TFileInformationNode = {
  kind: 'FileInformationNode';
  __typename?: 'FileInformationNode';
  encrypted?: Maybe<Scalars['Boolean']>;
  path?: Maybe<Scalars['String']>;
};

export type THelmOverridesNode = {
  kind: 'HelmOverridesNode';
  __typename?: 'HelmOverridesNode';
  id: Scalars['ID'];
  overrides: Scalars['String'];
};


export type TMutation = {
  __typename?: 'Mutation';
  answerInvitation?: Maybe<TUpdateOrganizationMemberInvitation>;
  createInvitation?: Maybe<TCreateOrganizationMemberInvitation>;
  createProjectMember?: Maybe<TCreateProjectMember>;
  createUpdateEnvironment?: Maybe<TCreateUpdateEnvironmentPayload>;
  createUpdateHelmOverrides?: Maybe<TCreateUpdateHelmOverrides>;
  createUpdateOrganization?: Maybe<TCreateUpdateOrganizationPayload>;
  createUpdateProject?: Maybe<TCreateUpdateProject>;
  createUpdateSops?: Maybe<TCreateUpdateSops>;
  deleteAvatar?: Maybe<TDeleteAvatar>;
  deleteEnvironment?: Maybe<TDeleteEnvironment>;
  deleteProject?: Maybe<TDeleteProject>;
  deleteProjectMember?: Maybe<TDeleteProjectMember>;
  deleteSops?: Maybe<TDeleteSops>;
  removeOrganizationMember?: Maybe<TDeleteOrganizationMember>;
  revokeInvitation?: Maybe<TRevokeOrganizationMemberInvitation>;
  updateClusterSettings?: Maybe<TUpdateClusterSettingsPayload>;
  updateOrganizationMember?: Maybe<TUpdateOrganizationMember>;
  updateProjectRepository?: Maybe<TUpdateProjectRepository>;
};


export type TMutationAnswerInvitationArgs = {
  accepted?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['UUID']>;
};


export type TMutationCreateInvitationArgs = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['UUID']>;
};


export type TMutationCreateProjectMemberArgs = {
  id?: Maybe<Scalars['UUID']>;
  role?: Maybe<TProjectMemberRoleEnum>;
  user?: Maybe<Scalars['UUID']>;
};


export type TMutationCreateUpdateEnvironmentArgs = {
  input: TCreateUpdateEnvironmentInput;
};


export type TMutationCreateUpdateHelmOverridesArgs = {
  environmentId?: Maybe<Scalars['UUID']>;
  overrides?: Maybe<Scalars['String']>;
};


export type TMutationCreateUpdateOrganizationArgs = {
  input: TCreateUpdateOrganizationInput;
};


export type TMutationCreateUpdateProjectArgs = {
  input: TProjectInputType;
};


export type TMutationCreateUpdateSopsArgs = {
  id?: Maybe<Scalars['UUID']>;
  sopsData: TSopsInputType;
};


export type TMutationDeleteAvatarArgs = {
  id?: Maybe<Scalars['UUID']>;
};


export type TMutationDeleteEnvironmentArgs = {
  id?: Maybe<Scalars['UUID']>;
};


export type TMutationDeleteProjectArgs = {
  id?: Maybe<Scalars['UUID']>;
};


export type TMutationDeleteProjectMemberArgs = {
  id?: Maybe<Scalars['UUID']>;
  user?: Maybe<Scalars['UUID']>;
};


export type TMutationDeleteSopsArgs = {
  id?: Maybe<Scalars['UUID']>;
};


export type TMutationRemoveOrganizationMemberArgs = {
  id?: Maybe<Scalars['UUID']>;
  user?: Maybe<Scalars['UUID']>;
};


export type TMutationRevokeInvitationArgs = {
  id?: Maybe<Scalars['UUID']>;
};


export type TMutationUpdateClusterSettingsArgs = {
  input: TUpdateClusterSettingsInput;
};


export type TMutationUpdateOrganizationMemberArgs = {
  id?: Maybe<Scalars['UUID']>;
  role?: Maybe<TOrganizationMemberRoleEnum>;
  user?: Maybe<Scalars['UUID']>;
};


export type TMutationUpdateProjectRepositoryArgs = {
  id?: Maybe<Scalars['UUID']>;
};

export type TOrganizationInvitationNode = {
  kind: 'OrganizationInvitationNode';
  __typename?: 'OrganizationInvitationNode';
  email: Scalars['String'];
  id: Scalars['UUID'];
  organization: TOrganizationNode;
};

export type TOrganizationInvitationNodePage = {
  __typename?: 'OrganizationInvitationNodePage';
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  resultCount?: Maybe<Scalars['Int']>;
  results?: Maybe<Array<Maybe<TOrganizationInvitationNode>>>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type TOrganizationMember = {
  __typename?: 'OrganizationMember';
  role?: Maybe<Scalars['String']>;
  user?: Maybe<TUserNode>;
};

export enum TOrganizationMemberRoleEnum {
  Admin = 'admin',
  Member = 'member'
}

export type TOrganizationNode = {
  kind: 'OrganizationNode';
  __typename?: 'OrganizationNode';
  avatarImage?: Maybe<Scalars['String']>;
  created: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  members?: Maybe<Array<Maybe<TOrganizationMember>>>;
  title: Scalars['String'];
};

export type TOrganizationNodePage = {
  __typename?: 'OrganizationNodePage';
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  resultCount?: Maybe<Scalars['Int']>;
  results?: Maybe<Array<Maybe<TOrganizationNode>>>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type TPgpKeyNode = {
  kind: 'PgpKeyNode';
  __typename?: 'PGPKeyNode';
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  privateKey: Scalars['String'];
  title: Scalars['String'];
};

export type TProjectInputType = {
  accessToken?: Maybe<Scalars['String']>;
  accessUsername?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['UUID']>;
  organization: Scalars['UUID'];
  specRepository: Scalars['String'];
  specRepositoryBranch: Scalars['String'];
  specType: TSpecicifactionTypeEnum;
  title: Scalars['String'];
};

export type TProjectMember = {
  __typename?: 'ProjectMember';
  role?: Maybe<Scalars['String']>;
  user?: Maybe<TUserNode>;
};

export enum TProjectMemberRoleEnum {
  Admin = 'admin',
  Member = 'member'
}

export type TProjectNode = {
  kind: 'ProjectNode';
  __typename?: 'ProjectNode';
  accessToken?: Maybe<Scalars['String']>;
  accessUsername: Scalars['String'];
  clusterSettings?: Maybe<TClusterSettingsNode>;
  created: Scalars['DateTime'];
  currentCommit: Scalars['String'];
  currentCommitDateTime?: Maybe<Scalars['DateTime']>;
  decks: Array<TDeckNode>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  keycloakData: Scalars['JSONString'];
  members?: Maybe<Array<Maybe<TProjectMember>>>;
  organization?: Maybe<TOrganizationNode>;
  repositoryStatus: TProjectRepositoryStatus;
  sops?: Maybe<Array<Maybe<TSopsProviderNode>>>;
  specRepository: Scalars['String'];
  specRepositoryBranch?: Maybe<Scalars['String']>;
  specType: TProjectSpecType;
  title: Scalars['String'];
};

export type TProjectNodePage = {
  __typename?: 'ProjectNodePage';
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  resultCount?: Maybe<Scalars['Int']>;
  results?: Maybe<Array<Maybe<TProjectNode>>>;
  totalCount?: Maybe<Scalars['Int']>;
};

export enum TProjectRepositoryStatus {
  AuthFailed = 'AUTH_FAILED',
  BranchUnavailable = 'BRANCH_UNAVAILABLE',
  Cloning = 'CLONING',
  CloningFailed = 'CLONING_FAILED',
  CloningPending = 'CLONING_PENDING',
  CloningSuccessful = 'CLONING_SUCCESSFUL',
  Ok = 'OK',
  ParsingFailed = 'PARSING_FAILED',
  Unknown = 'UNKNOWN'
}

export enum TProjectSpecType {
  Helm = 'HELM'
}

export type TQuery = {
  __typename?: 'Query';
  allDecks?: Maybe<TDeckNodePage>;
  allOrganizationInvitations?: Maybe<TOrganizationInvitationNodePage>;
  allOrganizations?: Maybe<TOrganizationNodePage>;
  allProjects?: Maybe<TProjectNodePage>;
  deck?: Maybe<TDeckNode>;
  environment?: Maybe<TEnvironmentNode>;
  organization?: Maybe<TOrganizationNode>;
  project?: Maybe<TProjectNode>;
  user?: Maybe<TUserNode>;
  userInvitations?: Maybe<TOrganizationInvitationNodePage>;
};


export type TQueryAllDecksArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  organizationId?: Maybe<Scalars['UUID']>;
  projectId?: Maybe<Scalars['UUID']>;
};


export type TQueryAllOrganizationInvitationsArgs = {
  id: Scalars['UUID'];
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type TQueryAllOrganizationsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type TQueryAllProjectsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  organizationId?: Maybe<Scalars['UUID']>;
};


export type TQueryDeckArgs = {
  id?: Maybe<Scalars['UUID']>;
  slug?: Maybe<Scalars['String']>;
};


export type TQueryEnvironmentArgs = {
  id?: Maybe<Scalars['UUID']>;
};


export type TQueryOrganizationArgs = {
  id: Scalars['UUID'];
};


export type TQueryProjectArgs = {
  id?: Maybe<Scalars['UUID']>;
  slug?: Maybe<Scalars['String']>;
};


export type TQueryUserArgs = {
  id?: Maybe<Scalars['UUID']>;
};


export type TQueryUserInvitationsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type TRevokeOrganizationMemberInvitation = {
  __typename?: 'RevokeOrganizationMemberInvitation';
  ok?: Maybe<Scalars['Boolean']>;
};

export type TSopsInputType = {
  description?: Maybe<Scalars['String']>;
  project: Scalars['UUID'];
  secret1?: Maybe<Scalars['String']>;
  secret2?: Maybe<Scalars['String']>;
  secret3?: Maybe<Scalars['String']>;
  sopsType: TSopsTypeEnum;
  title: Scalars['String'];
};

export type TSopsProviderNode = TAwskmsNode | TPgpKeyNode;

export enum TSopsTypeEnum {
  Aws = 'aws',
  Pgp = 'pgp'
}

export enum TSpecicifactionTypeEnum {
  Helm = 'helm'
}


export type TUpdateClusterSettingsInput = {
  clientMutationId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  port: Scalars['Int'];
  project: Scalars['ID'];
};

export type TUpdateClusterSettingsPayload = {
  __typename?: 'UpdateClusterSettingsPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  clusterSettings?: Maybe<TClusterSettingsNode>;
  errors?: Maybe<Array<Maybe<TErrorType>>>;
};

export type TUpdateOrganizationMember = {
  __typename?: 'UpdateOrganizationMember';
  ok?: Maybe<Scalars['Boolean']>;
};

export type TUpdateOrganizationMemberInvitation = {
  __typename?: 'UpdateOrganizationMemberInvitation';
  ok?: Maybe<Scalars['Boolean']>;
};

export type TUpdateProjectRepository = {
  __typename?: 'UpdateProjectRepository';
  ok?: Maybe<Scalars['Boolean']>;
};

export type TUserNode = {
  kind: 'UserNode';
  __typename?: 'UserNode';
  avatarImage?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  familyName?: Maybe<Scalars['String']>;
  givenName?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  name?: Maybe<Scalars['String']>;
};

export type TOrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type TOrganizationsQueryResult = { __typename?: 'Query', allOrganizations?: Maybe<{ __typename?: 'OrganizationNodePage', results?: Maybe<Array<Maybe<{ __typename?: 'OrganizationNode', id: any, title: string, description?: Maybe<string>, avatarImage?: Maybe<string> }>>> }> };

export type TOrganizationQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type TOrganizationQueryResult = { __typename?: 'Query', organization?: Maybe<{ __typename?: 'OrganizationNode', title: string, description?: Maybe<string>, id: any, avatarImage?: Maybe<string> }> };

export type TOrganizationMembersQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type TOrganizationMembersQueryResult = { __typename?: 'Query', organization?: Maybe<{ __typename?: 'OrganizationNode', id: any, members?: Maybe<Array<Maybe<{ __typename?: 'OrganizationMember', role?: Maybe<string>, user?: Maybe<{ __typename?: 'UserNode', id: any, familyName?: Maybe<string>, givenName?: Maybe<string>, email?: Maybe<string>, avatarImage?: Maybe<string> }> }>>> }> };

export type TOrganizationInvitesQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type TOrganizationInvitesQueryResult = { __typename?: 'Query', allOrganizationInvitations?: Maybe<{ __typename?: 'OrganizationInvitationNodePage', results?: Maybe<Array<Maybe<{ __typename?: 'OrganizationInvitationNode', email: string, id: any }>>> }> };

export type TCreateOrganizationMutationVariables = Exact<{
  title: Scalars['String'];
}>;


export type TCreateOrganizationMutationResult = { __typename?: 'Mutation', createUpdateOrganization?: Maybe<{ __typename?: 'CreateUpdateOrganizationPayload', organization?: Maybe<{ __typename?: 'OrganizationNode', id: any, title: string, description?: Maybe<string> }>, errors?: Maybe<Array<Maybe<{ __typename?: 'ErrorType', field: string, messages: Array<string> }>>> }> };

export type TInviteToOrganizationMutationVariables = Exact<{
  email: Scalars['String'];
  organization: Scalars['UUID'];
}>;


export type TInviteToOrganizationMutationResult = { __typename?: 'Mutation', createInvitation?: Maybe<{ __typename?: 'CreateOrganizationMemberInvitation', ok?: Maybe<boolean> }> };

export type TRevokeOrganizationInviteMutationVariables = Exact<{
  inviteId: Scalars['UUID'];
}>;


export type TRevokeOrganizationInviteMutationResult = { __typename?: 'Mutation', revokeInvitation?: Maybe<{ __typename?: 'RevokeOrganizationMemberInvitation', ok?: Maybe<boolean> }> };

export type TAnswerInvitationMutationVariables = Exact<{
  accepted?: Maybe<Scalars['Boolean']>;
  invitationId?: Maybe<Scalars['UUID']>;
}>;


export type TAnswerInvitationMutationResult = { __typename?: 'Mutation', answerInvitation?: Maybe<{ __typename?: 'UpdateOrganizationMemberInvitation', ok?: Maybe<boolean> }> };

export type TUpdateOrganizationMemberMutationVariables = Exact<{
  organizationId?: Maybe<Scalars['UUID']>;
  role?: Maybe<TOrganizationMemberRoleEnum>;
  userId?: Maybe<Scalars['UUID']>;
}>;


export type TUpdateOrganizationMemberMutationResult = { __typename?: 'Mutation', updateOrganizationMember?: Maybe<{ __typename?: 'UpdateOrganizationMember', ok?: Maybe<boolean> }> };

export type TDeleteOrganizationMemberMutationVariables = Exact<{
  organizationId?: Maybe<Scalars['UUID']>;
  userId?: Maybe<Scalars['UUID']>;
}>;


export type TDeleteOrganizationMemberMutationResult = { __typename?: 'Mutation', removeOrganizationMember?: Maybe<{ __typename?: 'DeleteOrganizationMember', ok?: Maybe<boolean> }> };

export type TProjectsQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}>;


export type TProjectsQueryResult = { __typename?: 'Query', allProjects?: Maybe<{ __typename?: 'ProjectNodePage', totalCount?: Maybe<number>, results?: Maybe<Array<Maybe<{ __typename?: 'ProjectNode', title: string, repositoryStatus: TProjectRepositoryStatus, description?: Maybe<string>, currentCommit: string, currentCommitDateTime?: Maybe<any>, id: any, organization?: Maybe<{ __typename?: 'OrganizationNode', id: any }>, members?: Maybe<Array<Maybe<{ __typename?: 'ProjectMember', role?: Maybe<string>, user?: Maybe<{ __typename?: 'UserNode', id: any, givenName?: Maybe<string>, familyName?: Maybe<string>, avatarImage?: Maybe<string>, email?: Maybe<string> }> }>>>, decks: Array<{ __typename?: 'DeckNode', title: string }>, sops?: Maybe<Array<Maybe<{ __typename?: 'AWSKMSNode', title: string, id: any } | { __typename?: 'PGPKeyNode', title: string, id: any }>>> }>>> }> };

export type TProjectDetailQueryVariables = Exact<{
  id?: Maybe<Scalars['UUID']>;
}>;


export type TProjectDetailQueryResult = { __typename?: 'Query', project?: Maybe<{ __typename?: 'ProjectNode', created: any, title: string, description?: Maybe<string>, id: any, specRepository: string, specRepositoryBranch?: Maybe<string>, repositoryStatus: TProjectRepositoryStatus, specType: TProjectSpecType, currentCommit: string, currentCommitDateTime?: Maybe<any>, accessUsername: string, accessToken?: Maybe<string>, organization?: Maybe<{ __typename?: 'OrganizationNode', id: any }>, clusterSettings?: Maybe<{ __typename?: 'ClusterSettingsNode', port: number, id: string }>, members?: Maybe<Array<Maybe<{ __typename?: 'ProjectMember', role?: Maybe<string>, user?: Maybe<{ __typename?: 'UserNode', id: any, givenName?: Maybe<string>, familyName?: Maybe<string>, avatarImage?: Maybe<string>, email?: Maybe<string> }> }>>>, decks: Array<{ __typename?: 'DeckNode', title: string, description?: Maybe<string>, type: string, namespace: string, id: any, fileInformation?: Maybe<Array<Maybe<{ __typename?: 'FileInformationNode', path?: Maybe<string>, encrypted?: Maybe<boolean> }>>>, deployments?: Maybe<Array<Maybe<{ __typename?: 'DeploymentNode', id: any, title: string, description?: Maybe<string>, isSwitchable: boolean, ports: string }>>>, environment?: Maybe<Array<Maybe<{ __typename?: 'EnvironmentNode', title: string, description?: Maybe<string>, id: any, type: TEnvironmentType, valuesPath: string, namespace: string, valuesType?: Maybe<TEnvironmentValuesType>, valueSchema?: Maybe<string>, deck: { __typename?: 'DeckNode', id: any }, helmOverrides?: Maybe<{ __typename?: 'HelmOverridesNode', overrides: string }>, sopsCredentials?: Maybe<{ __typename?: 'AWSKMSNode', title: string, id: any } | { __typename?: 'PGPKeyNode', title: string, id: any }> }>>> }>, sops?: Maybe<Array<Maybe<{ __typename?: 'AWSKMSNode', title: string, description?: Maybe<string>, accessKey: string, secretAccessKey: string, id: any } | { __typename?: 'PGPKeyNode', title: string, description?: Maybe<string>, privateKey: string, id: any }>>> }> };

export type TProjectDetailOtherProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type TProjectDetailOtherProjectsQueryResult = { __typename?: 'Query', allProjects?: Maybe<{ __typename?: 'ProjectNodePage', results?: Maybe<Array<Maybe<{ __typename?: 'ProjectNode', title: string, id: any, currentCommitDateTime?: Maybe<any>, decks: Array<{ __typename?: 'DeckNode', title: string }> }>>> }> };

export type TCreateProjectMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  specRepository: Scalars['String'];
  specType: TSpecicifactionTypeEnum;
  accessUsername?: Maybe<Scalars['String']>;
  accessToken?: Maybe<Scalars['String']>;
  specRepositoryBranch: Scalars['String'];
  organization: Scalars['UUID'];
}>;


export type TCreateProjectMutationResult = { __typename?: 'Mutation', createUpdateProject?: Maybe<{ __typename?: 'CreateUpdateProject', project?: Maybe<{ __typename?: 'ProjectNode', title: string, id: any }> }> };

export type TUpdateProjectMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  specRepository: Scalars['String'];
  specType: TSpecicifactionTypeEnum;
  accessUsername?: Maybe<Scalars['String']>;
  accessToken?: Maybe<Scalars['String']>;
  specRepositoryBranch: Scalars['String'];
  id: Scalars['UUID'];
  organization: Scalars['UUID'];
}>;


export type TUpdateProjectMutationResult = { __typename?: 'Mutation', createUpdateProject?: Maybe<{ __typename?: 'CreateUpdateProject', project?: Maybe<{ __typename?: 'ProjectNode', title: string, id: any }> }> };

export type TDeleteProjectMutationVariables = Exact<{
  id?: Maybe<Scalars['UUID']>;
}>;


export type TDeleteProjectMutationResult = { __typename?: 'Mutation', deleteProject?: Maybe<{ __typename?: 'DeleteProject', ok?: Maybe<boolean> }> };

export type TCreateUpdateSopsMutationVariables = Exact<{
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  sopsType: TSopsTypeEnum;
  project: Scalars['UUID'];
  secret1?: Maybe<Scalars['String']>;
  secret2?: Maybe<Scalars['String']>;
  secret3?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['UUID']>;
}>;


export type TCreateUpdateSopsMutationResult = { __typename?: 'Mutation', createUpdateSops?: Maybe<{ __typename?: 'CreateUpdateSOPS', ok?: Maybe<boolean> }> };

export type TCreateUpdateEnvironmentMutationVariables = Exact<{
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  deck: Scalars['ID'];
  sopsCredentials?: Maybe<Scalars['ID']>;
  valuesPath?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  namespace: Scalars['String'];
}>;


export type TCreateUpdateEnvironmentMutationResult = { __typename?: 'Mutation', createUpdateEnvironment?: Maybe<{ __typename?: 'CreateUpdateEnvironmentPayload', environment?: Maybe<{ __typename?: 'EnvironmentNode', title: string, id: any }>, errors?: Maybe<Array<Maybe<{ __typename?: 'ErrorType', field: string, messages: Array<string> }>>> }> };

export type TCreateProjectMemberMutationVariables = Exact<{
  id?: Maybe<Scalars['UUID']>;
  user?: Maybe<Scalars['UUID']>;
  role?: Maybe<TProjectMemberRoleEnum>;
}>;


export type TCreateProjectMemberMutationResult = { __typename?: 'Mutation', createProjectMember?: Maybe<{ __typename?: 'CreateProjectMember', ok?: Maybe<boolean> }> };

export type TDeleteProjectMemberMutationVariables = Exact<{
  id?: Maybe<Scalars['UUID']>;
  user?: Maybe<Scalars['UUID']>;
}>;


export type TDeleteProjectMemberMutationResult = { __typename?: 'Mutation', deleteProjectMember?: Maybe<{ __typename?: 'DeleteProjectMember', ok?: Maybe<boolean> }> };

export type TUpdateClusterSettingsMutationVariables = Exact<{
  input: TUpdateClusterSettingsInput;
}>;


export type TUpdateClusterSettingsMutationResult = { __typename?: 'Mutation', updateClusterSettings?: Maybe<{ __typename?: 'UpdateClusterSettingsPayload', clusterSettings?: Maybe<{ __typename?: 'ClusterSettingsNode', port: number }> }> };

export type TDeleteSopsMutationVariables = Exact<{
  input: Scalars['UUID'];
}>;


export type TDeleteSopsMutationResult = { __typename?: 'Mutation', deleteSops?: Maybe<{ __typename?: 'DeleteSOPS', ok?: Maybe<boolean> }> };

export type TUpdateProjectRepositoryMutationVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type TUpdateProjectRepositoryMutationResult = { __typename?: 'Mutation', updateProjectRepository?: Maybe<{ __typename?: 'UpdateProjectRepository', ok?: Maybe<boolean> }> };

export type TCreateUpdateHelmOverridesMutationVariables = Exact<{
  environmentId: Scalars['UUID'];
  overrides: Scalars['String'];
}>;


export type TCreateUpdateHelmOverridesMutationResult = { __typename?: 'Mutation', createUpdateHelmOverrides?: Maybe<{ __typename?: 'CreateUpdateHelmOverrides', ok?: Maybe<boolean> }> };

export type TUserDetailQueryVariables = Exact<{
  id?: Maybe<Scalars['UUID']>;
}>;


export type TUserDetailQueryResult = { __typename?: 'Query', user?: Maybe<{ __typename?: 'UserNode', avatarImage?: Maybe<string>, email?: Maybe<string>, familyName?: Maybe<string>, givenName?: Maybe<string> }> };

export type TUserInvitationsQueryVariables = Exact<{ [key: string]: never; }>;


export type TUserInvitationsQueryResult = { __typename?: 'Query', userInvitations?: Maybe<{ __typename?: 'OrganizationInvitationNodePage', results?: Maybe<Array<Maybe<{ __typename?: 'OrganizationInvitationNode', id: any, organization: { __typename?: 'OrganizationNode', title: string } }>>> }> };


export const OrganizationsQuery = gql`
    query OrganizationsQuery {
  allOrganizations {
    results {
      id
      title
      description
      avatarImage
    }
  }
}
    `;
export const OrganizationQuery = gql`
    query OrganizationQuery($id: UUID!) {
  organization(id: $id) {
    title
    description
    id
    avatarImage
  }
}
    `;
export const OrganizationMembersQuery = gql`
    query OrganizationMembersQuery($id: UUID!) {
  organization(id: $id) {
    id
    members {
      role
      user {
        id
        familyName
        givenName
        email
        avatarImage
      }
    }
  }
}
    `;
export const OrganizationInvites = gql`
    query OrganizationInvites($id: UUID!) {
  allOrganizationInvitations(id: $id) {
    results {
      email
      id
    }
  }
}
    `;
export const CreateOrganizationMutation = gql`
    mutation CreateOrganizationMutation($title: String!) {
  createUpdateOrganization(input: {title: $title}) {
    organization {
      id
      title
      description
    }
    errors {
      field
      messages
    }
  }
}
    `;
export const InviteToOrganization = gql`
    mutation InviteToOrganization($email: String!, $organization: UUID!) {
  createInvitation(email: $email, id: $organization) {
    ok
  }
}
    `;
export const RevokeOrganizationInvite = gql`
    mutation RevokeOrganizationInvite($inviteId: UUID!) {
  revokeInvitation(id: $inviteId) {
    ok
  }
}
    `;
export const AnswerInvitation = gql`
    mutation AnswerInvitation($accepted: Boolean, $invitationId: UUID) {
  answerInvitation(accepted: $accepted, id: $invitationId) {
    ok
  }
}
    `;
export const UpdateOrganizationMember = gql`
    mutation UpdateOrganizationMember($organizationId: UUID, $role: OrganizationMemberRoleEnum, $userId: UUID) {
  updateOrganizationMember(id: $organizationId, role: $role, user: $userId) {
    ok
  }
}
    `;
export const DeleteOrganizationMember = gql`
    mutation DeleteOrganizationMember($organizationId: UUID, $userId: UUID) {
  removeOrganizationMember(id: $organizationId, user: $userId) {
    ok
  }
}
    `;
export const ProjectsQuery = gql`
    query ProjectsQuery($limit: Int, $offset: Int) {
  allProjects(limit: $limit, offset: $offset) {
    totalCount
    results {
      title
      repositoryStatus
      description
      currentCommit
      currentCommitDateTime
      id
      organization {
        id
      }
      members {
        user {
          id
          givenName
          familyName
          avatarImage
          email
        }
        role
      }
      decks {
        title
      }
      sops {
        ... on AWSKMSNode {
          title
          id
        }
        ... on PGPKeyNode {
          title
          id
        }
      }
    }
  }
}
    `;
export const ProjectDetailQuery = gql`
    query ProjectDetailQuery($id: UUID) {
  project(id: $id) {
    created
    title
    description
    organization {
      id
    }
    id
    specRepository
    specRepositoryBranch
    repositoryStatus
    specType
    currentCommit
    currentCommitDateTime
    accessUsername
    accessToken
    clusterSettings {
      port
      id
    }
    members {
      user {
        id
        givenName
        familyName
        avatarImage
        email
      }
      role
    }
    decks {
      title
      description
      type
      namespace
      id
      fileInformation {
        path
        encrypted
      }
      deployments {
        id
        title
        description
        isSwitchable
        ports
      }
      environment {
        title
        description
        id
        deck {
          id
        }
        type
        valuesPath
        namespace
        valuesType
        valueSchema
        helmOverrides {
          overrides
        }
        sopsCredentials {
          ... on AWSKMSNode {
            title
            id
          }
          ... on PGPKeyNode {
            title
            id
          }
        }
      }
    }
    sops {
      ... on AWSKMSNode {
        title
        description
        accessKey
        secretAccessKey
        id
      }
      ... on PGPKeyNode {
        title
        description
        privateKey
        id
      }
    }
  }
}
    `;
export const ProjectDetailOtherProjectsQuery = gql`
    query ProjectDetailOtherProjectsQuery {
  allProjects(limit: 1000) {
    results {
      title
      id
      currentCommitDateTime
      decks {
        title
      }
    }
  }
}
    `;
export const CreateProject = gql`
    mutation CreateProject($title: String!, $description: String!, $specRepository: String!, $specType: SpecicifactionTypeEnum!, $accessUsername: String, $accessToken: String, $specRepositoryBranch: String!, $organization: UUID!) {
  createUpdateProject(
    input: {title: $title, description: $description, specRepository: $specRepository, specType: $specType, specRepositoryBranch: $specRepositoryBranch, accessUsername: $accessUsername, accessToken: $accessToken, organization: $organization}
  ) {
    project {
      title
      id
    }
  }
}
    `;
export const UpdateProject = gql`
    mutation UpdateProject($title: String!, $description: String!, $specRepository: String!, $specType: SpecicifactionTypeEnum!, $accessUsername: String, $accessToken: String, $specRepositoryBranch: String!, $id: UUID!, $organization: UUID!) {
  createUpdateProject(
    input: {title: $title, description: $description, specRepository: $specRepository, specType: $specType, specRepositoryBranch: $specRepositoryBranch, accessUsername: $accessUsername, accessToken: $accessToken, organization: $organization, id: $id}
  ) {
    project {
      title
      id
    }
  }
}
    `;
export const DeleteProject = gql`
    mutation DeleteProject($id: UUID) {
  deleteProject(id: $id) {
    ok
  }
}
    `;
export const CreateUpdateSops = gql`
    mutation createUpdateSops($title: String!, $description: String, $sopsType: SOPSTypeEnum!, $project: UUID!, $secret1: String, $secret2: String, $secret3: String, $id: UUID) {
  createUpdateSops(
    sopsData: {title: $title, description: $description, sopsType: $sopsType, project: $project, secret1: $secret1, secret2: $secret2, secret3: $secret3}
    id: $id
  ) {
    ok
  }
}
    `;
export const CreateUpdateEnvironment = gql`
    mutation createUpdateEnvironment($title: String!, $description: String, $type: String!, $deck: ID!, $sopsCredentials: ID, $valuesPath: String, $id: ID, $namespace: String!) {
  createUpdateEnvironment(
    input: {title: $title, description: $description, type: $type, deck: $deck, sopsCredentials: $sopsCredentials, valuesPath: $valuesPath, namespace: $namespace, id: $id}
  ) {
    environment {
      title
      id
    }
    errors {
      field
      messages
    }
  }
}
    `;
export const CreateProjectMemberMutation = gql`
    mutation CreateProjectMemberMutation($id: UUID, $user: UUID, $role: ProjectMemberRoleEnum) {
  createProjectMember(user: $user, id: $id, role: $role) {
    ok
  }
}
    `;
export const DeleteProjectMemberMutation = gql`
    mutation DeleteProjectMemberMutation($id: UUID, $user: UUID) {
  deleteProjectMember(user: $user, id: $id) {
    ok
  }
}
    `;
export const UpdateClusterSettings = gql`
    mutation UpdateClusterSettings($input: UpdateClusterSettingsInput!) {
  updateClusterSettings(input: $input) {
    clusterSettings {
      port
    }
  }
}
    `;
export const DeleteSops = gql`
    mutation DeleteSops($input: UUID!) {
  deleteSops(id: $input) {
    ok
  }
}
    `;
export const UpdateProjectRepositoryMutation = gql`
    mutation UpdateProjectRepositoryMutation($id: UUID!) {
  updateProjectRepository(id: $id) {
    ok
  }
}
    `;
export const CreateUpdateHelmOverridesMutation = gql`
    mutation CreateUpdateHelmOverridesMutation($environmentId: UUID!, $overrides: String!) {
  createUpdateHelmOverrides(environmentId: $environmentId, overrides: $overrides) {
    ok
  }
}
    `;
export const UserDetailQuery = gql`
    query UserDetailQuery($id: UUID) {
  user(id: $id) {
    avatarImage
    email
    familyName
    givenName
  }
}
    `;
export const UserInvitationsQuery = gql`
    query UserInvitationsQuery {
  userInvitations {
    results {
      id
      organization {
        title
      }
    }
  }
}
    `;