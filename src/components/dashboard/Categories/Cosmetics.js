import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {HeaderComponent} from '../../CustomComponents/HeaderComponent';
import cosmeticsImage from '../../../images/cosmetics.png';
import {Pressable} from '@react-native-material/core';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {baseURL} from '../../../utils/Constants';
import ActivityStatus from '../../shared/ActivityStatus';
import {Card} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getUserProfileInfo} from '../../../utils/AsyncStorageHelper';

const Cosmetics = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const {id, subId} = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);

  console.log('wishlist items', wishlistItems);

  const getProducts = async () => {
    setLoading(true);
    const res = await getUserProfileInfo();
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `${res.token}`);
    myHeaders.append('Content-Type', 'application/json');

    let raw = JSON.stringify({
      menu_id: id,
      submenu_id: subId,
    });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${baseURL}/getProducts`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.message == 'Products list') {
          setProducts(result.products);
          setLoading(false);
        }
        setLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setLoading(false);
      });
  };

  const getWishList = async () => {
    setLoading(true);
    const userInfo = await getUserProfileInfo();
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `${userInfo.token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    fetch(`${baseURL}/getWishlist`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('wishlist list', result);
        console.log('wishlist data', result.data);
        if (result.message == 'success') {
          setWishlistItems(result.data || []);
          setLoading(false);
        }
        setLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setLoading(false);
      });
  };

  const addWishlist = async (productId) => {
    setLoading(true);
    const userInfo = await getUserProfileInfo();
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `${userInfo.token}`);

    const raw = JSON.stringify({
      productId: productId,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    console.log('Adding to wishlist:', raw);
    fetch(`${baseURL}/addToWishlist`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log('addWishlist res', result);
        const res = JSON.parse(result);
        const des = res.description;
        if (res.message == 'success') {
          // Refresh wishlist after adding
          getWishList();
          alert(des);
          setLoading(false);
        } else {
          alert(des);
          setLoading(false);
        }
        setLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setLoading(false);
      });
  };

  const removeFromWishlist = async (productId) => {
    setLoading(true);
    const userInfo = await getUserProfileInfo();
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `${userInfo.token}`);

    const raw = JSON.stringify({
      productId: productId,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    console.log('Removing from wishlist:', raw);
    fetch(`${baseURL}/removeFromWishlist`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log('removeWishlist res', result);
        const res = JSON.parse(result);
        const des = res.description;
        if (res.message == 'success') {
          // Refresh wishlist after removing
          getWishList();
          alert(des);
          setLoading(false);
        } else {
          alert(des);
          setLoading(false);
        }
        setLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setLoading(false);
      });
  };

  const addBasket = async item => {
    setLoading(true);
    const userInfo = await getUserProfileInfo();
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `${userInfo.token}`);

    const raw = JSON.stringify({
      productId: parseInt(item.id),
      cartType: 2,
      quantity: 1
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    console.log(raw);
    fetch(`${baseURL}/addToBasket`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log('addBasket res', result);
        const res = JSON.parse(result);
        if (res.message == 'success') {
          setLoading(false);
          alert('product added in Basket');
        } else {
          alert('not added in Basket');
          setLoading(false);
        }
        setLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setLoading(false);
      });
  };

  // Check if product is in wishlist - improved logic
  const isInWishlist = (productId) => {
    console.log('Checking if product', productId, 'is in wishlist');
    console.log('Wishlist items:', wishlistItems);
    
    if (!wishlistItems || wishlistItems.length === 0) {
      console.log('No wishlist items');
      return false;
    }

    // Check multiple possible field names for product ID
    const found = wishlistItems.some(item => {
      const itemProductId = item.product_id || item.productId || item.id;
      console.log('Comparing:', itemProductId, 'with', productId);
      return itemProductId == productId;
    });
    
    console.log('Product found in wishlist:', found);
    return found;
  };

  const Item = ({item}) => {
    console.log('Rendering item:', item.id, item.prod_name);
    const isWishlisted = isInWishlist(item.id);
    console.log('Is wishlisted:', isWishlisted);
    
    return (
      <View style={styles.itemContainer}>
        <Card style={styles.cardContainer}>
          <TouchableOpacity
            onPress={() => {
              console.log('Heart clicked for product:', item.id, 'Current wishlist status:', isWishlisted);
              if (isWishlisted) {
                removeFromWishlist(item.id);
              } else {
                addWishlist(item.id);
              }
            }}>
            <Ionicons
              name={isWishlisted ? "heart" : "heart-outline"}
              size={20}
              style={{
                alignSelf: 'flex-end',
                padding: 5,
                color: isWishlisted ? '#FF6B6B' : '#FF8C00'
              }}
            />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProductDetails', {productId: item.id});
            }}>
            <Image source={{uri: item.prod_image}} style={styles.productImage} />
            <Text style={styles.productName}>
              {item.prod_name}
            </Text>
            <Text style={styles.productDescription}>
              {item.prod_desc.length < 50
                ? `${item.prod_desc}`
                : `${item.prod_desc.substring(0, 60)}  ...`}
            </Text>
            <Text style={styles.productPrice}>
              Rs.{item.selling_price}{' '}
              <Text style={styles.unitText}>({item.unit_of_measure})</Text>
            </Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.shareCartButton}>
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>
                  Share Cart{' '}
                </Text>
                <MaterialIcons
                  name="add-shopping-cart"
                  size={14}
                  style={styles.buttonIcon}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.basketButton}
              onPress={() => {
                addBasket(item);
              }}>
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>
                  Basket{' '}
                </Text>
                <FontAwesome
                  name="shopping-basket"
                  size={14}
                  style={styles.buttonIcon}
                />
              </View>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    );
  };

  useEffect(() => {
    getProducts();
    getWishList();
  }, [isFocused]);

  return (
    <>
      <ActivityStatus message="Products loading" loading={loading} />
      <HeaderComponent title="Products" />

      <View style={styles.container}>
        <View style={styles.contentContainer}>
          {products?.length > 0 ? (
            <FlatList
              numColumns={2}
              data={products || []}
              renderItem={Item}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.flatListContainer}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No Products Available</Text>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
  },
  contentContainer: {
    flex: 1,
  },
  flatListContainer: {
    paddingBottom: 50,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    fontWeight: '500',
  },
  itemContainer: {
    flex: 1,
    margin: 8,
    maxWidth: '48%',
  },
  cardContainer: {
    padding: 8,
    backgroundColor: 'white',
    elevation: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 6,
    marginBottom: 8,
  },
  productName: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
    textAlign: 'center',
  },
  productDescription: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    marginBottom: 6,
    lineHeight: 14,
  },
  productPrice: {
    color: '#E74C3C',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
  unitText: {
    fontSize: 10,
    color: '#888',
    fontWeight: 'normal',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  shareCartButton: {
    backgroundColor: '#FF8C00',
    borderRadius: 6,
    padding: 6,
    flex: 1,
    marginRight: 4,
  },
  basketButton: {
    backgroundColor: '#32CD32',
    padding: 6,
    borderRadius: 6,
    flex: 1,
    marginLeft: 4,
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '500',
  },
  buttonIcon: {
    color: 'white',
    marginLeft: 4,
  },
});

export {Cosmetics};
