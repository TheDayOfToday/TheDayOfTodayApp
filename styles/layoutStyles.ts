import { StyleSheet } from 'react-native';

export const layoutStyles = StyleSheet.create({
    header: {
        backgroundColor: '#0e0c26',
        borderBottomWidth: 0,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    modeTabHeaderContainer: {
        backgroundColor: '#0e0c26',
    },
    headerContainer: {
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontFamily: 'Pretendard6',
        fontSize: 20,
        color: '#fff',
    },
    tabBar: {
        height: 80,
        borderTopWidth: 1, // 상단 테두리 제거
        elevation: 0, // Android 그림자 제거
        shadowOpacity: 0, // iOS 그림자 제거
    },
    recordHeaderContainer: {
        backgroundColor: '#0e0c26',
        borderBottomWidth: 0.5,
    },
    tabBarLabel: {
        fontFamily: 'Pretendard6',
        fontSize: 12,
    },
    tabBarIcon: {
        marginBottom: 5,
    },
    settingButton: {
        marginRight: 15,
    },
    recordButtonContainer: {
        width: 65,
        height: 65,
        backgroundColor:'#0e0c26',
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
        color: '#fff',
        textAlign: 'center',
    },
});
