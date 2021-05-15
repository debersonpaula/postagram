import { useState } from 'react';
import { CreatePostMutation } from '../ApiGraphql';
import { queryGraphQL } from '../helpers/queryGraphQL';
import { Storage } from 'aws-amplify';
import { createPost } from '../graphql/mutations';
import crypto from 'crypto';

const initialState = {
  isSaving: false,
  isCompleted: false,
  isFailed: false,
};

export default function CreatePostService() {
  const [state, setState] = useState(initialState);

  const insertPost = async (param: CreatePostParam) => {
    setState({ ...initialState, isSaving: true });
    try {
      const post = await savePost(param);
      setState({ ...initialState, isCompleted: true });
      return post?.createPost?.id;
    } catch (error) {
      console.error(error);
      setState({ ...initialState, isFailed: true });
    }
  };

  return { ...state, insertPost };
}

interface CreatePostParam {
  description: string;
  image: File;
  location: string;
  name: string;
}

async function savePost(param: CreatePostParam) {
  const hash = crypto.randomBytes(12).toString('hex');
  const imageName = hash + '-' + param.image.name;
  await Storage.put(imageName, param.image);
  return await queryGraphQL<CreatePostMutation>({
    query: createPost,
    variables: { input: { ...param, image: imageName } },
  });
}
