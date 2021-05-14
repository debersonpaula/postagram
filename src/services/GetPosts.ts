import { ListPostsQuery } from '../ApiGraphql';
import { listPosts } from '../graphql/queries';
import { queryGraphQL } from '../helpers/queryGraphQL';
import { useLogicPromises } from '../hooks/useLogicPromises';

export default function GetPosts() {
  return useLogicPromises(() =>
    queryGraphQL<ListPostsQuery>({
      query: listPosts,
      variables: { limit: 100 },
    }),
  );
}
