import React from 'react';
import { View, Text,StyleSheet,FlatList } from 'react-native';
import { HeaderComponent } from '../../CustomComponents/HeaderComponent';
import { Card } from 'react-native-paper';

const ProductList = () => {
    const Item =()=>{
        return(
            <View>
                <Card>
                    <Text></Text>
                </Card>
            </View>
        )
    }
  return (
    <>
    <HeaderComponent title="ProductList" />
    <View style={styles.container}>
      <FlatList
      data={[]}
      renderItem={Item}
      keyExtractor={item =>item.id}
      />  
      
    </View>
    </>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      padding: 10,
    },
})
export default ProductList;
