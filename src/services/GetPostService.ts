import { useState } from 'react';
import convertDate from '../helpers/convertDate';
import { ListPostsQuery } from '../ApiGraphql';
import { listPosts } from '../graphql/queries';
import { queryGraphQL } from '../helpers/queryGraphQL';

const initialState = {
  isLoading: false,
  isCompleted: false,
  isFailed: false,
  posts: [] as PostData[],
};

export default function GetPostService() {
  const [state, setState] = useState(initialState);

  const getAllPosts = () => {
    setState({ ...initialState, isLoading: true });
    queryGraphQL<ListPostsQuery>({
      query: listPosts,
      variables: { limit: 100 },
    })
      .then((result) => {
        setState((current) => {
          const sortedPosts =
            result?.listPosts?.items?.sort((a, b) => {
              if (a && b) {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
              }
              return 0;
            }) || [];

          const posts: PostData[] = [];

          sortedPosts.forEach((item) => {
            if (item) {
              posts.push({
                id: item.id,
                name: item.name,
                location: item.location,
                description: item.description,
                image: item.image || '',
                createdAt: convertDate(item.createdAt),
                updatedAt: convertDate(item.updatedAt),
              });
            }
          });
          return { isLoading: false, isCompleted: true, isFailed: false, posts };
        });
      })
      .catch(() => {
        setState((current) => ({ ...current, isLoading: false, isCompleted: true }));
      });
  };

  return { ...state, getAllPosts };
}

type PostData = {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};
