import { View, Text } from 'react-native'
import React from 'react'
import { HeaderComponent } from '../CustomComponents/HeaderComponent'

const AddressBook = () => {
  return (
    <View>
     <HeaderComponent title={'Address Book'} />
      <Text>AddressBook</Text>
    </View>
  )
}

export  {AddressBook}