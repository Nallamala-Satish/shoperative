/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React,{ useState,useEffect } from 'react'
import {View, Text, StyleSheet, ScrollView,TouchableOpacity,Alert} from 'react-native';
import {OrderData} from '../../utils/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getUserProfileInfo } from '../../utils/AsyncStorageHelper'
import { baseURL } from '../../utils/Constants'
import { AppTable } from '../CustomComponents/AppTable';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {HeaderComponent} from '../CustomComponents/HeaderComponent';
import { useNavigation } from '@react-navigation/native'
import ActivityStatus from '../shared/ActivityStatus'

const Tab = createMaterialTopTabNavigator();
const MyOrders = () => {
  // const CustomCards = item => {
  //   const {
  //     orderId,
  //     time,
  //     trackId,
  //     quntity,
  //     totalAmount,
  //     leftTitle,
  //     rightTitle,
  //   } = item;
  //   return (
  //     <View style={styles.card}>
  //       <View style={styles.InsideCardView1}>
  //         <Text style={styles.OrdersTextStyles}>{`Order ID -${orderId}`} </Text>
  //         <Text style={{fontWeight: '500'}}>{time}</Text>
  //       </View>
  //       <Text
  //         style={{alignSelf: 'flex-start', marginTop: 5, fontWeight: '500'}}>
  //         Tracking Number: <Text style={styles.TrackingText}>{trackId}</Text>
  //       </Text>
  //       <View style={styles.InsideCardView2}>
  //         <Text style={{fontWeight: '500'}}>
  //           Quantity: <Text style={styles.TrackingText}>{quntity}</Text>
  //         </Text>
  //         <Text style={{fontWeight: '500'}}>
  //           Total Amount: <Text style={styles.TrackingText}>{totalAmount}</Text>
  //         </Text>
  //       </View>
  //       <View style={styles.InsideCardView3}>
  //         <View style={styles.DetailsButtonStyles}>
  //           <Text
  //             style={{
  //               color: '#333',
  //               fontSize: 12,
  //               fontWeight: '500',
  //             }}>
  //             {leftTitle}
  //           </Text>
  //         </View>
  //         <Text style={styles.DeliveredTextStyles}>{rightTitle}</Text>
  //       </View>
  //     </View>
  //   );
  // };

  // const YourOrders = () => {
  //   return (
  //     <ScrollView style={styles.container}>
  //       {OrderData.map(item => CustomCards(item))}
  //     </ScrollView>
  //   );
  // };

  const navigation = useNavigation()
  const [loading,setLoading] = useState(false)
  const [orderList,setOrderList] = useState([])

  const getSharedCartList = async ()=>{
    setLoading(true);
    const userInfo = await getUserProfileInfo();
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `${userInfo.token}`);


    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    await fetch(`${baseURL}/myOrders`, requestOptions)
      .then(response => response.text())
      .then(result => {
        const res = JSON.parse(result);
        console.log('sharedCart res1.', res,res.message);
        if (res && res.data.length > 0) {
          setOrderList(res.data)
          setLoading(false);
        }else{
          setLoading(false);
        }
        setLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setLoading(false);
      });
  }

  const getOrderDetails = async (orderId)=>{
    setLoading(true);
    const userInfo = await getUserProfileInfo();
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `${userInfo.token}`);

    var raw = JSON.stringify({
      "orderId":(orderId),
   });

   var requestOptions = {
     method: 'POST',
     headers: myHeaders,
     body: raw,
     redirect: 'follow',
   };
    await fetch(`${baseURL}/orderView`, requestOptions)
      .then(response => response.text())
      .then(result => {
        const res = JSON.parse(result);
        console.log('order details res1.', res,res.message);
        if (res && res.data.length > 0) {
          navigation.navigate('MyOrderDetails',{order:res.data[0]})
          // setOrderDetails(res.data)
          setLoading(false);
        }else{
          setLoading(false);
        }
        setLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setLoading(false);
      });
  }

  const CancelOrder = async (orderId)=>{
    setLoading(true);
    const userInfo = await getUserProfileInfo();
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `${userInfo.token}`);

    var raw = JSON.stringify({
      "orderId":(orderId),
   });

   var requestOptions = {
     method: 'POST',
     headers: myHeaders,
     body: raw,
     redirect: 'follow',
   };
    await fetch(`${baseURL}/cancelOrder`, requestOptions)
      .then(response => response.text())
      .then(result => {
        const res = JSON.parse(result);
        console.log('cancel order details res1.', res,res.message);
        if (res && res.message == 'success') {
         alert(res.description)
          setLoading(false);
        }else{
          setLoading(false);
        }
        setLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setLoading(false);
      });
  }

  useEffect(()=>{
    getSharedCartList()
  },[])

  const tableHeaders = [
    'S.No',
    'Cart Type',
    'Order',
    'Order Date',
    'Shipping Charges ',
    'Total',
    'Shipping Start Date',
    'Status',
    'Actions'
  ];
  const widthArr = [
   75,100,200,150,100,100,150,150,200
  ];

  let tableData = [];
  for (let index = 0; index < orderList.length; index++) {
    const cart = orderList[index];
    console.log(cart)
    const rowData = [];
    for (let j = 0; j <= 9; j += 1) {
      if (j == 0) {
        rowData.push(`${index+1}`)
      }
      if (j == 1) {
           rowData.push(`${cart.cartType == 1 ? 'Regular Basket' :cart.cartType == 2 ? "Share Cart": ''}`)
      }
      if (j == 2) {
        rowData.push(`${cart.orderNumber ? cart.orderNumber :''}`)
      }
      if (j == 3) {
         rowData.push(`${cart.orderDate ? cart.orderDate :''}`)
      }
      if (j == 4) {
        rowData.push(`${cart.shippingPrice ? cart.shippingPrice :''}`)
     }
     if (j == 5) {
      rowData.push(`${cart.totalPrice ? cart.totalPrice :''}`)
     }
     if (j == 6) {
      rowData.push(`${cart.orderDate ? cart.orderDate :''}`)
    }
     
      if (j == 7) {
        rowData.push(
          // (ViewButton(index, cart))
          <View style={{margin:10, alignSelf: 'center',}}>
          <TouchableOpacity style={{
              backgroundColor:'#e4825f',padding:5,borderRadius:5
          }}
          disabled
            onPress={() => {
                //  navigation.navigate('MyShareCartItem',{cart:cart})
            }}>
            <Text style={{
              alignSelf: 'center',
               color:'white',
              // fontWeight: 'bold'
            }}>{cart.orderStatus == 1 ? 'Order Placed':cart.orderStatus == 2 ? 'Order Approved':cart.orderStatus == 3 ? 'Dispatched':
            cart.orderStatus == 4 ? 'Order Delivered':cart.orderStatus == 5 ? 'Order Canceled':''}</Text>
          </TouchableOpacity>
          
        </View>
        )
      }
      if (j == 8) {
        rowData.push(
          <View style={{flexDirection:'row',justifyContent:'space-around'}}>
            <TouchableOpacity style={{backgroundColor:'#15bbb6',padding:5,width:70,borderRadius:5}}
            onPress={()=>{
              getOrderDetails(cart.orderId)
            }}>
              <Text style={{ alignSelf: 'center',color:'white',}}>View</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#e4825f',padding:5,width:70,borderRadius:5}}
            onPress={()=>{
              Alert.alert("Order", "Are you want cancel order ?",
                [
                  { text: "Cancel", onPress: () => { } },
                  { text: "Ok", onPress: () => CancelOrder(cart.orderId) }
                ])
            }}>
              <Text style={{alignSelf: 'center',color:'white',}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )
      }
     
    }
    tableData.push(rowData);
  }

  return (
    <>
      <HeaderComponent title={'My Orders'} />

      {/* <Tab.Navigator
        screenOptions={{tabBarLabelStyle: {fontSize: 12, fontWeight: '500'}}}>
        <Tab.Screen name="Delivered" component={YourOrders} />
        <Tab.Screen name="Proecessing" component={YourOrders} />
        <Tab.Screen name="Cancelled" component={YourOrders} />
      </Tab.Navigator> */}

<ActivityStatus message={''} loading={loading} />
      
      <ScrollView>
               <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 5
                    }}
                  >
                    <AppTable
                      tableHeaders={tableHeaders}
                      widthArr={widthArr}
                      tableData={tableData }
                      containerStyle={{
                        padding:3,
                        paddingVertical:5,
                      }}
                    />
                  </View>

      </ScrollView>
    </>
  );
};



const styles = StyleSheet.create({
  headerStyles: {
    width: '100%',
    backgroundColor: '#ED7421',
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTextStyles: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  headerBackArrowStyles: {
    paddingHorizontal: 15,
    color: '#FFF',
  },
  container: {
    backgroundColor: '#ffffff',
  },
  card: {
    width: '90%',
    height: 140,
    alignSelf: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: 'black',
    marginVertical: 8,
    marginHorizontal: 6,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 6,
    paddingHorizontal: 15,
    justifyContent: 'space-evenly',
  },
  InsideCardView1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    fontFamily: 'Poppins-Medium',
  },
  OrdersTextStyles: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
  },
  TrackingText: {
    fontSize: 13,
    color: '#000000',
    fontWeight: '500',
  },
  InsideCardView2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    width: '100%',
  },
  DetailsButtonStyles: {
    borderWidth: 1,
    height: 25,
    width: 90,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#707070',
  },
  InsideCardView3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 15,
  },
  DeliveredTextStyles: {
    fontSize: 13,
    fontWeight: '500',
    color: '#ED7421',
  },
  topNavBarTextStyles: {
    flex: 1,
  },
  topNavBarTextStyles2: {
    flex: 2,
  },
});

export {MyOrders};
