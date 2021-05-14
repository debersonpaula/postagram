import { Auth } from 'aws-amplify';
import { useState, useEffect } from 'react';

export default function useGetUser() {
  const [state, setState] = useState<IUser>({});

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((res) => {
        const { username, attributes } = res;
        setState({ username, email: attributes.email, isLogged: true, isError: false });
      })
      .catch((err) => {
        console.error('Error on user Authentication', err);
        setState({ isLogged: false, isError: true });
      });
  }, []);

  return state;
}

interface IUser {
  username?: string;
  email?: string;
  isLogged?: boolean;
  isError?: boolean;
}
