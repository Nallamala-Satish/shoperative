import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native'
import React from 'react'
import { HeaderComponent } from '../CustomComponents/HeaderComponent'
import { useNavigation } from '@react-navigation/native'
import { Card } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';


const AddressBook = () => {
  const navigation= useNavigation()
  return (
    <SafeAreaView>
      <HeaderComponent title={'Address Book'} />
      <View style={{marginBottom:200,}}>
   
      <ScrollView>
      <View style={{margin:10,flex:0,marginBottom:20,}}>
         <Card style={{padding:10,marginTop:10}}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{flexDirection:'row',}}>
            <Ionicons
             name='home'
             size={20}
              color='black'
            />
          <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}>  Satish</Text>
            </View> 
            <Text style={{color:'dodgerblue'}}>current location</Text>
          </View>
            <Text>Name Street name, number Complements, Neighbourhood  Postal code, Municipality</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10,}}>
            <TouchableOpacity style={{backgroundColor:'lavender',borderRadius:5,padding:5,width:70,alignSelf:'center'}}>
              <View style={{flexDirection:'row',}}>
              <FontAwesome name="edit" size={15} style={{color:'dodgerblue'}}/>
              <Text style={{color:'dodgerblue',alignSelf:'center',fontSize:10}}>   Edit</Text>
              </View>
                
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#f4d1a9',padding:5,borderRadius:5}}>
            <View style={{flexDirection:'row',width:70,alignSelf:'center'}}>
                <AntDesign name="delete" size={15} style={{color:'chocolate'}}/>
              <Text style={{color:'chocolate',alignSelf:'center',fontSize:10}}>   DELETE</Text>
             
              </View>
          </TouchableOpacity>
          </View>
         </Card>
         {/* <Card style={{padding:10,marginTop:10}}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{flexDirection:'row',}}>
            <Ionicons
             name='home'
             size={20}
              color='black'
            />
          <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}>  Satish</Text>
            </View> 
            <Text style={{color:'dodgerblue'}}>current location</Text>
          </View>
            <Text>Name Street name, number Complements, Neighbourhood  Postal code, Municipality</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10,}}>
            <TouchableOpacity style={{backgroundColor:'lavender',borderRadius:5,padding:5,width:70,alignSelf:'center'}}>
              <View style={{flexDirection:'row',}}>
              <FontAwesome name="edit" size={15} style={{color:'dodgerblue'}}/>
              <Text style={{color:'dodgerblue',alignSelf:'center',fontSize:10}}>   Edit</Text>
              </View>
                
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'khaki',padding:5,borderRadius:5}}>
            <View style={{flexDirection:'row',width:70,alignSelf:'center'}}>
                <AntDesign name="delete" size={15} style={{color:'chocolate'}}/>
              <Text style={{color:'chocolate',alignSelf:'center',fontSize:10}}>   DELETE</Text>
             
              </View>
          </TouchableOpacity>
          </View>
         </Card>
         <Card style={{padding:10,marginTop:10}}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{flexDirection:'row',}}>
            <Ionicons
             name='home'
             size={20}
              color='black'
            />
          <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}>  Satish</Text>
            </View> 
            <Text style={{color:'dodgerblue'}}>current location</Text>
          </View>
            <Text>Name Street name, number Complements, Neighbourhood  Postal code, Municipality</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10,}}>
            <TouchableOpacity style={{backgroundColor:'lavender',borderRadius:5,padding:5,width:70,alignSelf:'center'}}>
              <View style={{flexDirection:'row',}}>
              <FontAwesome name="edit" size={15} style={{color:'dodgerblue'}}/>
              <Text style={{color:'dodgerblue',alignSelf:'center',fontSize:10}}>   Edit</Text>
              </View>
                
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'khaki',padding:5,borderRadius:5}}>
            <View style={{flexDirection:'row',width:70,alignSelf:'center'}}>
                <AntDesign name="delete" size={15} style={{color:'chocolate'}}/>
              <Text style={{color:'chocolate',alignSelf:'center',fontSize:10}}>   DELETE</Text>
             
              </View>
          </TouchableOpacity>
          </View>
         </Card>
         <Card style={{padding:10,marginTop:10}}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{flexDirection:'row',}}>
            <Ionicons
             name='home'
             size={20}
              color='black'
            />
          <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}>  Satish</Text>
            </View> 
            <Text style={{color:'dodgerblue'}}>current location</Text>
          </View>
            <Text>Name Street name, number Complements, Neighbourhood  Postal code, Municipality</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10,}}>
            <TouchableOpacity style={{backgroundColor:'lavender',borderRadius:5,padding:5,width:70,alignSelf:'center'}}>
              <View style={{flexDirection:'row',}}>
              <FontAwesome name="edit" size={15} style={{color:'dodgerblue'}}/>
              <Text style={{color:'dodgerblue',alignSelf:'center',fontSize:10}}>   Edit</Text>
              </View>
                
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'khaki',padding:5,borderRadius:5}}>
            <View style={{flexDirection:'row',width:70,alignSelf:'center'}}>
                <AntDesign name="delete" size={15} style={{color:'chocolate'}}/>
              <Text style={{color:'chocolate',alignSelf:'center',fontSize:10}}>   DELETE</Text>
             
              </View>
          </TouchableOpacity>
          </View>
         </Card>
         <Card style={{padding:10,marginTop:10}}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{flexDirection:'row',}}>
            <Ionicons
             name='home'
             size={20}
              color='black'
            />
          <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}>  Satish</Text>
            </View> 
            <Text style={{color:'dodgerblue'}}>current location</Text>
          </View>
            <Text>Name Street name, number Complements, Neighbourhood  Postal code, Municipality</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10,}}>
            <TouchableOpacity style={{backgroundColor:'lavender',borderRadius:5,padding:5,width:70,alignSelf:'center'}}>
              <View style={{flexDirection:'row',}}>
              <FontAwesome name="edit" size={15} style={{color:'dodgerblue'}}/>
              <Text style={{color:'dodgerblue',alignSelf:'center',fontSize:10}}>   Edit</Text>
              </View>
                
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'khaki',padding:5,borderRadius:5}}>
            <View style={{flexDirection:'row',width:70,alignSelf:'center'}}>
                <AntDesign name="delete" size={15} style={{color:'chocolate'}}/>
              <Text style={{color:'chocolate',alignSelf:'center',fontSize:10}}>   DELETE</Text>
             
              </View>
          </TouchableOpacity>
          </View>
         </Card>
         <Card style={{padding:10,marginTop:10}}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{flexDirection:'row',}}>
            <Ionicons
             name='home'
             size={20}
              color='black'
            />
          <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}>  Satish</Text>
            </View> 
            <Text style={{color:'dodgerblue'}}>current location</Text>
          </View>
            <Text>Name Street name, number Complements, Neighbourhood  Postal code, Municipality</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10,}}>
            <TouchableOpacity style={{backgroundColor:'lavender',borderRadius:5,padding:5,width:70,alignSelf:'center'}}>
              <View style={{flexDirection:'row',}}>
              <FontAwesome name="edit" size={15} style={{color:'dodgerblue'}}/>
              <Text style={{color:'dodgerblue',alignSelf:'center',fontSize:10}}>   Edit</Text>
              </View>
                
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'khaki',padding:5,borderRadius:5}}>
            <View style={{flexDirection:'row',width:70,alignSelf:'center'}}>
                <AntDesign name="delete" size={15} style={{color:'chocolate'}}/>
              <Text style={{color:'chocolate',alignSelf:'center',fontSize:10}}>   DELETE</Text>
             
              </View>
          </TouchableOpacity>
          </View>
         </Card>
         <Card style={{padding:10,marginTop:10}}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{flexDirection:'row',}}>
            <Ionicons
             name='home'
             size={20}
              color='black'
            />
          <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}>  Satish</Text>
            </View> 
            <Text style={{color:'dodgerblue'}}>current location</Text>
          </View>
            <Text>Name Street name, number Complements, Neighbourhood  Postal code, Municipality</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10,}}>
            <TouchableOpacity style={{backgroundColor:'lavender',borderRadius:5,padding:5,width:70,alignSelf:'center'}}>
              <View style={{flexDirection:'row',}}>
              <FontAwesome name="edit" size={15} style={{color:'dodgerblue'}}/>
              <Text style={{color:'dodgerblue',alignSelf:'center',fontSize:10}}>   Edit</Text>
              </View>
                
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'khaki',padding:5,borderRadius:5}}>
            <View style={{flexDirection:'row',width:70,alignSelf:'center'}}>
                <AntDesign name="delete" size={15} style={{color:'chocolate'}}/>
              <Text style={{color:'chocolate',alignSelf:'center',fontSize:10}}>   DELETE</Text>
             
              </View>
          </TouchableOpacity>
          </View>
         </Card> */}
         
      </View>
      </ScrollView>
      <View style={{alignSelf:'center',width:'80%',}}>
      <TouchableOpacity style={{padding:10,backgroundColor:'dodgerblue',borderRadius:5,}} 
      onPress={()=>{navigation.navigate('AddAddress')}}>
        <Text style={{color:'white',fontWeight:'bold',fontSize:15,alignSelf:'center'}}> +ADD ADDRESS</Text>
      </TouchableOpacity>
      </View>
      
    </View>
    
    </SafeAreaView>
   
  )
}

export  {AddressBook}