import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import GetImage from '../services/GetImage';

const useStyles = makeStyles(
  (theme) => ({
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
  }),
  { name: PostCard.name },
);

export default function PostCard(props: PostCardProps) {
  const classes = useStyles();
  const image = GetImage(props.image);
  return (
    <Card>
      <CardHeader title={props.name} subheader={props.createdAt} />
      {image && <CardMedia className={classes.media} image={image} />}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.description}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          From: {props.location}
        </Typography>
      </CardContent>
    </Card>
  );
}

interface PostCardProps {
  name: string;
  createdAt: string;
  image?: string;
  location: string;
  description: string;
}
