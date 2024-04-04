import React,{useEffect} from 'react';
import {BottomTabs} from './BottomTabs';
import { BackHandler } from 'react-native';
const Dashboard = ({navigation}) => {

  useEffect(() => {
    const handleBackButton = () => {
      return true; // Return true to prevent default back button behavior
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  return (
    <>
      <BottomTabs />
    </>
  );
};
export {Dashboard};
