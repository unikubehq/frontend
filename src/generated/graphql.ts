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
  UUID: any;
  _FieldSet: any;
};





export type TQuery = {
  __typename?: 'Query';
  allUsers?: Maybe<TUserNodePage>;
  allOrganizations?: Maybe<TOrganizationNodePage>;
  myOrganization?: Maybe<TOrganizationNode>;
  allProjects?: Maybe<TProjectNodePage>;
  project?: Maybe<TProjectNode>;
  assets?: Maybe<TPleaseRemoveMeNode>;
  audits?: Maybe<TPleaseRemoveMeNode>;
  payments?: Maybe<TPleaseRemoveMeNode>;
  collaborations?: Maybe<TPleaseRemoveMeNode>;
};


export type TQueryAllUsersArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type TQueryAllOrganizationsArgs = {
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

export type TUserNodePage = {
  __typename?: 'UserNodePage';
  totalCount?: Maybe<Scalars['Int']>;
  resultCount?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  results?: Maybe<Array<Maybe<TUserNode>>>;
};

export type TUserNode = {
  __typename?: 'UserNode';
  password: Scalars['String'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  isSuperuser: Scalars['Boolean'];
  created: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  id: Scalars['UUID'];
  email: Scalars['String'];
  salutation: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  avatar: Scalars['String'];
  isStaff: Scalars['Boolean'];
  isActive: Scalars['Boolean'];
  organizations: Array<TOrganizationUserNode>;
  settings: Array<TUserSettingsNode>;
};



export type TOrganizationUserNode = {
  __typename?: 'OrganizationUserNode';
  created: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  id: Scalars['UUID'];
  organization: TOrganizationNode;
  user: TUserNode;
  role: TOrganizationUserRole;
};

export type TOrganizationNode = {
  __typename?: 'OrganizationNode';
  created: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  id: Scalars['UUID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  invoiceTaxAddress?: Maybe<TAddressNode>;
  primaryAddress?: Maybe<TAddressNode>;
  avatarUrl?: Maybe<Scalars['String']>;
  members: Array<TOrganizationUserNode>;
};

export type TAddressNode = {
  __typename?: 'AddressNode';
  id: Scalars['ID'];
  streetNumber: Scalars['String'];
  route: Scalars['String'];
  locality?: Maybe<TLocalityNode>;
  raw: Scalars['String'];
  formatted: Scalars['String'];
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  invoiceAddress: Array<TOrganizationNode>;
  primaryAddress: Array<TOrganizationNode>;
};

export type TLocalityNode = {
  __typename?: 'LocalityNode';
  id: Scalars['ID'];
  name: Scalars['String'];
  postalCode: Scalars['String'];
  state: TStateNode;
  addresses: Array<TAddressNode>;
};

export type TStateNode = {
  __typename?: 'StateNode';
  id: Scalars['ID'];
  name: Scalars['String'];
  code: Scalars['String'];
  country: TCountryNode;
  localities: Array<TLocalityNode>;
};

export type TCountryNode = {
  __typename?: 'CountryNode';
  id: Scalars['ID'];
  name: Scalars['String'];
  code: Scalars['String'];
  states: Array<TStateNode>;
};

export enum TOrganizationUserRole {
  Admin = 'ADMIN',
  Member = 'MEMBER'
}

export type TUserSettingsNode = {
  __typename?: 'UserSettingsNode';
  created: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  id: Scalars['UUID'];
  user: TUserNode;
  notifications: TNotificationSettingsNode;
};

export type TNotificationSettingsNode = {
  __typename?: 'NotificationSettingsNode';
  created: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  id: Scalars['UUID'];
  projectAdd: Scalars['Boolean'];
  projectEdit: Scalars['Boolean'];
  projectDelete: Scalars['Boolean'];
  memberAdd: Scalars['Boolean'];
  memberEdit: Scalars['Boolean'];
  memberDelete: Scalars['Boolean'];
  invitationAccept: Scalars['Boolean'];
  invitationDecline: Scalars['Boolean'];
  usersettings?: Maybe<TUserSettingsNode>;
};

export type TOrganizationNodePage = {
  __typename?: 'OrganizationNodePage';
  totalCount?: Maybe<Scalars['Int']>;
  resultCount?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  results?: Maybe<Array<Maybe<TOrganizationNode>>>;
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
  __typename?: 'ProjectNode';
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  created: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  slug: Scalars['String'];
  id: Scalars['UUID'];
  specRepository: Scalars['String'];
  specRepositoryBranch?: Maybe<Scalars['String']>;
  specType: TProjectSpecType;
  repoDir: Scalars['String'];
  currentCommit: Scalars['String'];
  currentCommitDateTime?: Maybe<Scalars['DateTime']>;
  repositoryStatus: TProjectRepositoryStatus;
  accessUsername: Scalars['String'];
  accessToken: Scalars['String'];
  organization?: Maybe<TOrganizationNode>;
  members: Array<TProjectUserNode>;
  packages: Array<TPackageNode>;
  creator?: Maybe<TUserNode>;
  sops?: Maybe<Array<Maybe<TSopsProviderNode>>>;
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

export type TProjectUserNode = {
  __typename?: 'ProjectUserNode';
  created: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  id: Scalars['UUID'];
  project: TProjectNode;
  user?: Maybe<TUserNode>;
  role: TProjectUserRole;
  creator: Scalars['Boolean'];
};

export enum TProjectUserRole {
  Admin = 'ADMIN',
  Member = 'MEMBER'
}

export type TPackageNode = {
  __typename?: 'PackageNode';
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  project: TProjectNode;
  dirPath: Scalars['String'];
  type: Scalars['String'];
  namespace: Scalars['String'];
  hash: Scalars['String'];
  fileInformation?: Maybe<Array<Maybe<TFileInformationNode>>>;
  environments: Array<TClusterLevelNode>;
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
  __typename?: 'FileInformationNode';
  path?: Maybe<Scalars['String']>;
  encrypted?: Maybe<Scalars['Boolean']>;
};

export type TClusterLevelNode = {
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
  __typename?: 'AWSKMSNode';
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

export type TPgpKeyNode = {
  __typename?: 'PGPKeyNode';
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

export type TDeploymentNode = {
  __typename?: 'DeploymentNode';
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  ports: Scalars['String'];
  clusterLevel: TClusterLevelNode;
  isSwitchable: Scalars['Boolean'];
};

export type TPleaseRemoveMeNode = {
  __typename?: 'PleaseRemoveMeNode';
  text?: Maybe<Scalars['String']>;
};

export type TMutation = {
  __typename?: 'Mutation';
  upsertOrganization?: Maybe<TUpsertOrganizationPayload>;
  createUpdateProject?: Maybe<TCreateUpdateProjectPayload>;
  deleteProject?: Maybe<TDeleteProject>;
  createUpdateClusterLevel?: Maybe<TCreateUpdateClusterLevelPayload>;
  deleteClusterLevel?: Maybe<TDeleteClusterLevel>;
  createUpdateSops?: Maybe<TCreateUpdateSops>;
  deleteSops?: Maybe<TDeleteSops>;
};


export type TMutationUpsertOrganizationArgs = {
  input: TUpsertOrganizationInput;
};


export type TMutationCreateUpdateProjectArgs = {
  input: TCreateUpdateProjectInput;
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
  sopsData: TSopsInputType;
};


export type TMutationDeleteSopsArgs = {
  id?: Maybe<Scalars['UUID']>;
};

export type TUpsertOrganizationInput = {
  id?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  avatarUrl?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type TUpsertOrganizationPayload = {
  __typename?: 'UpsertOrganizationPayload';
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<Maybe<TErrorType>>>;
  success?: Maybe<Scalars['Boolean']>;
  code?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  instance?: Maybe<TOrganizationNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type TErrorType = {
  __typename?: 'ErrorType';
  field: Scalars['String'];
  messages: Array<Scalars['String']>;
};

export type TCreateUpdateProjectInput = {
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  specRepository: Scalars['String'];
  specRepositoryBranch: Scalars['String'];
  specType: Scalars['String'];
  currentCommit?: Maybe<Scalars['String']>;
  accessUsername: Scalars['String'];
  accessToken: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type TCreateUpdateProjectPayload = {
  __typename?: 'CreateUpdateProjectPayload';
  project?: Maybe<TProjectNode>;
  errors?: Maybe<Array<Maybe<TErrorType>>>;
  clientMutationId?: Maybe<Scalars['String']>;
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
  id?: Maybe<Scalars['UUID']>;
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  sopsType: TSopsTypeEnum;
  project: Scalars['UUID'];
  secret1: Scalars['String'];
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


export type TOrganizationsQueryResult = { __typename?: 'Query', allOrganizations?: Maybe<{ __typename?: 'OrganizationNodePage', results?: Maybe<Array<Maybe<{ __typename?: 'OrganizationNode', title: string, avatarUrl?: Maybe<string>, id: any }>>> }> };

export type TCreateOrganizationMutationVariables = Exact<{
  title: Scalars['String'];
}>;


export type TCreateOrganizationMutationResult = { __typename?: 'Mutation', upsertOrganization?: Maybe<{ __typename?: 'UpsertOrganizationPayload', title?: Maybe<string>, id?: Maybe<string>, success?: Maybe<boolean>, errors?: Maybe<Array<Maybe<{ __typename?: 'ErrorType', field: string, messages: Array<string> }>>> }> };

export type TProjectsQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}>;


export type TProjectsQueryResult = { __typename?: 'Query', allProjects?: Maybe<{ __typename?: 'ProjectNodePage', totalCount?: Maybe<number>, results?: Maybe<Array<Maybe<{ __typename?: 'ProjectNode', title: string, modified: any, description?: Maybe<string>, currentCommit: string, id: any, slug: string, packages: Array<{ __typename?: 'PackageNode', title: string }>, sops?: Maybe<Array<Maybe<{ __typename?: 'AWSKMSNode', title: string, id: any } | { __typename?: 'PGPKeyNode', title: string, id: any }>>>, members: Array<{ __typename?: 'ProjectUserNode', user?: Maybe<{ __typename?: 'UserNode', firstName: string, lastName: string, avatar: string }> }> }>>> }> };

export type TProjectDetailQueryVariables = Exact<{
  slug?: Maybe<Scalars['String']>;
}>;


export type TProjectDetailQueryResult = { __typename?: 'Query', project?: Maybe<{ __typename?: 'ProjectNode', created: any, modified: any, title: string, description?: Maybe<string>, slug: string, id: any, specRepository: string, specRepositoryBranch?: Maybe<string>, specType: TProjectSpecType, repoDir: string, currentCommit: string, accessUsername: string, accessToken: string, creator?: Maybe<{ __typename?: 'UserNode', firstName: string, lastName: string }>, members: Array<{ __typename?: 'ProjectUserNode', id: any, role: TProjectUserRole, user?: Maybe<{ __typename?: 'UserNode', firstName: string, lastName: string, avatar: string, lastLogin?: Maybe<any>, email: string }> }>, packages: Array<{ __typename?: 'PackageNode', title: string, description?: Maybe<string>, type: string, namespace: string, id: any, environments: Array<{ __typename?: 'ClusterLevelNode', deployments: Array<{ __typename?: 'DeploymentNode', title: string, id: any }> }>, clusterLevel?: Maybe<Array<Maybe<{ __typename?: 'ClusterLevelNode', title: string, description?: Maybe<string>, id: any, type: TClusterLevelType, valuesPath: string, valuesType?: Maybe<TClusterLevelValuesType>, package: { __typename?: 'PackageNode', id: any }, sopsCredentials?: Maybe<{ __typename?: 'AWSKMSNode', title: string, id: any } | { __typename?: 'PGPKeyNode', title: string, id: any }> }>>> }>, sops?: Maybe<Array<Maybe<{ __typename?: 'AWSKMSNode', title: string, description?: Maybe<string>, id: any } | { __typename?: 'PGPKeyNode', title: string, description?: Maybe<string>, id: any }>>> }> };

export type TProjectDetailOtherProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type TProjectDetailOtherProjectsQueryResult = { __typename?: 'Query', allProjects?: Maybe<{ __typename?: 'ProjectNodePage', results?: Maybe<Array<Maybe<{ __typename?: 'ProjectNode', title: string, modified: any, slug: string, id: any, packages: Array<{ __typename?: 'PackageNode', title: string }> }>>> }> };

export type TCreateProjectMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  specRepository: Scalars['String'];
  specType: Scalars['String'];
  accessUsername: Scalars['String'];
  accessToken: Scalars['String'];
  specRepositoryBranch: Scalars['String'];
}>;


export type TCreateProjectMutationResult = { __typename?: 'Mutation', createUpdateProject?: Maybe<{ __typename?: 'CreateUpdateProjectPayload', project?: Maybe<{ __typename?: 'ProjectNode', title: string }>, errors?: Maybe<Array<Maybe<{ __typename?: 'ErrorType', messages: Array<string>, field: string }>>> }> };

export type TUpdateProjectMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  specRepository: Scalars['String'];
  specType: Scalars['String'];
  accessUsername: Scalars['String'];
  accessToken: Scalars['String'];
  specRepositoryBranch: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
}>;


export type TUpdateProjectMutationResult = { __typename?: 'Mutation', createUpdateProject?: Maybe<{ __typename?: 'CreateUpdateProjectPayload', project?: Maybe<{ __typename?: 'ProjectNode', title: string }>, errors?: Maybe<Array<Maybe<{ __typename?: 'ErrorType', messages: Array<string>, field: string }>>> }> };

export type TDeleteProjectMutationVariables = Exact<{
  id?: Maybe<Scalars['UUID']>;
}>;


export type TDeleteProjectMutationResult = { __typename?: 'Mutation', deleteProject?: Maybe<{ __typename?: 'DeleteProject', ok?: Maybe<boolean> }> };

export type TCreateUpdateSopsMutationVariables = Exact<{
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  sopsType: TSopsTypeEnum;
  project: Scalars['UUID'];
  secret1: Scalars['String'];
  secret2?: Maybe<Scalars['String']>;
  secret3?: Maybe<Scalars['String']>;
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

export type TAllUsersQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}>;


export type TAllUsersQueryResult = { __typename?: 'Query', allUsers?: Maybe<{ __typename?: 'UserNodePage', totalCount?: Maybe<number>, results?: Maybe<Array<Maybe<{ __typename?: 'UserNode', lastLogin?: Maybe<any>, firstName: string, lastName: string, email: string, avatar: string, id: any, organizations: Array<{ __typename?: 'OrganizationUserNode', role: TOrganizationUserRole, organization: { __typename?: 'OrganizationNode', title: string } }> }>>> }> };


export const OrganizationsQuery = gql`
    query OrganizationsQuery {
  allOrganizations(limit: 3) {
    results {
      title
      avatarUrl
      id
    }
  }
}
    `;
export const CreateOrganizationMutation = gql`
    mutation CreateOrganizationMutation($title: String!) {
  upsertOrganization(input: {title: $title}) {
    title
    id
    success
    errors {
      field
      messages
    }
  }
}
    `;
export const ProjectsQuery = gql`
    query ProjectsQuery($limit: Int, $offset: Int) {
  allProjects(limit: $limit, offset: $offset) {
    totalCount
    results {
      title
      modified
      description
      currentCommit
      id
      slug
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
      members {
        user {
          firstName
          lastName
          avatar
        }
      }
    }
  }
}
    `;
export const ProjectDetailQuery = gql`
    query ProjectDetailQuery($slug: String) {
  project(slug: $slug) {
    created
    modified
    title
    description
    slug
    id
    specRepository
    specRepositoryBranch
    specType
    repoDir
    currentCommit
    accessUsername
    accessToken
    creator {
      firstName
      lastName
    }
    members {
      id
      user {
        firstName
        lastName
        avatar
        lastLogin
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
      environments {
        deployments {
          title
          id
        }
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
        id
      }
      ... on PGPKeyNode {
        title
        description
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
      modified
      slug
      id
      packages {
        title
      }
    }
  }
}
    `;
export const CreateProject = gql`
    mutation CreateProject($title: String!, $description: String!, $specRepository: String!, $specType: String!, $accessUsername: String!, $accessToken: String!, $specRepositoryBranch: String!) {
  createUpdateProject(input: {title: $title, description: $description, specRepository: $specRepository, specType: $specType, specRepositoryBranch: $specRepositoryBranch, accessUsername: $accessUsername, accessToken: $accessToken}) {
    project {
      title
    }
    errors {
      messages
      field
    }
  }
}
    `;
export const UpdateProject = gql`
    mutation UpdateProject($title: String!, $description: String!, $specRepository: String!, $specType: String!, $accessUsername: String!, $accessToken: String!, $specRepositoryBranch: String!, $id: ID) {
  createUpdateProject(input: {title: $title, description: $description, specRepository: $specRepository, specType: $specType, specRepositoryBranch: $specRepositoryBranch, accessUsername: $accessUsername, accessToken: $accessToken, id: $id}) {
    project {
      title
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
    mutation createUpdateSops($title: String!, $description: String, $sopsType: SOPSTypeEnum!, $project: UUID!, $secret1: String!, $secret2: String, $secret3: String) {
  createUpdateSops(sopsData: {title: $title, description: $description, sopsType: $sopsType, project: $project, secret1: $secret1, secret2: $secret2, secret3: $secret3}) {
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
export const AllUsersQuery = gql`
    query allUsersQuery($limit: Int, $offset: Int) {
  allUsers(limit: $limit, offset: $offset) {
    totalCount
    results {
      lastLogin
      firstName
      lastName
      email
      avatar
      organizations {
        organization {
          title
        }
        role
      }
      id
    }
  }
}
    `;