import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CreatePostService from '../services/CreatePostService';
import DynamicForm from './DynamicForm';
import Loader from './Loader';
import Typography from '@material-ui/core/Typography';

export default function PostCreate(props: IProps) {
  const postCreation = CreatePostService();

  const handleOnSubmit = (values: any) => {
    postCreation.insertPost(values).then((postId) => {
      if (postId) {
        props.onCreatePost(postId);
      }
      props.onClose();
    });
  };

  return (
    <Card style={{ position: 'relative' }}>
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
          onCancel={props.onClose}
        />
      </CardContent>
      {postCreation.isSaving && <Loader overrideParent={true} />}
      {postCreation.isFailed && (
        <CardContent>
          <Typography variant="h5" component="h2" style={{ color: 'red' }}>
            Error on post saving. Try again!!!
          </Typography>
        </CardContent>
      )}
    </Card>
  );
}

interface IProps {
  onClose: () => void;
  onCreatePost: (postId: string) => void;
}
