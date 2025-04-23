import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

function useToken() {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    // useEffect(() => {
    //     const token = await AsyncStorage.getItem("accessToken");
    //     // const token = localStorage.getItem("accessToken");
    //     setAccessToken(token);
    // }, []);
    useEffect(() => {
        const fetchToken = async () => {
            const token = await AsyncStorage.getItem('access_token');
            setAccessToken(token);
        };
    
        fetchToken();
    }, []);
    
    return accessToken;
}

export default useToken;
