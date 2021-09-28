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
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  accessKey: Scalars['String'];
  secretAccessKey: Scalars['String'];
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
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  deck: Scalars['ID'];
  sopsCredentials?: Maybe<Scalars['ID']>;
  valuesPath?: Maybe<Scalars['String']>;
  valuesType?: Maybe<Scalars['String']>;
  namespace: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type TCreateUpdateEnvironmentPayload = {
  __typename?: 'CreateUpdateEnvironmentPayload';
  environment?: Maybe<TEnvironmentNode>;
  errors?: Maybe<Array<Maybe<TErrorType>>>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type TCreateUpdateHelmOverrides = {
  __typename?: 'CreateUpdateHelmOverrides';
  ok?: Maybe<Scalars['Boolean']>;
};

export type TCreateUpdateOrganizationInput = {
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  onTrial?: Maybe<Scalars['Boolean']>;
  avatarImage?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type TCreateUpdateOrganizationPayload = {
  __typename?: 'CreateUpdateOrganizationPayload';
  organization?: Maybe<TOrganizationNode>;
  errors?: Maybe<Array<Maybe<TErrorType>>>;
  clientMutationId?: Maybe<Scalars['String']>;
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
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  project: TProjectNode;
  dirPath: Scalars['String'];
  type: Scalars['String'];
  namespace: Scalars['String'];
  fileInformation?: Maybe<Array<Maybe<TFileInformationNode>>>;
  hash: Scalars['String'];
  deployments?: Maybe<Array<Maybe<TDeploymentNode>>>;
  environment?: Maybe<Array<Maybe<TEnvironmentNode>>>;
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
  totalCount?: Maybe<Scalars['Int']>;
  resultCount?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  results?: Maybe<Array<Maybe<TDeckNode>>>;
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
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  ports: Scalars['String'];
  environment: TEnvironmentNode;
  isSwitchable: Scalars['Boolean'];
};

export type TEnvironmentNode = {
  kind: 'EnvironmentNode';
  __typename?: 'EnvironmentNode';
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  deck: TDeckNode;
  type: TEnvironmentType;
  valuesPath: Scalars['String'];
  valuesType?: Maybe<TEnvironmentValuesType>;
  namespace: Scalars['String'];
  valueSchema?: Maybe<Scalars['String']>;
  sopsCredentials?: Maybe<TSopsProviderNode>;
  deployments: Array<TDeploymentNode>;
  helmOverrides?: Maybe<THelmOverridesNode>;
  specsUrl?: Maybe<Scalars['String']>;
};

export enum TEnvironmentType {
  Local = 'LOCAL',
  Remote = 'REMOTE'
}

export enum TEnvironmentValuesType {
  File = 'FILE',
  Dir = 'DIR'
}

export type TErrorType = {
  __typename?: 'ErrorType';
  field: Scalars['String'];
  messages: Array<Scalars['String']>;
};

export type TFileInformationNode = {
  kind: 'FileInformationNode';
  __typename?: 'FileInformationNode';
  path?: Maybe<Scalars['String']>;
  encrypted?: Maybe<Scalars['Boolean']>;
};

export type THelmOverridesNode = {
  kind: 'HelmOverridesNode';
  __typename?: 'HelmOverridesNode';
  id: Scalars['ID'];
  overrides: Scalars['String'];
};


export type TMutation = {
  __typename?: 'Mutation';
  createUpdateOrganization?: Maybe<TCreateUpdateOrganizationPayload>;
  createInvitation?: Maybe<TCreateOrganizationMemberInvitation>;
  revokeInvitation?: Maybe<TRevokeOrganizationMemberInvitation>;
  answerInvitation?: Maybe<TUpdateOrganizationMemberInvitation>;
  updateOrganizationMember?: Maybe<TUpdateOrganizationMember>;
  removeOrganizationMember?: Maybe<TDeleteOrganizationMember>;
  createUpdateProject?: Maybe<TCreateUpdateProject>;
  createProjectMember?: Maybe<TCreateProjectMember>;
  deleteProjectMember?: Maybe<TDeleteProjectMember>;
  deleteProject?: Maybe<TDeleteProject>;
  createUpdateEnvironment?: Maybe<TCreateUpdateEnvironmentPayload>;
  deleteEnvironment?: Maybe<TDeleteEnvironment>;
  createUpdateSops?: Maybe<TCreateUpdateSops>;
  deleteSops?: Maybe<TDeleteSops>;
  updateClusterSettings?: Maybe<TUpdateClusterSettingsPayload>;
  updateProjectRepository?: Maybe<TUpdateProjectRepository>;
  createUpdateHelmOverrides?: Maybe<TCreateUpdateHelmOverrides>;
};


export type TMutationCreateUpdateOrganizationArgs = {
  input: TCreateUpdateOrganizationInput;
};


export type TMutationCreateInvitationArgs = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['UUID']>;
};


export type TMutationRevokeInvitationArgs = {
  id?: Maybe<Scalars['UUID']>;
};


export type TMutationAnswerInvitationArgs = {
  accepted?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['UUID']>;
};


export type TMutationUpdateOrganizationMemberArgs = {
  id?: Maybe<Scalars['UUID']>;
  role?: Maybe<TOrganizationMemberRoleEnum>;
  user?: Maybe<Scalars['UUID']>;
};


export type TMutationRemoveOrganizationMemberArgs = {
  id?: Maybe<Scalars['UUID']>;
  user?: Maybe<Scalars['UUID']>;
};


export type TMutationCreateUpdateProjectArgs = {
  input: TProjectInputType;
};


export type TMutationCreateProjectMemberArgs = {
  id?: Maybe<Scalars['UUID']>;
  role?: Maybe<TProjectMemberRoleEnum>;
  user?: Maybe<Scalars['UUID']>;
};


export type TMutationDeleteProjectMemberArgs = {
  id?: Maybe<Scalars['UUID']>;
  user?: Maybe<Scalars['UUID']>;
};


export type TMutationDeleteProjectArgs = {
  id?: Maybe<Scalars['UUID']>;
};


export type TMutationCreateUpdateEnvironmentArgs = {
  input: TCreateUpdateEnvironmentInput;
};


export type TMutationDeleteEnvironmentArgs = {
  id?: Maybe<Scalars['UUID']>;
};


export type TMutationCreateUpdateSopsArgs = {
  id?: Maybe<Scalars['UUID']>;
  sopsData: TSopsInputType;
};


export type TMutationDeleteSopsArgs = {
  id?: Maybe<Scalars['UUID']>;
};


export type TMutationUpdateClusterSettingsArgs = {
  input: TUpdateClusterSettingsInput;
};


export type TMutationUpdateProjectRepositoryArgs = {
  id?: Maybe<Scalars['UUID']>;
};


export type TMutationCreateUpdateHelmOverridesArgs = {
  environmentId?: Maybe<Scalars['UUID']>;
  overrides?: Maybe<Scalars['String']>;
};

export type TOrganizationInvitationNode = {
  kind: 'OrganizationInvitationNode';
  __typename?: 'OrganizationInvitationNode';
  id: Scalars['UUID'];
  organization: TOrganizationNode;
  email: Scalars['String'];
};

export type TOrganizationInvitationNodePage = {
  __typename?: 'OrganizationInvitationNodePage';
  totalCount?: Maybe<Scalars['Int']>;
  resultCount?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  results?: Maybe<Array<Maybe<TOrganizationInvitationNode>>>;
};

export type TOrganizationMember = {
  __typename?: 'OrganizationMember';
  user?: Maybe<TUserNode>;
  role?: Maybe<Scalars['String']>;
};

export enum TOrganizationMemberRoleEnum {
  Admin = 'admin',
  Member = 'member'
}

export type TOrganizationNode = {
  kind: 'OrganizationNode';
  __typename?: 'OrganizationNode';
  created: Scalars['DateTime'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  avatarImage?: Maybe<Scalars['String']>;
  members?: Maybe<Array<Maybe<TOrganizationMember>>>;
};

export type TOrganizationNodePage = {
  __typename?: 'OrganizationNodePage';
  totalCount?: Maybe<Scalars['Int']>;
  resultCount?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  results?: Maybe<Array<Maybe<TOrganizationNode>>>;
};

export type TPgpKeyNode = {
  kind: 'PgpKeyNode';
  __typename?: 'PGPKeyNode';
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  privateKey: Scalars['String'];
};

export type TProjectInputType = {
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['UUID']>;
  specType: TSpecicifactionTypeEnum;
  specRepository: Scalars['String'];
  specRepositoryBranch: Scalars['String'];
  accessUsername?: Maybe<Scalars['String']>;
  accessToken?: Maybe<Scalars['String']>;
  organization: Scalars['UUID'];
};

export type TProjectMember = {
  __typename?: 'ProjectMember';
  user?: Maybe<TUserNode>;
  role?: Maybe<Scalars['String']>;
};

export enum TProjectMemberRoleEnum {
  Admin = 'admin',
  Member = 'member'
}

export type TProjectNode = {
  kind: 'ProjectNode';
  __typename?: 'ProjectNode';
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  keycloakData: Scalars['JSONString'];
  id: Scalars['UUID'];
  specRepository: Scalars['String'];
  specRepositoryBranch?: Maybe<Scalars['String']>;
  created: Scalars['DateTime'];
  specType: TProjectSpecType;
  currentCommit: Scalars['String'];
  currentCommitDateTime?: Maybe<Scalars['DateTime']>;
  repositoryStatus: TProjectRepositoryStatus;
  accessUsername: Scalars['String'];
  accessToken?: Maybe<Scalars['String']>;
  organization?: Maybe<TOrganizationNode>;
  decks: Array<TDeckNode>;
  clusterSettings?: Maybe<TClusterSettingsNode>;
  sops?: Maybe<Array<Maybe<TSopsProviderNode>>>;
  members?: Maybe<Array<Maybe<TProjectMember>>>;
};

export type TProjectNodePage = {
  __typename?: 'ProjectNodePage';
  totalCount?: Maybe<Scalars['Int']>;
  resultCount?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  results?: Maybe<Array<Maybe<TProjectNode>>>;
};

export enum TProjectRepositoryStatus {
  Unknown = 'UNKNOWN',
  CloningPending = 'CLONING_PENDING',
  Cloning = 'CLONING',
  CloningFailed = 'CLONING_FAILED',
  CloningSuccessful = 'CLONING_SUCCESSFUL',
  BranchUnavailable = 'BRANCH_UNAVAILABLE',
  AuthFailed = 'AUTH_FAILED',
  ParsingFailed = 'PARSING_FAILED',
  Ok = 'OK'
}

export enum TProjectSpecType {
  Helm = 'HELM'
}

export type TQuery = {
  __typename?: 'Query';
  user?: Maybe<TUserNode>;
  allOrganizations?: Maybe<TOrganizationNodePage>;
  organization?: Maybe<TOrganizationNode>;
  userInvitations?: Maybe<TOrganizationInvitationNodePage>;
  allOrganizationInvitations?: Maybe<TOrganizationInvitationNodePage>;
  allProjects?: Maybe<TProjectNodePage>;
  project?: Maybe<TProjectNode>;
  allDecks?: Maybe<TDeckNodePage>;
  deck?: Maybe<TDeckNode>;
  environment?: Maybe<TEnvironmentNode>;
};


export type TQueryUserArgs = {
  id?: Maybe<Scalars['UUID']>;
};


export type TQueryAllOrganizationsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type TQueryOrganizationArgs = {
  id: Scalars['UUID'];
};


export type TQueryUserInvitationsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type TQueryAllOrganizationInvitationsArgs = {
  id: Scalars['UUID'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type TQueryAllProjectsArgs = {
  organizationId?: Maybe<Scalars['UUID']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type TQueryProjectArgs = {
  id?: Maybe<Scalars['UUID']>;
  slug?: Maybe<Scalars['String']>;
};


export type TQueryAllDecksArgs = {
  organizationId?: Maybe<Scalars['UUID']>;
  projectId?: Maybe<Scalars['UUID']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type TQueryDeckArgs = {
  id?: Maybe<Scalars['UUID']>;
  slug?: Maybe<Scalars['String']>;
};


export type TQueryEnvironmentArgs = {
  id?: Maybe<Scalars['UUID']>;
};

export type TRevokeOrganizationMemberInvitation = {
  __typename?: 'RevokeOrganizationMemberInvitation';
  ok?: Maybe<Scalars['Boolean']>;
};

export type TSopsInputType = {
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  sopsType: TSopsTypeEnum;
  project: Scalars['UUID'];
  secret1?: Maybe<Scalars['String']>;
  secret2?: Maybe<Scalars['String']>;
  secret3?: Maybe<Scalars['String']>;
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
  port: Scalars['Int'];
  project: Scalars['ID'];
  id?: Maybe<Scalars['ID']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type TUpdateClusterSettingsPayload = {
  __typename?: 'UpdateClusterSettingsPayload';
  clusterSettings?: Maybe<TClusterSettingsNode>;
  errors?: Maybe<Array<Maybe<TErrorType>>>;
  clientMutationId?: Maybe<Scalars['String']>;
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
  id: Scalars['UUID'];
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  familyName?: Maybe<Scalars['String']>;
  givenName?: Maybe<Scalars['String']>;
  avatarImage?: Maybe<Scalars['String']>;
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