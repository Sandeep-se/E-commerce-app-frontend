import React, { useState } from 'react'
import { Pressable, View ,Image,Text} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'


export default  function ProductItem({item}) {
  const [addedToCart,setAddedToCart]=useState(false)
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
    <Pressable style={{marginHorizontal:10,marginVertical:10}}>
        <Image style={{width:150,height:150,resizeMode:"contain"}} source={{uri:item?.image}}/>

        <Text  numberOfLines={1} style={{width:150,marginTop:10}}>{item?.title}</Text> 
        <View style={{marginTop:5,flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontSize:15,fontWeight:'bold'}}>₹ {item?.price}</Text>
            <Text style={{fontSize:15,fontWeight:'bold',color:'#FFC27C'}}>{item?.rating?.rate} ratings</Text>
        </View>
        <Pressable 
        onPress={()=>addItemToCart(item)}
        style={{flex:1,
        backgroundColor:'#FFC72C',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        height:30,
        marginHorizontal:10,
        marginTop:10,
        fontWeight:'bold'
        }}>
          {addedToCart?(
            <Text style={{fontWeight:'500'}}>Added to Cart</Text>
          ):
          (<Text style={{fontWeight:'500'}}>Add to Cart</Text>)
          }
        </Pressable>
    </Pressable>
  )
}

