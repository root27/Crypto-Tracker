import { StyleSheet, Text, View ,SafeAreaView,ScrollView,Image, TextInput,RefreshControl, Pressable, TouchableOpacity} from 'react-native';
import { useEffect,useState } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavouritesScreen from "./screens/FavouritesScreen";
import { AntDesign } from '@expo/vector-icons';
import { FavouritesContext } from "./hooks/useFavourite";
import MainScreen from "./screens/MainScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {


  const Tab = createBottomTabNavigator();

  const [favourites,setFavourites] = useState([]);

  useEffect(()=>{
    const getFavourites = async()=>{
      const favourites = await AsyncStorage.getItem('favourites');
      if(favourites){
        setFavourites(JSON.parse(favourites));
      }
    }
    getFavourites();
  },[])


  return (

    <FavouritesContext.Provider value={{favourites, setFavourites}}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{
          headerShown:false,
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle:{
            backgroundColor:'black',
          }
          
        }} >
          <Tab.Screen name="Home" component={MainScreen} options={
            {
              tabBarIcon:({color})=>(
                <AntDesign name="home" size={24} color="white" />
              )
            }
          }

          />
          <Tab.Screen name="My Favourites" component={FavouritesScreen} options={
            { tabBarIcon:({color})=>(
              <AntDesign name="hearto" size={24} color="white" />
            )
              }
          } />
        </Tab.Navigator>
      </NavigationContainer>
    </FavouritesContext.Provider>
    
  );
}

