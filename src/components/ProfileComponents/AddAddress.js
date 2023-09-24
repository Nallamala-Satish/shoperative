import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { HeaderComponent } from '../CustomComponents/HeaderComponent';
import { Formik } from 'formik';
import { placeHolderTextColor } from '../../theme/colors';
import DropdownExample from '../CustomComponents/CustomDropDown';
import { getUserProfileInfo } from '../../utils/AsyncStorageHelper';
import { baseURL } from '../../utils/Constants';
import { useNavigation } from '@react-navigation/native';

export const AddressInitialValues = ()=>{
    return{
        title:'',
        name:'',
        mobile:'',
        address: '',
        state:'',
        city:'',
        pincode:''
    }
    
}

const AddAddress = () => {
    const navigation=useNavigation()
    const data=[{id:1,label:'TS',value:'TS'}]
const[stateList,setStateList]=useState([])

const getAddress =async (values)=>{
    const res= await getUserProfileInfo()
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "userId": res.user_id,
  "title":`${values.title}`,
  "name": `${values.name}`,
  "mobile": `${values.mobile}`,
  "state": values.state,
  "city":`${values.city}`,
  "pincode": `${values.pincode}`,
  "address":`${values.address}`,
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
    if(result.description == 'Successfully'){
        console.log('Address res',result)
        navigation.goBack()
    }
    })
  .catch(error => console.log('error', error));
}

  return (
    <SafeAreaView>
         <HeaderComponent title={'Address Book'} />
        <ScrollView>
     
     <View style={{margin:5,marginBottom:100}}>
     <Formik
     initialValues={AddressInitialValues()  }
     onSubmit={(values,{ resetForm }) => {
        console.log(values)
        getAddress(values)
        // resetForm()
    }}>
     {({ handleChange, handleBlur,setFieldValue, handleSubmit, values }) => (
       <View>
        <Text style={styles.textStyles}>Title <Text style={{ color:'red'}}>*</Text></Text>
        <TextInput
          style={styles.feildStles}
          placeholder={'title'}
          value={values.title}
          placeholderTextColor={placeHolderTextColor}
          onChangeText={(text)=>{
            setFieldValue('title',text)
          }}
        />
         <Text style={styles.textStyles}>Full Name <Text style={{ color:'red'}}>*</Text></Text>
        <TextInput
          style={styles.feildStles}
          placeholder={'name'}
          value={values.name}
          placeholderTextColor={placeHolderTextColor}
          onChangeText={(text)=>{
            setFieldValue('name',text)
          }}
        />
         <Text style={styles.textStyles}>Mobile <Text style={{ color:'red'}}>*</Text></Text>
        <TextInput
          style={styles.feildStles}
          placeholder={'mobile'}
          value={values.mobile}
          placeholderTextColor={placeHolderTextColor}
          keyboardType='numeric'
          onChangeText={(text)=>{
            setFieldValue('mobile',text)
          }}
        />
         <Text style={styles.textStyles}>Address <Text style={{ color:'red'}}>*</Text></Text>
        <TextInput
          style={styles.feildStles1}
          placeholder={'Address'}
          value={values.address}
          multiline={true}
          placeholderTextColor={placeHolderTextColor}
          onChangeText={(text)=>{
            setFieldValue('address',text)
          }}
        />
          <Text style={styles.textStyles}>State <Text style={{ color:'red'}}>*</Text></Text>
         <DropdownExample
          titleInput={'-- Select State --'}
          data={data}
          selectedValue={values.state}
          setDropdownValue={(text)=>{
            setFieldValue('state',text)
          }}
        />
          <Text style={styles.textStyles}>City <Text style={{ color:'red'}}>*</Text></Text>
          <TextInput
          style={styles.feildStles}
          placeholder={'City'}
          value={values.city}
          placeholderTextColor={placeHolderTextColor}
           onChangeText={(text)=>{
            setFieldValue('city',text)
          }}
        />
          <Text style={styles.textStyles}>Pincode <Text style={{ color:'red'}}>*</Text></Text>
          <TextInput
          style={styles.feildStles}
          placeholder={'pincode'}
          value={values.pincode}
          placeholderTextColor={placeHolderTextColor}
           onChangeText={(text)=>{
            setFieldValue('pincode',text)
          }}
        />
        <View style={{alignSelf:'center',width:'50%',}}>
        <TouchableOpacity onPress={handleSubmit} style={{padding:10,backgroundColor:'green',borderRadius:20,marginTop:20}} >
            <Text style={{fontWeight:'bold',alignSelf:'center',color:'white'}}>AddAress</Text>
            </TouchableOpacity>
        </View>
        
       </View>
     )}
   </Formik>
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
