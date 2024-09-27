import { useRoute } from '@react-navigation/native';
import React,{useState,useEffect} from 'react';
import {View, Text, StyleSheet,ScrollView, TouchableOpacity} from 'react-native';
import { baseURL } from '../../utils/Constants';
import ActivityStatus from '../shared/ActivityStatus';
import { getUserProfileInfo } from '../../utils/AsyncStorageHelper';
import { AppTable } from '../CustomComponents/AppTable';

const ShareCartUser = () => {
  const route = useRoute()
  const {cart}= route.params;
  const [loading,setLoading]= useState(false)
  const [cartUserWiseRes,setcartUserWiseRes] = useState([])
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [selectedRowCartList,setSelectedRowCartList] = useState([])

  const CartUserWise = async ()=>{
    setLoading(true);
    const userInfo = await getUserProfileInfo();
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `${userInfo.token}`);

    var raw = JSON.stringify({
       "sessionId":(cart.sessionId),
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
     console.log(raw)
    await fetch(`${baseURL}/sharedCartViewByUserWise`, requestOptions)
      .then(response => response.text())
      .then(result => {
        const res = JSON.parse(result)
        console.log('cart user wise res...', res.data.shareItemDeatils);
         if(res && res.message == 'success'){
          setcartUserWiseRes(res.data.userDetails)
          setLoading(false);
         }
        setLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setLoading(false);
      });
  }

  const tableHeaders = [
    'S.No',
    'User-Id',
    'Username',
    'Items Code',
    'Product Name',
    'Qty',
    'Price',
    'Total Price'
  ];
  const widthArr = [
   75,150,100,150,150,100,100,100
  ];

  let tableData = [];
  for (let index = 0; index < selectedRowCartList.length; index++) {
    const cart = selectedRowCartList[index];
    const rowData = [];
    for (let j = 0; j <= 8; j += 1) {
      if (j == 0) {
        rowData.push(`${index+1}`)
      }
      if (j == 1) {
           rowData.push(`${selectedRowData.userCode ? `+${selectedRowData.userCode}` :''}`)
      }
      if (j == 2) {
        rowData.push(`${selectedRowData.userName ? selectedRowData.userName :''}`)
      }
      if (j == 3) {
         rowData.push(`${cart.productCode ? cart.productCode :''}`)
      }
      if (j == 4) {
        rowData.push(`${cart.productName ? `₹${cart.productName}` :''}`)
      }
  if (j == 5) {
    rowData.push(`${cart.qty ? cart.qty :''}`)
 }
 if (j == 6) {
  rowData.push(`${cart.unitPrice ? `₹${cart.unitPrice}` :''}`)
}
 if (j == 7) {
   rowData.push(`${cart.totalAmount ? `₹${cart.totalAmount}` :''}`)
 }
     
    }
    tableData.push(rowData);
  }

useEffect(()=>{
  CartUserWise()
},[])

const CustomCards = item => {
  const {
    userCode,userName,totalItems,totalAmount

  } = item;
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={()=>{
        setSelectedRowData(item);
        setSelectedRowCartList(item.cart_result)
      }}
      style={{flexDirection:'row',}}>
         <View>
          <Text style={{fontWeight:'bold',color:'black',fontSize:17}}>Item-Code       :</Text>
          <Text style={{fontWeight:'bold',color:'black',fontSize:17}}>Item-Name       :</Text>
          <Text style={{fontWeight:'bold',color:'black',fontSize:17}}>Total Items    :</Text>
          <Text style={{fontWeight:'bold',color:'black',fontSize:17}}>Total Price     :</Text>
          </View> 
          <View style={{marginLeft:20}}>
          <Text style={{fontSize:17,color:'black'}}>{userCode}</Text>
          <Text style={{fontSize:17,color:'black'}}>{userName}</Text>
          <Text style={{fontSize:17,color:'black'}}>{totalItems}</Text>
          <Text style={{fontSize:17,color:'black'}}>₹{totalAmount}</Text>
          </View>
       </TouchableOpacity>
    </View>
  );
};

return (
  <View style={styles.container}>
      <ActivityStatus message='' loading={loading}/>
      <ScrollView style={styles.container}>
        {cartUserWiseRes.map(item => CustomCards(item))}
              
                  {selectedRowData && (
                    <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 5,
                      marginTop:10
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
                  )}
      </ScrollView>
    </View>
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
    backgroundColor: '#ffffff',flex:1
  },
  card: {
    width: '90%',
    // height: 100,
    alignSelf: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: 'black',
    marginVertical: 8,
    // marginHorizontal: 6,
    padding:10,
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
export {ShareCartUser};
