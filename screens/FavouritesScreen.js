import { StyleSheet, Text, View,SafeAreaView, ScrollView,Pressable,Image,RefreshControl} from 'react-native'
import React,{useState,useEffect,useContext}from 'react'
import { FavouritesContext } from "../hooks/useFavourite";

const FavouritesScreen = ({navigation}) => {

    const {favourites,setFavourites} = useContext(FavouritesContext);

   const [refreshing, setRefreshing] = useState(false);

   const [favouriteCoins, setFavouriteCoins] = useState([]);


    const getImage = (name) => {
        if(name){
          const nname = name.toLowerCase().replace(' ', '-');
          return `https://c1.coinlore.com/img/25x25/${nname}.png`;
        }
      }

      const updateData = async () => {

        

        setRefreshing(true);
        let updatedData = [];
        favourites.map(async(coin) => {
            const response = await fetch(`https://api.coinlore.net/api/ticker/?id=${coin.id}`);
            const data = await response.json();
           

            updatedData.push(data[0]);
        


        });
        setFavouriteCoins(updatedData);
        setRefreshing(false);
    }


       useEffect(() => {
        
         if(favourites.length > 0){
                updateData();
                console.log(favouriteCoins);
                
                
         }
         
     }, [favourites]);



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
        <ScrollView style={{
            backgroundColor:'#272c35',
            padding:10,
        }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={updateData} tintColor="#fff" />}
        >
            {
                favouriteCoins.map((coin) => {

                   

                return(
                    <Pressable key={coin.id} style={styles.coin} onPress={
                        () => {
                          navigation.navigate("Coin Details", {Coin:coin});
                        }
                      } >
                        <View style={{
                          display:"flex",
                          flexDirection:"row",
                          alignItems:"center",
                        }}>
                          <Image source={{uri: getImage(coin.name)}} style={{
                            width:25,
                            height:25,
          
                          }} />
                          <Text style={styles.coin_symbol}>{coin.symbol}</Text>
                          <Text style={styles.coin_name}>{coin.name}</Text>
                          
                        
                          <Text style={styles.coin_text}>${coin.price_usd}</Text>
                        </View>
                        {/* {
                          coin.percent_change_24h < 0 ? (
                            <View style={{
                              display:"flex",
                              flexDirection:"row",
                              alignItems:"center",
                            }}>
                              <Text style={styles.coin_text}>{coin.percent_change_24h} </Text>
                              <Image source={require('../assets/arrow_down.png')} style={{width:15,height:15,marginLeft:10}} />
          
                            </View>
                          ) : (
                            <View style={{
                              display:"flex",
                              flexDirection:"row",
                              alignItems:"center",
          
                            }}>
                              <Text style={styles.coin_text}>{coin.percent_change_24h} </Text>
                              <Image source={require('../assets/arrow_up.png')} style={{width:15,height:15,marginLeft:10}} />
                            </View>
                          )
                        }
                         */}
                        
                      </Pressable>
                   
                )
            })}
        </ScrollView>

    </SafeAreaView>
  )
}

export default FavouritesScreen

const styles = StyleSheet.create({
    container: {
      display:"flex",
      flex: 1,
      backgroundColor: '#20252c',
  
    },
    header: {
      display:"flex",
      flexDirection:"row",
      padding:20,
  
    },
    searchbar:{
      display:"flex",
      flexDirection:"row",
      padding:10,
      backgroundColor:"#272c35",
      borderRadius:10,
      margin:10,
      
    
    },
    searchbar_text:{
      color:"#fff",
    },
    header_text: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
    },
    body:{
      display:"flex",
      flexDirection:"column",
      backgroundColor:"#272c35",
      padding:10,
      
    },
    coin_text:{
      color:"#fff",
      marginLeft:15,
    },
    coin:{
      display:"flex",
      flexDirection:"row",
      justifyContent:"space-between",
      padding:10,
  
      borderBottomColor:"#3a4049",
      borderBottomWidth:1,
      
      marginLeft:0,
      backgroundColor:"#272c35",
     borderRadius:10,
      width:"100%",
  
    },
    coin_name:{
      color:"#fff",
      marginLeft:10,
    },
    
    coin_symbol:{
      fontWeight:"bold",
      color:"#fff",
      marginLeft:10,
    }
  });