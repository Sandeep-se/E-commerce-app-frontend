import React from 'react'
import {createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Register from './Register'
import Login from './Login'
import BottomTab from './BottomTab'
import ProductInfo from './ProductInfo'
import Orders from './Orders'
import UserInfo from './UserInfo'

export default function Navigation() {
    const Stack=createStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='main'>
          <Stack.Screen name="signIn" options={{headerShown:false}}component={Login}/>
          <Stack.Screen name="signUp" options={{headerShown:false}}component={Register}/>
          <Stack.Screen name='main' options={{headerShown:false}} component={BottomTab} />
          <Stack.Screen name='info' options={{headerShown:false}} component={ProductInfo}/>
          <Stack.Screen name='orders' options={{headerShown:false}} component={Orders}/>
          <Stack.Screen name='userInfo' options={{headerShown:false}} component={UserInfo}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
