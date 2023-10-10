import { View, Text, SafeAreaView, StyleSheet,Alert,FlatList,Image } from 'react-native'
import React,{useState,useEffect} from 'react'
import { HeaderComponent } from '../CustomComponents/HeaderComponent'
import { baseURL } from '../../utils/Constants'
import { getUserProfileInfo } from '../../utils/AsyncStorageHelper'
import ActivityStatus from '../shared/ActivityStatus'
import { Card } from 'react-native-paper'

const MyRegularBasket = () => {
  const[loading,setLoading]=useState(false)
  const[basketlist,setBasketList]=useState([])

  const getBasketList = async ()=>{
    const userInfo= await getUserProfileInfo()
    //  console.log(userInfo.token)
     var myHeaders = new Headers();
     myHeaders.append("Authorization",`${userInfo.token}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
await fetch(`${baseURL}/getMyRegularBasket`, requestOptions)
  .then(response =>response.json())
  .then(result => {
    console.log('basketlist list',result.data)
    if(result.message == 'success'){
      const followers= result.data
      setBasketList(followers)
        setLoading(false)
    }
    setLoading(false)
  })
  .catch(error => {
    console.log('error', error)
    setLoading(false)
  });
  }

useEffect(()=>{
  getBasketList()
},[])

const Item = ({item}) => {
  return (
    <Card onPress={()=>{
      // Alert.alert("Logout", "Are you want delete ?",
      // [
      //   { text: "Cancel", onPress: () => { } },
      //   { text: "Ok", onPress: () =>  deleteBasketList(item.basketId) }
      // ])
    }}>
    <View style={styles.card}>
      <View style={styles.imageContainerStyles}>
        <Image
          source={{uri:item.productImage}}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>
      <View style={styles.productDetailsStyles}>
        <Text style={styles.productNameStyles}>{item.productName}</Text>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{color:'black'}}>Unit Price : </Text>
          <Text style={{color:'black'}}>{item.unitPrice}</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{color:'black'}}>Quantity : </Text>
          <Text style={{color:'black'}}>{item.quantity}</Text>
        </View>
          {/* <Text style={styles.productPriceStyles}>Rs.345</Text> */}
        </View>
        {/* <View style={styles.priceContainer}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
          <MaterialCommunityIcons
            name="minus"
            size={20}
            color={'#999'}
            style={styles.iconStyles}
            onPress={DecreaseQty}
          />
          <Text style={styles.qtyTextStyles}>{qty}</Text>
          <MaterialCommunityIcons
            name="plus"
            size={20}
            color={'#999'}
            style={styles.iconStyles}
            onPress={IncreaseQty}
          />
        </View> */}
       
      {/* </View> */}
      
    </View>
    </Card>
  );
};


  return (
    <SafeAreaView  contentContainerStyle={{alignItems: 'center'}}  style={styles.container}>
       <ActivityStatus message='' loading={loading}/>
         <HeaderComponent title={'My Regular Basket'} />
      {/* <Text>MyRegularBasket</Text> */}
      <FlatList
        data={basketlist || []}
        renderItem={Item}
        keyExtractor={item =>item.basketId}
        />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  card: {
    width: '95%',
    height: 120,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: 'black',
    marginVertical: 8,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 10,
    shadowOpacity: 0.8,
    elevation: 6,
    padding: 10,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  imageContainerStyles: {
    width: 100,
    height: 100,
  },
  productNameStyles: {
    // marginTop:20,
    fontSize: 14,
    fontWeight: '600',
    color: '#000000CC',
  },
  productDetailsStyles: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginLeft: 30,
    height: 90,
    width: '60%',
    paddingVertical: 5,
  },
})
export  {MyRegularBasket}