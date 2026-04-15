import * as SecureStore from 'expo-secure-store';
import { useState, useEffect } from 'react';

function useToken() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync('accessToken');
        setToken(storedToken);
      } catch {
        setToken(null);
      }
    };
    loadToken();
  }, []);

  return token;
}

export { useToken };
