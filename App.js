import * as React from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import { Camera, CameraType } from 'expo-camera';

const Stack = createNativeStackNavigator();

function App() {



  // React.useEffect(() => {
  //   checkCameraPermission();
  // }, []);

  return (
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Home" component={HomeScreen} />
    //     <Stack.Screen name="Details" component={DetailsScreen} />
    //     <Stack.Screen name="HomeText" component={HomeText} /> 
    //   </Stack.Navigator>
    // </NavigationContainer>
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
      <Text>Home Screen</Text>
    </View>
    </>
  );
}

function BudgetScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Budget</Text>
     
        <Button title="Go back" onPress={() => navigation.goBack()}
        />
    </View>
  );
}


function Photo({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
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
                setType(type === CameraType.back ? CameraType.front : CameraType.back);
              }}>
              <Text style={styles.text}> Flip </Text>
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




export default App;