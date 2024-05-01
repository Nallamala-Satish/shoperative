import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,Image
} from 'react-native';
import {HeaderComponent} from './CustomComponents/HeaderComponent';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {getUserProfileInfo} from '../utils/AsyncStorageHelper';
import ActivityStatus from './shared/ActivityStatus';
import {baseURL} from '../utils/Constants';

const SearchPowerUsers = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
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
        const res = JSON.parse(result)
        console.log('power user res.', res);
        if (res.message == 'success') {
          setSearchRes(res.data);
          setLoading(false);
        }else{
          setSearchRes([])
          setLoading(false);
        }
        setLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setLoading(false);
      });
  };

  const Item = ({item}) => {
    return (
      <View
        style={{
          padding: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#DAD8D8',
          // flex:1,
          margin:10
        }}>
          <View>
            <Image
            source= {require('../images/homedelivery.png')}
            style={{width:70,height:70}}
            />
          </View>
        <View style={{alignSelf:'center'}}>
          <Text>{item.name}</Text>
          <Text>{item.mobile}</Text>
          <Text>
            {item.city},{item.state}
          </Text>
        </View>
        <View style={{alignSelf: 'center',}}>
        <TouchableOpacity
          style={{padding: 10, backgroundColor: 'blue', borderRadius: 5,}}>
          <Text style={{alignSelf: 'center', color: 'white'}}>Follow</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ActivityStatus message="" loading={loading} />
      <HeaderComponent title={'Search Power Users'} />
      <View style={styles.searchContainerStyles}>
        <TextInput
          placeholder="Search by name/mobile/city"
          style={styles.textInputContainerStyles}
          placeholderTextColor={'#3F3F3F80'}
          onChangeText={text => {
            setSearchRes([])
            setSearch(text);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            getSearchDetails();
          }} style={{ alignSelf: 'center',}}>
          <FontAwesome name="search" size={22} style={{fontWeight: '800',}} />
        </TouchableOpacity>
      </View>
      <View style={{flex:1}}>
        {searchRes.length > 0 ? (
        <FlatList
          data={searchRes || []}
          renderItem={Item}
          keyExtractor={item => item.id}
        />
        ):(
        <Text style={{alignSelf:'center',color:'black',margin:20}}>No data Found</Text>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    // alignItems: 'center',
  },
  searchContainerStyles: {
    width: '95%',
    height: 50,
    backgroundColor: '#F3F3F3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignSelf: 'center',
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
