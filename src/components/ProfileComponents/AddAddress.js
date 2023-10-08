import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { HeaderComponent } from '../CustomComponents/HeaderComponent';
import { Formik } from 'formik';
import { placeHolderTextColor } from '../../theme/colors';
import DropdownExample from '../CustomComponents/CustomDropDown';
import { getUserProfileInfo } from '../../utils/AsyncStorageHelper';
import { baseURL } from '../../utils/Constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import {Snackbar} from 'react-native-paper';


const AddAddress = (props) => {
  const route=useRoute();
  const {getAddressList,item,status}=route.params

    const navigation=useNavigation()
    const data=[{id:1,label:'TS',value:'TS'}]
const[stateList,setStateList]=useState([])
const [visible, setVisible] = useState(false);
const [err, setErr] = useState(' ');
    const[title,setTitle]=useState(item && item.title ? item.title:'',)
    const[name,setName]=useState(item && item.name ? item.name:'',)
    const[mobile,setMobile]=useState(item && item.mobile ? item.mobile:'',)
    const[address,setAddress]=useState(item && item.address ? item.address:'',)
    const[state,setState]=useState( item && item.state ? item.state:'',)
    const[city,setCity]=useState(item && item.city ? item.city:'',)
    const[pincode,setPincode]=useState(item && item.pincode ? item.pincode:'',)
console.log(item)

const handleTitleFeild = data => {
  setTitle(data);
};
const handleNameFeild = data => {
  setName(data);
};
const handleMobileFeild = data => {
  setMobile(data);
};
const handleAddressFeild = data => {
  setAddress(data);
};
const handleStateFeild = data => {
  setState(data);
};
const handleCityFeild = data => {
  setCity(data);
};
const handlePincodeFeild = data => {
  setPincode(data);
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
  if (title === '') {
    setVisible(true);
    setErr('Please Enter Title');
  }
 else if (name.length < 3) {
    setVisible(true);
    setErr('Please Enter Name');
  } else if (mobile === '') {
    setVisible(true);
    setErr('Please Enter Mobile Number');
  } else if (mobile.length < 10) {
    setVisible(true);
    setErr('Enter a 10-Digit Mobile Number');
  } 
  else if (address === '') {
      setVisible(true);
      setErr('Enter Address ');
    } 
    else if (state === '') {
      setVisible(true);
      setErr('Enter State ');
    }
  else if (city === '') {
    setVisible(true);
    setErr('Enter City');
  }
  else if (pincode === '') {
    setVisible(true);
    setErr('Enter Pincode');
  }else{
    if(status == 0){
      AddAddress()
    }else{
      updateAddress()
    }

  }
}
const AddAddress =async ()=>{
    const res= await getUserProfileInfo()
    var myHeaders = new Headers();
    myHeaders.append("Authorization",`${res.token}`);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "title":`${title}`,
  "name": `${name}`,
  "mobile": `${mobile}`,
  "state": state,
  "city":`${city}`,
  "pincode": `${pincode}`,
  "address":`${address}`,
});
console.log('payload',raw)
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

await fetch(`${baseURL}/addAddress`, requestOptions)
  .then(response => response.json())
  .then(result =>{
    console.log(result)
    if(result.message == 'success'){
        console.log('Address res',result)
        getAddressList()
        navigation.goBack()
    }
    })
  .catch(error => console.log('error', error));
}

const updateAddress =async (values)=>{
  const res= await getUserProfileInfo()
  var myHeaders = new Headers();
  myHeaders.append("Authorization",`${res.token}`);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "id": `${item.id}`,
"title":`${title}`,
"name": `${name}`,
"mobile": `${mobile}`,
"state": state,
"city":`${city}`,
"pincode": `${pincode}`,
"address":`${address}`,
"status":status
});
console.log('payload',raw)
var requestOptions = {
method: 'PUT',
headers: myHeaders,
body: raw,
redirect: 'follow'
};

await fetch(`${baseURL}/updateAddress`, requestOptions)
.then(response => response.json())
.then(result =>{
  console.log(result)
  if(result.message == 'success'){
      console.log('Address res',result)
      getAddressList()
      navigation.goBack()
  }
  })
.catch(error => console.log('error', error));
}

const addressValiations =(values,handleSubmit)=>{
  if(values.title != ''){
    setVisible(true);
    setErr('Please Enter title');
  }else{
    handleSubmit()
  }

}
  return (
    <SafeAreaView>
         <HeaderComponent title={'Address Book'} />
        <ScrollView>
     
     <View style={{margin:5,marginBottom:100}}>
    
       <View>
        <Text style={styles.textStyles}>Title <Text style={{ color:'red'}}>*</Text></Text>
        <TextInput
          style={styles.feildStles}
          placeholder={'title'}
          value={title}
          placeholderTextColor={placeHolderTextColor}
          onChangeText={handleTitleFeild}
        />
         <Text style={styles.textStyles}>Full Name <Text style={{ color:'red'}}>*</Text></Text>
        <TextInput
          style={styles.feildStles}
          placeholder={'name'}
          value={name}
          placeholderTextColor={placeHolderTextColor}
          onChangeText={handleNameFeild}
        />
         <Text style={styles.textStyles}>Mobile <Text style={{ color:'red'}}>*</Text></Text>
        <TextInput
          style={styles.feildStles}
          placeholder={'mobile'}
          value={mobile}
          placeholderTextColor={placeHolderTextColor}
          keyboardType='numeric'
          onChangeText={handleMobileFeild}
        />
         <Text style={styles.textStyles}>Address <Text style={{ color:'red'}}>*</Text></Text>
        <TextInput
          style={styles.feildStles1}
          placeholder={'Address'}
          value={address}
          multiline={true}
          placeholderTextColor={placeHolderTextColor}
          onChangeText={handleAddressFeild}
        />
          <Text style={styles.textStyles}>State <Text style={{ color:'red'}}>*</Text></Text>
         <DropdownExample
          titleInput={'-- Select State --'}
          data={data}
          selectedValue={state }
          setDropdownValue={handleStateFeild}
        />
          <Text style={styles.textStyles}>City <Text style={{ color:'red'}}>*</Text></Text>
          <TextInput
          style={styles.feildStles}
          placeholder={'City'}
          value={city}
          placeholderTextColor={placeHolderTextColor}
           onChangeText={handleCityFeild}
        />
          <Text style={styles.textStyles}>Pincode <Text style={{ color:'red'}}>*</Text></Text>
          <TextInput
          style={styles.feildStles}
          placeholder={'pincode'}
          value={pincode}
          placeholderTextColor={placeHolderTextColor}
           onChangeText={handlePincodeFeild}
        />
        <View style={{alignSelf:'center',width:'50%',}}>
        <TouchableOpacity onPress={()=>{
          followerValidation()
        }
          
        } style={{padding:10,backgroundColor:'green',borderRadius:20,marginTop:20}} >
            <Text style={{fontWeight:'bold',alignSelf:'center',color:'white'}}>{ status == 0 ? "Add Aress" : "Update Address"}</Text>
            </TouchableOpacity>
        </View>
       
       </View>
    
   {snackBar()}
   </View>
   
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
        backgroundColor: '#ffffff',
        height: 100,
        marginTop: 5,
        paddingHorizontal: 15,
        color: '#000',
        fontWeight: '500',
      },
     textStyles:{
        paddingHorizontal: 10,
        color: '#000',
        fontWeight: '500',
        fontSize:15,
        marginTop: 15,
     } 
})
export default AddAddress;
