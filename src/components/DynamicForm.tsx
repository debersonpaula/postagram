import { ChangeEvent, FormEvent, useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
  { name: DynamicForm.name },
);

export default function DynamicForm(props: IDynamicFormProps) {
  const classes = useStyles();
  let [data, setData] = useState<Record<string, any>>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit(data);
  };

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const name = ev.target.id;
    if (ev.target.type === 'file' && ev.target.files) {
      setData({ ...data, [name]: ev.target.files[0] });
    } else {
      setData({ ...data, [name]: ev.target.value });
    }
  };

  return (
    <form className={classes.root} noValidate onSubmit={handleSubmit}>
      {props.fields.map((field, key) => (
        <TextField
          key={key}
          id={field.name}
          label={field.label}
          onChange={handleChange}
          type={field.type || 'text'}
          required={field.required}
        />
      ))}
      <br />
      <Button variant="contained" onClick={() => props.onSubmit(data)}>
        {props.labelSubmit || 'Submit'}
      </Button>
      <Button variant="contained" onClick={() => props.onCancel && props.onCancel()}>
        Cancel
      </Button>
    </form>
  );
}

interface IDynamicFormProps {
  labelSubmit?: string;
  fields: Fields;
  onSubmit: (data: Record<string, any>) => void;
  onCancel?: () => void;
}

type Fields = Array<{ name: string; label: string; type?: string; required?: boolean }>;
