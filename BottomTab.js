import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Cart from './Cart';
import Account from './Account';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function BottomTab() {
  const Tab=createBottomTabNavigator()
  return (
    <Tab.Navigator initialRouteName='home' tabBarOptions={{
      style:{borderTopWidth:1,borderTopColor:'black',}
      }} >
      <Tab.Screen name='home' component={Home} 
      options={{
        tabBarLabel:"home",
        tabBarLabelStyle:{color:'black'},
        headerShown:false,
        tabBarIcon:({focused})=>
        focused?
          (<FontAwesome5 name="home" size={24} color="#87C4FF" />):
          (<FontAwesome5 name="home" size={24} color="black" />)
      }}/>
      <Tab.Screen name='cart' component={Cart}
      options={{
        tabBarLabel:"cart",
        tabBarLabelStyle:{color:'black'},
        headerShown:false,
        tabBarIcon:({focused})=>
        focused?
          (<Feather name="shopping-cart" size={24} color="#87C4FF" />):
          (<Feather name="shopping-cart" size={24} color="black" />)
      }}/>
      <Tab.Screen name='user' component={Account}
      options={{
        tabBarLabel:"user",
        tabBarLabelStyle:{color:'black'},
        headerShown:false,
        tabBarIcon:({focused})=>
        focused?
          (<Ionicons name="person-circle-sharp" size={24} color="#87C4FF" />):
          (<Ionicons name="person-circle-sharp" size={24} color="black" />)
      }}/>
    </Tab.Navigator>
  )
}
