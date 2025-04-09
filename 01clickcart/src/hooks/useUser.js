import { useEffect, useState } from 'react';
import { account } from '../appwrite/appwriteConfig';

export const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    account.get()
      .then(res => setUser(res))
      .catch(() => setUser(null));
  }, []);

  return { user };
};
