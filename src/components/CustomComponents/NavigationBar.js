import React from 'react';
import {Pressable, View, Image, StyleSheet, Alert,TouchableOpacity} from 'react-native';
import menuIcon from '../../images/menu.png';
import logo from '../../images/logo.png';
import user from '../../images/user.png';
import cart from '../../images/cart.png';
import {bgColor} from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import { baseURL } from '../../utils/Constants';
import { getUserProfileInfo } from '../../utils/AsyncStorageHelper';

const NavigationBar = props => {
  const navigation = useNavigation();
  const {
    userPress = () => Alert.alert('Under Development'),
    cartPress = () => Alert.alert('Under Development'),
  } = props;

const getProfile = async ()=>{
const res= await getUserProfileInfo()
console.log(res.token)
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${res.token}`);
myHeaders.append("Cookie", "PHPSESSID=19d230166f3d837e8d178badfc036aab");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

 await fetch(`${baseURL}/profile`, requestOptions)
  .then(response => response.text())
  .then(result =>{
     console.log("profile res",result)
    })
  .catch(error => console.log('error', error));
}

  return (
    <View style={ss.container}>
      <View style={ss.innerContainer}>
        <Pressable onPress={() => navigation.openDrawer()}>
          <Image source={menuIcon} style={ss.menuIcon} />
        </Pressable>
        <View style={ss.logoContainer}>
          <Image source={logo} style={ss.logoStyle} />
        </View>
        <TouchableOpacity style={ss.flexEnd} onPress={()=>getProfile()}>
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
    height: 16,
    width: 16,
  },
  flexEnd: {
    alignSelf: 'flex-end',
  },
  cartStyle: {
    height: 18,
    width: 20,
    marginLeft: 12,
  },
});
export {NavigationBar};
