
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { RootStackParamList } from './rootStackParamList';
import { RouteProp } from '@react-navigation/native';
import Colors from '../utils/palette';
import { StackNavigationProp } from '@react-navigation/stack';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { calculateTotalAmountByCategory, calculateTotalAmountByUser, calculateBudgetWastedPercentage, calculatePercentageSpent, getUserCategorySpending, UserCategorySpending, getUserAmountSumForSpecificCategory, UserAmountSummary } from '../utils/functions/calculateChardData';
import OverviewHeader from '../ui/components/overview-header';
import { ListingData, OldRoomData, RoomData, firestoreFunctions } from '../api/database-requests';
import { useState, useEffect } from 'react';
import { generateDateCodes } from '../utils/functions/dateCodeGenerator';
import { getDateCodeNames } from '../utils/functions/monthNumberToWord';
import RNPickerSelect from 'react-native-picker-select';
type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type OverviewScreenRouteProp = RouteProp<RootStackParamList, 'Overview'>;

type GroupedData = {
  [key: string]: ListingData[];
};
type GroupedChartData = {
  data: number[];
  name: string;
  sum: number;
};
const categories = ['Bills', 'Car', 'Dining', 'Entertainment', 'Groceries', 'Health', 'Miscellaneous', 'Subscriptions', 'Travel', 'Utilities']
const hardcodedColors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf', '#ff5733', '#33FF57', '#5733FF', '#00FF00', '#FF00FF'];
const OverviewScreen = ({ route, navigation }: { route: OverviewScreenRouteProp, navigation: ScreenNavigationProp }) => {


  const [item, setItem] = useState(route.params?.item);
  const [listings, setListings] = useState<ListingData[]>([]);
  const [currentExpenses, setCurrentExpenses] = useState(route.params?.currentExpenses);
  const [dateCode, setDateCode] = useState(item.linstingDateCode);
  const [allBudget, setAllBudget] = useState(item.allBudget)
  const [roomIndex, setRoomIndex] = useState(0)
  const [displayedRoom, setDisplayedRoom] = useState<OldRoomData>(item)
  const [tableResults, setTableResuls] = useState<UserAmountSummary>()
  const [allListings, setAllListings] = useState<ListingData[]>()
  const [index, setIndex] = useState<'newest' | 'oldest' | 'single' | ''>('')
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    useEffect(() => {
      const fetchData = async () => {
        try {
  
          const roomArray = await firestoreFunctions.loadAllRooms(item);
          const roomID = item.id;
          const fetchedListings = await firestoreFunctions.getListingsByRoomIdAndDateCode(roomID, roomArray[roomIndex].linstingDateCode);
          const totalAmount = fetchedListings.reduce((acc, listing) => acc + listing.amount, 0);
  
  
          if (!allListings) {
            const totalListings = await firestoreFunctions.getListingsByRoomId(roomID)
            setAllListings(totalListings)
          }
  
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


  const handleLeft = async () => {
    setRoomIndex(roomIndex + 1)

  };
  const handleRight = async () => {
    setRoomIndex(roomIndex - 1)
  };

  if (allListings) {
    const test = getUserAmountSumForSpecificCategory(allListings, selectedCategory, 6);
    if (JSON.stringify(test) !== JSON.stringify(tableResults)) {
      setTableResuls(test);
      console.log("table results -->", test);
    }
  }
  console.log(generateDateCodes(6))

  return (
    <View style={styles.container}>
      {allListings?.length ? ( <><OverviewHeader dateCode={displayedRoom.linstingDateCode} left={handleLeft} right={handleRight} index={index} /><View style={{ backgroundColor: Colors.helper1, width: '100%', }}>
        <Text style={styles.budgetInfo}>
          Total Amount Spent:€{currentExpenses.toFixed(2)}
        </Text>
        <Text style={styles.budgetInfo}>
          Budget: €{allBudget.toFixed(2)}
        </Text>
        <Text style={styles.budgetInfo}>
          Budget Spent: {percentageSpent.toFixed(2)}%
        </Text>
      </View><ScrollView>
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
              center={[60, 10]} />

          </View>

          <View style={styles.pieChartContainer}>
            <Text style={styles.sectionTitle}>Total Amount by User</Text>
            <PieChart
              data={totalAmountByUser.map((dataPoint, index) => ({
                name: `${dataPoint.totalAmount.toFixed(2)} Eur.\n${dataPoint.userNickName}`,
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
              backgroundColor="transparent" />
            <Text style={styles.sectionTitle}>Six month history for selected category</Text>
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                items={categories.map(category => ({ label: category, value: category }))}
                onValueChange={(value: string) => setSelectedCategory(value)}
                value={selectedCategory}
                style={{ inputAndroid: { color: Colors.secondary, fontWeight: 'bold', elevation: 10 } }} />
            </View>
            {tableResults?.length  ? (
              <><LineChart
                data={{
                  labels: getDateCodeNames(generateDateCodes(6), false),
                  datasets: tableResults.map((item, index) => ({
                    data: item.amounts,
                    color: (opacity = 1) => hardcodedColors[index % hardcodedColors.length],
                    strokeWidth: 2,
                    name: 'test'
                  })),
                }}
                width={350}
                height={220}
                yAxisLabel={'$'}
                chartConfig={{
                  backgroundColor: Colors.helper1,
                  backgroundGradientFrom: Colors.helper1,
                  backgroundGradientTo: Colors.helper1,
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#ffa726',
                  },
                }}
                bezier

                style={{
                  paddingLeft: -60,
                  marginVertical: 8,
                  marginLeft: -60,
                  borderRadius: 16,
                }} /><View style={styles.legendContainer}>
                  {tableResults.map((item, index) => (
                    <View key={index} style={styles.legendItem}>
                      <View style={[styles.legendColorBox, { backgroundColor: hardcodedColors[index % hardcodedColors.length] }]} />
                      <Text style={styles.legendText}>{item.user}</Text>
                    </View>
                  ))}
                </View></>
            ) : (
              <Text>Loading LineChart...</Text>
            )}
          </View>

        </ScrollView></>):(  <Text style={{color: Colors.helper1, fontSize: 18, alignContent: 'center', marginTop: "80%", fontWeight:'bold'}}>Cannot display statistics without any data</Text>)}
     

     
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
  pickerContainer: {
    width: '60%',
    marginRight: "30%",
    marginBottom: 10,
    borderColor: Colors.helper1,
    borderWidth: 2,
    borderRadius: 25
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
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  legendColorBox: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    color: Colors.secondary,
  },
});