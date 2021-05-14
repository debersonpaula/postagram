import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GetPosts from '../services/GetPosts';
import PostCard from './PostCard';
import PostCreate from './PostCreate';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    minHeight: '90vh',
  },
  postList: {
    minWidth: 300,
    '& > *': {
      marginBottom: theme.spacing(2),
    },
  },
}));

export default function Posts() {
  const classes = useStyles();
  const posts = GetPosts();

  return (
    <div className={classes.root}>
      <div className={classes.postList}>
        {posts.isLoading && <p>Loading...</p>}
        {posts.isFailed && <p>Error on Fetching Post data.</p>}
        {posts.isCompleted &&
          posts.result?.listPosts?.items?.map((post, key) => (
            <PostCard key={key} name={post?.name} createdAt={post?.createdAt} image={post?.image} />
          ))}
        <br />
        <br />
        <br />
        <PostCreate />
      </div>
    </div>
  );
}
