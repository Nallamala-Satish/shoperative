import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  BackHandler,
  TouchableOpacity,
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
} from '../../utils/Constants';
import BeautyImage from '../../images/DashBoardImages/beauty-hygiene.png';
import {NavigationBar} from '../CustomComponents/NavigationBar';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
const navigation=useNavigation()

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
          {categories(BeautyImage, 'Oil & Natural Gas')}
          {categories(BeautyImage, 'Herbal & Ayurvedic')}
          {categories(BeautyImage, 'Soap & Cleaning')}
          {categories(BeautyImage, 'Utensils')}
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
    height: 60,
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
