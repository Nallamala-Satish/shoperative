import { View, Text } from 'react-native'
import React from 'react'
import { HeaderComponent } from '../CustomComponents/HeaderComponent'

const MySharedCart = () => {
  return (
    <View>
     <HeaderComponent title={'My Shared cart'} />
      <Text>MySharedCart</Text>
    </View>
  )
}

export  {MySharedCart}