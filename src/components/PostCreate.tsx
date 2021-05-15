import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import CreatePostService from '../services/CreatePostService';
import { DynamicForm } from './DynamicForm';
import Loader from './Loader';

export default function PostCreate() {
  const postCreation = CreatePostService();

  const handleOnSubmit = (values: any) => {
    if (postCreation.save) {
      postCreation.save(values);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Create a post:
        </Typography>

        <DynamicForm
          labelSubmit="Save"
          fields={[
            { label: 'Post name', name: 'name' },
            { label: 'Location', name: 'location' },
            { label: 'Description', name: 'description' },
            { label: 'Image', name: 'image', type: 'file' },
          ]}
          onSubmit={handleOnSubmit}
        />
      </CardContent>
      <Loader />
    </Card>
  );
}
