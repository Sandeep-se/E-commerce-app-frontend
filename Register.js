import { StatusBar } from 'expo-status-bar';
import { View,StyleSheet, Text, TextInput,TouchableOpacity, SafeAreaView,Image, KeyboardAvoidingView,Pressable } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Register() {
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [showPassword,setShowPassword]=useState(false)
  const navigation=useNavigation()
  const handleRegister=async()=>
  {
    try{
      const response=await axios.post('/signUp',{name,email,password})
      if(response.data.message==='signUp success' || response.data.message==='registered'){
      navigation.push('signIn')
      }
      console.log(response.data.message)
    }
    catch(err)
    {
      console.log(err)
    }
    finally{
      setName('')
      setEmail('')
      setPassword('')
    }
  }
  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <View style={{backgroundColor:'#87C4FF',paddingTop:50,height:100}}>
          <View style={{flexDirection:'row'}}>
            <Pressable onPress={()=>navigation.pop()} style={{marginLeft:2,paddingTop:9}}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </Pressable>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:10,marginLeft:70}}>
              <Text style={{color:'blue',fontSize:30,fontWeight:'bold'}}>SHOP DAILY</Text>
            </View>
          </View>
          </View> 
        <View>
          <Text style={{
            fontSize:16,
            fontWeight:'bold',
            marginTop:50,
            marginHorizontal:80,
            textDecorationLine:'underline'
          }}>Register to your Account</Text>
        </View>
        <View style={{marginHorizontal:20}}>
          <View style={{marginTop:70}}>
            <Text >Name</Text>
            <TextInput style={styles.input} placeholder='Enter your name' value={name} onChangeText={(text)=>setName(text)}/>
          </View>
          <View>
            <Text style={[styles.content]} >Email</Text>
            <TextInput style={styles.input} placeholder='Enter your email' value={email} onChangeText={(text)=>setEmail(text)}/>
          </View>
          <View>
            <Text style={[styles.content]}>Password</Text>
            <Pressable style={{flexDirection:'row',height:41,borderRadius:5,borderWidth:2,borderColor:'#ccc',width:300,alignItems:'center',}} >
                <TextInput value={password} onChangeText={(text)=>setPassword(text)} style={{flex:1,marginLeft:3,marginTop:1}} secureTextEntry={!showPassword} placeholder="Enter your password"></TextInput>
                <View style={{marginRight:3}}><MaterialCommunityIcons onPress={()=>{setShowPassword(!showPassword)}} name={showPassword?"eye-off-outline":"eye-outline"} size={20} color="#ccc" /></View>
            </Pressable>
          </View>
        </View>
        
        <View style={{marginHorizontal:70}}>
          <View>
            <Text>Already have Account ? {' '}<Text style={{color:'blue',textDecorationLine:'underline'}} onPress={()=>navigation.push('signIn')}>Sign In</Text></Text>
          </View>
        </View>
        <View style={{marginHorizontal:90}}>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={{color:'white',fontWeight:'bold'}} onPress={handleRegister}>Sign Up</Text>
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles=StyleSheet.create({
  content:
  {
    fontSize:15,
    marginTop:0,
    marginBottom:5,
  },
  input:
  {
    width:300,
    borderWidth:2,
    borderColor:'#ccc',
    padding:5,
    borderRadius:5,
    marginBottom:10
  },
  button:
  {
    width:150,
    padding:10,
    borderRadius:5,
    marginTop:20,
    backgroundColor:'blue',
    alignItems:'center'
  }
})