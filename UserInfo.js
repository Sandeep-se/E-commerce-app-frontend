import React,{useState} from 'react'
import { Text,TextInput,View ,Pressable} from 'react-native'
import { useCartDetails } from './CartProvider';
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function UserInfo() {
    const {details,setDetails}=useCartDetails()
    const [action,setAction]=useState(true)
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [contact,setContact]=useState('')
    const [address,setAddress]=useState('')
    const navigation=useNavigation()

    const updateData=async()=>
    {
        setAction(!action)
        try{
            const userId = await AsyncStorage.getItem('userId')
            console.log({name,email,contact,address})
            const response=await axios.put('/updateData',{userId,name,email,contact,address})
            console.log(response.data)
            setName('')
            setEmail('')
            setContact('')
            setAddress('')
        }catch(err)
        {
            console.log(err)
        }
        return ;
    }
  return (
    <View>

        <View style={{backgroundColor:'#87C4FF',paddingTop:50,height:100}}>
            <View style={{flexDirection:'row'}}>
              <Pressable onPress={()=>navigation.popToTop()} style={{marginLeft:2,paddingTop:9}}>
                <AntDesign name="arrowleft" size={24} color="black" />
              </Pressable>
              <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:10,marginLeft:70}}>
                <Text style={{color:'blue',fontSize:30,fontWeight:'bold'}}>SHOP DAILY</Text>
              </View>
            </View>
        </View>
          
        <View>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginHorizontal:11}}>
                <Text style={{fontSize:20}}>User Information</Text>
                <Pressable onPress={action?()=>setAction(!action):updateData}>
                    <Text style={{textAlign:'center',fontSize:15
                    ,width:50,backgroundColor:'#f2f2f2',borderColor:'black',borderWidth:1,borderRadius:5
                    ,marginVertical:5}}>{action?"Edit":"Save"}</Text>
                </Pressable>
            </View>
            <View style={{height:action?220:350, borderColor:'#D0D0D0',borderWidth:1,borderRadius:10,marginHorizontal:10}}>
            {action?(
                <View>
                    <Text style={{marginLeft:5,fontSize:20,paddingVertical:5}}>Name:{"    "}{details?.name}</Text>
                    <Text style={{marginLeft:5,fontSize:20,paddingVertical:5}}>Email:{"     "}{details?.email}</Text>
                    <Text style={{marginLeft:5,fontSize:20,paddingVertical:5}}>Conatct:{" "}{details?.contact}</Text>
                    <Text style={{marginLeft:5,fontSize:20,paddingVertical:5}}>Address:{" "}{details?.address}</Text>
                </View>
            ):(
                <View>
                    <Text style={{marginLeft:5,fontSize:17,paddingVertical:5}}>Name:</Text>
                    <TextInput style={{marginLeft:5,paddingLeft:5,borderWidth:1,width:300,borderRadius:10,borderColor:'#D0D0D0',height:35}} value={name} onChangeText={(text)=>setName(text)}/>
                    <Text style={{marginLeft:5,fontSize:17,paddingVertical:5}}>Email:</Text>
                    <TextInput style={{marginLeft:5,paddingLeft:5,borderWidth:1,width:300,borderRadius:10,borderColor:'#D0D0D0',height:35}} value={email} onChangeText={(text)=>setEmail(text)}/>
                    <Text style={{marginLeft:5,fontSize:17,paddingVertical:5}}>Conatct:</Text>
                    <TextInput style={{marginLeft:5,paddingLeft:5,borderWidth:1,width:300,borderRadius:10,borderColor:'#D0D0D0',height:35}} value={contact} onChangeText={(text)=>setContact(text)}/>
                    <Text style={{marginLeft:5,fontSize:17,paddingVertical:5}}>Address:</Text>
                    <TextInput style={{marginLeft:5,paddingLeft:5,borderWidth:1,width:300,borderRadius:10,borderColor:'#D0D0D0',height:35}} value={address} onChangeText={(text)=>setAddress(text)}/>
                    
                </View>
            )}
            </View>
            
        </View>
    </View>
  )
}
