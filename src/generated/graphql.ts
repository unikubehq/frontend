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
  allPackages?: Maybe<TPackageNodePage>;
  allClusterLevels?: Maybe<TClusterLevelNodePage>;
  allDeployments?: Maybe<TDeploymentNodePage>;
  allSOPSProvider?: Maybe<TSopsProviderNodePage>;
  package?: Maybe<TPackageNode>;
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


export type TQueryAllPackagesArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type TQueryAllClusterLevelsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type TQueryAllDeploymentsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type TQueryAllSopsProviderArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type TQueryPackageArgs = {
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
  projects?: Maybe<TProjectNodePage>;
};


export type TOrganizationNodeProjectsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
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
  created: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  id: Scalars['UUID'];
  specRepository: Scalars['String'];
  specRepositoryBranch?: Maybe<Scalars['String']>;
  specType: TProjectSpecType;
  repoDir: Scalars['String'];
  currentCommit: Scalars['String'];
  accessUsername: Scalars['String'];
  accessToken: Scalars['String'];
  members: Array<TProjectUserNode>;
  creator?: Maybe<TUserNode>;
  packages?: Maybe<TPackageNodePage>;
};


export type TProjectNodePackagesArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export enum TProjectSpecType {
  Plain = 'PLAIN',
  Helm = 'HELM'
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

export type TPackageNodePage = {
  __typename?: 'PackageNodePage';
  totalCount?: Maybe<Scalars['Int']>;
  resultCount?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  results?: Maybe<Array<Maybe<TPackageNode>>>;
};

export type TPackageNode = {
  __typename?: 'PackageNode';
  created: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  id: Scalars['UUID'];
  project: TProjectNode;
  dirname: Scalars['String'];
  type: Scalars['String'];
  namespace: Scalars['String'];
  environments: Array<TClusterLevelNode>;
};

export type TClusterLevelNode = {
  __typename?: 'ClusterLevelNode';
  created: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  package: TPackageNode;
  type: TClusterLevelType;
  valuesPath: Scalars['String'];
  sopsCredentials?: Maybe<TSopsProviderNode>;
  deployments: Array<TDeploymentNode>;
};

export enum TClusterLevelType {
  Local = 'LOCAL',
  Remote = 'REMOTE'
}

export type TSopsProviderNode = {
  __typename?: 'SOPSProviderNode';
  created: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  id: Scalars['ID'];
  username: Scalars['String'];
  clusterlevelSet: Array<TClusterLevelNode>;
};

export type TDeploymentNode = {
  __typename?: 'DeploymentNode';
  created: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  ports: Scalars['String'];
  clusterlevel: TClusterLevelNode;
  isSwitchable: Scalars['Boolean'];
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

export type TClusterLevelNodePage = {
  __typename?: 'ClusterLevelNodePage';
  totalCount?: Maybe<Scalars['Int']>;
  resultCount?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  results?: Maybe<Array<Maybe<TClusterLevelNode>>>;
};

export type TDeploymentNodePage = {
  __typename?: 'DeploymentNodePage';
  totalCount?: Maybe<Scalars['Int']>;
  resultCount?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  results?: Maybe<Array<Maybe<TDeploymentNode>>>;
};

export type TSopsProviderNodePage = {
  __typename?: 'SOPSProviderNodePage';
  totalCount?: Maybe<Scalars['Int']>;
  resultCount?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  results?: Maybe<Array<Maybe<TSopsProviderNode>>>;
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


export type TOrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type TOrganizationsQueryResult = (
  { __typename?: 'Query' }
  & { allOrganizations?: Maybe<(
    { __typename?: 'OrganizationNodePage' }
    & { results?: Maybe<Array<Maybe<(
      { __typename?: 'OrganizationNode' }
      & Pick<TOrganizationNode, '[object Object]' | '[object Object]' | '[object Object]'>
    )>>> }
  )> }
);

export type TProjectsQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}>;


export type TProjectsQueryResult = (
  { __typename?: 'Query' }
  & { allProjects?: Maybe<(
    { __typename?: 'ProjectNodePage' }
    & Pick<TProjectNodePage, '[object Object]'>
    & { results?: Maybe<Array<Maybe<(
      { __typename?: 'ProjectNode' }
      & Pick<TProjectNode, '[object Object]' | '[object Object]' | '[object Object]' | '[object Object]' | '[object Object]' | '[object Object]'>
      & { packages?: Maybe<(
        { __typename?: 'PackageNodePage' }
        & Pick<TPackageNodePage, '[object Object]'>
      )>, members: Array<(
        { __typename?: 'ProjectUserNode' }
        & { user?: Maybe<(
          { __typename?: 'UserNode' }
          & Pick<TUserNode, '[object Object]' | '[object Object]' | '[object Object]'>
        )> }
      )> }
    )>>> }
  )> }
);

export type TProjectDetailQueryVariables = Exact<{
  slug?: Maybe<Scalars['String']>;
}>;


export type TProjectDetailQueryResult = (
  { __typename?: 'Query' }
  & { project?: Maybe<(
    { __typename?: 'ProjectNode' }
    & Pick<TProjectNode, '[object Object]' | '[object Object]' | '[object Object]' | '[object Object]' | '[object Object]' | '[object Object]' | '[object Object]' | '[object Object]' | '[object Object]' | '[object Object]' | '[object Object]' | '[object Object]' | '[object Object]'>
    & { creator?: Maybe<(
      { __typename?: 'UserNode' }
      & Pick<TUserNode, '[object Object]' | '[object Object]'>
    )>, members: Array<(
      { __typename?: 'ProjectUserNode' }
      & Pick<TProjectUserNode, '[object Object]'>
      & { user?: Maybe<(
        { __typename?: 'UserNode' }
        & Pick<TUserNode, '[object Object]' | '[object Object]' | '[object Object]'>
      )> }
    )>, packages?: Maybe<(
      { __typename?: 'PackageNodePage' }
      & Pick<TPackageNodePage, '[object Object]'>
      & { results?: Maybe<Array<Maybe<(
        { __typename?: 'PackageNode' }
        & Pick<TPackageNode, '[object Object]' | '[object Object]' | '[object Object]' | '[object Object]' | '[object Object]' | '[object Object]'>
        & { environments: Array<(
          { __typename?: 'ClusterLevelNode' }
          & { deployments: Array<(
            { __typename?: 'DeploymentNode' }
            & Pick<TDeploymentNode, '[object Object]' | '[object Object]'>
          )> }
        )> }
      )>>> }
    )> }
  )> }
);

export type TProjectDetailOtherProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type TProjectDetailOtherProjectsQueryResult = (
  { __typename?: 'Query' }
  & { allProjects?: Maybe<(
    { __typename?: 'ProjectNodePage' }
    & { results?: Maybe<Array<Maybe<(
      { __typename?: 'ProjectNode' }
      & Pick<TProjectNode, '[object Object]' | '[object Object]' | '[object Object]' | '[object Object]'>
      & { packages?: Maybe<(
        { __typename?: 'PackageNodePage' }
        & Pick<TPackageNodePage, '[object Object]'>
      )> }
    )>>> }
  )> }
);

export type TCreateProjectMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  specRepository: Scalars['String'];
  specType: Scalars['String'];
  accessUsername: Scalars['String'];
  accessToken: Scalars['String'];
  specRepositoryBranch: Scalars['String'];
}>;


export type TCreateProjectMutationResult = (
  { __typename?: 'Mutation' }
  & { createUpdateProject?: Maybe<(
    { __typename?: 'CreateUpdateProjectPayload' }
    & { project?: Maybe<(
      { __typename?: 'ProjectNode' }
      & Pick<TProjectNode, '[object Object]'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ErrorType' }
      & Pick<TErrorType, '[object Object]' | '[object Object]'>
    )>>> }
  )> }
);

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


export type TUpdateProjectMutationResult = (
  { __typename?: 'Mutation' }
  & { createUpdateProject?: Maybe<(
    { __typename?: 'CreateUpdateProjectPayload' }
    & { project?: Maybe<(
      { __typename?: 'ProjectNode' }
      & Pick<TProjectNode, '[object Object]'>
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'ErrorType' }
      & Pick<TErrorType, '[object Object]' | '[object Object]'>
    )>>> }
  )> }
);

export type TDeleteProjectMutationVariables = Exact<{
  id?: Maybe<Scalars['UUID']>;
}>;


export type TDeleteProjectMutationResult = (
  { __typename?: 'Mutation' }
  & { deleteProject?: Maybe<(
    { __typename?: 'DeleteProject' }
    & Pick<TDeleteProject, '[object Object]'>
  )> }
);


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
        resultCount
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
      user {
        firstName
        lastName
        avatar
      }
      role
    }
    packages {
      totalCount
      results {
        modified
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
        totalCount
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