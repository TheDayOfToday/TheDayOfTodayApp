import { useEffect, useState } from "react";

function useToken() {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        setAccessToken(token);
    }, []);
    
    return accessToken;
}

export default useToken;
