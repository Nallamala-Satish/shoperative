import { View, Text } from 'react-native'
import React from 'react'
import { HeaderComponent } from '../CustomComponents/HeaderComponent'

const MyRegularBasket = () => {
  return (
    <View>
         <HeaderComponent title={'My Regular Basket'} />
      <Text>MyRegularBasket</Text>
    </View>
  )
}

export  {MyRegularBasket}