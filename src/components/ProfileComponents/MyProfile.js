import { View, Text, StyleSheet,TextInput, ScrollView, Pressable,Alert, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { HeaderComponent } from '../CustomComponents/HeaderComponent'
import { useNavigation, useRoute } from '@react-navigation/native'
import ActivityStatus from '../shared/ActivityStatus'
import { placeHolderTextColor } from '../../theme/colors'
import DropdownExample from '../CustomComponents/CustomDropDown'
import { getAccountInfo, getUserProfileInfo } from '../../utils/AsyncStorageHelper'
import { baseURL } from '../../utils/Constants'
import {Snackbar} from 'react-native-paper';


const MyProfile = () => {
  const route=useRoute()
  const {profileRes,getProfile}=route.params
// const[profileRes,setProfileRes]=useState('')
console.log("profileRes..",profileRes)

const navigation=useNavigation()
const[loading,setLoading]=useState(false)
const [name, setName] = useState(profileRes !== undefined ? profileRes.username :'');
const [mobileNumber, setMobileNumber] = useState(profileRes !== undefined ? profileRes.mobile :'');
const [email, setEmail] = useState(profileRes !== undefined ? profileRes.email :'');
const[state,setState]=useState('')
const[city,setCity]=useState('')
const[stateList,setStateList]=useState([])
const [err, setErr] = useState('');
const [visible, setVisible] = useState(false);
console.log(name)
const handleNameFeild = data => {
  setName(data);
};
const handleMobileNumberFeild = data => {
  setMobileNumber(data);
};
const handleEmailFeild = data => {
  setEmail(data);
};
const handleCityFeild = data => {
  setCity(data);
};

const onDismiss = () => {
  setVisible(false);
};

const snackBar = () => {
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      action={{label: 'Close'}}>
      {err}
    </Snackbar>
  );
};

const ProfileValidation = () => {
  if (name.length < 3) {
    setVisible(true);
    setErr('Please Enter Name');
  } else if (mobileNumber === '') {
    setVisible(true);
    setErr('Please Enter Mobile Number');
  } else if (mobileNumber.length < 10) {
    setVisible(true);
    setErr('Enter a 10-Digit Mobile Number');
  } else if (mobileNumber[0] < 6) {
    setVisible(true);
    setErr('Enter a Valid Number');
  }
  // else if (state === '') {
  //   setVisible(true);
  //   setErr('Select State');
  // }
  else if (city === '') {
    setVisible(true);
    setErr('Enter City');
  }else{
    UpdateProfile()
  }
}

const UpdateProfile =async ()=>{
  setLoading(true)
  const res= await getUserProfileInfo()
  console.log(res.token)
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${res.token}`);
// myHeaders.append("Cookie", "PHPSESSID=9f2645f941c1180cddd1bde18ac7f7ad");

var raw = JSON.stringify({
  "username": `${name}`,
  "address":'hyd',
  "city": `${city}`,
  "state": "Telangana",
  "latitude":`${profileRes.latitude}`,
  "longitude":`${profileRes.longitude}`,
  "user_profession": `${profileRes.user_profession}`,
  "income": `${profileRes.income}`,
  "fb_link": `${profileRes.fb_link}`
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
// console.log("payload",raw)
await fetch(`${baseURL}/update-profile`, requestOptions)
  .then(response => response.json())
  .then(result =>{ 
    console.log('update profile res',result)
    setErr(result.description)
    if(result.message == 'success'){
      Alert.alert('Shoperative',`${result.description}`,
      [
        { text: "Cancel", onPress: () => { } },
        { text: "Ok", onPress: () => navigation.goBack() }
      ])
      // setErr(result.description)
      getProfile()
     setLoading(false)
    }else{
      setErr(result.description)
      alert(result.description)
    }
    setLoading(false)
  })
  .catch(error => {
    console.log('error', error)
  setLoading(false)
  });
}




  return (
    <View style={styles.container}>
    <ActivityStatus message={''} loading={loading} />
    <HeaderComponent title={'My Profile'} />
    <ScrollView style={styles.card} showsVerticalScrollIndicator={false}>
    <TextInput
          style={styles.feildStles}
          placeholder={'Name'}
          value={(name)}
          placeholderTextColor={placeHolderTextColor}
          onChangeText={handleNameFeild}
        />
           <TextInput
          style={styles.feildStles}
          placeholder={'Mobile Number'}
          value={mobileNumber}
          placeholderTextColor={placeHolderTextColor}
          keyboardType="number-pad"
          maxLength={10}
          onChangeText={handleMobileNumberFeild}
        />

        {/* email */}
        <TextInput
          style={styles.feildStles1}
          placeholder={'Email'}
          value={email}
          editable={false}
          placeholderTextColor={placeHolderTextColor}
          keyboardType="email-address"
          onChangeText={handleEmailFeild}
        />

        <DropdownExample
          titleInput={'-- Select State --'}
          data={stateList}
          selectedValue={state}
          setDropdownValue={setState}
        />
          <TextInput
          style={styles.feildStles}
          placeholder={'City'}
          value={city}
          placeholderTextColor={placeHolderTextColor}
          onChangeText={handleCityFeild}
        />
          <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => {
             ProfileValidation()
          }}>
          <Text style={styles.signUpButtonText}>
           save Changes
          </Text>
        </TouchableOpacity>
        </ScrollView>
        {snackBar()}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  card: {
    width: '90%',
    alignSelf: 'center',
  },
  feildStles: {
    backgroundColor: '#ffffff',
    height: 50,
    marginTop: 12,
    paddingHorizontal: 15,
    color: '#000',
    fontWeight: '500',
  },
  feildStles1: {
    backgroundColor: 'lightgrey',
    height: 50,
    marginTop: 12,
    paddingHorizontal: 15,
    color: '#000',
    fontWeight: '500',
  },
  signUpButton: {
    height: 50,
    width:200,
    backgroundColor: '#ED7421',
    marginTop: 35,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    borderRadius:5
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
})
export  {MyProfile}