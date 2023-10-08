import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image, FlatList, Alert } from 'react-native'
import React,{useState,useEffect} from 'react'
import { HeaderComponent } from '../CustomComponents/HeaderComponent'
import { useNavigation } from '@react-navigation/native'
import { Card } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getUserProfileInfo } from '../../utils/AsyncStorageHelper'
import { baseURL } from '../../utils/Constants'
import ActivityStatus from '../shared/ActivityStatus'




const AddressBook = () => {
  const navigation= useNavigation()
   const [loading,setLoading]=useState(false)
  const[addressList,setAddressList]=useState([])
// console.log('addressList',addressList)

  const getAddressList=async()=>{
     const userInfo= await getUserProfileInfo()
    //  console.log(userInfo.token)
     var myHeaders = new Headers();
     myHeaders.append("Authorization",`${userInfo.token}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
};
await fetch(`${baseURL}/addressList`, requestOptions)
  .then(response =>response.json())
  .then(result => {
    // console.log('addressList',result)
    if(result.message == 'success'){
      const address= result.data
      setAddressList(address)
        setLoading(false)
    }
    setLoading(false)
  })
  .catch(error => {
    console.log('error', error)
    setLoading(false)
  });
  }

  const deleteAddress=async(id)=>{
    const userInfo= await getUserProfileInfo()
    console.log(id)
    var myHeaders = new Headers();
    myHeaders.append("Authorization",`${userInfo.token}`);

    var raw = JSON.stringify({
      "id": `${id}`
    });
    
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

await fetch(`${baseURL}/deleteAddress`, requestOptions)
 .then(response =>response.json())
 .then(result => {
   // console.log('addressList',result)
   if(result.message == 'success'){
    getAddressList()
       setLoading(false)
   }
   setLoading(false)
 })
 .catch(error => {
   console.log('error', error)
   setLoading(false)
 });
 }

const Item=({item})=>{
  return(
    <View style={{margin:10,flex:0,}}>
    <Card style={{padding:10,}}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{flexDirection:'row',}}>
            <Ionicons
             name='home'
             size={20}
              color='black'
            />
          <Text style={{fontWeight:'bold',fontSize:20,color:'black'}}>  {item.name}</Text>
            </View> 
            <Text style={{color:'dodgerblue'}}>current location</Text>
          </View>
            <Text style={{alignSelf:'center',padding:5,color:'black'}}>{item.name},  {item.mobile}, {item.address}, {item.city}, {item.state}, {item.pincode}</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10,}}>
            <TouchableOpacity style={{backgroundColor:'lavender',borderRadius:5,padding:5,width:70,alignSelf:'center'}}
             onPress={()=>{navigation.navigate('AddAddress',{getAddressList:getAddressList,item:item,status:1})}}>
              <View style={{flexDirection:'row',}}>
              <FontAwesome name="edit" size={15} style={{color:'dodgerblue'}}/>
              <Text style={{color:'dodgerblue',alignSelf:'center',fontSize:10}}>   Edit</Text>
              </View>
                
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#f4d1a9',padding:5,borderRadius:5}}
             onPress={()=>{
              Alert.alert("Logout", "Are you want delete ?",
              [
                { text: "Cancel", onPress: () => { } },
                { text: "Ok", onPress: () =>  deleteAddress(item.id) }
              ])
             
              }}>
            <View style={{flexDirection:'row',width:70,alignSelf:'center'}}>
                <AntDesign name="delete" size={15} style={{color:'chocolate'}}/>
              <Text style={{color:'chocolate',alignSelf:'center',fontSize:10}}>   DELETE</Text>
             
              </View>
          </TouchableOpacity>
          </View>
         </Card>
    </View>
  )

}

  useEffect(()=>{
   getAddressList()
  },[])

  return (
    <SafeAreaView>
        <ActivityStatus message='' loading={loading}/>
      <HeaderComponent title={'Address Book'} />
      <View style={{marginBottom:200,}}>
         <FlatList
            data={addressList || []}
            renderItem={Item}
            keyExtractor={item =>item.id}
         />
     
      <View style={{alignSelf:'center',width:'80%',}}>
      <TouchableOpacity style={{padding:10,backgroundColor:'dodgerblue',borderRadius:5,}} 
      onPress={()=>{navigation.navigate('AddAddress',{getAddressList:getAddressList,status:0})}}>
        <Text style={{color:'white',fontWeight:'bold',fontSize:15,alignSelf:'center'}}> +ADD ADDRESS</Text>
      </TouchableOpacity>
      </View>
      
    </View>
    
    </SafeAreaView>
   
  )
}

export  {AddressBook}