import React, { useEffect,useState } from 'react';

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavouritesScreen from "./screens/FavouritesScreen";
import { AntDesign } from '@expo/vector-icons';
import  {FavouritesContext}  from "./hooks/FavouritesContext";
import MainScreen from "./screens/MainScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {


  const Tab = createBottomTabNavigator();

  const [favourites,setFavourites] = useState([]);

  const FavouritesContextValue = React.useMemo(()=>({
    favourites,
    setFavourites
  }),[favourites]);


  useEffect(()=>{
    const getFavourites = async()=>{
      const favs = await AsyncStorage.getItem('favourites');
      if(favs){
        setFavourites(JSON.parse(favs));
      }
    }
    getFavourites();
  },[])


  return (

    <FavouritesContext.Provider value={FavouritesContextValue}>
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

