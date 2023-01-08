
import React ,{useContext}from 'react'

import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { FavouritesContext } from "../hooks/useFavourite";
import HomeScreen from "./HomeScreen";
import CoinDetailsScreen from "./CoinDetailsScreen";


const MainScreen = () => {
  

  const {favourites,setFavourites} = useContext(FavouritesContext);

  
  
    const HomeStack = createNativeStackNavigator();

    

   



  return (

    <FavouritesContext.Provider value={{favourites, setFavourites}}>
    
      <HomeStack.Navigator>
        <HomeStack.Screen name="Coin List" component={HomeScreen} options={{
          headerShown:false,
        }}  />
        <HomeStack.Screen name="Coin Details" component={CoinDetailsScreen} options={{
          headerShown:false,
        }} />
      </HomeStack.Navigator>
    </FavouritesContext.Provider>
     
    
  )
}

export default MainScreen


  