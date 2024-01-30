import React, { useState } from 'react'
import {ScrollView, View,Pressable,TextInput, ImageBackground, Dimensions, SafeAreaView,Text} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';

export default function ProductInfo() {
    const route=useRoute()
    const {width}=Dimensions.get("window")
    const height=width
    const [addedToCart,setAddedToCart]=useState(false)
    const navigation=useNavigation();

    const addItemToCart=async(item)=>
    {
        try {
            const userId=await AsyncStorage.getItem('userId')
            const response=await axios.post('/addItemToCart',{item,userId})
            console.log(response.data)
            setAddedToCart(true)
            setTimeout(()=>
            {
                setAddedToCart(false)
            },100)
        }
        catch(err)
        {
            console.log(err)
        }
    }
  return (
    <SafeAreaView backgroundColor="white">
        <View style={{backgroundColor:'#87C4FF',paddingTop:37,height:100}}>
            <Pressable>
                <Text style={{marginLeft:13,paddingBottom:1,fontWeight:'bold',color:'blue',marginLeft:40}}>SHOP DAILY</Text>
            </Pressable>
            <View style={{flexDirection:'row',}}>
                <Pressable onPress={()=>navigation.pop()} style={{marginLeft:2,paddingTop:6}}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </Pressable>
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
            <ScrollView  horizontal showsHorizontalScrollIndicator={false} pagingEnabled>
            {route.params.carouselImages.map((item,index)=>
            (
                <ImageBackground style={{width,height,}} source={{uri:item}} key={index}>
                    <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                        <View 
                        style={{
                            width:40,
                            height:40,
                            borderRadius:20,
                            backgroundColor:'red',
                            marginLeft:10,
                            marginTop:10,
                            alignItems:'center',
                            justifyContent:'center',
                            flexDirection:'row',
                        }}>
                            <Text style={{textAlign:'center',fontSize:12,fontWeight:'bold'}}>20% off</Text>
                        </View>

                        <View 
                        style={{
                            width:40,
                            height:40,
                            borderRadius:20,
                            backgroundColor:'#E0E0E0',
                            marginRight:10,
                            marginTop:10,
                            alignItems:'center',
                            justifyContent:'center',
                            flexDirection:'row',
                        }}>
                            <Entypo name="share" size={24} color="black" />
                        </View>
                    </View>
                    <View 
                         style={{
                            width:40,
                            height:40,
                            borderRadius:20,
                            backgroundColor:'#E0E0E0',
                            marginLeft:10,
                            marginTop:'auto',
                            alignItems:'center',
                            justifyContent:'center',
                            flexDirection:'row',
                        }}>
                            <FontAwesome5 name="heart" size={24} color="black" />
                        </View>
                </ImageBackground>
            ))}
            </ScrollView>
            <View style={{padding:10}}>
            <Text style={{fontWeight:600}}>
                {route?.params?.title}
            </Text>
            <Text style={{fontWeight:'bold'}}>
            ₹ {route?.params?.price}
            </Text>
            </View>

            <Text style={{height:1,borderWidth:2 ,borderColor:"#ccc",marginTop:10}}></Text>

            <View style={{flexDirection:'row',alignItems:'center',padding:10}}>
                <Text>Color: </Text>
                <Text style={{fontSize:15,fontWeight:'bold'}}>{route.params?.color}</Text>
            </View>

            <View style={{flexDirection:'row',alignItems:'center',padding:10}}>
                <Text>Size: </Text>
                <Text style={{fontSize:15,fontWeight:'bold'}}>{route.params?.size}</Text>
            </View>

            <Text style={{height:1,borderWidth:2 ,borderColor:"#ccc",marginTop:10}}></Text>
         
            <View style={{padding:10}}>
                <Text style={{fontSize:12,fontWeight:'bold',marginVertical:5}}>Total: {route.params.price}</Text>
                <Text style={{color:'blue'}}>FREE delivery Tomorrow by 3 PM order within 10hrs 30 mins</Text>
            </View>
            <View style={{flexDirection:'row',marginHorizontal:10,marginLeft:10}}>
                <EvilIcons name="location" size={24} color="black" />
                <Text style={{color:'blue'}}>Select Deleivery Location</Text>
            </View>
            <View style={{marginHorizontal:10,marginVertical:10,gap:10,paddingBottom:100}}>
                <Pressable 
                onPress={()=>addItemToCart(route?.params?.item)}
                style={{
                    height:40,
                    backgroundColor:'#FFC72C',
                    alignItems:'center',
                    justifyContent:'center',
                    borderRadius:20
                    }}>
                    {addedToCart?(
                        <Text style={{fontSize:18,fontWeight:500}}>Added to Cart</Text>
                    ):
                    (<Text style={{fontSize:18,fontWeight:500}}>Add to Cart</Text>)
                    }
                </Pressable>

                <Pressable 
                style={{
                    height:40,
                    backgroundColor:'#FFAC1C',
                    alignItems:'center',
                    justifyContent:'center',
                    borderRadius:20,
                    }}>
                    <Text style={{fontSize:18,fontWeight:500}}>Buy Now</Text>
                </Pressable>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

