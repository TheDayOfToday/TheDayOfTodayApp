import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { useRouter } from "expo-router";

function useToken() {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    // useEffect(() => {
    //     const token = await AsyncStorage.getItem("accessToken");
    //     // const token = localStorage.getItem("accessToken");
    //     setAccessToken(token);
    // }, []);
    useEffect(() => {
        const router = useRouter();
        const showToast = useShowToast();
        const token = localStorage.getItem("accessToken");
        if (token) {
            setAccessToken(token);
        } else {
            console.warn("accessToken이 없습니다.");
        }
        
        // 토큰이 없을 경우에 대한 처리
        router.replace('/signIn'); 
        showToast('error', '로그인 정보 확인 불가', '로그인 페이지로 이동합니다.');

    }, []);
    
    return accessToken;
}

export default useToken;
