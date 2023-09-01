
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, Text } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { Splash } from '../components/Splash';
import { Register } from '../components/Register';
import { PowerUserRegister } from '../components/PowerUserRegister';
import { Signup } from '../components/Signup';
import { ForgetPassword } from '../components/ForgetPassword';
import { OtpVerification } from '../components/OtpVerification';
import { Login } from '../components/Login';
import MainRoute from './MainRoute';


const RootStack = createStackNavigator();

const Routes = () => {
  
  return (
    <NavigationContainer>
         <RootStack.Navigator >
         <RootStack.Screen  name="Splash"   component={Splash}  options={{headerShown: false}} />
              <RootStack.Screen
                name="Login"
                component={Login}
                options={{headerShown: false}}
              />
        
                <RootStack.Screen name="MainRoute"   component={MainRoute}  options={{headerShown: false}} />
               <RootStack.Screen name="Register"   component={Register}  options={{ headerShown: false}} />
               <RootStack.Screen name="PowerUserRegister"   component={PowerUserRegister} options={{ headerShown: false}} />
               <RootStack.Screen name="SignUp"   component={Signup} options={{ headerShown: false}} />
               <RootStack.Screen name="ForgetPassword"   component={ForgetPassword}  options={{ headerShown: false}} />
               <RootStack.Screen name="OtpVerification"   component={OtpVerification} options={{ headerShown: false}} />
            </RootStack.Navigator>

            
          </NavigationContainer>
  );
}

export default Routes;
