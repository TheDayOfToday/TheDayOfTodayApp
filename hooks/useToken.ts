import AsyncStorage from '@react-native-async-storage/async-storage';

function useToken() {
    const token = AsyncStorage.removeItem('accessToken');
    return token;
}

export default useToken;
