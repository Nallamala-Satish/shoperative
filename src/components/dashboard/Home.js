import React, {useEffect,useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  BackHandler,
  TouchableOpacity,FlatList
} from 'react-native';
import {SearchView} from '../CustomComponents/SearchView';
import {MapLocationComponent} from '../CustomComponents/MapLocationComponent';
import {ImageCurousel} from '../CustomComponents/ImageCurousel';
import {
  imageCourselData,
  imageCourselData2,
  f1,
  f2,
  f3,
  f4,
  baseURL,
} from '../../utils/Constants';
import BeautyImage from '../../images/DashBoardImages/beauty-hygiene.png';
import {NavigationBar} from '../CustomComponents/NavigationBar';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
const navigation=useNavigation()
const [categoriesData,setCategoryData]=useState([])

  useEffect(() => {
    const handleBackButton = () => {
      // BackHandler.exitApp(); // This will close the app
      return false; // Return true to prevent default back button behavior
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);
  const categories = (imageSource, productTitle) => {
    return (
      <View style={ss.CategoriesProductContainer}>
        <TouchableOpacity onPress={()=>{navigation.navigate('ProductList')}}>
        <Image source={imageSource} style={ss.categoriesImageStyles} />
        <Text style={ss.productTextStyles}>{productTitle}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const Item =({item})=>{
    return(
      <View style={ss.CategoriesProductContainer}>
      <TouchableOpacity onPress={()=>{navigation.navigate('SubCategories',{id:item.menu_id})}}>
      <Image source={{uri:`${item.image}`}} style={ss.categoriesImageStyles} />
      <Text style={ss.productTextStyles}>{item.menu_title}</Text>
      </TouchableOpacity>
    </View>
    )
}
  const servicesContainer = (imageSource, productTitle) => {
    return (
      <View
        style={{
          width: 80,
          height: 50,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Image source={imageSource} style={ss.servicesImageStyles} />
        <Text style={ss.servicesTextStyles}>{productTitle}</Text>
      </View>
    );
  };

  const getCategories = async ()=>{
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "PHPSESSID=1c5ef6b2fac2495295aedeb8dbf3c5bc");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(`${baseURL}/categories`, requestOptions)
      .then(response => response.json())
      .then(result =>{
        //  console.log("categories res",result.categories)
         if(result.message == 'success'){
          setCategoryData(result.categories.categories)
         }
        })
      .catch(error => console.log('error', error));
  }

  useEffect(()=>{
    getCategories()
  },[])

  return (
    <View style={ss.container}>
      <NavigationBar />
      <SearchView />
      <MapLocationComponent />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{
            alignItems: 'center',
          }}
          style={ss.categoriesContainerStyles}>
          {/* {categories(BeautyImage, 'Oil & Natural Gas')}
          {categories(BeautyImage, 'Herbal & Ayurvedic')}
          {categories(BeautyImage, 'Soap & Cleaning')}
          {categories(BeautyImage, 'Utensils')} */}
          <FlatList
          horizontal
          data={categoriesData}
           renderItem={Item}
           keyExtractor={item =>item.menu_id}
          />
        </ScrollView>
        
        <ImageCurousel imageData={imageCourselData} />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{
            alignItems: 'center',
          }}
          style={ss.categoriesContainerStyles}>
          {categories(BeautyImage, 'Oil & Natural Gas')}
          {categories(BeautyImage, 'Herbal & Ayurvedic')}
          {categories(BeautyImage, 'Soap & Cleaning')}
          {categories(BeautyImage, 'Utensils')}
        </ScrollView>
        <ImageCurousel imageData={imageCourselData2} />
        <View
          style={{
            flexDirection: 'row',
            height: 80,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          {servicesContainer(f1, 'Free HomeDelivery')}
          {servicesContainer(f2, 'Organic')}
          {servicesContainer(f3, 'Hand Picked')}
          {servicesContainer(f4, 'Best Quality')}
        </View>
      </ScrollView>
    </View>
  );
};
const ss = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  CategoriesProductContainer: {
    height: 100,
    width: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  categoriesImageStyles: {
    width: 75,
    height: 50,
    borderRadius:5
  },
  productTextStyles: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  servicesTextStyles: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  categoriesContainerStyles: {
    height: 120,
  },
  servicesImageStyles: {
    width: 35,
    height: 30,
  },
});

export {Home};
