import { StyleSheet } from 'react-native';

export const layoutStyles = StyleSheet.create({
    tabBar: {
        display: 'flex',
        height: 70,
        alignContent: 'center',
        justifyContent: 'center',
        borderTopWidth: 0, // 상단 테두리 제거
        elevation: 0, // Android 그림자 제거
        shadowOpacity: 0, // iOS 그림자 제거
    },
    tabBarLabel: {
        fontSize: 12,
    },
    tabBarIcon: {
        marginBottom: 5,
    },
    settingButton: {
        marginRight: 15,
        fontSize: 16,
    },
    recordButtonContainer: {
        width: 65,
        height: 65,
        backgroundColor:'#92B741',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84, 
        elevation: 5,
    },
    recordButton: {
        textAlign: 'center',
    },
});
