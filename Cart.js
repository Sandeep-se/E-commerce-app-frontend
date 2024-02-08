import React, { useEffect, useState } from 'react'
import { View ,Text, SafeAreaView,Pressable,TextInput,Image, ScrollView,StatusBar} from 'react-native'
import { FontAwesome} from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { useCartDetails } from './CartProvider';
import io from 'socket.io-client'
const socket=io("https://shop-daily-backend.onrender.com")

function Basket() {
  const {details,setDetails}=useCartDetails()

  const getData = async()=> {
    try {
      const userId = await AsyncStorage.getItem('userId');
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
   
  const moveItemToOrder=async()=>
  {
    try{
      const userId = await AsyncStorage.getItem('userId');
      if(userId)
      {
        console.log(userId)
        const response=await axios.post('/moveItemToOrder',{userId});
        console.log(response.data)
      }
    }
    catch(err)
    {
      console.log(err.message)
    }
  }

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

  const incrementQuantity=async(item)=>
  {
    const id = await AsyncStorage.getItem('userId');
    const response=await axios.post('/incrementQuantity',{userId:id,itemId:item.id})
    console.log(response.data)
  }
  const decrementQuantity=async(item)=>
  {
    const id = await AsyncStorage.getItem('userId');
    const response=await axios.post('/decrementQuantity',{userId:id,itemId:item.id})
    console.log(response.data)
  }
  const removingItemToCart=async(item)=>
  {
    const id = await AsyncStorage.getItem('userId');
    const response=await axios.delete('/removeItemToCart',{params:{userId:id,itemId:item.id}})
    console.log(response.data)
  }
  
  const total=Math.round(details?.basket?.map((item)=>item.price*item.quantity).reduce((prev,curr)=>prev+curr,0))
  const noOfproducts=details?.basket?.map((item)=>item.quantity).reduce((prev,curr)=>prev+curr,0)
  return (
    <SafeAreaView>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <View style={{backgroundColor:'#87C4FF',paddingTop:37,height:100}}>
        <Pressable>
          <Text style={{marginLeft:13,paddingBottom:1,fontWeight:'bold',color:'blue'}}>SHOP DAILY</Text>
        </Pressable>
        <View style={{flexDirection:'row',}}>
            <Pressable
            style={{
              flexDirection:'row',
              alignItems:'center',
              marginHorizontal:10,
              backgroundColor:'white',
              gap:5,
              borderWidth:1,
              borderColor:'#ccc',
              borderRadius:5,
              height:40,
              flex:1
            }}>
            <FontAwesome style={{paddingLeft:10}} name="search" size={24} color="black" />
            <TextInput style={{flex:1}} placeholder='search'></TextInput>
            <MaterialIcons name="keyboard-voice" size={24} color="black" />
            </Pressable>
          </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{backgroundColor:'white'}}>
          <View style={{padding:10,justifyContent:'center',}}>
            <Text style={{fontSize:18,fontWeight:500}}>Subtotal :₹ {isNaN(total)?0:total}</Text>
          </View>
          <Text style={{marginHorizontal:10,}}> EMI details Available</Text>
          <Pressable onPress={moveItemToOrder} style={{backgroundColor:'#FFC72C',padding:10,borderRadius:5,justifyContent:'center',alignItems:'center',marginHorizontal:10,marginTop:10}}>
            <Text>Proceed to Buy ({noOfproducts}) items</Text>
          </Pressable>

          <Text style={{height:1, borderColor:'#D0D0D0',borderWidth:1,marginTop:16}}></Text>
        </View>
        

        <View style={{backgroundColor:"white",marginBottom:80}}>
          {details?.basket?.map((item,index)=>(
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
                  <Pressable 
                    onPress={item?.quantity===1? ()=>removingItemToCart(item):()=>decrementQuantity(item)}
                    style={{
                    backgroundColor:"lightblue",
                    borderRadius:5,
                    marginHorizontal:10
                    }}>
                      {item.quantity===1?(<MaterialIcons name="delete" size={24} color="black" />):(<Entypo name="minus" size={24} color="black" />)}
                  </Pressable>
                  <Text style={{fontWeight:'bold',borderRadius:5,marginHorizontal:10}}>{item.quantity}</Text>
                  <Pressable
                   onPress={(()=>incrementQuantity(item))}
                   style={{
                    backgroundColor:"lightblue",
                    borderRadius:5,marginHorizontal:10
                    }}>
                      <Entypo name="plus" size={24} color="black" />
                  </Pressable>
                  <Pressable 
                  onPress={()=>removingItemToCart(item)}
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
                      <Text style={{fontSize:15,fontWeight:500}}>remove</Text>
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

export default Basket
 