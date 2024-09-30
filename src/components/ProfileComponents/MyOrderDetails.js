import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ShareCartItem} from '../CheckOutPages/ShareCartItem';
import {ShareCartUser} from '../CheckOutPages/ShareCartUser';
import {useRoute} from '@react-navigation/native';
import ActivityStatus from '../shared/ActivityStatus';
import { HeaderComponent } from '../CustomComponents/HeaderComponent';

const Tab = createMaterialTopTabNavigator();

const MyOrderDetails = () => {
    const route = useRoute();
    const {order} = route.params;
    const [loading, setLoading] = useState(false);
    console.log(order)
    return (
        <View style={{flex:1}}>
          <ActivityStatus message={''} loading={loading} />
          <HeaderComponent title={'Order Details'} />
            <View style={styles.card}>
                <Text style={{fontSize:20,fontWeight:'500',color:'black',fontSize:20}}>Order Information</Text>
                <View style={{flexDirection:'row',}}>
                 <View style={{padding:10}}>
                     <Text style={{color:'black',fontSize:20}}>Order # : </Text>
                     <Text style={{color:'black',fontSize:20}}>Order Date :</Text>
                     <Text style={{color:'black',fontSize:20}}>Shipping Date :</Text>
                     <Text style={{color:'black',fontSize:20}}>Order Quantity :</Text>
                 </View>
                 <View style={{padding:10}}>
                     <Text style={{color:'black',fontSize:20}}> {order && order.orderNumber}</Text>
                     <Text style={{color:'black',fontSize:20}}> {order && order.orderDate}</Text>
                     <Text style={{color:'black',fontSize:20}}> {order && order.ShippingDate}</Text>
                     <Text style={{color:'black',fontSize:20}}> {order && order.qty}</Text>
                 </View>
                 </View>
                 <View style={{flexDirection:'row',}}>
                    <View style={{padding:10}}>
                    <Text style={{fontWeight:'bold',color:'black',fontSize:20}}>Sub Total </Text>
                    <Text  style={{fontWeight:'bold',color:'black',fontSize:20}}>Shipping Charges </Text>
                    <Text  style={{fontWeight:'bold',color:'black',fontSize:20}}>Saving Amount </Text>
                     <Text  style={{fontWeight:'bold',color:'black',fontSize:20}}> Total </Text>
                    </View>
                    <View style={{padding:10}}>
                      <Text style={{fontWeight:'bold',color:'black',fontSize:20}}>    {order && order.subTotal}</Text>
                      <Text  style={{fontWeight:'bold',color:'black',fontSize:20}}>   {order && order.shippingPrice}</Text>
                      <Text  style={{fontWeight:'bold',color:'black',fontSize:20}}>   {order && order.savingAmount}</Text>
                      <Text  style={{fontWeight:'bold',color:'black',fontSize:20}}>   {order && order.totalPrice}</Text>
                    </View>
                 </View>
                
            </View>
            <View style={styles.card}>
                <Text style={{fontSize:20,fontWeight:'500',color:'black',fontSize:20}}>Shipping Information</Text>
                <View style={{flexDirection:'row',}}>
                 <View style={{padding:10}}>
                     <Text style={{color:'black',fontSize:20}}>Shipping Date :</Text>
                     <Text style={{color:'black',fontSize:20}}>Shipping Address :</Text>
                     <Text style={{color:'black',fontSize:20}}>Pincode  : </Text>
                     <Text style={{color:'black',fontSize:20}}>Mobile :</Text>
                 </View>
                 <View style={{padding:10}}>
                     <Text style={{color:'black',fontSize:20}}> {order && order.ShippingDate}</Text>
                     <Text style={{color:'black',fontSize:20}}> {order && order.address}</Text>
                     <Text style={{color:'black',fontSize:20}}> {order && order.pincode}</Text>
                     <Text style={{color:'black',fontSize:20}}> {order && order.mobile}</Text>
                 </View>
                 </View>
                
            </View>
           
          {/* <Tab.Navigator
            screenOptions={{tabBarLabelStyle: {fontSize: 15, fontWeight: '500', textTransform: 'none',}}}>
            <Tab.Screen
              name="ShareCartUser"
              component={ShareCartUser}
              initialParams={{order}}
              options={{ tabBarLabel: 'User Wise' }} 
            />
            <Tab.Screen
              name="ShareCartItem"
              component={ShareCartItem}
              initialParams={{order}}
              options={{ tabBarLabel: 'Item Wise' }}
            />
          </Tab.Navigator> */}
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
      card : {
        width: '95%',
        // height: 120,
        backgroundColor: 'lightgray',
        borderRadius: 10,
        shadowColor: 'black',
        marginVertical: 8,
        shadowOffset: {width: 0, height: 3},
        shadowRadius: 10,
        shadowOpacity: 0.8,
        elevation: 6,
        padding: 10,
        // flexDirection: 'row',
        alignSelf: 'center',
        margin:10
      }
    });
export  {MyOrderDetails}