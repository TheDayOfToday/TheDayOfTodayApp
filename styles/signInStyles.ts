import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontFamily: 'Hakgyoansim',
        fontSize: 44,
        color: '#001D6E',
        marginBottom: 30,
    },
    loginLabel: {
        fontFamily: 'Pretendard2',
        alignSelf: 'flex-start',
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        fontFamily: 'Pretendard4',
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    passwordContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    inputPassword: {
        flex: 1,
        height: 50,
        fontFamily: 'Pretendard4',
    },
    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#001D6E',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    loginButtonText: {
        fontFamily: 'Pretendard7',
        color: 'white',
        fontSize: 16,
    },
    signUpContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    signUpLabelText: {
        fontFamily: 'Pretendard4',
    },
    signUpText: {
        fontFamily: 'Pretendard8',
        color: '#022ea8',
    },
});
