import * as React from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity, TextComponent } from 'react-native';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import { Camera, CameraType } from 'expo-camera';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator(); 

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Budget" component={BudgetScreen} />
      <Tab.Screen name="Camera" component={Photo} /> 
    </Tab.Navigator>
  );
}

function HomeScreen() {
  return (
    <>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize: 30, marginTop: 1}}>Home Screen</Text>
    </View>
    </>
  );
}

// ----------- Budget page

function BudgetScreen({ navigation }) {

  var currentBudget = new Budget();
  currentBudget.initialAmount = 200;
  currentBudget.expenses = [];
  currentBudget.expenses.push(
    {
      description: "Test",
      amount: 25
    }
  );


  return (
    <View style={ budgetStyles.mainContainer }>
     
        {/* Budget entry and container */}
        <View style={{ alignContent: 'center', alignItems: 'center', borderBottomColor: "#CCC", borderBottomWidth: "2px", margin: "5%" }}>
          <Text style={budgetStyles.budgetContainer}>$ {currentBudget.initialAmount} </Text>
        </View>
        
        {/* Expenses */}
        <View>
          <Text style={budgetStyles.expenseDescriptionContainer}>
          {
            currentBudget.expenses[0].description
          }  
          </Text>          
          <View style={{ alignItems: 'right', alignContent: 'right', alignSelf: 'right'}}>
            <Text style={budgetStyles.expenseAmountContainer}>
              $ 
              {
                currentBudget.expenses[0].amount
              }
            </Text>
          </View>
          
        </View>

        {/* Total */}
        <View style={{ alignContent: 'center', alignItems: 'center', borderTopColor: "#CCC", borderTopWidth: "2px", margin: "5%" }}>
          <Text style={budgetStyles.totalContainer}>$ 65.00 </Text>
        </View>
        
        <Button title="Go back" onPress={() => navigation.goBack()}
        />
    </View>
  );
}

const budgetStyles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    // flexDirection: "row"
  },
  budgetContainer: {
    fontSize: 64,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: "1px",
    borderBottomColor: "#FFF"
 
  },
  totalContainer: {
    color: "#CCC",
    fontSize: 56
  },
  expenseAmountContainer: {
    fontSize: 34,
    marginLeft: 16,
    alignSelf: 'right',
    // flex: 3
  },
  expenseDescriptionContainer: {
    marginLeft: 16,
    fontSize: 34,
    color: "red",
  }
});


// -------------

function Photo() {
  const [type, setType] = useState(CameraType.back);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      console.log(status) 
    })();
  }, []);

    return (
      <View style={styles.container}>
        <Camera style={styles.camera} type={type}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(type === CameraType.front);
              }}>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      margin: 20,
    },
    button: {
      flex: 0.1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      color: 'white',
    },
  });


  // ------------- Models ---------
  class Budget{
    initialAmount;
    expenses
  }
  
  class Expense{
    description;
    amount;
  }
  


export default App;