import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import convertDate from '../helpers/convertDate';

export default function PostCard(props: Partial<PostCardProps>) {
  return (
    <Card>
      <CardHeader title={props.name} subheader={convertDate(props.createdAt)} />
    </Card>
  );
}

interface PostCardProps {
  name: string;
  createdAt: string;
}
