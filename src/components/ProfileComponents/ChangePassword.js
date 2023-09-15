/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Pressable,Alert} from 'react-native';
import {HeaderComponent} from '../CustomComponents/HeaderComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Snackbar} from 'react-native-paper';
import { getUserProfileInfo } from '../../utils/AsyncStorageHelper';
import { baseURL } from '../../utils/Constants';
import { useNavigation } from '@react-navigation/native';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [err, setErr] = useState('');
  const [visible, setVisible] = useState(false);

  const navigation=useNavigation()

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

  const handleCurrentPassword = data => {
    setCurrentPassword(data);
  };
  const handleNewPassword = data => {
    setNewPassword(data);
  };
  const handleConfirmPassword = data => {
    setConfirmPassword(data);
  };

  const ForgetPasswordValidations = () => {
    if (currentPassword === '') {
      setVisible(true);
      setErr('Please Enter Current Password');
    } else if (newPassword === '') {
      setVisible(true);
      setErr('Please Enter New Password');
    } else if (newPassword === currentPassword) {
      setVisible(true);
      setErr('Do Not Use Previous Password');
    } else if (confirmPassword === '') {
      setVisible(true);
      setErr('Please Enter Confirm Password');
    } else if (confirmPassword !== newPassword) {
      setVisible(true);
      setErr('Password Did Not Match');
    } else {
      setVisible(true);
      chnagesPassword()
      setErr('Password Change Success');
    }
  };

const chnagesPassword = async()=>{
  const res= await getUserProfileInfo()
  console.log(res.token)
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${res.token}`);
  // myHeaders.append("Cookie", "PHPSESSID=19d230166f3d837e8d178badfc036aab");

var raw = JSON.stringify({
  "password": `${newPassword}`,
  "confirm_password": `${confirmPassword}`,
  "old_password": `${currentPassword}`,
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

await fetch(`${baseURL}/change-password`, requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log('confirm passowrd',result)
    alert(`${result.description}`)  
    navigation.goBack();
  })
  .catch(error => console.log('error', error));
}

  const CustomFeilds = (PlaceHolderInput, onChangeTextProp) => {
    return (
      <View style={styles.feildsContainerStyles}>
        <AntDesign name="lock" size={15} style={styles.iconStyles} />
        <TextInput
          style={styles.inputFeildStyle}
          placeholder={PlaceHolderInput}
          onChangeText={onChangeTextProp}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderComponent title={'Change Password'} />
      {CustomFeilds('Current Password', handleCurrentPassword)}
      {CustomFeilds('New Password', handleNewPassword)}
      {CustomFeilds('Confirm Password', handleConfirmPassword)}

      <Pressable
        style={styles.buttonStyles}
        onPress={() => ForgetPasswordValidations()}>
        <Text style={styles.buttonTextStyles}>CHANGE PASSWORD</Text>
      </Pressable>
      {snackBar()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  feildsContainerStyles: {
    width: '90%',
    flexDirection: 'row',
    backgroundColor: '#F3F3F3',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 5,
    marginTop: 15,
  },
  inputFeildStyle: {
    height: '100%',
    width: '100%',
    color: '#383838',
    fontWeight: '500',
  },
  iconStyles: {
    paddingHorizontal: 5,
  },
  buttonStyles: {
    backgroundColor: '#ED7421',
    height: 55,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  buttonTextStyles: {
    color: '#FFF',
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
  },
});

export {ChangePassword};
