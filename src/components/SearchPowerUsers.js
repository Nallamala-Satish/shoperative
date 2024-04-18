import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {HeaderComponent} from './CustomComponents/HeaderComponent';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getUserProfileInfo } from '../utils/AsyncStorageHelper';
import ActivityStatus from './shared/ActivityStatus';
import { baseURL } from '../utils/Constants';

const SearchPowerUsers = () => {
  const [loading,setLoading] = useState(false)
  const [search,setSearch]=useState('')
  const [searchRes, setSearchRes] = useState('');

  const getSearchDetails = async () => {
    setLoading(true);
    const userInfo = await getUserProfileInfo();
    var myHeaders = new Headers();
    // myHeaders.append('Authorization', `${userInfo.token}`);

    var raw = JSON.stringify({
      search: `${search}`,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    await fetch(`${baseURL}/searchPowerUser`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log('power user res',result)
        if (result.message == 'success') {
          setSearchRes(result)
          setLoading(false);
        }
        setLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <ActivityStatus message='' loading={loading}/>
      <HeaderComponent title={'Search Power Users'} />
      <View style={styles.searchContainerStyles}>
        <TextInput
          placeholder="Search by name/mobile/city"
          style={styles.textInputContainerStyles}
          placeholderTextColor={'#3F3F3F80'}
          onChangeText={(text)=>{
            setSearch(text)
          }}
        />
        <TouchableOpacity
          onPress={() => {
            getSearchDetails();
          }}>
          <FontAwesome name="search" size={22} style={{fontWeight: '800'}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  searchContainerStyles: {
    width: '95%',
    height: 50,
    backgroundColor: '#F3F3F3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  textInputContainerStyles: {
    width: '80%',
    color: '#3F3F3F80',
    fontSize: 16,
    fontWeight: '500',
  },
});
export default SearchPowerUsers;
