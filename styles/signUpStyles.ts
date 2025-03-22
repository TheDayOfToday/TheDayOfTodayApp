import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontFamily: 'Hakgyoansim',
        fontSize: 44,
        marginBottom: 20,
        color: '#001D6E',
    },
    signUpLabel: {
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
        marginBottom: 15,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#001D6E',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontFamily: 'Pretendard7',
        fontSize: 16,
    },
});
