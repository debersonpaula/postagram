import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import convertDate from '../helpers/convertDate';
import GetImage from '../services/GetImage';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

export default function PostCard(props: Partial<PostCardProps>) {
  const classes = useStyles();
  // console.log(props.image);
  const image = GetImage(props.image);
  return (
    <Card>
      <CardHeader title={props.name} subheader={convertDate(props.createdAt)} />
      {image && <CardMedia className={classes.media} image={image} />}
    </Card>
  );
}

interface PostCardProps {
  name: string;
  createdAt: string;
  image: string | null;
}
