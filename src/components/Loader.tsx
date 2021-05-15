import React from 'react';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 16,
      paddingBottom: 16,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '100%',

      '&::before': {
        content: '" "',
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        WebkitTapHighlightColor: 'transparent',
      },
    },
    loadPanel: {
      textAlign: 'center',
    },
    loadPanelWithBackdrop: {
      zIndex: theme.zIndex.drawer + 2,
      color: '#fff',
    },
  }),
  { name: Loader.name },
);

export default function Loader(props: LoaderProps) {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, props.overrideParent && classes.backdrop)}>
      <div
        className={clsx(classes.loadPanel, props.overrideParent && classes.loadPanelWithBackdrop)}
      >
        <CircularProgress color="inherit" />
        <Typography variant="h6">{props.label || 'Loading...'}</Typography>
      </div>
    </div>
  );
}

interface LoaderProps {
  overrideParent?: boolean;
  label?: string;
}
