import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../utils/palette';
interface RoomHeaderProps {
    text: string,
    renderButtons?: () => ReactNode;
}
const ExpenseRoomHeader: React.FC<RoomHeaderProps> = ({ text, renderButtons }) => {
    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.headerText1}>My Room</Text>
                <Text style={styles.headerText2}>{text}</Text>
            </View>
            {renderButtons && renderButtons()}
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
});



export default ExpenseRoomHeader;
