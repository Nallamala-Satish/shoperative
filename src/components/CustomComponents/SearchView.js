import {bgColor} from '../../theme/colors';

// React Navigate Drawer with Bottom Tab
// https://aboutreact.com/bottom-tab-view-inside-navigation-drawer/

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  Keyboard,TouchableOpacity
} from 'react-native';
import SearchIcon from '../../images/search.png';
import { useNavigation } from '@react-navigation/native';

const SearchView = props => {
  const {
    textHeader,
    searchPlaceholder = 'Search Products Here',
    onPress = () => {},
  } = props;
  const [searchText, setSearchText] = useState('');
  const searchClicked = () => {
    onPress(searchText);
    Keyboard.dismiss();
  };
  const navigation = useNavigation()
  return (
    <>
      <View style={ss.container}>
        <View style={ss.searchContainer}>
          <TextInput
            style={ss.textInputContainer}
            placeholder={searchPlaceholder}
            value={searchText}
            numberOfLines={1}
            onChangeText={text => setSearchText(text)}
          />
          <Pressable onPress={searchClicked}>
            <Image source={SearchIcon} style={ss.searchIcon} />
          </Pressable>
        </View>
        <View style={ss.searchLabelsContainer}>
          <TouchableOpacity>
             <Text style={ss.textStyle}>Search By Category</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.navigate('SearchFollowers')}}>
          <Text style={ss.textStyle}>Search Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.navigate('SearchPowerUsers')}}>
          <Text style={ss.textStyle}>Search Power Users</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const ss = StyleSheet.create({
  container: {
    backgroundColor: bgColor,
    height: 110,
    alignItems: 'center',
    padding: 10,
  },
  searchLabelsContainer: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    height: 18,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    height: 48,
  },
  textInputContainer: {
    flex: 1,
    height: 48,
  },
  textStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: 'white',
  },

  searchIcon: {
    height: 20,
    width: 20,
  },
});
export {SearchView};
