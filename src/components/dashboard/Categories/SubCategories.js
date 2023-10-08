import React,{useEffect,useState} from 'react';
import { View, Text,StyleSheet,FlatList,TouchableOpacity } from 'react-native';
import { HeaderComponent } from '../../CustomComponents/HeaderComponent';
import { baseURL } from '../../../utils/Constants';
import ActivityStatus from '../../shared/ActivityStatus';
import { useIsFocused, useNavigation ,useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getUserProfileInfo } from '../../../utils/AsyncStorageHelper';

const SubCategories = () => {
  const route=useRoute()
  const {id}=route.params;
  const isFocused=useIsFocused()
  console.log(id)
const [loading,setLoading]=useState(false)
const[subCategoriesList,setSubcategoriesList]=useState([])
const navigation=useNavigation()

    const Item =({item})=>{
        return(
            <View style={{margin:10}}>
                  <TouchableOpacity onPress={()=>{
                       navigation.navigate('Cosmetics',{id:id,subId:item.submenu_id})
                   }} style={{padding:10,backgroundColor:'#F3F3F3'}} >
                   <View style={{flexDirection:'row',justifyContent: 'space-between',}}>
                    <Text style={{color:'black',fontWeight:'bold'}}>{item.submenu_title}</Text>
                    <Ionicons name="chevron-forward" size={20} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    const getSubcategories = async ()=>{
        setLoading(true)
        const res= await getUserProfileInfo()
        var myHeaders = new Headers();
        myHeaders.append("Authorization",`${res.token}`);
        myHeaders.append("Content-Type", "application/json");
        // myHeaders.append("Cookie", "PHPSESSID=9b1715a580a878faa4358a2d114d5a6f");
        
        let raw = JSON.stringify({
          "menu_id": id
        });
        
        let requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch(`${baseURL}/getSubCategories`, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log('subCategories res',result)
                if(result.message == ' success '){
                     setSubcategoriesList(result.result)
                  setLoading(false)
                }
                setLoading(false)
        })
          .catch(error =>{
             console.log('error', error)
            setLoading(false)
            });
    }

    useEffect(()=>{
       getSubcategories()
    },[isFocused])

  return (
    <>
      <ActivityStatus message='' loading={loading}/>
    <HeaderComponent title="Sub Categories" />
    <View style={styles.container}>
    <FlatList
      data={subCategoriesList || []}
      renderItem={Item}
      keyExtractor={item =>item.submenu_id}
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
    boxContainerStyles: {
        flexDirection: 'row',
        width: '90%',
        height: 50,
        backgroundColor: '#F3F3F3',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        marginTop: 15,
      },
})
export default SubCategories;
