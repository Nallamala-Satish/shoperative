import React,{useEffect,useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView,TouchableOpacity,FlatList} from 'react-native';
import {HeaderComponent} from '../../CustomComponents/HeaderComponent';
import cosmeticsImage from '../../../images/cosmetics.png';
import {Pressable} from '@react-native-material/core';
import {useIsFocused, useNavigation,useRoute} from '@react-navigation/native';
import { baseURL } from '../../../utils/Constants';
import ActivityStatus from '../../shared/ActivityStatus';
import {Card} from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getUserProfileInfo } from '../../../utils/AsyncStorageHelper';

const Cosmetics = () => {
  const navigation = useNavigation();
   const route=useRoute()
   const isFocused=useIsFocused()
   const{id,subId}=route.params
   const [products,setProducts]=useState([])
const[loading,setLoading]=useState(false)
const[like,setLike]=useState(false)
const[itemId,setItemId]=useState('')

console.log('item id',itemId)

const getProducts = async ()=>{
  setLoading(true)
  const res= await getUserProfileInfo()
  var myHeaders = new Headers();
  myHeaders.append("Authorization",`${res.token}`);
  myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("Cookie", "PHPSESSID=5b8d0a77d015b0da55ede1ea2031b5bd");
  
  let raw = JSON.stringify({
    "menu_id": id,
    "submenu_id": subId
  });
  
  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch(`${baseURL}/getProducts`, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log("products res",result)
      if(result.message == 'Products list'){
        setProducts(result.products)
          setLoading(false)
      }
      setLoading(false)
    })
    .catch(error => {
      console.log('error', error)
      setLoading(false)
    });
}

const Item =({item})=>{
  console.log(item.id)
  return(
      <View style={{margin:5,}}>
        <Card style={{padding:5,backgroundColor:'white', elevation: 10,}}>
              {
               item.id ==  itemId && like == true ?
                 (
                 <TouchableOpacity onPress={()=>{setItemId(item.id), setLike(!like)}}>
                 <Ionicons name="heart-circle-outline" size={15} style={{ alignSelf: 'flex-end',padding:5,color:'red'}}/>
                 </TouchableOpacity>
                 ) :
                 ( 
                  <TouchableOpacity onPress={()=>{setItemId(item.id),setLike(!like)}}>
                  <Ionicons name="heart-outline" size={15} style={{ alignSelf: 'flex-end',padding:5,color:'red'}}/>
                  </TouchableOpacity>
                 ) 
              }
            <TouchableOpacity onPress={()=>{
                 navigation.navigate('ProductDetails',{productId:item.id})
             }} >
                 <Image source={{uri:item.prod_image}} style={styles.imageStyles}  />
              <Text style={{color:'black',fontWeight:'bold',fontSize:15,padding:5,width:150}}>{item.prod_name}</Text>
              <Text style={{padding:5,fontSize:10,width:150,alignSelf:'center'}}>
              <Text style={{alignSelf:'center'}}>
              {item.prod_desc.length < 50
                ? `${item.prod_desc}`
                : `${item.prod_desc.substring(0, 60)}  ...`}
            </Text>
                {/* {item.prod_desc} */}
                </Text>
              <Text style={{color:'black',fontWeight:'bold',color:'red',fontSize:15}}> Rs.{item.selling_price}  <Text style={{fontSize:10}}>({item.unit_of_measure})</Text></Text>
          </TouchableOpacity>
          <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:5,}}>
            <TouchableOpacity style={{backgroundColor:'darkorange',borderRadius:5,padding:5,}}>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={{color:'white',alignSelf:'center',fontSize:10}}>Share Cart   </Text>
              <MaterialIcons name="add-shopping-cart" size={15} style={{color:'white'}}/>
              </View>
                
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'lightgreen',padding:5,borderRadius:5}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={{color:'white',alignSelf:'center',fontSize:10}}>basket  </Text>
              <FontAwesome name="shopping-basket" size={15} style={{color:'white'}}/>
              </View>
          </TouchableOpacity>
          </View>
          </Card>
      </View>
  )
}

useEffect(()=>{
  getProducts()
},[isFocused])

  return (
    <>
     <ActivityStatus message='' loading={loading}/>
      <HeaderComponent title="Products" />
     
      <View style={styles.container}>
      {/* <ScrollView  showsVerticalScrollIndicator={false}> */}
        <View style={{flex:1,marginBottom:50}}>
          {/* <Pressable
            style={styles.productContainerStyles}
            onPress={() => navigation.navigate('ProductDetails')}>
            <Image source={cosmeticsImage} style={styles.imageStyles} />
            <Text style={styles.productNameStyles}>Beauty Product 1</Text>
            <Text style={styles.productPriceStyles}>₹ 399</Text>
          </Pressable>
          <Pressable
            style={styles.productContainerStyles}
            onPress={() => navigation.navigate('ProductDetails')}>
            <Image source={cosmeticsImage} style={styles.imageStyles} />
            <Text style={styles.productNameStyles}>Beauty Product 2</Text>
            <Text style={styles.productPriceStyles}>₹ 289</Text>
          </Pressable>
          <Pressable
            style={styles.productContainerStyles}
            onPress={() => navigation.navigate('ProductDetails')}>
            <Image source={cosmeticsImage} style={styles.imageStyles} />
            <Text style={styles.productNameStyles}>Beauty Product 3</Text>
            <Text style={styles.productPriceStyles}>₹ 149</Text>
          </Pressable>
          <Pressable
            style={styles.productContainerStyles}
            onPress={() => navigation.navigate('ProductDetails')}>
            <Image source={cosmeticsImage} style={styles.imageStyles} />
            <Text style={styles.productNameStyles}>Beauty Product 4</Text>
            <Text style={styles.productPriceStyles}>₹ 899</Text>
          </Pressable>
          <Pressable
            style={styles.productContainerStyles}
            onPress={() => navigation.navigate('ProductDetails')}>
            <Image source={cosmeticsImage} style={styles.imageStyles} />
            <Text style={styles.productNameStyles}>Beauty Product 5</Text>
            <Text style={styles.productPriceStyles}>₹ 419</Text>
          </Pressable>
          <Pressable
            style={styles.productContainerStyles}
            onPress={() => navigation.navigate('ProductDetails')}>
            <Image source={cosmeticsImage} style={styles.imageStyles} />
            <Text style={styles.productNameStyles}>Beauty Product 6</Text>
            <Text style={styles.productPriceStyles}>₹ 539</Text>
          </Pressable> */}
           <FlatList
             numColumns={2}
             data={products || []}
             renderItem={Item}
             keyExtractor={item =>item.id}
           />  
        </View>
        {/* </ScrollView> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
    height:'100%'
  },
  categoriesProducts: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // justifyContent: 'space-between',
    // width:200
  },
  imageStyles: {
    width: 150,
    height: 100,
    borderRadius:5
  },
  productContainerStyles: {
    width: '48%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#999',
  },
  productNameStyles: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ED7421',
  },
  productPriceStyles: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
});

export {Cosmetics};
