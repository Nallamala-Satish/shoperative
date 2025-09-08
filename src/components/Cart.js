import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ActivityStatus from './shared/ActivityStatus'
import { HeaderComponent } from './CustomComponents/HeaderComponent'

const Cart = () => {
   const [loading,setLoading] = useState(false)

  return (
    <View style={styles.container}>
      <ActivityStatus message="" loading={loading} />
          <HeaderComponent title="Cart" />
      <Text>Cart</Text>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
})