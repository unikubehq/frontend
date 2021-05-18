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
  UUID: any;
  DateTime: any;
  JSONString: any;
  _FieldSet: any;
};





export type TQuery = {
  __typename?: 'Query';
  user?: Maybe<TUserNode>;
  allOrganizations?: Maybe<TOrganizationNodePage>;
  organization?: Maybe<TOrganizationNode>;
  userInvitations?: Maybe<TOrganizationInvitationNodePage>;
  allOrganizationInvitations?: Maybe<TOrganizationInvitationNodePage>;
  allProjects?: Maybe<TProjectNodePage>;
  project?: Maybe<TProjectNode>;
  allPackages?: Maybe<TPackageNodePage>;
  package?: Maybe<TPackageNode>;
  clusterlevel?: Maybe<TClusterLevelNode>;
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
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type TQueryProjectArgs = {
  id?: Maybe<Scalars['UUID']>;
  slug?: Maybe<Scalars['String']>;
};


export type TQueryAllPackagesArgs = {
  organizationId?: Maybe<Scalars['UUID']>;
  projectId?: Maybe<Scalars['UUID']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type TQueryPackageArgs = {
  id?: Maybe<Scalars['UUID']>;
  slug?: Maybe<Scalars['String']>;
};


export type TQueryClusterlevelArgs = {
  id?: Maybe<Scalars['UUID']>;
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

export type TOrganizationNodePage = {
  __typename?: 'OrganizationNodePage';
  totalCount?: Maybe<Scalars['Int']>;
  resultCount?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  results?: Maybe<Array<Maybe<TOrganizationNode>>>;
};

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


export type TOrganizationMember = {
  __typename?: 'OrganizationMember';
  user?: Maybe<TUserNode>;
  role?: Maybe<Scalars['String']>;
};

export type TOrganizationInvitationNodePage = {
  __typename?: 'OrganizationInvitationNodePage';
  totalCount?: Maybe<Scalars['Int']>;
  resultCount?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  results?: Maybe<Array<Maybe<TOrganizationInvitationNode>>>;
};

export type TOrganizationInvitationNode = {
  kind: 'OrganizationInvitationNode';
  __typename?: 'OrganizationInvitationNode';
  id: Scalars['UUID'];
  organization: TOrganizationNode;
  email: Scalars['String'];
};

export type TProjectNodePage = {
  __typename?: 'ProjectNodePage';
  totalCount?: Maybe<Scalars['Int']>;
  resultCount?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  results?: Maybe<Array<Maybe<TProjectNode>>>;
};

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
  packages: Array<TPackageNode>;
  sops?: Maybe<Array<Maybe<TSopsProviderNode>>>;
  members?: Maybe<Array<Maybe<TProjectMember>>>;
};


export enum TProjectSpecType {
  Plain = 'PLAIN',
  Helm = 'HELM'
}

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

export type TPackageNode = {
  kind: 'PackageNode';
  __typename?: 'PackageNode';
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
  clusterLevel?: Maybe<Array<Maybe<TClusterLevelNode>>>;
};


export type TPackageNodeDeploymentsArgs = {
  level?: Maybe<Scalars['String']>;
  switchable?: Maybe<Scalars['Boolean']>;
};


export type TPackageNodeClusterLevelArgs = {
  level?: Maybe<Scalars['String']>;
};

export type TFileInformationNode = {
  kind: 'FileInformationNode';
  __typename?: 'FileInformationNode';
  path?: Maybe<Scalars['String']>;
  encrypted?: Maybe<Scalars['Boolean']>;
};

export type TDeploymentNode = {
  kind: 'DeploymentNode';
  __typename?: 'DeploymentNode';
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  ports: Scalars['String'];
  clusterLevel: TClusterLevelNode;
  isSwitchable: Scalars['Boolean'];
};

export type TClusterLevelNode = {
  kind: 'ClusterLevelNode';
  __typename?: 'ClusterLevelNode';
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  package: TPackageNode;
  type: TClusterLevelType;
  valuesPath: Scalars['String'];
  valuesType?: Maybe<TClusterLevelValuesType>;
  sopsCredentials?: Maybe<TSopsProviderNode>;
  deployments: Array<TDeploymentNode>;
  specsUrl?: Maybe<Scalars['String']>;
};

export enum TClusterLevelType {
  Local = 'LOCAL',
  Remote = 'REMOTE'
}

export enum TClusterLevelValuesType {
  File = 'FILE',
  Dir = 'DIR'
}

export type TSopsProviderNode = TAwskmsNode | TPgpKeyNode;

export type TAwskmsNode = {
  kind: 'AwskmsNode';
  __typename?: 'AWSKMSNode';
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  accessKey: Scalars['String'];
  secretAccessKey: Scalars['String'];
};

export type TPgpKeyNode = {
  kind: 'PgpKeyNode';
  __typename?: 'PGPKeyNode';
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  privateKey: Scalars['String'];
};

export type TProjectMember = {
  __typename?: 'ProjectMember';
  user?: Maybe<TUserNode>;
  role?: Maybe<Scalars['String']>;
};

export type TPackageNodePage = {
  __typename?: 'PackageNodePage';
  totalCount?: Maybe<Scalars['Int']>;
  resultCount?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  results?: Maybe<Array<Maybe<TPackageNode>>>;
};

export type TMutation = {
  __typename?: 'Mutation';
  createUpdateOrganization?: Maybe<TCreateUpdateOrganizationPayload>;
  createInvitation?: Maybe<TCreateOrganizationMemberInvitation>;
  revokeInvitation?: Maybe<TRevokeOrganizationMemberInvitation>;
  answerInvitation?: Maybe<TUpdateOrganizationMemberInvitation>;
  updateOrganizationMember?: Maybe<TUpdateOrganizationMember>;
  removeOrganizationMember?: Maybe<TDeleteOrganizationMember>;
  createUpdateProject?: Maybe<TCreateUpdateProjectPayload>;
  createProjectMember?: Maybe<TCreateProjectMember>;
  deleteProjectMember?: Maybe<TDeleteProjectMember>;
  deleteProject?: Maybe<TDeleteProject>;
  createUpdateClusterLevel?: Maybe<TCreateUpdateClusterLevelPayload>;
  deleteClusterLevel?: Maybe<TDeleteClusterLevel>;
  createUpdateSops?: Maybe<TCreateUpdateSops>;
  deleteSops?: Maybe<TDeleteSops>;
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
  input: TCreateUpdateProjectInput;
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


export type TMutationCreateUpdateClusterLevelArgs = {
  input: TCreateUpdateClusterLevelInput;
};


export type TMutationDeleteClusterLevelArgs = {
  id?: Maybe<Scalars['UUID']>;
};


export type TMutationCreateUpdateSopsArgs = {
  id?: Maybe<Scalars['UUID']>;
  sopsData: TSopsInputType;
};


export type TMutationDeleteSopsArgs = {
  id?: Maybe<Scalars['UUID']>;
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

export type TErrorType = {
  __typename?: 'ErrorType';
  field: Scalars['String'];
  messages: Array<Scalars['String']>;
};

export type TCreateOrganizationMemberInvitation = {
  __typename?: 'CreateOrganizationMemberInvitation';
  ok?: Maybe<Scalars['Boolean']>;
};

export type TRevokeOrganizationMemberInvitation = {
  __typename?: 'RevokeOrganizationMemberInvitation';
  ok?: Maybe<Scalars['Boolean']>;
};

export type TUpdateOrganizationMemberInvitation = {
  __typename?: 'UpdateOrganizationMemberInvitation';
  ok?: Maybe<Scalars['Boolean']>;
};

export enum TOrganizationMemberRoleEnum {
  Admin = 'admin',
  Member = 'member'
}

export type TUpdateOrganizationMember = {
  __typename?: 'UpdateOrganizationMember';
  ok?: Maybe<Scalars['Boolean']>;
};

export type TDeleteOrganizationMember = {
  __typename?: 'DeleteOrganizationMember';
  ok?: Maybe<Scalars['Boolean']>;
};

export type TCreateUpdateProjectInput = {
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  specRepository: Scalars['String'];
  specRepositoryBranch?: Maybe<Scalars['String']>;
  specType: Scalars['String'];
  currentCommit?: Maybe<Scalars['String']>;
  currentCommitDateTime?: Maybe<Scalars['DateTime']>;
  accessUsername?: Maybe<Scalars['String']>;
  accessToken?: Maybe<Scalars['String']>;
  organization: Scalars['UUID'];
  id?: Maybe<Scalars['ID']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type TCreateUpdateProjectPayload = {
  __typename?: 'CreateUpdateProjectPayload';
  project?: Maybe<TProjectNode>;
  errors?: Maybe<Array<Maybe<TErrorType>>>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export enum TProjectMemberRoleEnum {
  Admin = 'admin',
  Member = 'member'
}

export type TCreateProjectMember = {
  __typename?: 'CreateProjectMember';
  ok?: Maybe<Scalars['Boolean']>;
};

export type TDeleteProjectMember = {
  __typename?: 'DeleteProjectMember';
  ok?: Maybe<Scalars['Boolean']>;
};

export type TDeleteProject = {
  __typename?: 'DeleteProject';
  ok?: Maybe<Scalars['Boolean']>;
};

export type TCreateUpdateClusterLevelInput = {
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  package: Scalars['ID'];
  sopsCredentials?: Maybe<Scalars['ID']>;
  valuesPath?: Maybe<Scalars['String']>;
  valuesType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type TCreateUpdateClusterLevelPayload = {
  __typename?: 'CreateUpdateClusterLevelPayload';
  clusterLevel?: Maybe<TClusterLevelNode>;
  errors?: Maybe<Array<Maybe<TErrorType>>>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type TDeleteClusterLevel = {
  __typename?: 'DeleteClusterLevel';
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

export enum TSopsTypeEnum {
  Aws = 'aws',
  Pgp = 'pgp'
}

export type TCreateUpdateSops = {
  __typename?: 'CreateUpdateSOPS';
  ok?: Maybe<Scalars['Boolean']>;
};

export type TDeleteSops = {
  __typename?: 'DeleteSOPS';
  ok?: Maybe<Scalars['Boolean']>;
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


export type TOrganizationMembersQueryResult = { __typename?: 'Query', organization?: Maybe<{ __typename?: 'OrganizationNode', id: any, members?: Maybe<Array<Maybe<{ __typename?: 'OrganizationMember', user?: Maybe<{ __typename?: 'UserNode', id: any, familyName?: Maybe<string>, givenName?: Maybe<string> }> }>>> }> };

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


export type TProjectsQueryResult = { __typename?: 'Query', allProjects?: Maybe<{ __typename?: 'ProjectNodePage', totalCount?: Maybe<number>, results?: Maybe<Array<Maybe<{ __typename?: 'ProjectNode', title: string, description?: Maybe<string>, currentCommit: string, currentCommitDateTime?: Maybe<any>, id: any, organization?: Maybe<{ __typename?: 'OrganizationNode', id: any }>, members?: Maybe<Array<Maybe<{ __typename?: 'ProjectMember', role?: Maybe<string>, user?: Maybe<{ __typename?: 'UserNode', id: any, givenName?: Maybe<string>, familyName?: Maybe<string>, avatarImage?: Maybe<string>, email?: Maybe<string> }> }>>>, packages: Array<{ __typename?: 'PackageNode', title: string }>, sops?: Maybe<Array<Maybe<{ __typename?: 'AWSKMSNode', title: string, id: any } | { __typename?: 'PGPKeyNode', title: string, id: any }>>> }>>> }> };

export type TProjectDetailQueryVariables = Exact<{
  id?: Maybe<Scalars['UUID']>;
}>;


export type TProjectDetailQueryResult = { __typename?: 'Query', project?: Maybe<{ __typename?: 'ProjectNode', created: any, title: string, description?: Maybe<string>, id: any, specRepository: string, specRepositoryBranch?: Maybe<string>, specType: TProjectSpecType, currentCommit: string, currentCommitDateTime?: Maybe<any>, accessUsername: string, accessToken?: Maybe<string>, members?: Maybe<Array<Maybe<{ __typename?: 'ProjectMember', role?: Maybe<string>, user?: Maybe<{ __typename?: 'UserNode', id: any, givenName?: Maybe<string>, familyName?: Maybe<string>, avatarImage?: Maybe<string>, email?: Maybe<string> }> }>>>, packages: Array<{ __typename?: 'PackageNode', title: string, description?: Maybe<string>, type: string, namespace: string, id: any, fileInformation?: Maybe<Array<Maybe<{ __typename?: 'FileInformationNode', path?: Maybe<string>, encrypted?: Maybe<boolean> }>>>, deployments?: Maybe<Array<Maybe<{ __typename?: 'DeploymentNode', id: any, title: string, description?: Maybe<string>, isSwitchable: boolean, ports: string }>>>, clusterLevel?: Maybe<Array<Maybe<{ __typename?: 'ClusterLevelNode', title: string, description?: Maybe<string>, id: any, type: TClusterLevelType, valuesPath: string, valuesType?: Maybe<TClusterLevelValuesType>, package: { __typename?: 'PackageNode', id: any }, sopsCredentials?: Maybe<{ __typename?: 'AWSKMSNode', title: string, id: any } | { __typename?: 'PGPKeyNode', title: string, id: any }> }>>> }>, sops?: Maybe<Array<Maybe<{ __typename?: 'AWSKMSNode', title: string, description?: Maybe<string>, accessKey: string, secretAccessKey: string, id: any } | { __typename?: 'PGPKeyNode', title: string, description?: Maybe<string>, privateKey: string, id: any }>>> }> };

export type TProjectDetailOtherProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type TProjectDetailOtherProjectsQueryResult = { __typename?: 'Query', allProjects?: Maybe<{ __typename?: 'ProjectNodePage', results?: Maybe<Array<Maybe<{ __typename?: 'ProjectNode', title: string, id: any, currentCommitDateTime?: Maybe<any>, packages: Array<{ __typename?: 'PackageNode', title: string }> }>>> }> };

export type TCreateProjectMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  specRepository: Scalars['String'];
  specType: Scalars['String'];
  accessUsername: Scalars['String'];
  accessToken: Scalars['String'];
  specRepositoryBranch: Scalars['String'];
  organization: Scalars['UUID'];
}>;


export type TCreateProjectMutationResult = { __typename?: 'Mutation', createUpdateProject?: Maybe<{ __typename?: 'CreateUpdateProjectPayload', project?: Maybe<{ __typename?: 'ProjectNode', title: string, id: any }>, errors?: Maybe<Array<Maybe<{ __typename?: 'ErrorType', messages: Array<string>, field: string }>>> }> };

export type TUpdateProjectMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  specRepository: Scalars['String'];
  specType: Scalars['String'];
  accessUsername: Scalars['String'];
  accessToken: Scalars['String'];
  specRepositoryBranch: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  organization: Scalars['UUID'];
}>;


export type TUpdateProjectMutationResult = { __typename?: 'Mutation', createUpdateProject?: Maybe<{ __typename?: 'CreateUpdateProjectPayload', project?: Maybe<{ __typename?: 'ProjectNode', title: string, id: any }>, errors?: Maybe<Array<Maybe<{ __typename?: 'ErrorType', messages: Array<string>, field: string }>>> }> };

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

export type TCreateUpdateClusterLevelMutationVariables = Exact<{
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  package: Scalars['ID'];
  sopsCredentials?: Maybe<Scalars['ID']>;
  valuesPath?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
}>;


export type TCreateUpdateClusterLevelMutationResult = { __typename?: 'Mutation', createUpdateClusterLevel?: Maybe<{ __typename?: 'CreateUpdateClusterLevelPayload', clusterLevel?: Maybe<{ __typename?: 'ClusterLevelNode', title: string, id: any }>, errors?: Maybe<Array<Maybe<{ __typename?: 'ErrorType', field: string, messages: Array<string> }>>> }> };

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

export type TUserDetailQueryVariables = Exact<{
  id?: Maybe<Scalars['UUID']>;
}>;


export type TUserDetailQueryResult = { __typename?: 'Query', user?: Maybe<{ __typename?: 'UserNode', avatarImage?: Maybe<string>, email?: Maybe<string>, familyName?: Maybe<string>, givenName?: Maybe<string> }> };


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
      user {
        id
        familyName
        givenName
      }
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
      packages {
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
    id
    specRepository
    specRepositoryBranch
    specType
    currentCommit
    currentCommitDateTime
    accessUsername
    accessToken
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
    packages {
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
      clusterLevel {
        title
        description
        id
        package {
          id
        }
        type
        valuesPath
        valuesType
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
      packages {
        title
      }
    }
  }
}
    `;
export const CreateProject = gql`
    mutation CreateProject($title: String!, $description: String!, $specRepository: String!, $specType: String!, $accessUsername: String!, $accessToken: String!, $specRepositoryBranch: String!, $organization: UUID!) {
  createUpdateProject(input: {title: $title, description: $description, specRepository: $specRepository, specType: $specType, specRepositoryBranch: $specRepositoryBranch, accessUsername: $accessUsername, accessToken: $accessToken, organization: $organization}) {
    project {
      title
      id
    }
    errors {
      messages
      field
    }
  }
}
    `;
export const UpdateProject = gql`
    mutation UpdateProject($title: String!, $description: String!, $specRepository: String!, $specType: String!, $accessUsername: String!, $accessToken: String!, $specRepositoryBranch: String!, $id: ID, $organization: UUID!) {
  createUpdateProject(input: {title: $title, description: $description, specRepository: $specRepository, specType: $specType, specRepositoryBranch: $specRepositoryBranch, accessUsername: $accessUsername, accessToken: $accessToken, organization: $organization, id: $id}) {
    project {
      title
      id
    }
    errors {
      messages
      field
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
  createUpdateSops(sopsData: {title: $title, description: $description, sopsType: $sopsType, project: $project, secret1: $secret1, secret2: $secret2, secret3: $secret3}, id: $id) {
    ok
  }
}
    `;
export const CreateUpdateClusterLevel = gql`
    mutation createUpdateClusterLevel($title: String!, $description: String, $type: String!, $package: ID!, $sopsCredentials: ID, $valuesPath: String, $id: ID) {
  createUpdateClusterLevel(input: {title: $title, description: $description, type: $type, package: $package, sopsCredentials: $sopsCredentials, valuesPath: $valuesPath, id: $id}) {
    clusterLevel {
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