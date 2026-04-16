import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const layoutStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#101013',
    },
    header: {
        backgroundColor: '#101013',
        borderBottomWidth: 0,
    },
    headerTitle: {
        width: '100%',
        fontFamily: 'Pretendard4',
        fontSize: RFValue(16),
        color: '#ddd',
    },
    modeTabBar: {
        backgroundColor: '#1C1C22',
        height: 80,
        borderTopWidth: 0,
        elevation: 0, // Android 그림자 제거
        shadowOpacity: 0, // iOS 그림자 제거
    },
    tabBar: {
        backgroundColor: '#17171C',
        height: 70,
        borderWidth: 0.3,
        // borderBottomWidth: 0,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        borderRadius: 40,
        borderColor: '#555',
        elevation: 0, // Android 그림자 제거
        shadowOpacity: 0, // iOS 그림자 제거
    },
    recordHeaderContainer: {
        backgroundColor: '#101013',
        borderBottomWidth: 0.5,
    },
    tabBarLabel: {
        fontFamily: 'Pretendard6',
        fontSize: RFValue(12),
    },
    settingButton: {
        marginRight: 15,
    },
    recordButtonContainer: {
        width: 65,
        height: 65,
        backgroundColor:'#a7afcf',
        borderRadius: 30,
        borderTopWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#D6DEFD',
        shadowOpacity: 0.1,
        shadowRadius: 0.1, 
        elevation: 3,
    },
    recordButton: {
        color: '#2C2C35',
        textAlign: 'center',
    },
    recordButtonContainerFocused: {
        backgroundColor: '#17171C',
    },
    recordButtonFocused: {
        color: '#aaa',
    },
});
