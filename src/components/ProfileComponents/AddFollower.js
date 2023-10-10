import React,{useState,useEffect} from 'react';
import { View, Text, ScrollView, SafeAreaView,TouchableOpacity, StyleSheet,TextInput} from 'react-native';
import ActivityStatus from '../shared/ActivityStatus';
import { HeaderComponent } from '../CustomComponents/HeaderComponent';
import {Snackbar} from 'react-native-paper';
import { placeHolderTextColor } from '../../theme/colors';
import { baseURL } from '../../utils/Constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getUserProfileInfo } from '../../utils/AsyncStorageHelper';

const AddFollower = () => {
    const route=useRoute()
    const {getFollowersList,item,status}=route.params
    console.log(item)
    const [loading,setLoading]=useState(false)
    const navigation=useNavigation()
    const [name, setName] = useState(item && item.followerName ? item.followerName : '');
    const [mobileNumber, setMobileNumber] = useState(item && item.mobile ? item.mobile : '');
    const [email, setEmail] = useState(item && item.emailId ? item.emailId : '');
    const[city,setCity]=useState(item && item.followerCity ? item.followerCity : '')
    const [err, setErr] = useState('');
    const [visible, setVisible] = useState(false);

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

      const followerValidation = () => {
        if (name.length < 3) {
          setVisible(true);
          setErr('Please Enter Name');
        } else if (mobileNumber === '') {
          setVisible(true);
          setErr('Please Enter Mobile Number');
        } else if (mobileNumber.length < 10) {
          setVisible(true);
          setErr('Enter a 10-Digit Mobile Number');
        } 
        else if (email === '') {
            setVisible(true);
            setErr('Enter Email ');
          } 
        else if (city === '') {
          setVisible(true);
          setErr('Enter City');
        }else{
          if(status == 0){
            AddFollower()
          }else{
            updateFollower()
          }
      
        }
      }

  const AddFollower = async ()=>{
    const res= await getUserProfileInfo()
    var myHeaders = new Headers();
    myHeaders.append("Authorization",`${res.token}`);
  myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
    
        "name":`${name}`,
        "mobile":`${mobileNumber}`,
        "email":`${email}`,
        "city":`${city}`
    
});
console.log('payload',raw)
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

await fetch(`${baseURL}/addFollower`, requestOptions)
  .then(response => response.json())
  .then(result =>{
    console.log(result)
    if(result.message == 'success'){
        console.log('Address res',result)
        getFollowersList()
        navigation.goBack()
    }
    })
  .catch(error => console.log('error', error));
  }

  const updateFollower =async (values)=>{
    const res= await getUserProfileInfo()
    var myHeaders = new Headers();
    myHeaders.append("Authorization",`${res.token}`);
  // myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "followerId":parseInt(item.followerId),
    "name":`${name}`,
    "mobile":`${mobileNumber}`,
    // "email":`${email}`,
    "city":`${city}`
});
  console.log('payload',raw)
  var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
  };
  
  await fetch(`${baseURL}/updateFollower`, requestOptions)
  .then(response => response.json())
  .then(result =>{
    console.log(result.message)
    if(result.message == 'success'){
        console.log('follower res',result)
        getFollowersList()
        navigation.goBack()
    }
    })
  .catch(error => console.log('error', error));
  }

  return (
    <SafeAreaView>
    <ActivityStatus message='' loading={loading}/>
     <HeaderComponent title={'Add Followers'} />
     <ScrollView style={styles.card}>
   
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
          style={styles.feildStles}
          placeholder={'Email'}
          value={email}
          placeholderTextColor={placeHolderTextColor}
          keyboardType="email-address"
          onChangeText={handleEmailFeild}
        />

          <TextInput
          style={styles.feildStles}
          placeholder={'City'}
          value={city}
          placeholderTextColor={placeHolderTextColor}
          onChangeText={handleCityFeild}
        />
          <View style={{alignSelf:'center',width:'50%',}}>
        <TouchableOpacity onPress={()=>{
            followerValidation()
        }} style={{padding:10,backgroundColor:'orange',borderRadius:20,marginTop:20}} >
            <Text style={{fontWeight:'bold',alignSelf:'center',color:'white'}}>Submit</Text>
            </TouchableOpacity>
        </View>
        {snackBar()}
    </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    feildStles: {
        backgroundColor: '#ffffff',
        height: 50,
        marginTop: 5,
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
      card: {
        width: '90%',
        alignSelf: 'center',
      },
})
 export {AddFollower};
