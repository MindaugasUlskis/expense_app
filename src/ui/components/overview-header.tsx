import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../utils/palette';
import { getMonthName } from '../../utils/functions/monthNumberToWord';
interface HeaderProps {
    dateCode: string,
    index?: 'newest' | 'oldest' | 'single'
    left: () => void;
    right: () => void;
}
const OverviewHeader: React.FC<HeaderProps> = ({ dateCode, index, left, right }) => {

    const month = getMonthName(dateCode.slice(-2), true)
    const year = dateCode.slice(0, 4)
    let leftIconColor = Colors.primary
    let rightIconColor = Colors.primary
    if (index != 'single') {
        leftIconColor = index === 'oldest' ? Colors.primary : Colors.secondary;
        rightIconColor = index === 'newest' ? Colors.primary : Colors.secondary;
    }

    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.squareButton} onPress={left}>
                <Icon name="angle-left" size={38} color={leftIconColor} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Text style={styles.headerText2}>{month}</Text>
                <Text style={styles.headerText1}>{year}</Text>
            </View>
            <TouchableOpacity style={styles.squareButton} onPress={right}>
                <Icon name="angle-right" size={38} color={rightIconColor} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: '20%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: -15,
        backgroundColor: 'transparent',
        alignSelf: 'center'
    },
    headerText1: {
        fontSize: 28,
        color: Colors.helper1,
        fontFamily: Colors.text1,
        elevation: 10
    },
    headerText2: {
        fontSize: 34,
        fontWeight: 'bold',
        color: Colors.helper1,
        fontFamily: Colors.text1,
        elevation: 10
    },
    addButton: {
        backgroundColor: 'transparent',
        padding: 10,
        borderRadius: 50,
    },
    squareButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        marginHorizontal: 32,
    },
});



export default OverviewHeader;
