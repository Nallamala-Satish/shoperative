import { View, Text,TouchableOpacity,ScrollView } from 'react-native'
import React,{ useState,useEffect } from 'react'
import { HeaderComponent } from '../CustomComponents/HeaderComponent'
import { getUserProfileInfo } from '../../utils/AsyncStorageHelper'
import { baseURL } from '../../utils/Constants'
import { AppTable } from '../CustomComponents/AppTable';
import { useNavigation } from '@react-navigation/native'
import ActivityStatus from '../shared/ActivityStatus'

const MySharedCart = () => {
  const navigation = useNavigation()
  const [loading,setLoading] = useState(false)
  const [sharedCartRes,setSharedCartRes] = useState([])

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
    await fetch(`${baseURL}/mySharedCart`, requestOptions)
      .then(response => response.text())
      .then(result => {
        const res = JSON.parse(result);
        console.log('sharedCart res1.', res,res.message);
        if (res && res.data.length > 0) {
          setSharedCartRes(res.data)
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
    'Cart Session ID',
    'Shared On',
    'End Date',
    ' '
  ];
  const widthArr = [
   75,200,150,150,100,
  ];

  let tableData = [];
  for (let index = 0; index < sharedCartRes.length; index++) {
    const cart = sharedCartRes[index];
    const rowData = [];
    for (let j = 0; j <= 5; j += 1) {
      if (j == 0) {
        rowData.push(`${index+1}`)
      }
      if (j == 1) {
           rowData.push(`${cart.sessionId ? cart.sessionId :''}`)
      }
      if (j == 2) {
        rowData.push(`${cart.sharedOn ? cart.sharedOn :''}`)
      }
      if (j == 3) {
         rowData.push(`${cart.endDate ? cart.endDate :''}`)
      }
      if (j == 4) {
        rowData.push(
          // (ViewButton(index, cart))
          <View style={{margin:10, alignSelf: 'center',}}>
          <TouchableOpacity style={{
              backgroundColor:'royalblue',padding:5,width:60,borderRadius:5
          }}
            onPress={() => {
                 navigation.navigate('MyShareCartItem',{cart:cart})
            }}>
            <Text style={{
              alignSelf: 'center',
               color:'white',
              // fontWeight: 'bold'
            }}>View</Text>
          </TouchableOpacity>
          
        </View>
        )
      }
     
    }
    tableData.push(rowData);
  }

//   const ViewButton = (index, cart)=>{
//     return(
//      <View style={{margin:10, alignSelf: 'center',}}>
//      <TouchableOpacity style={{
//          backgroundColor:'royalblue',padding:5,width:60,borderRadius:5
//      }}
//        onPress={() => {
//             navigation.navigate('MyShareCartItem',{cart:cart})
//        }}>
//        <Text style={{
//          alignSelf: 'center',
//           color:'white',
//          // fontWeight: 'bold'
//        }}>View</Text>
//      </TouchableOpacity>
     
//    </View>

//     )
// }


  return (
    <View style={{flex:1}}>
     <HeaderComponent title={'My Shared cart'} />
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
    </View>
  )
}

export  {MySharedCart}