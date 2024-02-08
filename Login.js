import { SafeAreaView,View,StyleSheet, Text, TextInput,TouchableOpacity,StatusBar,KeyboardAvoidingView, Alert,Pressable} from 'react-native';
import { useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Login() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [flag,setFlag]=useState(true)
  const [showPassword,setShowPassword]=useState(false)
  const navigation=useNavigation()
  const login=async()=>  
  {
    try{
      const response=await axios.post('/signIn',{email,password})
      console.log(response.data)
      console.log(response.data)
      if(response.data.message==='incorrect password' || response.data.message==='incorrect email')
      {
        setFlag(false)
        setTimeout(()=>
        {
          setFlag(true)
        },1000)
      }
      else if(response.data.message==='signIn success')
      {
        console.log(response.data)
        await AsyncStorage.setItem('userId',response.data.userId)
        navigation.push('main')
      }
      else
      {
        console.log('unexcepted response',response.data.message)
      }
    }
    catch(err)
    {
      console.log(err)
    }
    finally{
      setEmail('')
      setPassword('')
    }
  }
  return (
    <KeyboardAvoidingView>
      <SafeAreaView style={styles.container}>
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
          <View style={{alignItems:'center'}}>
            <Text style={{
              fontSize:16,
              marginTop:50,
              fontWeight:'bold',
              textDecorationLine:'underline'
            }}>Login in to your Account</Text>
          </View>
          
          <View style={{alignItems:'center'}}>
              <View style={{marginTop:70}}>
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
          <View style={{alignItems:'center'}}>{flag?<></>:<Text style={{color:'red'}}>Incorrect email or password</Text>}</View>
          <View style={{alignItems:'center'}}>
            <View>
                <Text>New User ? {' '}<Text style={{color:'blue',textDecorationLine:'underline'}} onPress={()=>navigation.push('signUp')}>Sign Up</Text></Text>
              </View>

              <TouchableOpacity style={styles.button} onPress={login}>
                <Text style={{color:'white',fontWeight:'bold'}} >Sign In</Text>
              </TouchableOpacity>
          </View>
      </SafeAreaView> 
    </KeyboardAvoidingView>
  );
}

const styles=StyleSheet.create({
  content:
  {
    fontSize:15,
    marginBottom:10,
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
 
