import { useEffect, useState } from 'react';
import { Storage } from 'aws-amplify';

export default function GetImage(imageId?: string | null) {
  const [state, setState] = useState('');

  useEffect(() => {
    if (imageId) {
      Storage.get(imageId)
        .then((key) => {
          setState(key.toString());
        })
        .catch((err) => console.error(err));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}
