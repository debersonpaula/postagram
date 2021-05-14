import { useEffect, useState } from 'react';
import { CreatePostMutation } from '../ApiGraphql';
import { queryGraphQL } from '../helpers/queryGraphQL';
import { Storage } from 'aws-amplify';
import { createPost } from '../graphql/mutations';
import crypto from 'crypto';

const initialState = {
  isSaving: false,
  isCompleted: false,
  isFailed: false,
  save: (param: CreatePostParam) => {
    console.log('NOTHING');
  },
};

export default function CreatePostService() {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    setState((current) => ({
      ...current,
      save: (param) => {
        setState({ ...initialState, isSaving: true });
        savePost(param)
          .then(() => {
            setState({ ...initialState, isCompleted: true });
          })
          .catch((err) => {
            console.error(err);
            setState({ ...initialState, isFailed: true });
          });
      },
    }));
  }, []);

  return state;
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
  await queryGraphQL<CreatePostMutation>({
    query: createPost,
    variables: { input: { ...param, image: imageName } },
  });
}
