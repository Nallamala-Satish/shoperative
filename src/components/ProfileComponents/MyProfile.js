import { View, Text } from 'react-native'
import React from 'react'
import { HeaderComponent } from '../CustomComponents/HeaderComponent'

const MyProfile = () => {
  return (
    <View>
    <HeaderComponent title={'My Profile'} />
      <Text>MyProfile</Text>
    </View>
  )
}

export  {MyProfile}