import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import { View ,Text, SafeAreaView,Pressable,TextInput, ScrollView} from 'react-native'
import { useCartDetails } from './CartProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import io from 'socket.io-client'
import Geolocation from 'react-native-geolocation-service'
const socket=io("https://shop-daily-backend.onrender.com")
import { FontAwesome } from '@expo/vector-icons';


export default function User() {
  const {details,setDetails}=useCartDetails()
  const [addLan,setAddLan]=useState(false)
  const [order,setOrder]=useState(false)
  let [asyncId,setAsyncId]=useState(null)
  // const [user_Id,setUser_Id]=useState(null)
  const [location,setLocation]=useState('Location:Not Available')
  const navigation=useNavigation()

  const fetchLocation=()=>
  {
    Geolocation.getCurrentPosition((position)=>
    {
      const {latitude,longitude}=position.coords
      setLocation(`Location:latitude ${latitude} longitude ${longitude}`)
    },(
      error=>{setLocation('Location: not available')
      console.warn(error.err)
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }))
    console.log(location)
  }

  const logOut=async()=>
  {
    try{
      await AsyncStorage.removeItem('userId')
      setDetails([])
    } 
    catch(err)
    {
      console.log(err)
    }
    setAsyncId(null)
  }

  const getData = async()=> {
    try {
      const userId = await AsyncStorage.getItem('userId');
      setAsyncId(userId)
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
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
      <View style={{backgroundColor:'#87C4FF',paddingTop:50,height:100}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:10}}>
          <Text style={{color:'blue',fontSize:30,fontWeight:'bold'}}>SHOP DAILY</Text>
          <Pressable style={{paddingTop:8}}
          onPress={asyncId ? logOut : () => navigation.push('signIn')}>
            {asyncId?<FontAwesome name="user-circle" size={28} color="blue" />:<FontAwesome name="user-circle" size={24} color="blue" />}
            {asyncId?<Text style={{fontSize:10,fontWeight:'bold'}}>Logout</Text>:<Text style={{fontSize:10,fontWeight:'bold'}}>Login</Text>}
          </Pressable>
        </View>
      </View>
      <ScrollView style={{backgroundColor:"white",}}>
        <View style={{flexDirection:'row',}}>
          <View style={{height:100,alignItems:'center',justifyContent:'center'}}>
            <Pressable 
            style={{
              width:70,
              height:70,
              backgroundColor:'#87C4FF',
              marginVertical:10,
              marginLeft:10,
              borderRadius:200,
              alignItems:'center',
              justifyContent:'center'
              }}>
              <Text style={{fontSize:40,color:'green'}}>{details?.name?details.name[0]:'G'}</Text>
            </Pressable>
          </View>
          <View style={{
            alignItems:'center',
            justifyContent:'center',
            marginLeft:10,
            flexDirection:'row',
            }}>
            <Text style={{fontSize:20}}>Hello - </Text>
            <Text style={{fontSize:20}}>{details?.name?details.name.split(' ')[0]:'Guest'}</Text>
          </View>
        </View>
        <Text style={{height:1,borderColor:'#d9d9d9',borderWidth:1}}></Text>
      
        <View style={{flexDirection:'row',marginVertical:10,marginHorizontal:20,justifyContent:'space-around',}}>
          <View>
            <Pressable onPress={()=>navigation.push('userInfo')}>
              <Text style={{textAlign:'center',borderWidth:1,borderColor:'#D0D0D0',width:150,height:30,fontSize:18,borderRadius:20,height:40,paddingTop:5}}>User Account</Text>
            </Pressable>
          </View>
          <View>
            <Pressable onPress={()=>navigation.push('orders')}>
              <Text style={{textAlign:'center',borderWidth:1,borderColor:'#D0D0D0',width:150,height:30,fontSize:18,borderRadius:20,height:40,paddingTop:6}}>Orders</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}