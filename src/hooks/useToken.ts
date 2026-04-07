import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

function useToken() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem('accessToken');
      setToken(storedToken);
    };
    loadToken();
  }, []);

  return token;
}

export default useToken;
