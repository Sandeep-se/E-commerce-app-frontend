import React, { useState } from 'react'
import { Pressable, View ,Image,Text, Dimensions} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';

const {width}=Dimensions.get('window')
const itemWidth=(width-40)/2
export default  function ProductItem({item}) {
  const [addedToCart,setAddedToCart]=useState(false)
  const navigation=useNavigation();
  const addItemToCart=async(item)=>
    {
        try {
            const userId=await AsyncStorage.getItem('userId')
            const response=await axios.post('/addItemToCart',{item,userId})
            console.log(response.data)
            if(response.data.message==="signIn")
            {
              navigation.push("signIn")
            }
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
        <Image style={{width:itemWidth,height:150,resizeMode:"contain"}} source={{uri:item?.image}}/>

        <Text  numberOfLines={1} style={{width:itemWidth,marginTop:10}}>{item?.title}</Text> 
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
        width:itemWidth-20,
        height:30,
        marginHorizontal:10,
        marginBottom:10,
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

// import React, { useState, useEffect } from 'react';
// import { Pressable, View, Image, Text, Dimensions } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// const { width } = Dimensions.get('window');
// const itemWidth = (width - 40) / 2; // Assuming you want 2 items per row with 10 margin on both sides

// export default function ProductItem({ item }) {
//   const [addedToCart, setAddedToCart] = useState(false);

//   const addItemToCart = async (item) => {
//     try {
//       const userId = await AsyncStorage.getItem('userId');
//       const response = await axios.post('/addItemToCart', { item, userId });
//       console.log(response.data);
//       setAddedToCart(true);
//       setTimeout(() => {
//         setAddedToCart(false);
//       }, 100);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <Pressable style={{ marginHorizontal: 10, marginVertical: 10, width: itemWidth }}>
//       <Image style={{ width: itemWidth, height: 150, resizeMode: 'contain' }} source={{ uri: item?.image }} />

//       <Text numberOfLines={1} style={{ width: itemWidth, marginTop: 10 }}>
//         {item?.title}
//       </Text>
//       <View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
//         <Text style={{ fontSize: 15, fontWeight: 'bold' }}>₹ {item?.price}</Text>
//         <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#FFC27C' }}>{item?.rating?.rate} ratings</Text>
//       </View>
//       <Pressable
//         onPress={() => addItemToCart(item)}
//         style={{
//           flex: 1,
//           backgroundColor: '#FFC72C',
//           alignItems: 'center',
//           justifyContent: 'center',
//           borderRadius: 10,
//           height: 30,
//           marginTop: 10,
//           fontWeight: 'bold',
//         }}>
//         {addedToCart ? <Text style={{ fontWeight: '500' }}>Added to Cart</Text> : <Text style={{ fontWeight: '500' }}>Add to Cart</Text>}
//       </Pressable>
//     </Pressable>
//   );
// }

