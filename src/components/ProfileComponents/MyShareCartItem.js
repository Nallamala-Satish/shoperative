import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ShareCartItem} from '../CheckOutPages/ShareCartItem';
import {ShareCartUser} from '../CheckOutPages/ShareCartUser';
import {useRoute} from '@react-navigation/native';
import ActivityStatus from '../shared/ActivityStatus';
import { HeaderComponent } from '../CustomComponents/HeaderComponent';

const Tab = createMaterialTopTabNavigator();

const MyShareCartItem = () => {
  const route = useRoute();
  const {cart} = route.params;
  const [loading, setLoading] = useState(false);

  return (
    <View style={{flex:1}}>
      <ActivityStatus message={''} loading={loading} />
      <HeaderComponent title={'My Shared cart'} />
      <Tab.Navigator
        screenOptions={{tabBarLabelStyle: {fontSize: 15, fontWeight: '500', textTransform: 'none',}}}>
        <Tab.Screen
          name="ShareCartUser"
          component={ShareCartUser}
          initialParams={{cart}}
          options={{ tabBarLabel: 'User Wise' }} 
        />
        <Tab.Screen
          name="ShareCartItem"
          component={ShareCartItem}
          initialParams={{cart}}
          options={{ tabBarLabel: 'Item Wise' }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {MyShareCartItem};
