import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import Home from './../screen/Home'
import Detail from './../screen/Details'

const CakeStack=createStackNavigator()

export default ()=>{
    return(
        <CakeStack.Navigator>
            <CakeStack.Screen name='Home' component={Home} options={{headerShown: false}}/>
            <CakeStack.Screen name='Detail' component={Detail}/>
        </CakeStack.Navigator>
    )
}