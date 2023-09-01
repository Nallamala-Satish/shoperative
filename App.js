import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider, useDispatch, useSelector} from 'react-redux';
import { getUserProfileInfo } from './src/utils/AsyncStorageHelper';
import Routes from './src/utils/Routes';
import { setuser } from './src/Redux/reducer/User';


const App = () => {
  
    const dispatch = useDispatch()

    const checkUser = async () => {
      let account = await getUserProfileInfo()
      console.log("Acount", account);
      if (account) {
        console.log("account ID", account.user_id);
        dispatch(setuser(account))
      }
    }

    useEffect(()=>{
      checkUser()
    },[])
    return (
      <SafeAreaProvider>
        <StatusBar backgroundColor={'#ED7421'}/>
    
           <Routes/>
    
      </SafeAreaProvider>
    );
  };


export default App;
