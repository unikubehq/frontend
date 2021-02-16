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
  _FieldSet: any;
};





export type TQuery = {
  __typename?: 'Query';
  users?: Maybe<Array<Maybe<TUserNode>>>;
  allUsers?: Maybe<Array<Maybe<TUserNode>>>;
  organizations?: Maybe<Array<Maybe<TOrganizationNode>>>;
};

export type TUserNode = {
  __typename?: 'UserNode';
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['UUID'];
};


export type TOrganizationNode = {
  __typename?: 'OrganizationNode';
  created: Scalars['DateTime'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};


export type TMutation = {
  __typename?: 'Mutation';
  createProject?: Maybe<TProjectMutationPayload>;
};


export type TMutationCreateProjectArgs = {
  input: TProjectMutationInput;
};

export type TProjectMutationInput = {
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  specRepository: Scalars['String'];
  specRepositoryBranch: Scalars['String'];
  specType: Scalars['String'];
  repoDir?: Maybe<Scalars['String']>;
  currentCommit?: Maybe<Scalars['String']>;
  accessUsername: Scalars['String'];
  accessToken: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type TProjectMutationPayload = {
  __typename?: 'ProjectMutationPayload';
  project?: Maybe<TProjectNode>;
  errors?: Maybe<Array<Maybe<TErrorType>>>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type TProjectNode = {
  __typename?: 'ProjectNode';
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  specRepository: Scalars['String'];
  specRepositoryBranch?: Maybe<Scalars['String']>;
  created: Scalars['DateTime'];
  specType: TProjectSpecType;
  repoDir: Scalars['String'];
  currentCommit: Scalars['String'];
  accessUsername: Scalars['String'];
  accessToken: Scalars['String'];
  applications: Array<TApplicationNode>;
};

export enum TProjectSpecType {
  Plain = 'PLAIN',
  Helm = 'HELM'
}

export type TApplicationNode = {
  __typename?: 'ApplicationNode';
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  project: TProjectNode;
  dirname: Scalars['String'];
  type: Scalars['String'];
  namespace: Scalars['String'];
  environments: Array<TClusterLevelNode>;
  deployments?: Maybe<Array<Maybe<TDeploymentNode>>>;
  clusterlevel?: Maybe<Array<Maybe<TClusterLevelNode>>>;
};


export type TApplicationNodeDeploymentsArgs = {
  level?: Maybe<Scalars['String']>;
  switchable?: Maybe<Scalars['Boolean']>;
};


export type TApplicationNodeClusterlevelArgs = {
  level?: Maybe<Scalars['String']>;
};

export type TClusterLevelNode = {
  __typename?: 'ClusterLevelNode';
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  application: TApplicationNode;
  type: TClusterLevelType;
  valuesPath: Scalars['String'];
  deployments: Array<TDeploymentNode>;
  specsUrl?: Maybe<Scalars['String']>;
};

export enum TClusterLevelType {
  Local = 'LOCAL',
  Remote = 'REMOTE'
}

export type TDeploymentNode = {
  __typename?: 'DeploymentNode';
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  ports: Scalars['String'];
  clusterlevel: TClusterLevelNode;
  isSwitchable: Scalars['Boolean'];
};

export type TErrorType = {
  __typename?: 'ErrorType';
  field: Scalars['String'];
  messages: Array<Scalars['String']>;
};


export type TOrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type TOrganizationsQueryResult = (
  { __typename?: 'Query' }
  & { results?: Maybe<Array<Maybe<(
    { __typename?: 'OrganizationNode' }
    & Pick<TOrganizationNode, 'title' | 'description'>
  )>>> }
);


export const OrganizationsQuery = gql`
    query OrganizationsQuery {
  allOrganizations {
    results {
        id
        title
        description
    }
  }
}
    `;