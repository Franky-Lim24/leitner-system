import React from 'react';

import {createStackNatigator} from '@react-navigator/stack';

import SplashScreen from './SplashScreen';
import SignUpScreen from './SignUpScreen';
import SignInScreen from './SignInScreen';
const Rootstack = createStackNavigator();

const RootStackScreen=({navigation}) => {
    <RootStackScreen headerMode='none'>
        <RootStackScreen name="SplashScreen" component={SplashScreen}/>
        <RootStackScreen name="SignInScreen" component={SignInScreen}/>
        <RootStackScreen name="SignUpScreen" component={SignUpScreen}/>
    </RootStackScreen>
}