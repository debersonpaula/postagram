import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GetPostService from '../services/GetPostService';
import PostCard from './PostCard';
import PostCreate from './PostCreate';
import Loader from './Loader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      padding: theme.spacing(3),
    },
    postList: {
      '& > *': {
        marginBottom: theme.spacing(2),
      },
    },
  }),
  { name: PostBoard.name },
);

export default function PostBoard() {
  const classes = useStyles();
  const { isLoading, isCompleted, isFailed, posts, getAllPosts } = GetPostService();
  const [postNew, setPostNew] = useState(false);

  useEffect(() => {
    getAllPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAfterPostCreated = (postId: string) => {
    getAllPosts();
  };

  const renderPosts = () => {
    if (isCompleted) {
      if (posts.length === 0) {
        return (
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                No posts!!! Starting by create a new one!
              </Typography>
            </CardContent>
          </Card>
        );
      }
      return posts.map((post, key) => (
        <PostCard
          key={key}
          name={post.name}
          createdAt={post.createdAt}
          image={post.image}
          description={post.description}
          location={post.location}
        />
      ));
    }
    return;
  };

  return (
    <div className={classes.root}>
      <div>
        <Button variant="contained" onClick={() => setPostNew(true)}>
          Add Post
        </Button>
        <br />
        <br />
        <br />
      </div>
      <div className={classes.postList}>
        {postNew && (
          <PostCreate onClose={() => setPostNew(false)} onCreatePost={handleAfterPostCreated} />
        )}
        {isLoading && <Loader label="Loading posts..." />}
        {isFailed && <p>Error on Fetching Post data.</p>}
        {renderPosts()}
      </div>
    </div>
  );
}
