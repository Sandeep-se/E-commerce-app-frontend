import React, { useEffect} from 'react'
import { View ,Text, SafeAreaView,Pressable,StatusBar,Image, ScrollView} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { useCartDetails } from './CartProvider';
import io from 'socket.io-client'
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
const socket=io("https://shop-daily-backend.onrender.com")

export default function Orders() {
  const {details,setDetails}=useCartDetails()
  const navigation=useNavigation()
  const getData = async()=> {
    try {
      const userId = await AsyncStorage.getItem('userId')
      if (userId) 
      {
        const response = await axios.get('/getData', {params:{userId}})
  
        if (response.data.User) {
          setDetails(response.data.User)
        }
        else {
          console.log('User data not found')
        }
      } 
      else {
        console.log('userId is not found in AsyncStorage');
      }
    } 
    catch (error) {
      console.error('Error while fetching data:', error)
    }
  };

  useEffect(()=>
  {
    socket.on('customEvent', (message) => {
      console.log('Received from server:', message);
    });
    socket.on('basket',(data)=>{
      console.log(data.message)
      setDetails(data.User)
    })
    getData()
    return()=>{
      socket.off('basket')
      socket.off('customEvent')
    }
  },[])

  const removingItemToOrder=async(item)=>
  {
    const id = await AsyncStorage.getItem('userId');
    const response=await axios.delete('/removeItemToOrder',{params:{userId:id,itemId:item.id}})
    console.log(response.data)
  }
  return (
    <SafeAreaView>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <View style={{backgroundColor:'#87C4FF',paddingTop:50,height:100}}>
            <View style={{flexDirection:'row'}}>
              <Pressable onPress={()=>navigation.popToTop()} style={{marginLeft:2,paddingTop:9}}>
                <AntDesign name="arrowleft" size={24} color="black" />
              </Pressable>
              <View style={{flex:1,flexDirection:'row',justifyContent: 'center'}}>
                <Text style={{color:'blue',fontSize:30,fontWeight:'bold'}}>SHOP DAILY</Text>
              </View>
            </View>
        </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{backgroundColor:"white",marginLeft:5,flex:1}}>
                <Text style={{fontSize:18,marginVertical:5}}>Order's Details</Text>
                <Text style={{height:1, borderColor:'#D0D0D0',borderWidth:1}}></Text>
        </View>
        <View style={{backgroundColor:"white",marginBottom:80}}>
          {details?.orders?.map((item,index)=>(
            <View key={index} 
            style={{
              backgroundColor:'white',
              marginVertical:10,
              borderBottomColor:'#F0F0F0',
              borderWidth:2,
              borderLeftWidth:0,
              borderTopWidth:0,
              borderRightWidth:0

              }}>
              <Pressable style={{marginVertical:10,flexDirection:'row',justifyContent:'space-around'}}>
                <View>
                  <Image style={{width:140,height:140,resizeMode:'contain'}} source={{uri:item?.image}}/>
                </View>

                <View>
                  <Text  style={{width:150,marginTop:10}}>{item?.title}</Text>
                  <Text style={{fontSize:20,fontWeight:500,marginTop:6}}>₹ {item?.price}</Text>
                </View>
              </Pressable>
              <Pressable>
                <View style={{flexDirection:'row',marginHorizontal:10,marginVertical:10,alignItems:'center'}}>
                  
                  <Pressable>
                    <Text style={{fontSize:15,fontWeight:500}}>noOfproducts:</Text>
                  </Pressable>
                  <Text style={{fontWeight:'bold',borderRadius:5,marginHorizontal:10}}>{item.quantity}</Text>
                  
                  <Pressable 
                  onPress={()=>removingItemToOrder(item)}
                  style={{
                    width:130,
                    backgroundColor:"#FFC72C",
                    borderRadius:5,
                    marginHorizontal:60,
                    height:30,
                    alignItems:'center',
                    justifyContent:'center',
                    borderRadius:5
                    }}>
                      <Text style={{fontSize:15,fontWeight:500}}>cancel order</Text>
                  </Pressable>
                </View>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
