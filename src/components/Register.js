import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {placeHolderTextColor} from '../theme/colors';
import {Snackbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import DropdownExample from './CustomComponents/CustomDropDown';
import {register} from '../store/actions/registerActions';
import {baseURL} from '../utils/Constants';
import ActivityStatus from './shared/ActivityStatus';

const Register = () => {
  const dispatch = useDispatch();
  const professionListResult = useSelector(state => state.professionList);
 const [professionList,setProfessionList]=useState([])
 const[incomeList,setIncomeList]=useState([])

  const getProfessionList = async ()=>{
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "PHPSESSID=048c825e662b1020adcd143cbd6d8c59");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

 await fetch(`${baseURL}/professionlist`, requestOptions)
  .then(response => response.json())
  .then(res =>{
    let result = res;
     if(result.message == " success "){
      let profession =result.profession_result.map((list,index)=>({
            ...list,
       label:list.profession,
       value:list.id
      }))
      let income = result.income_list.map((item, index) => {
        return { id: index + 1, value: item };
      });
      let income1 =income.map((list,index)=>({
        ...list,
        label:list.value,
        value:list.id
      }))
      console.log('proff',income1)
        setProfessionList(profession)
        setIncomeList(income1)
     }
    })
  .catch(error => console.log('error', error));
  }


  useEffect(()=>{
    getProfessionList()
  },[])
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, SetPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profession, setProfession] = useState('');
  const [income, setIncome] = useState('');
  const [err, setErr] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const Register = async () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Cookie', 'PHPSESSID=a8a8c5f7431d8157032187054decf709');

    var raw = JSON.stringify({
      username: `${name}`,
      mobile: `${mobileNumber}`,
      email: `${email}`,
      password: `${password}`,
      confirm_password: `${confirmPassword}`,
      profession: `${profession}`,
      monthly_income: `${income}`,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
      console.log(raw)
   await fetch(`${baseURL}/signup`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('register values', JSON.stringify(result));
        if (result.message == 'success') {
          navigation.navigate('Login');
          setLoading(false);
        }
        setLoading(false);
      })
      .catch(error => console.log('error', error));
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
  const handlePasswordFeild = data => {
    SetPassword(data);
  };
  const handleConfirmPasswordFeild = data => {
    setConfirmPassword(data);
  };

  // Register Validation
  const RegisterValidation = () => {
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
    } else if (password === '') {
      setVisible(true);
      setErr('Please Enter Password');
    } else if (confirmPassword === '') {
      setVisible(true);
      setErr('Please Enter ConfirmPassword');
    } else if (password !== confirmPassword) {
      setVisible(true);
      setErr('Confirm Password Not Matched');
    } else {
      Register();
    }
  };

  return (
    <View style={styles.container}>
      <ActivityStatus message={''} loading={loading} />
      <Text style={styles.logoStyles}>Hi!</Text>
      <Text style={styles.headingStyles}>Register a New Account</Text>
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
          maxLength={10}
          onChangeText={handleMobileNumberFeild}
        />

        {/* email */}
        <TextInput
          style={styles.feildStles}
          placeholder={'Email'}
          placeholderTextColor={placeHolderTextColor}
          keyboardType="email-address"
          onChangeText={handleEmailFeild}
        />

        {/* password */}
        <TextInput
          style={styles.feildStles}
          placeholder={'Password'}
          placeholderTextColor={placeHolderTextColor}
          secureTextEntry={true}
          onChangeText={handlePasswordFeild}
        />

        {/* confirm password */}
        <TextInput
          style={styles.feildStles}
          placeholder={'Confirm Passwod'}
          placeholderTextColor={placeHolderTextColor}
          secureTextEntry={true}
          onChangeText={handleConfirmPasswordFeild}
        />

        <DropdownExample
          titleInput={'-- Select Your Profession --'}
          data={professionList}
          selectedValue={profession}
          setDropdownValue={setProfession}
        />
        <DropdownExample
          titleInput={'-- Monthly HouseHold Income --'}
          data={incomeList}
          selectedValue={income}
          setDropdownValue={setIncome}
        />

        {/* Buttons */}
        <Pressable
          style={styles.signUpButton}
          onPress={() => {
            // dispatch(
            //   register(
            //     name,
            //     mobileNumber,
            //     email,
            //     password,
            //     confirmPassword,
            //     profession,
            //     income,
            //   ),
            // );
            // navigation.navigate('OtpVerification');
            RegisterValidation();
          }}>
          <Text style={styles.signUpButtonText}>SIGN UP</Text>
        </Pressable>
        <Pressable
          style={styles.powerUserButton}
          onPress={() => {
            navigation.navigate('PowerUserRegister');
          }}>
          <Text style={styles.powerUserButtonText}>
            REGISTER AS A POWER USER
          </Text>
        </Pressable>
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
    marginTop: 5,
    marginLeft: '5%',
  },
  headingStyles: {
    fontSize: 17,
    color: '#000',
    fontWeight: '500',
    marginLeft: '5%',
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
  signUpButton: {
    height: 50,
    backgroundColor: '#ED7421',
    marginTop: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  powerUserButton: {
    height: 50,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ED7421',
  },
  powerUserButtonText: {
    color: '#ED7421',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});

export {Register};
