/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState,useEffect} from 'react';
import {View, StyleSheet, Text, Image,FlatList, TouchableOpacity, Alert} from 'react-native';
import {HeaderComponent} from '../CustomComponents/HeaderComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'react-native';
import oilImage from '../../images/oilImage.jpg';
import ActivityStatus from '../shared/ActivityStatus';
import { getUserProfileInfo } from '../../utils/AsyncStorageHelper';
import { baseURL } from '../../utils/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Card } from 'react-native-paper';

const MyWishlist = () => {
  const[loading,setLoading]=useState(false)
  const[wishlist,setWishList]=useState([])
  const [qty, Setqty] = useState(1);
  const productImage = oilImage;
  const stock = 10;

  const IncreaseQty = () => {
    return qty < stock ? Setqty(qty + 1) : Setqty(stock);
  };
  const DecreaseQty = () => {
    return qty > 1 ? Setqty(qty - 1) : Setqty(1);
  };


 const getWishList = async ()=>{
    const userInfo= await getUserProfileInfo()
    //  console.log(userInfo.token)
     var myHeaders = new Headers();
     myHeaders.append("Authorization",`${userInfo.token}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
await fetch(`${baseURL}/getWishlist`, requestOptions)
  .then(response =>response.json())
  .then(result => {
    console.log('wishlist list',result.data)
    if(result.message == 'success'){
      const followers= result.data
      setWishList(followers)
        setLoading(false)
    }
    setLoading(false)
  })
  .catch(error => {
    console.log('error', error)
    setLoading(false)
  });
  }

  const deleteWishList=async(id)=>{
    const userInfo= await getUserProfileInfo()
    console.log(id)
    var myHeaders = new Headers();
    myHeaders.append("Authorization",`${userInfo.token}`);

    var raw = JSON.stringify({
      "productId": `${id}`
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

await fetch(`${baseURL}/removeFromWishlist`, requestOptions)
 .then(response =>response.json())
 .then(result => {
   // console.log('addressList',result)
   if(result.message == 'success'){
    getWishList()
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
    getWishList()
  },[])
  const CustomCard = ({item}) => {
    return (
      <Card onPress={()=>{
        Alert.alert("Logout", "Are you want delete ?",
        [
          { text: "Cancel", onPress: () => { } },
          { text: "Ok", onPress: () =>  deleteWishList(item.productId) }
        ])
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
          {/* <View style={styles.priceContainer}>
            <Text style={styles.productPriceStyles}>MRP</Text>
            <Text style={styles.productStrikePriceStyles}>Rs.400</Text>
            <Text style={styles.productPriceStyles}>Rs.345</Text>
          </View>
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
         
        </View>
        
      </View>
      </Card>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{alignItems: 'center'}}
      style={styles.container}>
        <ActivityStatus message='' loading={loading}/>
      <HeaderComponent title={'My Wishlist'} />

      {/* <CustomCard />
      <CustomCard />
      <CustomCard />
      <CustomCard />
      <CustomCard />
      <CustomCard />
      <CustomCard /> */}
        <FlatList
        data={wishlist || []}
        renderItem={CustomCard}
        keyExtractor={item =>item.productId}
        />
        {/* <View>
        <TouchableOpacity style={{padding:10,backgroundColor:'dodgerblue',borderRadius:5,}} 
      onPress={()=>{}}>
        <Text style={{color:'white',fontWeight:'bold',fontSize:15,alignSelf:'center'}}> +ADD ADDRESS</Text>
      </TouchableOpacity>
        </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  headerStyles: {
    width: '100%',
    height: 50,
    backgroundColor: '#ED7421',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTextStyles: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
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
    marginTop:20,
    fontSize: 14,
    fontWeight: '600',
    color: '#000000CC',
  },
  productStrikePriceStyles: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: '#999',
    textDecorationLine: 'line-through',
    paddingHorizontal: 5,
    paddingRight: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productPriceStyles: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  productDetailsStyles: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginLeft: 30,
    height: 90,
    width: '60%',
    paddingVertical: 5,
  },
  iconStyles: {
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderColor: '#999',
  },
  qtyTextStyles: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    paddingHorizontal: 10,
    color: '#000',
  },
});

export {MyWishlist};
