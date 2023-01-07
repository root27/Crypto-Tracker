import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,SafeAreaView,ScrollView,Image, TextInput,ActivityIndicator,RefreshControl, Pressable, TouchableOpacity} from 'react-native';
import { useEffect,useState } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {useNavigation} from '@react-navigation/native';
import { AntDesign } from "@expo/vector-icons";

export default function App() {

  const Stack = createNativeStackNavigator();

  
  function HomeScreen (){

    const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const getImage = (name) => {
    if(name){
      const nname = name.toLowerCase().replace(' ', '-');
      return `https://c1.coinlore.com/img/25x25/${nname}.png`;
    }
  }


  useEffect(() => {
    fetch('https://api.coinlore.net/api/tickers/')
      .then(response => response.json())
      .then(data => 
        {
          setRefreshing(false);
        setCoins(data.data)
  });
  }
  , []);

    return(
      <SafeAreaView style={styles.container}>
    
      <View style={styles.header}>
        <Text style={styles.header_text}>Crypto Tracker</Text>
      </View>
      <View style={styles.searchbar}>
        <TextInput style={styles.searchbar_text} placeholder="Search" placeholderTextColor="#fff" onChange={
          (e) => {
            setSearch(e.nativeEvent.text);
          }
          
        } />
      </View>

      <ScrollView style={styles.body}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => {
          setRefreshing(true);
          fetch('https://api.coinlore.net/api/tickers/')
          .then(response => response.json())
          .then(data =>
            {
              setRefreshing(false);
            setCoins(data.data)
          });
        }}
          tintColor="#fff"
        />
      }
      >

        

        {coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase())).map(coin => {
        
          return (

            <Pressable key={coin.id} style={styles.coin} onPress={
              () => {
                navigation.navigate('CoinDetailsScreen', {Coin:coin});
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
              {
                coin.percent_change_24h < 0 ? (
                  <View style={{
                    display:"flex",
                    flexDirection:"row",
                    alignItems:"center",
                  }}>
                    <Text style={styles.coin_text}>{coin.percent_change_1h} </Text>
                    <Image source={require('./assets/arrow_down.png')} style={{width:15,height:15,marginLeft:10}} />

                  </View>
                ) : (
                  <View style={{
                    display:"flex",
                    flexDirection:"row",
                    alignItems:"center",

                  }}>
                    <Text style={styles.coin_text}>{coin.percent_change_24h} </Text>
                    <Image source={require('./assets/arrow_up.png')} style={{width:15,height:15,marginLeft:10}} />
                  </View>
                )
              }
              
              
            </Pressable>
          );
        })}
      </ScrollView>
      <StatusBar style="auto"
      />
    </SafeAreaView>
    )
  }

  
function CoinDetailsScreen({navigation,route}){

  const {Coin} = route.params;

  const getImage = (name) => {
    if(name){
      const nname = name.toLowerCase().replace(' ', '-');
      return `https://c1.coinlore.com/img/25x25/${nname}.png`;
    }
  }


  const [coinvalue, setCoinvalue] = useState("");
  const [dollarvalue, setDollarvalue] = useState("");

  





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
              <Image source={require('./assets/arrow_down.png')} style={{width:20,height:20,marginLeft:10}} />
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
              <Image source={require('./assets/arrow_up.png')} style={{width:20,height:20,marginLeft:10}} />
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
          navigation.navigate("Home")
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







  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={
         { headerShown:false
          }
        } />
        <Stack.Screen name="CoinDetailsScreen" component={CoinDetailsScreen} options={
          { headerShown:false
            }
        } />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

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
