/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Image,
  FlatList,
  Button,TouchableOpacity
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {placeHolderTextColor} from '../theme/colors';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import {launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';
import {Snackbar} from 'react-native-paper';

import DropdownExample from './CustomComponents/CustomDropDown';
import { baseURL } from '../utils/Constants';
import ActivityStatus from './shared/ActivityStatus';

const ProfessionData = [
  {
    id: 0,
    label: '-- Select Your Profession --',
    value: '-- Select Your Profession --',
  },
  {id: 1, label: 'Employee', value: 'Employee'},
  {id: 2, label: 'entrepreneur', value: 'entrepreneur'},
  {id: 3, label: 'HouseWife', value: 'HouseWife'},
  {id: 4, label: 'Professional(Doctor)', value: 'Professional(Doctor)'},
  {id: 5, label: 'Professional(Others)', value: 'Professional(Others)'},
  {id: 6, label: 'Self Employed', value: 'Self Employed'},
];
const IncomeData = [
  {
    id: 0,
    label: '-- Monthly HouseHold Income --',
    value: '-- Monthly HouseHold Income --',
  },
  {id: 1, label: 'Below 10000', value: 'Below 10000'},
  {id: 2, label: '10000 - 20000', value: '10000 - 20000'},
  {id: 3, label: '20000 - 50000', value: '20000 - 50000'},
  {id: 3, label: 'Above 50000', value: 'Above 50000'},
];

const PowerUserRegister = () => {
  const navigation = useNavigation();
  const [resourcePath, SetResourcePath] = useState(null);
  const [filename, setFilename] = useState(null);
  const[loading,setLoading]= useState(false)

  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [password, SetPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profession, setProfession] = useState('');
  const [income, setIncome] = useState('');
  const [facebookLink, setFacebookLink] = useState('');
  const [address, setAddress] = useState('');
  const [idProof, setIdProof] = useState(false);
  const [err, setErr] = useState('');
  const [visible, setVisible] = useState(false);

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

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

  const [followers, setFollowers] = useState([{ name: '', email: '', mobile: '', city: '' }]);
// console.log(followers)
  // Function to add a new follower
  const addFollower = () => {
    setFollowers([...followers, { name: '', email: '', mobile: '', city: '' }]);
  };

  // Function to remove a follower
  const removeFollower = (index) => {
    let updatedFollowers = [...followers];
    updatedFollowers.splice(index, 1);
    setFollowers(updatedFollowers);
  };

  // Function to update follower info
  const updateFollower = (index, field, value) => {
    setFollowers(prevFollowers => {
      const updatedFollowers = [...prevFollowers];
      const updatedFollower = { ...updatedFollowers[index], [field]: value };
      updatedFollowers[index] = updatedFollower;
      return updatedFollowers;
    });
  };

 

  const Register = async () => {
    setLoading(true);
    var myHeaders = new Headers();
    // myHeaders.append('Content-Type', 'application/json');
    // myHeaders.append('Cookie', 'PHPSESSID=a8a8c5f7431d8157032187054decf709');
    const formdata = new FormData();
    const raw = JSON.stringify({
      username: `${name}`,
      mobile: `${mobileNumber}`,
      email: `${email}`,
      password: `${password}`,
      confirm_password: `${confirmPassword}`,
      city : `${city}`,
      state:`${state}`,
      address:`${address}`,
      profession: `${profession}`,
      monthly_income: `${income}`,
      fb_link:`${facebookLink}`,
      followers:followers,
    
    });

   formdata.append("jsonData",raw)
   formdata.append("id_proof",{
    uri:`${resourcePath}`,
    type: 'image/jpeg',
    name: 'id_proof.jpg',
  })
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };
    
      console.log(formdata)
   await fetch(`${baseURL}/signupForPowerUser`, requestOptions)
      .then(response => response.json())
      .then(result => {
        const res= (result)
        console.log('register values3', res);
       
        if (res.message == 'success') {
          navigation.navigate('Login');
          setLoading(false);
        }else{
          alert(res.description)
          setLoading(false);
        }
        setLoading(false);
      })
      .catch(error => console.log('error1', error));
    setLoading(false);
  };

  // Handling Functions Of Feilds
  const handleNameFeild = data => {
    setName(data);
  };
  const handleMobileNumberFeild = data => {
    setMobileNumber(data);
  };
  const handleEmailFeild = data => {
    setEmail(data);
  };
  const handleAreaFeild = data => {
    setArea(data);
  };
  const handleCityFeild = data => {
    setCity(data);
  };
  const handleStateFeild = data => {
    setState(data);
  };
  const handlePasswordFeild = data => {
    SetPassword(data);
  };
  const handleConfirmPasswordFeild = data => {
    setConfirmPassword(data);
  };
  const handleFacebookLinkFeild = data => {
    setFacebookLink(data);
  };
  const handleAddressFeild = data => {
    setAddress(data);
  };

  const PowerUserRegisterValidation = () => {
    if (name === '') {
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
    } else if (email === '') {
      setVisible(true);
      setErr('Please Enter Email');
    } else if (!emailRegex.test(email)) {
      setVisible(true);
      setErr('Enter a Valid Email');
    } 
    // else if (area === '') {
    //   setVisible(true);
    //   setErr('Please Enter Area');
    // } 
    else if (city === '') {
      setVisible(true);
      setErr('Please Enter City');
    } else if (state === '') {
      setVisible(true);
      setErr('Please Enter State');
    } else if (password === '') {
      setVisible(true);
      setErr('Please Enter Password');
    } else if (confirmPassword === '') {
      setVisible(true);
      setErr('Please Enter ConfirmPassword');
    } else if (password !== confirmPassword) {
      setVisible(true);
      setErr('Confirm Password Not Matched');
    } else if (facebookLink === '') {
      setVisible(true);
      setErr('Please Enter FaceBookLink');
    } else if (address === '') {
      setVisible(true);
      setErr('Please Enter Address');
    } else if (resourcePath === null) {
      setVisible(true);
      setErr('Select idProof');
    } else {
      console.log(resourcePath);
      // setVisible(true);
      // setErr('Power User Register Successfull');
      Register();
    }
  };

  return (
    <View style={styles.container}>
       <ActivityStatus message={'Registration inprogress'} loading={loading} />
      <Text style={styles.logoStyles}>Power User</Text>
      <Text style={styles.headingStyles}>Registration</Text>
      <ScrollView style={styles.card} showsVerticalScrollIndicator={false}>
        {/* name */}
        <TextInput
          style={styles.feildStles}
          placeholder={'Name'}
          placeholderTextColor={placeHolderTextColor}
          onChangeText={handleNameFeild}
        />

        {/* mobile number */}
        <TextInput
          style={styles.feildStles}
          placeholder={'Mobile Number'}
          placeholderTextColor={placeHolderTextColor}
          keyboardType="number-pad"
          onChangeText={handleMobileNumberFeild}
          maxLength={10}
        />

        {/* Email */}
        <TextInput
          style={styles.feildStles}
          placeholder={'Email'}
          placeholderTextColor={placeHolderTextColor}
          onChangeText={handleEmailFeild}
        />

        {/* Area */}
        {/* <TextInput
          style={styles.feildStles}
          placeholder={'Area'}
          placeholderTextColor={placeHolderTextColor}
          onChangeText={handleAreaFeild}
        /> */}

        <View
          style={[
            styles.feildStles,
            {
              flexDirection: 'row',
              backgroundColor: '#F3F3F3',
              justifyContent: 'space-between',
              paddingHorizontal: 0,
            },
          ]}>
          {/* city */}
          <TextInput
            style={[styles.feildStles, {width: '48%', marginTop: 0}]}
            placeholder={'City'}
            placeholderTextColor={placeHolderTextColor}
            onChangeText={handleCityFeild}
          />

          {/* state */}
          <TextInput
            style={[styles.feildStles, {width: '48%', marginTop: 0}]}
            placeholder={'state'}
            placeholderTextColor={placeHolderTextColor}
            onChangeText={handleStateFeild}
          />
        </View>

        <View
          style={[
            styles.feildStles,
            {
              flexDirection: 'row',
              backgroundColor: '#F3F3F3',
              justifyContent: 'space-between',
              paddingHorizontal: 0,
            },
          ]}>
          {/* city */}
          <TextInput
            style={[styles.feildStles, {width: '48%', marginTop: 0}]}
            placeholder={'Password'}
            placeholderTextColor={placeHolderTextColor}
            secureTextEntry={true}
            onChangeText={handlePasswordFeild}
          />

          {/* state */}
          <TextInput
            style={[styles.feildStles, {width: '48%', marginTop: 0}]}
            placeholder={'Confirm Password'}
            placeholderTextColor={placeHolderTextColor}
            secureTextEntry={true}
            onChangeText={handleConfirmPasswordFeild}
          />
        </View>

        <DropdownExample
          titleInput={'-- Select Your Proffession --'}
          data={ProfessionData}
          selectedValue={profession}
          setDropdownValue={setProfession}
        />
        <DropdownExample
          titleInput={'-- Monthly Household Income --'}
          data={IncomeData}
          selectedValue={income}
          setDropdownValue={setIncome}
        />

        <TextInput
          style={styles.feildStles}
          placeholder={'Facebook Link'}
          placeholderTextColor={placeHolderTextColor}
          onChangeText={handleFacebookLinkFeild}
        />

        <TextInput
          style={[styles.feildStles, {height: 100, textAlignVertical: 'top'}]}
          placeholder={'Address'}
          placeholderTextColor={placeHolderTextColor}
          multiline={true}
          onChangeText={handleAddressFeild}
        />

        <Pressable
          style={styles.powerUserButton}
          onPress={() =>
            ImagePicker.launchImageLibrary(
              {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
              },
              response => {
                console.log(response)
                if(response.didCancel != true){
                SetResourcePath(response.assets[0].uri);
                setIdProof(true);
                }
              },
            )
          }>
          <Text style={styles.powerUserButtonText}>
            {idProof === true ? resourcePath : '+ Choose Id Proof'}
          </Text>
        </Pressable>

       
        <Text style={{fontSize:20,marginTop:10}}>Add Followers :</Text>
        <View style={{ marginTop:10 }}>
      <FlatList
        data={followers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
         
        <View  style={{}}>
        
          <TextInput
           style={styles.feildStles}
            value={item.name}
            placeholder={'Name'}
            placeholderTextColor={placeHolderTextColor}
            onChangeText={(text) => updateFollower(index, 'name', text)}
          />

          <TextInput
            style={styles.feildStles}
            placeholder={'Email'}
            value={item.email}
            placeholderTextColor={placeHolderTextColor}
            onChangeText={(text) => {
                updateFollower(index, 'email', text)
            }}
          />
          <TextInput
            style={styles.feildStles}
            placeholder={'Mobile'}
             keyboardType="number-pad"
            value={item.mobile}
            placeholderTextColor={placeHolderTextColor}
            onChangeText={(text) => updateFollower(index, 'mobile', text)}
          />
          <TextInput
            style={styles.feildStles}
            placeholder={'City'}
            value={item.city}
            placeholderTextColor={placeHolderTextColor}
            onChangeText={(text) => updateFollower(index, 'city', text)}
          />
           {followers.length == 1 ? (
             <TouchableOpacity onPress={() => {addFollower()}} style={{ backgroundColor: 'green', padding: 10,borderRadius:5,width:150,alignSelf:'center',marginTop:20}}>
                <View style={{flexDirection:'row',justifyContent:'space-around',}}>
              <Text style={{ color: 'white', textAlign: 'center' }}>Add Follower</Text>
              <Ionicons
                name='add'
                size={20}
                color={'white'}
              />
              </View>
            </TouchableOpacity>
            ):(
              <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:20}}>
              <TouchableOpacity onPress={() => {addFollower()}} style={{ backgroundColor: 'green', padding: 10,borderRadius:5,width:150, }}>
              <View style={{flexDirection:'row',justifyContent:'space-around',}}>
              <Text style={{ color: 'white', textAlign: 'center' }}>Add Follower</Text>
              <Ionicons
                name='add'
                size={20}
                color={'white'}
              />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: 'red', padding: 10,borderRadius:5,width:150, }}
            onPress={() => {
              if(followers.length > 1){
                removeFollower(index)
              }
              }} >
            <View style={{flexDirection:'row',justifyContent:'space-around',}}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Remove Follower</Text>
            <Entypo
                name='cross'
                size={20}
                color={'white'}
              />
              </View>
            </TouchableOpacity>
            </View>
            )}
        </View>
           
        )}
      />
       <Pressable
          style={styles.AddButton}
          onPress={() => {
            // navigation.navigate('AddFollowers');
            PowerUserRegisterValidation();
          }}>
          <Text style={styles.AddButtonText}>SIGN UP</Text>
        </Pressable>
    </View>
   
      </ScrollView>
      
      {snackBar()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  logoStyles: {
    fontSize: 38,
    color: '#ED7421',
    fontFamily: 'Nunito-Bold',
    marginTop: 10,
    marginLeft: '5%',
  },
  headingStyles: {
    fontSize: 18,
    color: '#000',
    fontWeight: '500',
    marginLeft: '5%',
    marginTop: 5,
  },
  card: {
    marginTop: 10,
    width: '90%',
    alignSelf: 'center',
    // marginBottom: 50,
  },
  feildStles: {
    backgroundColor: '#ffffff',
    height: 45,
    marginTop: 12,
    paddingHorizontal: 15,
    fontSize: 13,
    fontWeight: '500',
  },
  AddButton: {
    height: 50,
    backgroundColor: '#ED7421',
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  AddButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  powerUserButton: {
    height: 50,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#7F7F7F',
  },
  powerUserButtonText: {
    color: '#7F7F7F',
    fontSize: 16,
    fontWeight: '500',
  },
});

export {PowerUserRegister};
