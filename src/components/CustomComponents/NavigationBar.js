import React,{useState,useEffect} from 'react';
import {Pressable, View, Image, StyleSheet, Alert,TouchableOpacity} from 'react-native';
import menuIcon from '../../images/menu.png';
import logo from '../../images/logo.png';
import user from '../../images/user.png';
import cart from '../../images/cart.png';
import {bgColor} from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import { baseURL } from '../../utils/Constants';
import { getUserProfileInfo, saveAccountInfo } from '../../utils/AsyncStorageHelper';
import ActivityStatus from '../shared/ActivityStatus';

const NavigationBar = props => {
  const navigation = useNavigation();
  const[profileRes,setProfileRes]=useState('')
  const[loading,setLoading]=useState(false)
  const {
    userPress = () => Alert.alert('Under Development'),
    cartPress = () => Alert.alert('Under Development'),
  } = props;

  const getProfile = async ()=>{
    setLoading(true)
  const res= await getUserProfileInfo()
  console.log(res.token)
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${res.token}`);
  // myHeaders.append("Cookie", "PHPSESSID=a2867b19b7ec335d5cebaf6064f2cff1");
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  console.log(myHeaders)
   await fetch(`${baseURL}/profile`, requestOptions)
    .then(response => response.json())
    .then(result =>{
       console.log("profile res",result.user_details)
       if(result.message == 'success'){
       setProfileRes(result.user_details)
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
getProfile()
},[])

  return (
    <View style={ss.container}>
         <ActivityStatus message={''} loading={loading} />
      <View style={ss.innerContainer}>
        <Pressable onPress={() => navigation.openDrawer()}>
          <Image source={menuIcon} style={ss.menuIcon} />
        </Pressable>
        <View style={ss.logoContainer}>
          <Image source={logo} style={ss.logoStyle} />
        </View>
        <TouchableOpacity style={ss.flexEnd} onPress={()=>{navigation.navigate("MyProfile",{profileRes:profileRes,getProfile:getProfile})}}>
        <Image source={user} style={ss.userStyle} />
        </TouchableOpacity>
        {/* <Pressable style={ss.flexEnd} onPress={getProfile()}>
          <Image source={user} style={ss.userStyle} />
        </Pressable> */}
        <Pressable style={ss.flexEnd} onPress={cartPress}>
          <Image source={cart} style={ss.cartStyle} />
        </Pressable>
      </View>
    </View>
  );
};
const ss = StyleSheet.create({
  container: {
    backgroundColor: bgColor,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    height: 24,
  },
  menuIcon: {
    height: 18,
    width: 22,
  },
  logoContainer: {flex: 1},
  logoStyle: {
    marginLeft: 6,
    height: 24,
    width: 146,
  },
  userStyle: {
    height: 20,
    width: 20,
  },
  flexEnd: {
    alignSelf: 'flex-end',
    marginLeft: 10,
  },
  cartStyle: {
    height: 20,
    width: 20,
    marginRight: 0,
  },
});
export {NavigationBar};
