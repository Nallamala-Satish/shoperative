import React,{ useState,useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { HeaderComponent } from '../CustomComponents/HeaderComponent';
import ActivityStatus from '../shared/ActivityStatus';
// import { Table, Row, Rows } from 'react-native-table-component'; 
import { ScrollView } from 'react-native';
import { AppTable } from '../CustomComponents/AppTable';
import { getUserProfileInfo } from '../../utils/AsyncStorageHelper';
import { baseURL } from '../../utils/Constants';
import { useNavigation } from '@react-navigation/native';



const MyFollowers = () => {
const [loading,setLoading]=useState(false)
const[followersList,setFollowersList]=useState([])
const navigation= useNavigation()
console.log('followers list',followersList)
const tableHeaders = [
    'S.No',
    'Name',
    'Email',
    'Mobile',
    'City',
  ];
  const widthArr = [
   75,150,150,100,100,150
  ];
  
  const Edit = (index, follower)=>{
       return(
        <View style={{margin:10,flexDirection:'row',justifyContent:'space-between'}}>
        <TouchableOpacity style={{
       backgroundColor:'royalblue',padding:5,width:60,borderRadius:5
        }}
          onPress={() => {
           navigation.navigate('AddFollower',{getFollowersList:getFollowersList,item:follower,status:1})
          }}>
          <Text style={{
            alignSelf: 'center',
             color:'white',
            // fontWeight: 'bold'
          }}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
             backgroundColor:'red',padding:5,width:60,borderRadius:5
     }}
       onPress={() => {
        Alert.alert("Logout", "Are you want delete ?",
        [
          { text: "Cancel", onPress: () => { } },
          { text: "Ok", onPress: () =>   deleteFollower(follower.followerId) }
        ])
       
       }}>
       <Text style={{
         alignSelf: 'center',
          color:'white',
         // fontWeight: 'bold'
       }}>Delete</Text>
     </TouchableOpacity>
      </View>

       )
  }

//   const Delete = (index, follower)=>{
//     return(
//      <View style={{margin:10}}>
//      <TouchableOpacity style={{
//     backgroundColor:'red',padding:5,width:60,borderRadius:5
//      }}
//        onPress={() => {
//         Alert.alert("Logout", "Are you want delete ?",
//         [
//           { text: "Cancel", onPress: () => { } },
//           { text: "Ok", onPress: () =>   deleteFollower(follower.followerId) }
//         ])
       
//        }}>
//        <Text style={{
//          alignSelf: 'center',
//           color:'white',
//          // fontWeight: 'bold'
//        }}>Delete</Text>
//      </TouchableOpacity>
//    </View>

//     )
// }

  let tableData = [];
  for (let index = 0; index < followersList.length; index++) {
    const follower = followersList[index];
    const rowData = [];
    for (let j = 0; j <= 8; j += 1) {
      if (j == 0) {
        rowData.push(`${j+1}`)
      }
      if (j == 1) {
           rowData.push(`${follower.followerName ? follower.followerName :''}`)
      }
      if (j == 2) {
        rowData.push(`${follower.emailId ? follower.emailId :''}`)
      }
      if (j == 3) {
         rowData.push(`${follower.mobile ? follower.mobile :''}`)
      }
      if (j == 4) {
        rowData.push(`${follower.followerCity ? follower.followerCity :''}`)
      }
      if (j == 5) {
        rowData.push(rowData.push(Edit(index, follower))
        )
      }
     
    }
    tableData.push(rowData);
  }

  const getFollowersList = async ()=>{
    const userInfo= await getUserProfileInfo()
    //  console.log(userInfo.token)
     var myHeaders = new Headers();
     myHeaders.append("Authorization",`${userInfo.token}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
await fetch(`${baseURL}/followersList`, requestOptions)
  .then(response =>response.json())
  .then(result => {
    // console.log('followers list',result)
    if(result.message == 'success'){
      const followers= result.data
      setFollowersList(followers)
        setLoading(false)
    }
    setLoading(false)
  })
  .catch(error => {
    console.log('error', error)
    setLoading(false)
  });
  }

  useEffect(()=>{
    getFollowersList()
  },[])

  const deleteFollower=async(id)=>{
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

await fetch(`${baseURL}/deleteFollower`, requestOptions)
 .then(response =>response.json())
 .then(result => {
   // console.log('addressList',result)
   if(result.message == 'success'){
    getFollowersList()
       setLoading(false)
   }
   setLoading(false)
 })
 .catch(error => {
   console.log('error', error)
   setLoading(false)
 });
 }

  return (
    <SafeAreaView>
    <ActivityStatus message='' loading={loading}/>
     <HeaderComponent title={'My Followers'} />

     <TouchableOpacity style={{padding:10,backgroundColor:'dodgerblue',borderRadius:5,width:200,marginTop:10,alignSelf:'center'}} 
      onPress={()=>{navigation.navigate('AddFollower',{getFollowersList:getFollowersList,status:0})}}>
        <Text style={{color:'white',fontWeight:'bold',fontSize:15,alignSelf:'center'}}>Add Followers</Text>
      </TouchableOpacity>
      <ScrollView>
               <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 5
                    }}
                  >
                    <AppTable
                      tableHeaders={tableHeaders}
                      widthArr={widthArr}
                      tableData={tableData }
                      containerStyle={{
                        padding:3,
                        paddingVertical:5,
                      }}
                    />
                  </View>

    </ScrollView>
    </SafeAreaView>
   
  );
}

export {MyFollowers};
