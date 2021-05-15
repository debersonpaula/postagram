import { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      backgroundColor: theme.palette.grey['500'],
    },
  }),
  { name: ScreenWrapper.name },
);

export default function ScreenWrapper(props: { children: ReactNode }) {
  const classes = useStyles();

  return <div className={classes.root}>{props.children}</div>;
}
