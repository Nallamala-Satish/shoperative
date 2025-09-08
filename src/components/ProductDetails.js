import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {baseURL} from '../utils/Constants';
import ActivityStatus from './shared/ActivityStatus';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getUserProfileInfo} from '../utils/AsyncStorageHelper';
import { HeaderComponent } from './CustomComponents/HeaderComponent';

const {width} = Dimensions.get('window');

const ProductDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const {productId} = route.params;
  const [loading, setLoading] = useState(false);
  const [productRes, setProductRes] = useState({});
  const [like, setLike] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  console.log('product response', productRes);

  const getProductDetails = async () => {
    setLoading(true);
    const res = await getUserProfileInfo();
    let myHeaders = new Headers();
    myHeaders.append('Authorization', `${res.token}`);
    myHeaders.append('Content-Type', 'application/json');

    let raw = JSON.stringify({
      product_id: productId,
    });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${baseURL}/getProductDetails`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('product response', result);
        if (result.message == 'Products list') {
          setProductRes(result.products[0]);
          setLoading(false);
        }
        setLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setLoading(false);
      });
  };

  const addWishlist = async () => {
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
    console.log(raw);
    fetch(`${baseURL}/addToWishlist`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log('addWhistlist res', result);
        const res = JSON.parse(result);
        const des = res.description;
        if (res.message == 'success') {
          setLike(!like);
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

  const addToCart = async () => {
    setLoading(true);
    const userInfo = await getUserProfileInfo();
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `${userInfo.token}`);

    const raw = JSON.stringify({
      productId: parseInt(productRes.id),
      cartType: 2,
      quantity: quantity,
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
        console.log('addToCart res', result);
        const res = JSON.parse(result);
        if (res.message == 'success') {
          setLoading(false);
          alert('Product added to cart successfully!');
        } else {
          alert('Failed to add product to cart');
          setLoading(false);
        }
        setLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setLoading(false);
      });
  };

  // Mock related items data
  const relatedItems = [
    {
      id: 1,
      name: 'Fruits & Vegetables',
      image: 'https://via.placeholder.com/80x80/4CAF50/FFFFFF?text=FV',
    },
    {
      id: 2,
      name: 'Bread, Dairy & Eggs',
      image: 'https://via.placeholder.com/80x80/FF9800/FFFFFF?text=BDE',
    },
    {
      id: 3,
      name: 'Personal Care',
      image: 'https://via.placeholder.com/80x80/2196F3/FFFFFF?text=PC',
    },
    {
      id: 4,
      name: 'Grocery & Staples',
      image: 'https://via.placeholder.com/80x80/9C27B0/FFFFFF?text=GS',
    },
  ];

  const renderRelatedItem = ({item}) => (
    <TouchableOpacity style={styles.relatedItem}>
      <Image source={{uri: item.image}} style={styles.relatedItemImage} />
      <Text style={styles.relatedItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderCarouselIndicator = (index) => (
    <View
      key={index}
      style={[
        styles.carouselIndicator,
        currentImageIndex === index && styles.carouselIndicatorActive,
      ]}
    />
  );

  useEffect(() => {
    getProductDetails();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <ActivityStatus message="" loading={loading} />
          <HeaderComponent title="Product" />


      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Product Image Section */}
        <View style={styles.imageSection}>
          <Image source={{uri: productRes.prod_image}} style={styles.productImage} />
          
          {/* Favorite Icon */}
          <TouchableOpacity style={styles.favoriteButton} onPress={addWishlist}>
            <Ionicons
              name={like ? 'heart' : 'heart-outline'}
              size={24}
              color={like ? '#FF6B6B' : '#FF8C00'}
            />
          </TouchableOpacity>

          {/* Carousel Indicators */}
          {/* <View style={styles.carouselIndicators}>
            {[0, 1, 2].map(renderCarouselIndicator)}
          </View> */}
        </View>

        {/* Product Information */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{productRes.prod_name}</Text>
          
          <View style={styles.priceQuantityRow}>
            <Text style={styles.productPrice}>
              ₹{productRes.price?.selling_price || productRes.mrp}
            </Text>
            
            {/* Quantity Selector */}
            <View style={styles.quantitySelector}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => quantity > 1 && setQuantity(quantity - 1)}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Product Description */}
          <Text style={styles.productDescription}>
            {productRes.prod_desc || 'Lorem ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'}
          </Text>
        </View>

        {/* Related Items Section */}
        {/* <View style={styles.relatedSection}>
          <Text style={styles.relatedTitle}>Related Items</Text>
          <FlatList
            data={relatedItems}
            renderItem={renderRelatedItem}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.relatedItemsContainer}
          />
          
          <View style={styles.relatedIndicators}>
            <View style={styles.relatedIndicator} />
            <View style={[styles.relatedIndicator, styles.relatedIndicatorActive]} />
          </View>
        </View> */}
      </ScrollView>

      {/* Add to Cart Button */}
      <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
        <Text style={styles.addToCartText}>ADD TO CART</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#FF8C00',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  imageSection: {
    position: 'relative',
    marginBottom: 20,
    margin:10,
     alignSelf:'center'
  },
  productImage: {
    width: 300,
    height: 250,
    resizeMode: 'cover',
    alignSelf:'center',
    borderRadius:5
  },
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  carouselIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  carouselIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DDD',
    marginHorizontal: 4,
  },
  carouselIndicatorActive: {
    backgroundColor: '#FF8C00',
  },
  productInfo: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 10,
  },
  priceQuantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  quantityButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF8C00',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 15,
    color: '#333',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  relatedSection: {
    paddingHorizontal: 20,
    marginBottom: 100,
  },
  relatedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 15,
  },
  relatedItemsContainer: {
    paddingBottom: 10,
  },
  relatedItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  relatedItemImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  relatedItemText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    maxWidth: 80,
  },
  relatedIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  relatedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DDD',
    marginHorizontal: 4,
  },
  relatedIndicatorActive: {
    backgroundColor: '#FF8C00',
  },
  addToCartButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FF8C00',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export {ProductDetails};
