/* eslint-disable react/no-unstable-nested-components */

import React,{useEffect,useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import profileImage from '../../images/userimag.jpg';
import {useDispatch, useSelector} from 'react-redux';
import { baseURL } from '../../utils/Constants';
import { getUserProfileInfo, saveAccountInfo, saveUserProfileInfo } from '../../utils/AsyncStorageHelper';
import { logout } from '../../Redux/reducer/User';

const Account = ({navigation}) => {
const dispatch=useDispatch()
const[profileResult,setProfileResult]=useState('')
const[profileRes,setProfileRes]=useState('')
// console.log("profileRes",profileRes)

const getUserData=async()=>{
  const userinfo = await getUserProfileInfo()
  setProfileResult(userinfo)
  console.log("userinfo",userinfo)
}

useEffect(()=>{
  getUserData()
  getProfile()
},[])

  // const {user_details: profileResult} = useSelector(state => state.profile);
  const CustomFeilds = ({iconName, title, onPressButton}) => {
    return (
      <Pressable
        style={styles.boxContainerStyles}
        onPress={() => navigation.navigate(onPressButton)}>
        <View style={styles.insideBoxContainerStyles}>
          <FontAwesome name={iconName} size={20} style={styles.boxIconStyles} />
          <Text style={styles.boxTextStyles}>{title}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} />
      </Pressable>
    );
  };

  const Logout = async()=>{
    const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer b93aadc7b193fb83b5c42df157c90576f4f98297057306953668b7bdf6a5bc8f.VXZbSgHS+XVi/GGf9NIlTQ==");
myHeaders.append("Cookie", "PHPSESSID=32d91d6fb8c201761f779fb2ff6bafc0");

const raw = "";

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

 await fetch(`${baseURL}/logout`, requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log('logout res',result)
    saveUserProfileInfo({})
    dispatch(logout());
    navigation.navigate('Login')
  })
  .catch(error => console.log('error', error));
  }

  const getProfile = async ()=>{
  
    const res= await getUserProfileInfo()
    console.log(res.token)
    var myHeaders = new Headers();
    // myHeaders.append("Authorization", `Bearer ${res.token}`);
    // myHeaders.append("Cookie", "PHPSESSID=a2867b19b7ec335d5cebaf6064f2cff1");
    
    let raw = JSON.stringify({
      "userId": `${res.user_id}`
    });
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    console.log(myHeaders)
     await fetch(`${baseURL}/profile`, requestOptions)
      .then(response => response.json())
      .then(result =>{
         console.log("profile res1",result.user_details)
         if(result.message == 'success'){
         setProfileRes(result.user_details)
         }
        })
      .catch(error => {
        console.log('error', error)
      });
    }
  return (
    <View style={styles.container}>
      <View style={styles.topContainerStyles}>
        <Ionicons
          name="arrow-back"
          size={20}
          style={styles.backArrowStyles}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.topHeaddingStyles}>Profile</Text>
      </View>
      <Image source={profileImage} style={styles.userImageStyles} />
      {/* <MaterialCommunityIcons
          name="circle-edit-outline"
          size={25}
          style={styles.userImageEditIconStyles}
        /> */}
      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        style={styles.cardContainer}>
        <Text style={styles.profileNameTextStyles}>
          {profileResult.user_name != null ? profileResult.user_name :'' }
        </Text>
        {/* <Text style={styles.numberTextStyles}>+91-{profileResult.mobile}</Text> */}

        {/* <CustomFeilds iconName={'user'}
         title={'My Profile'}
         onPressButton={'MyProfile'}
        /> */}
          <TouchableOpacity onPress={()=>{
          navigation.navigate('MyProfile',{profileRes:profileRes,getProfile:getProfile})
        }}
         style={styles.boxContainerStyles}
        >
        <View style={styles.insideBoxContainerStyles}>
          <FontAwesome name={'user'} size={20} style={styles.boxIconStyles} />
          <Text style={styles.boxTextStyles}>{'My Profile'}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} />
        </TouchableOpacity> 
        <CustomFeilds
          iconName={'user-plus'}
          title={'My Followers'}
          onPressButton={'MyFollowers'}
        />
        <CustomFeilds
          iconName={'shopping-bag'}
          title={'My Orders'}
          onPressButton={'MyOrders'}
        />
        <CustomFeilds
         iconName={'shopping-cart'} 
         title={'My Shared Cart'} 
         onPressButton={'MySharedCart'} />

        <CustomFeilds
          iconName={'heart'}
          title={'My Wishlist'}
          onPressButton={'MyWishlist'}
        />

        <CustomFeilds
          iconName={'shopping-basket'}
          title={'My Regular Basket'}
          onPressButton={'MyRegularBasket'}
        />

        <CustomFeilds 
        iconName={'address-book-o'} 
        title={'Address Book'}  
        onPressButton={'AddressBook'} />

        <CustomFeilds
          iconName={'help-circle'}
          title={'Help'}
          onPressButton={'Help'}
        />
        <CustomFeilds
          iconName={'lock'}
          title={'Change Password'}
          onPressButton={'ChangePassword'}
        />

        <CustomFeilds
          iconName={'lock'}
          title={'My Wallet'}
          onPressButton={'MyWallet'}
        />

        {/* <CustomFeilds iconName={'power-off'} title={'Logout'} onPressButton={logout()} /> */}
        <TouchableOpacity onPress={()=>{
           Alert.alert("Logout", "Are you want Logout ?",
           [
             { text: "Cancel", onPress: () => { } },
             { text: "Ok", onPress: () => Logout() }
           ])
        }}
         style={styles.boxContainerStyles}
        >
        <View style={styles.insideBoxContainerStyles}>
          <FontAwesome name={'power-off'} size={20} style={styles.boxIconStyles} />
          <Text style={styles.boxTextStyles}>{'Logout'}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} />
        </TouchableOpacity>
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
  profileIconStyles: {
    width: 50,
    height: 50,
    marginTop: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainerStyles: {
    backgroundColor: '#ED7421',
    height: 125,
    width: '100%',
    flexDirection: 'row',
  },
  backArrowStyles: {
    marginTop: 20,
    paddingHorizontal: 15,
    color: '#FFF',
  },
  topHeaddingStyles: {
    marginTop: 20,
    color: '#FFF',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 17,
  },
  userImageStyles: {
    width: 90,
    height: 90,
    borderRadius: 80,
    marginTop: -45,
    textAlign: 'center',
  },
  userImageEditIconStyles: {
    marginTop: -60,
    marginRight: -85,
    color: '#FFF',
  },
  cardContainer: {
    flex: 1,
    width: '100%',
    marginBottom:10
  },
  boxContainerStyles: {
    flexDirection: 'row',
    width: '90%',
    height: 50,
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: 15,
  },
  insideBoxContainerStyles: {
    flexDirection: 'row',
  },
  boxIconStyles: {
    color: '#000',
    paddingRight: 15,
  },
  boxTextStyles: {
    color: '#000',
    fontSize: 15,
    fontWeight: '400',
  },
  profileNameTextStyles: {
    fontSize: 24,
    fontWeight: '700',
    color: '#242424',
  },
  numberTextStyles: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#242424',
  },
});

export {Account};
