import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import ShoperativeLogo from '../images/logo.png';
import {useDispatch} from 'react-redux';
import {professionList} from '../store/actions/professionListActions';
import { getUserProfileInfo } from '../utils/AsyncStorageHelper';


const Splash = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(professionList());
  }, []);

  const navigationStep = async () => {
    const userObject = await getUserProfileInfo();

    console.log('userobject',userObject);
    setTimeout(() => {
        if (userObject.user_id  ) {
            navigation.navigate("MainRoute")
        }           
        else {
            navigation.navigate('Login')
        }
    }, 3000);
}

useEffect(() => {

    navigationStep();
}, [])
  return (
    <View style={styles.container}>
      <Image source={ShoperativeLogo} style={styles.imageStyles} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ED7421',
  },
  imageStyles: {
    width: 250,
    height: 50,
  },
});

export {Splash};
