import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import Colors from '../../utils/palette';
import { ListingData, firestoreFunctions } from '../../api/database-requests';
import { Button } from '@ant-design/react-native';

interface ListingItemProps {
    data: ListingData;
    onDelete: () => void
}

function ListingItem({ data, onDelete }: ListingItemProps) {
    const date = new Date(data.date);

    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const formattedDate = `${date.getDate()} ${months[date.getMonth()]}. ${date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric'
    })}`
    return (
            <View style={styles.container}>
                <View style={styles.leftColumn}>
                    <Text style={styles.amountText}>-€{data.amount}</Text>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View>
                            <Text style={styles.categoryText}>{data.category.toLowerCase()}</Text>
                        </View>
                        <View style={{ alignContent: 'flex-end' }}>

                        </View>
                    </View>
                </View>
                <View style={styles.rightColumn}>
                        <Icon onPress={onDelete} name="trash" size={24} color="red" style={styles.trashIcon} />
                    <Text style={styles.dateText}>   {data.userNickName.charAt(0).toUpperCase() + data.userNickName.slice(1).toLowerCase()}</Text>
                    <Text style={styles.dateText}> {formattedDate.toLowerCase()}</Text>
                </View>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: '90%',
        borderRadius: 10,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: Colors.primary,
        elevation: 10,
    },
    leftColumn: {
        flex: 2, 
    },
    rightColumn: {
        flex: 1,
        alignItems: 'flex-end',
        flexDirection: "column" 
    },
    amountText: {
        fontSize: 28, 
        fontWeight: 'bold',
        color: Colors.helper1,
        marginLeft: 25,
    },
    categoryText: {
        fontSize: 12,
        color: Colors.helper1,
        marginLeft: 30,
    },
    dateText: {
        fontSize: 12,
        color: Colors.helper1,
    },
    trashIcon: {
        alignSelf: 'flex-end',
        paddingBottom: 20,
        color: 'rgba(32, 33, 35, 0.6)'
    },
});

export default ListingItem;
