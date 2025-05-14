import { StyleSheet } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#17171E',
    },
    title: {
        fontFamily: 'Hakgyoansim',
        fontSize: RFValue(44),
        color: '#D6DEFD',
        marginBottom: 30,
    },
    loginLabel: {
        fontFamily: 'Pretendard4',
        color: '#7A7E9B',
        alignSelf: 'flex-start',
        fontSize: RFValue(16),
        marginBottom: 10,
    },
    input: {
        fontFamily: 'Pretendard4',
        width: '100%',
        height: 50,
        backgroundColor: '#202027',
        borderWidth: 1,
        borderColor: '#69728F',
        color: '#D6DEFD',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    passwordContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#202027',
        borderWidth: 1,
        borderColor: '#69728F',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    inputPassword: {
        flex: 1,
        height: 50,
        fontFamily: 'Pretendard4',
        color: '#D6DEFD',
    },
    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#D6DEFD',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    loginButtonText: {
        fontFamily: 'Pretendard7',
        color: '#69728F',
        fontSize: RFValue(16),
    },
    signUpContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    signUpLabelText: {
        fontFamily: 'Pretendard6',
        fontSize: RFValue(12),
        color: '#69728F',
    },
    signUpText: {
        fontFamily: 'Pretendard8',
        fontSize: RFValue(12),
        color: '#989BD2',
    },
});
