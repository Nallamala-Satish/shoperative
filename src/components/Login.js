import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {placeHolderTextColor} from '../theme/colors';
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Pressable} from 'react-native';
import ActivityStatus from '../components/shared/ActivityStatus';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../store/actions/loginActions';
import {useNavigation} from '@react-navigation/native';
import {Snackbar} from 'react-native-paper';
import DeviceInfo from 'react-native-device-info';
import { baseURL } from '../utils/Constants';
import { saveUserProfileInfo } from '../utils/AsyncStorageHelper';
import { setuser } from '../Redux/reducer/User';

const Login = () => {
  const deviceInfo = () => {
    DeviceInfo.getFirstInstallTime().then(firstInstallTime => {
      setDeviceToken(firstInstallTime);
    });
  };

  useEffect(() => {
    deviceInfo();
  });

  //below two lines will bring the data from API
  const dispatch = useDispatch();
  // const loginResult = useSelector(state => state.login);
 
  const[loading,setLoading]=useState(false)
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, SetPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [err, setErr] = useState('');
  const [deviceToken, setDeviceToken] = useState();
// console.log(deviceToken)

  const onDismiss = () => {
    setVisible(false);
  };


  const isValidUsername = value => {
    // Email validation
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailRegex.test(value)) {
      return true;
    }
    // Mobile number validation
    const mobileRegex = /^[0-9]{10}$/;
    if (mobileRegex.test(value)) {
      return true;
    }
    return false;
  };

  //Validations Of Both Inputs
  const LoginValidation = () => {
    if (username === '') {
      setVisible(true);
      setErr('Please Enter UserName');
    } else if (!isValidUsername(username)) {
      setVisible(true);
      setErr('Invalid Username');
    } else if (password === '') {
      setVisible(true);
      setErr('Please Enter Password');
    } else if (password.length < 6) {
      setVisible(true);
      setErr('Password Must Contain 6 Letters');
    } else {
      dispatch(login(username, password, deviceToken));
    }
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

  const Login = async()=>{
    setLoading(true)
    const myHeaders = new Headers();
     myHeaders.append("Content-Type", "application/json");
    //  myHeaders.append("Cookie", "PHPSESSID=a0aa86b9e40829e64a1303fad8a5964c");

    let raw = JSON.stringify({
      "loginusername": `${username}`,
      "loginpassword": `${password}`,
      "devicetoken": `${deviceToken}`
    });
    
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
   await fetch(`${baseURL}/login`, requestOptions)
      .then(response => response.json())
      .then(result =>{
         let loginResult =result;
         console.log("login res",loginResult )
          if (loginResult.message === 'success') {
            const userInfo =loginResult
             saveUserProfileInfo(userInfo);
             dispatch(setuser(userInfo))
          navigation.navigate('MainRoute');
          setLoading(false)
            } else if (loginResult.message === 'fail') {
            setErr(loginResult.description);
           setVisible(true);
           setLoading(false)
         }
        })
      .catch(error =>{
         console.log('error', error)
        setLoading(false)
        });
    setLoading(false)
  }

  return (
    <View style={styles.container}>
       <ActivityStatus message={'Login inprogress'} loading={loading} />
      <Text style={styles.headingStyles}>Login</Text>
      <View style={styles.FeildViewStyles}>
        <Foundation style={styles.iconStylesmobile} name="mobile" size={25} />
        <TextInput
          style={styles.inputFeildStyles}
          placeholder="UserName"
          keyboardType="email-address"
          placeholderTextColor={placeHolderTextColor}
          onChangeText={data => setUsername(data)}
          value={username}
        />
      </View>
      <View style={styles.FeildViewStyles}>
        <AntDesign style={styles.iconStyleslock} name="lock" size={20} />
        <TextInput
          style={styles.inputFeildStyles}
          placeholder="Password"
          placeholderTextColor={placeHolderTextColor}
          secureTextEntry={true}
          onChangeText={data => SetPassword(data)}
          value={password}
        />
      </View>

      <Text
        style={styles.forgetPasswordStyles}
        onPress={() => navigation.navigate('ForgetPassword')}>
        Forget Password?
      </Text>

      <Pressable
        style={styles.buttonStyles}
        onPress={() => {
          //get username and password and pass this method instead of hardcoded values
          deviceInfo();
          LoginValidation();
          Login()
          
        }}>
        <Text style={styles.buttonTextStyles}>LOG IN</Text>
      </Pressable>

      <Text style={styles.bottomTextStyles}>
        Don't Have An Account ?{' '}
        <Text
          style={{color: '#ED7421'}}
          onPress={() => {
            navigation.navigate('Register');
          }}>
          Register
        </Text>
      </Text>

      {snackBar()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingStyles: {
    textAlign: 'center',
    color: '#ED7421',
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
  },
  FeildViewStyles: {
    width: '90%',
    height: 50,
    marginTop: 30,
    backgroundColor: '#F3F3F3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  inputFeildStyles: {
    marginLeft: 5,
    flex: 15,
    color: '#000',
    fontWeight: '500',
  },
  iconStylesmobile: {
    flex: 1,
    width: '100%',
    height: '100%',
    verticalAlign: 'middle',
    textAlign: 'center',
    marginTop:20
  },
  iconStyleslock: {
    flex: 1,
    width: '100%',
    height: '100%',
    verticalAlign: 'middle',
    textAlign: 'center',
    marginTop:20
  },
  forgetPasswordStyles: {
    color: '#ED7421',
    marginTop: 30,
    alignSelf: 'flex-end',
    marginRight: '5%',
    fontSize: 14,
    fontWeight: '500',
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
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#FFF',
  },
  bottomTextStyles: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000CC',
    marginTop: 27,
  },
});

export {Login};
