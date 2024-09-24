import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable,Alert} from 'react-native';
import {HeaderComponent} from '../CustomComponents/HeaderComponent';
import {Snackbar} from 'react-native-paper';
import { baseURL } from '../../utils/Constants';
import { placeHolderTextColor } from '../../theme/colors';
import { getUserProfileInfo } from '../../utils/AsyncStorageHelper';
import ActivityStatus from '../shared/ActivityStatus';
import { useNavigation } from '@react-navigation/native';

const Help = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [err, setErr] = useState('');
  const [visible, setVisible] = useState(false);
  const[loading,setLoading]= useState(false)
  const navigation = useNavigation()

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

  const handleSubjectInput = data => {
    setSubject(data);
  };
  const handleMessageInput = data => {
    setMessage(data);
  };

  const HelpValidation = () => {
    if (subject === '') {
      setVisible(true);
      setErr('Please Enter Subject');
    } else if (message === '') {
      setVisible(true);
      setErr('Please Enter Message');
    } else {
      // setVisible(true);
      // setErr('Request Sent');
      RequestSent()
    }
  };

  const RequestSent = async ()=>{
    setLoading(true);
    const userInfo = await getUserProfileInfo();
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `${userInfo.token}`);

    var raw = JSON.stringify({
       "subject":`${subject}`,
       "message":`${message}`
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
     console.log(raw)
    await fetch(`${baseURL}/help`, requestOptions)
      .then(response => response.text())
      .then(result => {
        const res = JSON.parse(result)
        console.log('help res.', res);
        if (res.message == 'success') {
          Alert.alert(res.message, res.description,
            [
              { text: "Cancel", onPress: () => { } },
              { text: "Ok", onPress: () =>  navigation.goBack() }
            ])
          setLoading(false);
        }else{
          alert(res.description)
          setLoading(false);
        }
        setLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setLoading(false);
      });
  }

  return (
    <>
      <HeaderComponent title={'Help'} />
      <ActivityStatus message={''} loading={loading} />
      <View style={styles.container}>
        <View style={styles.contentContainerStyles}>
          <Text style={styles.textFeildStyles}>Subject</Text>
          <TextInput
            style={styles.inputFeilds1}
            placeholder={'Subject'}
            placeholderTextColor={placeHolderTextColor}
            onChangeText={handleSubjectInput}
          />
          <Text style={styles.textFeildStyles}>Message</Text>
          <TextInput
            style={styles.inputFeilds2}
            placeholder={'Message'}
            placeholderTextColor={placeHolderTextColor}
            multiline={true}
            onChangeText={handleMessageInput}
          />
          <Pressable
            style={styles.buttonStyles}
            onPress={() => HelpValidation()}>
            <Text style={styles.buttonTextStyles}>REQUEST SUPPORT</Text>
          </Pressable>
        </View>
        {snackBar()}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  contentContainerStyles: {
    width: '90%',
  },
  textFeildStyles: {
    fontWeight: '500',
    fontSize: 14,
    color: '#000000',
    marginTop: 25,
    marginBottom: 5,
  },
  inputFeilds1: {
    backgroundColor: '#F3F3F3',
    width: '100%',
    height: 55,
    paddingHorizontal: 10,
  },
  inputFeilds2: {
    backgroundColor: '#F3F3F3',
    width: '100%',
    height: 130,
    alignSelf: 'flex-start',
    textAlignVertical: 'top',
    paddingHorizontal: 10,
  },
  buttonStyles: {
    backgroundColor: '#ED7421',
    height: 55,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  buttonTextStyles: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});

export {Help};
