import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {placeHolderTextColor} from '../theme/colors';
import Foundation from 'react-native-vector-icons/Foundation';
import {Pressable} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {forgetPassword} from '../store/actions/loginActions';
import { baseURL } from '../utils/Constants';

const ForgetPassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const forgetPasswordResult = useSelector(state => state.forgetPassword);

  const [email, setEmail] = useState('');
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

const forgetPassword =async ()=>{
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
// myHeaders.append("Cookie", "PHPSESSID=9f2645f941c1180cddd1bde18ac7f7ad");

var raw = JSON.stringify({
  "email": `${email}`
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${baseURL}/forgot-password`, requestOptions)
  .then(response => response.json())
  .then(result =>{ 
    // console.log('forget res',result)
    if(result.message == 'Success'){
      console.log('forget re',result.description)
      setErr(result.description);
    }
  })
  .catch(error => console.log('error', error));
}

  const handleEmailInput = data => {
    setEmail(data);
  };

  const ForgetPasswordValidation = () => {
    if (email === '') {
      setVisible(true);
      setErr('Enter Email');
    } else if (!emailRegex.test(email)) {
      setVisible(true);
      setErr('Enter a Valid Email');
    } else {
      setVisible(true);
      setErr('All Validations Are Clear');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingStyles}>Forget Password</Text>
      <View style={styles.FeildViewStyles}>
        {/* <Foundation style={styles.iconStylesmobile} name="mobile" size={30} /> */}
        <TextInput
          style={styles.inputFeildStyles}
          placeholder="Email"
          placeholderTextColor={placeHolderTextColor}
          // keyboardType="number-pad"
          onChangeText={handleEmailInput}
        />
      </View>
      <Pressable
        style={styles.buttonStyles}
        onPress={() => {
          ForgetPasswordValidation();
          // dispatch(forgetPassword(email));
          forgetPassword()
          // setErr(forgetPasswordResult.description);
        }}>
        <Text style={styles.buttonTextStyles}>SEND OTP</Text>
      </Pressable>
      <Text style={styles.bottomTextStyles}>
        Don't Have An Account? <Text style={{color: '#ED7421'}}  onPress={() => {
            navigation.navigate('Register');
          }}>Register</Text>
      </Text>
      <Text />
      {snackBar()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingStyles: {
    textAlign: 'center',
    color: '#ED7421',
    fontSize: 26,
    fontFamily: 'Poppins-Bold',
  },
  FeildViewStyles: {
    height: 50,
    width: '90%',
    marginTop: 30,
    backgroundColor: '#F3F3F3',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputFeildStyles: {
    marginLeft: 5,
    width: '80%',
    fontWeight: '500',
    color: '#000',
  },
  iconStylesmobile: {
    padding: 10,
  },
  buttonStyles: {
    width: '90%',
    marginTop: 33,
    backgroundColor: '#ED7421',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextStyles: {
    fontSize: 17,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  bottomTextStyles: {
    fontSize: 14,
    color: '#000000CC',
    marginTop: 37,
    fontWeight: '500',
  },
});

export {ForgetPassword};
