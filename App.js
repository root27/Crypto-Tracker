import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,SafeAreaView,ScrollView,Image, TextInput,ActivityIndicator,RefreshControl} from 'react-native';
import { useEffect,useState } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";


export default function App() {

  const Stack = createNativeStackNavigator();


  function HomeScreen (){

    const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  const [refreshing, setRefreshing] = useState(false);

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
            <View key={coin.id} style={styles.coin}>
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
              
              
            </View>
          );
        })}
      </ScrollView>
      <StatusBar style="auto"
      />
    </SafeAreaView>
    )
  }




  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
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
