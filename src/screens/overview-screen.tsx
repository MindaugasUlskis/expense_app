
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { RootStackParamList } from './rootStackParamList';
import { RouteProp } from '@react-navigation/native';
import Colors from '../utils/palette';
import { StackNavigationProp } from '@react-navigation/stack';
import { PieChart } from 'react-native-chart-kit';
import { calculateTotalAmountByCategory, calculateTotalAmountByUser, calculateBudgetWastedPercentage, calculatePercentageSpent } from '../utils/functions/calculateChardData';
import OverviewHeader from '../ui/components/overview-header';
import { ListingData, OldRoomData, RoomData, firestoreFunctions } from '../api/database-requests';
import { useState, useEffect } from 'react';
type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type OverviewScreenRouteProp = RouteProp<RootStackParamList, 'Overview'>;

const OverviewScreen = ({ route, navigation }: { route: OverviewScreenRouteProp,  navigation: ScreenNavigationProp  }) => {
    const [item, setItem] = useState(route.params?.item);
    const [listings, setListings] = useState<ListingData[]>([]);
    const [currentExpenses, setCurrentExpenses] = useState(route.params?.currentExpenses);
    const [dateCode, setDateCode] = useState(item.linstingDateCode);
    const [allBudget, setAllBudget] = useState(item.allBudget)
    const [roomIndex, setRoomIndex] = useState(0)
    const [displayedRoom, setDisplayedRoom] = useState<OldRoomData>(item)
    const [index, setIndex] = useState<'newest' | 'oldest' | 'single' | ''>('')
    
    const hardcodedColors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf', '#ff5733', '#33FF57', '#5733FF', '#00FF00', '#FF00FF'];
    useEffect(() => {
      const fetchData = async () => {
          try {
              const roomArray = await firestoreFunctions.loadAllRooms(item);
              const roomID = item.id;
              const fetchedListings = await firestoreFunctions.getListingsByRoomIdAndDateCode(roomID, roomArray[roomIndex].linstingDateCode);
              const totalAmount = fetchedListings.reduce((acc, listing) => acc + listing.amount, 0);
              setDisplayedRoom(roomArray[roomIndex])
              setListings(fetchedListings);
              setCurrentExpenses(totalAmount);
              setAllBudget(roomArray[roomIndex].allBudget)
              if (roomArray.length === 1) {
                setIndex('single');
            } else {
                if (roomIndex === 0) {
                    setIndex('newest');
                } else if (roomIndex === roomArray.length - 1) {
                    setIndex('oldest');
                } else {
                    setIndex('');
                }
            }
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
      fetchData();
  }, [item.id, dateCode, roomIndex]);


    const totalAmountByCategory = calculateTotalAmountByCategory(listings);
    const totalAmountByUser = calculateTotalAmountByUser(listings);
    const percentageSpent = calculatePercentageSpent(currentExpenses, allBudget)
    



  const  handleLeft = async () => {
    setRoomIndex ( roomIndex + 1 )

    
  };
  const  handleRight = async () => {
    setRoomIndex ( roomIndex - 1 )
  };



  return (
    <View style={styles.container}>
      <OverviewHeader dateCode={displayedRoom.linstingDateCode} left={handleLeft} right={handleRight} index={index} />
      <View style={{backgroundColor:Colors.helper1, width: '100%',}}> 
      <Text style={styles.budgetInfo}>
        Total Amount Spent: ${currentExpenses.toFixed(2)}
      </Text>
      <Text style={styles.budgetInfo}>
        Budget: ${allBudget.toFixed(2)}
      </Text>
      <Text style={styles.budgetInfo}>
        Budget Spent: {percentageSpent.toFixed(2)}%
      </Text>
      </View>

      <View style={styles.pieChartContainer}>
        <Text style={styles.sectionTitle}>Total Amount by Category</Text>
        <PieChart
        data={totalAmountByCategory.map((dataPoint, index) => {
          const formattedAmount = dataPoint.totalAmount.toFixed(2);
          const formattedLabel = `${formattedAmount.padEnd(4, ' ')} Eur.\n${dataPoint.category}`;
          return {
            name: formattedLabel,
            value: dataPoint.totalAmount,
            color: hardcodedColors[index % hardcodedColors.length],
          };
        })}
          width={450}
          height={200}
          
          chartConfig={{
            backgroundGradientFrom: '#1E2923',
            backgroundGradientTo: '#08130D',
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor="value"
          backgroundColor="transparent"
          paddingLeft="-45"
          center={[60, 10]}
        />
      </View>
  
      <View style={styles.pieChartContainer}>
        <Text style={styles.sectionTitle}>Total Amount by User</Text>
        <PieChart
          data={totalAmountByUser.map((dataPoint, index) => ({
            name:`${dataPoint.totalAmount.toFixed(2)}\n${dataPoint.userNickName}`,
            value: dataPoint.totalAmount,
            color: hardcodedColors[index % hardcodedColors.length],
          }))}
          width={450}
          height={200}
          chartConfig={{
            backgroundGradientFrom: '#1E2923',
            backgroundGradientTo: '#08130D',
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          }}
          paddingLeft="-45"
          center={[60, 10]}
          accessor="value" 
          backgroundColor="transparent" 
        />
      </View>
    </View>
  );
        }


export default OverviewScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center', 
    paddingTop: 20,

  },
  sectionTitle: {
    width: '100%',
    color: Colors.secondary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 10,

  },
  pieChartContainer: {
    width: '100%',
    alignItems: 'center', 
    marginBottom: 20,

  },
  budgetInfo: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  
});