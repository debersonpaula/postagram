import { API } from 'aws-amplify';

export async function queryGraphQL<T>(options: GraphQLOptions) {
  let result = (await API.graphql(options)) as GraphQLResult<T>;
  return result.data;
}

interface GraphQLOptions {
  query: string;
  variables?: object;
  authMode?: GRAPHQL_AUTH_MODE;
}
declare enum GRAPHQL_AUTH_MODE {
  API_KEY = 'API_KEY',
  AWS_IAM = 'AWS_IAM',
  OPENID_CONNECT = 'OPENID_CONNECT',
  AMAZON_COGNITO_USER_POOLS = 'AMAZON_COGNITO_USER_POOLS',
}
interface GraphQLResult<T = object> {
  data?: T;
}
