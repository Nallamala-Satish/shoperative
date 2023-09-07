import React,{useEffect,useState} from 'react';
import {View, Text, Image,TouchableOpacity,ScrollView} from 'react-native';
import IndianGrocerySupplier from '../images/Indian-Groceries-supplier.png';
import ProductDetailsImage from '../images/productDetails.png';
import {StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Pressable} from 'react-native';
import {useNavigation,useRoute} from '@react-navigation/native';
import { baseURL } from '../utils/Constants';
import { HeaderComponent } from './CustomComponents/HeaderComponent';
import ActivityStatus from './shared/ActivityStatus';
import {Card} from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const ProductDetails = () => {
  const navigation = useNavigation();
  const route=useRoute()
  const {productId}=route.params
  const[loading,setLoading]=useState(false)
  const [productRes,setProductRes]=useState({})
  const[like,setLike]=useState(false)
  console.log('product response',productRes.price)

  const getProductDetails = async()=>{
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "PHPSESSID=66789b11cc272b5691293c9e1e2cba4a");

let raw = JSON.stringify({
  "product_id": productId
});

let requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${baseURL}/getProductDetails`, requestOptions)
  .then(response => response.json())
  .then(result => {
    // console.log('product response',result)
    if(result.message == 'Products list'){
      setProductRes(result.products[0])
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
    getProductDetails()
  },[])

  return (
    <View style={styles.container}>
       <HeaderComponent title="Product" />
      <ActivityStatus message='' loading={loading}/>
      <ScrollView  showsVerticalScrollIndicator={false}>
        <View style={{width:'90%'}}>
      <Card style={{padding:10,margin:10,backgroundColor:'white', width:'100%', elevation: 10,}}>
              {
               like ?
                 (
                 <TouchableOpacity onPress={()=>{ setLike(!like)}}>
                 <Ionicons name="heart-circle-outline" size={30} style={{ alignSelf: 'flex-end',padding:10,color:'red'}}/>
                 </TouchableOpacity>
                 ) :
                 ( 
                  <TouchableOpacity onPress={()=>{setLike(!like)}}>
                  <Ionicons name="heart-outline" size={30} style={{ alignSelf: 'flex-end',padding:10,color:'red'}}/>
                  </TouchableOpacity>
                 ) 
              }
            <TouchableOpacity onPress={()=>{
                 navigation.navigate('',)
             }} >
                 <Image source={{uri:productRes.prod_image}} style={styles.imageStyles}  />
              <Text style={{color:'black',fontWeight:'bold',fontSize:30,padding:10}}>{productRes.prod_name}</Text>
              <View style={{alignSelf:'center',}}>
               <Text style={{fontSize:20,padding:5}}>M.R.P : { productRes.price != undefined ? productRes.mrp :''} </Text>  
               <Text style={{fontSize:20,fontWeight:'bold',padding:5}}>Price : Rs. { productRes.price != undefined ? productRes.price.selling_price :''}</Text>  
               <Text style={{fontSize:15,fontWeight:'bold',padding:5}}>Cash on Delivery eligible</Text>  
               <Text style={{fontSize:15,padding:5,alignSelf:'center',}}>Delivery to pincode 520001- Hyderabad is availiable. See setimated dates at checkout Details</Text>  
               <Text style={{fontSize:15,padding:5,}}>Sold by Cloudtail India (4.3 out of 5 | 168909 ratings)</Text> 
               <Text style={{fontSize:15,padding:5}}>Quantity : <Text style={{fontSize:20,fontWeight:'bold',}}>1 Kg</Text></Text>  
               <TouchableOpacity style={{padding:10,backgroundColor:'lightgrey',width:'80%',alignSelf:'center',borderRadius:5}}
               onPress={()=>{}}>
                {productRes.price != undefined ? (
                  <Text style={{fontSize:15,color:'black'}}>{productRes.price.qty_range_from} - {productRes.price.qty_range_to} Numbers  Rs. {productRes.price.selling_price}</Text> 
                ):null}
               
               </TouchableOpacity>
                
               <Text style={{alignSelf:'center',marginTop:10}}>{productRes.prod_desc}</Text>  
              </View>
          </TouchableOpacity>
          <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:10,}}>
            <TouchableOpacity style={{backgroundColor:'darkorange',borderRadius:5,padding:10,}}>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={{color:'white',alignSelf:'center',fontWeight:'bold'}}>Share Cart   </Text>
              <MaterialIcons name="add-shopping-cart" size={30} style={{color:'white'}}/>
              </View>
                
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'lightgreen',padding:10,borderRadius:5}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={{color:'white',alignSelf:'center',fontWeight:'bold'}}>basket  </Text>
              <FontAwesome name="shopping-basket" size={30} style={{color:'white'}}/>
              </View>
          </TouchableOpacity>
          </View>
          
          </Card>
          </View>
          </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
   
  },
  imageContainerStyles: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyles: {
    width: 250,
    height: 200,
    margin:10
  },
  iconStyles: {
    marginLeft: 280,
    marginTop: 35,
    color: '#ED7421',
  },
  productNameStyle: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#ED7421',
    marginTop: 39,
    marginLeft: '5%',
    alignSelf: 'flex-start',
  },
  priceTextStyles: {
    marginLeft: '5%',
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  productSummaryStyles: {
    marginTop: 12,
    width: '90%',
  },
  relatedTextStyle: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#ED7421',
    marginTop: 35,
    alignSelf: 'flex-start',
    marginLeft: '5%',
  },
  relatedImageStyles: {
    width: 78,
    height: 77,
  },
  relatedImageTextContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  relatedImagesContainer: {
    flexDirection: 'row',
    width: '90%',
    height: 125,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  buttonStyles: {
    position: 'absolute',
    width: '100%',
    height: 55,
    backgroundColor: '#ED7421',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
  },
  buttonTextStyles: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
});

export {ProductDetails};
