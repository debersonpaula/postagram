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
          result?.listPosts?.items?.forEach((item) => {
            if (item) {
              current.posts.push({
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
          return { ...current, isLoading: false, isCompleted: true };
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
