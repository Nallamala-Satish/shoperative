/* eslint-disable react/no-unstable-nested-components */
import React,{useState,useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,FlatList,TouchableOpacity
} from 'react-native';
import {HeaderComponent} from '../CustomComponents/HeaderComponent';
import cosmetics from '../../images/cosmetics.png';
import {useNavigation} from '@react-navigation/native';
import { baseURL } from '../../utils/Constants';
import ActivityStatus from '../shared/ActivityStatus';
import { getUserProfileInfo } from '../../utils/AsyncStorageHelper';

const Categories = () => {
  const navigation = useNavigation();
  const [categoriesData,setCategoryData]=useState([])
const [loading,setLoading]=useState(false)

  const Product = (imageSource, productName) => {
    return (
      <View style={styles.productContainerStyles}>
        <Pressable
          style={styles.imageContainerStyles}
          onPress={() => navigation.navigate('Cosmetics')}>
          <Image style={styles.imageStyles} source={imageSource} />
        </Pressable>
        <Text style={styles.productNameStyles}>{productName}</Text>
      </View>
    );
  };

  const Item =({item})=>{
    return(
      <View style={styles.productContainerStyles}>
      <TouchableOpacity onPress={()=>{navigation.navigate('SubCategories',{id:item.menu_id})}}>
      <Image source={{uri:`${item.image}`}} style={styles.imageContainerStyles} />
      <Text style={styles.productNameStyles}>{item.menu_title}</Text>
      </TouchableOpacity>
    </View>
    )
}

  const getCategories = async ()=>{
    setLoading(true)
    const res= await getUserProfileInfo()
    var myHeaders = new Headers();
    myHeaders.append("Authorization",`${res.token}`);
    // myHeaders.append("Cookie", "PHPSESSID=1c5ef6b2fac2495295aedeb8dbf3c5bc");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(`${baseURL}/categories`, requestOptions)
      .then(response => response.json())
      .then(result =>{
         console.log("categories res",result.categories)
         if(result.message == 'success'){
          setCategoryData(result.categories.categories)
          setLoading(false)
         }
         setLoading(false)
        })
      .catch(error =>{
         console.log('error', error)
         setLoading(false)
        });
  }

  useEffect(()=>{
    getCategories()
  },[])
  return (
    <>
     <ActivityStatus message='' loading={loading}/>
      <HeaderComponent title={'All Categories'} />
      <View style={styles.container}>
        {/* <View style={styles.rowDirectionView}>
          {Product(cosmetics, 'Cosmetics')}
          {Product(cosmetics, 'Cosmetics')}
          {Product(cosmetics, 'Cosmetics')}
          {Product(cosmetics, 'Cosmetics')}
        </View>
        <View style={styles.rowDirectionView}>
          {Product(cosmetics, 'Cosmetics')}
          {Product(cosmetics, 'Cosmetics')}
          {Product(cosmetics, 'Cosmetics')}
          {Product(cosmetics, 'Cosmetics')}
        </View>
        <View style={styles.rowDirectionView}>
          {Product(cosmetics, 'Cosmetics')}
          {Product(cosmetics, 'Cosmetics')}
          {Product(cosmetics, 'Cosmetics')}
          {Product(cosmetics, 'Cosmetics')}
        </View>
        <View style={styles.rowDirectionView}>
          {Product(cosmetics, 'Cosmetics')}
          {Product(cosmetics, 'Cosmetics')}
          {Product(cosmetics, 'Cosmetics')}
          {Product(cosmetics, 'Cosmetics')}
        </View>
        <View style={styles.rowDirectionView}>
          {Product(cosmetics, 'Cosmetics')}
          {Product(cosmetics, 'Cosmetics')}
          {Product(cosmetics, 'Cosmetics')}
          {Product(cosmetics, 'Cosmetics')}
        </View> */}
         <FlatList
          // horizontal
          numColumns={4}
          data={categoriesData}
           renderItem={Item}
           keyExtractor={item =>item.menu_id}
          />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    width: '100%',
  },
  imageContainerStyles: {
    width: 80,
    height: 80,
    backgroundColor: '#FDEDE3',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyles: {
    width: '75%',
    height: '60%',
  },
  productContainerStyles: {
    alignItems: 'center',
    margin:10,
    padding:5,
  },
  rowDirectionView: {
    width: '100%',
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 10,
  },
  productNameStyles: {
    fontSize: 12,
    color: '#4C4C4C',
    fontWeight: '700',
    width:100
  },
});

export {Categories};
