function useToken() {
    const token = localStorage.getItem("accessToken");
    return token;
}

export default useToken;
