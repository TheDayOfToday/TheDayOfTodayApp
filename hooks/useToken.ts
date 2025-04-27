import AsyncStorage from "@react-native-async-storage/async-storage";

async function useToken() {
    const token = await AsyncStorage.getItem("accessToken");    
    return token;
}

export default useToken;
