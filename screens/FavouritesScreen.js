import { StyleSheet, Text, View,SafeAreaView} from 'react-native'
import React,{useState,useEffect,useContext}from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavouritesContext } from "../hooks/useFavourite";

const FavouritesScreen = () => {

    const {favourites,setFavourites} = useContext(FavouritesContext);

   

   // console.log(favourites);

   

    const getFavourites = async()=>{
        const favourites = await AsyncStorage.getItem('favourites');
        if(favourites){
           // console.log(JSON.parse(favourites));
            setFavourites(JSON.parse(favourites));
        }
    }

    







  return (
    <SafeAreaView style={{
        flex:1,
        backgroundColor:'#20252c',
    }}>
        <View style={{
            display:'flex',
            padding:20,
        }}>
            <Text style={{
                color:'white',
                fontSize:20,
                fontWeight:'bold',
            }}>My Favourites</Text>
        </View>

    </SafeAreaView>
  )
}

export default FavouritesScreen

const styles = StyleSheet.create({})