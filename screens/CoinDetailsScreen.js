import { StyleSheet, Text, View ,SafeAreaView,ScrollView,Image, TextInput,RefreshControl, Pressable, TouchableOpacity} from 'react-native'
import React ,{useState,useEffect,useContext}from 'react'
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FavouritesContext } from "../hooks/FavouritesContext";

const CoinDetailsScreen = ({navigation,route}) => {
    const {Coin} = route.params;

    

    const {favourites,setFavourites} = useContext(FavouritesContext);
    
   
  
    const getImage = (name) => {
      if(name){
        const nname = name.toLowerCase().replace(' ', '-');
        return `https://c1.coinlore.com/img/25x25/${nname}.png`;
      }
    }
  
  
    const [coinvalue, setCoinvalue] = useState("");
    const [dollarvalue, setDollarvalue] = useState("");
  
    
    console.log(favourites.some((favourite) => favourite.id === Coin.id));
    
    
  
  
    const addFavourite = async(coin) => {

      const data = {
        id:coin.id
        
      }

      const newFavourites = [...favourites,data];
      setFavourites(newFavourites);

      await AsyncStorage.setItem('favourites',JSON.stringify(newFavourites));

    

    }


    const removeFavourite = async(coin) => {

        const newFavourites = favourites.filter((favourite) => favourite.id !== coin.id);
        console.log(newFavourites);
        setFavourites(newFavourites);

        await AsyncStorage.setItem('favourites',JSON.stringify(newFavourites));

    }


  
  
    return(
      <SafeAreaView style={{
        display:"flex",
        flex:1,
        
        backgroundColor:"#20252c",
      }}>
        <View style={{
          display:"flex",
          flexDirection:"column",
          alignItems:"center",
        }}>
           
        
            <View style={{
              display:"flex",
              flexDirection:"row",
              alignItems:"center",
              marginTop:20,
            }}>
            
                <Image source={{uri: getImage(Coin.name)}} style={{
                  width:50,
                  height:50,
                }} />
                <Text style={{
                  color:"#fff",
                  fontSize:25,
                  marginLeft:10,
  
                }}>{Coin.symbol}</Text>
                <Text style={{
                  color:"#fff",
                  fontSize:25,
                  marginLeft:10,
                  backgroundColor:"#4657ce",
                  padding:5,
                  borderRadius:5,
                }}># {Coin.rank}</Text>
  
            
            </View>
        </View>
        
        <View style={{
          display:"flex",
          flexDirection:"row",
          alignItems:"center",
          marginTop:55,
          marginLeft:10,
          justifyContent:"space-between",
          borderBottomColor:"#4657ce",
          borderBottomWidth:1,
          
        }}>
          <View style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Text style={{
              color:"#fff",
              fontSize:25,
              marginLeft:10,
            }}>{Coin.name}</Text>
            <Text style={{
              color:"#fff",
              fontSize:30,
              marginLeft:10,
              fontWeight:"bold",
              padding:5,
              borderRadius:5,
            }}>$ {Coin.price_usd}</Text>
          </View> 
          {
            Coin.percent_change_24h < 0 ? (
              <View style={{
                display:"flex",
                flexDirection:"row",
                alignItems:"center",
                padding:5,
                borderRadius:5,
                marginRight:30,
                
              }}>
                <Image source={require('../assets/arrow_down.png')} style={{width:20,height:20,marginLeft:10}} />
                <Text style={{
                  color:"#fff",
                  fontSize:25,
                  marginLeft:10,
                }}>{Coin.percent_change_24h} %</Text>
              </View>
            ) : (
              <View style={{
                display:"flex",
                flexDirection:"row",
                alignItems:"center",
                padding:5,
                borderRadius:5,
                marginRight:30,
                
              }}>
                <Image source={require('../assets/arrow_up.png')} style={{width:20,height:20,marginLeft:10}} />
                <Text style={{
                  color:"#fff",
                  fontSize:25,
                  marginLeft:10,
                }}>{Coin.percent_change_24h} %</Text>
              </View>
            )
  
          
          }
  
        </View>
        <View style={{display:"flex", marginTop: 25,marginLeft:15}}>
          <Text style={{
            color:"#fff",
            fontSize:20,
          }}>
            Price Converter
          </Text>
        </View>
        <View style={{
          display:"flex",
          flexDirection:"row",
          alignItems:"center",
        
          marginTop:30
        }}>
          
          <Text style={{display:"flex", color:"#fff", fontSize:20, marginLeft:15, marginTop:15}}>{Coin.symbol}: </Text>
          <TextInput style={{
            display:"flex",
            color:"#fff",
            fontSize:20,
            
            marginTop:15,
            borderBottomColor:"#4657ce",
            borderBottomWidth:1,
            width: 100
          }}  placeholderTextColor="#fff" placeholder={coinvalue} onChange={
            (e) => {
              
              setDollarvalue((e.nativeEvent.text*Coin.price_usd).toFixed(2))
            
            }
  
          }  />
          <Text style={{display:"flex", color:"#fff", fontSize:20, marginLeft:15, marginTop:15}}>USD: </Text>
          <TextInput style={{
            display:"flex",
            color:"#fff",
            fontSize:20,
            marginLeft:10,
            marginTop:15,
            borderBottomColor:"#4657ce",
            borderBottomWidth:1,
            width:100,
          }} placeholderTextColor="#fff" 
            placeholder={dollarvalue}
            onChange={
              (e) => {
                setCoinvalue((e.nativeEvent.text/Coin.price_usd).toFixed(2))
              }}
          />
  
  
  
   
        </View>

          {
           favourites.some((favourite) => favourite.id === Coin.id) ?
                   (
                    <View style={{display:"flex", flexDirection:"column",marginTop:20}}>
                <TouchableOpacity style={{
                  display:"flex",
                  flexDirection:"row",
                  alignItems:"center",
                  justifyContent:"center",
                  backgroundColor:"#4657ce",
                  padding:10,
                  borderRadius:5,
                  marginTop:20,
                  marginLeft:15,
                  marginRight:15,
                }} onPress={() => {
                  removeFavourite(Coin)
                }}>
                  <Text style={{
                    color:"#fff",
                    fontSize:20,
                  }}>Remove from favourites</Text>
                </TouchableOpacity>
          </View>
                   )
                
              : (
                <View style={{display:"flex", flexDirection:"column",marginTop:20}}>
              <TouchableOpacity style={{
                display:"flex",
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"center",
                backgroundColor:"#4657ce",
                padding:10,
                borderRadius:5,
                marginTop:20,
                marginLeft:15,
                marginRight:15,
              }} onPress={() => {
                addFavourite(Coin)
              }}>
                <Text style={{
                  color:"#fff",
                  fontSize:20,
                }}>Add to favourites</Text>
              </TouchableOpacity>
        </View>
            )
              

          
        }
          
        
            
            
        
        
       
        <View style={{marginTop:50,
          display:"flex",
          flexDirection:"column",
          
  
        }}>
          <TouchableOpacity style={{
            display:"flex",
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"center",
            backgroundColor:"#4657ce",
            padding:10,
            borderRadius:5,
            marginTop:20,
            marginLeft:15,
            marginRight:15,
          }} onPress={() => {
            navigation.navigate("Coin List")
          }}>
            <Text style={{
              color:"#fff",
              fontSize:20,
            }}>Back</Text>
          </TouchableOpacity>
        </View>

        
        
        
      </SafeAreaView>
    )
}

export default CoinDetailsScreen

